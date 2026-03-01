import { useEffect, useMemo, useRef, useState, type UIEvent } from "react";
import { useNavigate } from "react-router";
import { Flame, Search, Sparkles } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Badge } from "../../components/ui/Badge";
import { Button } from "../../components/ui/Button";

type Category = "All" | "Popular" | "MOBA" | "Battle Royale" | "RPG" | "FPS" | "Sports" | "Other";

interface GameItem {
  id: number;
  name: string;
  slug: string;
  image: string;
  icon: string;
  category: Exclude<Category, "All" | "Popular">;
  popular?: boolean;
  cashback?: number;
}

const games: GameItem[] = [
  { id: 1, name: "Mobile Legends", slug: "mobile-legends", image: "https://static.upoint.id/images/contents/ml-2019.jpg", icon: "🎮", category: "MOBA", popular: true, cashback: 10 },
  { id: 2, name: "PUBG Mobile", slug: "pubg-mobile", image: "https://static.upoint.id/images/contents/pubg-mobile-image.png", icon: "🔫", category: "Battle Royale", popular: true, cashback: 5 },
  { id: 3, name: "Free Fire", slug: "free-fire", image: "https://static.upoint.id/images/contents/ff-2019.jpg", icon: "🔥", category: "Battle Royale", popular: true, cashback: 8 },
  { id: 4, name: "Honor of Kings", slug: "honor-of-kings", image: "https://static.upoint.id/images/contents/honorofking.jpg", icon: "👑", category: "MOBA", popular: true, cashback: 4 },
  { id: 5, name: "Call of Duty Mobile", slug: "call-of-duty-mobile", image: "https://static.upoint.id/images/contents/call_of_duty.png", icon: "💥", category: "FPS" },
  { id: 6, name: "Arena of Valor", slug: "arena-of-valor", image: "https://static.upoint.id/images/contents/aov-storenew.jpg", icon: "🛡️", category: "MOBA", cashback: 5 },
  { id: 7, name: "Free Fire Max", slug: "free-fire-max", image: "https://static.upoint.id/images/contents/ff_max.jpg", icon: "🔥", category: "Battle Royale" },
  { id: 8, name: "Valorant", slug: "valorant", image: "https://static.upoint.id/images/contents/valorant.jpg", icon: "🎯", category: "FPS" },
  { id: 9, name: "Roblox Gift Card", slug: "roblox-gift-card", image: "https://static.upoint.id/images/contents/roblox.jpg", icon: "🧱", category: "Other" },
  { id: 10, name: "Pokemon Unite", slug: "pokemon-unite", image: "https://static.upoint.id/images/contents/pokemon.jpg", icon: "⚡", category: "MOBA" },
  { id: 11, name: "Cross Fire Legend", slug: "cross-fire-legend", image: "https://static.upoint.id/images/contents/crossfire_legend.png", icon: "🎖️", category: "FPS" },
  { id: 12, name: "Magic Chess", slug: "magic-chess", image: "https://static.upoint.id/images/contents/magic_chess.png", icon: "♟️", category: "Other" },
  { id: 13, name: "Garena Undawn", slug: "garena-undawn", image: "https://static.upoint.id/images/contents/undawn.jpg", icon: "🌆", category: "RPG" },
  { id: 14, name: "Honkai: Star Rail", slug: "honkai-star-rail", image: "https://static.upoint.id/images/contents/honkaistarrail.jpg", icon: "🚄", category: "RPG" },
  { id: 15, name: "Delta Force", slug: "delta-force", image: "https://static.upoint.id/images/contents/deltaforce.jpg", icon: "🪖", category: "FPS" },
  { id: 16, name: "Super SUS", slug: "super-sus", image: "https://static.upoint.id/images/contents/supersus.jpg", icon: "🛰️", category: "Other" },
  { id: 17, name: "Garuda Eleven", slug: "garuda-eleven", image: "https://static.upoint.id/images/contents/garudaeleven.jpg", icon: "⚽", category: "Sports" },
  { id: 18, name: "Speed Drifters", slug: "speed-drifters", image: "https://static.upoint.id/images/contents/speed_drifters.jpg", icon: "🏎️", category: "Sports" },
  { id: 19, name: "Ragnarok Forever Love", slug: "ragnarok-forever-love", image: "https://static.upoint.id/images/contents/ragnarok_forever.jpg", icon: "🗡️", category: "RPG" },
  { id: 20, name: "One Punch Man", slug: "one-punch-man-the-strongest", image: "https://static.upoint.id/images/contents/the_strongest.jpg", icon: "👊", category: "RPG" },
  { id: 21, name: "Tom and Jerry: Chase", slug: "tom-and-jerry-chase", image: "https://static.upoint.id/images/contents/tom_jerry_chase.jpg", icon: "🐭", category: "Other" },
  { id: 22, name: "Atlantica Online", slug: "atlantica-online", image: "https://static.upoint.id/images/contents/atlantica.jpg", icon: "🌊", category: "RPG" },
  { id: 23, name: "Bleach Mobile 3D", slug: "bleach-mobile-3d", image: "https://static.upoint.id/images/contents/bleach_mobile.jpg", icon: "🌀", category: "RPG" },
  { id: 24, name: "Perfect World", slug: "perfect-world", image: "https://static.upoint.id/images/contents/perfect_world.jpg", icon: "🌍", category: "RPG" },
  { id: 25, name: "Saint Seiya", slug: "saint-seiya", image: "https://static.upoint.id/images/contents/saint_seiya.jpg", icon: "✨", category: "RPG" },
  { id: 26, name: "Werewolf", slug: "werewolf-party-game", image: "https://static.upoint.id/images/contents/werewolf.jpg", icon: "🐺", category: "Other" },
  { id: 27, name: "Paw Rumble", slug: "paw-rumble", image: "https://static.upoint.id/images/contents/paw_rumble.jpg", icon: "🐾", category: "Other" },
  { id: 28, name: "Lita", slug: "lita", image: "https://static.upoint.id/images/contents/lita.jpg", icon: "🎴", category: "Other" },
  { id: 29, name: "Megaxus", slug: "megaxus", image: "https://static.upoint.id/images/contents/megaxus.jpg", icon: "🕹️", category: "Other" },
];

