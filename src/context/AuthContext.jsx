import { createContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithEmailAndPassword, logout } from "../firebase-config";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, isLoading] = useAuthState(auth);
  const [error, setError] = useState(null);

  const userLogin = async (email, password) => {
    try {
      await logInWithEmailAndPassword(email, password);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError(err.message);
    }
  };

  const userLogout = () => {
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        userLogin,
        userLogout,
        isLoading,
        user,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};