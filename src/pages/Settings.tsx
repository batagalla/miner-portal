
import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import SettingsComponent from "../components/settings/Settings";
import AdsComponent from "../components/ads/AdsComponent";

const Settings = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SettingsComponent />
        
        {/* Ad placement after settings */}
        <div className="mt-8 flex justify-center">
          <AdsComponent adUnit="123473" size="horizontal" className="hidden md:block" />
          <AdsComponent adUnit="123474" size="square" className="md:hidden" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
