
import { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";
import { Menu, X, Bitcoin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const location = useLocation();
  const { isAuthenticated, logout, email } = useContext(AuthContext);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setUserMenuOpen(!userMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when user clicks outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const navbarElement = document.getElementById('mobile-menu-container');
      if (navbarElement && !navbarElement.contains(event.target as Node) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
      duration: 3000,
    });
  };

  const navLinks = [
    { name: "Home", path: isAuthenticated ? "/dashboard" : "/" },
    { name: "Affiliate Program", path: "/affiliate" },
    { name: "Payouts", path: "/payouts" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-binance-darker border-b border-binance-light/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center">
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-bitcoin flex items-center justify-center mr-2">
                <Bitcoin className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </div>
              <span className="text-lg md:text-xl font-bold text-binance-text">CryptoTab</span>
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navLinks.map((link) => (
              isAuthenticated || (!isAuthenticated && (link.path === "/" || link.path === "/faq" || link.path === "/contact" || link.path === "/payouts")) ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`nav-link py-2 text-sm font-medium ${
                    location.pathname === link.path ? "active" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ) : null
            ))}
          </div>

          {/* User menu (desktop) */}
          <div className="hidden md:flex md:items-center">
            {isAuthenticated ? (
              <div className="relative ml-4">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-sm px-4 py-2 rounded-full bg-binance-light hover:bg-binance-lightest transition-colors duration-150"
                  onClick={toggleUserMenu}
                >
                  <span className="font-medium text-binance-text truncate max-w-[150px]">
                    {email}
                  </span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${userMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-binance-darker border border-binance-light/10 focus:outline-none z-10">
                    <Link 
                      to="/settings"
                      className="block w-full text-left px-4 py-2 text-sm text-binance-text hover:bg-binance-light/10"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-binance-text hover:bg-binance-light/10"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/">
                <Button className="btn-bitcoin">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-binance-text hover:text-bitcoin focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div id="mobile-menu-container" className="md:hidden bg-binance-darker border-t border-binance-light/10 animate-slide-in-bottom">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              isAuthenticated || (!isAuthenticated && (link.path === "/" || link.path === "/faq" || link.path === "/contact" || link.path === "/payouts")) ? (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    location.pathname === link.path 
                      ? "text-bitcoin bg-binance-light/10" 
                      : "text-binance-text hover:text-bitcoin hover:bg-binance-light/5"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ) : null
            ))}
            {isAuthenticated && (
              <>
                <Link
                  to="/settings"
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-binance-text hover:text-bitcoin hover:bg-binance-light/5"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-binance-text hover:text-bitcoin hover:bg-binance-light/5"
                >
                  Sign out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
