/**
 * Utility Functions Module
 * Reusable utility functions for DOM manipulation and data handling
 */

/**
 * Get current year
 */
export const getCurrentYear = () => new Date().getFullYear();

/**
 * Safe DOM selector
 */
export const querySelector = (selector) => {
  try {
    return document.querySelector(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`);
    return null;
  }
};

/**
 * Safe DOM selector all
 */
export const querySelectorAll = (selector) => {
  try {
    return document.querySelectorAll(selector);
  } catch (error) {
    console.warn(`Invalid selector: ${selector}`);
    return [];
  }
};

/**
 * Add classes to element
 */
export const addClasses = (element, ...classes) => {
  if (!element) return;
  element.classList.add(...classes);
};

/**
 * Remove classes from element
 */
export const removeClasses = (element, ...classes) => {
  if (!element) return;
  element.classList.remove(...classes);
};

/**
 * Toggle class on element
 */
export const toggleClass = (element, className) => {
  if (!element) return;
  element.classList.toggle(className);
};

/**
 * Check if element has class
 */
export const hasClass = (element, className) => {
  if (!element) return false;
  return element.classList.contains(className);
};

/**
 * Set attribute
 */
export const setAttribute = (element, key, value) => {
  if (!element) return;
  element.setAttribute(key, value);
};

/**
 * Get attribute
 */
export const getAttribute = (element, key) => {
  if (!element) return null;
  return element.getAttribute(key);
};

/**
 * Debounce function
 */
export const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (fn, delay = 300) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn(...args);
    }
  };
};

/**
 * Fetch with timeout
 */
export const fetchWithTimeout = (url, options = {}, timeout = 10000) => {
  return Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Fetch timeout')), timeout)
    )
  ]);
};

/**
 * Validate email
 */
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

/**
 * Validate URL
 */
export const validateURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Format date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Deep clone object
 */
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Merge objects
 */
export const mergeObjects = (target, source) => {
  return { ...target, ...source };
};

/**
 * Log utility
 */
export const log = {
  error: (msg, err) => console.error(`[Hizaki Labs] ❌ ${msg}`, err || ''),
  info: (msg) => console.log(`[Hizaki Labs] ℹ️  ${msg}`),
  warn: (msg) => console.warn(`[Hizaki Labs] ⚠️  ${msg}`),
  success: (msg) => console.log(`[Hizaki Labs] ✅ ${msg}`)
};

export default {
  getCurrentYear,
  querySelector,
  querySelectorAll,
  addClasses,
  removeClasses,
  toggleClass,
  hasClass,
  setAttribute,
  getAttribute,
  debounce,
  throttle,
  fetchWithTimeout,
  validateEmail,
  validateURL,
  formatDate,
  deepClone,
  mergeObjects,
  log
};