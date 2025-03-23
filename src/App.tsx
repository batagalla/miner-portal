import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, createContext } from "react";

// Pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import AffiliateProgram from "./pages/AffiliateProgram";
import Payouts from "./pages/Payouts";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Create auth context
export const AuthContext = createContext({
  isAuthenticated: false,
  login: (token: string, email: string) => {},
  logout: () => {},
  email: "",
});

const queryClient = new QueryClient();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  
  // Check for existing token in localStorage on startup
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("userEmail");
    if (token && storedEmail) {
      setIsAuthenticated(true);
      setEmail(storedEmail);
    }
  }, []);
  
  const login = (token: string, email: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userEmail", email);
    setIsAuthenticated(true);
    setEmail(email);
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    setEmail("");
  };
  
  // Protected route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/" />;
    }
    return <>{children}</>;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, email }}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/affiliate" 
                element={
                  <ProtectedRoute>
                    <AffiliateProgram />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/payouts" 
                element={
                  <ProtectedRoute>
                    <Payouts />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
