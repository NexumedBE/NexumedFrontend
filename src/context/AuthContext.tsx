import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import { FeUser } from "../models/FeUser";

interface AuthState {
  user: FeUser | null;
  isAuthenticated: boolean;
}

type AuthAction = 
  | { type: "LOGIN"; payload: FeUser }
  | { type: "LOGOUT" };

const loadUserFromStorage = (): AuthState => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? { user: JSON.parse(storedUser), isAuthenticated: true }
      : { user: null, isAuthenticated: false };
  }
  return { user: null, isAuthenticated: false };
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      console.log("Storing user data in AuthContext:", action.payload);
      
      const userData: FeUser = {
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        drsId: action.payload.drsId,
        address: action.payload.address ?? "",
        country: action.payload.country ?? "",
        firstName: action.payload.firstName ?? "",
        jobTitle: action.payload.jobTitle ?? "",
        lastName: action.payload.lastName ?? "",
        phone: action.payload.phone ?? "",
        town: action.payload.town ?? "",
        practice: action.payload.practice ?? "",
        admin: action.payload.admin ?? false,
        current: action.payload.current ?? false,
        firstTime: action.payload.firstTime ?? false,
        emrProviders: action.payload.emrProviders ?? [],
        selectedDevices: action.payload.selectedDevices ?? [],
        doctors: action.payload.doctors ?? [],
      };

      localStorage.setItem("user", JSON.stringify(userData)); 
      return { user: userData, isAuthenticated: true };

    case "LOGOUT":
      localStorage.removeItem("user"); 
      return { user: null, isAuthenticated: false };

    default:
      throw new Error(`Unhandled action type: ${(action as any).type}`);
  }
};

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
} | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, loadUserFromStorage());

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
