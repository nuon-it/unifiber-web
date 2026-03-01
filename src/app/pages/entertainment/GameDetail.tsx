import { useEffect, useMemo, useRef, useState, type ComponentType, type RefObject } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  Building2,
  CheckCircle,
  Clock,
  Copy,
  CreditCard,
  Gamepad2,
  Shield,
  Smartphone,
  Star,
  Wallet,
} from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";

interface Game {
  id: string;
  name: string;
  icon: string;
  description: string;
  instructions: string[];
  cashback: number;
}

interface Denomination {
  id: number;
  amount: number;
  currency: string;
  bonus?: string;
  popular?: boolean;
}

interface PaymentMethod {
  id: string;
  name: string;
  description: string;
  fee: number;
  icon: ComponentType<{ className?: string }>;
  eta: string;
}

type PaymentStatus = "idle" | "processing" | "success";

const games: Record<string, Game> = {
  "mobile-legends": {
    id: "mobile-legends",
    name: "Mobile Legends: Bang Bang",
    icon: "🎮",
    description:
      "Top up Diamonds untuk Mobile Legends dan dapatkan hero baru, skin epic, dan battle effects.",
    instructions: [
      "Masukkan User ID dengan benar",
      "Pilih paket Diamonds",
      "Pilih metode pembayaran",
      "Diamonds akan masuk otomatis",
    ],
    cashback: 10,
  },
  "pubg-mobile": {
    id: "pubg-mobile",
    name: "PUBG Mobile",
    icon: "🔫",
    description:
      "Beli UC (Unknown Cash) untuk PUBG Mobile dan unlock royal pass, crates, dan item eksklusif.",
    instructions: [
      "Masukkan Character ID",
      "Pilih jumlah UC",
      "Pilih metode pembayaran",
      "UC akan masuk otomatis dalam 5-10 menit",
    ],
    cashback: 5,
  },
  "free-fire": {
    id: "free-fire",
    name: "Free Fire",
    icon: "🔥",
    description:
      "Isi Diamonds Free Fire untuk beli bundle keren, senjata eksklusif, dan elite pass.",
    instructions: [
      "Masukkan Player ID",
      "Pilih paket Diamonds",
      "Selesaikan pembayaran",
      "Diamonds akan masuk otomatis",
    ],
    cashback: 8,
  },
  "genshin-impact": {
    id: "genshin-impact",
    name: "Genshin Impact",
    icon: "⚔️",
    description:
      "Top up Genesis Crystals untuk Genshin Impact dan dapatkan karakter baru, weapon, serta item premium.",
    instructions: [
      "Masukkan UID",
      "Pilih server di game",
      "Pilih jumlah Genesis Crystals",
      "Selesaikan pembayaran untuk instant top-up",
    ],
    cashback: 5,
  },
};

const gameDenominations: Record<string, Denomination[]> = {
  "mobile-legends": [
    { id: 1, amount: 50000, currency: "86 Diamonds", bonus: "+0", popular: false },
    { id: 2, amount: 100000, currency: "172 Diamonds", bonus: "+5", popular: true },
    { id: 3, amount: 250000, currency: "429 Diamonds", bonus: "+20", popular: true },
    { id: 4, amount: 500000, currency: "858 Diamonds", bonus: "+50", popular: false },
    { id: 5, amount: 1000000, currency: "1716 Diamonds", bonus: "+150", popular: false },
  ],
  "pubg-mobile": [
    { id: 1, amount: 79000, currency: "60 UC", bonus: "+0", popular: false },
    { id: 2, amount: 149000, currency: "120 UC", bonus: "+6", popular: true },
    { id: 3, amount: 299000, currency: "250 UC", bonus: "+25", popular: true },
    { id: 4, amount: 599000, currency: "500 UC", bonus: "+60", popular: false },
    { id: 5, amount: 1199000, currency: "1000 UC", bonus: "+150", popular: false },
  ],
  "free-fire": [
    { id: 1, amount: 14000, currency: "100 Diamonds", bonus: "+0", popular: false },
    { id: 2, amount: 70000, currency: "500 Diamonds", bonus: "+25", popular: true },
    { id: 3, amount: 140000, currency: "1000 Diamonds", bonus: "+100", popular: true },
    { id: 4, amount: 350000, currency: "2500 Diamonds", bonus: "+300", popular: false },
    { id: 5, amount: 700000, currency: "5000 Diamonds", bonus: "+750", popular: false },
  ],
  "genshin-impact": [
    { id: 1, amount: 165000, currency: "980 Genesis Crystals", bonus: "+0", popular: false },
    { id: 2, amount: 330000, currency: "1960 Genesis Crystals", bonus: "+60", popular: true },
    { id: 3, amount: 825000, currency: "4900 Genesis Crystals", bonus: "+300", popular: true },
    { id: 4, amount: 1650000, currency: "9800 Genesis Crystals", bonus: "+800", popular: false },
    { id: 5, amount: 3300000, currency: "19600 Genesis Crystals", bonus: "+2000", popular: false },
  ],
};

