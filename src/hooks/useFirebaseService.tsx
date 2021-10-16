import * as React from 'react';
import { FirebaseContext } from "../context/firebaseContext";

export function useFirebaseService(){
    const firebaseContext = React.useContext(FirebaseContext);
    return firebaseContext?.firebaseService;
}