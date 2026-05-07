// Utility: Get current year
const getCurrentYear = () => new Date().getFullYear();

document.addEventListener('DOMContentLoaded', () => {
  // Footer Year
  const yearElement = document.getElementById('current-year');
  if (yearElement) yearElement.textContent = getCurrentYear();

  // Mobile Menu
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');

  const toggleMobileMenu = () => {
    if (!mobileMenu || !mobileMenuButton) return;
    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('-translate-y-full');
    document.body.classList.toggle('overflow-hidden');
    mobileMenuButton.setAttribute('aria-expanded', mobileMenu.classList.contains('hidden') ? 'false' : 'true');
    mobileMenu.setAttribute('aria-hidden', mobileMenu.classList.contains('hidden') ? 'true' : 'false');
  };

  if (mobileMenuButton && closeMobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', toggleMobileMenu);
    closeMobileMenuButton.addEventListener('click', toggleMobileMenu);
    mobileMenu.addEventListener('click', (event) => {
      if (event.target.tagName === 'A' || event.target === mobileMenu) {
        toggleMobileMenu();
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
      }
    });
  }

  // Smooth Scrolling
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
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
          toggleMobileMenu();
        }
      }
    });
  });

  // Form Validation & Submission
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  const validateField = (field, errorElement) => {
    let isValid = true;
    const value = field.value.trim();
    errorElement.textContent = '';
    errorElement.classList.add('hidden');

    if (field.hasAttribute('required') && !value) {
      errorElement.textContent = `${field.name} is required.`;
      isValid = false;
    } else if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      errorElement.textContent = 'Please enter a valid email.';
      isValid = false;
    } else if (field.minLength && value.length < field.minLength) {
      errorElement.textContent = `${field.name} must be at least ${field.minLength} characters.`;
      isValid = false;
    }
    if (!isValid) errorElement.classList.remove('hidden');
    return isValid;
  };

  if (contactForm && formMessage) {
    ['input', 'textarea'].forEach(type => {
      contactForm.querySelectorAll(type).forEach(field => {
        field.addEventListener('blur', () => {
          const errorElement = document.getElementById(`${field.id}-error`);
          if (errorElement) validateField(field, errorElement);
        });
      });
    });

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      let isFormValid = true;
      contactForm.querySelectorAll('[required]').forEach(field => {
        const errorElement = document.getElementById(`${field.id}-error`);
        if (errorElement && !validateField(field, errorElement)) isFormValid = false;
      });
      if (!isFormValid) return;

      const submitButton = contactForm.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (!response.ok) throw new Error('Submission failed');
        formMessage.textContent = 'Message sent successfully! Thank you.';
        formMessage.classList.remove('hidden', 'text-red-600');
        formMessage.classList.add('text-green-600');
        contactForm.reset();
      } catch (error) {
        console.error('Form error:', error);
        formMessage.textContent = 'An error occurred. Please try again.';
        formMessage.classList.remove('hidden', 'text-green-600');
        formMessage.classList.add('text-red-600');
      } finally {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.innerHTML = 'Send Message <i class="fas fa-paper-plane ml-2"></i>';
        }
        setTimeout(() => formMessage.classList.add('hidden'), 5000);
      }
    });
  }

  // Ad Modal
  const adModalOverlay = document.getElementById('ad-modal-overlay');
  const adModalContent = document.getElementById('ad-modal-content');
  const closeAdModalButton = document.getElementById('close-ad-modal');

  const showAdModal = () => {
    if (!adModalOverlay || !adModalOverlay.classList.contains('hidden')) return;
    adModalOverlay.classList.remove('hidden', 'opacity-0');
    adModalOverlay.classList.add('flex', 'items-center', 'justify-center', 'opacity-100');
    adModalOverlay.style.position = 'fixed';
    adModalOverlay.style.inset = '0';
    adModalOverlay.style.zIndex = '100';
    adModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('overflow-hidden');
    setTimeout(() => {
      if (adModalContent) {
        adModalContent.classList.remove('translate-y-4');
        adModalContent.classList.add('translate-y-0');
      }
      if (closeAdModalButton) closeAdModalButton.focus();
    }, 10);
  };

  const hideAdModal = () => {
    if (!adModalOverlay) return;
    if (adModalContent) {
      adModalContent.classList.remove('translate-y-0');
      adModalContent.classList.add('translate-y-4');
    }
    adModalOverlay.classList.add('opacity-0');
    adModalOverlay.classList.remove('opacity-100');
    setTimeout(() => {
      adModalOverlay.classList.add('hidden');
      adModalOverlay.classList.remove('flex', 'items-center', 'justify-center');
      adModalOverlay.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('overflow-hidden');
      adModalOverlay.style = '';
    }, 300);
  };

  if (closeAdModalButton) closeAdModalButton.addEventListener('click', hideAdModal);
  if (adModalContent) {
    adModalContent.addEventListener('click', (e) => {
      if (e.target.closest('a')) hideAdModal();
    });
  }
  if (adModalOverlay) {
    adModalOverlay.addEventListener('click', (e) => {
      if (e.target === adModalOverlay) hideAdModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !adModalOverlay.classList.contains('hidden')) hideAdModal();
    });
  }
  setTimeout(showAdModal, 2000);

  // Preview Modal
  const previewModal = document.getElementById('preview-modal');
  const closePreviewButton = document.getElementById('close-modal-button');
  const previewIframe = document.getElementById('preview-iframe');
  if (closePreviewButton && previewModal) {
    closePreviewButton.addEventListener('click', () => {
      previewModal.classList.add('hidden');
      previewModal.setAttribute('aria-hidden', 'true');
      if (previewIframe) previewIframe.src = '';
    });
  }
});