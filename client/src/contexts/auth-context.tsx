import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user was previously authenticated
    return localStorage.getItem("autoservice-auth") === "true";
  });

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem("autoservice-auth", "true");
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("autoservice-auth");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
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