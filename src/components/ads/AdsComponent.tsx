
import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface AdsProps {
  adUnit: string;
  size?: "horizontal" | "vertical" | "square";
  className?: string;
}

const AdsComponent = ({ adUnit, size = "horizontal", className = "" }: AdsProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Convert size prop to actual dimensions
  const getAdSize = () => {
    // Override size based on mobile if needed
    const effectiveSize = isMobile && size === "horizontal" ? "square" : size;
    
    switch (effectiveSize) {
      case "horizontal":
        return { width: 728, height: 90 };
      case "vertical":
        return { width: 160, height: 600 };
      case "square":
        return { width: 300, height: 250 };
      default:
        return { width: 728, height: 90 };
    }
  };
  
  useEffect(() => {
    // Clean up any existing ad
    if (adRef.current) {
      adRef.current.innerHTML = "";
      
      // Create the script element
      const script = document.createElement("script");
      script.async = true;
      script.type = "application/javascript";
      
      // Get the appropriate ad size
      const { width, height } = getAdSize();
      
      // Set the script source with the appropriate parameters
      script.src = `https://ad.a-ads.com/${adUnit}?size=${width}x${height}`;
      
      // Append the script to the div
      adRef.current.appendChild(script);
    }
    
    // Cleanup function to remove the ad when component unmounts
    return () => {
      if (adRef.current) {
        adRef.current.innerHTML = "";
      }
    };
  }, [adUnit, size, isMobile]);
  
  const { width, height } = getAdSize();
  
  return (
    <div 
      ref={adRef} 
      className={`ad-container mx-auto my-2 md:my-4 overflow-hidden bg-binance-darker border border-binance-light/10 rounded-lg ${className}`}
      style={{ 
        minHeight: `${height}px`,
        minWidth: isMobile ? "auto" : `${width}px`,
        maxWidth: "100%"
      }}
    />
  );
};

export default AdsComponent;
