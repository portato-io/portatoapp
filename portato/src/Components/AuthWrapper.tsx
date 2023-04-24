import React from "react";
import { auth } from "../firebaseConfig";
import { onAuthStateChanged, User } from "firebase/auth";
import FirebaseAuth from "../Components/FirebaseAuth";

interface AuthWrapperProps {
  Component: React.FC;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ Component }) => {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return user ? <Component /> : <FirebaseAuth />;
};

export default AuthWrapper;
