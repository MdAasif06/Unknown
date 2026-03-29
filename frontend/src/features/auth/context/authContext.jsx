import { createContext, useState,useEffect } from "react";
import { getUsers } from "../services/auth.api";
export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await getUsers();
        setUser(result.user);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <authContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </authContext.Provider>
  );
};
