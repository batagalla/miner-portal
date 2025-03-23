
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AuthForm from "../components/auth/AuthForm";
import { Bitcoin, Zap, Users, Wallet, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                <path fill="#F7931A" d="M46.5,-46.5C56.5,-34.2,59,-15.4,58.2,2.8C57.3,21,53.2,38.5,41.7,49.2C30.3,59.9,11.6,63.8,-5.8,61.6C-23.1,59.4,-39.1,51.2,-51.9,37.3C-64.7,23.5,-74.4,3.9,-70.7,-12.5C-67,-28.9,-49.9,-42.1,-33.4,-52C-16.9,-61.9,-1,-68.3,10.8,-63.8C22.5,-59.2,36.5,-58.8,46.5,-46.5Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                  <span className="text-gradient">Mine Bitcoin</span> directly in your browser
                </h1>
                <p className="text-lg text-binance-text/80 mb-8 animate-slide-in-bottom">
                  CryptoTab is the world's first browser with built-in mining features. 
                  Earn cryptocurrency without any investments or special equipment.
                </p>
                <div className="flex flex-col md:flex-row gap-4 justify-center md:justify-start animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
                  <Button className="bg-bitcoin hover:bg-bitcoin-light text-white px-8 py-6">
                    Start Mining Now
                  </Button>
                  <Button variant="outline" className="border-binance-light text-binance-text hover:bg-binance-light/10 px-8 py-6">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="animate-fade-in">
                <AuthForm />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-16 bg-binance-darker">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose CryptoTab?</h2>
              <p className="text-lg text-binance-text/80 max-w-3xl mx-auto">
                Mine cryptocurrency while browsing the web or when your computer is idle.
                No special hardware or technical knowledge required.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card p-6 text-center animate-slide-in-bottom" style={{ animationDelay: "0ms" }}>
                <div className="w-16 h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-bitcoin" />
                </div>
                <h3 className="text-xl font-bold mb-2">No Special Hardware</h3>
                <p className="text-binance-text/70">
                  Mine Bitcoin with your existing computer. No need for specialized mining equipment.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center animate-slide-in-bottom" style={{ animationDelay: "100ms" }}>
                <div className="w-16 h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wallet className="h-8 w-8 text-bitcoin" />
                </div>
                <h3 className="text-xl font-bold mb-2">Regular Payouts</h3>
                <p className="text-binance-text/70">
                  Withdraw your earnings anytime with our low minimum withdrawal threshold.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
                <div className="w-16 h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-bitcoin" />
                </div>
                <h3 className="text-xl font-bold mb-2">Affiliate Program</h3>
                <p className="text-binance-text/70">
                  Earn up to 15% from your referrals' mining activity. Expand your network.
                </p>
              </div>
              
              <div className="glass-card p-6 text-center animate-slide-in-bottom" style={{ animationDelay: "300ms" }}>
                <div className="w-16 h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-bitcoin" />
                </div>
                <h3 className="text-xl font-bold mb-2">Multi-Platform</h3>
                <p className="text-binance-text/70">
                  Available on all major desktop and mobile platforms. Mine anywhere.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How it works section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-lg text-binance-text/80 max-w-3xl mx-auto">
                Start mining Bitcoin in just a few simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center animate-slide-in-bottom" style={{ animationDelay: "0ms" }}>
                <div className="w-16 h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-bitcoin">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Create an Account</h3>
                <p className="text-binance-text/70">
                  Sign up with your email or Google account to get started.
                </p>
              </div>
              
              <div className="text-center animate-slide-in-bottom" style={{ animationDelay: "100ms" }}>
                <div className="w-16 h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-bitcoin">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Start Mining</h3>
                <p className="text-binance-text/70">
                  Adjust your mining speed and let your computer earn Bitcoin for you.
                </p>
              </div>
              
              <div className="text-center animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
                <div className="w-16 h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-bitcoin">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Withdraw Earnings</h3>
                <p className="text-binance-text/70">
                  Once you reach the minimum threshold, withdraw your Bitcoin to your wallet.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials section */}
        <section className="py-16 bg-binance-darker">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-lg text-binance-text/80 max-w-3xl mx-auto">
                Join thousands of satisfied users mining Bitcoin every day
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="glass-card p-6 animate-slide-in-bottom" style={{ animationDelay: "0ms" }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-binance-light/50 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Alex Thompson</h4>
                    <p className="text-sm text-binance-text/70">Graphic Designer</p>
                  </div>
                </div>
                <p className="text-binance-text/80">
                  "I've been using CryptoTab for 6 months now and have earned enough to cover my coffee expenses. It's super easy to use!"
                </p>
              </div>
              
              <div className="glass-card p-6 animate-slide-in-bottom" style={{ animationDelay: "100ms" }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-binance-light/50 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-binance-text/70">Software Developer</p>
                  </div>
                </div>
                <p className="text-binance-text/80">
                  "The affiliate program is amazing. I invited my friends and now earn passive income from their mining activity too."
                </p>
              </div>
              
              <div className="glass-card p-6 animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-binance-light/50 rounded-full mr-4"></div>
                  <div>
                    <h4 className="font-bold">Michael Rodriguez</h4>
                    <p className="text-sm text-binance-text/70">Student</p>
                  </div>
                </div>
                <p className="text-binance-text/80">
                  "As a student, this is a great way to earn some extra cash without any investment. The payouts are reliable and on time."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-10">
                <path fill="#F7931A" d="M36.9,-48.2C51.1,-45,68,-38.3,73.8,-26.2C79.6,-14,74.2,3.6,65.6,16.9C57,30.3,45.1,39.3,33.3,45.2C21.5,51.1,9.7,53.8,-2.6,53.8C-14.9,53.8,-29.8,51.2,-41.5,43.3C-53.2,35.5,-61.8,22.4,-65.6,7.4C-69.5,-7.7,-68.7,-24.8,-59.8,-34.8C-51,-44.8,-34.1,-47.7,-20.8,-50.4C-7.4,-53,-1.2,-55.4,6.3,-54.1C13.9,-52.9,22.7,-51.5,36.9,-48.2Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="glass-card p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Start Mining Bitcoin?
              </h2>
              <p className="text-xl text-binance-text/80 mb-8 max-w-3xl mx-auto">
                Join thousands of users worldwide who are already earning Bitcoin. 
                No investments, no downloads, just profits.
              </p>
              <Button className="bg-bitcoin hover:bg-bitcoin-light text-white px-8 py-6 text-lg">
                Start Mining Now
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
