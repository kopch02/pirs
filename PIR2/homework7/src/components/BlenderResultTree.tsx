import React from 'react';
import { observer } from 'mobx-react-lite';
import blenderStore from '../store/BlenderStoreTree';

const BlendResult: React.FC = () => {

    return (
        <div>
            <h2>Результат комбинирования:</h2>
            {blenderStore.selectedColors.length === 0 ? (
                <p>Цвета не выбраны</p>
            ) : (
                <ul>
                    {blenderStore.selectedColors.map((color, index) => (
                        <li key={index} style={{ color }}>
                            {color}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default observer(BlendResult);
