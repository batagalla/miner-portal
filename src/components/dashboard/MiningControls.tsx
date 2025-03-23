
import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { InfoCircle, Zap } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MiningControlsProps {
  onMiningSpeedChange: (speed: number) => void;
  onMiningToggle: (isActive: boolean) => void;
}

const MiningControls = ({ onMiningSpeedChange, onMiningToggle }: MiningControlsProps) => {
  const [miningSpeed, setMiningSpeed] = useState(50);
  const [isMining, setIsMining] = useState(true);
  const [isBoostActive, setIsBoostActive] = useState(false);
  const { toast } = useToast();

  // Initialize mining on component mount
  useEffect(() => {
    // Call the prop functions with initial values
    onMiningSpeedChange(miningSpeed);
    onMiningToggle(isMining);
  }, []);

  const handleSpeedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSpeed = parseInt(e.target.value);
    setMiningSpeed(newSpeed);
    onMiningSpeedChange(newSpeed);
    
    // Show toast for significant mining speed changes
    if (newSpeed === 100) {
      toast({
        title: "Maximum mining speed",
        description: "Your browser is now mining at maximum capacity.",
      });
    }
  };

  const handleMiningToggle = (checked: boolean) => {
    setIsMining(checked);
    onMiningToggle(checked);
    
    toast({
      title: checked ? "Mining started" : "Mining paused",
      description: checked 
        ? "Your browser is now mining Bitcoin." 
        : "Mining has been paused. Resume anytime.",
    });
  };

  const toggleBoost = () => {
    const newBoostState = !isBoostActive;
    setIsBoostActive(newBoostState);
    
    if (newBoostState) {
      toast({
        title: "Cloud Boost activated",
        description: "Mining speed increased by 10x for 1 hour.",
      });
    } else {
      toast({
        title: "Cloud Boost deactivated",
        description: "Mining speed returned to normal.",
      });
    }
  };

  return (
    <div className="glass-card p-4 md:p-6 mb-8 animate-fade-in">
      <div className="flex flex-col md:flex-row items-center justify-between mb-4">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="w-10 h-10 flex items-center justify-center bg-bitcoin rounded-full mr-2">
            <Zap className="h-5 w-5 text-white" />
          </div>
          <h3 className="text-xl font-bold text-binance-text">Mining Speed</h3>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center space-x-2">
            <Switch
              checked={isMining}
              onCheckedChange={handleMiningToggle}
              id="mining-toggle"
            />
            <label 
              htmlFor="mining-toggle" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {isMining ? "Mining Active" : "Mining Paused"}
            </label>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2 cursor-pointer" onClick={toggleBoost}>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isBoostActive ? 'bg-bitcoin' : 'bg-binance-light'}`}>
                    <Zap className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-sm font-medium text-binance-text">Cloud Boost X10</span>
                  <InfoCircle className="h-4 w-4 text-binance-text/60" />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Increase your mining speed by 10x for 1 hour</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <span className="text-sm text-binance-text/80">OFF</span>
        
        <div className="w-full">
          <input
            type="range"
            min="0"
            max="100"
            value={miningSpeed}
            onChange={handleSpeedChange}
            className="mining-slider"
          />
        </div>
        
        <span className="text-sm text-binance-text/80">MAX</span>
      </div>
      
      <div className="mt-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full ${isMining ? 'bg-green-500 animate-pulse-subtle' : 'bg-red-500'} mr-2`}></div>
            <span className="text-xl font-bold flex items-center">
              <span className="text-bitcoin">{(26597.08 * (miningSpeed / 100) * (isBoostActive ? 10 : 1)).toFixed(8)}</span>
              <span className="ml-2 text-binance-text text-sm font-normal">H/s</span>
            </span>
          </div>
          
          <div className="flex items-center">
            <span className="text-binance-text text-sm mr-2">Mining Network:</span>
            <span className="text-bitcoin font-bold">9751</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiningControls;
