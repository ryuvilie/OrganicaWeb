// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { apiPost } from "../api/client";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const STORAGE_USER = "usuario";
const STORAGE_TOKEN = "token";

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // 🔄 Cargar sesión almacenada al iniciar
  useEffect(() => {
    const u = localStorage.getItem(STORAGE_USER);
    const t = localStorage.getItem(STORAGE_TOKEN);

    if (u) setUsuario(JSON.parse(u));
    if (t) setToken(t);
  }, []);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const resp = await apiPost("/auth/login", {
      correo: email,
      clave: password,
    });

    const userData = {
      id: resp.id_usuario,
      nombre: resp.nombre,
      correo: resp.correo,
      rol: resp.rol,
    };

    setUsuario(userData);
    setToken(resp.token);

    localStorage.setItem(STORAGE_USER, JSON.stringify(userData));
    localStorage.setItem(STORAGE_TOKEN, resp.token);

    return userData;
  };

  // 🆕 REGISTER
  const register = async (nombre, email, password) => {
    const resp = await apiPost("/auth/register", {
      nombre,
      correo: email,
      clave: password,
    });

    if (resp.token) {
      const userData = {
        id: resp.id_usuario,
        nombre: resp.nombre ?? nombre,
        correo: resp.correo ?? email,
        rol: resp.rol ?? "USER",
      };

      setUsuario(userData);
      setToken(resp.token);

      localStorage.setItem(STORAGE_USER, JSON.stringify(userData));
      localStorage.setItem(STORAGE_TOKEN, resp.token);

      return userData;
    }

    return resp;
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
  };

  // 🎭 ROLES (CLAROS Y REUTILIZABLES)
  const isAdmin = usuario?.rol === "ADMIN";
  const isVendedor = usuario?.rol === "VENDEDOR";
  const isCliente = usuario?.rol === "CLIENTE";
  const isUser = usuario?.rol === "USER";

  return (
    <UserContext.Provider
      value={{
        usuario,
        token,
        isAdmin,
        isVendedor,
        isCliente,
        isUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
