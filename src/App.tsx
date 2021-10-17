import React from "react";
import { DateServiceProvider, FirebaseProvider } from "./context"; 
import { UserSession } from "./UserSession";
import { AddHabit } from "./AddHabit";
import { CurrentDayTracker } from "./CurrentDayTracker";
import { WeekTrackerButton } from "./WeekTrackerButton";

function App() {

  return (
    <FirebaseProvider>
      <DateServiceProvider>
        <UserSession />
        <AddHabit />
        <CurrentDayTracker />
        <WeekTrackerButton />
      </DateServiceProvider>
    </FirebaseProvider>
  );
}

export default App;
