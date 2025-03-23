
import { useEffect, useState } from "react";
import { Circle } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

interface StatsCardsProps {
  miningSpeed: number;
  isMining: boolean;
  isBoostActive?: boolean;
}

const StatsCards = ({ miningSpeed, isMining, isBoostActive = false }: StatsCardsProps) => {
  const [minedBalance, setMinedBalance] = useState(0.07890135);
  const [affiliateBalance, setAffiliateBalance] = useState(0.30729140);
  const [orangePieBalance, setOrangePieBalance] = useState(0.48352431);
  const [totalEarnings, setTotalEarnings] = useState(0.81352431);
  
  const [minedUsd, setMinedUsd] = useState(2967.14);
  const [affiliateUsd, setAffiliateUsd] = useState(11512.63);
  const [orangePieUsd, setOrangePieUsd] = useState(18151.68);
  const [totalUsd, setTotalUsd] = useState(30487.15);
  
  const [btcUsdRate, setBtcUsdRate] = useState(37415.67);

  // Simulate balance increasing over time based on mining speed
  useEffect(() => {
    if (!isMining) return;
    
    const interval = setInterval(() => {
      const baseIncrement = 0.00000001;
      const speedMultiplier = miningSpeed / 100;
      const boostMultiplier = isBoostActive ? 10 : 1;
      const increment = baseIncrement * speedMultiplier * boostMultiplier;
      
      setMinedBalance(prevBalance => {
        const newBalance = parseFloat((prevBalance + increment).toFixed(8));
        setMinedUsd(parseFloat((newBalance * btcUsdRate).toFixed(2)));
        return newBalance;
      });
      
      // Update total earnings
      setTotalEarnings(prevTotal => {
        const newTotal = minedBalance + affiliateBalance + orangePieBalance + increment;
        setTotalUsd(parseFloat((newTotal * btcUsdRate).toFixed(2)));
        return parseFloat(newTotal.toFixed(8));
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [miningSpeed, isMining, isBoostActive, minedBalance, affiliateBalance, orangePieBalance, btcUsdRate]);

  // Simulate BTC/USD rate fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      const fluctuation = Math.random() * 100 - 50; // Random value between -50 and 50
      setBtcUsdRate(prevRate => {
        const newRate = prevRate + fluctuation;
        
        // Update USD values
        setMinedUsd(parseFloat((minedBalance * newRate).toFixed(2)));
        setAffiliateUsd(parseFloat((affiliateBalance * newRate).toFixed(2)));
        setOrangePieUsd(parseFloat((orangePieBalance * newRate).toFixed(2)));
        setTotalUsd(parseFloat((totalEarnings * newRate).toFixed(2)));
        
        return parseFloat(newRate.toFixed(2));
      });
    }, 5000);
    
    return () => clearInterval(interval);
  }, [minedBalance, affiliateBalance, orangePieBalance, totalEarnings]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <Card className="bg-binance-darker border-binance-light/10 text-binance-text animate-slide-in-bottom" style={{ animationDelay: "0ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium uppercase text-binance-text/70">Mined</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{minedBalance.toFixed(8)} BTC</div>
          <CardDescription>USD {minedUsd.toFixed(2)}</CardDescription>
        </CardContent>
      </Card>
      
      <Card className="bg-binance-darker border-binance-light/10 text-binance-text animate-slide-in-bottom" style={{ animationDelay: "100ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium uppercase text-binance-text/70">Affiliate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{affiliateBalance.toFixed(8)} BTC</div>
          <CardDescription>USD {affiliateUsd.toFixed(2)}</CardDescription>
        </CardContent>
      </Card>
      
      <Card className="bg-binance-darker border-binance-light/10 text-binance-text animate-slide-in-bottom" style={{ animationDelay: "200ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium uppercase text-binance-text/70">Orange Pie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{orangePieBalance.toFixed(8)} BTC</div>
          <CardDescription>USD {orangePieUsd.toFixed(2)}</CardDescription>
        </CardContent>
      </Card>
      
      <Card className="bg-binance-darker border-binance-light/10 text-binance-text animate-slide-in-bottom" style={{ animationDelay: "300ms" }}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium uppercase text-binance-text/70">Total Earnings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalEarnings.toFixed(8)} BTC</div>
          <CardDescription>USD {totalUsd.toFixed(2)}</CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
