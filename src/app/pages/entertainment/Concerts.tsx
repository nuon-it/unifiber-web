import { useState } from "react";
import { Calendar, MapPin, Ticket, Users } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const concerts = [
  {
    id: 1,
    artist: "Coldplay",
    venue: "Gelora Bung Karno Stadium, Jakarta",
    date: "May 15, 2026",
    time: "19:00 WIB",
    image: "concert stage lights audience",
    categories: [
      { name: "Festival", price: 1500000, available: 50 },
      { name: "Tribune", price: 2500000, available: 20 },
      { name: "VIP", price: 5000000, available: 5 },
    ],
    presale: true,
    featured: true,
  },
  {
    id: 2,
    artist: "Ed Sheeran",
    venue: "Jakarta International Expo, Jakarta",
    date: "June 20, 2026",
    time: "20:00 WIB",
    image: "concert guitar performer",
    categories: [
      { name: "Silver", price: 1200000, available: 100 },
      { name: "Gold", price: 2000000, available: 30 },
      { name: "Platinum", price: 3500000, available: 10 },
    ],
    presale: true,
    featured: false,
  },
  {
    id: 3,
    artist: "Bruno Mars",
    venue: "ICE BSD, Tangerang",
    date: "July 10, 2026",
    time: "19:30 WIB",
    image: "concert performer stage",
    categories: [
      { name: "Regular", price: 1800000, available: 80 },
      { name: "Premium", price: 3000000, available: 25 },
    ],
    presale: false,
    featured: false,
  },
];

export function Concerts() {
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
        <h1 className="text-3xl font-bold mb-2">Concert Tickets</h1>
        <p className="text-muted-foreground">Akses pre-sale eksklusif untuk pelanggan Unifiber</p>
      </div>

      {/* Presale Banner */}
      <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Ticket className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Unifiber Pre-Sale Access</h3>
            <p className="text-sm text-white/80">Get tickets before public sale opens</p>
          </div>
        </div>
      </Card>

      {/* Concert List */}
      <div className="space-y-6">
        {concerts.map((concert) => (
          <Card key={concert.id} className="overflow-hidden p-0">
            {/* Concert Header */}
            <div className="h-48 bg-gradient-to-br from-primary via-secondary to-accent relative">
              {concert.presale && (
                <Badge variant="warning" className="absolute top-4 left-4 bg-yellow-500 text-white">
                  PRE-SALE
                </Badge>
              )}
              {concert.featured && (
                <Badge variant="error" className="absolute top-4 right-4 bg-red-500 text-white">
                  FEATURED
                </Badge>
              )}
            </div>

            <div className="p-6">
              {/* Artist Info */}
              <h3 className="text-2xl font-bold mb-4">{concert.artist}</h3>
              
              <div className="space-y-2 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{concert.date} • {concert.time}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{concert.venue}</span>
                </div>
              </div>

              {/* Ticket Categories */}
              <div className="space-y-3">
                <h4 className="font-bold">Select Category</h4>
                {concert.categories.map((category, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div>
                      <p className="font-medium">{category.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {category.available} tickets available
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

      {/* Info */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
        <div className="flex items-start gap-3">
          <Ticket className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium mb-1 text-blue-900 dark:text-blue-100">Ticket Information</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li>• E-tickets will be sent to your email after payment</li>
              <li>• Valid ID required at venue entrance</li>
              <li>• Tickets are non-refundable</li>
              <li>• QR code will be available in the app</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  );
}