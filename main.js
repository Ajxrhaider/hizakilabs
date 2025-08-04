 // Get current year for footer
 function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}
// Set the current year in the footer
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('current-year');
document.getElementById('current-year').textContent = new Date().getFullYear();
function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}
document.addEventListener('DOMContentLoaded', () => {
  const yearElement = document.getElementById('current-year');
// Mobile menu toggle functionality
const mobileMenuButton = document.getElementById('mobile-menu-button');
const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

function toggleMobileMenu() {
    mobileMenu.classList.toggle('hidden');
    document.body.classList.toggle('overflow-hidden'); // Prevent scrolling when menu is open
}

mobileMenuButton.addEventListener('click', toggleMobileMenu);
closeMobileMenuButton.addEventListener('click', toggleMobileMenu);

// Close mobile menu when clicking outside (optional, but good UX)
mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) {
        toggleMobileMenu();
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Adjust scroll position to account for fixed header
            const headerOffset = document.querySelector('header').offsetHeight;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20; // 20px extra padding

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});