import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import DocumentHead from './DocumentHead';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-light">
      <DocumentHead />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 