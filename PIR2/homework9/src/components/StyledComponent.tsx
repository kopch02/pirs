import ColorPicker1 from './ColorPicker1';
import ColorPicker2 from './ColorPicker2';
import BlendResult from './BlenderResult';
import BlendResultTree from './BlenderResultTree';

const withInputStyle = (WrappedComponent: any) => {
    return (props: any) => (
        <div style={{ margin: '10px 0', padding: '5px', border: '1px solid #ccc' }}>
            <WrappedComponent {...props} />
        </div>
    );
};

const withOutputStyle = (WrappedComponent: any) => {
    return (props: any) => (
        <div style={{ margin: '20px 0', padding: '10px', backgroundColor: '#f0f0f0' }}>
            <WrappedComponent {...props} />
        </div>
    );
};

export const StyledColorPicker1 = withInputStyle(ColorPicker1);
export const StyledColorPicker2 = withInputStyle(ColorPicker2);
export const StyledBlendResult = withOutputStyle(BlendResult);
export const StyledBlendResultTree = withOutputStyle(BlendResultTree);
