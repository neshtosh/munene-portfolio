import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 border-t border-highlight dark:border-dark-600">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-muted mb-4">Nairobi ,Kenya</p>
            <p className="text-sm text-muted">Web Developer & Designer</p>
          </div>
          
          <div className="text-sm">
            <a 
              href="mailto:aleckogitonga8@gmail.com" 
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors"
            >
              aleckogitonga8@gmail.com
            </a>
          </div>

          <div className="flex space-x-6 md:justify-end">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Github size={20} />
              <span className="sr-only">GitHub</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Linkedin size={20} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a 
              href="mailto:hello@johndoe.dev"
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors"
            >
              <Mail size={20} />
              <span className="sr-only">Email</span>
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-highlight dark:border-dark-600 text-sm text-muted flex justify-between items-center">
          <p>&copy; {currentYear} Alex Munene. All Rights Reserved.</p>
          <p className="text-xs">
            <a href="#" className="text-muted hover:text-primary transition-colors">Privacy Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;