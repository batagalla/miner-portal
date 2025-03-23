
import { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Loader2, 
  Search, 
  RefreshCcw, 
  ArrowDownUp, 
  ArrowUpDown 
} from "lucide-react";

interface Transaction {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  type: 'withdrawal' | 'deposit' | 'mining' | 'affiliate';
  amount: number;
  address?: string;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
  createdAt: string;
}

const AdminTransactionsTable = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [processingUpdate, setProcessingUpdate] = useState(false);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch('/api/admin/transactions', {
        headers: {
          'x-auth-token': token || ''
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch transactions');
      }
      
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load transactions. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTransactions = transactions.filter(tx => {
    const matchesSearch = 
      tx.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tx.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.txHash && tx.txHash.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (tx.address && tx.address.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !typeFilter || tx.type === typeFilter;
    const matchesStatus = !statusFilter || tx.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'pending': return 'bg-amber-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'withdrawal': return <ArrowUpDown className="h-3 w-3 mr-1" />;
      case 'deposit': return <ArrowDownUp className="h-3 w-3 mr-1" />;
      case 'mining': return <RefreshCcw className="h-3 w-3 mr-1" />;
      default: return null;
    }
  };

  const handleTransactionClick = (tx: Transaction) => {
    setCurrentTransaction(tx);
    setNewStatus(tx.status);
    setTxHash(tx.txHash || '');
    setDialogOpen(true);
  };

  const updateTransactionStatus = async () => {
    if (!currentTransaction) return;
    
    setProcessingUpdate(true);
    try {
      const token = localStorage.getItem("adminToken");
      const response = await fetch(`/api/admin/transactions/${currentTransaction._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': token || ''
        },
        body: JSON.stringify({
          status: newStatus,
          txHash: txHash || undefined
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to update transaction');
      }
      
      // Update the local state
      setTransactions(prevTransactions => 
        prevTransactions.map(tx => 
          tx._id === currentTransaction._id 
            ? { ...tx, status: newStatus as any, txHash: txHash || tx.txHash } 
            : tx
        )
      );
      
      toast({
        title: "Success",
        description: "Transaction has been updated successfully",
      });
      
      setDialogOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update transaction. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessingUpdate(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-10">
        <Loader2 className="h-8 w-8 animate-spin text-bitcoin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={typeFilter || ""} onValueChange={(value) => setTypeFilter(value || null)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All types</SelectItem>
              <SelectItem value="withdrawal">Withdrawal</SelectItem>
              <SelectItem value="deposit">Deposit</SelectItem>
              <SelectItem value="mining">Mining</SelectItem>
              <SelectItem value="affiliate">Affiliate</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={statusFilter || ""} onValueChange={(value) => setStatusFilter(value || null)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All statuses</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          
          <Button onClick={fetchTransactions} className="flex items-center gap-2">
            <RefreshCcw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>
      
      <div className="rounded-md border border-binance-light/10 overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-binance-dark">
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Address/Hash</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx) => (
                  <TableRow 
                    key={tx._id} 
                    className="hover:bg-binance-light/5 cursor-pointer"
                    onClick={() => handleTransactionClick(tx)}
                  >
                    <TableCell className="font-medium">
                      <div>
                        <div>{tx.user?.name}</div>
                        <div className="text-xs text-muted-foreground">{tx.user?.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {getTypeIcon(tx.type)}
                        <span className="capitalize">{tx.type}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      ${tx.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusBadgeColor(tx.status)} w-fit`}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {tx.txHash || tx.address || '-'}
                    </TableCell>
                    <TableCell>{formatDate(tx.createdAt)}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No transactions found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>
              View and update the transaction information.
            </DialogDescription>
          </DialogHeader>
          
          {currentTransaction && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">User:</div>
                <div className="col-span-3">
                  {currentTransaction.user?.name} ({currentTransaction.user?.email})
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">Type:</div>
                <div className="col-span-3 capitalize">{currentTransaction.type}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">Amount:</div>
                <div className="col-span-3">${currentTransaction.amount.toFixed(2)}</div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">Status:</div>
                <div className="col-span-3">
                  <Select value={newStatus} onValueChange={setNewStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">
                  {currentTransaction.type === 'withdrawal' ? 'TX Hash:' : 'Address:'}
                </div>
                <div className="col-span-3">
                  <Input 
                    value={txHash} 
                    onChange={(e) => setTxHash(e.target.value)}
                    placeholder="Enter transaction hash"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="text-sm font-medium">Date:</div>
                <div className="col-span-3">{formatDate(currentTransaction.createdAt)}</div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setDialogOpen(false)}
              disabled={processingUpdate}
            >
              Cancel
            </Button>
            <Button 
              onClick={updateTransactionStatus}
              disabled={processingUpdate}
            >
              {processingUpdate ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                'Update Transaction'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTransactionsTable;
