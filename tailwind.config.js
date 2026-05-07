/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./cook.html",
    "./track.html",
    "./wait.html",
    "./legal-notice.html",
    "./privacy-policy.html",
    "./terms-of-service.html",
    "./outnow/**/*.html",
    "./out now/**/*.html",
    "./outofpucket/**/*.html",
    "./uv-oc/**/*.html",
    "./script.js"
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        primary: '#6366f1',
        'primary-dark': '#4f46e5',
        secondary: '#e5e7eb',
        accent: '#10b981',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in': 'slideIn 0.4s ease-out',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}