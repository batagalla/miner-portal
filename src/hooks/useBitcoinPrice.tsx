import { useState, useEffect } from 'react';

interface BitcoinPriceData {
  price: number;
  change24h: number;
  changePercent24h: number;
  timestamp: number;
}

export const useBitcoinPrice = () => {
  const [priceData, setPriceData] = useState<BitcoinPriceData>({
    price: 42000,
    change24h: 1250,
    changePercent24h: 3.06,
    timestamp: Date.now()
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBitcoinPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true');
        
        if (response.ok) {
          const data = await response.json();
          setPriceData({
            price: data.bitcoin.usd,
            change24h: data.bitcoin.usd_24h_change,
            changePercent24h: data.bitcoin.usd_24h_change,
            timestamp: Date.now()
          });
          setError(null);
        } else {
          throw new Error('Failed to fetch price data');
        }
      } catch (err) {
        console.error('Error fetching Bitcoin price:', err);
        setError('Failed to fetch real-time data');
        // Keep using fallback data
      } finally {
        setLoading(false);
      }
    };

    // Initial fetch
    fetchBitcoinPrice();

    // Set up interval for real-time updates every 30 seconds
    const interval = setInterval(fetchBitcoinPrice, 30000);

    return () => clearInterval(interval);
  }, []);

  return { priceData, loading, error };
};
