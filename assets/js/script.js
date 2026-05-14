document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Typing Effect ---
    const typedTextSpan = document.getElementById('typed-text');
    const textArray = ["Modern Web Apps", "TechOps Solutions", "Scalable Systems", "Innovative Software"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 1100);
        }
    }

    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // --- Scroll Reveal Animations ---
    const sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 2000,
        delay: 200,
        reset: false // Animations happen once
    });

    sr.reveal('.reveal-up');
    sr.reveal('.hero-content h1', { delay: 400 });
    sr.reveal('.hero-content p', { delay: 600 });
    sr.reveal('.hero-btns', { delay: 800, origin: 'bottom' });
    sr.reveal('.hero-image', { delay: 900, origin: 'right' });
    sr.reveal('.about-info', { origin: 'left' });
    sr.reveal('.about-features', { origin: 'right' });
    sr.reveal('.skill-category', { interval: 200 });
    sr.reveal('.project-card', { interval: 200, origin: 'bottom' });
    sr.reveal('.contact-card', { origin: 'bottom' });

    // --- Mobile Menu ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        // Animate bars
        const bars = document.querySelectorAll('.bar');
        bars[0].classList.toggle('rotate-45');
        bars[1].classList.toggle('opacity-0');
        bars[2].classList.toggle('rotate-neg-45');
    });

    // --- Active Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Loading state
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.8';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch("https://formsubmit.co/ajax/gundabathinabhanuprasad@gmail.com", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json'
                },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                // Success state
                submitBtn.innerHTML = 'Message Sent! <i class="fa-solid fa-check"></i>';
                submitBtn.style.backgroundColor = '#28a745'; // Green success color
                submitBtn.style.color = '#fff';
                submitBtn.style.opacity = '1';
                contactForm.reset();

                // Revert back after 3 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            })
            .catch(error => {
                // Error state
                submitBtn.innerHTML = 'Error! Try Again <i class="fa-solid fa-xmark"></i>';
                submitBtn.style.backgroundColor = '#dc3545'; // Red error color
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3000);
            });
        });
    }
});
