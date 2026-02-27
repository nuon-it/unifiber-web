import { useState } from "react";
import { Search, Gift } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

const voucherCategories = [
  {
    name: "Streaming Services",
    vouchers: [
      { id: 1, name: "Netflix", price: 54000, duration: "1 Month - Mobile", discount: 10 },
      { id: 2, name: "Netflix", price: 120000, duration: "1 Month - Basic", discount: 0 },
      { id: 3, name: "Spotify Premium", price: 54900, duration: "1 Month", discount: 15 },
      { id: 4, name: "Disney+ Hotstar", price: 39000, duration: "1 Month", discount: 0 },
    ],
  },
  {
    name: "Gaming Platforms",
    vouchers: [
      { id: 5, name: "Steam Wallet", price: 60000, duration: "IDR 60,000", discount: 0 },
      { id: 6, name: "Steam Wallet", price: 120000, duration: "IDR 120,000", discount: 5 },
      { id: 7, name: "PlayStation Plus", price: 85000, duration: "1 Month", discount: 10 },
      { id: 8, name: "Xbox Game Pass", price: 49000, duration: "1 Month", discount: 0 },
    ],
  },
  {
    name: "E-Commerce",
    vouchers: [
      { id: 9, name: "Tokopedia", price: 50000, duration: "IDR 50,000", discount: 0 },
      { id: 10, name: "Shopee", price: 100000, duration: "IDR 100,000", discount: 5 },
      { id: 11, name: "Grab", price: 50000, duration: "IDR 50,000", discount: 0 },
      { id: 12, name: "Gojek", price: 100000, duration: "IDR 100,000", discount: 0 },
    ],
  },
];

export function Vouchers() {
  const [searchTerm, setSearchTerm] = useState("");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Desktop Header */}
      <div className="hidden lg:block">
        <h1 className="text-3xl font-bold mb-2">Digital Vouchers</h1>
        <p className="text-muted-foreground">Beli voucher untuk streaming, gaming & lebih banyak lagi</p>
      </div>

      {/* Promo Banner */}
      <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white border-0">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
            <Gift className="w-8 h-8" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold mb-1">Special Offer!</h3>
            <p className="text-sm text-white/80">Get up to 15% off on selected vouchers</p>
          </div>
        </div>
      </Card>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search vouchers..."
          className="w-full px-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Voucher Categories */}
      {voucherCategories.map((category, idx) => (
        <div key={idx}>
          <h2 className="text-lg font-bold mb-4">{category.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.vouchers
              .filter((voucher) =>
                voucher.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((voucher) => (
                <Card key={voucher.id} className="hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{voucher.name}</h3>
                      <p className="text-sm text-muted-foreground">{voucher.duration}</p>
                    </div>
                    {voucher.discount > 0 && (
                      <Badge variant="error" className="bg-red-500 text-white">
                        {voucher.discount}% OFF
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-end justify-between">
                    <div>
                      {voucher.discount > 0 ? (
                        <>
                          <p className="text-sm text-muted-foreground line-through">
                            {formatCurrency(voucher.price)}
                          </p>
                          <p className="text-xl font-bold text-secondary">
                            {formatCurrency(calculateDiscountedPrice(voucher.price, voucher.discount))}
                          </p>
                        </>
                      ) : (
                        <p className="text-xl font-bold text-secondary">
                          {formatCurrency(voucher.price)}
                        </p>
                      )}
                    </div>
                    <Button size="sm">
                      Buy Now
                    </Button>
                  </div>
                </Card>
              ))}
          </div>
        </div>
      ))}

      {/* Info */}
      <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
        <div className="flex items-start gap-3">
          <Gift className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium mb-1 text-blue-900 dark:text-blue-100">How It Works</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Purchase your voucher and receive the code instantly. Redeem it on the respective platform. Codes are valid for 1 year unless stated otherwise.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}