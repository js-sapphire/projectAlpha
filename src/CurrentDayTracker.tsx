import * as React from 'react';
import { useCurrentUser, useFirebaseService } from "./hooks";
import { IFirebaseService } from "./services/interfaces"

export function CurrentDayTracker(){
    const currentUser = useCurrentUser();
    const firebaseService = useFirebaseService();
    const [ userData, setUserData ] = React.useState<any>({});
    const [ habits, setHabits] = React.useState<any>([]);

    useUserDataEffect(firebaseService, currentUser, setUserData);
    useHabitsEffect(firebaseService, userData, setHabits, currentUser);

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
                        { habits.map((habit: any,) => <tr><td>{habit.name}</td><td>Nope</td></tr> )}
                    </tbody>
                    
                </table>
                }
            </>
        </>
    )
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
