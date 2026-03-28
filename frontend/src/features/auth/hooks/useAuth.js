import { useContext } from "react";
import { authContext } from "../context/authContext";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUsers,
} from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(authContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const result = await loginUser({ email, password });
      setUser(result.user);
      return result;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    try {
      setLoading(true);
      const result = await registerUser({ username, email, password });
      setUser(result.user);
      return result;
    } catch (error) {
      console.error("Register Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logoutUser();
      setUser(null);
    } catch (error) {
      console.error("Logout Error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { user, loading, handleLogin, handleRegister, handleLogout };
};