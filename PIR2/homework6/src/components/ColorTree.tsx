import React from 'react';
import { useBlender } from '../context/BlenderTree';

interface ColorNode {
    name: string;
    children?: ColorNode[];
}

interface ColorTreeProps {
    nodes: ColorNode[];
}

const ColorTree: React.FC<ColorTreeProps> = ({ nodes }) => {
    const { selectedColors, setSelectedColors } = useBlender();

    const handleSelectColor = (color: string) => {
        setSelectedColors([...selectedColors, color]);
    };

    return (
        <ul>
            {nodes.map((node, index) => (
                <li key={index}>
                    {node.children ? (
                        <>
                            <span>{node.name}</span>
                            <ColorTree nodes={node.children} />
                        </>
                    ) : (
                        <button onClick={() => handleSelectColor(node.name)}>{node.name}</button>
                    )}
                </li>
            ))}
        </ul>
    );
};

export default ColorTree;
