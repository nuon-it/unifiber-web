import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Gamepad2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const games = [
  { id: 1, name: "Mobile Legends", icon: "🎮", popular: true, cashback: 10, slug: "mobile-legends" },
  { id: 2, name: "PUBG Mobile", icon: "🔫", popular: true, cashback: 5, slug: "pubg-mobile" },
  { id: 3, name: "Free Fire", icon: "🔥", popular: true, cashback: 8, slug: "free-fire" },
  { id: 4, name: "Genshin Impact", icon: "⚔️", popular: true, cashback: 5, slug: "genshin-impact" },
  { id: 5, name: "Valorant", icon: "🎯", popular: false, cashback: 0, slug: "valorant" },
  { id: 6, name: "Arena of Valor", icon: "🛡️", popular: false, cashback: 5, slug: "arena-of-valor" },
  { id: 7, name: "Call of Duty Mobile", icon: "💥", popular: false, cashback: 0, slug: "call-of-duty-mobile" },
  { id: 8, name: "Clash of Clans", icon: "🏰", popular: false, cashback: 0, slug: "clash-of-clans" },
];

const denominations = [
  { id: 1, amount: 50000, diamonds: "275 Diamonds", bonus: "0", popular: false },
  { id: 2, amount: 100000, diamonds: "568 Diamonds", bonus: "+5", popular: true },
  { id: 3, amount: 250000, diamonds: "1446 Diamonds", bonus: "+20", popular: true },
  { id: 4, amount: 500000, diamonds: "2976 Diamonds", bonus: "+50", popular: false },
  { id: 5, amount: 1000000, diamonds: "6000 Diamonds", bonus: "+150", popular: false },
];

export function GameTopUp() {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState<number | null>(null);
  const [gameId, setGameId] = useState("");
  const [selectedDenom, setSelectedDenom] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handlePurchase = () => {
    if (selectedGame && gameId && selectedDenom) {
      alert("Purchase confirmation would appear here!");
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <h1 className="text-3xl font-bold mb-2">Game Top-Up</h1>
        <p className="text-muted-foreground">Top up game favorit Anda dengan mudah</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search games..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
        />
      </div>

      {/* Game Selection */}
      <div>
        <h2 className="text-lg font-bold mb-4">Select Game</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {filteredGames.map((game) => (
            <button
              key={game.id}
              onClick={() => navigate(`/app/entertainment/game-topup/${game.slug}`)}
              className="relative"
            >
              <Card
                className="text-center cursor-pointer transition-all hover:shadow-md hover:scale-105"
              >
                {game.cashback > 0 && (
                  <Badge variant="success" className="absolute -top-2 -right-2 bg-green-500 text-white">
                    {game.cashback}% Back
                  </Badge>
                )}
                {game.popular && (
                  <Badge variant="info" className="absolute -top-2 -left-2 bg-blue-500 text-white">
                    Popular
                  </Badge>
                )}
                <div className="text-4xl mb-2">{game.icon}</div>
                <h3 className="font-medium text-sm">{game.name}</h3>
              </Card>
            </button>
          ))}
        </div>
      </div>

      {/* Game ID Input */}
      {selectedGame && (
        <Card>
          <h3 className="text-lg font-bold mb-4">Enter User ID</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-2">User ID / Game ID</label>
              <input
                type="text"
                placeholder="Enter your game user ID"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Make sure your ID is correct. Wrong ID cannot be refunded.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Denomination Selection */}
      {selectedGame && gameId && (
        <div>
          <h2 className="text-lg font-bold mb-4">Select Amount</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {denominations.map((denom) => (
              <button
                key={denom.id}
                onClick={() => setSelectedDenom(denom.id)}
                className="relative"
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    selectedDenom === denom.id
                      ? "ring-2 ring-secondary bg-secondary/5"
                      : "hover:shadow-md"
                  }`}
                >
                  {denom.popular && (
                    <Badge variant="warning" className="absolute -top-2 -right-2 bg-yellow-500 text-white">
                      Best Value
                    </Badge>
                  )}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Gamepad2 className="w-5 h-5 text-secondary" />
                      <span className="font-bold">{denom.diamonds}</span>
                    </div>
                    {denom.bonus !== "0" && (
                      <Badge variant="success">+{denom.bonus} Bonus</Badge>
                    )}
                  </div>
                  <p className="text-xl font-bold text-secondary">{formatCurrency(denom.amount)}</p>
                </Card>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Purchase Summary */}
      {selectedGame && gameId && selectedDenom && (
        <Card className="sticky bottom-20 lg:bottom-6 bg-primary text-white border-0">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm">Total Payment</p>
              <h3 className="text-2xl font-bold">
                {formatCurrency(denominations.find(d => d.id === selectedDenom)?.amount || 0)}
              </h3>
            </div>
            <div className="text-right">
              <p className="text-white/80 text-sm">You'll Get</p>
              <h4 className="font-bold">
                {denominations.find(d => d.id === selectedDenom)?.diamonds}
              </h4>
            </div>
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="w-full"
            onClick={handlePurchase}
          >
            Purchase Now
          </Button>
        </Card>
      )}
    </div>
  );
}