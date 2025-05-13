import React, { createContext, useState, useContext } from "react";

interface VariablesContextProps {
  section: number;
  setSection: (value: number) => void;
  scrollPosition: number;
  setScrollPosition: (value: number) => void;
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  customScroll: boolean;
  setCustomScroll: React.Dispatch<React.SetStateAction<boolean>>;
}

const VariablesContext = createContext<VariablesContextProps | undefined>(
  undefined
);

export const VariablesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [section, setSection] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [darkMode, setDarkMode] = useState(() => true);
  const [customScroll, setCustomScroll] = useState(true);
  return (
    <VariablesContext.Provider
      value={{
        section,
        setSection,
        scrollPosition,
        setScrollPosition,
        darkMode,
        setDarkMode,
        customScroll,
        setCustomScroll,
      }}
    >
      {children}
    </VariablesContext.Provider>
  );
};

export const useVariablesContext = (): VariablesContextProps => {
  const context = useContext(VariablesContext);
  if (!context) {
    throw new Error(
      "useVariablesContext must be used within a VariablesProvider"
    );
  }
  return context;
};
