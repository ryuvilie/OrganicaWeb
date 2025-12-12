// src/context/UserContext.jsx
import React, { createContext, useState, useContext, useEffect } from "react";
import { apiPost } from "../api/client";
import { apiUsuarios } from "../api/usuarios";

const UserContext = createContext();
export const useUser = () => useContext(UserContext);

const STORAGE_USER = "usuario";
const STORAGE_TOKEN = "token";

function normalizePerfil(perfil, fallback = {}) {
  return {
    id: perfil?.id_usuario ?? perfil?.id ?? fallback.id ?? null,
    nombre: perfil?.nombre ?? fallback.nombre ?? "",
    correo: perfil?.correo ?? fallback.correo ?? "",
    rol: perfil?.rol ?? fallback.rol ?? "USER",
  };
}

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(null);

  // 🔄 Cargar sesión almacenada al iniciar
  useEffect(() => {
    const u = localStorage.getItem(STORAGE_USER);
    const t = localStorage.getItem(STORAGE_TOKEN);

    if (t) setToken(t);
    if (u) setUsuario(JSON.parse(u));
  }, []);

  // ✅ Si hay token, aseguramos que el perfil venga completo (correo, rol, etc.)
  useEffect(() => {
    const ensurePerfil = async () => {
      if (!token) return;

      // Si ya tengo correo + rol, no molesto
      if (usuario?.correo && usuario?.rol) return;

      try {
        const perfil = await apiUsuarios.getPerfil();
        const userData = normalizePerfil(perfil, usuario || {});
        setUsuario(userData);
        localStorage.setItem(STORAGE_USER, JSON.stringify(userData));
      } catch (e) {
        // Si falla, al menos no rompe la app
        console.error("No se pudo refrescar perfil:", e);
      }
    };

    ensurePerfil();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  // 🔐 LOGIN
  const login = async (email, password) => {
    const resp = await apiPost("/auth/login", {
      correo: email,
      clave: password,
    });

    // 1) Guardar token primero (para que /perfil funcione con Authorization)
    setToken(resp.token);
    localStorage.setItem(STORAGE_TOKEN, resp.token);

    // 2) Fallback mínimo si el backend no manda correo en login
    const fallbackUser = {
      id: resp.id_usuario,
      nombre: resp.nombre ?? "",
      correo: resp.correo ?? email ?? "",
      rol: resp.rol ?? "USER",
    };

    // 3) Pedir perfil real y guardarlo (esto corrige el "Correo:" vacío)
    try {
      const perfil = await apiUsuarios.getPerfil();
      const userData = normalizePerfil(perfil, fallbackUser);

      setUsuario(userData);
      localStorage.setItem(STORAGE_USER, JSON.stringify(userData));

      return userData;
    } catch (e) {
      console.error("Login OK, pero no se pudo cargar /perfil:", e);

      // si /perfil falla, igual guardamos el fallback
      setUsuario(fallbackUser);
      localStorage.setItem(STORAGE_USER, JSON.stringify(fallbackUser));

      return fallbackUser;
    }
  };

  // 🆕 REGISTER
  const register = async (nombre, email, password) => {
    const resp = await apiPost("/auth/register", {
      nombre,
      correo: email,
      clave: password,
    });

    if (!resp.token) return resp;

    // 1) Guardar token primero
    setToken(resp.token);
    localStorage.setItem(STORAGE_TOKEN, resp.token);

    const fallbackUser = {
      id: resp.id_usuario,
      nombre: resp.nombre ?? nombre ?? "",
      correo: resp.correo ?? email ?? "",
      rol: resp.rol ?? "USER",
    };

    // 2) Traer perfil real
    try {
      const perfil = await apiUsuarios.getPerfil();
      const userData = normalizePerfil(perfil, fallbackUser);

      setUsuario(userData);
      localStorage.setItem(STORAGE_USER, JSON.stringify(userData));

      return userData;
    } catch (e) {
      console.error("Register OK, pero no se pudo cargar /perfil:", e);

      setUsuario(fallbackUser);
      localStorage.setItem(STORAGE_USER, JSON.stringify(fallbackUser));

      return fallbackUser;
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem(STORAGE_USER);
    localStorage.removeItem(STORAGE_TOKEN);
  };

  // 🎭 ROLES
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
