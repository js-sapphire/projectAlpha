import * as React from 'react';
import { useCurrentUser, useDateService, useFirebaseService } from "./hooks";
import { IFirebaseService } from "./services/interfaces"

const SAMPLE_DATE = "00/00/00";

export function CurrentDayTracker(){
    const currentUser = useCurrentUser();
    const firebaseService = useFirebaseService();
    const dateService = useDateService();
    const [ userData, setUserData ] = React.useState<any>({});
    const [ habits, setHabits] = React.useState<any>([]);
    const [ habitStatusMap, setHabitStatusMap ] = React.useState<Record<string, boolean>>({});

    useUserDataEffect(firebaseService, currentUser, setUserData);
    useHabitsEffect(firebaseService, userData, setHabits, currentUser);
    useHabitStatusEffect(userData, habits, dateService, setHabitStatusMap);

    const onCheck = React.useCallback((habitId, event) => {
        const value = event.target.checked;
        event.stopPropagation();
        firebaseService?.updateHabitForUser(habitId, value);
    }, []);


    if (!currentUser) {
        return null;
    }

    return (
        <>
            <>
                { habits && 
                <table>
                    <thead>
                        <tr>
                        <th>Habit</th>
                        <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        { habits.map((habit: any) => 
                        <tr>
                            <td>{habit.name}</td>
                            <td><input type="checkbox" checked={habitStatusMap[habit.id]} onChange={(event) => onCheck(habit.id, event)}></input></td>
                        </tr> )}
                    </tbody>
                    
                </table>
                }
            </>
        </>
    )
}

function useHabitStatusEffect(userData: any, habits: any, dateService: import("/home/shekhar/Projects/Javascript/projectAlpha/src/services/DateService").IDateService | undefined, setHabitStatusMap: React.Dispatch<React.SetStateAction<Record<string, boolean>>>) {
    React.useEffect(() => {
        if (!userData) {
            return;
        }

        if (!habits || habits?.length === 0) {
            return;
        }

        const currentDate = dateService?.getCurrentDate() || SAMPLE_DATE;
        const currentDateHabitsDone = userData.tracking[currentDate];
        const tempMap: Record<string, boolean> = {};

        currentDateHabitsDone.forEach((habitId: string) => {
            tempMap[habitId] = true;
        });

        habits.forEach((habit: any) => {
            if (!tempMap[habit.id]) {
                tempMap[habit.id] = false;
            }
        });

        setHabitStatusMap(tempMap);


    }, [habits]);
}

function useUserDataEffect(firebaseService: IFirebaseService | undefined, currentUser: any, setUserData: React.Dispatch<any>) {
    React.useEffect(() => {
        async function invoke() {
            await firebaseService?.getUserData(setUserData);
        }
        currentUser && invoke();
    }, [currentUser]);
}

function useHabitsEffect(firebaseService: IFirebaseService | undefined, userData: any, setHabits: React.Dispatch<any>, currentUser: any) {
    React.useEffect(() => {
        async function invoke() {
            const result = await firebaseService?.getHabits(userData.habits);
            setHabits(result);
        }

        if (!userData || userData.habits?.length === 0) {
            return;
        }

        currentUser && invoke();
    }, [userData]);
}
