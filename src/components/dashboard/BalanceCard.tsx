
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bitcoin, ArrowDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BalanceCardProps {
  miningSpeed: number;
  isMining: boolean;
  isBoostActive?: boolean;
}

const BalanceCard = ({ miningSpeed, isMining, isBoostActive = false }: BalanceCardProps) => {
  const [balance, setBalance] = useState(0.729012034659);
  const [usdRate, setUsdRate] = useState(37415.67);
  const [showNotification, setShowNotification] = useState(false);
  const { toast } = useToast();

  // Simulate balance increasing over time based on mining speed
  useEffect(() => {
    if (!isMining) return;
    
    const interval = setInterval(() => {
      const baseIncrement = 0.00000001;
      const speedMultiplier = miningSpeed / 100;
      const boostMultiplier = isBoostActive ? 10 : 1;
      const increment = baseIncrement * speedMultiplier * boostMultiplier;
      
      setBalance(prevBalance => {
        const newBalance = prevBalance + increment;
        return parseFloat(newBalance.toFixed(12));
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [miningSpeed, isMining, isBoostActive]);

  // Simulate BTC/USD rate fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = Math.random() * 100 - 50; // Random value between -50 and 50
      setUsdRate(prevRate => {
        const newRate = prevRate + fluctuation;
        return parseFloat(newRate.toFixed(2));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleWithdraw = () => {
    if (balance < 0.001) {
      toast({
        title: "Withdrawal failed",
        description: "Minimum withdrawal amount is 0.001 BTC.",
        variant: "destructive",
      });
      return;
    }
    
    setShowNotification(true);
    toast({
      title: "Withdrawal requested",
      description: "Your withdrawal request has been submitted.",
    });
    
    // Hide notification after 5 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 5000);
  };

  return (
    <div className="glass-card p-4 md:p-6 mb-6 animate-fade-in">
      <h3 className="text-lg font-medium text-binance-text/80 uppercase tracking-wider mb-4">CryptoTab Balance</h3>
      
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-bitcoin rounded-full flex items-center justify-center mr-4 animate-float">
          <Bitcoin className="h-6 w-6 text-white" />
        </div>
        
        <div className="flex flex-col md:flex-row items-baseline">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            <span className="text-bitcoin">{balance.toString().split('.')[0]}</span>
            <span className="text-binance-text">.{balance.toString().split('.')[1].substring(0, 8)}</span>
            <span className="text-binance-text/40">{balance.toString().split('.')[1].substring(8)}</span>
          </h2>
          <span className="text-3xl ml-2 text-binance-text">BTC</span>
        </div>
      </div>
      
      <div className="text-binance-text/70 mb-6">
        Approx. USD $ {(balance * usdRate).toFixed(2)}
      </div>
      
      <div className="flex flex-wrap gap-2">
        {showNotification && (
          <div className="flex items-center bg-binance-light/40 text-sm rounded-full px-3 py-1 text-binance-text/90 mb-4 animate-fade-in">
            <ArrowDown className="h-3 w-3 mr-1 text-bitcoin" />
            <span>0.01253600 BTC</span>
            <span className="mx-1">-</span>
            <span className="text-binance-text/70">Withdrawal Requested</span>
            <button className="ml-2 text-binance-text/50 hover:text-binance-text">
              ×
            </button>
          </div>
        )}
        
        <Button
          onClick={handleWithdraw}
          className="btn-bitcoin"
        >
          Withdraw
        </Button>
        
        <Button
          variant="outline"
          className="btn-outline"
        >
          Transfer to Mobile App
        </Button>
      </div>
    </div>
  );
};

export default BalanceCard;
