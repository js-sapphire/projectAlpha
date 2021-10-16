import * as React from 'react';

export function useDebounce(habitName: string, waitTime: number){
    const [debouncedValue, setDebouncedValue] = React.useState(habitName);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(habitName);
        }, waitTime);
        return () => {
            clearTimeout(timer);
        }
    }, [habitName, waitTime])
    return debouncedValue;
}
