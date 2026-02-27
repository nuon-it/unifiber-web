import { Gift, Zap, Ticket, Star, TrendingUp, Trophy } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts";

const rewardBalance = {
  points: 12500,
  tier: "Gold",
  nextTier: "Platinum",
  pointsToNext: 2500,
};

const pointsBreakdown = [
  { name: "Tagihan Internet", value: 6000, color: "#0d2847" },
  { name: "Top-Up Game", value: 3500, color: "#00b8ff" },
  { name: "Pembelian Tiket", value: 2000, color: "#06b6d4" },
  { name: "Referral", value: 1000, color: "#0ea5e9" },
];

const rewardHistory = [
  { date: "26 Feb 2026", action: "Bayar Tagihan Internet", points: "+500", type: "earn" },
  { date: "25 Feb 2026", action: "Tukar Speed Boost", points: "-1000", type: "redeem" },
  { date: "24 Feb 2026", action: "Top-Up Mobile Legends", points: "+100", type: "earn" },
  { date: "22 Feb 2026", action: "Beli Tiket Konser", points: "+300", type: "earn" },
  { date: "20 Feb 2026", action: "Referral Teman", points: "+500", type: "earn" },
];

const redeemOptions = [
  {
    title: "Speed Boost 24 Jam",
    description: "Upgrade ke 1.5 Gbps selama 24 jam",
    points: 1000,
    icon: Zap,
    color: "from-yellow-500 to-orange-500",
  },
  {
    title: "Voucher Rp 50.000",
    description: "Untuk game atau tiket",
    points: 2500,
    icon: Gift,
    color: "from-purple-500 to-pink-500",
  },
  {
    title: "Diskon Tiket Konser",
    description: "Diskon 20% pembelian tiket berikutnya",
    points: 3000,
    icon: Ticket,
    color: "from-blue-500 to-cyan-500",
  },
  {
    title: "Premium Support",
    description: "Priority support selama 1 bulan",
    points: 1500,
    icon: Star,
    color: "from-green-500 to-emerald-500",
  },
];

export function Rewards() {
  const progressPercentage = ((rewardBalance.points % 15000) / 15000) * 100;

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Rewards Program</h1>
        <p className="text-muted-foreground">Kumpulkan poin dan tukar hadiah eksklusif</p>
      </div>

      {/* Points Balance */}
      <Card className="bg-gradient-to-br from-primary via-secondary to-accent text-white border-0">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm mb-1">Total Poin Rewards</p>
            <h2 className="text-4xl font-bold mb-2">{rewardBalance.points.toLocaleString()}</h2>
            <div className="flex items-center gap-2">
              <Badge variant="warning" className="bg-yellow-500 text-white">
                {rewardBalance.tier} Member
              </Badge>
            </div>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <Gift className="w-8 h-8" />
          </div>
        </div>

        {/* Progress to Next Tier */}
        <div className="pt-4 border-t border-white/20">
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-white/80">Progress to {rewardBalance.nextTier}</span>
            <span className="font-medium">{rewardBalance.pointsToNext} points to go</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2">
            <div
              className="bg-white rounded-full h-2 transition-all"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </Card>

      {/* Points Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold mb-4">Points Breakdown</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pointsBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pointsBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-bold mb-4">How to Earn Points</h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Pay Internet Bills</p>
                <p className="text-sm text-muted-foreground">Earn 500 points per payment</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Gift className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Entertainment Purchases</p>
                <p className="text-sm text-muted-foreground">Earn 2% of purchase value</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="font-medium">Refer Friends</p>
                <p className="text-sm text-muted-foreground">Earn 500 points per referral</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Redeem Options */}
      <div>
        <h2 className="text-xl font-bold mb-4">Redeem Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {redeemOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card
                key={index}
                className={`bg-gradient-to-br ${option.color} text-white border-0 cursor-pointer hover:scale-105 transition-transform`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant="warning" className="bg-white/20 text-white">
                    {option.points} pts
                  </Badge>
                </div>
                <h3 className="font-bold mb-1">{option.title}</h3>
                <p className="text-sm text-white/80 mb-4">{option.description}</p>
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  disabled={rewardBalance.points < option.points}
                >
                  {rewardBalance.points >= option.points ? "Redeem" : "Not Enough Points"}
                </Button>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Reward History */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">Recent Activity</h3>
          <Button variant="ghost" size="sm">
            View All
          </Button>
        </div>
        <div className="space-y-3">
          {rewardHistory.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-border"
            >
              <div>
                <p className="font-medium text-sm">{item.action}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <Badge variant={item.type === "earn" ? "success" : "default"}>
                {item.points}
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}