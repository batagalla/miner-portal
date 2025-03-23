
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
import PublicPayouts from "./pages/PublicPayouts";
import Faq from "./pages/Faq";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

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

  // Public route that redirects authenticated users to dashboard
  const PublicOnlyRoute = ({ children }: { children: React.ReactNode }) => {
    if (isAuthenticated) {
      return <Navigate to="/dashboard" />;
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
              {/* Public only routes - redirect to dashboard if authenticated */}
              <Route 
                path="/" 
                element={
                  <PublicOnlyRoute>
                    <Index />
                  </PublicOnlyRoute>
                } 
              />
              
              {/* Mixed access routes - different views for auth/non-auth */}
              <Route 
                path="/payouts" 
                element={
                  isAuthenticated ? <Payouts /> : <PublicPayouts />
                } 
              />
              <Route path="/faq" element={<Faq />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected routes - require authentication */}
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
                path="/settings" 
                element={
                  <ProtectedRoute>
                    <Settings />
                  </ProtectedRoute>
                } 
              />
              
              {/* Admin routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              
              {/* Catch all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
};

export default App;
