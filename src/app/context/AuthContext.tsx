import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

interface User {
  name: string;
  phoneNumber: string;
  email: string;
  plan: string;
  isSubscribed: boolean;
  customerId?: string;
  installationDate?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (phoneNumber: string, otp: string) => boolean;
  logout: () => void;
  user: User | null;
  updateUserSubscription?: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      // Check if user is already logged in (from localStorage)
      const storedAuth = window.localStorage.getItem("unifiber_auth");
      if (storedAuth === "true") {
        const storedUser = window.localStorage.getItem("unifiber_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.error("Error loading auth state:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (phoneNumber: string, otp: string) => {
    try {
      // Mock authentication - in production, this would call an API
      if (phoneNumber && otp) {
        // Simulate two types of users based on phone number
        const isSubscribed = !phoneNumber.startsWith("081"); // Numbers starting with 081 are new users
        
        const userData: User = isSubscribed ? {
          name: "John Doe",
          phoneNumber: phoneNumber,
          email: "john.doe@example.com",
          plan: "Premium Plan - 100 Mbps",
          isSubscribed: true,
          customerId: "CUST-" + phoneNumber.slice(-6),
          installationDate: "January 15, 2025"
        } : {
          name: "New Customer",
          phoneNumber: phoneNumber,
          email: "",
          plan: "Not Subscribed",
          isSubscribed: false
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        window.localStorage.setItem("unifiber_auth", "true");
        window.localStorage.setItem("unifiber_user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = () => {
    try {
      setUser(null);
      setIsAuthenticated(false);
      window.localStorage.removeItem("unifiber_auth");
      window.localStorage.removeItem("unifiber_user");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const updateUserSubscription = (data: Partial<User>) => {
    try {
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        window.localStorage.setItem("unifiber_user", JSON.stringify(updatedUser));
      }
    } catch (error) {
      console.error("Update subscription error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading Unifiber...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, updateUserSubscription }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}