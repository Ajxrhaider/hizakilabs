import React, { useState, useEffect } from 'react';

const App = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // This effect handles the body overflow when the mobile menu is open
    if (isMobileMenuOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      <div className="min-h-screen bg-gray-900 text-gray-200 font-inter">
        {/* Navigation */}
        <header className="bg-gray-800 text-white shadow-lg fixed top-0 left-0 w-full z-50 rounded-b-lg">
          <div className="container mx-auto px-4 py-4 md:py-6 flex justify-between items-center">
            <a href="#home" className="flex items-center space-x-2">
              <svg className="h-8 w-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L12 19.25L14.25 17M12 4.75L12 12.25M18.25 12.25H20.25M3.75 12.25H5.75M12.25 1.75H11.75C11.75 1.75 11.75 11.75 11.75 11.75C11.75 12 12 12.25 12.25 12.25C12.5 12.25 12.75 12 12.75 11.75C12.75 11.75 12.75 1.75 12.75 1.75Z" />
              </svg>
              <span className="text-2xl font-space-grotesk font-bold text-indigo-300">Hizaki Labs</span>
            </a>
            <nav className="hidden md:flex space-x-6">
              <a href="#home" className="hover:text-indigo-400 transition-colors">Home</a>
              <a href="#services" className="hover:text-indigo-400 transition-colors">Services</a>
              <a href="#portfolio" className="hover:text-indigo-400 transition-colors">Portfolio</a>
              <a href="#about" className="hover:text-indigo-400 transition-colors">About</a>
              <a href="#contact" className="hover:text-indigo-400 transition-colors">Contact</a>
            </nav>
            <button onClick={toggleMobileMenu} className="md:hidden text-2xl focus:outline-none">
              <i className="fa-solid fa-bars text-indigo-400"></i>
            </button>
          </div>
        </header>

        {/* Mobile Menu (Overlay) */}
        <div id="mobile-menu" className={`fixed top-0 left-0 h-full w-full bg-gray-900 bg-opacity-95 z-50 transition-opacity duration-300 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="relative h-full">
            <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-white text-3xl focus:outline-none">
              <i className="fa-solid fa-xmark"></i>
            </button>
            <nav className="flex flex-col items-center justify-center h-full space-y-8 text-2xl">
              <a href="#home" onClick={toggleMobileMenu} className="hover:text-indigo-400 transition-colors">Home</a>
              <a href="#services" onClick={toggleMobileMenu} className="hover:text-indigo-400 transition-colors">Services</a>
              <a href="#portfolio" onClick={toggleMobileMenu} className="hover:text-indigo-400 transition-colors">Portfolio</a>
              <a href="#about" onClick={toggleMobileMenu} className="hover:text-indigo-400 transition-colors">About</a>
              <a href="#contact" onClick={toggleMobileMenu} className="hover:text-indigo-400 transition-colors">Contact</a>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <main className="pt-24">
          <section id="home" className="relative flex items-center justify-center h-screen text-center bg-cover bg-center" style={{ backgroundImage: "url('https://placehold.co/1920x1080/000000/FFFFFF?text=Digital+Innovation')" }}>
            <div className="absolute inset-0 bg-black opacity-60"></div>
            <div className="relative z-10 p-6 rounded-lg shadow-xl max-w-2xl mx-auto">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-space-grotesk font-bold text-white mb-4 animate-fade-in-up">Your Tech & Creative Partner</h1>
              <p className="text-lg sm:text-xl text-gray-300 mb-8 animate-fade-in-up delay-200">
                Crafting powerful digital solutions with cutting-edge technology and design expertise.
              </p>
              <button className="bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 animate-fade-in-up delay-400">
                Explore Our Services
              </button>
            </div>
          </section>

          {/* Services Section */}
          <section id="services" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-space-grotesk font-bold text-white section-title">Our Services</h2>
                <p className="text-lg text-gray-400 mt-4">Solutions for every stage of your digital journey.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Service Card 1 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-colors duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-indigo-600 text-white rounded-full mb-4">
                    <i className="fa-solid fa-code fa-2x"></i>
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-white mb-2">Web Development</h3>
                  <p className="text-gray-400">Building responsive, high-performance websites and web applications with modern frameworks like React and Node.js.</p>
                </div>
                {/* Service Card 2 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-colors duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-pink-600 text-white rounded-full mb-4">
                    <i className="fa-solid fa-mobile-alt fa-2x"></i>
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-white mb-2">Mobile Apps</h3>
                  <p className="text-gray-400">Creating intuitive and fast mobile applications for iOS and Android platforms using React Native.</p>
                </div>
                {/* Service Card 3 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-colors duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-green-600 text-white rounded-full mb-4">
                    <i className="fa-solid fa-paint-brush fa-2x"></i>
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-white mb-2">UI/UX Design</h3>
                  <p className="text-gray-400">Designing user-centric interfaces and experiences that are both beautiful and highly functional.</p>
                </div>
                {/* Service Card 4 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-colors duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-orange-600 text-white rounded-full mb-4">
                    <i className="fa-solid fa-cloud fa-2x"></i>
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-white mb-2">Cloud Services</h3>
                  <p className="text-gray-400">Providing scalable cloud infrastructure and services to power your applications and business operations.</p>
                </div>
                {/* Service Card 5 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-colors duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-purple-600 text-white rounded-full mb-4">
                    <i className="fa-solid fa-database fa-2x"></i>
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-white mb-2">Database Solutions</h3>
                  <p className="text-gray-400">Architecting and managing secure and efficient databases for all your data needs.</p>
                </div>
                {/* Service Card 6 */}
                <div className="bg-gray-800 p-6 rounded-xl shadow-xl border border-gray-700 hover:border-indigo-500 transition-colors duration-300">
                  <div className="flex items-center justify-center w-16 h-16 bg-teal-600 text-white rounded-full mb-4">
                    <i className="fa-solid fa-robot fa-2x"></i>
                  </div>
                  <h3 className="text-2xl font-space-grotesk font-bold text-white mb-2">AI & ML</h3>
                  <p className="text-gray-400">Integrating artificial intelligence and machine learning to create intelligent and automated solutions.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Portfolio Section */}
          <section id="portfolio" className="py-20 bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-space-grotesk font-bold text-white section-title">Our Work</h2>
                <p className="text-lg text-gray-400 mt-4">A showcase of our recent projects and digital creations.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Portfolio Item 1 */}
                <div className="relative group overflow-hidden rounded-xl shadow-xl">
                  <img src="https://placehold.co/600x400/1e293b/FFFFFF?text=Project+Alpha" alt="Project Alpha" className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-4">
                      <h3 className="text-2xl font-space-grotesk font-bold text-white">Project Alpha</h3>
                      <p className="text-gray-300 mt-2">Web Development & UI/UX Design</p>
                      <a href="#" className="mt-4 inline-block bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors">View Details</a>
                    </div>
                  </div>
                </div>
                {/* Portfolio Item 2 */}
                <div className="relative group overflow-hidden rounded-xl shadow-xl">
                  <img src="https://placehold.co/600x400/1e293b/FFFFFF?text=Project+Beta" alt="Project Beta" className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-4">
                      <h3 className="text-2xl font-space-grotesk font-bold text-white">Project Beta</h3>
                      <p className="text-gray-300 mt-2">Mobile App Development</p>
                      <a href="#" className="mt-4 inline-block bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors">View Details</a>
                    </div>
                  </div>
                </div>
                {/* Portfolio Item 3 */}
                <div className="relative group overflow-hidden rounded-xl shadow-xl">
                  <img src="https://placehold.co/600x400/1e293b/FFFFFF?text=Project+Gamma" alt="Project Gamma" className="w-full h-auto transform transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center p-4">
                      <h3 className="text-2xl font-space-grotesk font-bold text-white">Project Gamma</h3>
                      <p className="text-gray-300 mt-2">Cloud & Database Solution</p>
                      <a href="#" className="mt-4 inline-block bg-indigo-600 text-white py-2 px-6 rounded-full font-semibold hover:bg-indigo-700 transition-colors">View Details</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-20 bg-gray-900">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-4xl font-space-grotesk font-bold text-white section-title">About Us</h2>
              <div className="flex flex-col lg:flex-row items-center justify-center lg:space-x-12 mt-8">
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <img src="https://placehold.co/600x400/1e293b/FFFFFF?text=Team+Photo" alt="Our Team" className="rounded-xl shadow-2xl" />
                </div>
                <div className="lg:w-1/2 text-left">
                  <p className="text-lg text-gray-400 mb-4">
                    Hizaki Labs is a team of passionate developers, designers, and strategists dedicated to building exceptional digital experiences. We believe in the power of innovation and collaboration to transform ideas into reality.
                  </p>
                  <p className="text-lg text-gray-400 mb-4">
                    Our mission is to empower businesses and individuals with cutting-edge technology that is both scalable and user-friendly. We pride ourselves on our meticulous attention to detail and our commitment to delivering high-quality, impactful solutions.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 bg-gray-800">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-space-grotesk font-bold text-white section-title">Get in Touch</h2>
                <p className="text-lg text-gray-400 mt-4">Let's build something amazing together.</p>
              </div>
              <div className="max-w-xl mx-auto">
                <form className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-gray-400 mb-2">Name</label>
                    <input type="text" id="name" name="name" className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 transition-colors" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-400 mb-2">Email Address</label>
                    <input type="email" id="email" name="email" className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 transition-colors" required />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-gray-400 mb-2">Message</label>
                    <textarea id="message" name="message" rows="5" className="w-full p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:border-indigo-500 transition-colors" required></textarea>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-10 rounded-t-lg shadow-inner">
          <div className="container mx-auto px-4 text-center">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold text-indigo-300">Hizaki Labs</h3>
                <p className="text-gray-400 text-sm mt-1">Innovation & Expertise</p>
              </div>
              <nav className="flex flex-wrap justify-center space-x-4 md:space-x-6 text-gray-300">
                <a href="#home" className="hover:text-white transition-colors">Home</a>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
                <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
                <a href="#about" className="hover:text-white transition-colors">About</a>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </nav>
            </div>
            <div className="border-t border-gray-700 pt-6 text-gray-400 text-sm">
              &copy; {currentYear} Hizaki Labs. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default App;
