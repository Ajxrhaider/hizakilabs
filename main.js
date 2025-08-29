// Hizaki Labs Main JS - Cleaned & Optimized

// Utility: Get current year
const getCurrentYear = () => new Date().getFullYear();

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  // --- Footer Year ---
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = getCurrentYear();

  // --- Mobile Menu ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuButton && closeMobileMenuButton && mobileMenu) {
    const toggleMobileMenu = () => {
      mobileMenu.classList.toggle('hidden');
      document.body.classList.toggle('overflow-hidden'); // Prevent background scroll
    };
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    closeMobileMenuButton.addEventListener('click', toggleMobileMenu);
    // Close menu if clicking overlay (not menu content)
    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) toggleMobileMenu();
    });
  }

  // --- Smooth Scrolling for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const header = document.querySelector('header');
        const headerOffset = header ? header.offsetHeight : 0;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset - 20; // 20px extra padding
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});