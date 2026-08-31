/* ============================================
   PORTFOLIO JULIANA GOUGOU
   JavaScript Functions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // 1. MENU MOBILE
    // ============================================
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Créer l'overlay
    const overlay = document.createElement('div');
    overlay.classList.add('nav-overlay');
    document.body.appendChild(overlay);

    function toggleMenu() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    hamburger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', toggleMenu);

    // Fermer le menu après clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ============================================
    // 2. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.getElementById('navbar');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll();

    // ============================================
    // 3. NAVIGATION ACTIVE STATE
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // ============================================
    // 4. MODE CLAIR / SOMBRE
    // ============================================
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Vérifier la préférence sauvegardée ou du système
    function getPreferredTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }

    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeIcon.textContent = theme === 'dark' ? '🌙' : '☀️';
    }

    // Initialiser le thème
    setTheme(getPreferredTheme());

    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        setTheme(currentTheme === 'dark' ? 'light' : 'dark');
    });

    // ============================================
    // 5. TYPEWRITER EFFECT
    // ============================================
    const typedTextElement = document.getElementById('typed-text');
    const texts = [
        'Développeur Web Junior',
        'Passionnée par le web',
        'Créative & Rigoureuse'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typedTextElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typedTextElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause avant de supprimer
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause avant de taper le prochain texte
        }

        setTimeout(typeWriter, typeSpeed);
    }

    typeWriter();

    // ============================================
    // 6. FILTRAGE DES PROJETS
    // ============================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Mettre à jour le bouton actif
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeUp 0.5s forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ============================================
    // 7. ANIMATIONS AU SCROLL (Intersection Observer)
    // ============================================
    const animatedElements = document.querySelectorAll('[data-aos]');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ============================================
    // 8. COMPTEUR ANIMÉ (Section À propos)
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateStats() {
        if (statsAnimated) return;

        const statsSection = document.querySelector('.apropos-stats');
        if (!statsSection) return;

        const rect = statsSection.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            statsAnimated = true;

            statNumbers.forEach(num => {
                const target = parseInt(num.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        num.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        num.textContent = target;
                    }
                };

                updateCounter();
            });
        }
    }

    window.addEventListener('scroll', animateStats);

    // ============================================
    // 9. VALIDATION DU FORMULAIRE
    // ============================================
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    const formSuccess = document.getElementById('form-success');

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(input, errorElement, message) {
        input.parentElement.classList.add('error');
        errorElement.textContent = message;
    }

    function clearError(input, errorElement) {
        input.parentElement.classList.remove('error');
        errorElement.textContent = '';
    }

    // Validation en temps réel
    nameInput.addEventListener('blur', () => {
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Veuillez entrer votre nom');
        } else {
            clearError(nameInput, nameError);
        }
    });

    emailInput.addEventListener('blur', () => {
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Veuillez entrer votre email');
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Veuillez entrer un email valide');
        } else {
            clearError(emailInput, emailError);
        }
    });

    messageInput.addEventListener('blur', () => {
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Veuillez entrer un message');
        } else {
            clearError(messageInput, messageError);
        }
    });

    // Soumission du formulaire
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Valider le nom
        if (nameInput.value.trim() === '') {
            showError(nameInput, nameError, 'Veuillez entrer votre nom');
            isValid = false;
        } else {
            clearError(nameInput, nameError);
        }

        // Valider l'email
        if (emailInput.value.trim() === '') {
            showError(emailInput, emailError, 'Veuillez entrer votre email');
            isValid = false;
        } else if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError, 'Veuillez entrer un email valide');
            isValid = false;
        } else {
            clearError(emailInput, emailError);
        }

        // Valider le message
        if (messageInput.value.trim() === '') {
            showError(messageInput, messageError, 'Veuillez entrer un message');
            isValid = false;
        } else {
            clearError(messageInput, messageError);
        }

        if (isValid) {
            // Simuler l'envoi
            const submitBtn = form.querySelector('.btn-submit');
            submitBtn.innerHTML = '<span>Envoi en cours...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                form.reset();
                submitBtn.innerHTML = '<span>Envoyer</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>';
                submitBtn.disabled = false;
                formSuccess.classList.add('show');

                setTimeout(() => {
                    formSuccess.classList.remove('show');
                }, 5000);
            }, 1500);
        }
    });

    // ============================================
    // 10. PARTICULES DÉCORATIVES
    // ============================================
    const particlesContainer = document.getElementById('particles');

    function createParticles() {
        if (!particlesContainer) return;

        const particleCount = window.innerWidth < 768 ? 15 : 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.width = (Math.random() * 4 + 2) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.3 + 0.1;
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';

            particlesContainer.appendChild(particle);
        }
    }

    createParticles();

    // ============================================
    // 11. SMOOTH SCROLL POUR LES ANCRES
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
});