import { Gamepad2, Ticket, Trophy, Gift, ArrowRight } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router";

const categories = [
  {
    title: "Game Top-Up",
    description: "Top up your favorite games instantly",
    icon: Gamepad2,
    color: "from-purple-500 to-pink-500",
    link: "/app/entertainment/game-topup",
    popular: ["Mobile Legends", "PUBG Mobile", "Free Fire", "Genshin Impact"],
  },
  {
    title: "Digital Vouchers",
    description: "Streaming and gaming vouchers",
    icon: Gift,
    color: "from-orange-500 to-red-500",
    link: "/app/entertainment/vouchers",
    popular: ["Netflix", "Spotify", "Steam", "PlayStation Store"],
  },
  {
    title: "Concert Tickets",
    description: "Exclusive pre-sale for Unifiber customers",
    icon: Ticket,
    color: "from-blue-500 to-cyan-500",
    link: "/app/entertainment/concerts",
    popular: ["Coldplay", "Ed Sheeran", "Bruno Mars", "Taylor Swift"],
  },
  {
    title: "Football Tickets",
    description: "Liga 1 and international matches",
    icon: Trophy,
    color: "from-green-500 to-emerald-500",
    link: "/app/entertainment/football",
    popular: ["Persija Jakarta", "Persib Bandung", "Liga Champions"],
  },
];

const featuredDeals = [
  {
    title: "Mobile Legends Cashback",
    description: "Get 10% cashback on all top-ups",
    discount: "10% OFF",
    image: "mobile legends gaming",
  },
  {
    title: "Coldplay Pre-Sale",
    description: "Exclusive tickets for Unifiber customers",
    discount: "EXCLUSIVE",
    image: "concert stage lights",
  },
  {
    title: "Weekend Football",
    description: "Buy 2 tickets, get 1 free",
    discount: "3 for 2",
    image: "football stadium",
  },
];

export function Entertainment() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Entertainment</h1>
        <p className="text-muted-foreground">Powered by Nuon - Your digital lifestyle platform</p>
      </div>

      {/* Featured Deals */}
      <div>
        <h2 className="text-xl font-bold mb-4">Featured Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredDeals.map((deal, index) => (
            <Card key={index} className="overflow-hidden p-0 cursor-pointer hover:shadow-lg transition-shadow">
              <div className="h-32 bg-gradient-to-br from-primary to-secondary relative">
                <div className="absolute top-3 right-3 bg-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  {deal.discount}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-1">{deal.title}</h3>
                <p className="text-sm text-muted-foreground">{deal.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-xl font-bold mb-4">Browse Categories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={index}
                className={`bg-gradient-to-br ${category.color} text-white border-0 cursor-pointer hover:scale-105 transition-transform`}
                onClick={() => navigate(category.link)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{category.title}</h3>
                      <p className="text-sm text-white/80">{category.description}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.popular.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-white/20 rounded text-xs"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Benefits */}
      <Card>
        <h3 className="text-lg font-bold mb-4">Unifiber Customer Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Ticket className="w-6 h-6 text-secondary" />
            </div>
            <h4 className="font-medium mb-1">Exclusive Pre-Sales</h4>
            <p className="text-sm text-muted-foreground">Get early access to concert and sports tickets</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-medium mb-1">Cashback Rewards</h4>
            <p className="text-sm text-muted-foreground">Earn points on every entertainment purchase</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gamepad2 className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-medium mb-1">Special Discounts</h4>
            <p className="text-sm text-muted-foreground">Members-only deals on games and vouchers</p>
          </div>
        </div>
      </Card>

      {/* Quick Access */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" onClick={() => navigate("/app/entertainment/game-topup")}>
          <Gamepad2 className="w-4 h-4 mr-2" />
          Game Top-Up
        </Button>
        <Button variant="outline" onClick={() => navigate("/app/entertainment/vouchers")}>
          <Gift className="w-4 h-4 mr-2" />
          Vouchers
        </Button>
        <Button variant="outline" onClick={() => navigate("/app/entertainment/concerts")}>
          <Ticket className="w-4 h-4 mr-2" />
          Concerts
        </Button>
        <Button variant="outline" onClick={() => navigate("/app/entertainment/football")}>
          <Trophy className="w-4 h-4 mr-2" />
          Football
        </Button>
      </div>
    </div>
  );
}