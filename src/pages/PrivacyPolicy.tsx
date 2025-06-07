import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="pt-32 pb-20">
      <div className="container-custom">
        <Link
          to="/"
          className="inline-flex items-center text-muted hover:text-primary transition-colors mb-12"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Home
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-muted mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <h2>Introduction</h2>
            <p>
              This Privacy Policy describes how this personal portfolio website ("we", "our", or "us") collects, uses, and shares your personal information when you visit our website.
            </p>

            <h2>Information We Collect</h2>
            <p>We collect minimal information through this website:</p>
            <ul>
              <li>Basic analytics data (page views, time spent on site)</li>
              <li>Information you voluntarily provide through the contact form</li>
              <li>Technical information about your device and browser</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the collected information to:</p>
            <ul>
              <li>Improve and optimize our website</li>
              <li>Respond to your inquiries</li>
              <li>Analyze website usage patterns</li>
            </ul>

            <h2>Cookies and Tracking</h2>
            <p>
              This website uses essential cookies for basic functionality. We do not use any tracking cookies or third-party analytics that collect personal information.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We use the following third-party services:
            </p>
            <ul>
              <li>Vercel for hosting and analytics</li>
              <li>GitHub for code hosting</li>
            </ul>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request access to your personal data</li>
              <li>Request correction of your personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
            </ul>

            <h2>Contact</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through the contact form on our website.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy; 