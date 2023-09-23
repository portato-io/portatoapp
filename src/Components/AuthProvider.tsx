import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, getIdTokenResult, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface AuthState {
  uid: string | undefined;
  isAdmin: boolean | undefined;
  user: User | null;
  emailVerified: boolean | undefined; // Added emailVerified here
  loading: boolean;
}

const initialState: AuthState = {
  uid: undefined,
  isAdmin: undefined,
  user: null,
  emailVerified: undefined, // And initialize here
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
  const [emailVerified, setEmailVerified] = useState<boolean | undefined>(
    initialState.emailVerified
  ); // Added useState for emailVerified
  const [loading, setLoading] = useState<boolean>(initialState.loading);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUid(user.uid);
        setUser(user);
        setEmailVerified(user.emailVerified); // Set emailVerified here
        const token = await getIdTokenResult(user);
        setIsAdmin(!!token.claims.admin);
      } else {
        setUid(undefined);
        setIsAdmin(undefined);
        setUser(null);
        setEmailVerified(undefined); // Reset to undefined when user logs out
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ uid, isAdmin, user, emailVerified, loading }} // Added emailVerified here
    >
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

export const isEmailVerified = () => {
  const { emailVerified } = useAuth(); // Get emailVerified from context
  return emailVerified;
};
