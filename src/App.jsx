import { useState, useEffect } from 'react';
import ParticleBackground from './ParticleBackground';

function App() {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window === 'undefined') return true;
        return localStorage.getItem('theme') !== 'light';
    });
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const body = document.body;
        if (isDark) {
            body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    // Scroll reveal animation
    useEffect(() => {
        const elements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('reveal-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.18, rootMargin: '0px 0px -40px 0px' }
        );
        elements.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <ParticleBackground />
            <header className="w-full absolute top-2 sm:top-6 left-0 right-0 z-50">
                <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 py-2 sm:py-4 flex items-center justify-between relative">
                    <div className="flex items-center gap-2 sm:gap-3 md:pl-12">
                        <img src="/images/imag3e-removebg-preview.png" width="32" height="32"
                            className="logo-img w-7 h-7 sm:w-8 2xl:w-10 sm:h-8 2xl:h-10 object-cover rounded-full bg-gradient-to-r from-purple-500 to-indigo-500" alt="Satya Prakash" />
                    </div>
                    <nav className="hidden md:flex gap-5 xl:gap-8 2xl:gap-8 text-gray-700 font-medium cursor-pointer text-sm xl:text-base 2xl:text-lg">
                        <a className="hover:text-purple-600 transition" href="#home">Home</a>
                        <a className="hover:text-purple-600 transition" href="#skills">Skills</a>
                        <a className="hover:text-purple-600 transition" href="#experience">Experience</a>
                        {/* <a className="hover:text-purple-600 transition" href="#work">Work</a>
                         */}
                        <a className="hover:text-purple-600 transition" href="#contact">Contact Us</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <div
                            id="theme-toggle"
                            onClick={() => setIsDark(!isDark)}
                            className={`theme-switch ${isDark ? 'dark' : ''}`}
                            aria-label="Toggle theme"
                        >
                            <div className="theme-switch-thumb"></div>
                            <i className="bx bx-sun theme-switch-icon sun"></i>
                            <i className="bx bx-moon theme-switch-icon moon"></i>
                        </div>
                        <div className="download-wrapper">
                            <button className="botao">
                                <svg
                                    className="mysvg"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    height="24px"
                                    width="24px"
                                >
                                    <g strokeWidth="0" id="SVGRepo_bgCarrier"></g>
                                    <g
                                        strokeLinejoin="round"
                                        strokeLinecap="round"
                                        id="SVGRepo_tracerCarrier"
                                    ></g>
                                    <g id="SVGRepo_iconCarrier">
                                        <g id="Interface / Download">
                                            <path
                                                strokeLinejoin="round"
                                                strokeLinecap="round"
                                                strokeWidth="2"
                                                stroke="#f1f1f1"
                                                d="M6 21H18M12 3V17M12 17L17 12M12 17L7 12"
                                                id="Vector"
                                            ></path>
                                        </g>
                                    </g>
                                </svg>
                                <span className="texto">Download</span>
                            </button>
                        </div>
                        <button
                            id="menu-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="md:hidden w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md flex items-center justify-center cursor-pointer shadow-sm transition-all active:scale-95">
                            <i className={`bx ${isMenuOpen ? 'bx-x' : 'bx-menu'} text-xl sm:text-2xl dark:text-white`}></i>
                        </button>
                    </div>
                    {/* Mobile Menu Overlay */}
                    <div className={`fixed inset-0 bg-white/95 dark:bg-[#050816]/98 z-[60] flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'}`}>
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-10 right-10 text-4xl dark:text-white"
                        >
                            <i className='bx bx-x'></i>
                        </button>
                        {['Home', 'Skills', 'Experience', 'Contact'].map((item) => (
                            <a
                                key={item}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-2xl font-bold dark:text-white hover:text-purple-600 transition"
                                href={`#${item.toLowerCase() === 'contact' ? 'contact' : item.toLowerCase()}`}
                            >
                                {item}
                            </a>
                        ))}
                    </div>
                </div>
            </header >

            <section id="home" className="relative w-full h-screen bg-transparent overflow-hidden">
                <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-6 h-full flex items-center pt-20 sm:pt-28">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 w-full pt-4 sm:pt-0">
                        <div className="space-y-2 sm:space-y-4 md:space-y-6 text-center md:text-left flex flex-col justify-center hero-stagger md:pl-12">
                            <h1 className="text-xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl font-bold text-gray-800 leading-tight">
                                <span className="text-purple-800">Hi,</span> I'm <br />
                                <span className="text-purple-800 text-xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-8xl">Satya Prakash</span>
                            </h1>
                            <h2 className="text-sm sm:text-xl lg:text-2xl 2xl:text-4xl font-semibold text-purple-700">Full Stack Developer</h2>
                            <div className="relative w-1/4 h-[1.5px] mx-auto md:mx-0">
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/70 to-transparent shadow-[0_0_4px_rgba(192,132,252,0.4)] [clip-path:polygon(0%_0%,100%_40%,100%_60%,0%_100%)]"></span>
                            </div>
                            <p className="text-gray-600 max-w-md 2xl:max-w-xl mx-auto md:mx-0 text-xs sm:text-sm 2xl:text-xl hero-subtext leading-relaxed">
                                I enjoy turning ideas into complete full-stack applications with smooth user experience and solid backend logic.
                            </p>
                            <div className="flex gap-3 sm:gap-5 justify-center md:justify-start pt-1 sm:pt-4">
                                <button className="hero-cta hero-primary rounded-xl text-white shadow-lg hover:scale-105 transition active:scale-95 text-xs sm:text-sm xl:text-base 2xl:text-lg xl:px-6 2xl:px-8">
                                    Hire me
                                </button>
                                <button className="hero-cta hero-secondary rounded-xl transition active:scale-95 text-xs sm:text-sm xl:text-base 2xl:text-lg xl:px-6 2xl:px-8">
                                    Explore Me
                                </button>
                            </div>
                        </div>
                        <div className="relative flex justify-center items-center pb-4 sm:pb-0 md:-translate-y-4 hero-image-reveal">
                            <div className="hero-orbit-inner flex items-center justify-center">
                                <div className="hero-avatar hover:scale-105 transition duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10">
                                    <img src="/images/ChatGPT Image Feb 8, 2026, 11_00_06 PM.png" loading="lazy" className="hero-avatar-img" alt="Hero" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="skills" className="relative w-full py-16 sm:py-24 2xl:py-40 bg-transparent overflow-hidden">
                <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-6 relative">
                    {/* Vertical Label */}
                    <div className="skills-vertical-label hidden lg:flex">
                        <span>SKILLS</span>
                    </div>

                    <div className="lg:pl-24 w-full">

                        <div className="flex flex-col 2xl:flex-row gap-16 2xl:gap-24 w-full">
                            {/* Tools & Technologies */}
                            <div className="reveal flex-1 w-full">
                                <h3 className="skills-category-title text-center 2xl:text-left">Tools & Technologies</h3>
                                <div className="skills-grid mt-6">
                                    {[
                                        { name: 'HTML', icon: 'bxl-html5', color: 'text-[#E34F26]' },
                                        { name: 'CSS', icon: 'bxl-css3', color: 'text-[#1572B6]' },
                                        { name: 'JAVASCRIPT', icon: 'bxl-javascript', color: 'text-[#F7DF1E]' },
                                        { name: 'PYTHON', icon: 'bxl-python', color: 'text-[#3776AB]' },
                                        { name: 'JAVA', icon: 'bx-code', color: 'text-[#007396]' },
                                        { name: 'OOPS', icon: 'bx-layer', color: 'text-[#7c3aed]' },
                                        { name: 'GIT', icon: 'bxl-git', color: 'text-[#F05032]' },
                                        { name: 'GITHUB', icon: 'bxl-github', color: 'icon-github' },
                                        { name: 'FIGMA', icon: 'bxl-figma', color: 'text-[#F24E1E]' },
                                        { name: 'WEBPACK', icon: 'bx-package', color: 'text-[#8DD6F9]' }
                                    ].map((skill) => (
                                        <div key={skill.name} className="skill-card-wrapper">
                                            <div className="skill-card group">
                                                <div className={`skill-icon-box ${skill.color}`}>
                                                    <i className={`bx ${skill.icon}`}></i>
                                                </div>
                                                <span className="skill-name">{skill.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Frameworks & Libraries */}
                            <div className="reveal flex-1 w-full mt-8 2xl:mt-0">
                                <h3 className="skills-category-title text-center 2xl:text-left">Frameworks & Libraries</h3>
                                <div className="skills-grid mt-6">
                                    {[
                                        { name: 'REACT.JS', icon: 'bxl-react', color: 'text-[#61DAFB]' },
                                        { name: 'TYPESCRIPT', icon: 'bxl-typescript', color: 'text-[#3178C6]' },
                                        { name: 'NODE.JS', icon: 'bxl-nodejs', color: 'text-[#339933]' },
                                        { name: 'MONGODB', icon: 'bxl-mongodb', color: 'text-[#47A248]' },
                                        { name: 'POSTGRESQL', icon: 'bxl-postgresql', color: 'text-[#336791]' },
                                        { name: 'TAILWIND CSS', icon: 'bxl-tailwind-css', color: 'text-[#06B6D4]' },
                                        { name: 'BOOTSTRAP', icon: 'bxl-bootstrap', color: 'text-[#7952B3]' },
                                        { name: 'REDUX.JS', icon: 'bxl-redux', color: 'text-[#764ABC]' },
                                        { name: 'EXPRESS.JS', icon: 'bx-server', color: 'icon-express' },
                                        { name: 'MONGOOSE.JS', icon: 'bx-data', color: 'text-[#880000]' }
                                    ].map((skill) => (
                                        <div key={skill.name} className="skill-card-wrapper">
                                            <div className="skill-card group">
                                                <div className={`skill-icon-box ${skill.color}`}>
                                                    <i className={`bx ${skill.icon}`}></i>
                                                </div>
                                                <span className="skill-name">{skill.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="experience" className="relative w-full py-20 2xl:py-40 bg-transparent">
                <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-6 relative">
                    {/* Vertical Label */}
                    <div className="skills-vertical-label hidden lg:flex">
                        <span>EXPERIENCE</span>
                    </div>

                    <div className="lg:pl-24 w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <aside className="experience-card">
                                <h3 className="text-3xl font-bold text-purple-800 mb-4">2025 – Present</h3>
                                <div className="experience-timeline">
                                    <div className="timeline-item">
                                        <h4 className="text-xl font-semibold text-purple-900">Full Stack Developer</h4>
                                        <p className="text-base font-medium text-purple-700">WayOne IT Solutions</p>
                                        <p className="text-sm text-purple-500">Jan 2026 – Present</p>
                                    </div>
                                    <div className="timeline-item">
                                        <h4 className="text-xl font-semibold text-purple-900">Full Stack Developer</h4>
                                        <p className="text-base font-medium text-purple-700">WTF Gyms</p>
                                        <p className="text-sm text-purple-500">July 2025 – Dec 2025</p>
                                    </div>
                                </div>
                            </aside>
                            <div className="experience-card">
                                <h3 className="text-3xl font-bold text-purple-800 mb-6">Experience Details</h3>
                                <div className="space-y-5">
                                    <article className="exp-highlight">
                                        <p className="exp-tag">WayOne IT Solutions</p>
                                        <h4 className="text-xl font-semibold mb-1">Full Stack Developer</h4>
                                        <p className="text-sm md:text-base text-purple-100/95 font-light leading-relaxed">Building and deploying scalable full-stack applications using the MERN stack, designing RESTful APIs, and implementing responsive UI components.</p>
                                        <div className="exp-chip-row">
                                            <span className="exp-chip">React</span>
                                            <span className="exp-chip">Node.js</span>
                                            <span className="exp-chip">MongoDB</span>
                                            <span className="exp-chip">Express</span>
                                        </div>
                                    </article>
                                    <article className="exp-highlight exp-highlight-alt">
                                        <p className="exp-tag">WTF Gyms</p>
                                        <h4 className="text-xl font-semibold mb-1">Full Stack Developer</h4>
                                        <p className="text-sm md:text-base text-purple-100/95 font-light leading-relaxed">Developed full-stack features for the gym platform including user auth, membership management, and admin dashboard with real-time data.</p>
                                        <div className="exp-chip-row">
                                            <span className="exp-chip">React</span>
                                            <span className="exp-chip">Node.js</span>
                                            <span className="exp-chip">MongoDB</span>
                                            <span className="exp-chip">Express</span>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="work" className="relative w-full py-20 2xl:py-40 bg-transparent">
                <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-6 text-center">
                    <h2 className="text-4xl md:text-5xl 2xl:text-7xl font-bold text-purple-800 mb-12 2xl:mb-20">Latest Work</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <article className="pt-card bg-transparent overflow-hidden group">
                            <div className="h-48 bg-purple-200/50 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-bold text-purple-900">Project One</h3>
                            <p className="text-sm text-purple-700 mt-2">Modern E-Commerce Solution</p>
                        </article>
                        <article className="pt-card bg-transparent overflow-hidden group">
                            <div className="h-48 bg-indigo-200/50 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-bold text-purple-900">Project Two</h3>
                            <p className="text-sm text-purple-700 mt-2">Cloud Analysis Dashboard</p>
                        </article>
                        <article className="pt-card bg-transparent overflow-hidden group">
                            <div className="h-48 bg-pink-200/50 rounded-lg mb-4"></div>
                            <h3 className="text-xl font-bold text-purple-900">Project Three</h3>
                            <p className="text-sm text-purple-700 mt-2">AI Content Generator</p>
                        </article>
                    </div>
                </div>
            </section>

            <section id="contact" className="relative w-full py-20 2xl:py-40 bg-transparent">
                <div className="max-w-[1440px] 2xl:max-w-[1800px] mx-auto px-6">
                    <div className="portfolio-testimonials-wrap">
                        <article className="pt-card pt-portfolio bg-transparent">
                            <h2 className="pt-title">Contact Us</h2>
                            <form className="portfolio-form" action="#" method="post">
                                <label htmlFor="portfolio-name">Name</label>
                                <input id="portfolio-name" type="text" placeholder="Name..." />
                                <label htmlFor="portfolio-email">Email</label>
                                <input id="portfolio-email" type="email" placeholder="Email ..." />
                                <label htmlFor="portfolio-subject">Subject</label>
                                <input id="portfolio-subject" type="text" placeholder="Subject" />
                                <label htmlFor="portfolio-message">Message</label>
                                <textarea id="portfolio-message" rows="4" placeholder="Message"></textarea>
                                <button type="submit" className="pt-submit">Send Message</button>
                            </form>
                        </article>
                        <div className="testimonials-column">
                            <h2 className="pt-title">Connect</h2>
                            <article className="pt-card pt-connect bg-transparent">
                                <h3>Let's Work Together!</h3>
                                <p>I'll get back to you within 24 hours.</p>
                                <div className="pt-socials">
                                    <button type="button" aria-label="Instagram" className="social-button">
                                        <i className='bx bxl-instagram'></i>
                                    </button>
                                    <button type="button" aria-label="Twitter" className="social-button">
                                        <i className='bx bxl-twitter'></i>
                                    </button>
                                    <button type="button" aria-label="WhatsApp" className="social-button">
                                        <i className='bx bxl-whatsapp'></i>
                                    </button>
                                    <button type="button" aria-label="YouTube" className="social-button">
                                        <i className='bx bxl-youtube'></i>
                                    </button>
                                    <button type="button" aria-label="GitHub" className="social-button">
                                        <i className='bx bxl-github'></i>
                                    </button>
                                </div>
                                <div className="pt-contact-lines">
                                    <p><i className='bx bxs-phone'></i> +123-456-7890</p>
                                    <p><i className='bx bxs-envelope'></i> contact@email.com</p>
                                </div>
                            </article>
                        </div>
                        <article className="pt-card pt-thankyou bg-transparent">
                            <div className="pt-avatar-wrap bg-transparent">
                                <img src="/images/ChatGPT Image Feb 8, 2026, 11_00_06 PM.png" alt="Avatar" loading="lazy" />
                            </div>
                            <div className="pt-thankyou-body">
                                <h3>Thank You!</h3>
                                <p>I'll get back to you within 24 hours.</p>
                                <button className="pt-home-btn" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to Home</button>
                            </div>
                        </article>
                    </div>
                </div>
            </section>
        </>
    );
}

export default App;
