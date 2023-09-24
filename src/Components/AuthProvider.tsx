import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from 'react';
import { onAuthStateChanged, getIdTokenResult, User } from 'firebase/auth';
import { auth } from '../firebaseConfig';

interface AuthState {
  uid: string | undefined;
  isAdmin: boolean | undefined;
  user: User | null;
  emailVerified: boolean | undefined;
  loading: boolean;
  recheckEmailVerification: () => void;
}

const initialState: AuthState = {
  uid: undefined,
  isAdmin: undefined,
  user: null,
  emailVerified: undefined,
  loading: true,
  recheckEmailVerification: () =>
    console.warn('recheckEmailVerification has not been initialized yet'),
};

const AuthContext = createContext<AuthState>(initialState);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  const recheckEmailVerification = useCallback(async () => {
    if (state.user) {
      const token = await getIdTokenResult(state.user);
      setState((prev) => ({
        ...prev,
        emailVerified: state.user?.emailVerified,
        isAdmin: !!token.claims.admin,
      }));
    }
  }, [state.user]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const token = await getIdTokenResult(user);
        setState({
          uid: user.uid,
          user,
          emailVerified: user.emailVerified,
          isAdmin: !!token.claims.admin,
          loading: false,
          recheckEmailVerification,
        });
      } else {
        setState({ ...initialState, loading: false, recheckEmailVerification });
      }
    });

    return () => unsubscribe();
  }, [recheckEmailVerification]);

  if (state.loading) {
    return <div>Loading...</div>;
  }

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
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
  const { emailVerified } = useAuth();
  return emailVerified;
};
