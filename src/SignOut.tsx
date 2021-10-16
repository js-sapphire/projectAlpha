import * as React from 'react';
import { useFirebaseService } from "./hooks/useFirebaseService";

export function SignOutButton() {
    const firebaseService = useFirebaseService();
  
    const signOutUser = React.useCallback(() => {
        firebaseService?.signOutUser();
    }, [firebaseService]);
;
    return (
     <div>
        <button onClick={signOutUser}>Sign Out</button>
     </div>
    );
  }