import { useEffect, useMemo, useState } from "react";
import { CheckCircle, Mail, Phone, UserRound, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Card } from "../../components/ui/Card";
import { Button } from "../../components/ui/Button";
import { useAuth } from "../../context/AuthContext";

interface SeatCategory {
  name: string;
  price: number;
  available: number;
}

interface Match {
  id: number;
  league: string;
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  date: string;
  time: string;
  categories: SeatCategory[];
}

const matches: Match[] = [
  { id: 1, league: "Liga 1 Indonesia", homeTeam: "Persija Jakarta", awayTeam: "Persib Bandung", stadium: "Gelora Bung Karno Stadium", date: "5 Maret 2026", time: "18:30 WIB", categories: [{ name: "Tribune", price: 75000, available: 200 }, { name: "VIP", price: 250000, available: 50 }, { name: "VVIP", price: 500000, available: 20 }] },
  { id: 2, league: "Liga 1 Indonesia", homeTeam: "Arema FC", awayTeam: "Bali United", stadium: "Kanjuruhan Stadium", date: "8 Maret 2026", time: "15:30 WIB", categories: [{ name: "Tribune", price: 50000, available: 300 }, { name: "VIP", price: 150000, available: 80 }] },
  { id: 3, league: "AFC Champions League", homeTeam: "PSM Makassar", awayTeam: "BG Pathum United", stadium: "Mattoanging Stadium", date: "12 Maret 2026", time: "19:00 WIB", categories: [{ name: "Regular", price: 100000, available: 150 }, { name: "Premium", price: 300000, available: 40 }] },
];

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(amount);
}

