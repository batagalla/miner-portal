
import { useState } from "react";
import MiningControls from "./MiningControls";
import BalanceCard from "./BalanceCard";
import StatsCards from "./StatsCards";
import AdsComponent from "../ads/AdsComponent";
import { useBitcoinPrice } from "../../hooks/useBitcoinPrice";
import { Button } from "@/components/ui/button";
import { Copy, Share2, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

// Generate sample data for the charts with real price integration
const generateChartData = (currentPrice: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = 30; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Generate prices around the current price with some variation
    const variation = (Math.random() - 0.5) * 5000;
    const price = i === 0 ? currentPrice : currentPrice + variation;
    
    data.push({
      date: date.toISOString().substring(0, 10),
      earning: 0.001 + Math.random() * 0.01,
      price: Math.max(price, 30000), // Ensure minimum realistic price
    });
  }
  
  return data;
};

const Dashboard = () => {
  const [miningSpeed, setMiningSpeed] = useState(50);
  const [isMining, setIsMining] = useState(true);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const { toast } = useToast();
  const { priceData, loading: priceLoading } = useBitcoinPrice();

  const chartData = generateChartData(priceData.price);

  const handleMiningSpeedChange = (speed: number) => {
    setMiningSpeed(speed);
  };

  const handleMiningToggle = (isActive: boolean) => {
    setIsMining(isActive);
  };

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

  return (
    <div className="max-w-7xl mx-auto animate-fade-in p-4 md:p-6">
      {/* Top ad banner for mobile */}
      <div className="md:hidden mb-6 flex justify-center">
        <AdsComponent adUnit="123470" size="square" />
      </div>

      <MiningControls 
        onMiningSpeedChange={handleMiningSpeedChange} 
        onMiningToggle={handleMiningToggle}
      />
      
      <BalanceCard 
        miningSpeed={miningSpeed} 
        isMining={isMining}
        isBoostActive={isBoostActive}
      />
      
      <StatsCards 
        miningSpeed={miningSpeed} 
        isMining={isMining}
        isBoostActive={isBoostActive}
      />
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="glass-card p-4 md:p-6 xl:col-span-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
            <h3 className="text-lg md:text-xl font-bold text-binance-text">BTC / USD</h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-4 text-sm">
              <div className="flex items-center">
                <span className="text-lg md:text-xl font-bold text-bitcoin">
                  ${priceData.price.toLocaleString()}
                </span>
                {!priceLoading && (
                  <div className={`flex items-center ml-2 ${priceData.changePercent24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {priceData.changePercent24h >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs md:text-sm">
                      {priceData.changePercent24h >= 0 ? '+' : ''}{priceData.changePercent24h.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
              {priceLoading && (
                <div className="text-xs text-binance-text/60">Loading...</div>
              )}
            </div>
          </div>
          <div className="h-48 md:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorEarning" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F7931A" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#F7931A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  stroke="#555" 
                  tick={{ fill: "#888", fontSize: 12 }} 
                  tickLine={{ stroke: "#555" }}
                  axisLine={{ stroke: "#444" }}
                  tickFormatter={(value) => value.substring(5)}
                />
                <YAxis 
                  stroke="#555" 
                  tick={{ fill: "#888", fontSize: 12 }} 
                  tickLine={{ stroke: "#555" }}
                  axisLine={{ stroke: "#444" }}
                  domain={['dataMin - 1000', 'dataMax + 1000']}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <CartesianGrid stroke="#333" strokeDasharray="3 3" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#1E2329", 
                    borderColor: "#444",
                    color: "#eee",
                    fontSize: "12px"
                  }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
                />
                <Area 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#F7931A" 
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorEarning)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-4 md:p-6 xl:col-span-1">
          <h3 className="text-lg md:text-xl font-bold text-binance-text mb-4">Referral Program</h3>
          <p className="text-sm md:text-base text-binance-text/80 mb-4 md:mb-6">
            Subscribe to get more bitcoins and grow your mining network. Invite new users and get 15% of their mining.
          </p>
          
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-bitcoin mb-1">15%</div>
                <div className="text-xs md:text-sm text-binance-text/70">from friends' mining</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-bitcoin mb-1">10%</div>
                <div className="text-xs md:text-sm text-binance-text/70">from referrals' mining</div>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs md:text-sm text-binance-text/70">Link ID</span>
              <span className="text-xs md:text-sm text-binance-text/70">Landing ID</span>
            </div>
            <div className="bg-binance-light/30 rounded px-3 py-2 text-xs md:text-sm text-binance-text/90 mb-2 truncate">
              https://get.cryptobrowser.site/1796233
            </div>
            
            <div className="flex space-x-2">
              <Button 
                onClick={handleCopyLink}
                className="flex-1 bg-bitcoin hover:bg-bitcoin-light text-white text-xs md:text-sm py-2"
                size="sm"
              >
                <Copy className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Copy
              </Button>
              <Button 
                onClick={handleShareLink}
                className="flex-1 bg-transparent border border-binance-light text-binance-text hover:bg-binance-light/10 text-xs md:text-sm py-2"
                size="sm"
              >
                <Share2 className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />
                Share
              </Button>
            </div>
          </div>
          
          <div className="mt-4 md:mt-6">
            <h4 className="text-sm md:text-lg font-medium text-binance-text mb-2">Social sharing</h4>
            <div className="flex justify-center space-x-3 md:space-x-4">
              {[
                { color: "#3b5998", path: "M9.19795 21.5H13.198V13.4901H16.8021L17.198 9.50977H13.198V7.5C13.198 6.94772 13.6457 6.5 14.198 6.5H17.198V2.5H14.198C11.4365 2.5 9.19795 4.73858 9.19795 7.5V9.50977H7.19795L6.80206 13.4901H9.19795V21.5Z" },
                { color: "#0088cc", path: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.64 8.8 16.33 11.31 15.23 11.97C15.23 11.97 15.37 10.7 14.65 10.21C13.93 9.72 12.99 10.61 12.42 11.4C12.42 11.4 12.23 8.91 8.92 10.73C5.61 12.55 7.7 17.59 7.7 17.59C7.7 17.59 6.6 11.94 8.88 10.12C8.88 10.12 10.01 9.72 10.01 11.4V15.13C10.01 15.13 9.32 14.84 9 15.13C8.68 15.42 8.92 17.59 8.92 17.59C8.92 17.59 7.02 14.03 10.01 12.88C10.01 12.88 10.01 15.13 10.8 15.13C11.58 15.13 12.99 15.13 12.99 15.13C12.99 15.13 15.11 15.14 16.64 8.8Z" },
                { color: "#E1306C", path: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" },
                { color: "#1DA1F2", path: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" }
              ].map((social, index) => (
                <a 
                  key={index}
                  href="#" 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-colors`}
                  style={{ 
                    backgroundColor: `${social.color}10`,
                    color: social.color
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = `${social.color}20`}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = `${social.color}10`}
                >
                  <svg className="h-4 w-4 md:h-5 md:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom ads */}
      <div className="flex justify-center mb-6">
        <AdsComponent adUnit="123471" size="horizontal" className="hidden md:block" />
        <AdsComponent adUnit="123472" size="square" className="md:hidden" />
      </div>
    </div>
  );
};

export default Dashboard;
