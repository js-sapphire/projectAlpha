import * as React from 'react';

export function MonthTrackerButton(){
    const [showMonthTracker, setShowMonthTracker] = React.useState<any>();
    
    return(
        <>
        <button onClick={() => setShowMonthTracker(!showMonthTracker)}>Week</button>
        </>
    )
}