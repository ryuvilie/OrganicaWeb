import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "./context/CartContext"; // ✅ Contexto del carrito
import { UserProvider } from "./context/UserContext"; // 👈 nuevo
import App from './App';
import './styles/global.css';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>       {/* 👈 envuelve primero al usuario */}
      <CartProvider>     {/* 👈 luego al carrito */}
        <App />
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
);