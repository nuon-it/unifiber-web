import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import { useNavigate, useParams } from "react-router";
import { ArrowLeft, CheckCircle, Clock, CreditCard, Shield, Smartphone, Wallet } from "lucide-react";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { lifestyleItems } from "./lifestyleCatalog";

type Status = "idle" | "processing" | "success";

const paymentMethods = [
  { id: "qris", name: "QRIS", fee: 1500, icon: Smartphone },
  { id: "ewallet", name: "E-Wallet", fee: 2000, icon: Wallet },
  { id: "card", name: "Kartu Kredit/Debit", fee: 4500, icon: CreditCard },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function LifestyleDetail() {
  const { lifestyleSlug } = useParams<{ lifestyleSlug: string }>();
  const navigate = useNavigate();

  const item = lifestyleItems.find((entry) => entry.slug === lifestyleSlug);
  const [accountId, setAccountId] = useState("");
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(null);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  const packageSectionRef = useRef<HTMLDivElement | null>(null);
  const paymentSectionRef = useRef<HTMLDivElement | null>(null);
  const summarySectionRef = useRef<HTMLDivElement | null>(null);

  if (!item) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md text-center">
          <h2 className="mb-2 text-xl font-bold">Produk tidak ditemukan</h2>
          <p className="mb-4 text-sm text-muted-foreground">Silakan kembali ke katalog digital lifestyle.</p>
          <Button onClick={() => navigate("/app/entertainment/vouchers")}>Kembali ke katalog</Button>
        </Card>
      </div>
    );
  }

  const selectedPackage = item.packages.find((entry) => entry.id === selectedPackageId);
  const selectedMethod = paymentMethods.find((entry) => entry.id === selectedMethodId);
  const subtotal = selectedPackage?.price || 0;
  const fee = selectedMethod?.fee || 0;
  const total = subtotal + fee;
  const accountValid = accountId.trim().length >= 4;

  const step = useMemo(() => {
    if (!accountValid) return 1;
    if (!selectedPackage) return 2;
    if (!selectedMethod) return 3;
    return 4;
  }, [accountValid, selectedMethod, selectedPackage]);

  const scrollToSection = (ref: RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;
    const top = ref.current.getBoundingClientRect().top + window.scrollY - 92;
    window.scrollTo({ top, behavior: "smooth" });
  };

  useEffect(() => {
    if (!accountValid) return;
    scrollToSection(packageSectionRef);
  }, [accountValid]);

  useEffect(() => {
    if (!selectedPackage) return;
    scrollToSection(paymentSectionRef);
  }, [selectedPackage]);

  useEffect(() => {
    if (!selectedMethod) return;
    scrollToSection(summarySectionRef);
  }, [selectedMethod]);

  const handlePay = () => {
    if (step !== 4) return;
    setStatus("processing");
    setTimeout(() => setStatus("success"), 1200);
  };

  if (status === "success") {
    return (
      <div className="mx-auto w-full max-w-2xl space-y-5 px-4 pb-24 pt-6 lg:pt-8">
        <Card className="border-green-200 bg-green-50/70 text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-7 w-7 text-green-600" />
          </div>
          <h1 className="text-xl font-bold">Pembayaran berhasil</h1>
          <p className="mt-1 text-sm text-muted-foreground">Produk digital kamu sedang diproses dan akan dikirim otomatis.</p>
        </Card>

        <Card>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Produk</span><span>{item.name}</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Akun/Tujuan</span><span>{accountId.trim()}</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Paket</span><span>{selectedPackage?.label}</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Metode bayar</span><span>{selectedMethod?.name}</span></div>
            <div className="flex items-center justify-between border-t border-border pt-2"><span className="text-muted-foreground">Total</span><span className="font-bold">{formatCurrency(total)}</span></div>
          </div>
        </Card>

        <Button className="w-full" onClick={() => navigate("/app/entertainment/vouchers")}>Kembali ke Digital Lifestyle</Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 pb-28 lg:pb-8">
      <Card className="border-border bg-gradient-to-r from-amber-50 via-orange-50 to-rose-50 p-4 lg:p-5">
        <Button variant="ghost" size="sm" onClick={() => navigate("/app/entertainment/vouchers")}> 
          <ArrowLeft className="mr-1 h-4 w-4" />Kembali
        </Button>
        <div className="mt-2 flex items-center gap-3">
          <img
            src={item.image}
            alt={item.name}
            className="h-14 w-14 rounded-lg object-cover"
            onError={(event) => {
              event.currentTarget.src = "https://static.upoint.id/images/icons/logo.png";
            }}
          />
          <div>
            <h1 className="text-xl font-bold">{item.name}</h1>
            <p className="text-sm text-muted-foreground">Digital lifestyle • proses cepat</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-7">
          <Card>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">1. Isi data akun</h2>
              <Badge variant={accountValid ? "success" : "default"}>{accountValid ? "Valid" : "Wajib"}</Badge>
            </div>
            <input
              type="text"
              value={accountId}
              onChange={(event) => setAccountId(event.target.value)}
              placeholder="Email / nomor akun / nomor tujuan"
              className="w-full rounded-lg border border-border bg-input-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </Card>

          <div ref={packageSectionRef}>
          <Card className={accountValid ? "opacity-100" : "opacity-60"}>
            <h2 className="mb-3 text-lg font-bold">2. Pilih paket</h2>
            <div className="space-y-2">
              {item.packages.map((pkg) => (
                <button
                  key={pkg.id}
                  type="button"
                  disabled={!accountValid}
                  onClick={() => {
                    setSelectedPackageId(pkg.id);
                    setSelectedMethodId(null);
                  }}
                  className={`w-full rounded-lg border p-3 text-left transition ${
                    selectedPackageId === pkg.id ? "border-secondary bg-secondary/5" : "border-border"
                  } ${!accountValid ? "cursor-not-allowed" : "hover:border-secondary/50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{pkg.label}</p>
                      {pkg.discount ? <p className="text-xs text-green-700">Diskon {pkg.discount}%</p> : null}
                    </div>
                    <div className="text-right">
                      {pkg.popular ? <Badge variant="warning">Favorit</Badge> : null}
                      <p className="mt-1 text-sm font-bold">{formatCurrency(pkg.price)}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>
          </div>

          <div ref={paymentSectionRef}>
          <Card className={selectedPackage ? "opacity-100" : "opacity-60"}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">3. Pilih metode bayar</h2>
              <Badge variant="success"><Shield className="mr-1 h-3 w-3" />Aman</Badge>
            </div>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    type="button"
                    disabled={!selectedPackage}
                    onClick={() => setSelectedMethodId(method.id)}
                    className={`w-full rounded-lg border p-3 text-left transition ${
                      selectedMethodId === method.id ? "border-secondary bg-secondary/5" : "border-border"
                    } ${!selectedPackage ? "cursor-not-allowed" : "hover:border-secondary/50"}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{method.name}</span>
                      </div>
                      <span className="text-sm">{formatCurrency(method.fee)}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </Card>
          </div>
        </div>

        <div ref={summarySectionRef} className="lg:col-span-5">
          <Card className="sticky top-24">
            <h3 className="mb-4 text-lg font-bold">Ringkasan</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Paket</span><span>{selectedPackage?.label || "-"}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Subtotal</span><span>{subtotal ? formatCurrency(subtotal) : "-"}</span></div>
              <div className="flex items-center justify-between"><span className="text-muted-foreground">Biaya admin</span><span>{selectedMethod ? formatCurrency(fee) : "-"}</span></div>
              <div className="flex items-center justify-between border-t border-border pt-2"><span className="text-muted-foreground">Total</span><span className="text-base font-bold">{total ? formatCurrency(total) : "-"}</span></div>
            </div>

            <Button className="mt-4 w-full" size="lg" disabled={step !== 4 || status === "processing"} onClick={handlePay}>
              {status === "processing" ? <><Clock className="mr-2 h-4 w-4" />Memproses...</> : "Bayar sekarang"}
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
