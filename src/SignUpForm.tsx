import * as React from 'react';
import { useFirebaseService } from "./hooks/useFirebaseService";

export function SignUpForm() {
    const firebaseService = useFirebaseService();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
  
    const signUpUser = React.useCallback(() => {
        firebaseService?.signUpUser(email, password);
    }, [firebaseService, email, password]);

    return (
     <div>
        <input autoComplete="off" type="text" value={email} placeholder="Enter email" 
        onChange={(event) => { setEmail(event.target.value) }}></input>
        <input autoComplete="off" type="password" value={password} placeholder="Enter password" onChange={(event) => setPassword(event.target.value)}></input>
        <button onClick={signUpUser}>Sign Up</button>
     </div>
    );
  }