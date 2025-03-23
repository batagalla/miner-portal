
import { Github, Twitter, Globe, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-binance-darker border-t border-binance-light/10 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-bold mb-4 text-binance-text">CryptoTab</h3>
            <p className="text-sm text-binance-text/80">
              The world's easiest bitcoin mining platform. Mine Bitcoin directly in your browser.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors">
                <Globe size={20} />
              </a>
              <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-binance-text">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-binance-text/70 hover:text-bitcoin transition-colors">
                  Browser Mining
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="text-sm text-binance-text/70 hover:text-bitcoin transition-colors">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/payouts" className="text-sm text-binance-text/70 hover:text-bitcoin transition-colors">
                  Payouts
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-binance-text">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-sm text-binance-text/70 hover:text-bitcoin transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm text-binance-text/70 hover:text-bitcoin transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <a href="#" className="text-sm text-binance-text/70 hover:text-bitcoin transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-binance-text/70 hover:text-bitcoin transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4 text-binance-text">Newsletter</h3>
            <p className="text-sm text-binance-text/80 mb-2">
              Subscribe to receive updates and news.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-3 py-2 text-sm bg-binance-light text-binance-text border border-binance-light rounded-l-md focus:outline-none focus:ring-1 focus:ring-bitcoin"
              />
              <button className="bg-bitcoin hover:bg-bitcoin-light text-white px-4 py-2 text-sm font-medium rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-binance-light/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-binance-text/60">
            &copy; {new Date().getFullYear()} CryptoTab. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-binance-text/60 hover:text-bitcoin transition-colors">
              Privacy
            </a>
            <a href="#" className="text-sm text-binance-text/60 hover:text-bitcoin transition-colors">
              Terms
            </a>
            <a href="#" className="text-sm text-binance-text/60 hover:text-bitcoin transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
