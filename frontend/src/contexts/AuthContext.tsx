import { createContext, useContext, useEffect, useState } from "react";
import type { User, ExtendedUser, Paciente, Doctor, Admin } from "../models/models";

type AuthContextType = {
  user: ExtendedUser | null;
  login: (user: ExtendedUser) => void;
  logout: () => void;
  authenticate: (
    email: string,
    password: string,
    users: User[],
    pacientes: Paciente[],
    doctors: Doctor[],
    admins: Admin[]
  ) => ExtendedUser | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<ExtendedUser | null>(() => {
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

    const login = (user: ExtendedUser) => {
      // exclude password when persisting
      const { password, ...rest } = user;
      localStorage.setItem("loggedInUser", JSON.stringify(rest));
      setUser(rest as ExtendedUser);
    };

    const logout = () => {
        localStorage.removeItem("loggedInUser");
        setUser(null);
    };

    const authenticate = (
      email: string,
      password: string,
      users: User[],
      pacientes: Paciente[],
      doctors: Doctor[],
      admins: Admin[]
    ): ExtendedUser | null => {
      const base = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!base) return null;
      let extended: ExtendedUser = { ...base, password: "" };
      switch (base.role) {
        case "PACIENTE": {
          const p = pacientes.find((pp) => pp.email === base.email);
          if (p) {
            extended = {
              ...extended,
              nombre: p.nombre,
              apellido: p.apellido,
              fechaNacimiento: p.fecha_nacimiento,
              genero: p.genero,
              telefono: p.telefono,
              direccion: p.direccion,
            };
          }
          break;
        }
        case "DOCTOR": {
          const d = doctors.find((dd) => dd.email === base.email);
          if (d) {
            extended = {
              ...extended,
              nombre: d.nombre,
              apellido: d.apellido,
              fechaNacimiento: d.fecha_nacimiento,
              genero: d.genero,
              telefono: d.telefono,
              direccion: d.direccion,
              especialidad: d.especialidad,
            };
          }
          break;
        }
        case "ADMIN": {
          const a = admins.find((aa) => aa.email === base.email);
          if (a) {
            extended = {
              ...extended,
              nombre: a.nombre,
              apellido: a.apellido,
              fechaNacimiento: a.fecha_nacimiento,
              genero: a.genero,
              telefono: a.telefono,
              direccion: a.direccion,
            };
          }
          break;
        }
      }
      return extended;
    };

  return (
    <AuthContext.Provider value={{ user, login, logout, authenticate }}>
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
