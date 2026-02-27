import { Wifi, Activity, Zap, Smartphone, Laptop, Tv, Gamepad2, Ticket, Trophy, Calendar, MapPin, Phone, CheckCircle } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const networkData = [
  { time: "00:00", speed: 920 },
  { time: "04:00", speed: 950 },
  { time: "08:00", speed: 880 },
  { time: "12:00", speed: 940 },
  { time: "16:00", speed: 910 },
  { time: "20:00", speed: 930 },
  { time: "24:00", speed: 920 },
];

const connectedDevices = [
  { name: "iPhone 14 Pro", type: "phone", ip: "192.168.1.101", status: "active" },
  { name: "MacBook Pro", type: "laptop", ip: "192.168.1.102", status: "active" },
  { name: "Smart TV", type: "tv", ip: "192.168.1.103", status: "active" },
  { name: "PlayStation 5", type: "gaming", ip: "192.168.1.104", status: "idle" },
];

const entertainmentHighlights = [
  {
    title: "Mobile Legends",
    subtitle: "Get 10% cashback",
    icon: Gamepad2,
    color: "from-purple-500 to-pink-500",
    link: "/app/entertainment/game-topup"
  },
  {
    title: "Coldplay Concert",
    subtitle: "Pre-sale tickets",
    icon: Ticket,
    color: "from-blue-500 to-cyan-500",
    link: "/app/entertainment/concerts"
  },
  {
    title: "Liga 1 Indonesia",
    subtitle: "Weekend matches",
    icon: Trophy,
    color: "from-green-500 to-emerald-500",
    link: "/app/entertainment/football"
  },
];

const installationSteps = [
  {
    step: 1,
    title: "Pilih Paket",
    description: "Pilih paket internet yang sesuai kebutuhan",
    completed: false,
    current: true
  },
  {
    step: 2,
    title: "Survey Lokasi",
    description: "Tim kami akan survey kelayakan lokasi Anda",
    completed: false,
    current: false
  },
  {
    step: 3,
    title: "Jadwalkan Instalasi",
    description: "Tentukan jadwal instalasi yang sesuai",
    completed: false,
    current: false
  },
  {
    step: 4,
    title: "Instalasi & Aktivasi",
    description: "Teknisi kami akan memasang dan mengaktifkan layanan",
    completed: false,
    current: false
  },
];

const packages = [
  {
    name: "Basic Plan",
    speed: "50 Mbps",
    price: "Rp 299.000",
    features: ["Unlimited Quota", "Free Modem", "24/7 Support"]
  },
  {
    name: "Premium Plan",
    speed: "100 Mbps",
    price: "Rp 499.000",
    features: ["Unlimited Quota", "Free Modem", "24/7 Support", "Free Nuon Entertainment"],
    recommended: true
  },
  {
    name: "Ultra Plan",
    speed: "300 Mbps",
    price: "Rp 799.000",
    features: ["Unlimited Quota", "Free WiFi 6 Router", "24/7 Support", "Premium Entertainment"]
  },
];