const paymentMethods: PaymentMethod[] = [
  {
    id: "qris",
    name: "QRIS",
    description: "Scan dari aplikasi bank atau e-wallet",
    fee: 1500,
    icon: Smartphone,
    eta: "Instan",
  },
  {
    id: "ewallet",
    name: "E-Wallet",
    description: "OVO, GoPay, DANA, ShopeePay",
    fee: 2000,
    icon: Wallet,
    eta: "Instan",
  },
  {
    id: "va",
    name: "Virtual Account",
    description: "BCA, BNI, BRI, Mandiri",
    fee: 4000,
    icon: Building2,
    eta: "1-3 menit",
  },
  {
    id: "card",
    name: "Kartu Kredit / Debit",
    description: "Visa, Mastercard",
    fee: 5000,
    icon: CreditCard,
    eta: "Instan",
  },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function GameDetail() {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [selectedDenomId, setSelectedDenomId] = useState<number | null>(null);
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("idle");
  const [isDenominationLoading, setIsDenominationLoading] = useState(false);
  const [isPaymentMethodLoading, setIsPaymentMethodLoading] = useState(false);
  const [isSummaryLoading, setIsSummaryLoading] = useState(false);

  const denominationRef = useRef<HTMLDivElement | null>(null);
  const paymentMethodRef = useRef<HTMLDivElement | null>(null);

  const game = games[gameId || ""];
  const denominations = gameDenominations[gameId || ""];

  const userIdTrimmed = userId.trim();
  const userIdValid = userIdTrimmed.length >= 5;
  const selectedDenomination = denominations?.find((item) => item.id === selectedDenomId) || null;
  const selectedPaymentMethod = paymentMethods.find((item) => item.id === selectedPaymentId) || null;

  const subtotal = selectedDenomination?.amount || 0;
  const adminFee = selectedPaymentMethod?.fee || 0;
  const total = subtotal + adminFee;
  const cashback = Math.floor((subtotal * (game?.cashback || 0)) / 100);

  const step = useMemo(() => {
    if (!userIdValid) return 1;
    if (!selectedDenomination) return 2;
    if (!selectedPaymentMethod) return 3;
    return 4;
  }, [userIdValid, selectedDenomination, selectedPaymentMethod]);

  const canPay = step === 4 && paymentStatus !== "processing";

  const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    const top = ref.current.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    if (!userIdValid) {
      setIsDenominationLoading(false);
      return;
    }

    setIsDenominationLoading(true);
    const timer = setTimeout(() => setIsDenominationLoading(false), 450);
    return () => clearTimeout(timer);
  }, [userIdValid]);

  useEffect(() => {
    if (!selectedDenomination) {
      setIsPaymentMethodLoading(false);
      return;
    }

    setIsPaymentMethodLoading(true);
    const timer = setTimeout(() => setIsPaymentMethodLoading(false), 450);
    return () => clearTimeout(timer);
  }, [selectedDenomination]);

  useEffect(() => {
    if (!selectedPaymentMethod) {
      setIsSummaryLoading(false);
      return;
    }

    setIsSummaryLoading(true);
    const timer = setTimeout(() => setIsSummaryLoading(false), 350);
    return () => clearTimeout(timer);
  }, [selectedPaymentMethod]);

  useEffect(() => {
    if (!userIdValid || isDenominationLoading) return;
    scrollToSection(denominationRef);
  }, [userIdValid, isDenominationLoading]);

  useEffect(() => {
    if (!selectedDenomination || isPaymentMethodLoading) return;
    scrollToSection(paymentMethodRef);
  }, [selectedDenomination, isPaymentMethodLoading]);

  if (!game || !denominations) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <h2 className="mb-2 text-xl font-bold">Game tidak ditemukan</h2>
          <p className="mb-4 text-sm text-muted-foreground">Silakan pilih game lain dari katalog top up.</p>
          <Button onClick={() => navigate("/app/entertainment/game-topup")}>Kembali ke daftar game</Button>
        </Card>
      </div>
    );
  }

  const handleCopyId = () => {
    if (!userIdTrimmed) return;
    navigator.clipboard.writeText(userIdTrimmed);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handlePay = () => {
    if (!canPay) return;
    setPaymentStatus("processing");
    setTimeout(() => {
      setPaymentStatus("success");
    }, 1400);
  };

  if (paymentStatus === "success") {
    const transactionId = `UF-${Date.now().toString().slice(-9)}`;

    return (
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 pb-24 pt-6 lg:pt-8">
        <Card className="border-green-200 bg-green-50/60 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-1 text-2xl font-bold">Pembayaran berhasil</h1>
          <p className="text-sm text-muted-foreground">Top up sedang diproses dan biasanya masuk dalam 1-5 menit.</p>
        </Card>

        <Card>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Detail transaksi</h2>
            <Badge variant="success">Sukses</Badge>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">ID transaksi</span>
              <span className="font-medium">{transactionId}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Game</span>
              <span className="font-medium">{game.name}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Game ID</span>
              <span className="font-medium">{userIdTrimmed}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Paket</span>
              <span className="font-medium">{selectedDenomination?.currency}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Metode bayar</span>
              <span className="font-medium">{selectedPaymentMethod?.name}</span>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-border pt-3">
              <span className="text-muted-foreground">Total bayar</span>
              <span className="text-base font-bold">{formatCurrency(total)}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Cashback</span>
              <span className="font-medium text-green-600">+{formatCurrency(cashback)}</span>
            </div>
          </div>
        </Card>

        <div className="grid gap-3 sm:grid-cols-2">
          <Button onClick={() => navigate("/app/entertainment/game-topup")}>Kembali ke game top up</Button>
          <Button
            variant="outline"
            onClick={() => {
              setPaymentStatus("idle");
              setSelectedPaymentId(null);
              setSelectedDenomId(null);
            }}
          >
            Top up lagi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-32 lg:pb-10">
      <div className="rounded-2xl border border-border bg-gradient-to-r from-slate-50 via-cyan-50 to-emerald-50 p-4 lg:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm" onClick={() => navigate("/app/entertainment/game-topup")}> 
            <ArrowLeft className="mr-1 h-4 w-4" />
            Kembali
          </Button>
          <Badge variant="info">{game.cashback}% Cashback</Badge>
        </div>

        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/70 bg-white text-2xl shadow-sm">
            {game.icon}
          </div>
          <div>
            <h1 className="text-xl font-bold lg:text-2xl">{game.name}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{game.description}</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className={`h-2 rounded-full ${step >= item ? "bg-secondary" : "bg-muted"}`} />
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="space-y-5 lg:col-span-7">
          <Card className="p-5">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">1. Masukkan Game ID</h2>
                <p className="text-sm text-muted-foreground">Pastikan ID benar agar top up tidak gagal.</p>
              </div>
              <Badge variant={userIdValid ? "success" : "default"}>{userIdValid ? "Valid" : "Wajib"}</Badge>
            </div>

            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  placeholder={`Masukkan ID akun ${game.name}`}
                  className="w-full rounded-lg border border-border bg-input-background px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
                />
                {userIdTrimmed ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2"
                    onClick={handleCopyId}
                  >
                    {copied ? <CheckCircle className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                  </Button>
                ) : null}
              </div>
              {!userIdValid && userIdTrimmed.length > 0 ? (
                <p className="text-xs text-red-600">ID minimal 5 karakter.</p>
              ) : (
                <p className="text-xs text-muted-foreground">ID tersimpan aman dan hanya dipakai untuk proses top up.</p>
              )}
            </div>
          </Card>

          <div ref={denominationRef}>
            <Card className={`p-5 transition-opacity ${userIdValid ? "opacity-100" : "opacity-60"}`}>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">2. Pilih Nominal</h2>
                <p className="text-sm text-muted-foreground">Pilih paket yang sesuai kebutuhan kamu.</p>
              </div>
              <Badge variant="info">
                <Clock className="mr-1 h-3 w-3" />
                Proses instan
              </Badge>
            </div>

            {isDenominationLoading ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="rounded-xl border border-border p-4">
                    <div className="mb-3 h-4 w-3/5 animate-pulse rounded bg-muted" />
                    <div className="h-6 w-1/2 animate-pulse rounded bg-muted" />
                    <div className="mt-2 h-3 w-1/3 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid gap-3 sm:grid-cols-2">
                {denominations.map((denom) => {
                  const active = selectedDenomId === denom.id;
                  const disabled = !userIdValid;

                  return (
                    <button
                      key={denom.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => {
                        setSelectedDenomId(denom.id);
                        setSelectedPaymentId(null);
                      }}
                      className={`rounded-xl border p-4 text-left transition ${
                        active
                          ? "border-secondary bg-secondary/5 shadow-sm"
                          : "border-border hover:border-secondary/40"
                      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                    >
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Gamepad2 className="h-4 w-4 text-secondary" />
                          <span className="text-sm font-semibold">{denom.currency}</span>
                        </div>
                        {denom.popular ? (
                          <Badge variant="warning">
                            <Star className="mr-1 h-3 w-3" />
                            Favorit
                          </Badge>
                        ) : null}
                      </div>
                      <p className="text-lg font-bold">{formatCurrency(denom.amount)}</p>
                      {denom.bonus && denom.bonus !== "+0" ? (
                        <p className="mt-1 text-xs text-green-700">Bonus {denom.bonus}</p>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            )}
            </Card>
          </div>

          <div ref={paymentMethodRef}>
            <Card className={`p-5 transition-opacity ${selectedDenomination ? "opacity-100" : "opacity-60"}`}>
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold">3. Pilih Metode Bayar</h2>
                <p className="text-sm text-muted-foreground">Transaksi aman dengan verifikasi otomatis.</p>
              </div>
              <Badge variant="success">
                <Shield className="mr-1 h-3 w-3" />
                Aman
              </Badge>
            </div>

            {isPaymentMethodLoading ? (
              <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="rounded-xl border border-border p-3">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 animate-pulse rounded-lg bg-muted" />
                        <div className="space-y-2">
                          <div className="h-3 w-24 animate-pulse rounded bg-muted" />
                          <div className="h-3 w-40 animate-pulse rounded bg-muted" />
                        </div>
                      </div>
                      <div className="space-y-2 text-right">
                        <div className="h-3 w-16 animate-pulse rounded bg-muted" />
                        <div className="h-3 w-14 animate-pulse rounded bg-muted" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  const active = selectedPaymentId === method.id;
                  const disabled = !selectedDenomination;

                  return (
                    <button
                      key={method.id}
                      type="button"
                      disabled={disabled}
                      onClick={() => setSelectedPaymentId(method.id)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        active
                          ? "border-secondary bg-secondary/5"
                          : "border-border hover:border-secondary/40"
                      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="rounded-lg bg-muted p-2">
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold">{method.name}</p>
                            <p className="text-xs text-muted-foreground">{method.description}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-muted-foreground">Biaya admin</p>
                          <p className="text-sm font-semibold">{formatCurrency(method.fee)}</p>
                          <p className="text-xs text-muted-foreground">{method.eta}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
            </Card>
          </div>

          <Card className={`p-5 transition-opacity ${step === 4 ? "opacity-100" : "opacity-60"}`}>
            <h2 className="mb-1 text-lg font-bold">4. Konfirmasi dan Bayar</h2>
            <p className="mb-4 text-sm text-muted-foreground">Pastikan detail pesanan sudah benar sebelum lanjut.</p>

            <ul className="space-y-2 text-sm">
              {game.instructions.map((instruction, index) => (
                <li key={instruction} className="flex items-start gap-2">
                  <span className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-secondary text-xs text-secondary-foreground">
                    {index + 1}
                  </span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <Card className="sticky top-24 p-5">
            <h3 className="mb-4 text-lg font-bold">Ringkasan Pembayaran</h3>

            {isSummaryLoading || paymentStatus === "processing" ? (
              <div className="space-y-3 text-sm">
                {Array.from({ length: 7 }).map((_, index) => (
                  <div key={index} className="flex items-center justify-between gap-3">
                    <div className="h-3 w-20 animate-pulse rounded bg-muted" />
                    <div className="h-3 w-28 animate-pulse rounded bg-muted" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Game</span>
                  <span className="font-medium">{game.name}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Game ID</span>
                  <span className="font-medium">{userIdValid ? userIdTrimmed : "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Paket</span>
                  <span className="font-medium">{selectedDenomination?.currency || "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Metode</span>
                  <span className="font-medium">{selectedPaymentMethod?.name || "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{subtotal ? formatCurrency(subtotal) : "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Biaya admin</span>
                  <span className="font-medium">{selectedPaymentMethod ? formatCurrency(adminFee) : "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-3 border-t border-border pt-3">
                  <span className="text-muted-foreground">Total bayar</span>
                  <span className="text-base font-bold">{total ? formatCurrency(total) : "-"}</span>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-muted-foreground">Cashback</span>
                  <span className="font-medium text-green-600">{subtotal ? `+${formatCurrency(cashback)}` : "-"}</span>
                </div>
              </div>
            )}

            <div className="mt-5 space-y-3">
              <Button onClick={handlePay} disabled={!canPay} size="lg" className="w-full">
                {paymentStatus === "processing" ? "Memproses pembayaran..." : "Bayar sekarang"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">Dengan melanjutkan, kamu menyetujui ketentuan transaksi digital.</p>
            </div>
          </Card>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 p-3 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden">
        <div className="mx-auto max-w-4xl">
          <Button onClick={handlePay} disabled={!canPay} size="lg" className="w-full">
            {paymentStatus === "processing"
              ? "Memproses pembayaran..."
              : total
                ? `Bayar ${formatCurrency(total)}`
                : "Lengkapi data pembayaran"}
          </Button>
        </div>
      </div>
    </div>
  );
}
