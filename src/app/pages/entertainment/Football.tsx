import { useState } from "react";
import { Calendar, MapPin, Trophy, Users } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const matches = [
  {
    id: 1,
    league: "Liga 1 Indonesia",
    homeTeam: "Persija Jakarta",
    awayTeam: "Persib Bandung",
    stadium: "Gelora Bung Karno Stadium",
    date: "March 5, 2026",
    time: "18:30 WIB",
    categories: [
      { name: "Tribune", price: 75000, available: 200 },
      { name: "VIP", price: 250000, available: 50 },
      { name: "VVIP", price: 500000, available: 20 },
    ],
    promotion: "3 for 2",
  },
  {
    id: 2,
    league: "Liga 1 Indonesia",
    homeTeam: "Arema FC",
    awayTeam: "Bali United",
    stadium: "Kanjuruhan Stadium",
    date: "March 8, 2026",
    time: "15:30 WIB",
    categories: [
      { name: "Tribune", price: 50000, available: 300 },
      { name: "VIP", price: 150000, available: 80 },
    ],
    promotion: null,
  },
  {
    id: 3,
    league: "AFC Champions League",
    homeTeam: "PSM Makassar",
    awayTeam: "BG Pathum United",
    stadium: "Mattoanging Stadium",
    date: "March 12, 2026",
    time: "19:00 WIB",
    categories: [
      { name: "Regular", price: 100000, available: 150 },
      { name: "Premium", price: 300000, available: 40 },
    ],
    promotion: null,
  },
];

export function Football() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <h1 className="text-3xl font-bold mb-2">Football Tickets</h1>
        <p className="text-muted-foreground">Tonton pertandingan favorit Anda langsung di stadion</p>
      </div>

      {/* Promo Banner */}
      <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Trophy className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Weekend Special</h3>
            <p className="text-sm text-white/80">Buy 2 tickets, get 1 free on selected matches</p>
          </div>
        </div>
      </Card>

      {/* Match List */}
      <div className="space-y-6">
        {matches.map((match) => (
          <Card key={match.id} className="overflow-hidden p-0">
            {/* Match Header */}
            <div className="bg-gradient-to-br from-primary to-secondary text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <Badge variant="info" className="bg-white/20 text-white">
                  {match.league}
                </Badge>
                {match.promotion && (
                  <Badge variant="warning" className="bg-yellow-500 text-white">
                    {match.promotion}
                  </Badge>
                )}
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between mb-6">
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold">{match.homeTeam}</h3>
                </div>
                <div className="text-3xl font-bold px-4">VS</div>
                <div className="text-center flex-1">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                    <Trophy className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-bold">{match.awayTeam}</h3>
                </div>
              </div>

              {/* Match Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-3">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{match.date} • {match.time}</span>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{match.stadium}</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              {/* Ticket Categories */}
              <div className="space-y-3">
                <h4 className="font-bold">Select Category</h4>
                {match.categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {category.available} seats available
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold text-secondary">
                        {formatCurrency(category.price)}
                      </p>
                      <Button size="sm" className="mt-2">
                        Select
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Seating Info */}
      <Card className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900">
        <div className="flex items-start gap-3">
          <Trophy className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium mb-1 text-green-900 dark:text-green-100">Ticket Information</h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1">
              <li>• E-tickets available in app</li>
              <li>• Stadium seating map available after selection</li>
              <li>• Gates open 2 hours before kickoff</li>
              <li>• Children under 5 enter free (no seat)</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}