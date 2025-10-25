// Importa las utilidades necesarias para las pruebas
import '@testing-library/jest-dom'; // Permite usar "toBeInTheDocument"
import { render, screen, fireEvent } from '@testing-library/react'; // Funciones de testeo
import { CartProvider } from '../context/CartContext'; // Contexto del carrito
import Carrito from '../pages/Carrito'; // Página del carrito
import ProductCard from '../components/ProductCard'; // Componente de producto

// Producto de prueba simulado para las pruebas
const mockProducto = {
  id: 1,
  nombre: 'Manzanas Rojas',
  descripcion: 'Manzanas frescas del sur de Chile',
  categoria: 'Frutas',
  precio: 1500,
  oferta: false,
  imagen: '/assets/img/manzana.jpg'
};

// Bloque que agrupa todas las pruebas relacionadas con el carrito
describe('🛒 Carrito de Compras', () => {

  // 🧪 TEST 1: Agregar producto al carrito
  it('agrega un producto al carrito', () => {
    // Renderiza el contexto del carrito, el producto y la página del carrito
    render(
      <CartProvider>
        <ProductCard producto={mockProducto} />
        <Carrito />
      </CartProvider>
    );

    // Simula un clic en el botón "Agregar al carrito"
    const botonAgregar = screen.getByRole('button', { name: /Agregar al carrito/i });
    fireEvent.click(botonAgregar);

    // Verifica que el producto "Manzanas Rojas" aparece en el carrito
    expect(screen.getAllByText(/Manzanas Rojas/i)[0]).toBeInTheDocument();
  });

  // 🧪 TEST 2: Mostrar mensaje cuando el carrito está vacío
  it('muestra mensaje si el carrito está vacío', () => {
    // Renderiza solo el carrito sin agregar productos
    render(
      <CartProvider>
        <Carrito />
      </CartProvider>
    );

    // Verifica que aparezca el mensaje "Tu carrito está vacío"
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  // 🧪 TEST 3: Vaciar carrito
  it('vacía el carrito al presionar el botón', () => {
    // Renderiza el producto y el carrito juntos
    render(
      <CartProvider>
        <ProductCard producto={mockProducto} />
        <Carrito />
      </CartProvider>
    );

    // Agrega un producto al carrito
    fireEvent.click(screen.getByRole('button', { name: /Agregar al carrito/i }));

    // Busca el botón "Vaciar carrito" y simula un clic
    const vaciarBtn = screen.getByRole('button', { name: /Vaciar carrito/i });
    fireEvent.click(vaciarBtn);

    // Verifica que después de vaciar, aparece el mensaje de carrito vacío
    expect(screen.getByText(/Tu carrito está vacío/i)).toBeInTheDocument();
  });

  // 🧪 TEST 4: Incrementar cantidad con botón "+"
  it('incrementa la cantidad al presionar el botón "+"', () => {
    // Renderiza el producto y el carrito
    render(
      <CartProvider>
        <ProductCard producto={mockProducto} />
        <Carrito />
      </CartProvider>
    );

    // Agrega el producto una vez
    fireEvent.click(screen.getByRole('button', { name: /Agregar al carrito/i }));

    // Busca el botón "+" y simula un clic
    const botonMas = screen.getByText('+');
    fireEvent.click(botonMas);

    // Verifica que la cantidad mostrada ahora sea "2"
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  // 🧪 TEST 5: Disminuir cantidad con botón "–"
  it('disminuye la cantidad al presionar el botón "–"', () => {
    // Renderiza el producto y el carrito
    render(
      <CartProvider>
        <ProductCard producto={mockProducto} />
        <Carrito />
      </CartProvider>
    );

    // Agrega el producto y aumenta una vez
    fireEvent.click(screen.getByRole('button', { name: /Agregar al carrito/i }));
    const botonMas = screen.getByText('+');
    const botonMenos = screen.getByText('–');
    fireEvent.click(botonMas); // Cantidad sube a 2
    fireEvent.click(botonMenos); // Baja a 1

    // Verifica que la cantidad vuelva a 1
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
