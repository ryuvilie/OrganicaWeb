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
  const [editingStock, setEditingStock] = useState(null);

  // editor inline de precio
  const [editingPrice, setEditingPrice] = useState(null);

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

  // ---- Edición inline de precio ----
  const handleEditarPrecioClick = (producto) => {
    const id = producto.id_producto ?? producto.id;
    setEditingPrice({
      id,
      nombre: producto.nombre,
      value: producto.precio,
    });
  };

  const handlePrecioInputChange = (e) => {
    const value = e.target.value;
    setEditingPrice((prev) => ({ ...prev, value }));
  };

  const handleCancelarPrecio = () => {
    setEditingPrice(null);
  };

  const handleGuardarPrecio = async () => {
    if (!editingPrice) return;
    const nuevoPrecio = Number(editingPrice.value);
    if (Number.isNaN(nuevoPrecio) || nuevoPrecio < 0) {
      alert("Precio inválido");
      return;
    }
    try {
      await apiProducts.updatePrice(editingPrice.id, nuevoPrecio);
      setEditingPrice(null);
      await cargarProductos();
    } catch (e) {
      console.error("Error actualizando precio:", e);
      alert("No se pudo actualizar el precio.");
    }
  };

  // ---- Eliminar producto ----
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
              {/* ... formulario igual ... */}
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
                  const isEditingStock = editingStock?.id === idProducto;
                  const isEditingPrice = editingPrice?.id === idProducto;

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

                      <div className="admin-product-actions">

                        {/* Botones normales */}
                        {!isEditingStock && !isEditingPrice && (
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
                              className="btn-outline"
                              onClick={() => handleEditarPrecioClick(p)}
                            >
                              Editar precio
                            </button>

                            <button
                              type="button"
                              className="btn-danger"
                              onClick={() => handleEliminar(p)}
                            >
                              Eliminar
                            </button>
                          </>
                        )}

                        {/* Modo edición STOCK */}
                        {isEditingStock && (
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
                              className="btn-enviar"
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

                        {/* Modo edición PRECIO */}
                        {isEditingPrice && (
                          <div className="admin-stock-inline">
                            <input
                              type="number"
                              min="0"
                              className="admin-stock-input"
                              value={editingPrice.value}
                              onChange={handlePrecioInputChange}
                            />
                            <button
                              type="button"
                              className="btn-enviar"
                              onClick={handleGuardarPrecio}
                            >
                              Guardar
                            </button>
                            <button
                              type="button"
                              className="btn-ghost"
                              onClick={handleCancelarPrecio}
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
