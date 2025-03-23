
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faq = () => {
  // FAQ categories and questions
  const faqCategories = [
    {
      id: "general",
      title: "General Questions",
      questions: [
        {
          id: "what-is",
          question: "What is CryptoTab?",
          answer: "CryptoTab is a browser-based Bitcoin mining platform that allows users to mine cryptocurrency directly from their web browser without the need for specialized hardware or technical knowledge. You can earn Bitcoin passively while browsing the web or when your computer is idle."
        },
        {
          id: "how-works",
          question: "How does browser mining work?",
          answer: "Browser mining utilizes your computer's processing power to perform calculations that help validate Bitcoin transactions on the blockchain. When these calculations are completed successfully, you are rewarded with a small amount of Bitcoin. CryptoTab optimizes this process to be efficient and non-intrusive, allowing you to continue using your computer normally while mining in the background."
        },
        {
          id: "is-legal",
          question: "Is browser mining legal?",
          answer: "Yes, browser mining is legal in most countries. It's simply a way to participate in the Bitcoin network using your own computing resources. However, regulations regarding cryptocurrency can vary by country, so we recommend checking your local laws if you have concerns."
        },
        {
          id: "devices",
          question: "Which devices are supported?",
          answer: "CryptoTab works on most modern desktop computers and laptops with Windows, macOS, or Linux operating systems. While mining is possible on mobile devices, the earning rate is significantly lower due to hardware limitations. For optimal results, we recommend using a desktop computer with a good processor."
        }
      ]
    },
    {
      id: "mining",
      title: "Mining & Earnings",
      questions: [
        {
          id: "earning-rate",
          question: "How much can I earn?",
          answer: "Earnings vary based on your computer's processing power, mining settings, and the current Bitcoin exchange rate. Most users earn small amounts daily, which can accumulate over time. To maximize earnings, you can mine consistently, use the Cloud Boost feature, and participate in the affiliate program to earn from referrals."
        },
        {
          id: "speed-control",
          question: "What does the mining speed slider do?",
          answer: "The mining speed slider allows you to control how much of your CPU resources are dedicated to mining. At higher settings, you'll earn more Bitcoin but may notice increased CPU usage and power consumption. Lower settings allow for more efficient browsing but reduce your mining rate. You can adjust this at any time based on your current needs."
        },
        {
          id: "cloud-boost",
          question: "What is Cloud Boost?",
          answer: "Cloud Boost is a premium feature that increases your mining speed by up to 10 times by leveraging additional computational resources from our cloud servers. This allows you to significantly increase your earnings without putting additional strain on your computer. Cloud Boost can be activated for different periods, and the pricing varies accordingly."
        },
        {
          id: "affect-computer",
          question: "Will mining affect my computer's performance?",
          answer: "At lower mining speeds, the impact on your computer's performance should be minimal. At higher settings, you may notice increased CPU usage, fan activity, and power consumption. CryptoTab is designed to be as efficient as possible, but if you experience performance issues, you can always reduce the mining speed or pause mining entirely."
        }
      ]
    },
    {
      id: "payments",
      title: "Payments & Withdrawals",
      questions: [
        {
          id: "min-withdrawal",
          question: "What is the minimum withdrawal amount?",
          answer: "The minimum withdrawal amount is 0.001 BTC. This threshold ensures that transaction fees don't consume a significant portion of your withdrawal."
        },
        {
          id: "withdrawal-time",
          question: "How long do withdrawals take?",
          answer: "Most withdrawals are processed automatically and typically take 1-24 hours to complete, depending on the Bitcoin network congestion. Once processed, the transaction will need to be confirmed on the blockchain, which usually takes between 10 minutes to a few hours."
        },
        {
          id: "withdrawal-fees",
          question: "Are there any withdrawal fees?",
          answer: "Yes, there is a small network fee for processing Bitcoin transactions on the blockchain. This fee varies depending on the network congestion, but we always aim to use optimal fees to ensure fast confirmation while keeping costs low."
        },
        {
          id: "payment-methods",
          question: "What payment methods are supported?",
          answer: "Currently, we only support withdrawals to Bitcoin wallets. You'll need a valid Bitcoin address to withdraw your earnings. We're exploring additional payment methods and may add more options in the future."
        }
      ]
    },
    {
      id: "affiliate",
      title: "Affiliate Program",
      questions: [
        {
          id: "affiliate-program",
          question: "How does the affiliate program work?",
          answer: "Our affiliate program allows you to earn additional Bitcoin by inviting others to join CryptoTab. You'll receive 15% of the Bitcoin mined by your direct referrals (Level 1) and 10% from their referrals (Level 2). These earnings are automatically added to your balance and can be withdrawn together with your mining earnings."
        },
        {
          id: "referral-link",
          question: "How do I get my referral link?",
          answer: "Your unique referral link can be found in the Dashboard or Affiliate Program section once you've created an account. You can copy this link and share it through social media, email, or any other channel to invite others to join CryptoTab."
        },
        {
          id: "referral-track",
          question: "How can I track my referrals?",
          answer: "You can view detailed information about your referrals in the Affiliate Program section of your account. This includes the number of active miners, their mining activity, and your earnings from each level of referrals."
        },
        {
          id: "referral-limit",
          question: "Is there a limit to how many people I can refer?",
          answer: "No, there is no limit to the number of people you can refer. The more active miners you bring in, the more Bitcoin you can earn through the affiliate program."
        }
      ]
    },
    {
      id: "security",
      title: "Security & Privacy",
      questions: [
        {
          id: "data-security",
          question: "Is my data secure?",
          answer: "Yes, we take data security very seriously. We use industry-standard encryption and security practices to protect your personal information and earnings. Your Bitcoin wallet address and withdrawal information are also encrypted and securely stored."
        },
        {
          id: "account-security",
          question: "How can I secure my account?",
          answer: "We recommend using a strong, unique password for your CryptoTab account and enabling two-factor authentication if available. Never share your login credentials with others, and be cautious of phishing attempts. Always access CryptoTab through the official website or app."
        },
        {
          id: "mining-safe",
          question: "Is mining safe for my computer?",
          answer: "Yes, when used as intended, CryptoTab's mining functionality is safe for your computer. The mining process uses your CPU in a controlled manner similar to other processor-intensive tasks. To prevent overheating, we recommend not setting the mining speed too high for extended periods, especially on laptops with limited cooling capabilities."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-binance-text/80 max-w-2xl mx-auto">
            Find answers to the most common questions about CryptoTab, Bitcoin mining, and more.
          </p>
        </div>
        
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-binance-text/60" />
            <Input 
              placeholder="Search for answers..." 
              className="pl-10 bg-binance-darker border-binance-light/20 focus:border-bitcoin"
            />
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqCategories.map((category) => (
            <div key={category.id} className="mb-8">
              <h2 className="text-2xl font-bold mb-4">{category.title}</h2>
              <Accordion type="single" collapsible className="space-y-4">
                {category.questions.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="bg-binance-darker rounded-lg border border-binance-light/10 overflow-hidden"
                  >
                    <AccordionTrigger className="px-6 py-4 hover:bg-binance-light/5 transition-colors">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="px-6 pb-4 pt-0 text-binance-text/80">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
        
        <div className="glass-card p-8 text-center max-w-3xl mx-auto mt-12">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="text-binance-text/80 mb-6">
            If you couldn't find the answer you're looking for, please contact our support team.
          </p>
          <Button 
            className="bg-bitcoin hover:bg-bitcoin-light text-white"
            onClick={() => window.location.href = '/contact'}
          >
            Contact Support
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Faq;
