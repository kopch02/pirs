import React from "react";

export const useDebounc = (value, delay) => {

    const [debouncValue, setDebouncValue] = React.useState();

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    },[value])

    return debouncValue
}