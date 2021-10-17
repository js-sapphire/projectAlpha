import * as React from 'react';
import { useFirebaseService } from '../hooks';

export const TrackerDataContext = React.createContext<any>(null);

export function TrackerDataProvider({ children }: any) {
    const [weekData, setWeekData] = React.useState();
    const [monthData, setMonthData] = React.useState();
    const firebaseService = useFirebaseService();

    const getWeekData = React.useCallback(() => {
         
    }, []);

    return(
        <TrackerDataContext.Provider value={null}>
            { children }
        </TrackerDataContext.Provider>
    )
}