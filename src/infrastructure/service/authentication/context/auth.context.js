import React, { useState, createContext, useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { Login, Logout } from "../../mutation";
import { IS_AUTHENTICATED } from "../../query";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const [login, { loading: loginLoading }] = useMutation(Login);
  const [isAuthenticatedQuery] = useLazyQuery(IS_AUTHENTICATED);
  const [logout] = useMutation(Logout);

  const onLogin = async (username, password) => {
    setLoading(true);
    try {
      const { data } = await login({ variables: { username, password } });
      setUser(data.login.user);
      await AsyncStorage.setItem("token", data.login.token);
      setIsAuthenticated(true);
      setLoading(loginLoading);
      return data;
    } catch (error) {
      setError(error);
      setLoading(false);
      console.log("error", error.message);
      throw error;
    }
  };
  const onLogout = async () => {
    await logout();
    setUser(null);
    setIsAuthenticated(false);
    await AsyncStorage.removeItem("token");
  };

  const checkAuth = async () => {
    setLoading(true);
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const {
        data: { isLoggedIn },
      } = await isAuthenticatedQuery();
      if (isLoggedIn) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        AsyncStorage.clear();
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        err,
        user,
        isAuthenticated,
        onLogin,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
