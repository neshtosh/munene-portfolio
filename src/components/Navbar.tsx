import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import MuteButton from './MuteButton';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Ultra minimal background */}
      <div className="absolute inset-0 bg-white/30 dark:bg-dark/30 backdrop-blur-sm">
        <div className="absolute bottom-0 left-0 w-full h-[0.5px] bg-gradient-to-r from-transparent via-primary/5 to-transparent" />
      </div>

      <div className="container-custom h-14 relative">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              animate={{ rotateY: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="relative w-8 h-8"
            >
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-contain dark:invert"
              />
            </motion.div>
            <span className="text-xs tracking-widest uppercase text-dark/60 dark:text-light/60 group-hover:text-primary dark:group-hover:text-primary transition-colors">Munene</span>
          </Link>

          {/* Navigation links */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-8">
              {[
                { path: '/projects', label: 'Projects' },
                { path: '/about', label: 'About' },
                { path: '/contact', label: 'Contact' }
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="relative group"
                >
                  <span className="text-xs tracking-widest uppercase text-dark/60 dark:text-light/60 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                    {item.label}
                  </span>
                  <div className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-primary/50 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Minimal controls */}
            <div className="flex items-center gap-1">
              <MuteButton />
              <ThemeToggle />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden relative w-6 h-6 flex items-center justify-center"
            >
              <motion.div
                animate={isMenuOpen ? "open" : "closed"}
                className="relative w-5 h-5"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  className="absolute w-5 h-[1px] bg-dark/60 dark:bg-light/60"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="absolute w-5 h-[1px] bg-dark/60 dark:bg-light/60"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  className="absolute w-5 h-[1px] bg-dark/60 dark:bg-light/60"
                />
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-14 left-0 right-0 bg-white/95 dark:bg-dark/95 backdrop-blur-sm border-t border-dark/5 dark:border-light/5"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col gap-4">
                {[
                  { path: '/projects', label: 'Projects' },
                  { path: '/about', label: 'About' },
                  { path: '/contact', label: 'Contact' }
                ].map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="relative group"
                  >
                    <span className="text-xs tracking-widest uppercase text-dark/60 dark:text-light/60 group-hover:text-primary dark:group-hover:text-primary transition-colors">
                      {item.label}
                    </span>
                    <div className="absolute -bottom-0.5 left-0 w-0 h-[0.5px] bg-primary/50 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 