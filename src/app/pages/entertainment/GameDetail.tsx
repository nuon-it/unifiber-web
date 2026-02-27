import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Copy, CheckCircle, Gamepad2 } from "lucide-react";
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
}

interface Denomination {
  id: number;
  amount: number;
  currency: string;
  bonus?: string;
  popular?: boolean;
}

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
    cashback: 10
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
    cashback: 5
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
    cashback: 8
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
    cashback: 5
  }
};

const gameDenominations: Record<string, Denomination[]> = {
  "mobile-legends": [
    { id: 1, amount: 50000, currency: "86 Diamonds", bonus: "+0", popular: false },
    { id: 2, amount: 100000, currency: "172 Diamonds", bonus: "+5", popular: true },
    { id: 3, amount: 250000, currency: "429 Diamonds", bonus: "+20", popular: true },
    { id: 4, amount: 500000, currency: "858 Diamonds", bonus: "+50", popular: false },
    { id: 5, amount: 1000000, currency: "1716 Diamonds", bonus: "+150", popular: false },
  ],
  "pubg-mobile": [
    { id: 1, amount: 79000, currency: "60 UC", bonus: "+0", popular: false },
    { id: 2, amount: 149000, currency: "120 UC", bonus: "+6", popular: true },
    { id: 3, amount: 299000, currency: "250 UC", bonus: "+25", popular: true },
    { id: 4, amount: 599000, currency: "500 UC", bonus: "+60", popular: false },
    { id: 5, amount: 1199000, currency: "1000 UC", bonus: "+150", popular: false },
  ],
  "free-fire": [
    { id: 1, amount: 14000, currency: "100 Diamonds", bonus: "+0", popular: false },
    { id: 2, amount: 70000, currency: "500 Diamonds", bonus: "+25", popular: true },
    { id: 3, amount: 140000, currency: "1000 Diamonds", bonus: "+100", popular: true },
    { id: 4, amount: 350000, currency: "2500 Diamonds", bonus: "+300", popular: false },
    { id: 5, amount: 700000, currency: "5000 Diamonds", bonus: "+750", popular: false },
  ],
  "genshin-impact": [
    { id: 1, amount: 165000, currency: "980 Genesis Crystals", bonus: "+0", popular: false },
    { id: 2, amount: 330000, currency: "1960 Genesis Crystals", bonus: "+60", popular: true },
    { id: 3, amount: 825000, currency: "4900 Genesis Crystals", bonus: "+300", popular: true },
    { id: 4, amount: 1650000, currency: "9800 Genesis Crystals", bonus: "+800", popular: false },
    { id: 5, amount: 3300000, currency: "19600 Genesis Crystals", bonus: "+2000", popular: false },
  ]
};

export function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  const [userId, setUserId] = useState("");
  const [selectedDenom, setSelectedDenom] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const game = games[gameId || ""];
  const denominations = gameDenominations[gameId || ""];

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

  const handlePurchase = () => {
    if (userId && selectedDenom) {
      const selectedDenomination = denominations.find(d => d.id === selectedDenom);
      alert(`Processing purchase: ${selectedDenomination?.currency} for ${formatCurrency(selectedDenomination?.amount || 0)}`);
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/app/entertainment/game-topup")}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{game.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{game.name}</h1>
            <p className="text-sm text-muted-foreground">Top-up & Get {game.cashback}% Cashback</p>
          </div>
        </div>
      </div>

      {/* Game Description */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">About {game.name}</h3>
          <p className="text-muted-foreground">{game.description}</p>
          
          <div className="space-y-2">
            <h4 className="font-medium">How to Top Up:</h4>
            <ol className="space-y-2">
              {game.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-secondary text-white text-sm flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Card>

      {/* User ID Input */}
      <Card>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Enter Your Game ID</h3>
            {copied && (
              <Badge variant="success" className="animate-pulse">
                <CheckCircle className="w-3 h-3 mr-1" />
                Copied!
              </Badge>
            )}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder={`Enter your ${game.name} ID`}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {userId && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleCopyId}
              >
                <Copy className="w-4 h-4" />
              </Button>
            )}
          </div>
          
          <p className="text-xs text-muted-foreground">
            ⚠️ Make sure your ID is correct. Wrong ID cannot be refunded.
          </p>
        </div>
      </Card>

      {/* Denomination Selection */}
      {userId && (
        <div className="space-y-4">
          <h3 className="text-lg font-bold">Select Amount</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {denominations.map((denom) => (
              <Card
                key={denom.id}
                className={`cursor-pointer transition-all ${
                  selectedDenom === denom.id
                    ? "ring-2 ring-secondary bg-secondary/5"
                    : "hover:shadow-md"
                }`}
                onClick={() => setSelectedDenom(denom.id)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-secondary" />
                      <span className="font-bold">{denom.currency}</span>
                    </div>
                    {denom.popular && (
                      <Badge variant="warning" className="bg-yellow-500 text-white">
                        Best Value
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <p className="text-xl font-bold text-secondary">
                      {formatCurrency(denom.amount)}
                    </p>
                    {denom.bonus !== "0" && (
                      <Badge variant="success" className="text-xs">
                        +{denom.bonus} Bonus
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Purchase Summary */}
      {userId && selectedDenom && (
        <Card className="sticky bottom-20 lg:bottom-6 bg-primary text-white border-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">Selected Package</p>
                <h4 className="font-bold">
                  {denominations.find(d => d.id === selectedDenom)?.currency}
                </h4>
              </div>
              <div className="text-right">
                <p className="text-white/80 text-sm">Total Payment</p>
                <h3 className="text-2xl font-bold">
                  {formatCurrency(denominations.find(d => d.id === selectedDenom)?.amount || 0)}
                </h3>
              </div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-white/80">Cashback ({game.cashback}%)</span>
              <Badge variant="success" className="bg-green-500 text-white">
                +{formatCurrency((denominations.find(d => d.id === selectedDenom)?.amount || 0) * game.cashback / 100)}
              </Badge>
            </div>
            
            <Button
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={handlePurchase}
            >
              Purchase Now
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}