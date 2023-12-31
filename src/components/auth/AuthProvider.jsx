import React, { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (accessToken) => {},
  handleLogout: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const handleLogin = (accessToken) => {
    const decodedUser = jwtDecode(accessToken);
    localStorage.setItem("sub", decodedUser.sub);
    localStorage.setItem("role", decodedUser.role);
    localStorage.setItem("accessToken", accessToken);
    setUser(decodedUser);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
