import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, getIdTokenResult, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface AuthState {
  uid: string | undefined;
  isAdmin: boolean | undefined;
  user: User | null;
  loading: boolean;
}

const initialState: AuthState = {
  uid: undefined,
  isAdmin: undefined,
  user: null,
  loading: true,
};

const AuthContext = createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [uid, setUid] = useState<string | undefined>(initialState.uid);
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(
    initialState.isAdmin
  );
  const [user, setUser] = useState<User | null>(initialState.user);
  const [loading, setLoading] = useState<boolean>(initialState.loading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        setUser(user);
        const token = await getIdTokenResult(user);
        setIsAdmin(!!token.claims.admin);
      } else {
        setUid(undefined);
        setIsAdmin(undefined);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ uid, isAdmin, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export const checkAdmin = () => {
  const { isAdmin } = useAuth();
  return isAdmin;
};

export const getUser = () => {
  const { user } = useAuth();
  return user;
};
