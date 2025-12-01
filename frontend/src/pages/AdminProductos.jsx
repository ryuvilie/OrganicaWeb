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

  const [editingStock, setEditingStock] = useState(null);
  const [editingPrice, setEditingPrice] = useState(null);

  // ================== CARGA INICIAL ==================
  useEffect(() => {
    if (!isAdmin) return;
    cargarProductos();
  }, [isAdmin]);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      setError("");
      const data = await apiProducts.listAdmin(); // 🔥 incluye inactivos
      setProductos(data || []);
    } catch (e) {
      console.error("Error cargando productos admin:", e);
      setError("No se pudieron cargar los productos.");
    } finally {
      setCargando(false);
    }
  };

  // ================== FORMULARIO NUEVO PRODUCTO ==================
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCrearProducto = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const nuevo = {
        nombre: form.nombre,
        descripcion: form.descripcion,
        categoria: form.categoria,
        precio: Number(form.precio),
        stock: Number(form.stock),
        imageUrl: form.image_url,
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

  // ================== EDICIÓN STOCK ==================
  const handleEditarStockClick = (producto) => {
    if (!producto.activo) {
      alert("No puedes editar un producto inactivo.");
      return;
    }

    const id = producto.id_producto ?? producto.id;
    setEditingStock({
      id,
      nombre: producto.nombre,
      value: producto.stock,
    });
  };

  const handleStockInputChange = (e) => {
    setEditingStock((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleGuardarStock = async () => {
    const nuevo = Number(editingStock.value);
    if (Number.isNaN(nuevo) || nuevo < 0) return alert("Stock inválido");

    await apiProducts.updateStock(editingStock.id, nuevo);
    setEditingStock(null);
    cargarProductos();
  };

  const handleCancelarStock = () => setEditingStock(null);

  // ================== EDICIÓN PRECIO ==================
  const handleEditarPrecioClick = (producto) => {
    if (!producto.activo) {
      alert("No puedes editar un producto inactivo.");
      return;
    }

    const id = producto.id_producto ?? producto.id;
    setEditingPrice({
      id,
      nombre: producto.nombre,
      value: producto.precio,
    });
  };

  const handlePrecioInputChange = (e) => {
    setEditingPrice((prev) => ({ ...prev, value: e.target.value }));
  };

  const handleGuardarPrecio = async () => {
    const nuevo = Number(editingPrice.value);
    if (Number.isNaN(nuevo) || nuevo < 0) return alert("Precio inválido");

    await apiProducts.updatePrice(editingPrice.id, nuevo);
    setEditingPrice(null);
    cargarProductos();
  };

  const handleCancelarPrecio = () => setEditingPrice(null);

  // ================== ACTIVAR / DESACTIVAR ==================
  const handleDesactivar = async (producto) => {
    const ok = window.confirm(
      `¿Desactivar el producto "${producto.nombre}"?`
    );
    if (!ok) return;

    await apiProducts.deactivate(producto.id_producto ?? producto.id);
    cargarProductos();
  };

  const handleActivar = async (producto) => {
    await apiProducts.activate(producto.id_producto ?? producto.id);
    cargarProductos();
  };

  // ================== UI SI NO ES ADMIN ==================
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
              Crea, actualiza stock, precios o activa/desactiva productos.
            </p>
          </div>

          <button
            className="btn-enviar admin-btn-crear"
            onClick={() => setMostrarForm((v) => !v)}
          >
            {mostrarForm ? "Cerrar formulario" : "Crear producto"}
          </button>
        </header>

        {/* Formulario */}
        {mostrarForm && (
          <section className="admin-form-card">
            <h2>Nuevo producto</h2>
            <form className="admin-form-grid" onSubmit={handleCrearProducto}>
              <div className="field">
                <label>Nombre</label>
                <input
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
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div className="field">
                <label>Precio</label>
                <input
                  type="number"
                  name="precio"
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
                  value={form.stock}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="field">
                <label>URL Imagen</label>
                <input
                  name="image_url"
                  value={form.image_url}
                  onChange={handleChange}
                />
              </div>

              <div className="admin-form-actions">
                <button type="submit" className="btn-enviar">
                  Guardar
                </button>
              </div>
            </form>
          </section>
        )}

        {error && <p className="admin-error">{error}</p>}

        {/* Lista de Productos */}
        {cargando ? (
          <p className="admin-loading">Cargando productos...</p>
        ) : (
          <section className="admin-list">
            <div className="admin-grid">
              {productos.map((p) => {
                const id = p.id_producto ?? p.id;
                const editingS = editingStock?.id === id;
                const editingP = editingPrice?.id === id;

                return (
                  <article
                    key={id}
                    className={`admin-product-card ${
                      p.activo ? "" : "producto-inactivo"
                    }`}
                  >
                    <div className="admin-product-main">
                      <div>
                        <h3>{p.nombre}</h3>

                        <p className="admin-product-cat">
                          {p.categoria} · Stock: {p.stock}
                        </p>

                        <p className="admin-product-price">
                          ${Number(p.precio).toLocaleString("es-CL")}
                        </p>

                        {!p.activo && (
                          <span className="badge-inactivo">Inactivo</span>
                        )}
                      </div>

                      {(p.image_url || p.imageUrl) && (
                        <img
                          className="admin-product-img"
                          src={p.image_url || p.imageUrl}
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      )}
                    </div>

                    {/* Acciones */}
                    <div className="admin-product-actions">
                      {!editingS && !editingP && p.activo && (
                        <>
                          <button
                            className="btn-outline"
                            onClick={() => handleEditarStockClick(p)}
                          >
                            Editar stock
                          </button>

                          <button
                            className="btn-outline"
                            onClick={() => handleEditarPrecioClick(p)}
                          >
                            Editar precio
                          </button>

                          <button
                            className="btn-danger"
                            onClick={() => handleDesactivar(p)}
                          >
                            Desactivar
                          </button>
                        </>
                      )}

                      {!editingS && !editingP && !p.activo && (
                        <button
                          className="btn-outline"
                          onClick={() => handleActivar(p)}
                        >
                          Activar
                        </button>
                      )}

                      {/* Modo editar stock */}
                      {editingS && (
                        <div className="admin-stock-inline">
                          <input
                            type="number"
                            className="admin-stock-input"
                            value={editingStock.value}
                            onChange={handleStockInputChange}
                          />
                          <button className="btn-enviar" onClick={handleGuardarStock}>
                            Guardar
                          </button>
                          <button className="btn-ghost" onClick={handleCancelarStock}>
                            Cancelar
                          </button>
                        </div>
                      )}

                      {/* Modo editar precio */}
                      {editingP && (
                        <div className="admin-stock-inline">
                          <input
                            type="number"
                            className="admin-stock-input"
                            value={editingPrice.value}
                            onChange={handlePrecioInputChange}
                          />
                          <button className="btn-enviar" onClick={handleGuardarPrecio}>
                            Guardar
                          </button>
                          <button className="btn-ghost" onClick={handleCancelarPrecio}>
                            Cancelar
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
};

export default AdminProductos;
