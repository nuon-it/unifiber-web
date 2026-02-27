import { CreditCard, Download, FileText, Wallet, Receipt, Sparkles } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const currentBill = {
  amount: 499000,
  dueDate: "March 15, 2026",
  status: "unpaid",
  package: "Premium Fiber 1 Gbps",
};

const paymentMethods = [
  { id: 1, type: "Bank Transfer", name: "BCA **** 1234", primary: true },
  { id: 2, type: "E-Wallet", name: "GoPay", primary: false },
  { id: 3, type: "Credit Card", name: "Visa **** 5678", primary: false },
];

const transactions = [
  { id: 1, date: "Feb 15, 2026", type: "Internet Bill", amount: 499000, status: "paid", category: "internet" },
  { id: 2, date: "Feb 12, 2026", type: "Mobile Legends Top-Up", amount: 50000, status: "paid", category: "game" },
  { id: 3, date: "Feb 10, 2026", type: "Concert Ticket - Coldplay", amount: 1500000, status: "paid", category: "ticket" },
  { id: 4, date: "Jan 15, 2026", type: "Internet Bill", amount: 499000, status: "paid", category: "internet" },
  { id: 5, date: "Jan 8, 2026", type: "PUBG Mobile Top-Up", amount: 100000, status: "paid", category: "game" },
];

export function Billing() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Empty state untuk user yang belum berlangganan
  if (!user?.isSubscribed) {
    return (
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Billing & Payments</h1>
          <p className="text-muted-foreground">Kelola pembayaran dan transaksi Anda</p>
        </div>

        {/* Empty State */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Receipt className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Belum Ada Tagihan</h2>
            <p className="text-muted-foreground mb-6">
              Berlangganan Unifiber untuk mulai menikmati layanan internet fiber dan fitur billing terpadu untuk semua transaksi Anda
            </p>
            
            {/* Benefits */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Kemudahan Billing:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <span>Pembayaran otomatis & reminder</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <span>Riwayat transaksi terpadu (Internet + Entertainment)</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <span>Multiple payment methods</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <span>E-invoice & digital receipt</span>
                </li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate("/app/installation")}
            >
              Berlangganan Sekarang
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Billing & Payments</h1>
        <p className="text-muted-foreground">Kelola pembayaran dan transaksi Anda</p>
      </div>

      {/* Current Bill */}
      <Card className="bg-gradient-to-br from-primary via-primary to-secondary text-white border-0">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Current Bill</p>
            <h2 className="text-3xl font-bold">{formatCurrency(currentBill.amount)}</h2>
            <p className="text-white/80 text-sm mt-2">{currentBill.package}</p>
          </div>
          <Badge variant="warning" className="bg-yellow-500 text-white">
            {currentBill.status.toUpperCase()}
          </Badge>
        </div>
        <div className="flex items-center justify-between pt-4 border-t border-white/20">
          <span className="text-sm text-white/80">Due Date: {currentBill.dueDate}</span>
          <Button variant="secondary" size="sm">
            Pay Now
          </Button>
        </div>
      </Card>

      {/* Wallet Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
              <h3 className="text-xl font-bold">{formatCurrency(250000)}</h3>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Top Up
          </Button>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Unpaid Bills</p>
              <h3 className="text-xl font-bold">1</h3>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            View Details
          </Button>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
              <Download className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">This Month</p>
              <h3 className="text-xl font-bold">{formatCurrency(2149000)}</h3>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full">
            Download Report
          </Button>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Payment Methods</h3>
          <Button variant="outline" size="sm">
            Add New
          </Button>
        </div>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div
              key={method.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{method.name}</p>
                  <p className="text-sm text-muted-foreground">{method.type}</p>
                </div>
              </div>
              {method.primary && <Badge variant="info">Primary</Badge>}
            </div>
          ))}
        </div>
      </Card>

      {/* Transaction History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Transaction History</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.category === 'internet' ? 'bg-primary/10' :
                  transaction.category === 'game' ? 'bg-purple-100 dark:bg-purple-900' :
                  'bg-green-100 dark:bg-green-900'
                }`}>
                  {transaction.category === 'internet' ? (
                    <FileText className="w-5 h-5 text-primary" />
                  ) : transaction.category === 'game' ? (
                    <CreditCard className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  ) : (
                    <CreditCard className="w-5 h-5 text-green-600 dark:text-green-400" />
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <p className="text-sm text-muted-foreground">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">{formatCurrency(transaction.amount)}</p>
                <Badge variant="success" className="mt-1">
                  {transaction.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Auto Debit */}
      <Card>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-bold mb-1">Auto Debit</h3>
            <p className="text-sm text-muted-foreground">
              Automatically pay your bills on the due date
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-secondary"></div>
          </label>
        </div>
      </Card>
    </div>
  );
}