
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import FaqList from "../components/faq/FaqList";
import AdsComponent from "../components/ads/AdsComponent";
import { HelpCircle } from "lucide-react";

const Faq = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 max-w-screen-xl mx-auto w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 bg-binance-light/10 rounded-full mb-4">
            <HelpCircle className="h-8 w-8 text-bitcoin" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-binance-text/70 max-w-2xl mx-auto">
            Find answers to the most common questions about Bitcoin mining, our platform,
            and how to maximize your earnings.
          </p>
        </div>
        
        <div className="glass-card p-6 max-w-5xl mx-auto">
          <FaqList />
        </div>

        {/* Ad placement after FAQ */}
        <div className="mt-8 flex justify-center">
          <AdsComponent adUnit="123467" size="horizontal" className="hidden md:block" />
          <AdsComponent adUnit="123468" size="square" className="md:hidden" />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faq;
