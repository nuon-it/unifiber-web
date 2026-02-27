import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";

const otherGames: Record<string, { name: string; icon: string; description: string }> = {
  "valorant": {
    name: "Valorant",
    icon: "🎯",
    description: "Top up Valorant Points (VP) untuk unlock agents, skins, dan battle pass."
  },
  "arena-of-valor": {
    name: "Arena of Valor",
    icon: "🛡️",
    description: "Isi Vouchers Arena of Valor untuk beli hero, skin, dan item premium."
  },
  "call-of-duty-mobile": {
    name: "Call of Duty Mobile",
    icon: "💥",
    description: "Beli CP (Call of Duty Points) untuk unlock weapons, skins, dan battle pass."
  },
  "clash-of-clans": {
    name: "Clash of Clans",
    icon: "🏰",
    description: "Top up Gems untuk upgrade bangunan, train troops, dan akselerasi progres."
  }
};

export function OtherGameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const game = otherGames[gameId || ""];

  if (!game) {
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

  const handlePurchase = () => {
    alert(`Coming soon! ${game.name} top-up will be available soon.`);
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
            <p className="text-sm text-muted-foreground">Top-up Coming Soon</p>
          </div>
        </div>
      </div>

      {/* Game Description */}
      <Card>
        <div className="space-y-4">
          <h3 className="text-lg font-bold">About {game.name}</h3>
          <p className="text-muted-foreground">{game.description}</p>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-center gap-3">
              <Gamepad2 className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
              <div>
                <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Coming Soon!</h4>
                <p className="text-sm text-yellow-700 dark:text-yellow-500">
                  {game.name} top-up service will be available soon. Stay tuned for updates!
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Notify Me Button */}
      <Card>
        <div className="text-center space-y-4">
          <h3 className="text-lg font-bold">Get Notified When Available</h3>
          <p className="text-muted-foreground text-sm">
            We'll notify you as soon as {game.name} top-up is available
          </p>
          <Button onClick={handlePurchase} className="w-full">
            Notify Me When Available
          </Button>
        </div>
      </Card>
    </div>
  );
}