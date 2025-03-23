
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdsComponent from "@/components/ads/AdsComponent";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const VerifyEmail = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");
  
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        setIsLoading(true);
        
        // In a real app, this would be an API call
        const response = await fetch(`http://localhost:5000/api/auth/verify/${token}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.errors?.[0]?.msg || 'Verification failed');
        }
        
        setIsVerified(true);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Email verification failed');
        setIsVerified(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    verifyEmail();
  }, [token]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 flex flex-col items-center justify-center">
        <div className="glass-card p-8 w-full max-w-md text-center animate-fade-in">
          {isLoading ? (
            <div className="py-8">
              <Loader2 className="h-12 w-12 animate-spin text-bitcoin mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Verifying Your Email</h1>
              <p className="text-binance-text/70">Please wait while we verify your email address...</p>
            </div>
          ) : isVerified ? (
            <div className="py-6">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Email Verified!</h1>
              <p className="text-binance-text/70 mb-6">Your email has been successfully verified. You can now log in to your account.</p>
              <Button 
                onClick={() => navigate('/')} 
                className="bg-bitcoin hover:bg-bitcoin-light"
              >
                Go to Login
              </Button>
            </div>
          ) : (
            <div className="py-6">
              <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <h1 className="text-2xl font-bold mb-2">Verification Failed</h1>
              <p className="text-binance-text/70 mb-6">
                {error || "We couldn't verify your email address. The verification link may have expired or already been used."}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => navigate('/')} 
                  variant="outline"
                >
                  Go to Login
                </Button>
                <Button 
                  onClick={() => navigate('/contact')} 
                  className="bg-bitcoin hover:bg-bitcoin-light"
                >
                  Contact Support
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-8">
          <AdsComponent adUnit="123461" size="square" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VerifyEmail;
