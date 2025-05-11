import React, { createContext, useState, useContext } from 'react';

interface VariablesContextProps {
    section: number;
    setSection: (value: number) => void;
    scrollPosition: number;
    setScrollPosition: (value: number) => void;
}

const VariablesContext = createContext<VariablesContextProps | undefined>(undefined);

export const VariablesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [section, setSection] = useState<number>(0);
    const [scrollPosition, setScrollPosition] = useState(0);
    return (
        <VariablesContext.Provider value={{ section, setSection, scrollPosition, setScrollPosition }}>
            {children}
        </VariablesContext.Provider>
    );
};

export const useVariablesContext = (): VariablesContextProps => {
    const context = useContext(VariablesContext);
    if (!context) {
        throw new Error('useVariablesContext must be used within a VariablesProvider');
    }
    return context;
};