export function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "phone": return Smartphone;
      case "laptop": return Laptop;
      case "tv": return Tv;
      case "gaming": return Gamepad2;
      default: return Activity;
    }
  };

  // Home untuk user yang BELUM berlangganan
  if (!user?.isSubscribed) {
    return (
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Selamat Datang di Unifiber!</h1>
          <p className="text-white/90">Mari mulai perjalanan Anda menuju koneksi internet super cepat</p>
        </div>

        {/* Installation Progress */}
        <Card>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold mb-1">Proses Instalasi Anda</h2>
              <p className="text-sm text-muted-foreground">Ikuti langkah-langkah berikut untuk memulai</p>
            </div>
            <Badge variant="info">Baru</Badge>
          </div>

          <div className="space-y-4">
            {installationSteps.map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    item.completed 
                      ? "bg-green-500 text-white" 
                      : item.current
                      ? "bg-secondary text-white"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {item.completed ? <CheckCircle className="w-5 h-5" /> : item.step}
                  </div>
                  {index < installationSteps.length - 1 && (
                    <div className={`w-0.5 h-16 ${item.completed ? "bg-green-500" : "bg-muted"}`}></div>
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <h3 className={`font-bold mb-1 ${item.current ? "text-secondary" : ""}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                  {item.current && (
                    <Button 
                      size="sm" 
                      className="mt-3"
                      onClick={() => navigate("/app/installation")}
                    >
                      Mulai Sekarang
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Available Packages */}
        <div>
          <h2 className="text-xl font-bold mb-4">Pilih Paket Internet Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {packages.map((pkg, index) => (
              <Card 
                key={index}
                className={pkg.recommended ? "border-2 border-secondary relative" : ""}
              >
                {pkg.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="default" className="bg-secondary">Paling Populer</Badge>
                  </div>
                )}
                <div className="text-center mb-4">
                  <h3 className="font-bold text-lg mb-1">{pkg.name}</h3>
                  <div className="text-3xl font-bold text-secondary mb-1">{pkg.speed}</div>
                  <p className="text-2xl font-bold">{pkg.price}<span className="text-sm text-muted-foreground">/bulan</span></p>
                </div>
                <ul className="space-y-2 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={pkg.recommended ? "default" : "outline"}
                  className="w-full"
                  onClick={() => navigate("/app/installation")}
                >
                  Pilih Paket
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-medium">Jadwal Survey</h3>
                <p className="text-sm text-muted-foreground">Atur jadwal kunjungan</p>
              </div>
            </div>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium">Cek Jangkauan</h3>
                <p className="text-sm text-muted-foreground">Area layanan Unifiber</p>
              </div>
            </div>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                <Phone className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-medium">Hubungi Kami</h3>
                <p className="text-sm text-muted-foreground">Butuh bantuan?</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Why Unifiber */}
        <Card>
          <h2 className="text-xl font-bold mb-4">Mengapa Memilih Unifiber?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Kecepatan Stabil</h3>
                <p className="text-sm text-muted-foreground">Koneksi fiber optik dengan kecepatan konsisten</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gamepad2 className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Entertainment Lengkap</h3>
                <p className="text-sm text-muted-foreground">Akses game, konser, dan olahraga melalui Nuon</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Support 24/7</h3>
                <p className="text-sm text-muted-foreground">Tim support siap membantu kapan saja</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trophy className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <h3 className="font-bold mb-1">Rewards Program</h3>
                <p className="text-sm text-muted-foreground">Dapatkan poin rewards setiap transaksi</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Home untuk user yang SUDAH berlangganan
  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Selamat Datang, {user.name}</h1>
        <p className="text-muted-foreground">Jaringan Anda berjalan dengan lancar</p>
      </div>

      {/* Network Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Status Jaringan</p>
              <h3 className="text-2xl font-bold">Excellent</h3>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Wifi className="w-6 h-6" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm text-white/80">Semua sistem operasional</span>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-secondary to-accent text-white border-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Kecepatan Saat Ini</p>
              <h3 className="text-2xl font-bold">920 Mbps</h3>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
          </div>
          <div className="text-sm text-white/80">
            Download: 920 Mbps • Upload: 920 Mbps
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600 to-pink-600 text-white border-0">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-white/80 text-sm mb-1">Perangkat Terhubung</p>
              <h3 className="text-2xl font-bold">{connectedDevices.length}</h3>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
          </div>
          <div className="text-sm text-white/80">
            {connectedDevices.filter(d => d.status === "active").length} aktif • {connectedDevices.filter(d => d.status === "idle").length} idle
          </div>
        </Card>
      </div>

      {/* Network Performance Chart */}
      <Card>
        <h3 className="text-lg font-bold mb-4">Performa Jaringan 24 Jam</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={networkData}>
            <defs>
              <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00b8ff" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00b8ff" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="time" stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip />
            <Area 
              type="monotone" 
              dataKey="speed" 
              stroke="#00b8ff" 
              strokeWidth={2}
              fill="url(#colorSpeed)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Connected Devices */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Perangkat Terhubung</h3>
          <Button variant="outline" size="sm">Kelola</Button>
        </div>
        <div className="space-y-3">
          {connectedDevices.map((device, index) => {
            const Icon = getDeviceIcon(device.type);
            return (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div>
                    <h4 className="font-medium">{device.name}</h4>
                    <p className="text-sm text-muted-foreground">{device.ip}</p>
                  </div>
                </div>
                <Badge variant={device.status === "active" ? "success" : "default"}>
                  {device.status === "active" ? "Aktif" : "Idle"}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Entertainment Highlights */}
      <div>
        <h3 className="text-lg font-bold mb-4">Hiburan Spesial untuk Anda</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {entertainmentHighlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index}
                className="cursor-pointer hover:shadow-lg transition-all overflow-hidden group"
                onClick={() => navigate(item.link)}
              >
                <div className={`h-24 bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <h4 className="font-bold mb-1">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.subtitle}</p>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/app/internet")}>
          <Wifi className="w-6 h-6" />
          <span className="text-sm">WiFi Settings</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/app/billing")}>
          <Activity className="w-6 h-6" />
          <span className="text-sm">Tagihan</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/app/rewards")}>
          <Trophy className="w-6 h-6" />
          <span className="text-sm">Rewards</span>
        </Button>
        <Button variant="outline" className="h-auto py-4 flex-col gap-2" onClick={() => navigate("/app/support")}>
          <Phone className="w-6 h-6" />
          <span className="text-sm">Bantuan</span>
        </Button>
      </div>
    </div>
  );
}