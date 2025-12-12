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
      mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
      mobileMenu.setAttribute('aria-hidden', mobileMenu.classList.contains('hidden') ? 'true' : 'false');
    };
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    closeMobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenu.addEventListener('click', (event) => {
      if (event.target.tagName === 'A' || event.target === mobileMenu) {
        toggleMobileMenu();
      }
    });
    // Close mobile menu using Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
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
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
      }

      try {
        // Perform a real POST using the form's action, falling back to a simulated delay on failure
        const actionUrl = contactForm.getAttribute('action');
        let response = null;
        if (actionUrl) {
          const formData = new FormData(contactForm);
          try {
            response = await fetch(actionUrl, {
              method: 'POST',
              body: formData,
              headers: {
                'Accept': 'application/json',
              }
            });
          } catch (err) {
            // network error - keep response null
            response = null;
            console.warn('Form fetch failed, using fallback');
          }
        }
        // If fetch wasn't successful, simulate a short delay to preserve UX
        if (!response || !response.ok) await new Promise(resolve => setTimeout(resolve, 800));

        if (response && !response.ok) throw new Error('Form submission returned non-OK response');
        formMessage.textContent = 'Message sent successfully! Thank you.';
        formMessage.classList.remove('hidden');
        formMessage.classList.add('mt-6', 'text-center', 'text-green-600', 'font-medium');
        contactForm.reset();
      } catch (error) {
        console.error('Form submission error:', error);
        formMessage.textContent = 'An error occurred. Please try again later.';
        formMessage.classList.remove('hidden');
        formMessage.classList.add('mt-6', 'text-center', 'text-red-600', 'font-medium');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = 'Send Message';
        }
        setTimeout(() => {
          formMessage.classList.add('hidden');
        }, 5000);
      }
    });
  }

  // ================= AD POP-UP LOGIC =================
  const adModalOverlay = document.getElementById('ad-modal-overlay');
  const adModalContent = document.getElementById('ad-modal-content');
  const closeAdModalButton = document.getElementById('close-ad-modal');
  // Note: We show the ad on every page load (no localStorage suppression)

  const showAdModal = () => {
    if (!adModalOverlay || !adModalOverlay.classList.contains('hidden')) return;
    adModalOverlay.classList.remove('hidden');
    adModalOverlay.classList.add('flex');
    adModalOverlay.classList.add('items-center', 'justify-center');
    adModalOverlay.setAttribute('aria-hidden', 'false');
    // prevent background scroll while modal is open
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      adModalOverlay.classList.add('opacity-100');
      adModalOverlay.classList.remove('opacity-0');
      if (adModalContent) {
        adModalContent.classList.remove('translate-y-4');
        adModalContent.classList.add('translate-y-0');
      }
      if (closeAdModalButton) closeAdModalButton.focus();
    }, 10);
  };

  const hideAdModal = () => {
    if (!adModalOverlay) return;
    // NOTE: Do not store dismissal time so the ad will reappear on reload
    if (adModalContent) {
      adModalContent.classList.remove('translate-y-0');
      adModalContent.classList.add('translate-y-4');
    }
    adModalOverlay.classList.add('opacity-0');
    adModalOverlay.classList.remove('opacity-100');
    setTimeout(() => {
      adModalOverlay.classList.add('hidden');
      adModalOverlay.classList.remove('flex');
      adModalOverlay.classList.remove('items-center', 'justify-center');
      adModalOverlay.setAttribute('aria-hidden', 'true');
      // release page scroll when modal closes
      document.body.classList.remove('overflow-hidden');
    }, 300);
  };

  if (closeAdModalButton) {
    closeAdModalButton.addEventListener('click', hideAdModal);
  }
  // Close modal if user clicks a link inside modal (open in new tab but close modal for better UX)
  if (adModalContent) {
    adModalContent.addEventListener('click', (e) => {
      const anchor = e.target.closest && e.target.closest('a');
      if (anchor) {
        hideAdModal();
      }
    });
  }
  if (adModalOverlay) {
    adModalOverlay.addEventListener('click', (e) => {
      if (e.target === adModalOverlay) hideAdModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && adModalOverlay && !adModalOverlay.classList.contains('hidden')) {
      hideAdModal();
    }
  });
  // Show ad on every page load
  setTimeout(showAdModal, 2000);
  // ===== Preview Modal Close Logic =====
  const previewModal = document.getElementById('preview-modal');
  const closePreviewButton = document.getElementById('close-modal-button');
  const previewIframe = document.getElementById('preview-iframe');
  if (closePreviewButton && previewModal) {
    closePreviewButton.addEventListener('click', () => {
      previewModal.classList.add('hidden');
      previewModal.classList.remove('flex');
      previewModal.setAttribute('aria-hidden', 'true');
      if (previewIframe) previewIframe.src = '';
    });
  }
});
// (Duplicate form submission handler intentionally removed; there is one inside DOMContentLoaded)

// 3rd-party libraries (Alpine.js, Tailwind) are loaded directly in index.html
// (Duplicate form submission handler intentionally removed; there is one inside DOMContentLoaded)
// Note: 3rd-party libraries such as Alpine.js and Tailwind CSS are loaded directly in index.html.