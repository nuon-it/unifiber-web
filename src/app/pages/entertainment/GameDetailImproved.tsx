import { useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Copy, CheckCircle, Gamepad2, ChevronDown, Shield, Clock, Star } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  instructions: string[];
  cashback: number;
  color: string;
}

interface Denomination {
  id: number;
  amount: number;
  currency: string;
  bonus?: string;
  popular?: boolean;
  savings?: number;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  badge?: string;
}

type PaymentStatus = "idle" | "processing" | "success";

const games: Record<string, Game> = {
  "mobile-legends": {
    id: "mobile-legends",
    name: "Mobile Legends: Bang Bang",
    icon: "🎮",
    description: "Top up Diamonds untuk Mobile Legends dan dapatkan hero baru, skin epic, dan battle effects.",
    instructions: [
      "Masukkan User ID Anda dengan benar",
      "Pilih jumlah Diamonds yang diinginkan",
      "Selesaikan pembayaran",
      "Diamonds akan masuk otomatis ke akun Anda"
    ],
    cashback: 10,
    color: "from-purple-600 to-pink-600"
  },
  "pubg-mobile": {
    id: "pubg-mobile",
    name: "PUBG Mobile",
    icon: "🔫",
    description: "Beli UC (Unknown Cash) untuk PUBG Mobile dan unlock royal pass, crates, dan item eksklusif.",
    instructions: [
      "Masukkan Character ID Anda",
      "Pilih jumlah UC yang diinginkan",
      "Pilih metode pembayaran",
      "UC akan masuk otomatis dalam 5-10 menit"
    ],
    cashback: 5,
    color: "from-orange-600 to-red-600"
  },
  "free-fire": {
    id: "free-fire",
    name: "Free Fire",
    icon: "🔥",
    description: "Isi Diamonds Free Fire untuk beli bundle keren, senjata eksklusif, dan elite pass.",
    instructions: [
      "Masukkan Player ID Anda",
      "Pilih jumlah Diamonds",
      "Konfirmasi pembayaran",
      "Diamonds akan masuk otomatis"
    ],
    cashback: 8,
    color: "from-blue-600 to-cyan-600"
  },
  "genshin-impact": {
    id: "genshin-impact",
    name: "Genshin Impact",
    icon: "⚔️",
    description: "Top up Genesis Crystals untuk Genshin Impact dan dapatkan karakter baru, weapon, serta item premium.",
    instructions: [
      "Masukkan UID Anda",
      "Pilih server Anda",
      "Pilih jumlah Genesis Crystals",
      "Selesaikan pembayaran untuk instant top-up"
    ],
    cashback: 5,
    color: "from-green-600 to-emerald-600"
  }
};

const gameDenominations: Record<string, Denomination[]> = {
  "mobile-legends": [
    { id: 1, amount: 50000, currency: "86 Diamonds", bonus: "+0", popular: false, savings: 0 },
    { id: 2, amount: 100000, currency: "172 Diamonds", bonus: "+5", popular: true, savings: 5000 },
    { id: 3, amount: 250000, currency: "429 Diamonds", bonus: "+20", popular: true, savings: 15000 },
    { id: 4, amount: 500000, currency: "858 Diamonds", bonus: "+50", popular: false, savings: 35000 },
    { id: 5, amount: 1000000, currency: "1716 Diamonds", bonus: "+150", popular: false, savings: 75000 },
  ],
  "pubg-mobile": [
    { id: 1, amount: 79000, currency: "60 UC", bonus: "+0", popular: false, savings: 0 },
    { id: 2, amount: 149000, currency: "120 UC", bonus: "+6", popular: true, savings: 8000 },
    { id: 3, amount: 299000, currency: "250 UC", bonus: "+25", popular: true, savings: 20000 },
    { id: 4, amount: 599000, currency: "500 UC", bonus: "+60", popular: false, savings: 45000 },
    { id: 5, amount: 1199000, currency: "1000 UC", bonus: "+150", popular: false, savings: 100000 },
  ],
  "free-fire": [
    { id: 1, amount: 14000, currency: "100 Diamonds", bonus: "+0", popular: false, savings: 0 },
    { id: 2, amount: 70000, currency: "500 Diamonds", bonus: "+25", popular: true, savings: 5000 },
    { id: 3, amount: 140000, currency: "1000 Diamonds", bonus: "+100", popular: true, savings: 15000 },
    { id: 4, amount: 350000, currency: "2500 Diamonds", bonus: "+300", popular: false, savings: 40000 },
    { id: 5, amount: 700000, currency: "5000 Diamonds", bonus: "+750", popular: false, savings: 90000 },
  ],
  "genshin-impact": [
    { id: 1, amount: 165000, currency: "980 Genesis Crystals", bonus: "+0", popular: false, savings: 0 },
    { id: 2, amount: 330000, currency: "1960 Genesis Crystals", bonus: "+60", popular: true, savings: 10000 },
    { id: 3, amount: 825000, currency: "4900 Genesis Crystals", bonus: "+300", popular: true, savings: 50000 },
    { id: 4, amount: 1650000, currency: "9800 Genesis Crystals", bonus: "+800", popular: false, savings: 120000 },
    { id: 5, amount: 3300000, currency: "19600 Genesis Crystals", bonus: "+2000", popular: false, savings: 280000 },
  ]
};

