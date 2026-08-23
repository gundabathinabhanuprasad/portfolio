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

    // --- Hero Video Player Controls (Unmuted Audio by Default, Single Play, Pause on End) ---
    const heroVideo = document.getElementById('hero-video');
    const replayBtn = document.getElementById('replay-btn');
    const soundToggleBtn = document.getElementById('sound-toggle-btn');
    const soundIcon = document.getElementById('sound-icon');
    const soundText = document.getElementById('sound-text');

    if (heroVideo) {
        // Set audio unmuted by default as requested
        heroVideo.muted = false;

        // Ensure video starts playing unmuted automatically (or handles browser policy)
        heroVideo.play().catch(error => {
            console.log("Autoplay unmuted handled (browser user gesture requirement):", error);
            // If browser blocks unmuted autoplay, mute temporarily until user click
            heroVideo.muted = true;
            if (soundIcon && soundText) {
                soundIcon.className = 'fa-solid fa-volume-xmark';
                soundText.textContent = 'Muted';
            }
            heroVideo.play();
        });

        // Ensure video stays explicitly paused on the final frame when playback finishes (Single Play)
        heroVideo.addEventListener('ended', () => {
            heroVideo.pause();
            console.log("Video playback completed once. Video paused on final frame.");
        });

        // Replay Button Click Handler - Restart video from beginning with unmuted audio
        if (replayBtn) {
            replayBtn.addEventListener('click', () => {
                heroVideo.currentTime = 0;
                heroVideo.muted = false;
                if (soundIcon && soundText) {
                    soundIcon.className = 'fa-solid fa-volume-high';
                    soundText.textContent = 'Sound On';
                }
                heroVideo.play();
            });
        }

        // Sound Mute / Unmute Toggle Handler
        if (soundToggleBtn) {
            soundToggleBtn.addEventListener('click', () => {
                heroVideo.muted = !heroVideo.muted;

                if (heroVideo.muted) {
                    soundIcon.className = 'fa-solid fa-volume-xmark';
                    soundText.textContent = 'Muted';
                } else {
                    soundIcon.className = 'fa-solid fa-volume-high';
                    soundText.textContent = 'Sound On';
                }
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
        sr.reveal('.project-card-aura', { interval: 180 });
        sr.reveal('.tech-matrix-card', { interval: 150 });
        sr.reveal('.milestone-card', { interval: 200 });
        sr.reveal('.gold-contact-box', { interval: 150 });
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
    const contactForm = document.querySelector('.contact-form-gold');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = 'SENDING MESSAGE... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            fetch("https://formsubmit.co/ajax/gundabathinabhanuprasad@gmail.com", {
                method: "POST",
                headers: { 'Accept': 'application/json' },
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = 'MESSAGE SENT SUCCESSFULLY! <i class="fa-solid fa-circle-check"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #10B981 0%, #059669 100%)';
                submitBtn.style.color = '#FFF';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3500);
            })
            .catch(error => {
                submitBtn.innerHTML = 'ERROR SENDING! PLEASE TRY AGAIN <i class="fa-solid fa-circle-xmark"></i>';
                submitBtn.style.background = '#EF4444';
                submitBtn.style.color = '#FFF';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.color = '';
                    submitBtn.disabled = false;
                }, 3500);
            });
        });
    }
});
