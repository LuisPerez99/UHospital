import { createContext, useContext, useEffect, useState } from "react";
import type { User } from "../models/models";

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
        const storedUser = localStorage.getItem("loggedInUser");
        return storedUser ? JSON.parse(storedUser) : null;
    } catch {
        return null;
    }
  });

  useEffect(() => {
    const update = () => {
      try {
        const storedUser = localStorage.getItem("loggedInUser");
        setUser(storedUser ? JSON.parse(storedUser) : null);
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("uhospital:auth", update);
    return () => {
      window.removeEventListener("uhospital:auth", update);
    };
  }, []);

    const login = (user: User) => {
        const saveUser: User = {
            id: user.id,
            username: user.username,
            email: user.email,
            password: "",
            role: user.role,
        };
        localStorage.setItem("loggedInUser", JSON.stringify(saveUser));
        setUser(saveUser);
    };

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        setUser(null);
    };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
