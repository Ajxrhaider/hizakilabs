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
const apiEndpoint = 'http://localhost:3000/submit-form';
// Get references to the form, button, and message display element
const form = document.getElementById('contact-form');
const submitButton = document.getElementById('submit-button');
const formMessage = document.getElementById('form-message');

// Add a submit event listener to the form
form.addEventListener('submit', async function(e) {
    // 1. Prevent the default form submission (page reload)
    e.preventDefault();

    // 2. Display a loading message and disable the button
    submitButton.textContent = 'Submitting...';
    submitButton.disabled = true;
    formMessage.textContent = ''; // Clear previous messages
    formMessage.className = 'text-center mt-4'; // Reset classes

    // 3. Collect the form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // 4. Define your backend API endpoint URL
    // THIS IS A PLACEHOLDER. You MUST replace this with your own server URL.
    // This could be a PHP script, a Node.js API, or a serverless function.
    const apiEndpoint = 'https://your-backend-api.com/submit-form';

    try {
        // 5. Send the form data to the backend using the Fetch API
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // Convert data to a JSON string
        });

        // 6. Check if the server responded with a success status code
        if (response.ok) {
            // Success: show a success message and clear the form
            formMessage.textContent = 'Thank you! Your message has been sent.';
            formMessage.classList.add('text-green-600', 'font-semibold');
            form.reset(); // Clear all form fields
        } else {
            // Failure: handle server-side errors
            const errorData = await response.json();
            formMessage.textContent = `Error: ${errorData.message || 'Something went wrong.'}`;
            formMessage.classList.add('text-red-600', 'font-semibold');
        }
    } catch (error) {
        // 7. Handle network errors or other exceptions
        console.error('Submission error:', error);
        formMessage.textContent = 'A network error occurred. Please try again later.';
        formMessage.classList.add('text-red-600', 'font-semibold');
    } finally {
        // 8. Re-enable the submit button regardless of success or failure
        submitButton.textContent = 'Send Message';
        submitButton.disabled = false;
    }
});

// Alpine.js Core & Plugins (for interactivity)
const alpineScripts = [
  "https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/collapse@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/focus@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/intersect@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/mask@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/persist@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/trap@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/window@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/scroll@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/tooltip@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/notifications@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/clipboard@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/scrollspy@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/dragula@3.x.x/dist/cdn.min.js",
  "https://unpkg.com/@alpinejs/codemirror@3.x.x/dist/cdn.min.js"
];

alpineScripts.forEach(src => {
  const script = document.createElement('script');
  script.src = src;
  script.defer = true;
  document.head.appendChild(script);
});

// Tailwind CSS CDN & Config
const tailwindScript = document.createElement('script');
tailwindScript.src = "https://cdn.tailwindcss.com";
document.head.appendChild(tailwindScript);

tailwindScript.onload = () => {
  if (window.tailwind) {
    window.tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            'inter': ['Inter', 'sans-serif'],
            'space-grotesk': ['Space Grotesk', 'sans-serif']
          }
        }
      }
    };
  }
};