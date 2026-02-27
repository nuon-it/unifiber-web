import { User, Mail, Phone, MapPin, CreditCard, Bell, Shield, LogOut, ChevronRight, Settings } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

const settings = [
  {
    icon: Bell,
    title: "Notifikasi",
    description: "Push notifications, Email alerts",
    value: "Aktif",
  },
  {
    icon: Shield,
    title: "Keamanan",
    description: "Password, Biometric login",
    value: "2FA Aktif",
  },
  {
    icon: CreditCard,
    title: "Metode Pembayaran",
    description: "Kelola kartu dan e-wallet",
    value: "3 metode",
  },
  {
    icon: Settings,
    title: "Preferensi",
    description: "Bahasa, Tema, Region",
    value: "Indonesia",
  },
];

export function Profile() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Extended user data
  const userData = {
    ...user,
    accountId: user?.customerId || "UNI-NEW-USER",
    memberSince: user?.installationDate || "New Member",
    tier: "Gold",
    address: "Jl. Sudirman No. 123, Jakarta Selatan",
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Desktop Header (mobile header di MainLayout) */}
      <div className="hidden lg:block">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Kelola informasi akun Anda</p>
      </div>

      {/* Profile Card */}
      <Card className="bg-gradient-to-br from-primary to-secondary text-white border-0">
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-10 h-10 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-1">{userData.name}</h2>
            <p className="text-white/80 text-sm mb-2">Account ID: {userData.accountId}</p>
            <div className="flex items-center gap-2">
              <Badge variant="warning" className="bg-yellow-500 text-white">
                {userData.tier} Member
              </Badge>
              <span className="text-sm text-white/80">Member since {userData.memberSince}</span>
            </div>
          </div>
          <Button variant="secondary" size="sm" className="hidden lg:block">
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Contact Information */}
      <Card>
        <h3 className="text-lg font-bold mb-4">Informasi Kontak</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Email</p>
              <p className="font-medium">{userData.email || "Belum diatur"}</p>
            </div>
            <button className="text-secondary hover:underline text-sm">Edit</button>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Nomor HP</p>
              <p className="font-medium">{userData.phoneNumber}</p>
            </div>
            <button className="text-secondary hover:underline text-sm">Edit</button>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-1">Alamat Layanan</p>
              <p className="font-medium">{userData.address}</p>
            </div>
            <button className="text-secondary hover:underline text-sm">Edit</button>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <div>
        <h3 className="text-lg font-bold mb-4">Settings</h3>
        <div className="space-y-3">
          {settings.map((setting, index) => {
            const Icon = setting.icon;
            return (
              <Card
                key={index}
                className="cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium mb-1">{setting.title}</h4>
                    <p className="text-sm text-muted-foreground">{setting.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{setting.value}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Account Actions */}
      <Card>
        <h3 className="text-lg font-bold mb-4">Account Actions</h3>
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <span>Download Account Data</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <span>Privacy Policy</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <span>Terms of Service</span>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </Card>

      {/* Multi-Account Support */}
      <Card className="border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950">
        <div className="flex items-start gap-3">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-medium mb-1 text-blue-900 dark:text-blue-100">Multiple Locations</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              Manage multiple Unifiber accounts from a single login
            </p>
            <Button variant="outline" size="sm" className="border-blue-600 text-blue-600 hover:bg-blue-100 dark:border-blue-400 dark:text-blue-400">
              Add Another Location
            </Button>
          </div>
        </div>
      </Card>

      {/* Logout */}
      <Card>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 p-3 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Log Out</span>
        </button>
      </Card>

      {/* App Version */}
      <div className="text-center text-sm text-muted-foreground">
        <p>Unifiber Platform v2.0.1</p>
        <p className="mt-1">Powered by Fiber. Enhanced by Nuon.</p>
      </div>
    </div>
  );
}