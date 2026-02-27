import { useState } from "react";
import { MapPin, Calendar, CheckCircle, Clock, Package, User, Phone, Mail, Home, ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

const packages = [
  { 
    id: 1, 
    name: "Basic Fiber", 
    speed: "100 Mbps", 
    price: 199000, 
    popular: false,
    features: ["Unlimited data", "24/7 support", "Free installation", "1 WiFi router"]
  },
  { 
    id: 2, 
    name: "Standard Fiber", 
    speed: "500 Mbps", 
    price: 349000, 
    popular: true,
    features: ["Unlimited data", "24/7 priority support", "Free installation", "2 WiFi routers", "Free Nuon streaming 3 bulan"]
  },
  { 
    id: 3, 
    name: "Premium Fiber", 
    speed: "1 Gbps", 
    price: 499000, 
    popular: true,
    features: ["Unlimited data", "VIP 24/7 support", "Free installation", "3 WiFi mesh routers", "Free Nuon streaming 6 bulan", "500 rewards points/bulan"]
  },
  { 
    id: 4, 
    name: "Ultra Fiber", 
    speed: "2 Gbps", 
    price: 799000, 
    popular: false,
    features: ["Unlimited data", "Dedicated support line", "Premium installation", "5 WiFi mesh routers", "Free Nuon streaming 12 bulan", "1000 rewards points/bulan", "Priority entertainment access"]
  },
];

const timeSlots = [
  { id: 1, time: "09:00 - 12:00", available: true },
  { id: 2, time: "12:00 - 15:00", available: true },
  { id: 3, time: "15:00 - 18:00", available: false },
];

type Step = "coverage" | "package" | "personal-info" | "schedule" | "review" | "tracking";

interface FormData {
  address: string;
  city: string;
  postalCode: string;
  selectedPackage: number | null;
  fullName: string;
  email: string;
  phoneNumber: string;
  alternatePhone: string;
  installDate: string;
  installTime: string;
  notes: string;
}

export function Installation() {
  const { user, updateUserSubscription } = useAuth();
  const [currentStep, setCurrentStep] = useState<Step>(user?.isSubscribed ? "tracking" : "coverage");
  const [coverageChecked, setCoverageChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    address: "",
    city: "",
    postalCode: "",
    selectedPackage: null,
    fullName: user?.name || "",
    email: "",
    phoneNumber: user?.phoneNumber || "",
    alternatePhone: "",
    installDate: "",
    installTime: "",
    notes: "",
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const checkCoverage = () => {
    if (formData.address && formData.city && formData.postalCode) {
      setCoverageChecked(true);
      setTimeout(() => setCurrentStep("package"), 500);
    }
  };

  const selectPackage = (packageId: number) => {
    setFormData({ ...formData, selectedPackage: packageId });
    setTimeout(() => setCurrentStep("personal-info"), 300);
  };

  const submitPersonalInfo = () => {
    if (formData.fullName && formData.email && formData.phoneNumber) {
      setCurrentStep("schedule");
    }
  };

  const submitSchedule = () => {
    if (formData.installDate && formData.installTime) {
      setCurrentStep("review");
    }
  };

  const confirmOrder = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      const selectedPkg = packages.find(p => p.id === formData.selectedPackage);
      if (selectedPkg && updateUserSubscription) {
        updateUserSubscription({
          isSubscribed: true,
          plan: selectedPkg.name,
          installationDate: formData.installDate,
          customerId: `UNI-${Date.now().toString().slice(-8)}`,
        });
      }
      setIsSubmitting(false);
      setCurrentStep("tracking");
    }, 2000);
  };

  const selectedPackage = packages.find(p => p.id === formData.selectedPackage);

  // Tracking view for subscribed users
  if (currentStep === "tracking" && user?.isSubscribed) {
    return (
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Installation Tracking</h1>
          <p className="text-muted-foreground">Monitor status instalasi Anda</p>
        </div>

        {/* Success Message */}
        <Card className="bg-gradient-to-br from-green-500 to-emerald-500 text-white border-0">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-1">Pesanan Berhasil!</h2>
              <p className="text-white/90">Tim teknisi kami akan segera menghubungi Anda</p>
            </div>
          </div>
        </Card>

        {/* Order Details */}
        <Card>
          <h3 className="text-lg font-bold mb-4">Detail Pesanan</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Order ID</span>
              <span className="font-medium">{user.customerId}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Paket</span>
              <span className="font-medium">{user.plan}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-border">
              <span className="text-muted-foreground">Jadwal Instalasi</span>
              <span className="font-medium">{user.installationDate || "Akan dikonfirmasi"}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-muted-foreground">Status</span>
              <Badge variant="info">Menunggu Konfirmasi</Badge>
            </div>
          </div>
        </Card>

        {/* Installation Progress */}
        <Card>
          <h3 className="text-lg font-bold mb-6">Progress Instalasi</h3>
          <div className="space-y-6">
            {[
              { title: "Pesanan Diterima", status: "completed", desc: "Pesanan Anda sedang diproses" },
              { title: "Verifikasi Coverage", status: "current", desc: "Memverifikasi ketersediaan layanan" },
              { title: "Penjadwalan Teknisi", status: "pending", desc: "Teknisi akan menghubungi Anda" },
              { title: "Instalasi", status: "pending", desc: "Pemasangan perangkat fiber" },
              { title: "Aktivasi", status: "pending", desc: "Internet siap digunakan" },
            ].map((step, index) => (
              <div key={index} className="relative flex items-start gap-4">
                {index < 4 && (
                  <div className={`absolute left-5 top-12 w-0.5 h-12 ${
                    step.status === "completed" ? "bg-secondary" : "bg-border"
                  }`} />
                )}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.status === "completed"
                    ? "bg-secondary text-white"
                    : step.status === "current"
                    ? "bg-secondary/20 text-secondary border-2 border-secondary"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {step.status === "completed" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : step.status === "current" ? (
                    <Clock className="w-5 h-5 animate-pulse" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-medium mb-1">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Contact Support */}
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-900">
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium mb-1 text-blue-900 dark:text-blue-100">Butuh Bantuan?</h4>
              <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
                Tim customer service kami siap membantu Anda 24/7
              </p>
              <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                Hubungi Customer Service
              </Button>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Berlangganan Unifiber</h1>
        <p className="text-muted-foreground">Nikmati internet fiber super cepat di rumah Anda</p>
      </div>

      {/* Progress Steps */}
      <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
        <div className="flex items-center justify-between">
          {[
            { id: "coverage", label: "Coverage", icon: MapPin },
            { id: "package", label: "Paket", icon: Package },
            { id: "personal-info", label: "Data Diri", icon: User },
            { id: "schedule", label: "Jadwal", icon: Calendar },
            { id: "review", label: "Review", icon: CheckCircle },
          ].map((step, index) => {
            const Icon = step.icon;
            const stepOrder = ["coverage", "package", "personal-info", "schedule", "review"];
            const currentStepIndex = stepOrder.indexOf(currentStep);
            const thisStepIndex = stepOrder.indexOf(step.id);
            const isActive = thisStepIndex === currentStepIndex;
            const isCompleted = thisStepIndex < currentStepIndex;

            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted
                      ? "bg-secondary text-white"
                      : isActive
                      ? "bg-secondary/20 text-secondary border-2 border-secondary"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {isCompleted ? <CheckCircle className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs hidden sm:block ${
                    isActive ? "font-bold text-secondary" : "text-muted-foreground"
                  }`}>
                    {step.label}
                  </span>
                </div>
                {index < 4 && (
                  <div className={`h-0.5 flex-1 mx-2 ${
                    isCompleted ? "bg-secondary" : "bg-border"
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step 1: Coverage Check */}
      {currentStep === "coverage" && (
        <Card>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <MapPin className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Cek Ketersediaan Layanan</h3>
              <p className="text-sm text-muted-foreground">Masukkan alamat untuk memverifikasi coverage area</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Alamat Lengkap *</label>
              <textarea
                placeholder="Contoh: Jl. Sudirman No. 123, RT 05/RW 03"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kota *</label>
                <input
                  type="text"
                  placeholder="Contoh: Jakarta Selatan"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Kode Pos *</label>
                <input
                  type="text"
                  placeholder="12345"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            <Button 
              onClick={checkCoverage} 
              className="w-full" 
              size="lg"
              disabled={!formData.address || !formData.city || !formData.postalCode}
            >
              Cek Ketersediaan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>

            {coverageChecked && (
              <div className="p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-900 rounded-lg animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3 text-green-900 dark:text-green-100">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-bold">Kabar Baik!</p>
                    <p className="text-sm">Fiber internet tersedia di lokasi Anda. Lanjutkan untuk memilih paket.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Step 2: Package Selection */}
      {currentStep === "package" && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Pilih Paket Internet</h2>
            <Button variant="ghost" onClick={() => setCurrentStep("coverage")}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                onClick={() => selectPackage(pkg.id)}
                className="relative text-left cursor-pointer"
              >
                <Card className={`transition-all h-full ${
                  formData.selectedPackage === pkg.id
                    ? "ring-2 ring-secondary bg-secondary/5"
                    : "hover:shadow-lg hover:scale-[1.02]"
                }`}>
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge variant="warning" className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Paling Populer
                      </Badge>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-bold text-xl mb-1">{pkg.name}</h3>
                      <p className="text-sm text-muted-foreground">Kecepatan hingga {pkg.speed}</p>
                    </div>
                    <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Package className="w-6 h-6 text-secondary" />
                    </div>
                  </div>
                  
                  <div className="mb-6 pb-6 border-b border-border">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-secondary">{formatCurrency(pkg.price)}</span>
                      <span className="text-muted-foreground">/bulan</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2.5">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full mt-6 px-4 py-2 rounded-lg text-center font-medium transition-colors">
                    {formData.selectedPackage === pkg.id ? (
                      <div className="text-secondary flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Terpilih
                      </div>
                    ) : (
                      <span className="text-muted-foreground">Klik untuk memilih</span>
                    )}
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step 3: Personal Info */}
      {currentStep === "personal-info" && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <User className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Data Diri</h3>
                <p className="text-sm text-muted-foreground">Lengkapi informasi kontak Anda</p>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setCurrentStep("package")}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Nama Lengkap *</label>
              <input
                type="text"
                placeholder="Nama sesuai KTP"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Email *</label>
              <input
                type="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nomor HP (WhatsApp) *</label>
                <input
                  type="tel"
                  placeholder="+62 812 3456 7890"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Nomor Alternatif (Opsional)</label>
                <input
                  type="tel"
                  placeholder="+62 821 9876 5432"
                  value={formData.alternatePhone}
                  onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
                />
              </div>
            </div>

            <Button 
              onClick={submitPersonalInfo} 
              className="w-full" 
              size="lg"
              disabled={!formData.fullName || !formData.email || !formData.phoneNumber}
            >
              Lanjutkan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Schedule */}
      {currentStep === "schedule" && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="text-xl font-bold">Jadwal Instalasi</h3>
                <p className="text-sm text-muted-foreground">Pilih waktu yang sesuai untuk Anda</p>
              </div>
            </div>
            <Button variant="ghost" onClick={() => setCurrentStep("personal-info")}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Tanggal Instalasi *</label>
              <input
                type="date"
                value={formData.installDate}
                onChange={(e) => setFormData({ ...formData, installDate: e.target.value })}
                min={new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]} // Min 2 days from now
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
              />
              <p className="text-xs text-muted-foreground mt-1">Minimal 2 hari dari sekarang</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Waktu Instalasi *</label>
              <div className="grid grid-cols-1 gap-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    onClick={() => slot.available && setFormData({ ...formData, installTime: slot.time })}
                    disabled={!slot.available}
                    className={`p-4 rounded-lg border-2 transition-all text-left ${
                      formData.installTime === slot.time
                        ? "border-secondary bg-secondary/5"
                        : slot.available
                        ? "border-border hover:border-secondary/50"
                        : "border-border bg-muted opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-secondary" />
                        <span className="font-medium">{slot.time}</span>
                      </div>
                      {!slot.available && (
                        <Badge variant="default">Penuh</Badge>
                      )}
                      {formData.installTime === slot.time && (
                        <CheckCircle className="w-5 h-5 text-secondary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Catatan Tambahan (Opsional)</label>
              <textarea
                placeholder="Informasi tambahan untuk teknisi (contoh: lokasi rumah, akses masuk, dll)"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              />
            </div>

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-medium mb-1">Informasi Instalasi:</p>
                  <ul className="space-y-1 text-xs">
                    <li>• Proses instalasi memakan waktu 2-3 jam</li>
                    <li>• Teknisi akan menghubungi Anda H-1</li>
                    <li>• Pastikan ada yang di rumah saat instalasi</li>
                    <li>• Internet langsung aktif setelah instalasi selesai</li>
                  </ul>
                </div>
              </div>
            </div>

            <Button 
              onClick={submitSchedule} 
              className="w-full" 
              size="lg"
              disabled={!formData.installDate || !formData.installTime}
            >
              Review Pesanan
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 5: Review & Confirm */}
      {currentStep === "review" && selectedPackage && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Review Pesanan</h2>
            <Button variant="ghost" onClick={() => setCurrentStep("schedule")}>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Kembali
            </Button>
          </div>

          {/* Package Summary */}
          <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-white/80 text-sm mb-1">Paket Terpilih</p>
                <h3 className="text-2xl font-bold mb-1">{selectedPackage.name}</h3>
                <p className="text-white/90">Kecepatan hingga {selectedPackage.speed}</p>
              </div>
              <Package className="w-12 h-12 text-white/80" />
            </div>
            <div className="pt-4 border-t border-white/20">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">{formatCurrency(selectedPackage.price)}</span>
                <span className="text-white/80">/bulan</span>
              </div>
            </div>
          </Card>

          {/* Installation Details */}
          <Card>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-secondary" />
              Detail Instalasi
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Tanggal</span>
                <span className="font-medium">{new Date(formData.installDate).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Waktu</span>
                <span className="font-medium">{formData.installTime}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Alamat</span>
                <span className="font-medium text-right max-w-[60%]">{formData.address}, {formData.city} {formData.postalCode}</span>
              </div>
            </div>
          </Card>

          {/* Contact Info */}
          <Card>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-secondary" />
              Informasi Kontak
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Nama</span>
                <span className="font-medium">{formData.fullName}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium">{formData.email}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-border">
                <span className="text-muted-foreground">HP (WhatsApp)</span>
                <span className="font-medium">{formData.phoneNumber}</span>
              </div>
              {formData.alternatePhone && (
                <div className="flex justify-between py-2">
                  <span className="text-muted-foreground">HP Alternatif</span>
                  <span className="font-medium">{formData.alternatePhone}</span>
                </div>
              )}
            </div>
          </Card>

          {/* Terms & Conditions */}
          <Card className="bg-muted/50">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1" defaultChecked />
              <div className="text-sm">
                <p className="font-medium mb-1">Saya menyetujui syarat dan ketentuan</p>
                <p className="text-muted-foreground text-xs">
                  Dengan melanjutkan, Anda setuju dengan syarat dan ketentuan layanan Unifiber, termasuk kebijakan privasi dan pembayaran bulanan.
                </p>
              </div>
            </label>
          </Card>

          {/* Confirm Button */}
          <Button 
            onClick={confirmOrder} 
            className="w-full" 
            size="lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Memproses Pesanan...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" />
                Konfirmasi Pesanan
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
}