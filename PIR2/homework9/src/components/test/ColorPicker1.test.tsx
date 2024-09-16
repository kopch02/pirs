import { render, screen, fireEvent } from '@testing-library/react';
import ColorPicker1 from '../ColorPicker1';
import blenderStore from '../../store/BlenderStore';

describe('ColorPicker1 Component', () => {
    test('проверка выбора элемента из выподающего списка и смены данных в сторе', () => {
        render(<ColorPicker1 data={['Красный', 'Синий', 'Зелёный']} />);

        const selectElement = screen.getByDisplayValue('Выберите цвет 1');

        fireEvent.change(selectElement, { target: { value: 'Красный' } });

        expect(blenderStore.color1).toBe('Красный');
    });
});
