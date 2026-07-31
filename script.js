/* 
  VNZ PROJECT / VINZ FOOD MARKET — Interactive Scripts
*/

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Switcher (Dark / Light Mode)
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;

    const savedTheme = localStorage.getItem('nb_theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('nb_theme', newTheme);
        });
    }

    // 2. Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // 3. Header Scrolled Effect
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.style.padding = '0.25rem 0';
            } else {
                header.style.padding = '0';
            }
        });
    }

    // 4. Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;

            setTimeout(() => {
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                if (formSuccess) {
                    formSuccess.classList.remove('hidden');
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                }
            }, 1000);
        });
    }

    // 5. Scroll Reveal Animation
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.work-card, .about-grid, .contact-grid, .hero-title');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = `
        .fade-in-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(styleSheet);
});
