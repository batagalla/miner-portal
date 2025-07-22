
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Copy, Share2, Users, Award, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AdsComponent from "../components/ads/AdsComponent";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AffiliateProgram = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { toast } = useToast();
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://get.cryptobrowser.site/1796233");
    toast({
      title: "Link copied",
      description: "Referral link copied to clipboard.",
    });
  };

  const handleShareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join CryptoTab",
        text: "Mine Bitcoin directly in your browser!",
        url: "https://get.cryptobrowser.site/1796233",
      });
    } else {
      toast({
        title: "Share not supported",
        description: "Your browser doesn't support native sharing.",
      });
    }
  };
  
  // Sample referral data
  const referrals = [
    { id: 1, name: "User1234", level: "Level 1", status: "Active", earnings: "0.00124500 BTC" },
    { id: 2, name: "BitcoinFan", level: "Level 1", status: "Active", earnings: "0.00089700 BTC" },
    { id: 3, name: "CryptoMiner", level: "Level 1", status: "Inactive", earnings: "0.00052100 BTC" },
    { id: 4, name: "BlockchainUser", level: "Level 2", status: "Active", earnings: "0.00034800 BTC" },
    { id: 5, name: "SatoshiFan", level: "Level 2", status: "Active", earnings: "0.00027500 BTC" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Affiliate Program</h1>
          <p className="text-binance-text/80">
            Invite friends to join CryptoTab and earn a percentage of their mining revenue.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <div className="glass-card p-6 mb-6">
              <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
              <div className="bg-binance-light/30 rounded px-3 py-2 text-binance-text/90 mb-4 truncate">
                https://get.cryptobrowser.site/1796233
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  onClick={handleCopyLink}
                  className="flex-1 bg-bitcoin hover:bg-bitcoin-light text-white"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </Button>
                <Button 
                  onClick={handleShareLink}
                  className="flex-1 bg-transparent border border-binance-light text-binance-text hover:bg-binance-light/10"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-xl font-bold mb-4">Earnings Overview</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-binance-light/20 rounded-lg p-4">
                  <div className="text-sm text-binance-text/70 mb-1">Total Referrals</div>
                  <div className="text-2xl font-bold">157</div>
                </div>
                <div className="bg-binance-light/20 rounded-lg p-4">
                  <div className="text-sm text-binance-text/70 mb-1">Active Miners</div>
                  <div className="text-2xl font-bold">32</div>
                </div>
                <div className="bg-binance-light/20 rounded-lg p-4">
                  <div className="text-sm text-binance-text/70 mb-1">Total Affiliate Earnings</div>
                  <div className="text-2xl font-bold text-bitcoin">0.30729140 BTC</div>
                </div>
                <div className="bg-binance-light/20 rounded-lg p-4">
                  <div className="text-sm text-binance-text/70 mb-1">This Month</div>
                  <div className="text-2xl font-bold text-bitcoin">0.05231642 BTC</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-6">
            <h2 className="text-xl font-bold mb-4">Affiliate Rewards</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Users className="h-6 w-6 text-bitcoin" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Level 1 (Direct referrals)</h3>
                  <p className="text-binance-text/70 text-sm">
                    Earn 15% of the Bitcoin mined by people who joined using your referral link.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Award className="h-6 w-6 text-bitcoin" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Level 2 (Indirect referrals)</h3>
                  <p className="text-binance-text/70 text-sm">
                    Earn 10% of the Bitcoin mined by people who joined using your referrals' links.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-1">
                  <Gift className="h-6 w-6 text-bitcoin" />
                </div>
                <div>
                  <h3 className="font-bold mb-1">Bonuses</h3>
                  <p className="text-binance-text/70 text-sm">
                    Special bonuses for high-performing affiliates who bring 100+ active users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ad placement after rewards section */}
        <div className="mb-8 flex justify-center">
          <AdsComponent adUnit="123469" size="horizontal" className="hidden md:block" />
          <AdsComponent adUnit="123470" size="square" className="md:hidden" />
        </div>
        
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold mb-6">Recent Referrals</h2>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-binance-text">User</TableHead>
                  <TableHead className="text-binance-text">Level</TableHead>
                  <TableHead className="text-binance-text">Status</TableHead>
                  <TableHead className="text-binance-text text-right">Earnings</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referrals.map((referral) => (
                  <TableRow key={referral.id}>
                    <TableCell className="font-medium">{referral.name}</TableCell>
                    <TableCell>{referral.level}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        referral.status === "Active" 
                          ? "bg-green-100/10 text-green-500" 
                          : "bg-yellow-100/10 text-yellow-500"
                      }`}>
                        {referral.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-bitcoin">{referral.earnings}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">Affiliate Marketing Materials</h2>
          <p className="text-binance-text/80 mb-6">
            Use these promotional materials to maximize your referral success. We've created high-quality banners
            and text ads that you can place on your website, social media, or other channels.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-binance-light/20 rounded-lg p-4">
              <div className="aspect-[16/3] bg-binance-light/30 rounded-md mb-3 flex items-center justify-center">
                <span className="text-sm text-binance-text/60">728×90 Banner</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-binance-text/70">banner-728x90.png</span>
                <button className="text-bitcoin text-sm">Download</button>
              </div>
            </div>
            
            <div className="border border-binance-light/20 rounded-lg p-4">
              <div className="aspect-[3/4] bg-binance-light/30 rounded-md mb-3 flex items-center justify-center">
                <span className="text-sm text-binance-text/60">300×600 Banner</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-binance-text/70">banner-300x600.png</span>
                <button className="text-bitcoin text-sm">Download</button>
              </div>
            </div>
          </div>
        </div>

        {/* Ad placement before FAQ section */}
        <div className="mb-8 flex justify-center">
          <AdsComponent adUnit="123471" size="horizontal" className="hidden md:block" />
          <AdsComponent adUnit="123472" size="square" className="md:hidden" />
        </div>
        
        <div className="bg-binance-darker border border-binance-light/10 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Affiliate Program FAQs</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-bold mb-1">How do I earn from the affiliate program?</h3>
              <p className="text-binance-text/70">
                You earn a percentage of the Bitcoin mined by users who join through your referral link.
                The earnings are automatically added to your CryptoTab balance.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-1">When will I receive my affiliate earnings?</h3>
              <p className="text-binance-text/70">
                Affiliate earnings are calculated and added to your balance in real-time. You can withdraw them
                together with your mining earnings once you reach the minimum withdrawal threshold.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-1">Is there a limit to how many people I can refer?</h3>
              <p className="text-binance-text/70">
                No, there is no limit to the number of people you can refer. The more active miners you refer,
                the more Bitcoin you'll earn through the affiliate program.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AffiliateProgram;
