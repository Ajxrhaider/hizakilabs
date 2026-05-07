import React, { useState, useEffect } from 'react';

// Helper components
const Icon = ({ className }) => <i className={className}></i>;
const SectionTitle = ({ children }) => (
  <h2 className="text-4xl font-bold text-center mb-12 relative inline-block mx-auto">
    {children}
    <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-indigo-600 rounded-full"></span>
  </h2>
);

// Main components
const Header = ({ onMenuToggle }) => {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
    { href: '#socials', label: 'Socials' }
  ];

  return (
    <header className="bg-white/80 shadow-sm py-4 sticky top-0 z-50 backdrop-blur-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" onClick={(e) => handleScroll(e, 'home')} className="text-3xl font-bold text-indigo-700 rounded-md p-2 hover:text-indigo-900 transition-colors font-space-grotesk">
          Hizaki Labs
        </a>
        <nav className="hidden md:flex space-x-6">
          {navLinks.map(link => (
            <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href.substring(1))} className="text-gray-600 hover:text-indigo-700 font-medium transition-colors rounded-md px-3 py-2">
              {link.label}
            </a>
          ))}
        </nav>
        <button id="mobile-menu-button" aria-label="Open mobile menu" className="md:hidden text-gray-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md p-2" onClick={onMenuToggle}>
          <Icon className="fas fa-bars text-2xl" />
        </button>
      </div>
    </header>
  );
};

const MobileMenu = ({ isOpen, onMenuToggle }) => {
  const handleScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    onMenuToggle();
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#portfolio', label: 'Portfolio' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
    { href: '#socials', label: 'Socials' }
  ];

  return (
    <div className={`fixed inset-0 bg-white bg-opacity-95 z-40 md:hidden transition-transform duration-300 ${isOpen ? 'transform-none' : '-translate-y-full'}`}>
      <div className="flex justify-end p-6">
        <button id="close-mobile-menu-button" aria-label="Close mobile menu" className="text-gray-800 text-3xl hover:text-indigo-700" onClick={onMenuToggle}>&times;</button>
      </div>
      <nav className="flex flex-col items-center justify-center h-full text-2xl space-y-8 -mt-16">
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href.substring(1))} className="text-gray-800 hover:text-indigo-700 transition-colors">
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
};

const Hero = () => (
  <section id="home" className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 md:py-32 text-center rounded-b-lg shadow-lg">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 animate-fade-in-up font-space-grotesk">
        Hizaki Labs: Where Innovation Meets Expertise
      </h1>
      <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto opacity-90 animate-fade-in">
        Your trusted partner for comprehensive tech solutions, creative production, and engaging content.
      </p>
      <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
        <a href="#services" className="bg-white text-indigo-700 hover:bg-indigo-100 px-8 py-4 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          Explore Services
        </a>
        <a href="#contact" className="border-2 border-white text-white hover:bg-white hover:text-indigo-700 px-8 py-4 rounded-full font-semibold text-lg shadow-lg transform hover:scale-105 transition-all duration-300">
          Get in Touch
        </a>
      </div>
    </div>
  </section>
);

