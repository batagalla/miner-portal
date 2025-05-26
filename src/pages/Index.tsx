
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../App";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AuthForm from "../components/auth/AuthForm";
import AdsComponent from "../components/ads/AdsComponent";
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
        {/* Hero Section */}
        <section className="py-8 md:py-16 lg:py-24 px-4 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-5 md:opacity-10">
                <path fill="#F7931A" d="M46.5,-46.5C56.5,-34.2,59,-15.4,58.2,2.8C57.3,21,53.2,38.5,41.7,49.2C30.3,59.9,11.6,63.8,-5.8,61.6C-23.1,59.4,-39.1,51.2,-51.9,37.3C-64.7,23.5,-74.4,3.9,-70.7,-12.5C-67,-28.9,-49.9,-42.1,-33.4,-52C-16.9,-61.9,-1,-68.3,10.8,-63.8C22.5,-59.2,36.5,-58.8,46.5,-46.5Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="text-center lg:text-left order-2 lg:order-1">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 animate-fade-in">
                  <span className="text-gradient">Mine Bitcoin</span> directly in your browser
                </h1>
                <p className="text-base md:text-lg text-binance-text/80 mb-6 md:mb-8 animate-slide-in-bottom">
                  CryptoTab is the world's first browser with built-in mining features. 
                  Earn cryptocurrency without any investments or special equipment.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
                  <Button className="bg-bitcoin hover:bg-bitcoin-light text-white px-6 md:px-8 py-3 md:py-6 text-base md:text-lg">
                    Start Mining Now
                  </Button>
                  <Button variant="outline" className="border-binance-light text-binance-text hover:bg-binance-light/10 px-6 md:px-8 py-3 md:py-6 text-base md:text-lg">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="animate-fade-in order-1 lg:order-2">
                <AuthForm />
              </div>
            </div>
          </div>
          
          {/* Mobile ad below hero */}
          <div className="max-w-7xl mx-auto mt-8 md:mt-10 px-4">
            <div className="flex justify-center">
              <AdsComponent adUnit="123456" size="horizontal" className="hidden md:block" />
              <AdsComponent adUnit="123458" size="square" className="md:hidden" />
            </div>
          </div>
        </section>
        
        {/* Features section */}
        <section className="py-12 md:py-16 bg-binance-darker">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Choose CryptoTab?</h2>
              <p className="text-base md:text-lg text-binance-text/80 max-w-3xl mx-auto">
                Mine cryptocurrency while browsing the web or when your computer is idle.
                No special hardware or technical knowledge required.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {[
                {
                  icon: Zap,
                  title: "No Special Hardware",
                  description: "Mine Bitcoin with your existing computer. No need for specialized mining equipment.",
                  delay: "0ms"
                },
                {
                  icon: Wallet,
                  title: "Regular Payouts",
                  description: "Withdraw your earnings anytime with our low minimum withdrawal threshold.",
                  delay: "100ms"
                },
                {
                  icon: Users,
                  title: "Affiliate Program",
                  description: "Earn up to 15% from your referrals' mining activity. Expand your network.",
                  delay: "200ms"
                },
                {
                  icon: Globe,
                  title: "Multi-Platform",
                  description: "Available on all major desktop and mobile platforms. Mine anywhere.",
                  delay: "300ms"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="glass-card p-4 md:p-6 text-center animate-slide-in-bottom" 
                  style={{ animationDelay: feature.delay }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-6 w-6 md:h-8 md:w-8 text-bitcoin" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-binance-text/70">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Ad after features */}
          <div className="flex justify-center mt-12 md:mt-16">
            <AdsComponent adUnit="123462" size="horizontal" className="hidden md:block" />
            <AdsComponent adUnit="123463" size="square" className="md:hidden" />
          </div>
        </section>
        
        {/* How it works section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h2>
              <p className="text-base md:text-lg text-binance-text/80 max-w-3xl mx-auto">
                Start mining Bitcoin in just a few simple steps
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                {
                  number: "1",
                  title: "Create an Account",
                  description: "Sign up with your email or Google account to get started.",
                  delay: "0ms"
                },
                {
                  number: "2",
                  title: "Start Mining",
                  description: "Adjust your mining speed and let your computer earn Bitcoin for you.",
                  delay: "100ms"
                },
                {
                  number: "3",
                  title: "Withdraw Earnings",
                  description: "Once you reach the minimum threshold, withdraw your Bitcoin to your wallet.",
                  delay: "200ms"
                }
              ].map((step, index) => (
                <div 
                  key={index}
                  className="text-center animate-slide-in-bottom" 
                  style={{ animationDelay: step.delay }}
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-binance-light/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-lg md:text-xl font-bold text-bitcoin">{step.number}</span>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-sm md:text-base text-binance-text/70">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA section */}
        <section className="py-16 md:py-20 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl">
              <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="opacity-5 md:opacity-10">
                <path fill="#F7931A" d="M36.9,-48.2C51.1,-45,68,-38.3,73.8,-26.2C79.6,-14,74.2,3.6,65.6,16.9C57,30.3,45.1,39.3,33.3,45.2C21.5,51.1,9.7,53.8,-2.6,53.8C-14.9,53.8,-29.8,51.2,-41.5,43.3C-53.2,35.5,-61.8,22.4,-65.6,7.4C-69.5,-7.7,-68.7,-24.8,-59.8,-34.8C-51,-44.8,-34.1,-47.7,-20.8,-50.4C-7.4,-53,-1.2,-55.4,6.3,-54.1C13.9,-52.9,22.7,-51.5,36.9,-48.2Z" transform="translate(100 100)" />
              </svg>
            </div>
          </div>
          
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="glass-card p-6 md:p-8 lg:p-12 text-center">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-6">
                Ready to Start Mining Bitcoin?
              </h2>
              <p className="text-lg md:text-xl text-binance-text/80 mb-6 md:mb-8 max-w-3xl mx-auto">
                Join thousands of users worldwide who are already earning Bitcoin. 
                No investments, no downloads, just profits.
              </p>
              <Button className="bg-bitcoin hover:bg-bitcoin-light text-white px-6 md:px-8 py-3 md:py-6 text-base md:text-lg">
                Start Mining Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Floating sidebar ad for larger screens */}
        <div className="fixed right-2 md:right-4 bottom-20 md:bottom-24 hidden xl:block z-40">
          <AdsComponent adUnit="123461" size="vertical" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
