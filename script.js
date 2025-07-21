// JavaScript for Smooth Scrolling and Navbar Active State
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return; 

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
            // Update active state in navbar
            document.querySelectorAll('.navbar-links .nav-link').forEach(link => {
                link.classList.remove('active');
            });
            this.classList.add('active');
        }
    });
});

// JavaScript for FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');

        // Close all other open answers
        document.querySelectorAll('.faq-answer.open').forEach(openAnswer => {
            if (openAnswer !== answer) {
                openAnswer.classList.remove('open');
                openAnswer.style.maxHeight = null;
                openAnswer.previousElementSibling.querySelector('i').classList.remove('active');
            }
        });

        // Toggle current answer
        question.classList.toggle('active');
        icon.classList.toggle('active');
        if (answer.classList.contains('open')) {
            answer.classList.remove('open');
            answer.style.maxHeight = null;
        } else {
            answer.classList.add('open');
            answer.style.maxHeight = answer.scrollHeight + "px";
        }
    });
});

// JavaScript for Sticky CTA Button
const stickyCtaButton = document.getElementById('stickyCtaButton');
const heroSection = document.getElementById('hero-section'); 
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    const navbarHeight = navbar.offsetHeight;

    // Show/hide sticky CTA button
    if (window.scrollY > heroBottom) {
        stickyCtaButton.style.display = 'block';
        stickyCtaButton.style.opacity = '1';
    } else {
        stickyCtaButton.style.opacity = '0';
        setTimeout(() => {
            if (window.scrollY <= heroBottom) { // Re-check in case user scrolled back quickly
                stickyCtaButton.style.display = 'none';
            }
        }, 300); 
    }

    // Highlight active navbar link based on scroll position
    const sections = document.querySelectorAll('section, header.hero-section, footer');
    let currentActive = null;
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navbarHeight - 50; // Adjust for navbar height and some buffer
        const sectionBottom = sectionTop + section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
            let id = section.getAttribute('id');
            if (!id && section.classList.contains('hero-section')) {
                id = 'hero-section'; // Special case for hero section
            }
            if (id) {
                 const correspondingLink = document.querySelector(`.navbar-links a[href="#${id}"]`);
                 if (correspondingLink) {
                     currentActive = correspondingLink;
                 }
            }
        }
    });

    document.querySelectorAll('.navbar-links .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    if (currentActive) {
        currentActive.classList.add('active');
    }
});

// Simple counter animation for Hero Trust Counters (simulated growth)
function animateCounter(id, start, end, duration) {
    const obj = document.getElementById(id);
    if (!obj) return;
    let current = start;
    const range = end - start;
    let increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
        current += increment;
        // For rating, format to one decimal place
        if (id === 'ratingCounter') {
            obj.textContent = current.toFixed(1);
        } else {
            obj.textContent = Math.round(current) + '+';
        }
        if (current >= end && increment > 0 || current <= end && increment < 0) {
            clearInterval(timer);
            // Ensure final value is exact for counters
            if (id === 'ratingCounter') {
                obj.textContent = end.toFixed(1);
            } else {
                obj.textContent = end + '+';
            }
        }
    }, stepTime);
}

// Intersection Observer for Section Animations
const sections
