import React, { useState, useEffect } from 'react';

// ++ HELPER COMPONENTS ++ //

// Icon component for services and portfolio
const Icon = ({ className }) => <i className={className}></i>;

// SectionTitle component for consistent heading styles
const SectionTitle = ({ children }) => (
    <h2 className="text-4xl font-bold text-center mb-12 relative inline-block mx-auto">
        {children}
        <span className="absolute -bottom-2 left-1/4 w-1/2 h-1 bg-indigo-600 rounded-full"></span>
    </h2>
);


// ++ MAIN COMPONENTS ++ //

const Header = ({ onMenuToggle }) => {
    // Function to handle smooth scrolling
    const handleScroll = (e, targetId) => {
        e.preventDefault();
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            const headerOffset = document.querySelector('header')?.offsetHeight || 0;
            const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 20;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
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
                         <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href.substring(1))} className="text-gray-600 hover:text-indigo-700 font-medium transition-colors rounded-md px-3 py-2">{link.label}</a>
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
        onMenuToggle(); // Close menu on link click
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            // A slight delay to allow the menu to start closing before scrolling
            setTimeout(() => {
                 const headerOffset = document.querySelector('header')?.offsetHeight || 0;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
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
        <div className={`fixed inset-0 bg-white bg-opacity-95 z-40 md:hidden transition-transform duration-300 ${isOpen ? 'transform-none' : '-translate-y-full'}`}>
            <div className="flex justify-end p-6">
                <button id="close-mobile-menu-button" aria-label="Close mobile menu" className="text-gray-800 text-3xl hover:text-indigo-700" onClick={onMenuToggle}>&times;</button>
            </div>
            <nav className="flex flex-col items-center justify-center h-full text-2xl space-y-8 -mt-16">
                 {navLinks.map(link => (
                     <a key={link.href} href={link.href} onClick={(e) => handleScroll(e, link.href.substring(1))} className="text-gray-800 hover:text-indigo-700 transition-colors">{link.label}</a>
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
                'Networking Solutions (Setup, Troubleshooting)',
            ],
            iconColor: 'text-green-500'
        },
        {
            icon: 'fas fa-palette',
            title: 'Creative Production',
            items: [
                'Web Design & Development',
                'Video Editing & Production',
                'Computer Graphics & Visuals',
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
            description: 'Tutorials, coding challenges, and discussions on software development. Also expect discussions on pc building & repair, and networking tips.',
            link: 'https://www.youtube.com/channel/@Asura.j',
            buttonText: 'Watch Now',
            buttonColor: 'bg-red-600 hover:bg-red-700'
        },
    ];

    return (
        <section id="portfolio" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                <SectionTitle>My Content & Portfolio</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {portfolioItems.map((item, index) => (
                        <div key={index} className="bg-gray-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
                            <Icon className={`${item.icon} ${item.iconColor} text-6xl mb-4`} />
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                            <p className="text-gray-600 mb-4 flex-grow">{item.description}</p>
                            <a href={item.link} target="_blank" rel="noopener noreferrer" className={`${item.buttonColor} text-white px-6 py-3 rounded-full transition-colors font-medium`}>
                                {item.buttonText}
                            </a>
                        </div>
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
                <img src="https://placehold.co/400x400/e5e7eb/4f46e5?text=HL" alt="Hizaki Labs circular logo with indigo border" className="rounded-full shadow-lg border-4 border-indigo-300 w-64 h-64 md:w-80 md:h-80 object-cover"/>
            </div>
            <div className="md:w-1/2 text-center md:text-left">
                 <h2 className="text-4xl font-bold mb-6 relative inline-block mx-auto md:mx-0">
                    About Hizaki Labs
                    <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-indigo-600 rounded-full"></span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Welcome to Hizaki Labs! I'm a dedicated technician and creative professional passionate about technology and its endless possibilities. My journey began with a strong foundation in IT, specializing in laptop repair, operating system installations, and comprehensive networking solutions. I believe in providing reliable and efficient support to keep your systems running smoothly.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Beyond the technical realm, I delve into the creative world, offering expertise in web design, video editing and production, computer graphics, and music production. My passion extends to content creation, where I host an audio Spotify podcast and manage multiple YouTube channels covering gaming, coding, and anime/memes.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                    Looking ahead, Hizaki Labs is set to expand into exciting new territories, including game development, cutting-edge AI development, and bespoke PC building services. My goal is to blend technical prowess with creative vision to deliver innovative solutions and engaging experiences.
                </p>
            </div>
        </div>
    </section>
);


const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
    const [formStatus, setFormStatus] = useState({ submitting: false, message: '', type: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormStatus({ submitting: true, message: 'Sending...', type: 'info' });

        try {
            // Using Formspree endpoint from original HTML
            const response = await fetch("https://formspree.io/f/xldlwynl", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setFormStatus({ submitting: false, message: 'Message sent successfully! Thank you.', type: 'success' });
                setFormData({ name: '', email: '', subject: '', message: '' });
            } else {
                throw new Error('Form submission failed');
            }
        } catch (error) {
            console.error('Form submission error:', error);
            setFormStatus({ submitting: false, message: 'An error occurred. Please try again later.', type: 'error' });
        } finally {
             setTimeout(() => {
                setFormStatus({ submitting: false, message: '', type: '' });
            }, 5000);
        }
    };

    return (
        <section id="contact" className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 text-center">
                <SectionTitle>Get in Touch</SectionTitle>
                <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-lg">
                    <p className="text-lg text-gray-700 text-center mb-8">
                        Have a project in mind or need technical assistance? Feel free to reach out!
                    </p>
                    <form id="contact-form" className="space-y-6" onSubmit={handleSubmit}>
                        {/* Form Inputs */}
                        <div>
                            <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Your Name</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Your Name" required />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Your Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="your.email@example.com" required />
                        </div>
                        <div>
                            <label htmlFor="subject" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Subject</label>
                            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all" placeholder="Service Inquiry, Collaboration, etc." required />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2 text-left">Your Message</label>
                            <textarea id="message" name="message" rows="5" value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-y" placeholder="Tell me about your project or inquiry..." required></textarea>
                        </div>
                        <div className="text-center">
                            <button type="submit" disabled={formStatus.submitting} className="w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-indigo-700 transition-colors shadow-lg transform hover:scale-105 duration-300 disabled:bg-indigo-400 disabled:cursor-not-allowed">
                                {formStatus.submitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </div>
                    </form>
                    {formStatus.message && (
                        <div className={`mt-6 text-center font-medium ${formStatus.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {formStatus.message}
                        </div>
                    )}
                    <div className="mt-10 text-center">
                        <p className="text-lg text-gray-700 font-semibold mb-4">Or connect directly:</p>
                        <p className="text-gray-600 mb-2"><Icon className="fas fa-envelope text-indigo-500 mr-2" /> Email: <a href="mailto:info@hizakilabs.com" className="text-indigo-600 hover:underline">info@hizakilabs.com</a></p>
                        <p className="text-gray-600"><Icon className="fas fa-phone-alt text-indigo-500 mr-2" /> Phone: <a href="tel:+2349047287304" className="text-indigo-600 hover:underline">+234 904-728-7304</a></p>
                    </div>
                </div>
            </div>
        </section>
    );
};


const Socials = () => {
    const socialLinks = [
        { href: 'https://twitter.com/asura_java', icon: 'fab fa-twitter', label: 'Twitter', color: 'hover:text-blue-500' },
        { href: 'https://linkedin.com/in/inimfon-abasi-ekpenyong-b05518240', icon: 'fab fa-linkedin', label: 'LinkedIn', color: 'hover:text-blue-700' },
        { href: 'https://github.com/Ajxrhaider', icon: 'fab fa-github', label: 'GitHub', color: 'hover:text-gray-900' },
        { href: 'https://youtube.com/@Asura.j', icon: 'fab fa-youtube', label: 'YouTube', color: 'hover:text-red-600' },
        { href: 'https://open.spotify.com/show/5kWl29kyLskkNsVgwmkfQ0?si=c826f7587da242cd', icon: 'fab fa-spotify', label: 'Spotify', color: 'hover:text-green-500' },
    ];
    return (
        <section id="socials" className="py-16 md:py-24 bg-gray-50">
            <div className="container mx-auto px-4 text-center">
                <SectionTitle>Connect With Me</SectionTitle>
                <div className="flex justify-center flex-wrap gap-6 text-5xl">
                    {socialLinks.map(link => (
                         <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className={`text-gray-600 ${link.color} transition-colors transform hover:scale-110`} aria-label={link.label}>
                            <Icon className={link.icon} />
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
                    <a href="#about" className="hover:text-white transition-colors">About</a>
                    <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                    <a href="#socials" className="hover:text-white transition-colors">Socials</a>
                </nav>
            </div>
            <div className="border-t border-gray-700 pt-6 text-gray-400 text-sm">
                &copy; {new Date().getFullYear()} Hizaki Labs. All rights reserved.
            </div>
        </div>
    </footer>
);

// ++ APP COMPONENT ++ //
// This is the main component that brings everything together.

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // Toggle mobile menu
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    
    // Add/remove class from body to prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }
        // Cleanup function
        return () => {
             document.body.classList.remove('overflow-hidden');
        }
    }, [isMenuOpen]);
    

    return (
        <React.Fragment>
            {/* In a real React app, you'd add these links to your public/index.html file.
              <script src="https://cdn.tailwindcss.com"></script>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet">
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
            */}

            {/* Styles from main.css */}
            <style>{`
                html { scroll-behavior: smooth; }
                body { 
                    font-family: 'Inter', sans-serif; 
                    -webkit-font-smoothing: antialiased;
                    -moz-osx-font-smoothing: grayscale;
                }
                .font-space-grotesk { font-family: 'Space Grotesk', sans-serif; }
                
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                
                .animate-fade-in {
                    animation: fade-in-up 0.8s ease-out 0.2s forwards;
                    opacity: 0;
                }
            `}</style>
        
            <div className="antialiased bg-white text-gray-800">
                <Header onMenuToggle={toggleMenu} />
                <MobileMenu isOpen={isMenuOpen} onMenuToggle={toggleMenu} />
                <main>
                    <Hero />
                    <Services />
                    <Portfolio />
                    <About />
                    <Contact />
                    <Socials />
                </main>
                <Footer />
            </div>
        </React.Fragment>
    );
}
