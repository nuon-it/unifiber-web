import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { BookOpenText, Headphones, Search, Sparkles, Tv, WalletCards } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { lifestyleItems, type LifestyleCategory } from "./lifestyleCatalog";

const categoryTabs: ("All" | LifestyleCategory)[] = [
  "All",
  "Streaming",
  "Voucher",
  "Audio",
  "Reading",
  "Kids",
  "Social",
  "Utility",
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

function BenefitsStrip() {
  return (
    <Card>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          <div className="rounded-full bg-orange-100 p-2">
            <Tv className="h-4 w-4 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Instant Delivery</p>
            <p className="text-xs text-muted-foreground">Kode masuk dalam hitungan menit</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          <div className="rounded-full bg-cyan-100 p-2">
            <WalletCards className="h-4 w-4 text-cyan-700" />
          </div>
          <div>
            <p className="text-sm font-medium">Metode Pembayaran Lengkap</p>
            <p className="text-xs text-muted-foreground">QRIS, e-wallet, VA, dan kartu</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-border p-3">
          <div className="rounded-full bg-emerald-100 p-2">
            <Headphones className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <p className="text-sm font-medium">Support 24/7</p>
            <p className="text-xs text-muted-foreground">Bantuan cepat jika ada kendala</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export function Vouchers() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<"All" | LifestyleCategory>("All");
  const [showAll, setShowAll] = useState(false);

  const filteredItems = useMemo(() => {
    const query = searchTerm.toLowerCase();

    return lifestyleItems.filter((item) => {
      const matchQuery = item.name.toLowerCase().includes(query);
      const matchCategory = activeCategory === "All" ? true : item.category === activeCategory;
      return matchQuery && matchCategory;
    });
  }, [activeCategory, searchTerm]);

  const popularItems = filteredItems.filter((item) => item.popular).slice(0, 6);
  const listItems = showAll ? filteredItems : filteredItems.slice(0, 12);

  return (
    <div className="space-y-5 pb-20 lg:space-y-6 lg:pb-6">
      <Card className="border-border bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 p-4 lg:p-6">
        <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-secondary">
          <Sparkles className="h-3.5 w-3.5" />
          Pilihan digital lifestyle lengkap
        </div>
        <h1 className="text-2xl font-bold leading-tight lg:text-3xl">Digital Lifestyle</h1>
        <p className="mt-1 text-sm text-muted-foreground">Streaming, voucher, audio, reading, dan kebutuhan digital harian dalam satu tempat.</p>
      </Card>

      <div className="sticky top-16 z-50 -mx-1 space-y-3 border-b border-border bg-background px-1 pb-3 pt-1 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Cari produk digital..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setShowAll(false);
            }}
            className="w-full rounded-full border border-border bg-input-background py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="category-tabs-scroll flex gap-2 overflow-x-auto pb-1">
          {categoryTabs.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setActiveCategory(category);
                setShowAll(false);
              }}
              className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                activeCategory === category
                  ? "border-secondary bg-secondary text-secondary-foreground"
                  : "border-border bg-background text-muted-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="hidden lg:block">
        <BenefitsStrip />
      </div>

      {popularItems.length > 0 ? (
        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-base font-bold lg:text-lg">Pilihan populer</h2>
            <Badge variant="warning">Hot</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {popularItems.map((item) => (
              <Card key={`popular-${item.id}`} className="overflow-hidden p-0">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={item.image}
                    alt={item.name}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(event) => {
                      event.currentTarget.src = "https://static.upoint.id/images/icons/logo.png";
                    }}
                  />
                  {item.cashback ? (
                    <span className="absolute right-2 top-2 rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-semibold text-white">
                      {item.cashback}%
                    </span>
                  ) : null}
                </div>

                <div className="space-y-2 p-3">
                  <div>
                    <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">Mulai {formatCurrency(item.packages[0].price)}</p>
                  </div>

                  <Button size="sm" className="w-full" onClick={() => navigate(`/app/entertainment/vouchers/${item.slug}`)}>
                    Pilih produk
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-bold lg:text-lg">Semua produk</h2>
          <div className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <BookOpenText className="h-3.5 w-3.5" />
            {filteredItems.length} item
          </div>
        </div>

        {listItems.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="font-medium">Produk tidak ditemukan</p>
            <p className="mt-1 text-sm text-muted-foreground">Coba kata kunci atau kategori lain.</p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {listItems.map((item) => (
                <Card key={item.id} className="overflow-hidden p-0">
                  <div className="relative aspect-video bg-muted">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = "https://static.upoint.id/images/icons/logo.png";
                      }}
                    />
                  </div>

                  <div className="space-y-2 p-3">
                    <div>
                      <p className="line-clamp-1 text-sm font-semibold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.category}</p>
                      <p className="text-sm font-medium text-secondary">Mulai {formatCurrency(item.packages[0].price)}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={() => navigate(`/app/entertainment/vouchers/${item.slug}`)}
                    >
                      Lihat paket
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {!showAll && filteredItems.length > listItems.length ? (
              <div className="mt-4 flex justify-center">
                <Button variant="outline" size="sm" onClick={() => setShowAll(true)}>
                  Tampilkan lebih banyak
                </Button>
              </div>
            ) : null}
          </>
        )}
      </section>

      <div className="lg:hidden">
        <BenefitsStrip />
      </div>
    </div>
  );
}
