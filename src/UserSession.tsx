import React from "react";
import { useFirebaseService } from "./hooks/useFirebaseService";
import { useCurrentUser } from "./hooks/useCurrentUser";
import { SignOutButton } from "./SignOut";
import { SignUpForm } from "./SignUpForm";
import { SignInForm } from "./SignInForm";


export function UserSession() {

  const [showSignUpAndInButton, setShowSignUpAndInButton] = React.useState(false);
  const [showSignOutButton, setSignOutButton] = React.useState(false);
  const [showSignUpForm, setShowSignUpForm] = React.useState(false);
  const [showSignInForm, setShowSignInForm] = React.useState(false);
  const signUpModalRef = React.createRef<HTMLDivElement>();
  const signInModalRef = React.createRef<HTMLDivElement>();
  const currentUser = useCurrentUser();


  React.useEffect(() => {
    if (!currentUser) {
        setShowSignUpAndInButton(true);
        setSignOutButton(false);
    } else {
        setShowSignUpAndInButton(false)
        setSignOutButton(true);
    }
  }, [currentUser]);

  React.useEffect(() => {
    if(showSignOutButton){
      setShowSignUpForm(false);
      setShowSignInForm(false);
    }
  }, [showSignOutButton])

  return (
   <div>
       { showSignUpAndInButton &&
            <>
            <button onClick={() => setShowSignUpForm(true)}>Sign Up</button>
            <button onClick={() => setShowSignInForm(true)}>Sign In</button>
            { showSignUpForm && <SignUpForm />}
            { showSignInForm && <SignInForm />}
            </>
       }
       { showSignOutButton && <SignOutButton /> }
       <div ref={signUpModalRef}></div>
       <div ref={signInModalRef}></div>
   </div>
  );
}
