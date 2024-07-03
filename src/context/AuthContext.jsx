import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "logout":
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error("Unknown Action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispach] = useReducer(
    reducer,
    initialState
  );

  function login(email, pass) {}

  function logout() {}

  return <AuthContext.Provider>{children} </AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used out of AuthProvider");
  return context;
}

export { AuthProvider };
