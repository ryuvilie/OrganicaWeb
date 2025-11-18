import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import { UserProvider } from "./context/UserContext"; 
import App from './App';
import './styles/global.css';
import './styles/App.css';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <UserProvider>       
      <CartProvider>     
        <App />
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
);