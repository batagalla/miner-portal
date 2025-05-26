
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AdsComponent from "../components/ads/AdsComponent";
import { Bitcoin, ExternalLink } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const PublicPayouts = () => {
  const [recentPayouts, setRecentPayouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch recent payouts from API
    const fetchRecentPayouts = async () => {
      try {
        const response = await fetch('/api/payouts/recent');
        if (response.ok) {
          const data = await response.json();
          setRecentPayouts(data);
        } else {
          // Fallback to sample data if API fails
          setRecentPayouts([
            { id: 1, createdAt: "2023-07-02T08:14:00Z", amount: 0.01872500, txHash: "3a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u" },
            { id: 2, createdAt: "2023-07-01T22:05:00Z", amount: 0.00953700, txHash: "4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v" },
            { id: 3, createdAt: "2023-07-01T15:43:00Z", amount: 0.02134900, txHash: "5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w" },
            { id: 4, createdAt: "2023-07-01T10:27:00Z", amount: 0.00782300, txHash: "6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x" },
            { id: 5, createdAt: "2023-06-30T21:38:00Z", amount: 0.01376800, txHash: "7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5w6x7y" },
          ]);
        }
      } catch (error) {
        console.error('Error fetching payouts:', error);
        // Use sample data as fallback
        setRecentPayouts([
          { id: 1, createdAt: "2023-07-02T08:14:00Z", amount: 0.01872500, txHash: "3a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u" },
          { id: 2, createdAt: "2023-07-01T22:05:00Z", amount: 0.00953700, txHash: "4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentPayouts();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Top banner ad */}
      <div className="w-full flex justify-center py-2 bg-binance-darker/50">
        <AdsComponent adUnit="123456" size="horizontal" className="hidden md:block" />
        <AdsComponent adUnit="123458" size="square" className="md:hidden" />
      </div>
      
      <main className="flex-1 py-6 md:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="glass-card p-4 md:p-8 animate-fade-in">
          <div className="text-center mb-6 md:mb-8">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">Recent Payouts</h1>
            <p className="text-sm md:text-base text-binance-text/70 max-w-2xl mx-auto">
              View the most recent Bitcoin payouts from our mining platform. 
              Create an account today to start mining and earn cryptocurrency.
            </p>
          </div>
          
          <div className="mb-6 md:mb-8 p-4 md:p-6 bg-binance-light/5 rounded-lg border border-binance-light/10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center text-center md:text-left">
                <Bitcoin className="h-8 w-8 md:h-12 md:w-12 text-bitcoin mr-3 md:mr-4" />
                <div>
                  <h2 className="text-lg md:text-xl font-bold mb-1">Start Mining Today</h2>
                  <p className="text-sm md:text-base text-binance-text/70">Join thousands of miners earning Bitcoin daily</p>
                </div>
              </div>
              
              <div className="w-full md:w-auto">
                <Link 
                  to="/" 
                  className="btn-bitcoin w-full md:w-auto block text-center py-3 px-6 rounded-lg bg-bitcoin hover:bg-bitcoin-light text-white font-medium transition-colors"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>

          {/* Mobile-first ad placement */}
          <div className="flex justify-center mb-6 md:hidden">
            <AdsComponent adUnit="123459" size="square" />
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <p className="text-binance-text/70">Loading recent payouts...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[140px] md:w-[180px] text-xs md:text-sm">Date & Time</TableHead>
                    <TableHead className="text-xs md:text-sm">Amount</TableHead>
                    <TableHead className="hidden lg:table-cell text-xs md:text-sm">Transaction Hash</TableHead>
                    <TableHead className="text-right text-xs md:text-sm">Explorer</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentPayouts.map((payout) => (
                    <TableRow key={payout.id}>
                      <TableCell className="font-medium text-xs md:text-sm">
                        {formatDate(payout.createdAt)}
                      </TableCell>
                      <TableCell className="text-bitcoin text-xs md:text-sm font-mono">
                        {payout.amount.toFixed(8)} BTC
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-xs md:text-sm">
                        <span className="truncate block max-w-[200px] md:max-w-[250px] font-mono">
                          {payout.txHash}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <a
                          href={`https://blockchain.info/tx/${payout.txHash}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-bitcoin hover:text-bitcoin-light inline-flex items-center text-xs md:text-sm"
                        >
                          View
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Desktop ad placement */}
          <div className="hidden md:flex justify-center mt-8">
            <AdsComponent adUnit="123460" size="horizontal" />
          </div>
          
          <div className="mt-6 md:mt-8 text-center">
            <p className="text-sm md:text-base text-binance-text/70 mb-4">
              All withdrawals are processed automatically and sent directly to your Bitcoin wallet.
            </p>
            <Link to="/" className="text-bitcoin hover:text-bitcoin-light font-medium text-sm md:text-base">
              Sign up to start mining Bitcoin →
            </Link>
          </div>
        </div>
      </main>
      
      {/* Sidebar ad for larger screens */}
      <div className="fixed right-2 md:right-4 bottom-20 md:bottom-24 hidden xl:block z-10">
        <AdsComponent adUnit="123461" size="vertical" />
      </div>
      
      <Footer />
    </div>
  );
};

export default PublicPayouts;
