// src/karma-tests/carrito.spec.js
describe('🛒 Carrito de compras (Jasmine + Karma)', function () {

  // Datos simulados
  let carrito;
  let producto1;
  let producto2;

  // Antes de cada prueba, reinicia los datos
  beforeEach(function () {
    carrito = [];
    producto1 = { id: 1, nombre: 'Manzana', precio: 1500, cantidad: 1 };
    producto2 = { id: 2, nombre: 'Pera', precio: 1000, cantidad: 1 };
  });

  // ✅ TEST 1: Agregar producto al carritoA
  it('debería agregar un producto al carrito', function () {
    carrito.push(producto1);
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Manzana');
  });

  // ✅ TEST 2: Aumentar cantidad de un producto existente
  it('debería aumentar la cantidad si el producto ya existe', function () {
    carrito.push({ ...producto1 });
    let existente = carrito.find(p => p.id === producto1.id);
    existente.cantidad += 1;
    expect(existente.cantidad).toBe(2);
  });

  // ✅ TEST 3: Disminuir cantidad de un producto
  it('debería disminuir la cantidad del producto', function () {
    carrito.push({ ...producto1, cantidad: 3 });
    let existente = carrito.find(p => p.id === producto1.id);
    existente.cantidad -= 1;
    expect(existente.cantidad).toBe(2);
  });

  // ✅ TEST 4: Eliminar un producto del carrito
  it('debería eliminar un producto por ID', function () {
    carrito.push(producto1, producto2);
    carrito = carrito.filter(p => p.id !== producto1.id);
    expect(carrito.length).toBe(1);
    expect(carrito[0].nombre).toBe('Pera');
  });

  // ✅ TEST 5: Calcular el total del carrito
  it('debería calcular correctamente el total', function () {
    carrito.push(producto1, producto2);
    const total = carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);
    expect(total).toBe(2500);
  });
});
