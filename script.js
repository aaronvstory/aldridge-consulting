/**
 * Aldridge Consulting - Main JavaScript
 * Handles interactivity, animations, and form validation
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const navbar = document.getElementById('navbar');
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.getElementById('nav-links');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    // ============================================
    // Navbar Scroll Effect
    // ============================================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Check on load

    // ============================================
    // Mobile Menu Toggle
    // ============================================
    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            const isActive = navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            mobileMenuBtn.setAttribute('aria-expanded', isActive);

            // Prevent body scroll when menu is open
            document.body.style.overflow = isActive ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const animateElements = document.querySelectorAll('[data-animate]');

    if (animateElements.length > 0 && 'IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry, index) {
                if (entry.isIntersecting) {
                    // Stagger animation delay
                    setTimeout(function() {
                        entry.target.classList.add('visible');
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animateElements.forEach(function(el) {
            observer.observe(el);
        });
    } else {
        // Fallback: show all elements if IntersectionObserver not supported
        animateElements.forEach(function(el) {
            el.classList.add('visible');
        });
    }

    // ============================================
    // Counter Animation for Stats
    // ============================================
    function animateCounter(element, target, duration) {
        const start = 0;
        const startTime = performance.now();

        function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }

        requestAnimationFrame(updateCounter);
    }

    // Observe stat numbers
    const statNumbers = document.querySelectorAll('.stat-number[data-target], .metric-number[data-target]');

    if (statNumbers.length > 0 && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.target, 10);
                    if (!isNaN(target)) {
                        animateCounter(entry.target, target, 2000);
                    }
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statNumbers.forEach(function(stat) {
            statsObserver.observe(stat);
        });
    }

    // ============================================
    // Form Validation & Submission
    // ============================================
    if (contactForm) {
        const fields = {
            'business-name': {
                required: true,
                message: 'Please enter your business name'
            },
            'email': {
                required: true,
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Please enter a valid email address'
            },
            'challenge': {
                required: true,
                message: 'Please select your IT challenge'
            }
        };

        function validateField(fieldName) {
            const input = contactForm.querySelector('[name="' + fieldName + '"]');
            const errorEl = document.getElementById(fieldName + '-error');
            const config = fields[fieldName];

            if (!input || !config) return true;

            let isValid = true;
            let errorMessage = '';

            // Check required
            if (config.required && !input.value.trim()) {
                isValid = false;
                errorMessage = config.message;
            }

            // Check pattern
            if (isValid && config.pattern && input.value.trim()) {
                if (!config.pattern.test(input.value.trim())) {
                    isValid = false;
                    errorMessage = config.message;
                }
            }

            // Update UI
            if (errorEl) {
                errorEl.textContent = errorMessage;
            }

            if (isValid) {
                input.classList.remove('error');
            } else {
                input.classList.add('error');
            }

            return isValid;
        }

        // Real-time validation on blur
        Object.keys(fields).forEach(function(fieldName) {
            const input = contactForm.querySelector('[name="' + fieldName + '"]');
            if (input) {
                input.addEventListener('blur', function() {
                    validateField(fieldName);
                });

                // Clear error on input
                input.addEventListener('input', function() {
                    const errorEl = document.getElementById(fieldName + '-error');
                    if (errorEl) errorEl.textContent = '';
                    input.classList.remove('error');
                });
            }
        });

        // Form submission
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate all fields
            let isFormValid = true;
            Object.keys(fields).forEach(function(fieldName) {
                if (!validateField(fieldName)) {
                    isFormValid = false;
                }
            });

            if (!isFormValid) {
                // Focus first invalid field
                const firstError = contactForm.querySelector('.error');
                if (firstError) firstError.focus();
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('.btn-submit');
            if (submitBtn) {
                submitBtn.classList.add('loading');
                submitBtn.disabled = true;
            }

            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Hide loading
                if (submitBtn) {
                    submitBtn.classList.remove('loading');
                    submitBtn.disabled = false;
                }

                // Show success message
                if (formSuccess) {
                    formSuccess.hidden = false;
                }

                // Reset form
                contactForm.reset();

                // Hide success message after 5 seconds
                setTimeout(function() {
                    if (formSuccess) {
                        formSuccess.hidden = true;
                    }
                }, 5000);

                // Scroll to success message
                if (formSuccess) {
                    formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 1500);
        });
    }

    // ============================================
    // Keyboard Navigation Support
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Close mobile menu on Escape
        if (e.key === 'Escape') {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                mobileMenuBtn.focus();
            }
        }
    });

    // ============================================
    // Parallax Effect for Hero (subtle)
    // ============================================
    const heroPattern = document.querySelector('.hero-pattern');

    if (heroPattern && window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
        let ticking = false;

        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrollY = window.pageYOffset;
                    if (scrollY < window.innerHeight) {
                        heroPattern.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ============================================
    // Active Navigation Link Highlight
    // ============================================
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveNavLink() {
        const scrollPos = window.pageYOffset + 100;

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-links a').forEach(function(link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveNavLink);

    // ============================================
    // Initialize on DOM Ready
    // ============================================
    console.log('Aldridge Consulting website initialized');

})();