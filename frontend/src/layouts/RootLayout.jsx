import React from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const RootLayout = () => {
    return (
      <div>
        <Navbar />
        <div className='min-h-[calc(100vh-65px)]'>
          <Outlet />
        </div>
        <Footer />
      </div>
    );
};

export default RootLayout;