export type LifestyleCategory =
  | "Streaming"
  | "Voucher"
  | "Audio"
  | "Reading"
  | "Kids"
  | "Social"
  | "Utility";

export interface LifestylePackage {
  id: string;
  label: string;
  price: number;
  discount?: number;
  popular?: boolean;
}

export interface LifestyleItem {
  id: number;
  slug: string;
  name: string;
  image: string;
  category: LifestyleCategory;
  cashback?: number;
  popular?: boolean;
  packages: LifestylePackage[];
}

export const lifestyleItems: LifestyleItem[] = [
  {
    id: 1,
    slug: "vidio",
    name: "Vidio",
    image: "https://static.upoint.id/images/contents/video.jpg",
    category: "Streaming",
    popular: true,
    cashback: 5,
    packages: [
      { id: "v1", label: "Platinum 30 Hari", price: 39000 },
      { id: "v2", label: "Platinum + Premier 30 Hari", price: 69000, popular: true },
      { id: "v3", label: "Platinum 12 Bulan", price: 269000, discount: 10 },
    ],
  },
  {
    id: 2,
    slug: "viu",
    name: "VIU",
    image: "https://static.upoint.id/images/contents/viu.jpg",
    category: "Streaming",
    popular: true,
    packages: [
      { id: "vi1", label: "Premium 1 Bulan", price: 30000 },
      { id: "vi2", label: "Premium 3 Bulan", price: 75000, popular: true },
      { id: "vi3", label: "Premium 12 Bulan", price: 249000, discount: 8 },
    ],
  },
  {
    id: 3,
    slug: "google-play",
    name: "Google Play",
    image: "https://static.upoint.id/images/contents/googleplay-storenew.jpg",
    category: "Voucher",
    popular: true,
    packages: [
      { id: "gp1", label: "Voucher 20.000", price: 20000 },
      { id: "gp2", label: "Voucher 50.000", price: 50000, popular: true },
      { id: "gp3", label: "Voucher 100.000", price: 100000 },
    ],
  },
  {
    id: 4,
    slug: "steam-wallet",
    name: "Steam Wallet",
    image: "https://static.upoint.id/images/contents/steam-storenew.jpg",
    category: "Voucher",
    packages: [
      { id: "sw1", label: "IDR 60.000", price: 60000 },
      { id: "sw2", label: "IDR 120.000", price: 120000, popular: true },
      { id: "sw3", label: "IDR 250.000", price: 250000 },
    ],
  },
  {
    id: 5,
    slug: "playstation-store-gift-card",
    name: "PlayStation Store Gift Card",
    image: "https://static.upoint.id/images/contents/psn_shadow.jpg",
    category: "Voucher",
    packages: [
      { id: "ps1", label: "US$10", price: 165000 },
      { id: "ps2", label: "US$20", price: 330000, popular: true },
      { id: "ps3", label: "US$50", price: 825000 },
    ],
  },
  {
    id: 6,
    slug: "langit-musik",
    name: "Langit Musik",
    image: "https://static.upoint.id/images/contents/langit_musik.jpg",
    category: "Audio",
    packages: [
      { id: "lm1", label: "Premium 30 Hari", price: 28000 },
      { id: "lm2", label: "Premium 90 Hari", price: 70000, popular: true },
      { id: "lm3", label: "Premium 365 Hari", price: 240000, discount: 12 },
    ],
  },
  {
    id: 7,
    slug: "noice",
    name: "NOICE",
    image: "https://static.upoint.id/images/contents/noice.png",
    category: "Audio",
    packages: [
      { id: "n1", label: "Premium 30 Hari", price: 25000 },
      { id: "n2", label: "Premium 90 Hari", price: 68000, popular: true },
      { id: "n3", label: "Premium 180 Hari", price: 120000 },
    ],
  },
  {
    id: 8,
    slug: "qaraa",
    name: "Qara'a",
    image: "https://static.upoint.id/images/contents/qaraa.jpg",
    category: "Reading",
    popular: true,
    packages: [
      { id: "q1", label: "Premium 1 Bulan", price: 19900 },
      { id: "q2", label: "Premium 3 Bulan", price: 54000, popular: true },
      { id: "q3", label: "Premium 12 Bulan", price: 185000, discount: 10 },
    ],
  },
  {
    id: 9,
    slug: "webtoon",
    name: "WEBTOON",
    image: "https://static.upoint.id/images/contents/webtoon.jpg",
    category: "Reading",
    packages: [
      { id: "w1", label: "Coin Pack Kecil", price: 15000 },
      { id: "w2", label: "Coin Pack Sedang", price: 50000, popular: true },
      { id: "w3", label: "Coin Pack Besar", price: 100000 },
    ],
  },
  {
    id: 10,
    slug: "tiktok-live-coins",
    name: "TikTok LIVE Coins",
    image: "https://static.upoint.id/images/contents/tiktok.png",
    category: "Social",
    popular: true,
    packages: [
      { id: "tt1", label: "70 Coins", price: 18000 },
      { id: "tt2", label: "350 Coins", price: 85000, popular: true },
      { id: "tt3", label: "700 Coins", price: 165000 },
    ],
  },
  {
    id: 11,
    slug: "iota-kids-premium",
    name: "IOTA Kids Premium",
    image: "https://static.upoint.id/images/contents/iota.jpg",
    category: "Kids",
    packages: [
      { id: "ik1", label: "Premium 1 Bulan", price: 24900 },
      { id: "ik2", label: "Premium 3 Bulan", price: 69000, popular: true },
      { id: "ik3", label: "Premium 12 Bulan", price: 225000, discount: 12 },
    ],
  },
  {
    id: 12,
    slug: "wifi-id",
    name: "wifi.id",
    image: "https://static.upoint.id/images/contents/wifiid.jpg",
    category: "Utility",
    packages: [
      { id: "wf1", label: "1 Hari", price: 5000 },
      { id: "wf2", label: "7 Hari", price: 25000, popular: true },
      { id: "wf3", label: "30 Hari", price: 70000 },
    ],
  },
];
