import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Purpose', href: '#purpose' },
  { name: 'Industries', href: '#industries' },
  { name: 'Why Partner', href: '#why-partner' },
  { name: 'Contact', href: '#contact' },
];

export function NavbarDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      
      // Determine active section based on scroll position
      const sections = [
        { id: 'purpose', selector: '#purpose' },
        { id: 'industries', selector: '#industries' },
        { id: 'why-partner', selector: '#why-partner' },
        { id: 'contact', selector: '#contact' }
      ];
      
      const scrollPosition = window.scrollY + 80; // Reduced offset for more precise detection
      let currentActive = 'purpose'; // Default to first content section
      
      // Keep Home active when at the very top of the page
      if (window.scrollY < 100) {
        setActiveSection('home');
        return;
      }
      
      // Get the last section's bottom position to check if we're in footer area
      const lastSection = document.querySelector('#contact') as HTMLElement;
      
      // If we're near the bottom of the page (in footer area), keep contact active
      if (lastSection && window.scrollY > lastSection.offsetTop + lastSection.offsetHeight - 200) {
        setActiveSection('contact');
        return;
      }
      
      // Find the section that takes up the most visible area
      let maxVisibleRatio = 0;
      
      for (let i = 0; i < sections.length; i++) {
        const section = document.querySelector(sections[i].selector) as HTMLElement;
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionBottom = sectionTop + section.offsetHeight;
          const viewportTop = scrollPosition;
          const viewportBottom = scrollPosition + window.innerHeight;
          
          // Calculate visible portion of section
          const visibleTop = Math.max(sectionTop, viewportTop);
          const visibleBottom = Math.min(sectionBottom, viewportBottom);
          const visibleHeight = Math.max(0, visibleBottom - visibleTop);
          
          if (visibleHeight > 0) {
            const visibleRatio = visibleHeight / section.offsetHeight;
            if (visibleRatio > maxVisibleRatio) {
              maxVisibleRatio = visibleRatio;
              currentActive = sections[i].id;
            }
          }
        }
      }
      
      setActiveSection(currentActive);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md border-b border-white/10 transition-colors duration-300 ${
        scrolled ? 'bg-black/80' : 'bg-black/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img src="/orviontop.png" alt="Tattvira Logo" className="h-12 md:h-14 w-auto" />
          </div>

          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.slice(0, -1).map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={`transition-colors duration-300 text-sm font-medium ${
                    isActive 
                      ? 'text-white border-b-2 border-white pb-1' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
            
            {/* CTA Button */}
            <Button 
              onClick={() => handleLinkClick('#contact')}
              className="bg-white text-black hover:bg-gray-200 rounded-full px-6 py-2 text-sm font-medium transition-all duration-300"
            >
              Get Demo
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white focus:outline-none focus:text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800">
          <div className="px-6 py-4 space-y-2">
            {/* Primary navigation links (same as desktop) */}
            {navLinks.slice(0, -1).map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  className={`block w-full text-left transition-colors duration-300 py-2.5 text-base font-medium rounded-md ${
                    isActive
                      ? 'text-white bg-white/10 border border-white/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}

            {/* CTA Button (same action/label as desktop) */}
            <div className="pt-3">
              <Button
                onClick={() => handleLinkClick('#contact')}
                className="w-full bg-white text-black hover:bg-gray-200 rounded-full py-2.5 text-base font-medium"
              >
                Get Demo
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}