import { BlenderProvider } from './context/Blender';
import { BlenderProviderTree } from './context/BlenderTree';
import {
    StyledColorPicker1,
    StyledColorPicker2,
    StyledBlendResult,
    StyledBlendResultTree,
} from './components/StyledComponent';
import ColorTree from './components/ColorTree';

interface ColorNode {
    name: string;
    children?: ColorNode[];
}

const colorTree: ColorNode[] = [
    {
        name: 'Тёплые',
        children: [
            {
                name: 'Светлые',
                children: [{ name: 'Жёлтый' }, { name: 'Персиковый' }],
            },
            {
                name: 'Тёмные',
                children: [{ name: 'Красный' }, { name: 'Коричневый' }],
            },
        ],
    },
    {
        name: 'Холодные',
        children: [
            {
                name: 'Светлые',
                children: [{ name: 'Голубой' }, { name: 'Мятный' }],
            },
            {
                name: 'Тёмные',
                children: [{ name: 'Синий' }, { name: 'Фиолетовый' }],
            },
        ],
    },
];

const App = () => {
    return (
        <div>
            <BlenderProvider>
                <div style={{ padding: '15px' }}>
                    <h1>Блендер цветов</h1>
                    <StyledColorPicker1 data={['Красный', 'Синий', 'Зелёный']} />
                    <StyledColorPicker2 data={['Жёлтый', 'Оранжевый', 'Коричневый']} />
                    <StyledBlendResult />
                </div>
            </BlenderProvider>
            <BlenderProviderTree>
                <div style={{ padding: '15px' }}>
                    <h1>Блендер цветов</h1>
                    <ColorTree nodes={colorTree} />
                    <StyledBlendResultTree />
                </div>
            </BlenderProviderTree>
        </div>
    );
};

export default App;
