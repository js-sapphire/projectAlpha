import React from "react";
import { FirebaseProvider } from "./context/firebaseContext";
import { UserSession } from "./UserSession";
import { AddHabit } from "./AddHabit";
import { CurrentDayTracker } from "./CurrentDayTracker";

function App() {

  return (
    <FirebaseProvider>
      <UserSession />
      <AddHabit />
      <CurrentDayTracker />
    </FirebaseProvider>
  );
}

export default App;