const categoryTabs: Category[] = ["All", "Popular", "MOBA", "Battle Royale", "RPG", "FPS", "Sports", "Other"];
const placeholderImage = "https://static.upoint.id/images/icons/logo.png";

function GameTile({ game, onClick }: { game: GameItem; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [imgSrc, setImgSrc] = useState(game.image);

  return (
    <button type="button" onClick={onClick} className="group text-left">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card transition group-hover:-translate-y-0.5 group-hover:shadow-md">
        <div className="relative aspect-square w-full bg-muted">
          {!loaded ? <div className="absolute inset-0 z-10 animate-pulse bg-muted" /> : null}
          <div className="absolute inset-0 flex items-center justify-center text-3xl">{game.icon}</div>
          <img
            src={imgSrc}
            alt={game.name}
            loading="lazy"
            className={`relative z-20 h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setLoaded(true)}
            onError={(event) => {
              if (imgSrc !== placeholderImage) {
                setImgSrc(placeholderImage);
                return;
              }
              setLoaded(true);
              event.currentTarget.style.display = "none";
            }}
          />

          {game.cashback && game.cashback > 0 ? (
            <span className="absolute right-1 top-1 z-20 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-semibold text-white">
              {game.cashback}%
            </span>
          ) : null}
        </div>
      </div>
      <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-snug text-foreground sm:text-sm">{game.name}</p>
    </button>
  );
}

export function GameTopUpImproved() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [category, setCategory] = useState<Category>("All");
  const [showAll, setShowAll] = useState(false);
  const [showCategoryIndicator, setShowCategoryIndicator] = useState(false);
  const [categoryProgress, setCategoryProgress] = useState(0);
  const indicatorTimerRef = useRef<number | null>(null);

  const filteredGames = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return games.filter((game) => {
      const matchQuery = game.name.toLowerCase().includes(query);
      const matchCategory =
        category === "All" || (category === "Popular" ? !!game.popular : game.category === category);

      return matchQuery && matchCategory;
    });
  }, [searchQuery, category]);

  const popularGames = filteredGames.filter((game) => game.popular).slice(0, 6);
  const listGames = showAll ? filteredGames : filteredGames.slice(0, 18);

  useEffect(() => {
    return () => {
      if (indicatorTimerRef.current) {
        window.clearTimeout(indicatorTimerRef.current);
      }
    };
  }, []);

  const handleCategoryScroll = (event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget;
    const maxScroll = element.scrollWidth - element.clientWidth;
    const progress = maxScroll > 0 ? (element.scrollLeft / maxScroll) * 100 : 0;

    setCategoryProgress(progress);
    setShowCategoryIndicator(true);

    if (indicatorTimerRef.current) {
      window.clearTimeout(indicatorTimerRef.current);
    }

    indicatorTimerRef.current = window.setTimeout(() => {
      setShowCategoryIndicator(false);
    }, 700);
  };

  return (
    <div className="space-y-5 pb-20 lg:space-y-6 lg:pb-6">
      <Card className="border-border bg-gradient-to-r from-cyan-50 via-slate-50 to-emerald-50 p-4 lg:p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-secondary">
          <Sparkles className="h-3.5 w-3.5" />
          Top up resmi dan instan
        </div>
        <h1 className="text-2xl font-bold leading-tight lg:text-3xl">Game Top-Up</h1>
        <p className="mt-1 text-sm text-muted-foreground">Pilih game, lanjut ke detail, lalu bayar dengan metode favoritmu.</p>
      </Card>

      <div className="sticky top-16 z-50 -mx-1 space-y-3 border-b border-border bg-background px-1 pb-3 pt-1 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Cari game..."
            className="w-full rounded-full border border-border bg-input-background py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="relative">
          <div className="category-tabs-scroll flex gap-2 overflow-x-auto pb-1" onScroll={handleCategoryScroll}>
          {categoryTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setCategory(tab);
                setShowAll(false);
              }}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                category === tab
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {tab}
            </button>
          ))}
          </div>

          {showCategoryIndicator ? (
            <div className="pointer-events-none absolute -bottom-1 left-0 right-0 h-[1px] bg-border/60">
              <div
                className="h-[1px] bg-secondary transition-all duration-150"
                style={{ width: "24%", transform: `translateX(${categoryProgress * 0.76}%)` }}
              />
            </div>
          ) : null}
        </div>
      </div>

      {popularGames.length > 0 ? (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold lg:text-lg">Popular</h2>
            <Badge variant="warning">
              <Flame className="mr-1 h-3 w-3" />
              Banyak dibeli
            </Badge>
          </div>

          <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
            {popularGames.map((game) => (
              <GameTile
                key={`popular-${game.id}`}
                game={game}
                onClick={() => navigate(`/app/entertainment/game-topup/${game.slug}`)}
              />
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold lg:text-lg">Semua game</h2>
          <span className="text-xs text-muted-foreground">{filteredGames.length} game</span>
        </div>

        {listGames.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="font-medium">Game tidak ditemukan</p>
            <p className="mt-1 text-sm text-muted-foreground">Coba kata kunci atau kategori lain.</p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-4 lg:grid-cols-6">
              {listGames.map((game) => (
                <GameTile
                  key={`all-${game.id}`}
                  game={game}
                  onClick={() => navigate(`/app/entertainment/game-topup/${game.slug}`)}
                />
              ))}
            </div>

            {!showAll && filteredGames.length > listGames.length ? (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" onClick={() => setShowAll(true)}>
                  Tampilkan lebih banyak
                </Button>
              </div>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
