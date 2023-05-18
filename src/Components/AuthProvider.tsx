import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
// Create a context
const AuthContext = createContext<{ uid: string | undefined }>({
  uid: undefined,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

// Create a context provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [uid, setUid] = useState<string | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // If user is logged in, set uid
      if (user) {
        setUid(user.uid);
      } else {
        // If user is logged out, clear uid
        setUid(undefined);
      }
    });

    // Clean up subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ uid }}>{children}</AuthContext.Provider>
  );
};

// Create a custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);
