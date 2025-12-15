import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { apiVentas } from "../api/ventas";
import "../styles/VendedorVentas.css";

const VendedorVentas = () => {
  const { isVendedor, isAdmin } = useUser();

  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);

  // Formulario simple de venta
  const [form, setForm] = useState({
    fecha: "",
    total: "",
  });

  // Venta en edición
  const [editingVenta, setEditingVenta] = useState(null);

  useEffect(() => {
    if (!isVendedor && !isAdmin) return;
    cargarVentas();
  }, [isVendedor, isAdmin]);

  const cargarVentas = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await apiVentas.listarVentas();
      if (typeof console !== "undefined") {
        console.debug("cargarVentas - data recibida:", data);
      }
      setVentas(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error("Error cargando ventas:", e);
      setError("No se pudieron cargar las ventas.");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Crear venta
  const handleCrearVenta = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        fecha: form.fecha,
        items: [], // venta simple (backend recalcula total)
      };

      await apiVentas.crearVenta(payload);

      setForm({ fecha: "", total: "" });
      setMostrarForm(false);
      await cargarVentas();
    } catch (e) {
      console.error("Error creando venta:", e);
      setError("No se pudo crear la venta.");
    }
  };

  // Iniciar edición
  const handleEditarClick = (venta) => {
    setEditingVenta({
      id: venta.id_venta ?? venta.id,
      fecha: venta.fecha,
    });
  };

  const handleEditarChange = (e) => {
    const { value } = e.target;
    setEditingVenta((prev) => ({ ...prev, fecha: value }));
  };

  const handleCancelarEdicion = () => {
    setEditingVenta(null);
  };

  const handleGuardarEdicion = async () => {
    if (!editingVenta) return;

    try {
      await apiVentas.editarVenta(editingVenta.id, {
        fecha: editingVenta.fecha,
        items: [],
      });

      setEditingVenta(null);
      await cargarVentas();
    } catch (e) {
      console.error("Error editando venta:", e);
      alert("No se pudo editar la venta.");
    }
  };

  if (!isVendedor && !isAdmin) {
    return (
      <main className="vendedor-ventas">
        <div className="container">
          <h1 className="vendedor-title">Ventas</h1>
          <p className="vendedor-subtitle">
            Esta sección es solo para vendedores.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="vendedor-ventas">
      <div className="container">
        {/* Encabezado */}
        <header className="vendedor-header">
          <div>
            <h1 className="vendedor-title">Gestión de ventas</h1>
            <p className="vendedor-subtitle">
              Crea y edita ventas internas del sistema.
            </p>
          </div>

          <button
            className="btn-enviar vendedor-btn-crear"
            onClick={() => setMostrarForm((v) => !v)}
          >
            {mostrarForm ? "Cerrar formulario" : "Crear venta"}
          </button>
        </header>

        {/* Formulario de creación */}
        {mostrarForm && (
          <section className="vendedor-form-card">
            <h2>Nueva venta</h2>

            <form className="vendedor-form-grid" onSubmit={handleCrearVenta}>
              <div className="vendedor-form-group">
                <label htmlFor="fecha">Fecha</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  value={form.fecha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="vendedor-form-actions">
                <button type="submit" className="btn-enviar">
                  Guardar venta
                </button>
              </div>
            </form>
          </section>
        )}

        {error && <p className="vendedor-error">{error}</p>}

        {/* Lista de ventas */}
        {cargando ? (
          <p className="vendedor-loading">Cargando ventas...</p>
        ) : (
          <section className="vendedor-list">
            {ventas.length === 0 ? (
              <p>No hay ventas registradas.</p>
            ) : (
              <div className="vendedor-grid">
                {ventas.map((v) => {
                  const idVenta = v.id_venta ?? v.id;
                  const isEditing = editingVenta?.id === idVenta;

                  return (
                    <article key={idVenta} className="vendedor-venta-card">
                      {!isEditing ? (
                        <>
                          <div className="vendedor-venta-main">
                            <h3>Venta #{idVenta}</h3>
                            <span className="vendedor-venta-total">
                              ${Number(v.total).toLocaleString("es-CL")}
                            </span>
                          </div>

                          <p className="admin-product-cat">
                            Fecha: {v.fecha}
                          </p>

                          <div className="vendedor-venta-actions">
                            <button
                              type="button"
                              className="vendedor-btn-outline"
                              onClick={() => handleEditarClick(v)}
                            >
                              Editar
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="admin-stock-inline">
                          <input
                            type="date"
                            className="admin-stock-input"
                            value={editingVenta.fecha}
                            onChange={handleEditarChange}
                          />
                          <button
                            type="button"
                            className="btn-enviar"
                            onClick={handleGuardarEdicion}
                          >
                            Guardar
                          </button>
                          <button
                            type="button"
                            className="btn-ghost"
                            onClick={handleCancelarEdicion}
                          >
                            Cancelar
                          </button>
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
};

export default VendedorVentas;
