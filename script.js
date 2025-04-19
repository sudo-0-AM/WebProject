document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Mobile menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Change icon
        const icon = menuToggle.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    // Dark mode toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // Update icons
        const isDarkMode = document.body.classList.contains('dark-mode');
        const icons = [
            themeToggle.querySelector('i'),
            themeToggleMobile.querySelector('i')
        ];
        
        icons.forEach(icon => {
            if (isDarkMode) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        });
        
        // Save preference to localStorage
        localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
    }
    
    themeToggle.addEventListener('click', toggleDarkMode);
    themeToggleMobile.addEventListener('click', toggleDarkMode);
    
    // Check for saved theme preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        const icons = [
            themeToggle.querySelector('i'),
            themeToggleMobile.querySelector('i')
        ];
        
        icons.forEach(icon => {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        });
    }
    
    // Countdown Timer
    function updateCountdown() {
        const eventDate = new Date('2024-06-10T09:00:00').getTime();
        const now = new Date().getTime();
        const difference = eventDate - now;
        
        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);
            
            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        } else {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
        }
    }
    
    // Update countdown every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Resource Tabs
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons and content
            tabButtons.forEach(btn => btn.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(`${tabId}-content`).classList.add('active');
        });
    });
    
    // Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const closeLightbox = document.getElementById('close-lightbox');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            const imgAlt = this.querySelector('img').getAttribute('alt');
            
            lightboxImage.setAttribute('src', imgSrc);
            lightboxImage.setAttribute('alt', imgAlt);
            lightbox.classList.add('active');
        });
    });
    
    closeLightbox.addEventListener('click', function() {
        lightbox.classList.remove('active');
    });
    
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
    
    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialDots = document.querySelectorAll('.testimonial-dot');
    const prevButton = document.querySelector('.testimonial-nav.prev');
    const nextButton = document.querySelector('.testimonial-nav.next');
    
    let currentSlide = 0;
    const slideCount = testimonialSlides.length;
    
    function showSlide(index) {
        // Hide all slides
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        testimonialDots.forEach(dot => dot.classList.remove('active'));
        
        // Show the selected slide
        testimonialSlides[index].classList.add('active');
        testimonialDots[index].classList.add('active');
        
        currentSlide = index;
    }
    
    // Dot navigation
    testimonialDots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
        });
    });
    
    // Previous button
    prevButton.addEventListener('click', function() {
        let newIndex = currentSlide - 1;
        if (newIndex < 0) {
            newIndex = slideCount - 1;
        }
        showSlide(newIndex);
    });
    
    // Next button
    nextButton.addEventListener('click', function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) {
            newIndex = 0;
        }
        showSlide(newIndex);
    });
    
    // Auto-rotate testimonials
    let testimonialInterval = setInterval(function() {
        let newIndex = currentSlide + 1;
        if (newIndex >= slideCount) {
            newIndex = 0;
        }
        showSlide(newIndex);
    }, 5000);
    
    // Stop auto-rotation when user interacts
    [prevButton, nextButton, ...testimonialDots].forEach(el => {
        el.addEventListener('click', function() {
            clearInterval(testimonialInterval);
        });
    });
    
    // Form Validation - Contact Form
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            // Get form values
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            // Validate form
            let isValid = true;
            
            if (!name) {
                document.getElementById('contact-name-error').textContent = 'Name is required';
                isValid = false;
            }
            
            if (!email) {
                document.getElementById('contact-email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('contact-email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            if (!message) {
                document.getElementById('contact-message-error').textContent = 'Message is required';
                isValid = false;
            } else if (message.length < 10) {
                document.getElementById('contact-message-error').textContent = 'Message must be at least 10 characters';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = document.getElementById('contact-submit');
                submitButton.textContent = 'Sending...';
                submitButton.disabled = true;
                
                setTimeout(function() {
                    contactForm.reset();
                    contactSuccess.classList.remove('hidden');
                    submitButton.textContent = 'Send Message';
                    submitButton.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(function() {
                        contactSuccess.classList.add('hidden');
                    }, 5000);
                }, 1500);
            }
        });
    }
    
    // Form Validation - Join Form
    const joinForm = document.getElementById('join-form');
    const joinSuccess = document.getElementById('join-success');
    const joinFormContainer = document.getElementById('join-form-container');
    const newApplicationButton = document.getElementById('new-application');
    
    if (joinForm) {
        joinForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            document.querySelectorAll('.error-message').forEach(error => {
                error.textContent = '';
            });
            
            // Get form values
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const year = document.getElementById('year').value;
            const major = document.getElementById('major').value.trim();
            const motivation = document.getElementById('motivation').value.trim();
            
            // Validate form
            let isValid = true;
            
            if (!firstName) {
                document.getElementById('firstName-error').textContent = 'First name is required';
                isValid = false;
            }
            
            if (!lastName) {
                document.getElementById('lastName-error').textContent = 'Last name is required';
                isValid = false;
            }
            
            if (!email) {
                document.getElementById('email-error').textContent = 'Email is required';
                isValid = false;
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                document.getElementById('email-error').textContent = 'Please enter a valid email address';
                isValid = false;
            }
            
            if (!year) {
                document.getElementById('year-error').textContent = 'Year is required';
                isValid = false;
            }
            
            if (!major) {
                document.getElementById('major-error').textContent = 'Major is required';
                isValid = false;
            }
            
            if (!motivation) {
                document.getElementById('motivation-error').textContent = 'Please tell us why you want to join';
                isValid = false;
            } else if (motivation.length < 20) {
                document.getElementById('motivation-error').textContent = 'Please provide a more detailed response (at least 20 characters)';
                isValid = false;
            }
            
            if (isValid) {
                // Simulate form submission
                const submitButton = document.getElementById('join-submit');
                submitButton.textContent = 'Submitting...';
                submitButton.disabled = true;
                
                setTimeout(function() {
                    joinFormContainer.style.display = 'none';
                    joinSuccess.classList.remove('hidden');
                    submitButton.textContent = 'Submit Application';
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }
    
    if (newApplicationButton) {
        newApplicationButton.addEventListener('click', function() {
            joinSuccess.classList.add('hidden');
            joinFormContainer.style.display = 'block';
            joinForm.reset();
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});