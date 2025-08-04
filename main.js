// Function to get the current year
function getCurrentYear() {
  const date = new Date();
  return date.getFullYear();
}

// Add an event listener to run code after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

  // --- Footer Year Logic ---
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = getCurrentYear();
  }

  // --- Mobile Menu Logic ---
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  // Check if all necessary elements exist before adding listeners
  if (mobileMenuButton && closeMobileMenuButton && mobileMenu) {
    
    function toggleMobileMenu() {
      mobileMenu.classList.toggle('hidden');
      // Prevent scrolling when menu is open
      document.body.classList.toggle('overflow-hidden'); 
    }

    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    closeMobileMenuButton.addEventListener('click', toggleMobileMenu);

    // Close the mobile menu if the user clicks outside of it
    mobileMenu.addEventListener('click', (event) => {
      if (event.target === mobileMenu) {
        toggleMobileMenu();
      }
    });
  }

  // --- Smooth Scrolling Logic ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Account for a fixed header by getting its height
        const headerOffset = document.querySelector('header')?.offsetHeight || 0;
        const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        // Add 20px of extra padding for better spacing
        const offsetPosition = elementPosition - headerOffset - 20; 

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    });
  });
});