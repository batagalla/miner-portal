
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// FAQ data
const faqData = [
  {
    question: "What is Bitcoin mining?",
    answer: "Bitcoin mining is the process of adding transaction records to Bitcoin's public ledger of past transactions. This ledger of past transactions is called the blockchain. The blockchain confirms transactions to the rest of the network as having taken place. Bitcoin nodes use the blockchain to distinguish legitimate Bitcoin transactions from attempts to re-spend coins that have already been spent elsewhere."
  },
  {
    question: "How does browser mining work?",
    answer: "Browser mining uses your computer's processing power through your web browser to mine cryptocurrency. It's a form of mining that doesn't require specialized hardware or technical knowledge. When you open our website and start mining, your computer's CPU is used to solve complex mathematical problems, contributing to blockchain validation. As you contribute computing power, you earn cryptocurrency rewards."
  },
  {
    question: "Is browser mining profitable?",
    answer: "Browser mining profitability depends on several factors including your computer's processing power, electricity costs, and current cryptocurrency values. While it may not be as profitable as dedicated mining hardware, browser mining offers an easy entry point with zero setup costs. It's particularly attractive for users who want to earn cryptocurrency without investing in expensive mining equipment."
  },
  {
    question: "How do I withdraw my earnings?",
    answer: "To withdraw your earnings, navigate to the Payouts section in your dashboard once you've logged in. Enter your Bitcoin wallet address and the amount you wish to withdraw. Please note that the minimum withdrawal amount is 0.001 BTC. Withdrawals are processed automatically and typically arrive in your wallet within 24 hours, depending on network congestion."
  },
  {
    question: "What is the affiliate program?",
    answer: "Our affiliate program allows you to earn additional Bitcoin by referring others to our platform. When someone signs up using your referral link and starts mining, you earn a percentage of their mining rewards without affecting their earnings. You earn 15% from your direct referrals (Level 1) and 10% from their referrals (Level 2). There's no limit to how many people you can refer."
  },
  {
    question: "Is there a minimum withdrawal amount?",
    answer: "Yes, the minimum withdrawal amount is 0.001 BTC. This threshold helps ensure that transaction fees don't consume a significant portion of your withdrawal amount. Once you reach this threshold, you can request a withdrawal at any time through the Payouts section of your dashboard."
  },
  {
    question: "How secure is my account?",
    answer: "We implement industry-standard security measures to keep your account safe. This includes secure password hashing, email verification, optional two-factor authentication, and encrypted communications. We recommend enabling two-factor authentication and using a strong, unique password to further enhance your account security."
  },
  {
    question: "Can I mine on multiple devices simultaneously?",
    answer: "Yes, you can mine on multiple devices simultaneously using the same account. Simply log in to your account on each device and start mining. This allows you to increase your mining power and earn more Bitcoin. There's no limit to the number of devices you can use, making it easy to scale your mining operation."
  },
  {
    question: "How does mining affect my computer's performance?",
    answer: "Mining utilizes your CPU resources, which can affect your computer's performance during mining. You can adjust the mining power using the mining controls in your dashboard to find a balance between mining speed and system performance. To minimize impact, you can lower the mining power when using your computer for other tasks and increase it when your computer is idle."
  },
  {
    question: "Do I need to keep the browser open to mine?",
    answer: "Yes, you need to keep the browser tab open for mining to continue. The mining process stops if you close the tab or browser. For continuous mining, you can keep the tab open in the background while using other applications on your computer. Some users dedicate an old device specifically for mining to maintain continuous operation."
  }
];

const FaqList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter FAQ items based on search query
  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-3xl mx-auto">
      <div className="relative mb-8">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="h-5 w-5 text-binance-text/50" />
        </div>
        <Input
          type="search"
          placeholder="Search FAQ..."
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="w-full">
        <Accordion type="single" collapsible className="w-full">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-b border-binance-light/20"
              >
                <AccordionTrigger className="text-left py-4 hover:no-underline hover:text-bitcoin">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-binance-text/70 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-binance-text/70">No results found for "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery("")}
                className="mt-2 text-bitcoin hover:text-bitcoin-light"
              >
                Clear search
              </button>
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
};

export default FaqList;
