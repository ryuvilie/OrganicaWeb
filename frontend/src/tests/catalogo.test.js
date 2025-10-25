// src/tests/catalogo.test.js
import React, { act } from 'react'; // 👈 IMPORTAR act DESDE 'react'
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import Catalogo from '../pages/Catalogo.jsx';
// Importación corregida del Contexto
import { CartContext } from '../context/CartContext.jsx';

describe('Pruebas básicas del componente Catalogo.jsx', () => {
  let container;
  let root;

  // Provider mínimo para que ProductCard (useCart) no falle
  const MockCartProvider = ({ children }) => {
    const value = {
      cartItems: [],
      addToCart: () => {},
      decreaseFromCart: () => {},
      removeFromCart: () => {},
      clearCart: () => {},
    };
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
  };

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    // 👈 Envolver unmount en act para React 18
    act(() => { 
      root.unmount();
    });
    container.remove();
    root = null;
    container = null;
  });

  // 👇 FUNCIÓN DE RENDERIZADO MODIFICADA: Ahora es síncrona gracias a act()
  function renderCatalogo() {
    // eslint-disable-next-line testing-library/no-unnecessary-act
    act(() => { 
      root.render(
        <MemoryRouter>
          <MockCartProvider>
            <Catalogo />
          </MockCartProvider>
        </MemoryRouter>
      );
    });
  }

  // =========================================================================
  // TESTS SINCRÓNICOS (sin setTimeout ni done)
  // =========================================================================

  it('debería renderizar el título "Catálogo de Productos"', () => {
    renderCatalogo();
    const title = container.querySelector('h1');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Catálogo de Productos');
  });

  it('debería mostrar un input de búsqueda con el placeholder correcto', () => {
    renderCatalogo();
    const input = container.querySelector('input[type="text"]');
    expect(input).not.toBeNull();
    expect(input.placeholder).toBe('Buscar por nombre...');
  });

  it('debería mostrar 5 botones de categoría', () => {
    renderCatalogo();
    const buttons = container.querySelectorAll('.filtro-btn');
    expect(buttons.length).toBe(5);
  });

  it('debería mostrar el selector de orden con al menos 4 opciones', () => {
    renderCatalogo();
    const select = container.querySelector('select#ordenarPor');
    expect(select).not.toBeNull();
    const options = select.querySelectorAll('option');
    expect(options.length).toBeGreaterThanOrEqual(4);
  });

  it('debería renderizar una lista de productos en la grilla', () => {
    renderCatalogo();
    const grid = container.querySelector('.productos-grid');
    expect(grid).not.toBeNull();
    expect(grid.children.length).toBeGreaterThan(0);
  });
});