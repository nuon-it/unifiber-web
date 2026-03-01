import { Calendar, MapPin, Ticket } from "lucide-react";
import { useNavigate } from "react-router";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const concerts = [
  {
    id: 1,
    artist: "Coldplay",
    venue: "Gelora Bung Karno Stadium, Jakarta",
    date: "15 Mei 2026",
    time: "19:00 WIB",
    minPrice: 1500000,
    presale: true,
    featured: true,
  },
  {
    id: 2,
    artist: "Ed Sheeran",
    venue: "Jakarta International Expo, Jakarta",
    date: "20 Juni 2026",
    time: "20:00 WIB",
    minPrice: 1200000,
    presale: true,
    featured: false,
  },
  {
    id: 3,
    artist: "Bruno Mars",
    venue: "ICE BSD, Tangerang",
    date: "10 Juli 2026",
    time: "19:30 WIB",
    minPrice: 1800000,
    presale: false,
    featured: false,
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function Concerts() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <Card className="border-0 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/20">
            <Ticket className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Concert Tickets</h1>
            <p className="text-sm text-white/85">Pilih event dulu, lalu lanjut checkout di halaman detail.</p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {concerts.map((concert) => (
          <Card key={concert.id}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold">{concert.artist}</h2>
                <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{concert.date} • {concert.time}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{concert.venue}</p>
                </div>
                <p className="mt-3 text-sm font-medium text-secondary">Mulai {formatCurrency(concert.minPrice)}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {concert.presale ? <Badge variant="warning">PRE-SALE</Badge> : null}
                {concert.featured ? <Badge variant="error">FEATURED</Badge> : null}
              </div>
            </div>

            <Button className="w-full" onClick={() => navigate(`/app/entertainment/concerts/${concert.id}`)}>
              Lihat detail & beli tiket
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
