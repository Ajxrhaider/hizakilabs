/**
 * Configuration Module
 * Centralized configuration for the application
 */

export const CONFIG = {
  // API Configuration
  API: {
    BASE_URL: process.env.API_BASE_URL || 'http://localhost:3000/api',
    TIMEOUT: 10000,
    ENDPOINTS: {
      FORM_SUBMIT: '/submit-form',
      SEND_EMAIL: '/send-email'
    }
  },

  // UI Configuration
  UI: {
    SELECTORS: {
      MOBILE_MENU_BUTTON: '#mobileMenuButton',
      CLOSE_MOBILE_MENU: '#closeMobileMenu',
      MOBILE_MENU: '#mobileMenu',
      AD_MODAL: '#adModal',
      CLOSE_AD_MODAL: '#closeAdModal',
      CONTACT_FORM: '#contactForm',
      FORM_MESSAGE: '#formMessage',
      CURRENT_YEAR: '#currentYear',
      NAV_LINKS: 'a[href^="#"]'
    },
    TIMING: {
      AD_MODAL_DELAY: 2000,
      MESSAGE_DURATION: 5000,
      SCROLL_BEHAVIOR: 'smooth',
      FOCUS_DELAY: 100,
      DEBOUNCE: 300
    },
    CLASSES: {
      HIDDEN: 'hidden',
      TRANSLATE_Y: '-translate-y-full',
      OVERFLOW_HIDDEN: 'overflow-hidden'
    }
  },

  // Validation Rules
  VALIDATION: {
    name: {
      minLength: 2,
      maxLength: 100,
      pattern: /^[a-zA-Z\s'-]+$/,
      message: 'Name must be 2-100 characters and contain only letters'
    },
    email: {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Please enter a valid email address'
    },
    subject: {
      minLength: 3,
      maxLength: 200,
      message: 'Subject must be 3-200 characters'
    },
    message: {
      minLength: 10,
      maxLength: 5000,
      message: 'Message must be 10-5000 characters'
    }
  },

  // Feature Flags
  FEATURES: {
    SHOW_AD_MODAL: true,
    ENABLE_FORM_SUBMISSION: true,
    ENABLE_ANALYTICS: true,
    ENABLE_SERVICE_WORKER: true
  },

  // Error Messages
  ERRORS: {
    FORM_SUBMISSION_FAILED: 'Failed to submit form. Please try again later.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    INVALID_FORM: 'Please correct the errors in the form.',
    SERVER_ERROR: 'Server error. Please try again later.'
  },

  // Success Messages
  SUCCESS: {
    FORM_SUBMITTED: 'Your message has been sent successfully!',
    EMAIL_SENT: 'Email sent successfully!'
  }
};

export default CONFIG;