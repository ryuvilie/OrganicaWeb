// src/pages/Carrito.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useUser } from "../context/UserContext";
import { apiVentas } from "../api/ventas";
import "../styles/Carrito.css";

function Carrito() {
  const { cartItems, addToCart, decreaseFromCart, removeFromCart, clearCart } =
    useCart();
  const { usuario } = useUser();

  // Total calculado
  const total = cartItems.reduce(
    (sum, item) => sum + item.precio * item.cantidad,
    0
  );

  // ===============================
  // FINALIZAR COMPRA
  // ===============================
  const finalizarCompra = async () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }

    // Formato que espera el backend
    const items = cartItems.map((p) => ({
      idProducto: p.id_producto ?? p.id, // normalizado
      cantidad: p.cantidad,
    }));

    const payload = {
      // Si NO está loggeado → null
      // Si está loggeado → id interno del usuario (UserContext guarda id = id_usuario del backend)
      idUsuario: usuario ? usuario.id : null,
      items,
    };

    try {
      const resp = await apiVentas.finalizarCompra(payload);

      alert(
        `Compra realizada con éxito 🎉\nTotal: $${resp.total.toLocaleString(
          "es-CL"
        )}`
      );

      clearCart(); // vaciar carrito

    } catch (error) {
      console.error("Error al crear la venta:", error);

      let mensaje =
        "No se pudo finalizar la compra. Revisa tu carrito e inténtalo nuevamente.";

      // Nuestro apiClient lanza Error(message) con el texto que viene del backend
      if (error?.message) {
        mensaje = error.message;
      }

      alert(mensaje);
    }
  };

  // ===============================
  // RENDER
  // ===============================

  return (
    <main className="carrito-container">
      <h1 className="titulo-carrito">🛒 Carrito de Compras</h1>

      {cartItems.length === 0 ? (
        <p className="carrito-vacio">
          Tu carrito está vacío. ¡Agrega productos desde el catálogo!
        </p>
      ) : (
        <>
          <table className="tabla-carrito">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Subtotal</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((p) => (
                <tr key={p.id}>
                  <td>{p.nombre}</td>

                  <td>${p.precio.toLocaleString("es-CL")}</td>

                  <td className="col-cantidad">
                    <button
                      onClick={() => decreaseFromCart(p.id)}
                      className="btn-cantidad"
                    >
                      –
                    </button>

                    <span>{p.cantidad}</span>

                    <button
                      onClick={() => addToCart(p)}
                      className="btn-cantidad"
                    >
                      +
                    </button>
                  </td>

                  <td>${(p.precio * p.cantidad).toLocaleString("es-CL")}</td>

                  <td>
                    <button
                      className="btn-eliminar"
                      onClick={() => removeFromCart(p.id)}
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="carrito-acciones">
            <h2>Total: ${total.toLocaleString("es-CL")}</h2>

            <div>
              <button className="btn-vaciar" onClick={clearCart}>
                Vaciar carrito
              </button>

              <button className="btn-comprar" onClick={finalizarCompra}>
                Finalizar compra
              </button>
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default Carrito;