const paymentMethods: PaymentMethod[] = [
  { id: "qris", name: "QRIS", description: "Scan QR lewat aplikasi bank/e-wallet", badge: "Instan" },
  { id: "ewallet", name: "E-Wallet", description: "OVO, GoPay, DANA, ShopeePay", badge: "Populer" },
  { id: "va", name: "Virtual Account", description: "BCA, BNI, BRI, Mandiri", badge: "Aman" },
  { id: "cc", name: "Kartu Kredit/Debit", description: "Visa, Mastercard", badge: "Cepat" },
];

export function GameDetailImproved() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [selectedDenom, setSelectedDenom] = useState<number | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showAllDenominations, setShowAllDenominations] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  
  const game = games[gameId || ""];
  const denominations = gameDenominations[gameId || ""];

  // Refs for smooth scrolling
  const userIdRef = useRef<HTMLDivElement>(null);
  const denominationRef = useRef<HTMLDivElement>(null);
  const paymentMethodRef = useRef<HTMLDivElement>(null);
  const confirmRef = useRef<HTMLDivElement>(null);

  if (!game || !denominations) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-2">Game not found</h2>
          <Button onClick={() => navigate("/app/entertainment/game-topup")}>
            Back to Games
          </Button>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleCopyId = () => {
    navigator.clipboard.writeText(userId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleUserIdSubmit = () => {
    if (userId.trim()) {
      setCurrentStep(2);
      denominationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleDenominationSelect = (denomId: number) => {
    setSelectedDenom(denomId);
    setSelectedPaymentMethod(null);
    setCurrentStep(3);
    setTimeout(() => {
      paymentMethodRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handlePaymentMethodSelect = (methodId: string) => {
    setSelectedPaymentMethod(methodId);
    setCurrentStep(4);
    setTimeout(() => {
      confirmRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  const handlePurchase = () => {
    if (!userId.trim() || !selectedDenom || !selectedPaymentMethod || paymentStatus === "processing") return;
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
    }, 1200);
  };

  const selectedDenomination = denominations.find(d => d.id === selectedDenom);
  const cashbackAmount = selectedDenomination ? (selectedDenomination.amount * game.cashback / 100) : 0;
  const selectedMethod = paymentMethods.find((m) => m.id === selectedPaymentMethod) || null;
  const canPay = !!userId.trim() && !!selectedDenomination && !!selectedMethod;

  // Show only first 3 denominations initially, or all if user clicked "show more"
  const displayedDenominations = showAllDenominations ? denominations : denominations.slice(0, 3);

  if (paymentStatus === "success") {
    const transactionId = `UF-${Date.now().toString().slice(-8)}`;
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-3xl mx-auto px-4 py-10 pb-28 space-y-6">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Pembayaran Berhasil</h1>
            <p className="text-muted-foreground">Top up akan diproses otomatis. Biasanya masuk dalam 1–5 menit.</p>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="font-bold">Detail Transaksi</div>
              <Badge variant="success" className="bg-green-500 text-white">Sukses</Badge>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">ID Transaksi</span>
                <span className="font-medium">{transactionId}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Game</span>
                <span className="font-medium">{game.name}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Game ID</span>
                <span className="font-medium">{userId}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Paket</span>
                <span className="font-medium">{selectedDenomination?.currency}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Metode Pembayaran</span>
                <span className="font-medium">{selectedMethod?.name}</span>
              </div>
              <div className="flex justify-between gap-4 pt-3 border-t border-border">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold">{formatCurrency(selectedDenomination?.amount || 0)}</span>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-muted-foreground">Cashback</span>
                <span className="font-medium text-green-600 dark:text-green-400">+{formatCurrency(cashbackAmount)}</span>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button onClick={() => navigate("/app/entertainment/game-topup")} className="w-full">
              Kembali ke Game Top-Up
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPaymentStatus("idle");
                setCurrentStep(1);
                setUserId("");
                setSelectedDenom(null);
                setSelectedPaymentMethod(null);
              }}
              className="w-full"
            >
              Top Up Lagi
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Sticky Header with Progress */}
      <div className="sticky top-16 lg:top-0 z-30 lg:z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-3">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/app/entertainment/game-topup")}
              className="hidden lg:inline-flex hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            
            {/* Progress Indicator */}
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    currentStep >= step ? "bg-secondary" : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Game Info Bar */}
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center text-2xl`}>
              {game.icon}
            </div>
            <div className="flex-1">
              <h1 className="font-bold text-lg text-gray-900 dark:text-white">{game.name}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Top-up & Get {game.cashback}% Cashback</p>
            </div>
            <Badge variant="success" className="bg-green-500 text-white">
              <Star className="w-3 h-3 mr-1" />
              {game.cashback}% Cashback
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6 pb-44">
        <div className="lg:grid lg:grid-cols-12 lg:gap-6">
          <div className="space-y-6 lg:col-span-7">
        
        {/* Step 1: User ID Input */}
        <div ref={userIdRef} className={`transition-all duration-300 ${currentStep > 1 ? 'opacity-50' : ''}`}>
          <Card className="p-6 border-2 border-transparent hover:border-secondary/50 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  currentStep >= 1 ? 'bg-secondary' : 'bg-gray-400'
                }`}>
                  1
                </div>
                <div>
                  <h3 className="font-bold text-lg">Enter Your Game ID</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Make sure it's correct to avoid transaction issues</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span className="text-xs text-green-600 dark:text-green-400">Secure Transaction</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={`Enter your ${game.name} ID`}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                {userId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={handleCopyId}
                  >
                    {copied ? <CheckCircle className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                )}
              </div>
              
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
                  <Shield className="w-3 h-3 mr-1" />
                  Your ID is encrypted and secure
                </p>
                
                <Button 
                  onClick={handleUserIdSubmit}
                  disabled={!userId.trim()}
                  className="px-6 py-2"
                  size="sm"
                >
                  Continue
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Step 2: Denomination Selection */}
        <div ref={denominationRef} className={`transition-all duration-300 ${currentStep < 2 ? 'opacity-30 pointer-events-none' : currentStep > 2 ? 'opacity-50' : ''}`}>
          <Card className="p-6 border-2 border-transparent hover:border-secondary/50 transition-colors">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  currentStep >= 2 ? 'bg-secondary' : 'bg-gray-400'
                }`}>
                  2
                </div>
                <div>
                  <h3 className="font-bold text-lg">Select Top-up Amount</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Choose your preferred package</p>
                </div>
              </div>
              <Badge variant="info" className="bg-blue-500 text-white">
                <Clock className="w-3 h-3 mr-1" />
                Instant Delivery
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {displayedDenominations.map((denom) => (
                <Card
                  key={denom.id}
                  className={`cursor-pointer transition-all duration-200 border-2 ${
                    selectedDenom === denom.id
                      ? 'border-secondary bg-secondary/5 shadow-lg scale-[1.02]'
                      : 'border-gray-200 dark:border-gray-700 hover:border-secondary/50 hover:shadow-md'
                  }`}
                  onClick={() => handleDenominationSelect(denom.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Gamepad2 className="w-5 h-5 text-secondary" />
                        <span className="font-bold text-sm">{denom.currency}</span>
                      </div>
                      {denom.popular && (
                        <Badge variant="warning" className="bg-yellow-500 text-white text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Best Value
                        </Badge>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-secondary">
                          {formatCurrency(denom.amount)}
                        </span>
                        {denom.bonus !== "+0" && (
                          <Badge variant="success" className="bg-green-500 text-white text-xs">
                            {denom.bonus} Bonus
                          </Badge>
                        )}
                      </div>
                      
                      {denom.savings > 0 && (
                        <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                          Save {formatCurrency(denom.savings)}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {!showAllDenominations && denominations.length > 3 && (
              <div className="text-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAllDenominations(true)}
                  className="border-dashed"
                >
                  <ChevronDown className="w-4 h-4 mr-2" />
                  Show {denominations.length - 3} More Packages
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Step 3: Payment Method */}
        {selectedDenom && (
          <div ref={paymentMethodRef} className="animate-fade-in scroll-mt-32 lg:scroll-mt-24">
            <Card className="p-6 border-2 border-transparent hover:border-secondary/50 transition-colors">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                    currentStep >= 3 ? 'bg-secondary' : 'bg-gray-400'
                  }`}>
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Pilih Metode Pembayaran</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Pilih metode yang paling nyaman</p>
                  </div>
                </div>
                <Badge variant="success" className="bg-green-500 text-white">Aman</Badge>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                  <Card
                    key={method.id}
                    className={`cursor-pointer transition-all duration-200 border-2 ${
                      selectedPaymentMethod === method.id
                        ? 'border-secondary bg-secondary/5 shadow-md'
                        : 'border-gray-200 dark:border-gray-700 hover:border-secondary/50 hover:shadow-sm'
                    }`}
                    onClick={() => handlePaymentMethodSelect(method.id)}
                  >
                    <div className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="font-bold">{method.name}</div>
                          <div className="text-sm text-muted-foreground">{method.description}</div>
                        </div>
                        {method.badge ? (
                          <Badge variant="info" className="bg-blue-500 text-white">{method.badge}</Badge>
                        ) : null}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* Step 4: Confirm & Pay */}
        {selectedDenom && selectedPaymentMethod && (
          <div ref={confirmRef} className="animate-fade-in scroll-mt-32 lg:scroll-mt-24">
            <Card className="p-6 border-2 border-transparent hover:border-secondary/50 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                  currentStep >= 4 ? 'bg-secondary' : 'bg-gray-400'
                }`}>
                  4
                </div>
                <div>
                  <h3 className="font-bold text-lg">Konfirmasi</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cek ulang detail sebelum bayar</p>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Game ID</span>
                  <span className="font-medium">{userId}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Paket</span>
                  <span className="font-medium">{selectedDenomination?.currency}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Metode</span>
                  <span className="font-medium">{selectedMethod?.name}</span>
                </div>
                <div className="flex justify-between gap-4 pt-3 border-t border-border">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-bold">{formatCurrency(selectedDenomination?.amount || 0)}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-muted-foreground">Cashback</span>
                  <span className="font-medium text-green-600 dark:text-green-400">+{formatCurrency(cashbackAmount)}</span>
                </div>
              </div>

              <div className="mt-5 space-y-3 lg:hidden">
                <Button
                  onClick={handlePurchase}
                  disabled={!canPay || paymentStatus === "processing"}
                  className="w-full font-bold"
                  size="lg"
                >
                  {paymentStatus === "processing" ? "Memproses..." : "Bayar Sekarang"}
                </Button>
                <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                  <Shield className="w-3 h-3" />
                  <span>Pembayaran terenkripsi</span>
                </div>
              </div>
            </Card>
          </div>
        )}

          </div>

          <div className="hidden lg:block lg:col-span-5">
            <div className="sticky top-24">
              <Card className="p-6">
                <div className="font-bold text-lg mb-4">Ringkasan</div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Game ID</span>
                    <span className="font-medium">{userId ? userId : "-"}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Paket</span>
                    <span className="font-medium">{selectedDenomination ? selectedDenomination.currency : "-"}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Metode</span>
                    <span className="font-medium">{selectedMethod ? selectedMethod.name : "-"}</span>
                  </div>
                  <div className="flex justify-between gap-4 pt-3 border-t border-border">
                    <span className="text-muted-foreground">Total</span>
                    <span className="font-bold">{selectedDenomination ? formatCurrency(selectedDenomination.amount) : "-"}</span>
                  </div>
                  <div className="flex justify-between gap-4">
                    <span className="text-muted-foreground">Cashback</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{selectedDenomination ? `+${formatCurrency(cashbackAmount)}` : "-"}</span>
                  </div>
                </div>
                <div className="mt-5 space-y-3">
                  <Button
                    onClick={handlePurchase}
                    disabled={!canPay || paymentStatus === "processing"}
                    className="w-full font-bold"
                    size="lg"
                  >
                    {paymentStatus === "processing" ? "Memproses..." : "Bayar Sekarang"}
                  </Button>
                  <div className="text-center text-xs text-muted-foreground flex items-center justify-center gap-2">
                    <Shield className="w-3 h-3" />
                    <span>Pembayaran terenkripsi</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Shield className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Secure Payment</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">SSL Encrypted</p>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Instant Delivery</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">1-5 Minutes</p>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h4 className="font-medium text-sm">Cashback</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">{game.cashback}% Reward</p>
          </div>
          <div className="text-center p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
            <Gamepad2 className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-medium text-sm">24/7 Support</h4>
            <p className="text-xs text-gray-600 dark:text-gray-400">Always Available</p>
          </div>
        </div>
      </div>

      {/* Floating Action Button for Mobile */}
      {selectedDenom && (
        <div className="lg:hidden fixed bottom-16 left-0 right-0 z-50 p-4 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={() => {
              if (canPay) {
                handlePurchase();
                return;
              }
              if (!selectedPaymentMethod) {
                paymentMethodRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
                return;
              }
              confirmRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white font-bold"
            size="lg"
            disabled={paymentStatus === "processing"}
          >
            <div className="flex items-center justify-between w-full">
              <div className="text-left">
                <div className="text-sm font-normal">{canPay ? "Bayar Sekarang" : selectedPaymentMethod ? "Konfirmasi" : "Pilih Metode"}</div>
                <div className="text-lg font-bold">{formatCurrency(selectedDenomination?.amount || 0)}</div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-white/20 text-white text-xs">
                  +{formatCurrency(cashbackAmount)} Cashback
                </Badge>
                <ChevronDown className="w-5 h-5" />
              </div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
