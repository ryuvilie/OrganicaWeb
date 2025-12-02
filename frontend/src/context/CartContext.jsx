// src/context/CartContext.jsx
import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Siempre devolver el id REAL del backend
  const getProductoId = (producto) => producto.id_producto;

  const addToCart = (producto) => {
    const id = getProductoId(producto);

    setCartItems((prev) => {
      const existente = prev.find((item) => item.id_producto === id);

      if (existente) {
        return prev.map((item) =>
          item.id_producto === id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prev, { ...producto, id_producto: id, cantidad: 1 }];
    });
  };

  const decreaseFromCart = (id_producto) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id_producto === id_producto
            ? { ...item, cantidad: item.cantidad - 1 }
            : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeFromCart = (id_producto) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id_producto !== id_producto)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        decreaseFromCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
