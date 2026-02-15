import React, { type FC } from 'react';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Purpose', href: '#purpose' },
  { name: 'Industries', href: '#industries' },
  { name: 'Why Partner', href: '#why-partner' },
  { name: 'Get Demo', href: '#contact' },
];

const industryLinks = [
  { name: 'Smart Cities', href: '#industries' },
  { name: 'Healthcare', href: '#industries' },
  { name: 'Education', href: '#industries' },
  { name: 'Retail & Commerce', href: '#industries' },
  { name: 'Manufacturing', href: '#industries' },
];

/**
 * Premium minimal corporate website footer component
 */
const PremiumFooter: FC = () => {
  const handleLinkClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer w-full bg-black pt-16 pb-16">
      <div className="w-layout-blockcontainer container w-container max-w-[1400px] mx-auto px-6">
        <div className="footer_layout flex flex-col gap-16 md:flex-row md:gap-64">
          
          {/* Column 1 - NAVIGATION */}
          <div className="col w-full md:w-1/4">
            <div className="footer_col">
              <div className="flex flex-col gap-8">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 327 18" fill="none" className="envelope text-gray-400" style={{opacity: 1}}>
                    <path d="M326 17L309.994 0.999999L6.99382e-07 0.999986" stroke="currentColor" strokeWidth="1" opacity="0.3"></path>
                  </svg>
                  <h3 className="eyebrow text-xs uppercase tracking-widest text-gray-400 font-normal mt-4 mb-8">Navigation</h3>
                </div>
                <ul className="flex flex-col gap-4 list-none">
                  {navLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="footer_links text-gray-300 hover:text-white transition-colors duration-200 text-sm text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Column 2 - INDUSTRIES */}
          <div className="col w-full md:w-1/4">
            <div className="footer_col">
              <div className="flex flex-col gap-8">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 327 18" fill="none" className="envelope text-gray-400" style={{opacity: 1}}>
                    <path d="M326 17L309.994 0.999999L6.99382e-07 0.999986" stroke="currentColor" strokeWidth="1" opacity="0.3"></path>
                  </svg>
                  <h3 className="eyebrow text-xs uppercase tracking-widest text-gray-400 font-normal mt-4 mb-8">Industries</h3>
                </div>
                <ul className="flex flex-col gap-4 list-none">
                  {industryLinks.map((link) => (
                    <li key={link.name}>
                      <button
                        onClick={() => handleLinkClick(link.href)}
                        className="footer_links text-gray-300 hover:text-white transition-colors duration-200 text-sm text-left"
                      >
                        {link.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          {/* Column 3 - CONTACT */}
          <div className="col w-full md:w-1/4">
            <div className="footer_col">
              <div className="flex flex-col gap-8">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 327 18" fill="none" className="envelope text-gray-400" style={{opacity: 1}}>
                    <path d="M326 17L309.994 0.999999L6.99382e-07 0.999986" stroke="currentColor" strokeWidth="1" opacity="0.3"></path>
                  </svg>
                  <h3 className="eyebrow text-xs uppercase tracking-widest text-gray-400 font-normal mt-4 mb-8">Contact</h3>
                </div>
                <ul className="flex flex-col gap-4 list-none text-sm text-gray-300">
                  <li>
                    <a href="mailto:tattvira@gmail.com " className="footer_links hover:text-white transition-colors duration-200 flex items-center gap-3 group">
                      <Mail className="shrink-0 w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                      <span>tattvira@gmail.com</span>
                    </a>
                  </li>
                  <li className="flex items-center gap-3">
                    <a href="tel:+919148074509" className="footer_links hover:text-white transition-colors duration-200 flex items-center gap-3 group">
                      <Phone className="shrink-0 w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-200" />
                      <span>+91-9148074509</span>
                    </a>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="shrink-0 w-5 h-5 text-gray-400 mt-0.5" />
                    <span>TATTVIRA PVT LTD,#59, Maralakunte, Jala Hobli, Yelahanka Taluk, Bagalur (Bangalore), Bangalore North, Karnataka, India, 562149</span>
                  </li>
                </ul>
                <div className="flex gap-4 mt-2">
                  <a href="https://www.linkedin.com/company/orvion" target="_blank" rel="noopener noreferrer" className="footer_links block" aria-label="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400 hover:text-white transition-colors duration-200">
                      <path fillRule="evenodd" clipRule="evenodd" d="M4.5 3C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3H4.5ZM8.52076 7.00272C8.52639 7.95897 7.81061 8.54819 6.96123 8.54397C6.16107 8.53975 5.46357 7.90272 5.46779 7.00413C5.47201 6.15897 6.13998 5.47975 7.00764 5.49944C7.88795 5.51913 8.52639 6.1646 8.52076 7.00272ZM12.2797 9.76176H9.75971H9.7583V18.3216H12.4217V18.1219C12.4217 17.742 12.4214 17.362 12.4211 16.9819C12.4203 15.9681 12.4194 14.9532 12.4246 13.9397C12.426 13.6936 12.4372 13.4377 12.5005 13.2028C12.7381 12.3253 13.5271 11.7586 14.4074 11.8979C14.9727 11.9864 15.3467 12.3141 15.5042 12.8471C15.6013 13.1803 15.6449 13.5389 15.6491 13.8863C15.6605 14.9339 15.6589 15.9815 15.6573 17.0292C15.6567 17.399 15.6561 17.769 15.6561 18.1388V18.3202H18.328V18.1149C18.328 17.6629 18.3278 17.211 18.3275 16.7591C18.327 15.6296 18.3264 14.5001 18.3294 13.3702C18.3308 12.8597 18.276 12.3563 18.1508 11.8627C17.9638 11.1286 17.5771 10.5211 16.9485 10.0824C16.5027 9.77019 16.0133 9.5691 15.4663 9.5466C15.404 9.54401 15.3412 9.54062 15.2781 9.53721C14.9984 9.52209 14.7141 9.50673 14.4467 9.56066C13.6817 9.71394 13.0096 10.0641 12.5019 10.6814C12.4429 10.7522 12.3852 10.8241 12.2991 10.9314L12.2797 10.9557V9.76176ZM5.68164 18.3244H8.33242V9.76733H5.68164V18.3244Z" fill="currentColor"></path>
                    </svg>
                  </a>
                  <a href="https://x.com/orvion" target="_blank" rel="noopener noreferrer" className="footer_links block" aria-label="X (Twitter)">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-gray-400 hover:text-white transition-colors duration-200">
                      <path d="M17.1761 4H19.9362L13.9061 10.7774L21 20H15.4456L11.0951 14.4066L6.11723 20H3.35544L9.80517 12.7508L3 4H8.69545L12.6279 9.11262L17.1761 4ZM16.2073 18.3754H17.7368L7.86441 5.53928H6.2232L16.2073 18.3754Z" fill="currentColor"></path>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/tattvira?igsh=MThoa3lncjZhYzdzbw==" target="_blank" rel="noopener noreferrer" className="footer_links block" aria-label="Instagram">
                    <Instagram className="w-6 h-6 text-gray-400 hover:text-white transition-colors duration-200" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="flex flex-col gap-0 mt-16">
          {/* Logo row */}
          <div className="flex justify-center w-full">
            <img 
              src="/footer.png" 
              alt="ORVION Logo" 
              className="footer_logo opacity-20 w-full h-auto"
            />
          </div>
          
          {/* Copyright row */}
          <div className="flex justify-center pt-8 border-t border-gray-800 mt-4">
            <div className="text-gray-400 text-sm text-center">
              © 2026 TATTVIRA Private Limited. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default PremiumFooter;
