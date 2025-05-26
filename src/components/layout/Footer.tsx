import { Link } from "react-router-dom";
import { Twitter, Github, Facebook, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-binance-darker text-binance-text py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} BitMiner. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <Link to="/terms" className="text-sm hover:text-bitcoin mr-4">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-sm hover:text-bitcoin">
              Privacy Policy
            </Link>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <a
            href="#"
            className="text-gray-400 hover:text-bitcoin mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-bitcoin mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-bitcoin mx-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook className="h-5 w-5" />
          </a>
          <a
            href="mailto:support@example.com"
            className="text-gray-400 hover:text-bitcoin mx-2"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
