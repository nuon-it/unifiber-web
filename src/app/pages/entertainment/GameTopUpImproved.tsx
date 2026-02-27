import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Gamepad2, Star, TrendingUp, Shield } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const games = [
  { id: 1, name: "Mobile Legends", icon: "🎮", popular: true, cashback: 10, slug: "mobile-legends", category: "MOBA" },
  { id: 2, name: "PUBG Mobile", icon: "🔫", popular: true, cashback: 5, slug: "pubg-mobile", category: "Battle Royale" },
  { id: 3, name: "Free Fire", icon: "🔥", popular: true, cashback: 8, slug: "free-fire", category: "Battle Royale" },
  { id: 4, name: "Genshin Impact", icon: "⚔️", popular: true, cashback: 5, slug: "genshin-impact", category: "RPG" },
  { id: 5, name: "Valorant", icon: "🎯", popular: false, cashback: 0, slug: "valorant", category: "FPS" },
  { id: 6, name: "Arena of Valor", icon: "🛡️", popular: false, cashback: 5, slug: "arena-of-valor", category: "MOBA" },
  { id: 7, name: "Call of Duty Mobile", icon: "💥", popular: false, cashback: 0, slug: "call-of-duty-mobile", category: "FPS" },
  { id: 8, name: "Clash of Clans", icon: "🏰", popular: false, cashback: 0, slug: "clash-of-clans", category: "Strategy" },
];

const categories = ["All", "MOBA", "Battle Royale", "RPG", "FPS", "Strategy"];

export function GameTopUpImproved() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredGames = games.filter(game => {
    const matchesSearch = game.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const popularGames = filteredGames.filter(game => game.popular);
  const otherGames = filteredGames.filter(game => !game.popular);

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div className="text-center lg:text-left">
        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Game Top-Up
        </h1>
        <p className="text-muted-foreground">Top up your favorite games instantly with cashback rewards</p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search games..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary transition-all"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-gradient-to-r from-primary to-secondary text-white" : ""}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Popular Games Section */}
      {popularGames.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Popular Games
            </h2>
            <Badge variant="success" className="bg-green-500 text-white">
              <TrendingUp className="w-3 h-3 mr-1" />
              Trending
            </Badge>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularGames.map((game) => (
              <Card
                key={game.id}
                className="group cursor-pointer hover:shadow-xl hover:scale-105 transition-all duration-300 border-2 hover:border-secondary/50 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                onClick={() => navigate(`/app/entertainment/game-topup/${game.slug}`)}
              >
                <div className="p-6 text-center space-y-4">
                  <div className="relative">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {game.icon}
                    </div>
                    {game.cashback > 0 && (
                      <Badge 
                        variant="success" 
                        className="absolute -top-2 -right-2 bg-green-500 text-white text-xs animate-pulse"
                      >
                        {game.cashback}% Cashback
                      </Badge>
                    )}
                    <Badge 
                      variant="info" 
                      className="absolute -top-2 -left-2 bg-blue-500 text-white text-xs"
                    >
                      <Star className="w-2 h-2 mr-1" />
                      Popular
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg group-hover:text-secondary transition-colors">{game.name}</h3>
                    <p className="text-sm text-muted-foreground">{game.category}</p>
                  </div>
                  <div className="space-y-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full group-hover:bg-secondary group-hover:text-white transition-all"
                    >
                      Top Up Now
                    </Button>
                    <div className="text-xs text-muted-foreground">
                      Instant Delivery • Secure Payment
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Other Games Section */}
      {otherGames.length > 0 && (
        <div>
          <h2 className="text-xl font-bold mb-4">More Games</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {otherGames.map((game) => (
              <Card
                key={game.id}
                className="group cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 border-2 hover:border-secondary/50"
                onClick={() => navigate(`/app/entertainment/game-topup/${game.slug}`)}
              >
                <div className="p-4 text-center space-y-3">
                  <div className="text-4xl group-hover:scale-110 transition-transform duration-300">
                    {game.icon}
                  </div>
                  <div>
                    <h3 className="font-bold group-hover:text-secondary transition-colors">{game.name}</h3>
                    <p className="text-xs text-muted-foreground">{game.category}</p>
                  </div>
                  {game.cashback > 0 && (
                    <Badge variant="success" className="bg-green-500 text-white text-xs">
                      {game.cashback}% Cashback
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <Gamepad2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-bold mb-2">No games found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Trust Indicators */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <h4 className="font-medium text-sm">Instant Delivery</h4>
          <p className="text-xs text-muted-foreground">1-5 minutes</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Shield className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h4 className="font-medium text-sm">Secure Payment</h4>
          <p className="text-xs text-muted-foreground">SSL Encrypted</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Star className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <h4 className="font-medium text-sm">Cashback Rewards</h4>
          <p className="text-xs text-muted-foreground">Up to 10%</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center mx-auto mb-3">
            <Gamepad2 className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <h4 className="font-medium text-sm">24/7 Support</h4>
          <p className="text-xs text-muted-foreground">Always Available</p>
        </Card>
      </div>
    </div>
  );
}
