import React from "react";
import { useCart } from "../context/CartContext";
import "../styles/Carrito.css";

function Carrito() {
  const { cartItems, addToCart, decreaseFromCart, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce(
  (sum, item) => sum + item.precio * item.cantidad,
  0
);

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
                  <td>${p.precio.toLocaleString()}</td>
                  <td className="col-cantidad">
                    <button onClick={() => decreaseFromCart(p.id)} className="btn-cantidad">–</button>
                    <span>{p.cantidad}</span>
                    <button onClick={() => addToCart(p)} className="btn-cantidad">+</button>
                  </td>
                  <td>${(p.precio * p.cantidad).toLocaleString()}</td>
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
            <h2>Total: ${total.toLocaleString()}</h2>
            <div>
              <button className="btn-vaciar" onClick={clearCart}>
                Vaciar carrito
              </button>
              <button
                className="btn-comprar"
                onClick={() =>
                  alert("¡Gracias por tu compra! (Simulación)")
                }
              >
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
