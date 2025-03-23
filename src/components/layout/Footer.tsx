
import { Link } from "react-router-dom";
import { Twitter, Github, Facebook, Mail, Bitcoin } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const Footer = () => {
  const isMobile = useIsMobile();
  
  return (
    <footer className="bg-binance-darker text-binance-text py-8 border-t border-binance-light/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-bitcoin flex items-center justify-center mr-2">
                <Bitcoin className="h-4 w-4 text-white" />
              </div>
              <span className="text-lg font-bold">CryptoTab</span>
            </div>
            <p className="text-sm text-binance-text/70 max-w-xs">
              Mine Bitcoin directly in your browser while browsing the web. Fast, secure, and free to use.
            </p>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              <Link to="/" className="text-sm hover:text-bitcoin transition-colors">
                Home
              </Link>
              <Link to="/affiliate" className="text-sm hover:text-bitcoin transition-colors">
                Affiliate
              </Link>
              <Link to="/payouts" className="text-sm hover:text-bitcoin transition-colors">
                Payouts
              </Link>
              <Link to="/faq" className="text-sm hover:text-bitcoin transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="text-sm hover:text-bitcoin transition-colors">
                Contact
              </Link>
              <Link to="/settings" className="text-sm hover:text-bitcoin transition-colors">
                Settings
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Connect With Us</h3>
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-binance-light/10 text-binance-text hover:text-bitcoin hover:bg-binance-light/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-binance-light/10 text-binance-text hover:text-bitcoin hover:bg-binance-light/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-binance-light/10 text-binance-text hover:text-bitcoin hover:bg-binance-light/20 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Github"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="mailto:support@example.com"
                className="w-8 h-8 flex items-center justify-center rounded-full bg-binance-light/10 text-binance-text hover:text-bitcoin hover:bg-binance-light/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
            <div className="pt-2">
              <a href="mailto:support@example.com" className="text-sm hover:text-bitcoin transition-colors">
                support@cryptotab.com
              </a>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-binance-light/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} CryptoTab. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-sm hover:text-bitcoin transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm hover:text-bitcoin transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
