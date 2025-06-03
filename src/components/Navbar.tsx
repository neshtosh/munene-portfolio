import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Navbar: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-dark/80 backdrop-blur-sm border-b border-dark/10 dark:border-light/10">
      <div className="container-custom h-20 flex items-center justify-between">
        <Link to="/" className="font-display text-xl font-bold">
          John Doe
        </Link>
        
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/projects" className="hover:text-primary dark:hover:text-primary transition-colors">
              Projects
            </Link>
            <Link to="/about" className="hover:text-primary dark:hover:text-primary transition-colors">
              About
            </Link>
            <Link to="/contact" className="hover:text-primary dark:hover:text-primary transition-colors">
              Contact
            </Link>
          </div>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-highlight dark:hover:bg-dark-600 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 