import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Code } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: 'Home', path: '/' },
    { title: 'About', path: '/about' },
    { title: 'Projects', path: '/projects' },
    { title: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled || isOpen
          ? 'py-4 bg-white/90 dark:bg-dark/90 backdrop-blur-sm border-b border-highlight dark:border-dark-600'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <NavLink to="/" className="flex items-center">
          <Code className="w-7 h-7 text-primary mr-2" />
          <span className="font-display text-xl font-bold uppercase tracking-tight">John.Dev</span>
        </NavLink>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map(item => (
            <NavLink 
              key={item.path} 
              to={item.path}
              className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
            >
              {item.title}
            </NavLink>
          ))}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={20} className="text-light" />
            ) : (
              <Moon size={20} className="text-dark" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 mr-2 rounded-full hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-light" />
            ) : (
              <Moon size={18} className="text-dark" />
            )}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-full hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
          >
            {isOpen ? (
              <X size={24} className="text-dark dark:text-light" />
            ) : (
              <Menu size={24} className="text-dark dark:text-light" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden absolute top-full left-0 right-0 bg-white dark:bg-dark shadow-lg border-t border-highlight dark:border-dark-600"
        >
          <div className="container-custom py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map(item => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => 
                    `text-lg py-2 ${isActive ? 'text-primary font-medium' : 'text-dark dark:text-light'}`
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;