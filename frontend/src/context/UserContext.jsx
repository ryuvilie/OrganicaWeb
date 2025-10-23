import React, { createContext, useState, useContext, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage (si estaba logueado)
  useEffect(() => {
    const userGuardado = localStorage.getItem("usuario");
    if (userGuardado) {
      setUsuario(JSON.parse(userGuardado));
    }
  }, []);

  // Iniciar sesión (recibe datos desde el formulario)
  const login = (email) => {
    const nuevoUsuario = { email };
    setUsuario(nuevoUsuario);
    localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
  };

  // Cerrar sesión
  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  return (
    <UserContext.Provider value={{ usuario, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
