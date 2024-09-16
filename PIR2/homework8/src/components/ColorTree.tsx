import React from 'react';
import { observer } from 'mobx-react-lite';
import blenderStore from '../store/BlenderStoreTree';

interface ColorNode {
    name: string;
    children?: ColorNode[];
}

interface ColorTreeProps {
    nodes: ColorNode[];
}

const ColorTree: React.FC<ColorTreeProps> = ({ nodes }) => {
    const handleSelectColor = (color: string) => {
        blenderStore.addColor(color);
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

export default observer(ColorTree);
