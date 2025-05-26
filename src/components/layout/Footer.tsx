
import { Link } from "react-router-dom";
import { Twitter, Github, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-binance-darker text-binance-text py-6 md:py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:justify-between md:items-center">
          <div className="text-center md:text-left">
            <div className="text-sm md:text-base">
              &copy; {new Date().getFullYear()} BitMiner. All rights reserved.
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-end space-y-4 sm:space-y-0 sm:space-x-6">
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
              <Link 
                to="/terms" 
                className="text-sm hover:text-bitcoin transition-colors"
              >
                Terms of Service
              </Link>
              <Link 
                to="/privacy" 
                className="text-sm hover:text-bitcoin transition-colors"
              >
                Privacy Policy
              </Link>
            </div>

            <div className="flex justify-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-bitcoin transition-colors p-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-bitcoin transition-colors p-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-bitcoin transition-colors p-1"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
              </a>
              <a
                href="mailto:support@bitminer.com"
                className="text-gray-400 hover:text-bitcoin transition-colors p-1"
                aria-label="Email"
              >
                <Mail className="h-4 w-4 md:h-5 md:w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-binance-light/10 text-center">
          <p className="text-xs md:text-sm text-binance-text/60 max-w-2xl mx-auto">
            BitMiner is a cryptocurrency mining platform. Mining involves computational risks and 
            cryptocurrency values can be volatile. Please mine responsibly and never invest more than you can afford to lose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
