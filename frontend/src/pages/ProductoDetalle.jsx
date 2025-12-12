import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiProducts } from "../api/products";
import { useUser } from "../context/UserContext";
import "../styles/ProductoDetalle.css";

const ProductoDetalle = () => {
  const { id } = useParams();
  const { usuario } = useUser();

  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comentario, setComentario] = useState("");
  const [nota, setNota] = useState(5);
  const [mensaje, setMensaje] = useState("");

  const rol = usuario?.rol;
  const esCliente = rol === "CLIENTE";
  const esUsuario = rol === "USER";

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const data = await apiProducts.getById(id);
        setProducto(data);
      } catch (e) {
        console.error("Error cargando producto:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  const enviarComentario = async (e) => {
    e.preventDefault();

    try {
      await apiProducts.comentar(id, {
        texto: comentario,
        nota,
      });

      setMensaje("Comentario enviado correctamente ✔️");
      setComentario("");
      setNota(5);
    } catch (e) {
      console.error("Error enviando comentario:", e);
      setMensaje("No se pudo enviar el comentario");
    }
  };

  if (loading) {
    return <main className="container">Cargando producto...</main>;
  }

  if (!producto) {
    return <main className="container">Producto no encontrado</main>;
  }

  return (
    <main className="producto-detalle container">
      <div className="detalle-card">
        <img
          src={producto.imageUrl || producto.image_url}
          alt={producto.nombre}
          className="detalle-img"
        />

        <div className="detalle-info">
          <h1>{producto.nombre}</h1>
          <p className="detalle-precio">
            ${Number(producto.precio).toLocaleString("es-CL")}
          </p>
          <p className="detalle-desc">{producto.descripcion}</p>
          <p className="detalle-stock">Stock disponible: {producto.stock}</p>
        </div>
      </div>

      {/* 🟢 FORMULARIO SOLO CLIENTE */}
      {esCliente && (
        <section className="comentario-card">
          <h2>Deja tu comentario</h2>

          <form onSubmit={enviarComentario}>
            <textarea
              placeholder="Escribe tu opinión del producto"
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              required
            />

            <label>
              Nota:
              <select value={nota} onChange={(e) => setNota(e.target.value)}>
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </label>

            <button type="submit" className="btn-enviar">
              Enviar comentario
            </button>

            {mensaje && <p className="comentario-msg">{mensaje}</p>}
          </form>
        </section>
      )}

      {/* 🟡 MENSAJE PARA USER */}
      {esUsuario && (
        <section className="comentario-info">
          <p>
            🛒 <strong>Solo los clientes que han realizado una compra</strong>{" "}
            pueden dejar comentarios sobre los productos.
          </p>
        </section>
      )}
    </main>
  );
};

export default ProductoDetalle;
