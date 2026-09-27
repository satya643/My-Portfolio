// Live site stats: unique visitors, people active right now, and contact attempts.
// Storage is Upstash Redis, connected to the Vercel project (Storage tab), which
// provides KV_REST_API_URL / KV_REST_API_TOKEN (or the UPSTASH_REDIS_REST_* names).
//
// GET  /api/stats                      -> { visitors, active, contacts }
// POST /api/stats { type, id }         -> records the event, then returns the same stats
//   type: "visit" (first load in a session), "ping" (heartbeat), "leave", "contact"
//   id:   random per-browser id kept in localStorage (no IPs or personal data are stored)

const REDIS_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const REDIS_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

const ACTIVE_WINDOW_MS = 60_000;     // a visitor counts as active for 60s after their last heartbeat
const CONTACT_DEDUPE_S = 600;        // one contact attempt per visitor per 10 minutes
const RATE_LIMIT_PER_MIN = 120;      // requests per IP per minute
const TYPES = new Set(['visit', 'ping', 'leave', 'contact']);

async function redis(commands) {
  const res = await fetch(`${REDIS_URL}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REDIS_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands),
  });
  if (!res.ok) throw new Error(`Redis responded ${res.status}`);
  return (await res.json()).map(r => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}

async function readStats(now) {
  const [, active, visitors, contacts] = await redis([
    ['ZREMRANGEBYSCORE', 'sp:active', '-inf', String(now - ACTIVE_WINDOW_MS)],
    ['ZCARD', 'sp:active'],
    ['PFCOUNT', 'sp:visitors'],
    ['GET', 'sp:contacts'],
  ]);
  return { visitors: Number(visitors) || 0, active: Number(active) || 0, contacts: Number(contacts) || 0 };
}

function parseBody(body) {
  if (typeof body === 'string') {
    try { return JSON.parse(body || '{}'); } catch { return {}; }
  }
  return body || {};
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  if (!REDIS_URL || !REDIS_TOKEN) return res.status(503).json({ error: 'Stats storage is not connected' });
  if (req.method !== 'GET' && req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const now = Date.now();
  try {
    if (req.method === 'POST') {
      const { type, id } = parseBody(req.body);
      if (!TYPES.has(type) || !/^[A-Za-z0-9-]{8,64}$/.test(String(id))) {
        return res.status(400).json({ error: 'Bad request' });
      }

      const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || 'unknown';
      const [, hits] = await redis([['SET', `sp:rl:${ip}`, '0', 'NX', 'EX', '60'], ['INCR', `sp:rl:${ip}`]]);
      if (hits > RATE_LIMIT_PER_MIN) return res.status(429).json({ error: 'Too many requests' });

      if (type === 'leave') {
        await redis([['ZREM', 'sp:active', id]]);
      } else {
        const commands = [['ZADD', 'sp:active', String(now), id]];
        if (type === 'visit') commands.push(['PFADD', 'sp:visitors', id]);
        await redis(commands);
      }

      if (type === 'contact') {
        const [first] = await redis([['SET', `sp:contacted:${id}`, '1', 'NX', 'EX', String(CONTACT_DEDUPE_S)]]);
        if (first === 'OK') await redis([['INCR', 'sp:contacts']]);
      }
    }
    return res.status(200).json(await readStats(now));
  } catch {
    return res.status(500).json({ error: 'Stats are unavailable right now' });
  }
}
