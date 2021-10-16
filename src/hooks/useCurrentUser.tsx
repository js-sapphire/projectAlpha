import * as React from 'react';
import { useFirebaseService } from "./useFirebaseService";

export function useCurrentUser() {
    const [currentUser, setCurrentUser] = React.useState<any>();
    const firebaseService = useFirebaseService();
    React.useEffect(() => {
      if (firebaseService) {
        try {
          firebaseService.getCurrentUser()((user: any) => { user ? setCurrentUser(user) : setCurrentUser(null)} );
        } catch {
          console.warn(`No current user`);
        }
      }
    }, [firebaseService]);
    return currentUser;
  }