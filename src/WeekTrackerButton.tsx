import * as React from 'react';

export function WeekTrackerButton(){
    const [showWeekTracker, setShowWeekTracker] = React.useState<any>();
    const [showMonthTracker, setShowMonthTracker] = React.useState<any>();

    React.useEffect(() => {
        if (showWeekTracker) {
            showMonthTracker(false);
        }
    }, [showWeekTracker]);

    React.useEffect(() => {
        if (showMonthTracker) {
            showWeekTracker(false);
        }
    }, [showMonthTracker]);


    return(
        <>
        <button onClick={() => setShowWeekTracker(!showWeekTracker)}>Week</button>
        <button onClick={() => setShowMonthTracker(!showMonthTracker)}>Month</button>
        </>
    )
}