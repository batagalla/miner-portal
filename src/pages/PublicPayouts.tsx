
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Bitcoin, ExternalLink, RefreshCw, Search } from "lucide-react";
import AdsComponent from "../components/ads/AdsComponent";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Payout {
  id: string;
  date: string;
  amount: string;
  txHash: string;
}

const PublicPayouts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [recentPayouts, setRecentPayouts] = useState<Payout[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const isMobile = useIsMobile();
  
  // Fetch recent payouts (simulated here, would come from API in real app)
  useEffect(() => {
    const fetchPayouts = async () => {
      setIsLoading(true);
      try {
        // This would be an API call in a real app
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const dummyPayouts = [
          { id: "1", date: "2023-07-02 08:14", amount: "0.01872500 BTC", txHash: "3a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u" },
          { id: "2", date: "2023-07-01 22:05", amount: "0.00953700 BTC", txHash: "4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v" },
          { id: "3", date: "2023-07-01 15:43", amount: "0.02134900 BTC", txHash: "5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w" },
          { id: "4", date: "2023-07-01 10:27", amount: "0.00782300 BTC", txHash: "6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x" },
          { id: "5", date: "2023-06-30 21:38", amount: "0.01376800 BTC", txHash: "7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y" },
          { id: "6", date: "2023-06-30 14:19", amount: "0.00693400 BTC", txHash: "8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z" },
          { id: "7", date: "2023-06-30 09:52", amount: "0.01245700 BTC", txHash: "9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a" },
          { id: "8", date: "2023-06-29 19:35", amount: "0.00874600 BTC", txHash: "0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b" },
          { id: "9", date: "2023-06-29 12:43", amount: "0.01562300 BTC", txHash: "1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c" },
          { id: "10", date: "2023-06-29 07:16", amount: "0.00945800 BTC", txHash: "2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y8z9a0b1c2d" }
        ];
        
        setRecentPayouts(dummyPayouts);
      } catch (error) {
        console.error("Error fetching payouts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPayouts();
  }, []);
  
  const filteredPayouts = recentPayouts.filter(payout => {
    return payout.txHash.includes(searchQuery) || 
           payout.amount.includes(searchQuery) ||
           payout.date.includes(searchQuery);
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-6 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-6 flex justify-center overflow-x-auto w-full scrollbar-hide">
          <AdsComponent adUnit="123456" size={isMobile ? "square" : "horizontal"} />
        </div>
        
        <div className="glass-card p-4 md:p-8 animate-fade-in">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Recent Payouts</h1>
            <p className="text-binance-text/70 max-w-2xl mx-auto text-sm md:text-base">
              View the most recent Bitcoin payouts from our mining platform. 
              Create an account today to start mining and earn cryptocurrency.
            </p>
          </div>
          
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-binance-light/5 rounded-lg border border-binance-light/10">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Bitcoin className="h-10 w-10 md:h-12 md:w-12 text-bitcoin mr-4" />
                <div>
                  <h2 className="text-lg md:text-xl font-bold mb-1">Start Mining Today</h2>
                  <p className="text-binance-text/70 text-sm md:text-base">Join thousands of miners earning Bitcoin daily</p>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <Link 
                  to="/register" 
                  className="btn-bitcoin w-full md:w-auto block text-center py-2.5 px-5 md:py-3 md:px-6"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
          
          <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-binance-text/50" />
              <Input
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button 
              variant="outline" 
              size="sm"
              className="w-full sm:w-auto"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-bitcoin"></div>
                <p className="mt-2 text-sm text-binance-text/70">Loading recent transactions...</p>
              </div>
            ) : (
              <div className="rounded-md border border-binance-light/10 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[160px]">Date & Time</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead className="hidden md:table-cell">Transaction Hash</TableHead>
                      <TableHead className="text-right">Explorer</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPayouts.length > 0 ? (
                      filteredPayouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-medium">{payout.date}</TableCell>
                          <TableCell className="text-bitcoin">{payout.amount}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="truncate block max-w-[250px]">{payout.txHash}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <a
                              href={`https://blockchain.info/tx/${payout.txHash}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-bitcoin hover:text-bitcoin-light inline-flex items-center"
                            >
                              View
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </a>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center py-6 text-binance-text/70">
                          No transactions found matching your search.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-binance-text/70 mb-4 text-sm md:text-base">
              All withdrawals are processed automatically and sent directly to your Bitcoin wallet.
            </p>
            <Link to="/register" className="text-bitcoin hover:text-bitcoin-light font-medium">
              Sign up to start mining Bitcoin →
            </Link>
          </div>
        </div>
        
        <div className="mt-6 flex justify-center overflow-x-auto w-full scrollbar-hide">
          <AdsComponent adUnit="123457" size={isMobile ? "square" : "horizontal"} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PublicPayouts;
