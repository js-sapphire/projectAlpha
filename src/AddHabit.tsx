import * as React from 'react';
import { useCurrentUser, useDebounce, useFirebaseService} from './hooks';

export function AddHabit(){
    const currentUser = useCurrentUser();
    const [habitName, setHabitName] = React.useState("");
    const firebaseService = useFirebaseService();
    const [searchResults, setSearchResults] = React.useState([]);
    const debouncedHabitName = useDebounce(habitName, 500);

    const handleAddHabit = React.useCallback(() => {
        firebaseService?.addHabit(habitName);
        setHabitName("");
    }, [habitName])

    useQueryHabitsEffect(firebaseService, debouncedHabitName, setSearchResults);

    if (!currentUser) {
        return null;
    }

    return(
        <>
        <input type="text" placeholder="Add a habit" value={habitName} onChange={(event) => setHabitName(event.target.value)}></input>
        <button onClick={handleAddHabit}>Add Habit</button>
        <div>
            { searchResults?.map((habit: {name: string}, index) => <button onClick={() => onSelect(index)}>{habit.name}</button>)}
        </div>
        </>
    )
}

function useQueryHabitsEffect(firebaseService: import("/home/shekhar/Projects/Javascript/projectAlpha/src/services/firebaseService").IFirebaseService | undefined, debouncedHabitName: string, setSearchResults: React.Dispatch<React.SetStateAction<never[]>>) {
    React.useEffect(() => {
        async function invoke() {
            try {
                const results = await firebaseService?.queryHabit(debouncedHabitName ?? "");
                setSearchResults(results);
            } catch {
                console.warn(`Effect erroring out`);
            }
        }
        invoke();
    }, [debouncedHabitName]);
}
