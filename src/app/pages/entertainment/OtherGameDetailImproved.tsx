import { useParams, useNavigate } from "react-router";
import { ArrowLeft, Gamepad2, Bell, Clock, Shield } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const otherGames: Record<string, { 
  name: string; 
  icon: string; 
  description: string;
  eta: string;
  features: string[];
}> = {
  "valorant": {
    name: "Valorant",
    icon: "🎯",
    description: "Top up Valorant Points (VP) untuk unlock agents, skins, dan battle pass premium.",
    eta: "Coming in 2 weeks",
    features: ["Valorant Points", "Battle Pass", "Premium Skins", "Agent Unlock"]
  },
  "arena-of-valor": {
    name: "Arena of Valor",
    icon: "🛡️",
    description: "Isi Vouchers Arena of Valor untuk beli hero, skin eksklusif, dan item premium.",
    eta: "Coming next month",
    features: ["Hero Unlock", "Premium Skins", "Magic Crystals", "VIP Benefits"]
  },
  "call-of-duty-mobile": {
    name: "Call of Duty Mobile",
    icon: "💥",
    description: "Beli CP (Call of Duty Points) untuk unlock weapons, skins keren, dan battle pass.",
    eta: "Coming in 3 weeks",
    features: ["COD Points", "Battle Pass", "Weapon Skins", "Character Skins"]
  },
  "clash-of-clans": {
    name: "Clash of Clans",
    icon: "🏰",
    description: "Top up Gems untuk upgrade bangunan, train troops, dan akselerasi progres base-mu.",
    eta: "Coming soon",
    features: ["Gems", "Builder Potions", "Resource Packs", "Shield Protection"]
  }
};

export function OtherGameDetailImproved() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const game = otherGames[gameId || ""];

  if (!game) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Game not found</h2>
          <Button 
            onClick={() => navigate("/app/entertainment/game-topup")}
            className="bg-gradient-to-r from-primary to-secondary text-white"
          >
            Back to Games
          </Button>
        </div>
      </div>
    );
  }

  const handleNotifyMe = () => {
    alert(`Great! We'll notify you as soon as ${game.name} top-up is available.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="sticky top-16 lg:top-0 z-30 lg:z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="px-4 py-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate("/app/entertainment/game-topup")}
            className="hidden lg:inline-flex hover:bg-gray-100 dark:hover:bg-gray-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
          
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-3xl">
              {game.icon}
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{game.name}</h1>
              <p className="text-gray-600 dark:text-gray-400">Top-up Service Coming Soon</p>
            </div>
            <Badge variant="warning" className="bg-yellow-500 text-white">
              <Clock className="w-4 h-4 mr-1" />
              {game.eta}
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24 space-y-8">
        
        {/* Game Description */}
        <Card className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">About {game.name}</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{game.description}</p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {game.features.map((feature, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                <Gamepad2 className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h4 className="font-medium text-sm text-gray-900 dark:text-white">{feature}</h4>
              </div>
            ))}
          </div>
        </Card>

        {/* Coming Soon Banner */}
        <Card className="p-8 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 border-2 border-dashed border-yellow-300 dark:border-yellow-600">
          <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto">
              <Bell className="w-10 h-10 text-white" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Coming Soon!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {game.name} top-up service will be available soon. Be the first to know when it's ready!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleNotifyMe}
                  className="bg-gradient-to-r from-primary to-secondary text-white font-bold px-8 py-3"
                  size="lg"
                >
                  <Bell className="w-5 h-5 mr-2" />
                  Notify Me When Available
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate("/app/entertainment/game-topup")}
                  className="border-gray-300 dark:border-gray-600"
                >
                  Browse Available Games
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Secure & Safe</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">All transactions are encrypted and protected with advanced security measures.</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">Instant Delivery</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Get your game currency delivered instantly to your account after payment.</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gamepad2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">24/7 Support</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">Our support team is always ready to help you with any issues or questions.</p>
          </Card>
        </div>

        {/* Popular Games */}
        <Card className="p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Available Now</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">While you wait for {game.name}, check out our popular games available now!</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Mobile Legends", icon: "🎮", color: "from-purple-500 to-pink-500" },
              { name: "PUBG Mobile", icon: "🔫", color: "from-orange-500 to-red-500" },
              { name: "Free Fire", icon: "🔥", color: "from-blue-500 to-cyan-500" },
              { name: "Genshin Impact", icon: "⚔️", color: "from-green-500 to-emerald-500" }
            ].map((game, index) => (
              <Card 
                key={index}
                className={`cursor-pointer hover:shadow-lg transition-all bg-gradient-to-br ${game.color} text-white border-0`}
                onClick={() => navigate(`/app/entertainment/game-topup/${game.name.toLowerCase().replace(' ', '-')}`)}
              >
                <div className="p-4 text-center">
                  <div className="text-3xl mb-2">{game.icon}</div>
                  <h4 className="font-bold text-sm">{game.name}</h4>
                </div>
              </Card>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
