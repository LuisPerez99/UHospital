import { createContext, useContext } from "react";
import type { ReactNode } from "react";

interface ConfigContextProps {
    HOST: string;
    PORT: string;
    baseURL: string;
}

const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

export const ConfigProvider = ({ children }: { children: ReactNode }) => {
  const HOST = import.meta.env.VITE_BACKEND_HOST || "localhost";
  const PORT = import.meta.env.VITE_BACKEND_PORT || "8080";
  const baseURL = `http://${HOST}:${PORT}/api`;

  return (
    <ConfigContext.Provider value={{ HOST, PORT, baseURL }}>
      {children}
    </ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within a ConfigProvider");
  }
  return context;
};
