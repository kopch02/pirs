import { useBlender } from '../context/Blender';

const ColorPicker1 = ({ data }: { data: string[] }) => {
    const { selectedItems, setSelectedItems } = useBlender();

    const handleSelect = (event: any) => {
        setSelectedItems({ ...selectedItems, color1: event.target.value });
    };

    return (
        <select onChange={handleSelect} value={selectedItems.color1}>
            <option value="">Выберите цвет 1</option>
            {data.map((item: string) => {
                return <option value={item}>{item}</option>;
            })}
        </select>
    );
};

export default ColorPicker1;
