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
  showGallery: boolean;
  setShowGallery: React.Dispatch<React.SetStateAction<boolean>>;
  phoneView: boolean;
  setPhoneView: React.Dispatch<React.SetStateAction<boolean>>;
  currentDropDown: number;
  setCurrentDropDown: React.Dispatch<React.SetStateAction<number>>;
  animateLogo: boolean;
  setAnimateLogo: React.Dispatch<React.SetStateAction<boolean>>;
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
  const [customScroll, setCustomScroll] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [phoneView, setPhoneView] = useState(false);
  const [currentDropDown, setCurrentDropDown] = useState(-1);
  const [animateLogo, setAnimateLogo] = useState(true);
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
        showGallery,
        setShowGallery,
        phoneView,
        setPhoneView,
        currentDropDown,
        setCurrentDropDown,
        animateLogo,
        setAnimateLogo,
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
