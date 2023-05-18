import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, getIdTokenResult } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const AuthContext = createContext<{
  uid: string | undefined;
  isAdmin: boolean | undefined;
}>({
  uid: undefined,
  isAdmin: undefined,
});

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [uid, setUid] = useState<string | undefined>(undefined);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        const token = await getIdTokenResult(user);
        setIsAdmin(!!token.claims.admin);
      } else {
        setUid(undefined);
        setIsAdmin(undefined);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ uid, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const checkAdmin = () => {
  const { isAdmin } = useAuth();
  return isAdmin;
};
