import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Normalizar ID (id_producto o id)
  const getProductoId = (producto) => producto.id_producto ?? producto.id;

  const addToCart = (producto) => {
    const id = getProductoId(producto);

    setCartItems((prev) => {
      const existente = prev.find((item) => item.id === id);

      if (existente) {
        return prev.map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      }

      return [...prev, { ...producto, id, cantidad: 1 }];
    });
  };

  const decreaseFromCart = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
        )
        .filter((item) => item.cantidad > 0)
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, decreaseFromCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
