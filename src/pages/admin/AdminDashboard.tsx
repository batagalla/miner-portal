
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import AdminUsersTable from "@/components/admin/AdminUsersTable";
import AdminTransactionsTable from "@/components/admin/AdminTransactionsTable";
import AdsComponent from "@/components/ads/AdsComponent";
import { toast } from "@/components/ui/use-toast";
import { LogOut, Loader2 } from "lucide-react";

type AdminStats = {
  userCount: number;
  transactionCount: number;
  pendingTransactions: number;
  totalWithdrawn: number;
};

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminData, setAdminData] = useState<{ name: string; email: string; role: string } | null>(null);
  const [stats, setStats] = useState<AdminStats>({
    userCount: 0,
    transactionCount: 0,
    pendingTransactions: 0,
    totalWithdrawn: 0
  });
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    const adminDataStr = localStorage.getItem("adminData");
    
    if (token && adminDataStr) {
      try {
        setAdminData(JSON.parse(adminDataStr));
        setIsAuthenticated(true);
        fetchDashboardData(token);
      } catch (error) {
        console.error("Error parsing admin data:", error);
        handleLogout();
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const fetchDashboardData = async (token: string) => {
    try {
      const response = await fetch('/api/admin/dashboard', {
        headers: {
          'x-auth-token': token
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setStats(data.stats);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminData");
    setIsAuthenticated(false);
    navigate("/admin/login");
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-binance-darker">
        <Loader2 className="h-12 w-12 animate-spin text-bitcoin mb-4" />
        <p className="text-binance-text">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="flex h-screen bg-binance-darker text-binance-text">
      <AdminSidebar activePage={activeTab} onNavigate={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminNavbar 
          adminName={adminData?.name || "Admin"} 
          adminRole={adminData?.role || "admin"}
          onLogout={handleLogout}
        />
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="transactions">Transactions</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="overview" className="space-y-4">
              <AdminStatsCards stats={stats} />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>
                      Overview of the latest platform activity
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-binance-light bg-opacity-10">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-amber-500">Pending</Badge>
                          <span>New withdrawal request</span>
                        </div>
                        <span className="text-sm text-muted-foreground">2 min ago</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-binance-light bg-opacity-10">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-green-500">Completed</Badge>
                          <span>User verification</span>
                        </div>
                        <span className="text-sm text-muted-foreground">15 min ago</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-binance-light bg-opacity-10">
                        <div className="flex items-center space-x-2">
                          <Badge className="bg-blue-500">New</Badge>
                          <span>User registration</span>
                        </div>
                        <span className="text-sm text-muted-foreground">1 hour ago</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                    <CardDescription>
                      Current status of system components
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span>Database Connection</span>
                        <Badge className="bg-green-500">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Payment Gateway</span>
                        <Badge className="bg-green-500">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Email Service</span>
                        <Badge className="bg-green-500">Online</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Mining Servers</span>
                        <Badge className="bg-green-500">Online</Badge>
                      </div>
                      <Button className="w-full mt-4" variant="outline">
                        View Detailed Status
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="mt-6">
                <AdsComponent adUnit="123460" size="horizontal" />
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <AdminUsersTable />
            </TabsContent>
            
            <TabsContent value="transactions" className="space-y-4">
              <AdminTransactionsTable />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
