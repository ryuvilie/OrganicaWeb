// src/pages/AdminUsuarios.jsx
import React, { useEffect, useState } from "react";
import { apiGet, apiPut, apiDelete } from "../api/client";
import { useUser } from "../context/UserContext";
import "../styles/AdminUsuarios.css";

const AdminUsuarios = () => {
  const { isAdmin } = useUser();

  const [usuarios, setUsuarios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const [editUser, setEditUser] = useState(null); // usuario que se está editando

  useEffect(() => {
    if (!isAdmin) return;
    cargarUsuarios();
  }, [isAdmin]);

  const cargarUsuarios = async () => {
    try {
      setCargando(true);
      const data = await apiGet("/api/usuarios");
      setUsuarios(data);
    } catch (e) {
      console.error(e);
      setError("No se pudieron cargar los usuarios");
    } finally {
      setCargando(false);
    }
  };

  // ----------------------------
  // EDITAR USUARIO
  // ----------------------------
  const iniciarEdicion = (u) => {
    setEditUser({ ...u }); // copia de los datos
  };

  const cancelarEdicion = () => {
    setEditUser(null);
  };

  const guardarUsuario = async () => {
    try {
      await apiPut(`/api/usuarios/${editUser.id}`, {
        id: editUser.id,
        nombre: editUser.nombre,
        correo: editUser.correo,
        rol: editUser.rol,
      });

      setEditUser(null);
      cargarUsuarios();
    } catch (e) {
      console.error("Error guardando usuario:", e);
      alert("No se pudo guardar el usuario");
    }
  };

  // ----------------------------
  // ELIMINAR USUARIO
  // ----------------------------
  const eliminarUsuario = async (id, nombre) => {
    if (!window.confirm(`¿Eliminar usuario "${nombre}"?`)) return;

    try {
      await apiDelete(`/api/usuarios/${id}`);
      cargarUsuarios();
    } catch (e) {
      console.error(e);
      alert("No se pudo eliminar el usuario.");
    }
  };

  // ----------------------------
  // RENDER
  // ----------------------------

  if (!isAdmin) {
    return (
      <main className="admin-usuarios">
        <div className="container">
          <h1 className="title">Administración de Usuarios</h1>
          <p>Esta sección es solo para administradores.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-usuarios">
      <div className="container">
        <h1 className="title">Gestión de Usuarios</h1>
        <p className="subtitle">Edita nombres, correos, roles o elimina usuarios.</p>

        {error && <p className="error">{error}</p>}

        {cargando ? (
          <p>Cargando usuarios...</p>
        ) : (
          <table className="usuarios-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {usuarios.map((u) => (
                <tr key={u.id}>
                  {editUser?.id === u.id ? (
                    <>
                      {/* ----- MODO EDICIÓN ----- */}
                      <td>{u.id}</td>

                      <td>
                        <input
                          type="text"
                          value={editUser.nombre}
                          onChange={(e) =>
                            setEditUser({ ...editUser, nombre: e.target.value })
                          }
                        />
                      </td>

                      <td>
                        <input
                          type="email"
                          value={editUser.correo}
                          onChange={(e) =>
                            setEditUser({ ...editUser, correo: e.target.value })
                          }
                        />
                      </td>

                      <td>
                        <select
                          value={editUser.rol}
                          onChange={(e) =>
                            setEditUser({ ...editUser, rol: e.target.value })
                          }
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="CLIENTE">CLIENTE</option>
                          <option value="VENDEDOR">VENDEDOR</option>
                        </select>
                      </td>

                      <td>
                        <button className="btn-save" onClick={guardarUsuario}>
                          Guardar
                        </button>
                        <button className="btn-cancel" onClick={cancelarEdicion}>
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      {/* ----- MODO NORMAL ----- */}
                      <td>{u.id}</td>
                      <td>{u.nombre}</td>
                      <td>{u.correo}</td>
                      <td>{u.rol}</td>

                      <td>
                        <button
                          className="btn-edit"
                          onClick={() => iniciarEdicion(u)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn-danger"
                          onClick={() => eliminarUsuario(u.id, u.nombre)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
};

export default AdminUsuarios;
