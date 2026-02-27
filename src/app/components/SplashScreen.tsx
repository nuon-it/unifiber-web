import { useEffect, useState } from "react";
import { Wifi, Zap } from "lucide-react";

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    // Complete splash after 3 seconds
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0d2847] via-[#1a3a5c] to-[#0d2847] overflow-hidden">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00b8ff]/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00b8ff]/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "4s", animationDelay: "0.5s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00b8ff]/5 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: "5s", animationDelay: "1s" }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center">
        {/* Logo animation */}
        <div className="mb-8 animate-fade-in-scale">
          <div className="relative inline-block">
            {/* Outer glow ring */}
            <div className="absolute inset-0 animate-ping-slow opacity-50">
              <div className="w-32 h-32 rounded-full border-4 border-[#00b8ff]" />
            </div>
            
            {/* Main logo circle */}
            <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-[#00b8ff] to-[#0066cc] rounded-full flex items-center justify-center shadow-2xl shadow-[#00b8ff]/50 animate-float">
              {/* WiFi icon with electric effect */}
              <div className="relative">
                <Wifi className="w-16 h-16 text-white" strokeWidth={2.5} />
                <Zap className="absolute -top-1 -right-1 w-8 h-8 text-yellow-300 animate-pulse" />
              </div>
            </div>
          </div>
        </div>

        {/* Brand name */}
        <div className="mb-4 animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <h1 className="text-6xl font-bold text-white mb-2 tracking-tight">
            Uni<span className="text-[#00b8ff]">fiber</span>
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-transparent via-[#00b8ff] to-transparent mx-auto rounded-full animate-shimmer" />
        </div>

        {/* Tagline */}
        <p className="text-xl text-white/80 mb-8 animate-slide-up" style={{ animationDelay: "0.6s" }}>
          Fiber Internet Super Cepat
        </p>

        {/* Loading bar */}
        <div className="w-64 mx-auto animate-slide-up" style={{ animationDelay: "0.9s" }}>
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#00b8ff] via-[#00d4ff] to-[#00b8ff] rounded-full transition-all duration-300 ease-out shadow-lg shadow-[#00b8ff]/50"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer-fast" />
            </div>
          </div>
          
          {/* Loading text */}
          <div className="mt-3 flex items-center justify-center gap-2">
            <span className="text-sm text-white/60 font-medium">Loading</span>
            <div className="flex gap-1">
              <span className="w-1 h-1 bg-[#00b8ff] rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
              <span className="w-1 h-1 bg-[#00b8ff] rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="w-1 h-1 bg-[#00b8ff] rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>

        {/* Powered by Nuon badge */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: "1.2s" }}>
          <p className="text-xs text-white/40 font-medium tracking-wider">
            POWERED BY <span className="text-[#00b8ff]">NUON</span> ENTERTAINMENT
          </p>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d2847] to-transparent" />
    </div>
  );
}
