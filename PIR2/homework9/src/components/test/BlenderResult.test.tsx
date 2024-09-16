import { render, screen, fireEvent } from '@testing-library/react';
import BlenderResult from '../BlenderResult';
import BlenderStore from '../../store/BlenderStore';
import ColorPicker1 from '../ColorPicker1';
import ColorPicker2 from '../ColorPicker2';

describe('BlenderResult Component', () => {
    test('проверка правильного отображения результата', ()=> {
        render(<ColorPicker1 data={['Красный', 'Синий', 'Зелёный']}/>)
        render(<ColorPicker2 data={['Жёлтый', 'Оранжевый', 'Коричневый']}/>)
        render(<BlenderResult/>)

        const ColorPicker1Element = screen.getByDisplayValue('Выберите цвет 1');
        const ColorPicker2Element = screen.getByDisplayValue('Выберите цвет 2');

        fireEvent.change(ColorPicker1Element, { target: { value: 'Синий' } });
        fireEvent.change(ColorPicker2Element, { target: { value: 'Коричневый' } });

        expect(BlenderStore.color1).toBe('Синий');
        expect(BlenderStore.color2).toBe('Коричневый');

        const ColorResult = screen.getByTitle('result')
        expect(ColorResult.textContent).toBe('Результат комбинирования: Синий + Коричневый')
    });
});