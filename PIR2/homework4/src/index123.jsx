import React from "react";

const SimpleComponent = React.memo(({ number, componentRerenderedTimes }) => {
    componentRerenderedTimes.current++;
    const onPress = () => alert(number);
    return <div onClick={onPress}>Number: {number}</div>;
});

export default function App() {
    const componentRerenderedTimes = React.useRef(0);
    const [data, setData] = React.useState(
        new Array(1000)
            .fill({ number: 0 })
            .map((item, index) => ({ number: item.number, id: String(index + 1) }))
    );
// eslint-disable-next-line 
    const random = React.useCallback(() =>{
        const email = undefined
        const first = {
            ...(email && { email }),
        }
        console.log(first)
    });

    const updateData = React.useCallback(() => {
        setData(prevData => [{ number: 0, id: Math.random() }, ...prevData]);
    }, []);

    return (
        <div>
            <div>Was rendered: {componentRerenderedTimes.current}</div>
            <button onClick={random}>random</button>
            <button onClick={updateData}>add to top</button>
            {data.map(item => (
            <SimpleComponent
                key={item.id}
                number={item.number}
                componentRerenderedTimes={componentRerenderedTimes}
            />
            ))}
        </div>
        
    );
}
