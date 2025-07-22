
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../App";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AdsComponent from "../components/ads/AdsComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Bitcoin, Wallet, AlertCircle, Check, Download, History } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Payouts = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { toast } = useToast();
  const [withdrawalAmount, setWithdrawalAmount] = useState("");
  const [bitcoinAddress, setBitcoinAddress] = useState("");
  
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  // Sample transaction history data
  const transactions = [
    { 
      id: 1, 
      date: "2023-06-15 14:23", 
      type: "Withdrawal", 
      amount: "0.01253600 BTC", 
      status: "Completed",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    },
    { 
      id: 2, 
      date: "2023-05-22 09:45", 
      type: "Withdrawal", 
      amount: "0.00875200 BTC", 
      status: "Completed",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    },
    { 
      id: 3, 
      date: "2023-04-18 16:37", 
      type: "Withdrawal", 
      amount: "0.00532100 BTC", 
      status: "Completed",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    },
    { 
      id: 4, 
      date: "2023-03-05 11:12", 
      type: "Withdrawal", 
      amount: "0.00921400 BTC", 
      status: "Completed",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
    },
  ];
  
  const handleWithdrawal = () => {
    if (!bitcoinAddress.trim()) {
      toast({
        title: "Missing Bitcoin address",
        description: "Please enter a valid Bitcoin address.",
        variant: "destructive",
      });
      return;
    }
    
    const amount = parseFloat(withdrawalAmount);
    if (isNaN(amount) || amount < 0.001) {
      toast({
        title: "Invalid amount",
        description: "Minimum withdrawal amount is 0.001 BTC.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real app, you would make an API call to process the withdrawal
    toast({
      title: "Withdrawal requested",
      description: `${withdrawalAmount} BTC will be sent to your wallet shortly.`,
    });
  };
  
  const handleMaxAmount = () => {
    setWithdrawalAmount("0.729012034659");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto animate-fade-in">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Payouts</h1>
          <p className="text-binance-text/80">
            Manage your earnings and withdraw your Bitcoin to your wallet.
          </p>
        </div>
        
        <Tabs defaultValue="withdraw" className="mb-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="history">Transaction History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="withdraw">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2 bg-binance-darker border-binance-light/10">
                <CardHeader>
                  <CardTitle>Withdraw Bitcoin</CardTitle>
                  <CardDescription>
                    Transfer your earnings to your Bitcoin wallet.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-binance-light/10 rounded-md">
                      <div className="mr-4">
                        <Bitcoin className="h-10 w-10 text-bitcoin" />
                      </div>
                      <div>
                        <div className="text-sm text-binance-text/70">Available Balance</div>
                        <div className="text-2xl font-bold">0.729012034659 BTC</div>
                        <div className="text-sm text-binance-text/70">≈ $27,264.51</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="amount">Amount (BTC)</Label>
                      <div className="relative">
                        <Input
                          id="amount"
                          placeholder="0.001"
                          value={withdrawalAmount}
                          onChange={(e) => setWithdrawalAmount(e.target.value)}
                          className="pr-16"
                        />
                        <button
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-bitcoin hover:underline"
                          onClick={handleMaxAmount}
                        >
                          MAX
                        </button>
                      </div>
                      <div className="text-xs text-binance-text/60 flex items-center">
                        <AlertCircle className="h-3 w-3 mr-1" />
                        Minimum withdrawal: 0.001 BTC
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="wallet">Bitcoin Address</Label>
                        <button className="text-xs text-bitcoin hover:underline">
                          Manage Wallets
                        </button>
                      </div>
                      <Input
                        id="wallet"
                        placeholder="Your Bitcoin wallet address"
                        value={bitcoinAddress}
                        onChange={(e) => setBitcoinAddress(e.target.value)}
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        onClick={handleWithdrawal}
                        className="w-full bg-bitcoin hover:bg-bitcoin-light text-white"
                      >
                        <Wallet className="mr-2 h-4 w-4" />
                        Withdraw to Wallet
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-binance-darker border-binance-light/10">
                <CardHeader>
                  <CardTitle>Payout Information</CardTitle>
                  <CardDescription>
                    Details about the withdrawal process.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="p-1.5 bg-binance-light/20 rounded mr-3">
                        <Check className="h-4 w-4 text-bitcoin" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Automatic Payouts</h3>
                        <p className="text-xs text-binance-text/70">
                          Withdrawals are processed automatically once requested.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-1.5 bg-binance-light/20 rounded mr-3">
                        <Check className="h-4 w-4 text-bitcoin" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Low Fees</h3>
                        <p className="text-xs text-binance-text/70">
                          Enjoy minimal network fees for all withdrawals.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="p-1.5 bg-binance-light/20 rounded mr-3">
                        <Check className="h-4 w-4 text-bitcoin" />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">Secure Transfers</h3>
                        <p className="text-xs text-binance-text/70">
                          All transactions are securely processed on the Bitcoin blockchain.
                        </p>
                      </div>
                    </div>
                    
                    <div className="pt-4">
                      <div className="text-sm font-medium mb-1">Estimated Processing Time</div>
                      <div className="h-2 bg-binance-light/20 rounded-full overflow-hidden">
                        <div className="h-full bg-bitcoin w-2/3"></div>
                      </div>
                      <div className="flex justify-between text-xs text-binance-text/60 mt-1">
                        <span>Request</span>
                        <span>Processing</span>
                        <span>Complete</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card className="bg-binance-darker border-binance-light/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    View your recent withdrawals and deposits.
                  </CardDescription>
                </div>
                <Button variant="outline" className="hidden sm:flex">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                  <div className="w-full sm:w-auto flex gap-2">
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Transaction Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Transactions</SelectItem>
                        <SelectItem value="withdrawals">Withdrawals</SelectItem>
                        <SelectItem value="deposits">Deposits</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Select defaultValue="all">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Date Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="month">Last 30 Days</SelectItem>
                        <SelectItem value="year">This Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" className="sm:hidden w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </div>
                
                <div className="rounded-md border border-binance-light/10 overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[150px]">Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead className="hidden md:table-cell">Address</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((tx) => (
                        <TableRow key={tx.id}>
                          <TableCell className="font-medium">{tx.date}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {tx.type === "Withdrawal" ? (
                                <Wallet className="mr-2 h-4 w-4 text-binance-text/70" />
                              ) : (
                                <Bitcoin className="mr-2 h-4 w-4 text-binance-text/70" />
                              )}
                              {tx.type}
                            </div>
                          </TableCell>
                          <TableCell className="text-bitcoin">{tx.amount}</TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="truncate block max-w-[150px]">{tx.address}</span>
                          </TableCell>
                          <TableCell className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              tx.status === "Completed" 
                                ? "bg-green-100/10 text-green-500" 
                                : tx.status === "Pending"
                                ? "bg-yellow-100/10 text-yellow-500"
                                : "bg-red-100/10 text-red-500"
                            }`}>
                              {tx.status}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                
                {transactions.length === 0 && (
                  <div className="text-center py-12">
                    <History className="h-12 w-12 text-binance-text/30 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-binance-text mb-1">No transactions yet</h3>
                    <p className="text-sm text-binance-text/60">
                      Your transaction history will appear here once you make a withdrawal.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Ad placement before FAQ */}
        <div className="mb-8 flex justify-center">
          <AdsComponent adUnit="123475" size="horizontal" className="hidden md:block" />
          <AdsComponent adUnit="123476" size="square" className="md:hidden" />
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-bold mb-2">What is the minimum withdrawal amount?</h3>
              <p className="text-binance-text/70">
                The minimum withdrawal amount is 0.001 BTC. This threshold ensures that transaction fees don't 
                consume a significant portion of your withdrawal.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">How long do withdrawals take to process?</h3>
              <p className="text-binance-text/70">
                Most withdrawals are processed automatically and typically take 1-24 hours to complete, 
                depending on the Bitcoin network congestion. Once processed, the transaction will need to be 
                confirmed on the blockchain.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Are there any withdrawal fees?</h3>
              <p className="text-binance-text/70">
                Yes, there is a small network fee for processing Bitcoin transactions on the blockchain. 
                This fee varies depending on the network congestion, but we always aim to use optimal fees 
                to ensure fast confirmation while keeping costs low.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-2">Can I withdraw to any Bitcoin wallet?</h3>
              <p className="text-binance-text/70">
                Yes, you can withdraw to any valid Bitcoin address. Make sure to double-check your wallet 
                address before initiating a withdrawal, as cryptocurrency transactions cannot be reversed once confirmed.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Payouts;
