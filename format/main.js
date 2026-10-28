/**
 * Hizaki Labs - Main JavaScript File
 * Enhanced with better accessibility, validation, and interactivity
 */

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get current year for footer
 */
const getCurrentYear = () => new Date().getFullYear();

/**
 * Debounce function to optimize event handlers
 */
const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Check if element is in viewport
 */
const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
};

/**
 * Log errors to console with custom prefix
 */
const logError = (message, error = null) => {
  console.error(`[Hizaki Labs Error] ${message}`, error || '');
};

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  try {
    initFooterYear();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initAdModal();
    initPreviewModal();
    initAccessibilityEnhancements();
  } catch (error) {
    logError('Initialization failed', error);
  }
});

// ============================================================================
// FOOTER INITIALIZATION
// ============================================================================

/**
 * Initialize footer year
 */
function initFooterYear() {
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = getCurrentYear();
  }
}

// ============================================================================
// MOBILE MENU
// ============================================================================

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = mobileMenu?.querySelectorAll('a');

  if (!mobileMenuButton || !closeMobileMenuButton || !mobileMenu) return;

  const toggleMobileMenu = (shouldOpen = null) => {
    const isHidden = mobileMenu.classList.contains('hidden');
    const shouldToggle = shouldOpen !== null ? shouldOpen !== isHidden : true;

    if (!shouldToggle) return;

    mobileMenu.classList.toggle('hidden');
    mobileMenu.classList.toggle('-translate-y-full');
    document.body.classList.toggle('overflow-hidden');
    
    const isNowOpen = !mobileMenu.classList.contains('hidden');
    mobileMenuButton.setAttribute('aria-expanded', isNowOpen ? 'true' : 'false');
    mobileMenu.setAttribute('aria-hidden', !isNowOpen ? 'true' : 'false');
    
    // Add transition state for smooth animation
    mobileMenu.setAttribute('data-state', isNowOpen ? 'open' : 'closed');
  };

  // Event listeners
  mobileMenuButton.addEventListener('click', () => toggleMobileMenu());
  closeMobileMenuButton.addEventListener('click', () => toggleMobileMenu(false));

  // Close menu when a nav link is clicked
  navLinks?.forEach(link => {
    link.addEventListener('click', () => toggleMobileMenu(false));
  });

  // Close menu on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
      toggleMobileMenu(false);
    }
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideMenu = mobileMenu.contains(e.target);
    const isClickOnButton = mobileMenuButton.contains(e.target);
    
    if (!isClickInsideMenu && !isClickOnButton && !mobileMenu.classList.contains('hidden')) {
      toggleMobileMenu(false);
    }
  });
}

// ============================================================================
// SMOOTH SCROLLING
// ============================================================================

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
  });
}

/**
 * Handle anchor click for smooth scrolling
 */
function handleAnchorClick(e) {
  const targetId = this.getAttribute('href');
  
  if (!targetId || targetId === '#') return;

  const targetElement = document.querySelector(targetId);
  
  if (!targetElement) {
    logError(`Target element not found: ${targetId}`);
    return;
  }

  e.preventDefault();

  const header = document.querySelector('header');
  const headerOffset = header?.offsetHeight || 0;
  const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const offsetPosition = elementPosition - headerOffset - 20;

  // Add smooth scroll animation
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
    duration: 800
  });

  // Update URL without page jump
  window.history.pushState(null, null, targetId);

  // Close mobile menu if open
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
    const event = new Event('click');
    document.getElementById('close-mobile-menu-button')?.dispatchEvent(event);
  }
}

// ============================================================================
// FORM VALIDATION & SUBMISSION
// ============================================================================

/**
 * Form field validation rules
 */
const validationRules = {
  name: {
    validate: (value) => value.trim().length >= 2,
    message: 'Name must be at least 2 characters long'
  },
  email: {
    validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    message: 'Please enter a valid email address'
  },
  subject: {
    validate: (value) => value.trim().length >= 3,
    message: 'Subject must be at least 3 characters long'
  },
  message: {
    validate: (value) => value.trim().length >= 10,
    message: 'Message must be at least 10 characters long'
  }
};

/**
 * Initialize contact form
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-form');
  if (!contactForm) return;

  // Add real-time validation
  Object.keys(validationRules).forEach(fieldName => {
    const field = contactForm.querySelector(`[name="${fieldName}"]`);
    if (field) {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => clearFieldError(field));
    }
  });

  // Form submission
  contactForm.addEventListener('submit', handleFormSubmit);
}

/**
 * Validate a single form field
 */
