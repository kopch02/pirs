import React from 'react';
import { observer } from 'mobx-react-lite';
import blenderStore from '../store/BlenderStore';

const BlendResult: React.FC = () => {
    
    const blendColors = (color1: string, color2: string) => {
        if (!color1 || !color2) return 'Недостаточно данных для комбинирования';
        return `${color1} + ${color2}`;
    };

    return (
        <div>
            <h2>Результат комбинирования: {blendColors(blenderStore.color1,blenderStore.color2)}</h2>
        </div>
    );
};

export default observer(BlendResult);
