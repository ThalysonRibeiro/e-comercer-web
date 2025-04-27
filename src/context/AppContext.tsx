
import { createContext, useContext } from "react";
import { AppContextType, ProviderProps } from "@/types/appContextType";

// Cria o contexto com um valor padrão
const appContext = createContext<AppContextType | undefined>(undefined);

// Cria um componente para fornecer o contexto
export function AppContext({ children, value }: { children: React.ReactNode; value: AppContextType }) {
  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

// Hook personalizado para usar o contexto
export function useAppContext() {
  const context = useContext(appContext);
  if (context === undefined) {
    throw new Error("useAppContext deve ser usado dentro de um AppProvider");
  }
  return context;
}