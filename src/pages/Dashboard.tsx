
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import DashboardComponent from "../components/dashboard/Dashboard";

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <DashboardComponent />
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
