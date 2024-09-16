import { useBlender } from '../context/Blender';

const ColorPicker2 = ({ data }: { data: string[] }) => {
    const { selectedItems, setSelectedItems } = useBlender();

    const handleSelect = (event: any) => {
        setSelectedItems({ ...selectedItems, color2: event.target.value });
    };

    return (
        <select onChange={handleSelect} value={selectedItems.color2}>
            <option value="">Выберите цвет 2</option>
            {data.map((item: string) => {
                return <option value={item}>{item}</option>;
            })}
        </select>
    );
};

export default ColorPicker2;
