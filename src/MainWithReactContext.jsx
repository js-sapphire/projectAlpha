import React from 'react';
import { AppContext } from "./AppContext";


const useRerender = () => {
    const renderRef = React.useRef(0);
    return renderRef.current++;
}

export const MainWithReactContext = () => {
    const renderCount = useRerender();
    return(
        <>
            <p>Main component rendering {renderCount} times</p>
            <NameComponent />
            <AgeComponent />
            <AddressComponent />
            <HabitsComponent />
        </>
    )
}

const NameComponent = () => {
    const { myNestedObject, setMyNestedObject } = React.useContext(AppContext);
    const { name, habits } = myNestedObject;
    const renderCount = useRerender();

    const handleChange = (e) => {
        setMyNestedObject({
            ...myNestedObject,
            name: e.target.value
        });
    }

    return (
        <>
        <p>Name component rendering {renderCount} times</p>
        <h3>Name: {name}</h3>
        <input onChange={handleChange}></input>
        </>
    )
}


const AgeComponent = () => {
    const { myNestedObject } = React.useContext(AppContext);
    const { age } = myNestedObject;
    const renderCount = useRerender();

    return (
        <>
        <p>Age component rendering {renderCount} times</p>
        <h3>Age is {age}</h3>
        </>
    )
}

const AddressComponent = () => {
    const renderCount = useRerender();
    const { myNestedObject } = React.useContext(AppContext);
    const { address } = myNestedObject;

    return (
        <>
            <p>Address component rendering {renderCount} times</p>
            <h2>Primary address: {address.primary.state} {address.primary.city} {address.primary.fullAddress.line1} {address.primary.fullAddress.line2} {address.primary.fullAddress.line3}</h2>
        </>        
    )
}

const HabitsComponent = () => {
    const renderCount = useRerender();
    const { myNestedObject, setMyNestedObject } = React.useContext(AppContext);
    const { habits, name } = myNestedObject;
    const [inputHabit, setInputHabit] = React.useState({});



    const handleHabitNameInput = (e) => {
        setInputHabit({
            ...inputHabit,
            name: e.target.value
        })
    }

    const handleHabitFreqInput = (e) => {
        setInputHabit({
            ...inputHabit,
            frequency: e.target.value
        })
    }

    const handleHabitAdd = () => {
        setMyNestedObject({
            ...myNestedObject,
            habits: {
                ...habits,
                allHabits: [
                    ...habits.allHabits,
                    inputHabit
                ]
            }
        });
    }

    return(
        <>
            <p>Habits component rendering {renderCount} times</p>
            <h4>{habits.allHabits.map((habit) => <div><p>{habit.name} done {habit.frequency}</p></div>)}</h4>
            <div>
                <input onChange={handleHabitNameInput}></input>
                <input onChange={handleHabitFreqInput}></input>
                <button onClick={handleHabitAdd}>Add Habit</button>
            </div>
        </>
    )
}

