
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  RefreshCw, 
  Users2, 
  Settings, 
  LifeBuoy, 
  ChevronLeft, 
  ChevronRight, 
  Menu 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
  activePage: string;
  onNavigate: (value: string) => void;
}

const AdminSidebar = ({ activePage, onNavigate }: AdminSidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigateAndCloseMobile = (page: string) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  const navItems = [
    { name: 'Overview', value: 'overview', icon: LayoutDashboard },
    { name: 'Users', value: 'users', icon: Users },
    { name: 'Transactions', value: 'transactions', icon: Wallet },
    { name: 'Mining Activity', value: 'mining', icon: RefreshCw },
    { name: 'Affiliate Program', value: 'affiliate', icon: Users2 }
  ];

  const sidebarContent = (
    <>
      <div className="flex items-center h-14 px-4 border-b border-binance-light/10">
        <Link to="/admin/dashboard" className="flex items-center">
          <img
            src="/bitcoin-logo.svg"
            alt="Logo"
            className="h-8 w-8 mr-2"
          />
          {!collapsed && <span className="font-bold text-lg text-bitcoin">BitMiner</span>}
        </Link>
      </div>
      
      <ScrollArea className="flex-1 px-3 py-2">
        <div className="space-y-1">
          {navItems.map((item) => (
            <Button
              key={item.value}
              variant={activePage === item.value ? "secondary" : "ghost"}
              size="sm"
              className={cn(
                "w-full justify-start gap-x-3 my-1",
                activePage === item.value ? "bg-binance-light/20" : "hover:bg-binance-light/10"
              )}
              onClick={() => navigateAndCloseMobile(item.value)}
            >
              <item.icon className={cn("h-4 w-4", activePage === item.value ? "text-bitcoin" : "")} />
              {!collapsed && <span>{item.name}</span>}
            </Button>
          ))}
        </div>
        
        <div className="mt-6 space-y-1">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-x-3 my-1"
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span>Admin Settings</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start gap-x-3 my-1"
          >
            <LifeBuoy className="h-4 w-4" />
            {!collapsed && <span>Help & Documentation</span>}
          </Button>
        </div>
      </ScrollArea>
      
      <div className="h-14 border-t border-binance-light/10 p-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-full justify-center"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col bg-binance-dark border-r border-binance-light/10 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        {sidebarContent}
      </aside>
      
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="bg-binance-dark"
        >
          <Menu className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Mobile sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="relative flex flex-col w-64 max-w-xs bg-binance-dark">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  );
};

export default AdminSidebar;
