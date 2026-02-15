import React, { type FC } from 'react';
import { cn } from '@/lib/utils';

/**
 * Props for the Footer component.
 */
interface FooterProps extends React.HTMLAttributes<HTMLElement> {
  // No props needed for this simple footer
}

/**
 * A clean, multi-column footer component inspired by Google's design.
 */
const Footer: FC<FooterProps> = ({
  className,
  ...props
}) => {
  const footerSections = [
    {
      title: 'Products',
      links: [
        { label: 'AI Video Security', href: '#' },
        { label: 'Access Control', href: '#' },
        { label: 'Cloud Platform', href: '#' },
        { label: 'Analytics Dashboard', href: '#' },
        { label: 'Mobile App', href: '#' },
        { label: 'Integrations', href: '#' },
      ],
    },
    {
      title: 'Solutions',
      links: [
        { label: 'Smart Cities', href: '#' },
        { label: 'Healthcare', href: '#' },
        { label: 'Education', href: '#' },
        { label: 'Retail & Commerce', href: '#' },
        { label: 'Manufacturing', href: '#' },
        { label: 'Enterprise Security', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '#' },
        { label: 'Case Studies', href: '#' },
        { label: 'Documentation', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Security Updates', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Partners', href: '#' },
        { label: 'Press & Media', href: '#' },
        { label: 'Investor Relations', href: '#' },
      ],
    },
  ];

  return (
    <footer className={cn('w-full bg-white text-gray-700', className)} {...props}>
      {/* Main Footer Content */}
      <div className="w-full">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {footerSections.map((section, index) => (
              <div key={index}>
                <h2 className="text-sm font-medium text-gray-900 mb-4">
                  {section.title}
                </h2>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <a
                        href={link.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-gray-200">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <img src="/top_logo.png" alt="Tattvira Logo" width="100" height="24" className="h-6 w-auto" />
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                Terms
              </a>
            </div>
            <div className="flex items-center gap-6">
              <button 
                aria-label="Help"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors py-3 px-2"
              >
                <span className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-400">
                  <span className="text-xs">?</span>
                </span>
                Help
              </button>
              <button className="text-sm text-gray-600 hover:text-gray-900 transition-colors py-3 px-2">
                English
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
