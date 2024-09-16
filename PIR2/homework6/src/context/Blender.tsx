import React, { createContext, useState, useContext, ReactNode } from 'react';

interface BlenderState {
    color1: string;
    color2: string;
}

interface BlenderContextProps {
    selectedItems: BlenderState;
    setSelectedItems: React.Dispatch<React.SetStateAction<BlenderState>>;
}

const BlenderContext = createContext<BlenderContextProps | undefined>(undefined);

export const BlenderProvider = ({ children }: { children: ReactNode }) => {
    const [selectedItems, setSelectedItems] = useState<BlenderState>({ color1: '', color2: '' });

    return (
        <BlenderContext.Provider value={{ selectedItems, setSelectedItems }}>
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
