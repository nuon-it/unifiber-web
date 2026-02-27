import { useState } from "react";
import { Wifi, Zap, RotateCw, Shield, Pause, Play, Signal, Activity, WifiOff, Sparkles } from "lucide-react";
import { Card } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const speedTestHistory = [
  { date: "Feb 20", download: 920, upload: 910 },
  { date: "Feb 21", download: 940, upload: 930 },
  { date: "Feb 22", download: 910, upload: 920 },
  { date: "Feb 23", download: 950, upload: 940 },
  { date: "Feb 24", download: 930, upload: 920 },
  { date: "Feb 25", download: 920, upload: 910 },
  { date: "Feb 26", download: 940, upload: 935 },
];

const devices = [
  { id: 1, name: "iPhone 14 Pro", mac: "A4:83:E7:2F:11:C2", status: "active", paused: false },
  { id: 2, name: "MacBook Pro", mac: "B8:27:EB:3A:42:D1", status: "active", paused: false },
  { id: 3, name: "Smart TV", mac: "DC:A6:32:1F:88:E3", status: "active", paused: false },
  { id: 4, name: "PlayStation 5", mac: "F4:5C:89:9B:C7:A2", status: "idle", paused: false },
  { id: 5, name: "iPad Air", mac: "E8:84:A5:1D:33:B4", status: "idle", paused: true },
];

export function Internet() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState({ download: 920, upload: 910 });
  const [deviceList, setDeviceList] = useState(devices);

  // Empty state untuk user yang belum berlangganan
  if (!user?.isSubscribed) {
    return (
      <div className="space-y-6 pb-20 lg:pb-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold mb-2">Internet Management</h1>
          <p className="text-muted-foreground">Monitor dan kontrol jaringan Anda</p>
        </div>

        {/* Empty State */}
        <div className="flex items-center justify-center min-h-[60vh]">
          <Card className="max-w-md text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <WifiOff className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Belum Ada Layanan Internet</h2>
            <p className="text-muted-foreground mb-6">
              Berlangganan Unifiber untuk mendapatkan akses internet fiber super cepat dengan kecepatan hingga 1 Gbps
            </p>
            
            {/* Benefits */}
            <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />
                Yang Anda Dapatkan:
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <span>Internet fiber optic super cepat & stabil</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <span>WiFi management tools lengkap</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <span>Parental control & security features</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 flex-shrink-0" />
                  <span>Rewards program eksklusif</span>
                </li>
              </ul>
            </div>

            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate("/app/installation")}
            >
              Berlangganan Sekarang
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const runSpeedTest = () => {
    setTesting(true);
    setTimeout(() => {
      setTestResult({
        download: Math.floor(Math.random() * 50 + 900),
        upload: Math.floor(Math.random() * 50 + 890),
      });
      setTesting(false);
    }, 3000);
  };

  const toggleDevicePause = (id: number) => {
    setDeviceList(deviceList.map(device => 
      device.id === id ? { ...device, paused: !device.paused } : device
    ));
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Internet Management</h1>
        <p className="text-muted-foreground">Monitor dan kontrol jaringan Anda</p>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-white border-0">
          <div className="flex items-center justify-between mb-2">
            <Wifi className="w-8 h-8" />
            <Badge variant="success" className="bg-green-500 text-white">Online</Badge>
          </div>
          <p className="text-sm text-white/80 mb-1">Network Status</p>
          <h3 className="text-2xl font-bold">Excellent</h3>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-secondary" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Download Speed</p>
          <h3 className="text-2xl font-bold">{testResult.download} Mbps</h3>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Signal className="w-5 h-5 text-accent" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Upload Speed</p>
          <h3 className="text-2xl font-bold">{testResult.upload} Mbps</h3>
        </Card>

        <Card>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Activity className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-1">Signal Strength</p>
          <h3 className="text-2xl font-bold">95%</h3>
        </Card>
      </div>

      {/* Speed Test */}
      <Card>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold mb-1">Speed Test</h3>
            <p className="text-sm text-muted-foreground">Test your current connection speed</p>
          </div>
          <Button onClick={runSpeedTest} disabled={testing}>
            <RotateCw className={`w-4 h-4 mr-2 ${testing ? 'animate-spin' : ''}`} />
            {testing ? 'Testing...' : 'Run Test'}
          </Button>
        </div>

        {testing && (
          <div className="mb-6 text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-secondary/10 mb-4">
              <Zap className="w-12 h-12 text-secondary animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">Running speed test...</p>
          </div>
        )}

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={speedTestHistory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="download" stroke="#00b8ff" strokeWidth={2} name="Download (Mbps)" />
              <Line type="monotone" dataKey="upload" stroke="#06b6d4" strokeWidth={2} name="Upload (Mbps)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Device Management */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1">Connected Devices</h3>
            <p className="text-sm text-muted-foreground">{deviceList.length} devices connected</p>
          </div>
          <Button variant="outline" size="sm">
            <Shield className="w-4 h-4 mr-2" />
            Parental Control
          </Button>
        </div>

        <div className="space-y-3">
          {deviceList.map((device) => (
            <div
              key={device.id}
              className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-medium">{device.name}</h4>
                  <Badge variant={device.status === "active" ? "success" : "default"}>
                    {device.status}
                  </Badge>
                  {device.paused && <Badge variant="warning">Paused</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{device.mac}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => toggleDevicePause(device.id)}
              >
                {device.paused ? (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </>
                ) : (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </>
                )}
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
              <RotateCw className="w-6 h-6 text-secondary" />
            </div>
            <div>
              <h4 className="font-medium">Reboot Modem</h4>
              <p className="text-sm text-muted-foreground">Restart your connection</p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h4 className="font-medium">Security Settings</h4>
              <p className="text-sm text-muted-foreground">Manage WiFi password</p>
            </div>
          </div>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h4 className="font-medium">Diagnostics</h4>
              <p className="text-sm text-muted-foreground">Run network check</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}