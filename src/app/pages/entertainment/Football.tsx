import { Calendar, MapPin, Trophy } from "lucide-react";
import { useNavigate } from "react-router";
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
    date: "5 Maret 2026",
    time: "18:30 WIB",
    minPrice: 75000,
    promotion: "3 for 2",
  },
  {
    id: 2,
    league: "Liga 1 Indonesia",
    homeTeam: "Arema FC",
    awayTeam: "Bali United",
    stadium: "Kanjuruhan Stadium",
    date: "8 Maret 2026",
    time: "15:30 WIB",
    minPrice: 50000,
    promotion: null,
  },
  {
    id: 3,
    league: "AFC Champions League",
    homeTeam: "PSM Makassar",
    awayTeam: "BG Pathum United",
    stadium: "Mattoanging Stadium",
    date: "12 Maret 2026",
    time: "19:00 WIB",
    minPrice: 100000,
    promotion: null,
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function Football() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 pb-24 lg:pb-6">
      <Card className="border-0 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white/20">
            <Trophy className="h-7 w-7" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Football Tickets</h1>
            <p className="text-sm text-white/85">Pilih pertandingan dulu, lalu lanjut checkout di halaman detail.</p>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {matches.map((match) => (
          <Card key={match.id}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-medium text-muted-foreground">{match.league}</p>
                <h2 className="text-xl font-bold">{match.homeTeam} vs {match.awayTeam}</h2>
                <div className="mt-1 space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-2"><Calendar className="h-4 w-4" />{match.date} • {match.time}</p>
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4" />{match.stadium}</p>
                </div>
                <p className="mt-3 text-sm font-medium text-secondary">Mulai {formatCurrency(match.minPrice)}</p>
              </div>
              {match.promotion ? <Badge variant="warning">{match.promotion}</Badge> : null}
            </div>

            <Button className="w-full" onClick={() => navigate(`/app/entertainment/football/${match.id}`)}>
              Lihat detail & beli tiket
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
