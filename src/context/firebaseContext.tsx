import * as React from 'react';
import { FirebaseService, IFirebaseService } from '../services/firebaseService';

type IFirebaseContext = {
    firebaseService: IFirebaseService
} | null

export const FirebaseContext = React.createContext<IFirebaseContext>(null);

export function FirebaseProvider({ children }: any) {
    const instance = FirebaseService.getInstance();
    return (
        <FirebaseContext.Provider value={{firebaseService: instance}}>
            {children}
        </FirebaseContext.Provider>
    )
}