function validateField(field) {
  const fieldName = field.name;
  const rule = validationRules[fieldName];
  
  if (!rule) return true;

  const isValid = rule.validate(field.value);
  
  if (!isValid) {
    showFieldError(field, rule.message);
  } else {
    clearFieldError(field);
  }
  
  return isValid;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
  field.classList.add('border-red-500', 'focus:ring-red-500');
  field.classList.remove('border-gray-300', 'focus:ring-primary');
  field.setAttribute('aria-invalid', 'true');
  
  // Remove existing error message
  const existingError = field.parentElement.querySelector('.field-error');
  if (existingError) existingError.remove();
  
  // Add new error message
  const errorElement = document.createElement('div');
  errorElement.className = 'field-error text-red-500 text-sm mt-1';
  errorElement.setAttribute('role', 'alert');
  errorElement.textContent = message;
  field.parentElement.appendChild(errorElement);
}

/**
 * Clear field error
 */
function clearFieldError(field) {
  field.classList.remove('border-red-500', 'focus:ring-red-500');
  field.classList.add('border-gray-300', 'focus:ring-primary');
  field.setAttribute('aria-invalid', 'false');
  
  const errorElement = field.parentElement.querySelector('.field-error');
  if (errorElement) errorElement.remove();
}

/**
 * Validate entire form
 */
function validateForm(form) {
  const fields = form.querySelectorAll('input[type="text"], input[type="email"], textarea');
  let isValid = true;

  fields.forEach(field => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  return isValid;
}

/**
 * Handle form submission
 */
async function handleFormSubmit(e) {
  e.preventDefault();

  const contactForm = e.target;
  const formMessage = document.getElementById('form-message');
  const submitButton = contactForm.querySelector('button[type="submit"]');

  if (!submitButton) return;

  // Validate form
  if (!validateForm(contactForm)) {
    showFormMessage('Please correct the errors above.', 'error', formMessage);
    return;
  }

  // Disable submit button and show loading state
  submitButton.disabled = true;
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Sending...';
  submitButton.setAttribute('aria-busy', 'true');

  try {
    const actionUrl = contactForm.getAttribute('action');
    
    if (!actionUrl) {
      throw new Error('Form action URL is missing');
    }

    const formData = new FormData(contactForm);
    
    const response = await fetch(actionUrl, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    showFormMessage('Message sent successfully! Thank you.', 'success', formMessage);
    contactForm.reset();
    
    // Clear validation states
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      clearFieldError(field);
    });

  } catch (error) {
    logError('Form submission failed', error);
    showFormMessage(
      'Failed to send message. Please try again later or contact us directly.',
      'error',
      formMessage
    );
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = originalText;
    submitButton.setAttribute('aria-busy', 'false');

    // Auto-hide message after 5 seconds
    setTimeout(() => {
      if (formMessage && !formMessage.classList.contains('hidden')) {
        hideFormMessage(formMessage);
      }
    }, 5000);
  }
}

/**
 * Show form message
 */
function showFormMessage(message, type = 'success', formMessage) {
  if (!formMessage) return;

  formMessage.textContent = message;
  formMessage.classList.remove('hidden');
  
  // Remove previous type classes
  formMessage.classList.remove('text-green-600', 'text-red-600', 'bg-green-50', 'bg-red-50');
  
  // Add type-specific classes
  if (type === 'success') {
    formMessage.classList.add('mt-6', 'p-4', 'text-center', 'text-green-600', 'font-medium', 'bg-green-50', 'rounded-lg');
  } else if (type === 'error') {
    formMessage.classList.add('mt-6', 'p-4', 'text-center', 'text-red-600', 'font-medium', 'bg-red-50', 'rounded-lg');
  }
  
  formMessage.setAttribute('role', 'alert');
  formMessage.setAttribute('aria-live', 'assertive');
}

/**
 * Hide form message
 */
function hideFormMessage(formMessage) {
  if (!formMessage) return;
  formMessage.classList.add('hidden');
}

// ============================================================================
// AD MODAL
// ============================================================================

/**
 * Initialize ad modal
 */
