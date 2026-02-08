/* index.js: Replace your existing code with this */
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');
// 1. Apply theme immediately
const savedTheme = localStorage.getItem('theme') || 'dark';
if (savedTheme === 'dark') {
  body.classList.add('dark-mode');
  icon.className = 'bx bx-sun text-xl';
} else {
  body.classList.remove('dark-mode');
  icon.className = 'bx bx-moon text-xl';
}
// 2. SHOW THE BODY NOW (Prevents initial flicker)
body.style.opacity = "1";
// 3. Smooth Toggle Logic
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');

  if (body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark');
    icon.className = 'bx bx-sun text-xl';
  } else {
    localStorage.setItem('theme', 'light');
    icon.className = 'bx bx-moon text-xl';
  }
});