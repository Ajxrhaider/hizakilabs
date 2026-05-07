/**
 * Main Application Module
 * Orchestrates all functionality and initialization
 */

import CONFIG from './config.js';
import {
  getCurrentYear,
  querySelector,
  querySelectorAll,
  addClasses,
  removeClasses,
  setAttribute,
  getAttribute,
  toggleClass,
  hasClass,
  debounce,
  log,
  validateEmail
} from './utilities.js';

class HizakiLabs {
  constructor() {
    this.config = CONFIG;
    this.initialized = false;
  }

  init() {
    try {
      log.info('Initializing Hizaki Labs application');
      
      this.initializeFooter();
      this.initializeMobileMenu();
      this.initializeSmoothScroll();
      this.initializeContactForm();
      this.initializeAdModal();
      this.initializeAccessibility();
      
      this.initialized = true;
      log.success('Application initialized successfully');
      
      // Dispatch custom event
      window.dispatchEvent(new CustomEvent('hizaki-labs:ready'));
    } catch (error) {
      log.error('Initialization failed', error);
    }
  }

  initializeFooter() {
    const yearElement = querySelector(this.config.UI.SELECTORS.CURRENT_YEAR);
    if (yearElement) {
      yearElement.textContent = getCurrentYear();
    }
  }

  initializeMobileMenu() {
    const menuButton = querySelector(this.config.UI.SELECTORS.MOBILE_MENU_BUTTON);
    const closeButton = querySelector(this.config.UI.SELECTORS.CLOSE_MOBILE_MENU);
    const menu = querySelector(this.config.UI.SELECTORS.MOBILE_MENU);

    if (!menuButton || !closeButton || !menu) return;

    const toggleMenu = (shouldOpen = null) => {
      const isHidden = hasClass(menu, this.config.UI.CLASSES.HIDDEN);
      const shouldToggle = shouldOpen !== null ? shouldOpen !== isHidden : true;

      if (!shouldToggle) return;

      toggleClass(menu, this.config.UI.CLASSES.HIDDEN);
      toggleClass(menu, this.config.UI.CLASSES.TRANSLATE_Y);
      toggleClass(document.body, this.config.UI.CLASSES.OVERFLOW_HIDDEN);

      const isNowOpen = !hasClass(menu, this.config.UI.CLASSES.HIDDEN);
      setAttribute(menuButton, 'aria-expanded', isNowOpen ? 'true' : 'false');
      setAttribute(menu, 'aria-hidden', !isNowOpen ? 'true' : 'false');
    };

    menuButton.addEventListener('click', () => toggleMenu());
    closeButton.addEventListener('click', () => toggleMenu(false));

    querySelectorAll(this.config.UI.SELECTORS.MOBILE_MENU + ' a').forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !hasClass(menu, this.config.UI.CLASSES.HIDDEN)) {
        toggleMenu(false);
      }
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!menu.contains(e.target) && !menuButton.contains(e.target) && 
          !hasClass(menu, this.config.UI.CLASSES.HIDDEN)) {
        toggleMenu(false);
      }
    });
  }

  initializeSmoothScroll() {
    querySelectorAll(this.config.UI.SELECTORS.NAV_LINKS).forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleAnchorClick(e));
    });
  }

  handleAnchorClick(e) {
    const href = getAttribute(e.target, 'href');
    if (!href || href === '#') return;

    const target = querySelector(href);
    if (!target) return;

    e.preventDefault();

    const header = querySelector('header');
    const offset = header?.offsetHeight || 0;
    const position = target.getBoundingClientRect().top + window.pageYOffset - offset - 20;

    window.scrollTo({
      top: position,
      behavior: this.config.UI.TIMING.SCROLL_BEHAVIOR
    });

    window.history.pushState(null, null, href);

    // Close mobile menu
    const menu = querySelector(this.config.UI.SELECTORS.MOBILE_MENU);
    if (menu && !hasClass(menu, this.config.UI.CLASSES.HIDDEN)) {
      querySelector(this.config.UI.SELECTORS.CLOSE_MOBILE_MENU)?.click();
    }
  }

  initializeContactForm() {
    const form = querySelector(this.config.UI.SELECTORS.CONTACT_FORM);
    if (!form || !this.config.FEATURES.ENABLE_FORM_SUBMISSION) return;

    // Add validation listeners
    Object.entries(this.config.VALIDATION).forEach(([fieldName, rules]) => {
      const field = form.querySelector(`[name="${fieldName}"]`);
      if (!field) return;

      field.addEventListener('blur', () => this.validateField(field, rules));
      field.addEventListener('input', () => this.clearFieldError(field));
    });

    form.addEventListener('submit', (e) => this.handleFormSubmit(e));
  }

  validateField(field, rules) {
    const value = field.value.trim();
    let isValid = true;
    let error = '';

    if (rules.minLength && value.length < rules.minLength) {
      isValid = false;
      error = rules.message;
    } else if (rules.maxLength && value.length > rules.maxLength) {
      isValid = false;
      error = rules.message;
    } else if (rules.pattern && !rules.pattern.test(value)) {
      isValid = false;
      error = rules.message;
    }

    if (!isValid) {
      this.showFieldError(field, error);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  }

  showFieldError(field, message) {
    addClasses(field, 'border-red-500', 'focus:ring-red-500');
    removeClasses(field, 'border-gray-300', 'focus:ring-primary');
    setAttribute(field, 'aria-invalid', 'true');

    const existing = field.parentElement?.querySelector('.field-error');
    if (existing) existing.remove();

    const error = document.createElement('span');
    error.className = 'field-error text-red-500 text-sm mt-1 block';
    setAttribute(error, 'role', 'alert');
    error.textContent = message;
    field.parentElement?.appendChild(error);
  }

  clearFieldError(field) {
    removeClasses(field, 'border-red-500', 'focus:ring-red-500');
    addClasses(field, 'border-gray-300', 'focus:ring-primary');
    setAttribute(field, 'aria-invalid', 'false');
    field.parentElement?.querySelector('.field-error')?.remove();
  }

  validateForm(form) {
    const fields = form.querySelectorAll('[required]');
    let isValid = true;

    fields.forEach(field => {
      const rules = this.config.VALIDATION[field.name];
      if (rules && !this.validateField(field, rules)) {
        isValid = false;
      }
    });

    return isValid;
  }

  async handleFormSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const button = form.querySelector('button[type="submit"]');
    const message = querySelector(this.config.UI.SELECTORS.FORM_MESSAGE);

    if (!button) return;

    if (!this.validateForm(form)) {
      this.showFormMessage(this.config.ERRORS.INVALID_FORM, 'error', message);
      return;
    }

    button.disabled = true;
    const originalText = button.textContent;
    button.textContent = 'Sending...';
    setAttribute(button, 'aria-busy', 'true');

    try {
      const action = getAttribute(form, 'action');
      if (!action) throw new Error('Form action missing');

      const response = await fetch(action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      this.showFormMessage(this.config.SUCCESS.FORM_SUBMITTED, 'success', message);
      form.reset();
      form.querySelectorAll('input, textarea').forEach(f => this.clearFieldError(f));
      log.success('Form submitted successfully');
    } catch (error) {
      log.error('Form submission failed', error);
      this.showFormMessage(this.config.ERRORS.FORM_SUBMISSION_FAILED, 'error', message);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
      setAttribute(button, 'aria-busy', 'false');

      setTimeout(() => this.hideFormMessage(message), this.config.UI.TIMING.MESSAGE_DURATION);
    }
  }

  showFormMessage(text, type, element) {
    if (!element) return;

    element.textContent = text;
    removeClasses(element, 'hidden');
    removeClasses(element, 'bg-green-50', 'text-green-700', 'bg-red-50', 'text-red-700');

    if (type === 'success') {
      addClasses(element, 'bg-green-50', 'text-green-700', 'border', 'border-green-200');
    } else {
      addClasses(element, 'bg-red-50', 'text-red-700', 'border', 'border-red-200');
    }

    setAttribute(element, 'role', 'alert');
    setAttribute(element, 'aria-live', 'assertive');
  }

  hideFormMessage(element) {
    if (element) addClasses(element, 'hidden');
  }

  initializeAdModal() {
    if (!this.config.FEATURES.SHOW_AD_MODAL) return;

    const modal = querySelector(this.config.UI.SELECTORS.AD_MODAL);
    const closeBtn = querySelector(this.config.UI.SELECTORS.CLOSE_AD_MODAL);

    if (!modal) return;

    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.closeAdModal(modal));
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) this.closeAdModal(modal);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !hasClass(modal, 'hidden')) {
        this.closeAdModal(modal);
      }
    });

    setTimeout(() => this.openAdModal(modal), this.config.UI.TIMING.AD_MODAL_DELAY);
  }

  openAdModal(modal) {
    if (!hasClass(modal, 'hidden')) return;

    removeClasses(modal, 'hidden');
    addClasses(modal, 'flex');
    addClasses(document.body, 'overflow-hidden');
    setAttribute(modal, 'aria-hidden', 'false');

    const closeBtn = modal.querySelector(this.config.UI.SELECTORS.CLOSE_AD_MODAL);
    if (closeBtn) setTimeout(() => closeBtn.focus(), this.config.UI.TIMING.FOCUS_DELAY);
  }

  closeAdModal(modal) {
    addClasses(modal, 'hidden');
    removeClasses(modal, 'flex');
    removeClasses(document.body, 'overflow-hidden');
    setAttribute(modal, 'aria-hidden', 'true');
  }

  initializeAccessibility() {
    this.addSkipLink();
    this.enhanceFormAccessibility();
    this.initKeyboardNavigation();
  }

  addSkipLink() {
    if (querySelector('.skip-link')) return;

    const link = document.createElement('a');
    link.href = '#main';
    link.textContent = 'Skip to main content';
    addClasses(link, 'sr-only', 'focus:not-sr-only', 'fixed', 'top-0', 'left-0', 'z-50', 'bg-primary', 'text-white', 'px-4', 'py-2', 'rounded-br-lg', 'skip-link');
    setAttribute(link, 'aria-label', 'Skip to main content');

    document.body.insertBefore(link, document.body.firstChild);

    const main = querySelector('main') || querySelector('#main');
    if (main && !getAttribute(main, 'id')) {
      setAttribute(main, 'id', 'main');
      setAttribute(main, 'role', 'main');
    }
  }

  enhanceFormAccessibility() {
    querySelectorAll('form').forEach(form => {
      form.querySelectorAll('[required]').forEach(field => {
        setAttribute(field, 'aria-required', 'true');

        const label = form.querySelector(`label[for="${getAttribute(field, 'id')}"]`);
        if (label && !label.textContent.includes('*')) {
          const star = document.createElement('span');
          addClasses(star, 'text-red-500');
          setAttribute(star, 'aria-label', 'required');
          star.textContent = ' *';
          label.appendChild(star);
        }

        if (field.placeholder && !form.querySelector(`label[for="${getAttribute(field, 'id')}"]`)) {
          setAttribute(field, 'aria-label', field.placeholder);
        }
      });
    });
  }

  initKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        addClasses(document.body, 'keyboard-nav');
      }
    });

    document.addEventListener('mousedown', () => {
      removeClasses(document.body, 'keyboard-nav');
    });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  const app = new HizakiLabs();
  app.init();
  window.HizakiLabs = app;
});

// Global error handling
window.addEventListener('error', (event) => {
  log.error('Uncaught error', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  log.error('Unhandled rejection', event.reason);
});

// Performance monitoring
if (window.performance?.timing) {
  window.addEventListener('load', () => {
    const timing = window.performance.timing;
    const pageLoad = timing.loadEventEnd - timing.navigationStart;
    log.info(`Page load time: ${pageLoad}ms`);
  });
}

export default HizakiLabs;