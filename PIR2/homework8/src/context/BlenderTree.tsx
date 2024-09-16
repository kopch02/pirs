import React, { createContext, useContext, useState } from 'react';

interface BlenderContextProps {
    selectedColors: string[];
    setSelectedColors: (colors: string[]) => void;
}

const BlenderContext = createContext<BlenderContextProps | undefined>(undefined);

export const BlenderProviderTree = ({ children }: { children: React.ReactNode }) => {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    return (
        <BlenderContext.Provider value={{ selectedColors, setSelectedColors }}>
            {children}
        </BlenderContext.Provider>
    );
};

export const useBlender = () => {
    const context = useContext(BlenderContext);
    if (!context) {
        throw new Error('Error');
    }
    return context;
};
