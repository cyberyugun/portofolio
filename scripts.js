const menuToggle = document.getElementById('mobile-menu-toggle');
const menuIcon = document.querySelector('.menu-icon');

menuToggle.addEventListener('click', function() {
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenu.classList.toggle('hidden');
    
    // Toggle menu icon between hamburger and close icon
    if (mobileMenu.classList.contains('hidden')) {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>';
    } else {
        menuIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
    }
});

// Text for typing animation
const texts = [
    "Let's build something awesome together!",
    "Together we can create stunning web experiences.",
    "Ready to bring your ideas to life? Let's talk!",
];
// Delay between each character (in milliseconds)
const speed = 100;
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
    const currentText = texts[textIndex];
    if (!isDeleting && charIndex < currentText.length) {
        document.getElementById("typing-animation").querySelector("p").textContent += currentText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, speed);
    } else if (isDeleting && charIndex >= 0) {
        const newText = currentText.substring(0, charIndex);
        document.getElementById("typing-animation").querySelector("p").textContent = newText;
        charIndex--;
        setTimeout(typeWriter, speed / 2);
    } else {
        isDeleting = !isDeleting;
        if (!isDeleting) {
            textIndex = (textIndex + 1) % texts.length;
        }
        setTimeout(typeWriter, speed / 2);
    }
}

// Start typing animation when the page loads
window.onload = function () {
    typeWriter();
};

// Get the button element
var scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Add scroll event listener to window
window.addEventListener("scroll", function() {
    // If the user scrolled down more than 20px from the top, show the button
    if (window.scrollY > 20) {
        scrollToTopBtn.style.display = "block";
    } else {
        // Otherwise, hide the button
        scrollToTopBtn.style.display = "none";
    }
});

// Function to scroll to the top of the page
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

