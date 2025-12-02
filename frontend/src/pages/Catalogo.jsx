// src/pages/Catalogo.jsx
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { apiProducts } from "../api/products";
import ProductCard from "../components/ProductCard";
import "../styles/Catalogo.css";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const [categoria, setCategoria] = useState("Todos");
  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [ordenarPor, setOrdenarPor] = useState("defecto");

  const categorias = ["Todos", "Frutas", "Verduras", "Semillas", "Otros"];
  const opcionesOrdenamiento = [
    { valor: "defecto", etiqueta: "Ordenar por defecto" },
    { valor: "precio-asc", etiqueta: "Precio: Más barato" },
    { valor: "precio-desc", etiqueta: "Precio: Más caro" },
    { valor: "nombre-asc", etiqueta: "Nombre: A-Z" },
    { valor: "nombre-desc", etiqueta: "Nombre: Z-A" },
  ];

  const [searchParams] = useSearchParams();
  const catParam = (searchParams.get("cat") || "").toLowerCase();
  const mapCat = {
    frutas: "Frutas",
    verduras: "Verduras",
    semillas: "Semillas",
    otros: "Otros",
    todas: "Todos",
  };
  const categoriaURL = mapCat[catParam];
  const categoriaActiva = categoriaURL || categoria;

  useEffect(() => {
    async function cargar() {
      try {
        setCargando(true);
        const data = await apiProducts.list(); // YA trae solo activos
        setProductos(data || []);
      } catch (e) {
        console.error("Error cargando productos:", e);
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  if (cargando) {
    return (
      <main className="catalogo-container">
        <h1>Catálogo de Productos</h1>
        <p className="catalogo-loading">Cargando productos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="catalogo-container">
        <h1>Catálogo de Productos</h1>
        <p className="catalogo-error">{error}</p>
      </main>
    );
  }

  // 1) Filtrar categoría
  let productosActuales =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  // 2) búsqueda
  productosActuales = productosActuales.filter((producto) =>
    (producto.nombre || "").toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  // 3) orden
  const productosFiltradosOrdenados = [...productosActuales].sort((a, b) => {
    switch (ordenarPor) {
      case "precio-asc":
        return (a.precio || 0) - (b.precio || 0);
      case "precio-desc":
        return (b.precio || 0) - (a.precio || 0);
      case "nombre-asc":
        return (a.nombre || "").localeCompare(b.nombre || "", "es");
      case "nombre-desc":
        return (b.nombre || "").localeCompare(a.nombre || "", "es");
      default:
        return 0;
    }
  });

  return (
    <main className="catalogo-container">
      <h1>Catálogo de Productos</h1>

      <div className="controles-catalogo">
        {/* Buscar */}
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="busqueda-input"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
        </div>

        {/* Filtros */}
        <div className="filtros-categoria">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`filtro-btn ${
                categoriaActiva === cat ? "activo" : ""
              }`}
              onClick={() => {
                setCategoria(cat);
                setTerminoBusqueda("");
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Orden */}
        <div className="ordenamiento">
          <label htmlFor="ordenarPor">Ordenar por:</label>
          <select
            id="ordenarPor"
            className="ordenar-select"
            value={ordenarPor}
            onChange={(e) => setOrdenarPor(e.target.value)}
          >
            {opcionesOrdenamiento.map((opcion) => (
              <option key={opcion.valor} value={opcion.valor}>
                {opcion.etiqueta}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="productos-grid">
        {productosFiltradosOrdenados.length > 0 ? (
          productosFiltradosOrdenados.map((producto) => (
            <ProductCard key={producto.id_producto ?? producto.id} producto={producto} />
          ))
        ) : (
          <p>No se encontraron productos que coincidan con los filtros.</p>
        )}
      </div>
    </main>
  );
};

export default Catalogo;
