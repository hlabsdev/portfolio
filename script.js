// Modern Portfolio JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = 80;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = menuToggle.querySelector('i');
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });
    });

    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = section.id;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-blue-400');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('text-blue-400');
            }
        });
    }

    // Navbar background on scroll
    function updateNavbar() {
        const navbar = document.querySelector('nav');
        if (window.scrollY > 50) {
            navbar.classList.add('bg-gray-900/95');
            navbar.classList.remove('bg-gray-900/80');
        } else {
            navbar.classList.add('bg-gray-900/80');
            navbar.classList.remove('bg-gray-900/95');
        }
    }

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.section, .card, .group');
        
        elements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
            
            if (isVisible && !element.classList.contains('animate')) {
                element.classList.add('animate');
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }

    // Project card interactions
    const projectCards = document.querySelectorAll('.group');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = this.querySelector('img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });

    // Smooth reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .group, .bg-gray-800').forEach(el => {
        if (!el.style.opacity) {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        observer.observe(el);
    });

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 px-6 py-3 rounded-lg text-white font-semibold z-50 transform transition-all duration-300 ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.textContent = message;
        notification.style.transform = 'translateX(100%)';
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Email functionality
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            showNotification('Email copié dans le presse-papiers!');
        });
    });

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.animate-float, .animate-bounce-slow, .animate-pulse-slow');
    floatingElements.forEach((element, index) => {
        const delay = index * 0.5;
        element.style.animationDelay = `${delay}s`;
    });

    // Particle effect for hero section
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'fixed w-1 h-1 bg-blue-400 rounded-full opacity-30 pointer-events-none';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = window.innerHeight + 'px';
        particle.style.zIndex = '1';
        
        document.body.appendChild(particle);
        
        const animation = particle.animate([
            { transform: 'translateY(0) scale(1)', opacity: 0.3 },
            { transform: `translateY(-${window.innerHeight + 100}px) scale(0)`, opacity: 0 }
        ], {
            duration: Math.random() * 3000 + 2000,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            if (document.body.contains(particle)) {
                document.body.removeChild(particle);
            }
        };
    }

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Performance optimized scroll handler
    let ticking = false;
    
    function updateOnScroll() {
        updateActiveNav();
        updateNavbar();
        animateOnScroll();
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);

    // Initialize
    updateActiveNav();
    updateNavbar();
    animateOnScroll();
    
    // Set initial opacity for hero section
    const heroSection = document.getElementById('accueil');
    if (heroSection) {
        heroSection.style.opacity = '1';
        heroSection.style.transform = 'translateY(0)';
    }
    
    console.log('🚀 Portfolio moderne de Hermann GOLO chargé avec succès!');
});