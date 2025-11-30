// src/pages/AdminProductos.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { apiProducts } from "../api/products";
import "../styles/AdminProductos.css";

const categorias = ["Frutas", "Verduras", "Semillas", "Otros"];

const AdminProductos = () => {
  const { isAdmin } = useUser();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mostrarForm, setMostrarForm] = useState(false);
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    categoria: "Verduras",
    precio: "",
    stock: "",
    image_url: "",
  });

  // editor inline de stock
  const [editingStock, setEditingStock] = useState(null); // { id, nombre, value }

  useEffect(() => {
    if (!isAdmin) return;
    cargarProductos();
  }, [isAdmin]);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await apiProducts.list();
      setProductos(data || []);
    } catch (e) {
      console.error("Error cargando productos admin:", e);
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrearProducto = async (e) => {
    e.preventDefault();
    try {
      const nuevo = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        categoria: form.categoria,
        precio: Number(form.precio),
        stock: Number(form.stock),
        image_url: form.image_url,
      };
      await apiProducts.create(nuevo);
      setForm({
        nombre: "",
        descripcion: "",
        categoria: "Verduras",
        precio: "",
        stock: "",
        image_url: "",
      });
      setMostrarForm(false);
      await cargarProductos();
    } catch (e) {
      console.error("Error creando producto:", e);
      setError("No se pudo crear el producto.");
    }
  };

  // ---- Edición de stock inline ----
  const handleEditarStockClick = (producto) => {
    const id = producto.id_producto ?? producto.id;
    setEditingStock({
      id,
      nombre: producto.nombre,
      value: producto.stock,
    });
  };

  const handleStockInputChange = (e) => {
    const value = e.target.value;
    setEditingStock((prev) => ({ ...prev, value }));
  };

  const handleCancelarStock = () => {
    setEditingStock(null);
  };

  const handleGuardarStock = async () => {
    if (!editingStock) return;
    const nuevoStock = Number(editingStock.value);
    if (Number.isNaN(nuevoStock) || nuevoStock < 0) {
      alert("Stock inválido");
      return;
    }
    try {
      await apiProducts.updateStock(editingStock.id, nuevoStock);
      setEditingStock(null);
      await cargarProductos();
    } catch (e) {
      console.error("Error actualizando stock:", e);
      alert("No se pudo actualizar el stock.");
    }
  };
  // ---------------------------------

  const handleEliminar = async (producto) => {
  const ok = window.confirm(
    `¿Eliminar el producto "${producto.nombre}"? Esta acción no se puede deshacer.`
  );
  if (!ok) return;

  try {
    await apiProducts.remove(producto.id_producto ?? producto.id);
  } catch (e) {
    console.error("Error eliminando producto:", e);
    alert("No se pudo eliminar el producto.");
  } finally {
    // 👇 recargamos siempre la lista, si se eliminó de verdad se verá reflejado
    await cargarProductos();
  }
    };


  if (!isAdmin) {
    return (
      <main className="admin-products">
        <div className="container">
          <h1 className="admin-title">Administrar productos</h1>
          <p className="admin-subtitle">
            Esta sección es solo para administradores.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-products">
      <div className="container">
        {/* Encabezado */}
        <header className="admin-header">
          <div>
            <h1 className="admin-title">Administrar productos</h1>
            <p className="admin-subtitle">
              Crea, actualiza stock o elimina productos del catálogo.
            </p>
          </div>
          <button
            className="btn-enviar admin-btn-crear"
            onClick={() => setMostrarForm((v) => !v)}
          >
            {mostrarForm ? "Cerrar formulario" : "Crear producto"}
          </button>
        </header>

        {/* Formulario de creación */}
        {mostrarForm && (
          <section className="admin-form-card">
            <h2>Nuevo producto</h2>
            <form className="admin-form-grid" onSubmit={handleCrearProducto}>
              <div className="field">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Descripción</label>
                <textarea
                  name="descripcion"
                  value={form.descripcion}
                  onChange={handleChange}
                  rows={3}
                  required
                />
              </div>

              <div className="field">
                <label>Categoría</label>
                <select
                  name="categoria"
                  value={form.categoria}
                  onChange={handleChange}
                >
                  {categorias.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
                  min="0"
                  value={form.precio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>Stock</label>
                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>URL de imagen</label>
                <input
                  type="text"
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                  placeholder="https://raw.githubusercontent.com/..."
                />
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="btn-enviar">
                  Guardar producto
                </button>
              </div>
            </form>
          </section>
        )}

        {error && <p className="admin-error">{error}</p>}

        {/* Lista de productos */}
        {cargando ? (
          <p className="admin-loading">Cargando productos...</p>
        ) : (
          <section className="admin-list">
            {productos.length === 0 ? (
              <p>No hay productos registrados.</p>
            ) : (
              <div className="admin-grid">
                {productos.map((p) => {
                  const idProducto = p.id_producto ?? p.id;
                  const isEditing = editingStock?.id === idProducto;

                  return (
                    <article key={idProducto} className="admin-product-card">
                      <div className="admin-product-main">
                        <div>
                          <h3>{p.nombre}</h3>
                          <p className="admin-product-cat">
                            {p.categoria} · Stock: {p.stock}
                          </p>
                          <p className="admin-product-price">
                            ${Number(p.precio).toLocaleString("es-CL")}
                          </p>
                        </div>

                        {p.image_url && (
                          <img
                            src={p.image_url}
                            alt={p.nombre}
                            className="admin-product-img"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        )}
                      </div>

                      {/* Acciones */}
                      <div className="admin-product-actions">
                        {!isEditing ? (
                          <>
                            <button
                              type="button"
                              className="btn-outline"
                              onClick={() => handleEditarStockClick(p)}
                            >
                              Editar stock
                            </button>
                            <button
                              type="button"
                              className="btn-danger"
                              onClick={() => handleEliminar(p)}
                            >
                              Eliminar
                            </button>
                          </>
                        ) : (
                          <div className="admin-stock-inline">
                            <input
                              type="number"
                              min="0"
                              className="admin-stock-input"
                              value={editingStock.value}
                              onChange={handleStockInputChange}
                            />
                            <button
                              type="button"
                              className="btn-enviar admin-stock-save"
                              onClick={handleGuardarStock}
                            >
                              Guardar
                            </button>
                            <button
                              type="button"
                              className="btn-ghost"
                              onClick={handleCancelarStock}
                            >
                              Cancelar
                            </button>
                          </div>
                        )}
                      </div>
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

export default AdminProductos;
