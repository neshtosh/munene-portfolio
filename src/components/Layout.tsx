import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import CustomCursor from './CustomCursor';

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-dark text-dark dark:text-light">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CustomCursor />
    </div>
  );
};

export default Layout; 