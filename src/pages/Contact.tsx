import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Replace these with your actual EmailJS credentials
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Alex Gitonga',
        reply_to: formData.email,
      };

      await emailjs.send(
        'service_95g1ozw', // Replace with your EmailJS service ID
        'template_0eh23kp', // Replace with your EmailJS template ID
        templateParams,
        'VkJXtw0gOEaHPJfr3' // Replace with your EmailJS user ID
      );

      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                  href="mailto:aleckogitonga8@gmail.com" 
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
                  {error && (
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-600 dark:text-red-400">
                      {error}
                    </div>
                  )}
                  
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