function initAdModal() {
  const adModalOverlay = document.getElementById('ad-modal-overlay');
  const closeAdModalButton = document.getElementById('close-ad-modal');

  if (!adModalOverlay) return;

  // Close button
  if (closeAdModalButton) {
    closeAdModalButton.addEventListener('click', () => hideAdModal(adModalOverlay));
  }

  // Close on overlay click
  adModalOverlay.addEventListener('click', (e) => {
    if (e.target === adModalOverlay) {
      hideAdModal(adModalOverlay);
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !adModalOverlay.classList.contains('hidden')) {
      hideAdModal(adModalOverlay);
    }
  });

  // Show ad after 2 seconds
  setTimeout(() => showAdModal(adModalOverlay), 2000);
}

/**
 * Show ad modal
 */
function showAdModal(overlay) {
  if (!overlay || !overlay.classList.contains('hidden')) return;

  overlay.classList.remove('hidden', 'opacity-0');
  overlay.classList.add('flex', 'items-center', 'justify-center', 'opacity-100');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.classList.add('overflow-hidden');

  const closeButton = overlay.querySelector('#close-ad-modal');
  if (closeButton) {
    setTimeout(() => closeButton.focus(), 100);
  }
}

/**
 * Hide ad modal
 */
function hideAdModal(overlay) {
  if (!overlay) return;

  overlay.classList.add('opacity-0');
  overlay.classList.remove('opacity-100');

  setTimeout(() => {
    overlay.classList.add('hidden');
    overlay.classList.remove('flex', 'items-center', 'justify-center');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('overflow-hidden');
  }, 300);
}

// ============================================================================
// PREVIEW MODAL
// ============================================================================

/**
 * Initialize preview modal
 */
function initPreviewModal() {
  const previewModal = document.getElementById('preview-modal');
  const closePreviewButton = document.getElementById('close-modal-button');
  const previewIframe = document.getElementById('preview-iframe');

  if (!closePreviewButton || !previewModal) return;

  closePreviewButton.addEventListener('click', () => {
    previewModal.classList.add('hidden');
    previewModal.setAttribute('aria-hidden', 'true');
    if (previewIframe) previewIframe.src = '';
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !previewModal.classList.contains('hidden')) {
      closePreviewButton.click();
    }
  });

  // Close on overlay click
  previewModal.addEventListener('click', (e) => {
    if (e.target === previewModal) {
      closePreviewButton.click();
    }
  });
}

// ============================================================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================================================

/**
 * Initialize accessibility enhancements
 */
function initAccessibilityEnhancements() {
  // Add keyboard navigation for buttons
  document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && element.tagName === 'BUTTON') {
        element.click();
      }
    });
  });

  // Add focus visible styles
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });

  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });

  // Add skip to main content link
  addSkipLink();

  // Enhance form labels
  enhanceFormLabels();
}

/**
 * Add skip to main link
 */
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.textContent = 'Skip to main content';
  skipLink.className = 'sr-only focus:not-sr-only fixed top-0 left-0 z-[9999] bg-primary text-white px-4 py-2 rounded';
  skipLink.setAttribute('aria-label', 'Skip to main content');
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Add ID to main if not present
  const main = document.querySelector('main');
  if (main && !main.id) {
    main.id = 'main';
  }
}

/**
 * Enhance form labels for accessibility
 */
function enhanceFormLabels() {
  document.querySelectorAll('form').forEach(form => {
    form.querySelectorAll('input, textarea, select').forEach(field => {
      const label = form.querySelector(`label[for="${field.id}"]`);
      
      if (!label && field.name) {
        logError(`Label not found for field: ${field.name}`);
      }

      // Add ARIA attributes
      if (field.hasAttribute('required')) {
        field.setAttribute('aria-required', 'true');
        const label = form.querySelector(`label[for="${field.id}"]`);
        if (label && !label.textContent.includes('*')) {
          label.innerHTML += ' <span aria-label="required">*</span>';
        }
      }

      // Add description for placeholder-only fields
      if (field.placeholder && !label) {
        field.setAttribute('aria-label', field.placeholder);
      }
    });
  });
}

// ============================================================================
// PERFORMANCE MONITORING
// ============================================================================

/**
 * Monitor page performance
 */
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page load time: ${pageLoadTime}ms`);
  });
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

/**
 * Global error handler
 */
window.addEventListener('error', (event) => {
  logError('Uncaught error', event.error);
});

/**
 * Unhandled promise rejection
 */
window.addEventListener('unhandledrejection', (event) => {
  logError('Unhandled promise rejection', event.reason);
});