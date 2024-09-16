import React from 'react';
import { useBlender } from '../context/BlenderTree';

const BlendResultTree: React.FC = () => {
    const { selectedColors } = useBlender();

    return (
        <div>
            <h2>Результат комбинирования:</h2>
            {selectedColors.length === 0 ? (
                <p>Цвета не выбраны</p>
            ) : (
                <ul>
                    {selectedColors.map((color, index) => (
                        <li key={index} style={{ color }}>
                            {color}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default BlendResultTree;
