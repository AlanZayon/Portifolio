// Smooth scrolling for navigation links + active state
document.querySelectorAll('.navbar-nav .nav-link[href^="#"], .js-section-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (!targetId || targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (!targetElement) return;

        if (this.classList.contains('nav-link')) {
            setActiveNavLink(targetId);
        } else if (targetId.startsWith('#project-')) {
            setActiveNavLink('#projects');
        }

        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });

        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            const toggler = document.querySelector('.navbar-toggler');
            if (toggler && typeof bootstrap !== 'undefined') {
                const collapse = bootstrap.Collapse.getInstance(navbarCollapse)
                    || new bootstrap.Collapse(navbarCollapse, { toggle: false });
                collapse.hide();
            } else {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

function setActiveNavLink(hash) {
    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === hash);
    });
}

function updateActiveNavOnScroll() {
    const sections = ['skills', 'aboutMe', 'experience', 'projects', 'contact']
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const scrollPos = window.scrollY + 120;
    let currentId = null;

    for (const section of sections) {
        if (scrollPos >= section.offsetTop) {
            currentId = section.id;
        }
    }

    // Near top / hero: no section active
    if (window.scrollY < 80) {
        document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
            link.classList.remove('active');
        });
        return;
    }

    if (currentId) {
        setActiveNavLink('#' + currentId);
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    updateActiveNavOnScroll();
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');
window.addEventListener('scroll', function () {
    if (!backToTopButton) return;
    if (window.scrollY > 300) {
        backToTopButton.classList.add('active');
    } else {
        backToTopButton.classList.remove('active');
    }
});

// Form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        if (!name || !email || !subject || !message) {
            alert('Please fill in all fields.');
            return;
        }

        alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
        this.reset();
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.typed-text') && typeof Typed !== 'undefined') {
        new Typed('.typed-text', {
            strings: ['Full-Stack .NET Developer', 'C# / ASP.NET Core', 'Angular & Vue', 'APIs & Async Jobs'],
            typeSpeed: 50,
            backSpeed: 30,
            loop: true
        });
    }

    const animateOnScroll = function () {
        const elements = document.querySelectorAll('.animate-fadeInUp');

        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    animateOnScroll();
    window.addEventListener('scroll', animateOnScroll);
    updateActiveNavOnScroll();
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        setActiveNavLink('#' + sectionId);
        window.scrollTo({
            top: section.offsetTop - 80,
            behavior: 'smooth'
        });
    }
}
