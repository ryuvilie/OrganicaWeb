import React, { useState } from "react";
import productos from "../data/productos";
import ProductCard from "../components/ProductCard";
import "../styles/Catalogo.css";

const Catalogo = () => {
  const [categoria, setCategoria] = useState("Todos");
  const [terminoBusqueda, setTerminoBusqueda] = useState(""); // Mantendremos este por si lo quieres usar más adelante
  const [ordenarPor, setOrdenarPor] = useState("defecto"); // Nuevo estado para el ordenamiento

  const categorias = ["Todos", "Frutas", "Verduras", "Semillas", "Otros"];
  const opcionesOrdenamiento = [
    { valor: "defecto", etiqueta: "Ordenar por defecto" },
    { valor: "precio-asc", etiqueta: "Precio: Más barato" },
    { valor: "precio-desc", etiqueta: "Precio: Más caro" },
    { valor: "nombre-asc", etiqueta: "Nombre: A-Z" }, // Opcional
    { valor: "nombre-desc", etiqueta: "Nombre: Z-A" }, // Opcional
  ];

  // 1. Filtrar por categoría
  let productosActuales =
    categoria === "Todos"
      ? productos
      : productos.filter((p) => p.categoria === categoria);

  // 2. Filtrar por término de búsqueda (si se mantiene)
  productosActuales = productosActuales.filter((producto) =>
    producto.nombre.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  // 3. Aplicar ordenamiento
  const productosFiltradosOrdenados = [...productosActuales].sort((a, b) => {
    switch (ordenarPor) {
      case "precio-asc":
        return a.precio - b.precio;
      case "precio-desc":
        return b.precio - a.precio;
      case "nombre-asc":
        return a.nombre.localeCompare(b.nombre);
      case "nombre-desc":
        return b.nombre.localeCompare(a.nombre);
      case "defecto":
      default:
        return 0; // No cambia el orden si es "defecto" o no reconocido
    }
  });

  return (
    <main className="catalogo-container">
      <h1>Catálogo de Productos</h1>

      <div className="controles-catalogo"> {/* Nuevo contenedor para organizar */}
        {/* Input de Búsqueda por Texto (si lo quieres mantener) */}
        <div className="busqueda">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            className="busqueda-input"
            value={terminoBusqueda}
            onChange={(e) => setTerminoBusqueda(e.target.value)}
          />
        </div>

        {/* Filtros por Categoría */}
        <div className="filtros-categoria">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`filtro-btn ${categoria === cat ? "activo" : ""}`}
              onClick={() => {
                setCategoria(cat);
                setTerminoBusqueda(""); // Opcional: limpiar búsqueda al cambiar de categoría
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Selector de Ordenamiento */}
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
      </div> {/* Fin de controles-catalogo */}

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