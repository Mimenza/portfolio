import { createContext, useState, useContext, Dispatch, SetStateAction } from "react";

// Definir el tipo del contexto
interface LogedUserContextType {
  logedUser: Boolean | null;
  setLogedUser: Dispatch<SetStateAction<Boolean | null>>;
}

// Crear el contexto
const LogedUserContext = createContext<LogedUserContextType | undefined>(undefined);

// Proveedor del contexto
export function LogedUserProvider({ children }: { children: React.ReactNode }) {
  const [logedUser, setLogedUser] = useState<Boolean | null>(null);

  return (
    <LogedUserContext.Provider value={{ logedUser, setLogedUser }}>
      {children}
    </LogedUserContext.Provider>
  );
}

// Hook personalizado para acceder al contexto
export function useLogedUser() {
  const context = useContext(LogedUserContext);
  if (!context) {
    throw new Error("useLogedUser debe usarse dentro de un LogedUserProvider");
  }
  return context;
}

export default LogedUserContext;