
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../App";
import { Button } from "@/components/ui/button";
import { Bitcoin, Menu, X, User, LogOut, Settings, Wallet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Navbar = () => {
  const { isAuthenticated, logout, email } = useContext(AuthContext);
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => location.pathname === path;

  const navigationLinks = [
    { href: "/dashboard", label: "Dashboard", authRequired: true },
    { href: "/affiliate", label: "Affiliate", authRequired: true },
    { href: "/payouts", label: "Payouts", authRequired: false },
    { href: "/faq", label: "FAQ", authRequired: false },
    { href: "/contact", label: "Contact", authRequired: false },
  ];

  const visibleLinks = navigationLinks.filter(link => 
    !link.authRequired || (link.authRequired && isAuthenticated)
  );

  return (
    <nav className="bg-binance-dark border-b border-binance-light/10 sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16">
          {/* Logo */}
          <Link 
            to={isAuthenticated ? "/dashboard" : "/"} 
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
          >
            <Bitcoin className="h-6 w-6 md:h-8 md:w-8 text-bitcoin" />
            <span className="text-lg md:text-xl font-bold text-binance-text">
              BitMiner
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {visibleLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-binance-light/20 text-bitcoin"
                    : "text-binance-text hover:text-bitcoin hover:bg-binance-light/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-3">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 h-9">
                    <User className="h-4 w-4" />
                    <span className="text-sm truncate max-w-24 lg:max-w-32">
                      {email}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="flex items-center">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/payouts" className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      Payouts
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="sm" className="bg-bitcoin hover:bg-bitcoin-light">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="p-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-binance-dark border-binance-light/10">
                <SheetHeader className="text-left">
                  <SheetTitle className="flex items-center space-x-2">
                    <Bitcoin className="h-6 w-6 text-bitcoin" />
                    <span className="text-binance-text">BitMiner</span>
                  </SheetTitle>
                  {isAuthenticated && (
                    <SheetDescription className="text-binance-text/70">
                      {email}
                    </SheetDescription>
                  )}
                </SheetHeader>

                <div className="mt-6 space-y-2">
                  {visibleLinks.map((link) => (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                        isActive(link.href)
                          ? "bg-binance-light/20 text-bitcoin"
                          : "text-binance-text hover:text-bitcoin hover:bg-binance-light/10"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}

                  {isAuthenticated && (
                    <>
                      <div className="border-t border-binance-light/10 my-4"></div>
                      <Link
                        to="/settings"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center px-4 py-3 text-sm text-binance-text hover:text-bitcoin hover:bg-binance-light/10 rounded-md"
                      >
                        <Settings className="mr-3 h-4 w-4" />
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-3 text-sm text-red-500 hover:bg-red-500/10 rounded-md"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        Logout
                      </button>
                    </>
                  )}

                  {!isAuthenticated && (
                    <>
                      <div className="border-t border-binance-light/10 my-4"></div>
                      <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                        <Button variant="ghost" className="w-full justify-start">
                          Login
                        </Button>
                      </Link>
                      <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                        <Button className="w-full bg-bitcoin hover:bg-bitcoin-light">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
