import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { SplashScreen } from "./components/SplashScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [hasShownSplash, setHasShownSplash] = useState(false);

  useEffect(() => {
    // Check if splash has been shown in this session
    const splashShown = sessionStorage.getItem("unifiber_splash_shown");
    
    if (splashShown === "true") {
      setShowSplash(false);
      setHasShownSplash(true);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    setHasShownSplash(true);
    // Mark splash as shown for this session
    sessionStorage.setItem("unifiber_splash_shown", "true");
  };

  if (showSplash && !hasShownSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <RouterProvider router={router} />;
}
