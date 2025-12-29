// Main JavaScript for Homepage

// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('mainNavbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Load featured products on homepage
document.addEventListener('DOMContentLoaded', function () {
    const featuredProductsContainer = document.getElementById('featuredProducts');

    if (featuredProductsContainer) {
        const featuredProducts = getFeaturedProducts();
        featuredProductsContainer.innerHTML = featuredProducts.map(product =>
            createProductCard(product)
        ).join('');
    }

    // Add smooth scroll to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s both`;
    });

    // Newsletter subscription
    const newsletterBtn = document.querySelector('.footer .btn-primary');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', function () {
            const emailInput = this.previousElementSibling;
            const email = emailInput.value;

            if (email && validateEmail(email)) {
                showToast('Thank you for subscribing to our newsletter!', 'success');
                emailInput.value = '';
            } else {
                showToast('Please enter a valid email address', 'error');
            }
        });
    }
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.6s ease both';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe category cards and feature sections
document.addEventListener('DOMContentLoaded', function () {
    const elementsToAnimate = document.querySelectorAll('.category-card, .feature-icon');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});
