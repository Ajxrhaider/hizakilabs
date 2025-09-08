
// Utility: Get current year
const getCurrentYear = () => new Date().getFullYear();

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
      mobileMenu.classList.toggle('-translate-y-full');
      document.body.classList.toggle('overflow-hidden');
      mobileMenuButton.setAttribute(
        'aria-expanded',
        mobileMenu.classList.contains('hidden') ? 'false' : 'true'
      );
    };
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    closeMobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenu.addEventListener('click', (event) => {
      if (event.target.tagName === 'A' || event.target === mobileMenu) {
        toggleMobileMenu();
      }
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
        const offsetPosition = elementPosition - headerOffset - 20;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        // Close mobile menu after clicking a link
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          toggleMobileMenu();
        }
      }
    });
  });

  // --- Form Submission Handler ---
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const submitButton = contactForm.querySelector('button[type="submit"]');
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';

      // Simulate API call (replace with real fetch if needed)
      await new Promise(resolve => setTimeout(resolve, 1500));

      try {
        formMessage.textContent = 'Message sent successfully! Thank you.';
        formMessage.className = 'mt-6 text-center text-green-600 font-medium';
        contactForm.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        formMessage.textContent = 'An error occurred. Please try again later.';
        formMessage.className = 'mt-6 text-center text-red-600 font-medium';
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
        formMessage.classList.remove('hidden');
        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 5000);
      }
    });
  }
});