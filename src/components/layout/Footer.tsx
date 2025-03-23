
import { Link } from "react-router-dom";
import { Bitcoin, Github, Twitter, Discord } from "lucide-react";
import AdsComponent from "../ads/AdsComponent";

const Footer = () => {
  return (
    <footer className="bg-binance-darker/50 border-t border-binance-light/10 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Ad placement in footer */}
        <div className="mb-8 flex justify-center">
          <div className="overflow-x-auto w-full scrollbar-hide">
            <AdsComponent adUnit="123456" size="horizontal" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Bitcoin className="h-8 w-8 text-bitcoin mr-2" />
              <span className="text-xl font-bold">CryptoTab</span>
            </Link>
            <p className="text-binance-text/70 text-sm mb-4">
              Mine Bitcoin directly in your browser. No downloads, no complicated setup.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-binance-text/60 hover:text-bitcoin transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-binance-text/60 hover:text-bitcoin transition-colors">
                <Discord className="h-5 w-5" />
              </a>
              <a href="#" className="text-binance-text/60 hover:text-bitcoin transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Platform</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/dashboard" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/affiliate" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/payouts" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Payouts
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Account Settings
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Support
                </Link>
              </li>
              <li>
                <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-binance-text/70 hover:text-bitcoin transition-colors text-sm">
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-binance-light/10 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-binance-text/60 text-sm">
            &copy; {new Date().getFullYear()} CryptoTab. All rights reserved.
          </p>
          <p className="text-binance-text/60 text-sm mt-2 sm:mt-0">
            Cryptocurrency mining in your browser
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
