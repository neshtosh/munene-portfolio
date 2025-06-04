import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  return (
    <section className="pt-32 pb-20">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="font-display font-bold mb-6">Get in Touch</h1>
          <p className="text-xl text-muted max-w-2xl mb-12">
            Have a project in mind or want to discuss potential opportunities? I'd love to hear from you.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-12">
            <div className="md:col-span-2">
              <h2 className="text-xl font-display font-bold mb-4">Contact Information</h2>
              <p className="mb-6">
                Feel free to reach out through the form or directly via email or social media.
              </p>
              
              <div className="space-y-4">
                <a 
                  href="mailto:hello@johndoe.dev" 
                  className="flex items-center text-muted hover:text-primary transition-colors"
                >
                  <Mail className="mr-3 w-5 h-5" />
                  <span>aleckogitonga8@gmail.com</span>
                </a>
                <a 
                  href="https://github.com/neshtosh" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted hover:text-primary transition-colors"
                >
                  <Github className="mr-3 w-5 h-5" />
                  <span>github.com/neshtosh</span>
                </a>
                <a 
                  href="https://www.linkedin.com/in/alex-gitonga-9b49971a2/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center text-muted hover:text-primary transition-colors"
                >
                  <Linkedin className="mr-3 w-5 h-5" />
                  <span>linkedin.com/in/alex-gitonga</span>
                </a>
              </div>
            </div>
            
            <div className="md:col-span-3">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-highlight dark:border-dark-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-highlight dark:border-dark-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-highlight dark:border-dark-600 rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-primary/90 transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        Send Message <Send className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 p-6 rounded-md">
                  <h3 className="text-xl font-display font-bold mb-2 text-green-700 dark:text-green-400">
                    Message Sent!
                  </h3>
                  <p className="text-green-600 dark:text-green-300">
                    Thanks for reaching out. I'll get back to you as soon as possible.
                  </p>
                </div>
              )}
            </div>
          </div>
          
          <div className="pt-12 border-t border-highlight dark:border-dark-600">
            <h2 className="text-xl font-display font-bold mb-4">Location</h2>
            <p className="text-muted">
              Based in Nairobi, Kenya. Available for remote work worldwide.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;