const Services = () => {
  const servicesData = [
    {
      icon: 'fas fa-laptop-code',
      title: 'Tech Solutions',
      items: [
        'Laptop Repair & Diagnostics',
        'Operating System Installation & Setup',
        'Networking Solutions',
      ],
      iconColor: 'text-green-500'
    },
    {
      icon: 'fas fa-palette',
      title: 'Creative Production',
      items: [
        'Web Design & Development',
        'Video Editing & Production',
        'Music Production & Sound Design',
      ],
      iconColor: 'text-green-500'
    },
    {
      icon: 'fas fa-rocket',
      title: 'Future Ventures',
      items: [
        'Game Development',
        'AI Development & Integration',
        'Custom PC Building',
      ],
      iconColor: 'text-yellow-500'
    },
  ];

  return (
    <section id="services" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 text-center">
        <SectionTitle>Our Services</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2">
              <div className="text-indigo-600 text-5xl mb-6 text-center"><Icon className={service.icon} /></div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{service.title}</h3>
              <ul className="space-y-2 text-gray-600 text-left">
                {service.items.map((item, i) => (
                  <li key={i}><Icon className={`fas fa-check-circle ${service.iconColor} mr-2`} />{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const portfolioItems = [
    {
      icon: 'fab fa-spotify',
      iconColor: 'text-green-500',
      title: 'Parody Radio',
      description: 'Tune in for insights, discussions, and entertainment on various topics.',
      link: 'https://open.spotify.com/show/5kWl29kyLskkNsVgwmkfQ0?si=GBKRD7DASbi2kKWM_qU6Hw',
      buttonText: 'Listen Now',
      buttonColor: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: 'fab fa-youtube',
      iconColor: 'text-red-600',
      title: 'John Hizaki: Gaming Channel',
      description: 'Join me for gaming adventures, reviews, and fun gameplay videos.',
      link: 'https://www.youtube.com/channel/@Ajxrhaider',
      buttonText: 'Watch Now',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      icon: 'fab fa-youtube',
      iconColor: 'text-red-600',
      title: 'YouTube: Coding / Tech Channel',
      description: 'Tutorials, coding challenges, and discussions on software development.',
      link: 'https://www.youtube.com/channel/@Asura.j',
      buttonText: 'Watch Now',
      buttonColor: 'bg-red-600 hover:bg-red-700'
    },
    {
      icon: 'fab fa-spotify',
      iconColor: 'text-purple-600',
      title: 'Original Music',
      description: 'High-speed electronic & juke beats.',
      link: 'https://open.spotify.com/artist/3k6Cy1fgDhQtNqc8AmayGD',
      buttonText: 'Stream Now',
      buttonColor: 'bg-purple-500 hover:bg-purple-600'
    },
  ];

  return (
    <section id="portfolio" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>My Content & Portfolio</SectionTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => (
            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer" className="group bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-2 duration-300">
              <div className={`text-5xl mb-4 group-hover:scale-110 transition-transform ${item.iconColor}`}>
                <Icon className={item.icon} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => (
  <section id="about" className="py-16 md:py-24 bg-gray-50">
    <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
      <div className="md:w-1/2 flex justify-center">
        <img src="https://placehold.co/400x400/e5e7eb/4f46e5?text=John+Hizaki" alt="John Hizaki, founder of Hizaki Labs" className="rounded-full shadow-lg border-4 border-indigo-300 w-64 h-64 md:w-80 md:h-80 object-cover"/>
      </div>
      <div className="md:w-1/2 text-center md:text-left">
        <SectionTitle>About Hizaki Labs</SectionTitle>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Welcome to Hizaki Labs! I'm a dedicated technician and creative professional passionate about technology and its endless possibilities. My journey began with a strong foundation in IT, specializing in laptop repair, operating system installations, and comprehensive networking solutions.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">
          Beyond the technical realm, I delve into the creative world, offering expertise in web design, video editing and production, computer graphics, and music production. My passion extends to content creation through my Spotify podcast and multiple YouTube channels.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed">
          Looking ahead, Hizaki Labs is set to expand into game development, cutting-edge AI development, and bespoke PC building services. My goal is to blend technical prowess with creative vision to deliver innovative solutions.
        </p>
      </div>
    </div>
  </section>
);

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setMessage('Message sent successfully!');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle>Get in Touch</SectionTitle>
        <div className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-xl shadow-lg">
          <p className="text-lg text-gray-700 text-center mb-8">
            Have a project in mind or need technical assistance? Feel free to reach out!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors"
                placeholder="What's this about?"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-colors resize-none"
                placeholder="Tell us more about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors transform hover:-translate-y-1 duration-300 shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane ml-2"></i>
            </button>
          </form>
          {message && <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg text-center font-semibold">{message}</div>}
        </div>
      </div>
    </section>
  );
};

const Socials = () => {
  const socialLinks = [
    { name: 'Spotify Music', url: 'https://open.spotify.com/artist/3k6Cy1fgDhQtNqc8AmayGD', icon: 'fab fa-spotify', color: '#1DB954' },
    { name: 'Twitter', url: 'https://twitter.com/asura_java', icon: 'fab fa-twitter', color: '#1DA1F2' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/john-hizaki', icon: 'fab fa-linkedin', color: '#0A66C2' },
    { name: 'GitHub', url: 'https://github.com/Ajxrhaider', icon: 'fab fa-github', color: '#333333' },
    { name: 'YouTube', url: 'https://youtube.com/@Asura.j', icon: 'fab fa-youtube', color: '#FF0000' },
    { name: 'Spotify Podcast', url: 'https://open.spotify.com/show/5kWl29kyLskkNsVgwmkfQ0', icon: 'fas fa-podcast', color: '#a855f7' }
  ];

  return (
    <section id="socials" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle>Connect With Me</SectionTitle>
        <div className="flex flex-wrap justify-center gap-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-5xl text-gray-600 hover:scale-125 transition-transform duration-300"
              style={{ color: social.color }}
              aria-label={social.name}
            >
              <Icon className={social.icon} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="bg-gray-800 text-white py-10 rounded-t-lg shadow-inner">
    <div className="container mx-auto px-4 text-center">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold text-indigo-300 font-space-grotesk">Hizaki Labs</h3>
          <p className="text-gray-400 text-sm mt-1">Innovation & Expertise</p>
        </div>
        <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-gray-300">
          <a href="#home" className="hover:text-white transition-colors">Home</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#about" class="hover:text-white transition-colors">About</a>
          <a href="#contact" class="hover:text-white transition-colors">Contact</a>
        </nav>
      </div>
      <div className="border-t border-gray-700 pt-6 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Hizaki Labs. All rights reserved.
      </div>
    </div>
  </footer>
);

// Main App Component
export default function MainPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    // Add any initialization logic here if needed
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onMenuToggle={toggleMenu} />
      <MobileMenu isOpen={isMenuOpen} onMenuToggle={toggleMenu} />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Socials />
      <Footer />
    </div>
  );
}
