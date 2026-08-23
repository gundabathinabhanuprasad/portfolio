document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Typing Effect ---
    const typedTextSpan = document.getElementById('typed-text');
    if (typedTextSpan) {
        const textArray = [
            "Full Stack Developer",
            "TechOps Specialist",
            "AI & Prompt Engineer",
            "Scalable Systems Builder"
        ];
        const typingDelay = 90;
        const erasingDelay = 45;
        const newTextDelay = 2200;
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
                setTimeout(type, typingDelay + 900);
            }
        }

        setTimeout(type, 800);
    }

    // --- Hero Video Avatar Controls (Sound Mute/Unmute & Play/Pause) ---
    const heroVideo = document.getElementById('hero-video');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    const soundText = document.getElementById('sound-text');
    const videoPlayOverlay = document.getElementById('video-play-overlay');
    const playIcon = document.getElementById('play-icon');

    if (heroVideo) {
        // Ensure video starts playing smoothly
        heroVideo.play().catch(error => {
            console.log("Autoplay browser policy handled:", error);
        });

        // Sound Mute / Unmute Toggle
        if (soundToggleBtn) {
            soundToggleBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent trigger play overlay click
                heroVideo.muted = !heroVideo.muted;

                if (heroVideo.muted) {
                    soundIcon.className = 'fa-solid fa-volume-xmark';
                    soundText.textContent = 'Muted';
                    soundToggleBtn.style.background = 'rgba(15, 23, 42, 0.75)';
                } else {
                    soundIcon.className = 'fa-solid fa-volume-high';
                    soundText.textContent = 'Sound On';
                    soundToggleBtn.style.background = 'rgba(225, 29, 72, 0.85)';
                }
            });
        }

        // Play / Pause Video Overlay Click
        function togglePlayPause() {
            if (heroVideo.paused) {
                heroVideo.play();
                playIcon.className = 'fa-solid fa-pause';
                videoPlayOverlay.style.opacity = '0.3';
            } else {
                heroVideo.pause();
                playIcon.className = 'fa-solid fa-play';
                videoPlayOverlay.style.opacity = '1';
            }
        }

        if (videoPlayOverlay) {
            videoPlayOverlay.addEventListener('click', togglePlayPause);
        }

        heroVideo.addEventListener('click', togglePlayPause);

        // Hover effect for play icon visibility
        const videoFrame = document.querySelector('.video-frame');
        if (videoFrame) {
            videoFrame.addEventListener('mouseenter', () => {
                if (videoPlayOverlay) videoPlayOverlay.style.opacity = '1';
            });
            videoFrame.addEventListener('mouseleave', () => {
                if (videoPlayOverlay && !heroVideo.paused) videoPlayOverlay.style.opacity = '0.3';
            });
        }
    }

    // --- Scroll Reveal Animations ---
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '50px',
            duration: 1200,
            delay: 150,
            reset: false
        });

        sr.reveal('.reveal-up');
        sr.reveal('.skill-card', { interval: 150 });
        sr.reveal('.project-card', { interval: 180 });
        sr.reveal('.timeline-item', { interval: 200 });
        sr.reveal('.info-card', { interval: 150 });
    }

    // --- Mobile Menu Toggle ---
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const bars = document.querySelectorAll('.bar');
            if (bars.length >= 3) {
                bars[0].classList.toggle('rotate-45');
                bars[1].classList.toggle('opacity-0');
                bars[2].classList.toggle('rotate-neg-45');
            }
        });
    }

    // --- Active Link highlighting on scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 160)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Close mobile menu on link click
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const bars = document.querySelectorAll('.bar');
                if (bars.length >= 3) {
                    bars[0].classList.remove('rotate-45');
                    bars[1].classList.remove('opacity-0');
                    bars[2].classList.remove('rotate-neg-45');
                }
            }
        });
    });

    // --- Contact Form AJAX Submission ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'Sending Message... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch("https://formsubmit.co/ajax/gundabathinabhanuprasad@gmail.com", {
                method: "POST",
                headers: { 'Accept': 'application/json' },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = 'Message Sent Successfully! <i class="fa-solid fa-circle-check"></i>';
                submitBtn.style.background = '#10B981';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3500);
            })
            .catch(error => {
                submitBtn.innerHTML = 'Error Sending! Please Try Again <i class="fa-solid fa-circle-xmark"></i>';
                submitBtn.style.background = '#EF4444';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                }, 3500);
            });
        });
    }
});
