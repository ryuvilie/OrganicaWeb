// src/pages/Perfil.jsx
import React, { useState } from "react";
import { useUser } from "../context/UserContext";
import { Link } from "react-router-dom";
import "../styles/Perfil.css";

const Perfil = () => {
  const { usuario, logout } = useUser();
  const esAdmin = usuario?.rol === "ADMIN";

  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState({
    nombre: usuario?.nombre || "",
    correo: usuario?.correo || "",
    password: ""
  });

  if (!usuario) {
    return (
      <main className="perfil-container">
        <h1>No has iniciado sesión</h1>
      </main>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleGuardar = (e) => {
    e.preventDefault();
    console.log("Datos editados:", form);
    setEditando(false);
  };

  return (
    <main className="perfil-container">
      <div className="perfil-card">

        <h1 className="perfil-title">Mi Perfil</h1>

        {/* ======================= */}
        {/*   VISTA NORMAL          */}
        {/* ======================= */}
        {!editando && (
          <div className="perfil-info">

            <p><strong>Nombre:</strong> {usuario.nombre}</p>
            <p><strong>Correo:</strong> {usuario.correo}</p>
            <p><strong>Rol:</strong> {usuario.rol}</p>

            {/* ======== ACCIONES ======== */}
            <div className="perfil-actions">
              <div className={`perfil-actions-row ${esAdmin ? "is-admin" : ""}`}>
                <button
                  type="button"
                  className="perfil-edit-btn"
                  onClick={() => setEditando(true)}
                >
                  Editar perfil
                </button>

                {esAdmin && (
                  <Link to="/admin/usuarios" className="perfil-admin-btn">
                    Administrar usuarios
                  </Link>
                )}
              </div>

              <button
                type="button"
                className="btn-cancel"
                onClick={logout}
              >
                Cerrar sesión
              </button>
            </div>

          </div>
        )}

        {/* ======================= */}
        {/*   MODO EDICIÓN          */}
        {/* ======================= */}
        {editando && (
          <form onSubmit={handleGuardar} className="perfil-form">

            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              required
            />

            <label>Correo</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              required
            />

            <label>Nueva contraseña (opcional)</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••"
            />

            <div className="perfil-form-buttons">
              <button className="btn-save" type="submit">
                Guardar
              </button>

              <button
                type="button"
                className="btn-cancel"
                onClick={() => setEditando(false)}
              >
                Cancelar
              </button>
            </div>

          </form>
        )}

      </div>
    </main>
  );
};

export default Perfil;
