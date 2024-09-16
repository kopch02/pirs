import React from 'react';
import { observer } from 'mobx-react-lite';
import blenderStore from '../store/BlenderStore';

const ColorPicker1 = ({data}:{data:string[]}) => {

    const handleSelectColor = (color: React.ChangeEvent<HTMLSelectElement>) => {
        blenderStore.setColor1(color.target.value);
    };

    return (
        <select onChange={(color) => handleSelectColor(color)} value={blenderStore.color1}>
            <option value="">Выберите цвет 1</option>
            {data.map((item: string) => {
                return <option value={item}>{item}</option>;
            })}
        </select>
    );
};

export default observer(ColorPicker1);
