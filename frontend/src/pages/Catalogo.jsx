import React, { useState } from "react";
import { useSearchParams } from "react-router-dom"; // 👈 nuevo
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import "../styles/Catalogo.css";

const Catalogo = () => {
  // estado local (por si el usuario cambia de categoría con los chips)
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

  // 👇 Leer ?cat=frutas|verduras|semillas desde la URL
  const [searchParams] = useSearchParams();
  const catParam = (searchParams.get("cat") || "").toLowerCase();
  const mapCat = { frutas: "Frutas", verduras: "Verduras", semillas: "Semillas", otros: "Otros", todas: "Todos" };
  const categoriaURL = mapCat[catParam]; // undefined si no viene o no coincide

  // 👇 categoría efectiva: si viene por URL, se usa; si no, la del estado
  const categoriaActiva = categoriaURL || categoria;

  // 1) Filtrar por categoría (usando la efectiva)
  let productosActuales =
    categoriaActiva === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoriaActiva);

  // 2) Filtrar por búsqueda (nombre)
  productosActuales = productosActuales.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  // 3) Ordenar
  const productosFiltradosOrdenados = [...productosActuales].sort((a, b) => {
    switch (ordenarPor) {
      case "precio-asc":
        return a.precio - b.precio;
      case "precio-desc":
        return b.precio - a.precio;
      case "nombre-asc":
        return a.nombre.localeCompare(b.nombre, "es");
      case "nombre-desc":
        return b.nombre.localeCompare(a.nombre, "es");
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

        {/* Chips de categoría (marcamos activo con la categoría efectiva) */}
        <div className="filtros-categoria">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`filtro-btn ${categoriaActiva === cat ? "activo" : ""}`}
              onClick={() => {
                setCategoria(cat);            // actualiza el estado si el usuario cambia
                setTerminoBusqueda("");       // opcional: limpiar búsqueda
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Ordenar */}
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
            <ProductCard key={producto.id} producto={producto} />
          ))
        ) : (
          <p>No se encontraron productos que coincidan con los filtros.</p>
        )}
      </div>
    </main>
  );
};

export default Catalogo;