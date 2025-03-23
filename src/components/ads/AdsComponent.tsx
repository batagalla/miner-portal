
import { useEffect, useRef } from "react";

interface AdsProps {
  adUnit: string;
  size?: "horizontal" | "vertical" | "square";
  className?: string;
}

const AdsComponent = ({ adUnit, size = "horizontal", className = "" }: AdsProps) => {
  const adRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Clean up any existing ad
    if (adRef.current) {
      adRef.current.innerHTML = "";
      
      // Create the script element
      const script = document.createElement("script");
      script.async = true;
      script.type = "application/javascript";
      
      // Set the appropriate ad size
      let width, height;
      switch (size) {
        case "horizontal":
          width = 728;
          height = 90;
          break;
        case "vertical":
          width = 160;
          height = 600;
          break;
        case "square":
          width = 300;
          height = 250;
          break;
        default:
          width = 728;
          height = 90;
      }
      
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
  }, [adUnit, size]);
  
  return (
    <div 
      ref={adRef} 
      className={`ad-container mx-auto my-4 overflow-hidden ${className}`}
      style={{ 
        minHeight: size === "horizontal" ? "90px" : size === "vertical" ? "600px" : "250px",
        minWidth: size === "horizontal" ? "728px" : size === "vertical" ? "160px" : "300px",
        maxWidth: "100%"
      }}
    />
  );
};

export default AdsComponent;
