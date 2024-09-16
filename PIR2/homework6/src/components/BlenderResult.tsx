import { useBlender } from '../context/Blender';

const BlendResult = () => {
    const { selectedItems } = useBlender();

    const blendColors = (color1: string, color2: string) => {
        if (!color1 || !color2) return 'Недостаточно данных для комбинирования';
        return `${color1} + ${color2}`;
    };

    return (
        <div>
            Результат комбинирования: {blendColors(selectedItems.color1, selectedItems.color2)}
        </div>
    );
};

export default BlendResult;
