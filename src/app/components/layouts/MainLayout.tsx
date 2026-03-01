import { Outlet, useNavigate, useLocation } from "react-router";
import { Home, Wifi, CreditCard, Gamepad2, Gift, Headphones, Package, User, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { cn } from "../../lib/utils";
import { useAuth } from "../../context/AuthContext";

const navigation = [
  { name: "Home", path: "/app", icon: Home },
  { name: "Internet", path: "/app/internet", icon: Wifi },
  { name: "Billing", path: "/app/billing", icon: CreditCard },
  { name: "Entertainment", path: "/app/entertainment", icon: Gamepad2 },
  { name: "Rewards", path: "/app/rewards", icon: Gift },
  { name: "Support", path: "/app/support", icon: Headphones },
  { name: "Installation", path: "/app/installation", icon: Package },
];

// Pages that should show back button in mobile header
const pageWithBackButton: Record<string, string> = {
  "/app/profile": "Profile",
  "/app/installation": "Berlangganan",
  "/app/internet/wifi-settings": "WiFi Settings",
  "/app/internet/parental-control": "Parental Control",
  "/app/internet/port-forwarding": "Port Forwarding",
  "/app/billing/details": "Transaction Details",
  "/app/entertainment/game-topup": "Game Top-Up",
  "/app/entertainment/game-topup/mobile-legends": "Mobile Legends",
  "/app/entertainment/game-topup/pubg-mobile": "PUBG Mobile",
  "/app/entertainment/game-topup/free-fire": "Free Fire",
  "/app/entertainment/game-topup/genshin-impact": "Genshin Impact",
  "/app/entertainment/game-topup/valorant": "Valorant",
  "/app/entertainment/game-topup/arena-of-valor": "Arena of Valor",
  "/app/entertainment/game-topup/call-of-duty-mobile": "Call of Duty Mobile",
  "/app/entertainment/game-topup/clash-of-clans": "Clash of Clans",
  "/app/entertainment/vouchers": "Digital Lifestyle",
  "/app/entertainment/concerts": "Concert Tickets",
  "/app/entertainment/football": "Football Tickets",
  "/app/support/create-ticket": "Create Ticket",
  "/app/support/faq": "FAQ",
};

export function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Auto scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Show nothing while redirecting
  if (!isAuthenticated) {
    return null;
  }

  const dynamicPageTitle = location.pathname.startsWith("/app/entertainment/vouchers/")
    ? "Digital Lifestyle"
    : location.pathname.startsWith("/app/entertainment/game-topup/")
      ? "Game Top-Up"
      : location.pathname.startsWith("/app/entertainment/concerts/")
        ? "Concert Tickets"
        : location.pathname.startsWith("/app/entertainment/football/")
          ? "Football Tickets"
      : undefined;

  const currentPageTitle = dynamicPageTitle || pageWithBackButton[location.pathname];
  const showBackButton = !!currentPageTitle;
  const hideMobileBottomNav =
    location.pathname.startsWith("/app/entertainment/game-topup/") ||
    location.pathname.startsWith("/app/entertainment/vouchers/") ||
    location.pathname.startsWith("/app/entertainment/concerts/") ||
    location.pathname.startsWith("/app/entertainment/football/");

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto bg-sidebar border-r border-sidebar-border">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center px-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-sidebar-foreground">Unifiber</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                               (item.path !== "/" && location.pathname.startsWith(item.path));
              
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </nav>

          {/* User Profile */}
          <div className="border-t border-sidebar-border p-4">
            <button
              onClick={() => navigate("/app/profile")}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-sidebar-accent/50 transition-colors text-sidebar-foreground/80"
            >
              <div className="w-8 h-8 bg-sidebar-primary rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="text-sm text-sidebar-foreground">{user?.name || "User"}</div>
                <div className="text-xs text-sidebar-foreground/60">
                  {user?.isSubscribed ? user.plan : "Belum Berlangganan"}
                </div>
              </div>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b border-border bg-background px-4 shadow-sm">
        {showBackButton ? (
          // Header with back button for detail pages
          <>
            <button 
              onClick={handleBack}
              className="flex items-center justify-center w-10 h-10 -ml-2 rounded-lg hover:bg-muted transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-foreground" />
            </button>
            <h1 className="flex-1 font-bold text-lg">{currentPageTitle}</h1>
          </>
        ) : (
          // Default header with logo
          <>
            <div className="flex items-center gap-2 flex-1">
              <div className="w-8 h-8 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">Unifiber</span>
            </div>
            <button onClick={() => navigate("/app/profile")}>
              <User className="w-6 h-6 text-foreground" />
            </button>
          </>
        )}
      </div>

      {/* Main Content */}
      <main className="lg:pl-64">
        <div className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {!hideMobileBottomNav ? (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background border-t border-border">
          <div className="flex justify-around">
            {navigation.slice(0, 5).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                               (item.path !== "/" && location.pathname.startsWith(item.path));
              
              return (
                <button
                  key={item.name}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 flex-1",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{item.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
      ) : null}
    </div>
  );
}
