import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Wifi, Smartphone } from "lucide-react";
import { Button } from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/app", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleSendOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate phone number
    if (!phoneNumber || phoneNumber.length < 10) {
      setError("Masukkan nomor HP yang valid");
      return;
    }
    
    // Mock: Send OTP
    setStep("otp");
  };

  const handleVerifyOTP = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    // Validate OTP
    if (!otp || otp.length !== 6) {
      setError("Masukkan kode OTP 6 digit");
      return;
    }
    
    const success = login(phoneNumber, otp);
    if (success) {
      navigate("/app");
    } else {
      setError("Kode OTP salah. Silakan coba lagi.");
    }
  };

  const handleResendOTP = () => {
    setOtp("");
    setError("");
    // Mock: Resend OTP
    alert("Kode OTP telah dikirim ulang ke " + phoneNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-4">
            <Wifi className="w-10 h-10 text-secondary" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Unifiber</h1>
          <p className="text-white/80">Koneksi Cepat, Hiburan Lengkap</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {step === "phone" ? "Masuk ke Akun Anda" : "Verifikasi OTP"}
            </h2>
            <p className="text-muted-foreground text-sm">
              {step === "phone" 
                ? "Masukkan nomor HP yang terdaftar" 
                : `Kode OTP telah dikirim ke ${phoneNumber}`}
            </p>
          </div>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}
          
          {step === "phone" ? (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nomor HP</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <input
                    type="tel"
                    placeholder="08xx xxxx xxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                    maxLength={13}
                    className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Tips: Gunakan 081xxxxxxxx untuk simulasi pelanggan baru
                </p>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Kirim Kode OTP
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Kode OTP</label>
                <input
                  type="text"
                  placeholder="000000"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  maxLength={6}
                  className="w-full px-4 py-3 rounded-lg border border-border bg-input-background focus:outline-none focus:ring-2 focus:ring-secondary text-center text-2xl tracking-widest"
                />
              </div>

              <div className="text-center text-sm">
                <span className="text-muted-foreground">Tidak menerima kode? </span>
                <button 
                  type="button"
                  onClick={handleResendOTP}
                  className="text-secondary hover:underline font-medium"
                >
                  Kirim Ulang
                </button>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Verifikasi & Masuk
              </Button>

              <button
                type="button"
                onClick={() => {
                  setStep("phone");
                  setOtp("");
                  setError("");
                }}
                className="w-full text-sm text-muted-foreground hover:text-foreground"
              >
                Ubah Nomor HP
              </button>
            </form>
          )}

          <div className="mt-6 text-center text-sm">
            <span className="text-muted-foreground">Belum punya koneksi Unifiber? </span>
            <button className="text-secondary hover:underline font-medium">
              Daftar Sekarang
            </button>
          </div>
        </div>

        <div className="text-center mt-6 text-white/60 text-sm">
          <p>Powered by Fiber. Enhanced by Nuon.</p>
        </div>
      </div>
    </div>
  );
}