export function FootballDetail() {
  const { matchId } = useParams<{ matchId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const match = matches.find((item) => item.id === Number(matchId));

  const [step, setStep] = useState(1);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [ticketQty, setTicketQty] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionCode, setTransactionCode] = useState("");

  useEffect(() => {
    setFullName(user?.name || "");
    setEmail(user?.email || "");
    setPhone(user?.phoneNumber || "");
  }, [user]);

  const selectedCategory = useMemo(() => match?.categories.find((item) => item.name === selectedCategoryName) || null, [match, selectedCategoryName]);
  const emailValid = /\S+@\S+\.\S+/.test(email);
  const phoneValid = /^\+?[0-9]{9,15}$/.test(phone.replace(/\s+/g, ""));
  const nameValid = fullName.trim().length >= 3;
  const formValid = nameValid && emailValid && phoneValid;
  const subtotal = (selectedCategory?.price || 0) * ticketQty;
  const serviceFee = selectedCategory ? 4000 : 0;
  const total = subtotal + serviceFee;
  const canGoStep2 = !!selectedCategory && ticketQty > 0;
  const canGoStep3 = formValid && canGoStep2;

  if (!match) {
    return <Card><p>Pertandingan tidak ditemukan.</p><Button className="mt-3" onClick={() => navigate("/app/entertainment/football")}>Kembali</Button></Card>;
  }

  const increaseQty = (category: SeatCategory) => {
    const isOtherLocked = selectedCategoryName && selectedCategoryName !== category.name && ticketQty > 0;
    if (isOtherLocked) return;
    if (!selectedCategoryName) {
      setSelectedCategoryName(category.name);
      setTicketQty(1);
      return;
    }
    if (selectedCategoryName === category.name) setTicketQty((prev) => Math.min(Math.min(4, category.available), prev + 1));
  };

  const decreaseQty = (category: SeatCategory) => {
    if (selectedCategoryName !== category.name) return;
    setTicketQty((prev) => {
      const next = Math.max(0, prev - 1);
      if (next === 0) setSelectedCategoryName(null);
      return next;
    });
  };

  return (
    <div className="space-y-6 pb-24">
      <Card>
        <h1 className="text-2xl font-bold">{match.homeTeam} vs {match.awayTeam}</h1>
        <p className="text-sm text-muted-foreground">{match.league} • {match.date} • {match.time} • {match.stadium}</p>
      </Card>

      <Card>
        <div className="mb-3 grid grid-cols-3 gap-2">{[1, 2, 3].map((item) => <div key={item} className={`h-2 rounded-full ${step >= item ? "bg-secondary" : "bg-muted"}`} />)}</div>
        <p className="text-xs text-muted-foreground">{step === 1 ? "Pilih kategori dan jumlah" : step === 2 ? "Isi data pembeli" : "Konfirmasi pembayaran"}</p>
      </Card>

      {isSuccess ? <Card className="border-green-200 bg-green-50/70"><div className="flex gap-2"><CheckCircle className="h-5 w-5 text-green-600" /><div><p className="font-medium">E-ticket berhasil diproses</p><p className="text-sm text-muted-foreground">Kode transaksi: {transactionCode}</p><p className="text-sm">E-ticket dikirim ke {email}.</p></div></div></Card> : null}

      {step === 1 ? (
        <Card>
          <h3 className="mb-3 text-lg font-bold">Kategori dan jumlah tiket</h3>
          <div className="space-y-2">
            {match.categories.map((category) => {
              const isSelected = selectedCategoryName === category.name;
              const isDisabled = !!selectedCategoryName && selectedCategoryName !== category.name && ticketQty > 0;
              const rowQty = isSelected ? ticketQty : 0;
              return (
                <div key={category.name} className={`rounded-lg border p-3 ${isSelected ? "border-secondary bg-secondary/5" : "border-border"} ${isDisabled ? "opacity-50" : ""}`}>
                  <div className="mb-2 flex items-center justify-between"><div><p className="font-medium">{category.name}</p><p className="text-xs text-muted-foreground flex items-center gap-1"><Users className="h-3.5 w-3.5" />{category.available} seat</p></div><p className="font-bold text-secondary">{formatCurrency(category.price)}</p></div>
                  <div className="flex items-center justify-between rounded-md border border-border p-2"><p className="text-xs text-muted-foreground">Jumlah</p><div className="flex items-center gap-2"><Button size="sm" variant="outline" disabled={!isSelected || rowQty <= 0} onClick={() => decreaseQty(category)}>-</Button><span className="min-w-8 text-center">{rowQty}</span><Button size="sm" variant="outline" disabled={isDisabled || rowQty >= Math.min(4, category.available)} onClick={() => increaseQty(category)}>+</Button></div></div>
                </div>
              );
            })}
          </div>
        </Card>
      ) : null}

      {step === 2 ? (
        <Card>
          <h3 className="mb-3 text-lg font-bold">Data pembeli</h3>
          <div className="space-y-3">
            <div className="relative"><UserRound className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} className="w-full rounded-lg border border-border bg-input-background py-2.5 pl-10 pr-3 text-sm" placeholder="Nama lengkap" /></div>
            <div className="relative"><Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-lg border border-border bg-input-background py-2.5 pl-10 pr-3 text-sm" placeholder="Email" /></div>
            <div className="relative"><Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} className="w-full rounded-lg border border-border bg-input-background py-2.5 pl-10 pr-3 text-sm" placeholder="Nomor HP" /></div>
          </div>
        </Card>
      ) : null}

      {step === 3 ? (
        <Card>
          <h3 className="mb-3 text-lg font-bold">Konfirmasi</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Kategori</span><span>{selectedCategory?.name}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Jumlah tiket</span><span>{ticketQty}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Biaya layanan</span><span>{formatCurrency(serviceFee)}</span></div>
            <div className="flex justify-between border-t border-border pt-2"><span className="text-muted-foreground">Total</span><span className="font-bold">{formatCurrency(total)}</span></div>
          </div>
        </Card>
      ) : null}

      {!isSuccess ? (
        <div className="hidden gap-2 lg:flex">
          <Button variant="outline" className="w-1/3" disabled={step === 1} onClick={() => setStep((prev) => Math.max(1, prev - 1))}>Kembali</Button>
          {step < 3 ? (
            <Button className="w-2/3" disabled={(step === 1 && !canGoStep2) || (step === 2 && !canGoStep3)} onClick={() => setStep((prev) => Math.min(3, prev + 1))}>Lanjut</Button>
          ) : (
            <Button className="w-2/3" disabled={!canGoStep3} onClick={() => { setTransactionCode(`FB-${Date.now().toString().slice(-8)}`); setIsSuccess(true); }}>Bayar {formatCurrency(total)}</Button>
          )}
        </div>
      ) : null}

      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background/95 p-3 pb-[calc(env(safe-area-inset-bottom)+5px)] backdrop-blur lg:hidden">
        {!isSuccess ? (
          <div className="mx-auto flex w-full max-w-5xl gap-2">
            <Button variant="outline" className="w-1/3" disabled={step === 1} onClick={() => setStep((prev) => Math.max(1, prev - 1))}>Kembali</Button>
            {step < 3 ? (
              <Button className="w-2/3" disabled={(step === 1 && !canGoStep2) || (step === 2 && !canGoStep3)} onClick={() => setStep((prev) => Math.min(3, prev + 1))}>Lanjut</Button>
            ) : (
              <Button className="w-2/3" disabled={!canGoStep3} onClick={() => { setTransactionCode(`FB-${Date.now().toString().slice(-8)}`); setIsSuccess(true); }}>Bayar {formatCurrency(total)}</Button>
            )}
          </div>
        ) : (
          <div className="mx-auto flex w-full max-w-5xl gap-2">
            <Button
              className="w-2/3"
              onClick={() => {
                const content = [
                  "UNIFIBER E-TICKET",
                  `Kode Transaksi: ${transactionCode}`,
                  `Match: ${match.homeTeam} vs ${match.awayTeam}`,
                  `Kategori: ${selectedCategory?.name || "-"}`,
                  `Jumlah Tiket: ${ticketQty}`,
                  `Nama: ${fullName}`,
                  `Email: ${email}`,
                  `No HP: ${phone}`,
                  `Total: ${formatCurrency(total)}`,
                ].join("\n");
                const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = `e-ticket-${transactionCode || "football"}.txt`;
                link.click();
                URL.revokeObjectURL(url);
              }}
            >
              Download e-ticket
            </Button>
            <Button className="w-1/3" variant="outline" onClick={() => navigate("/app")}>Home</Button>
          </div>
        )}
      </div>
    </div>
  );
}
