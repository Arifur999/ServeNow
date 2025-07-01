import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../contexts/AuthContext';
import Spinner from '../components/Spinner';

const RootLayout = () => {
      const { loading } = useContext(AuthContext);


      if (loading) {
    return <Spinner />;
  }

    return (
        <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
    );
};

export default RootLayout;

