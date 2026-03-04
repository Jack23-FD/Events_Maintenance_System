// src/context/AuthProvider.jsx
import { useEffect, useState } from "react";
import AuthContext from "./AuthContext";
import { STORAGE_KEYS } from "../utils/constants";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem(STORAGE_KEYS.USER);
    const role = localStorage.getItem(STORAGE_KEYS.ROLE);
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);

    if (savedUser && role && token) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (data) => {
    // data: { token, role, name, email, ... }
    localStorage.setItem(STORAGE_KEYS.TOKEN, data.token);
    localStorage.setItem(STORAGE_KEYS.ROLE, data.role);
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}