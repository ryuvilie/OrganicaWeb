// src/karma-tests/products.spec.js

import { apiProducts } from "../api/products";   // Importamos el archivo de productos

describe("📦 Products (Jasmine + Karma)", function () {

  // Test para verificar que la lista de productos no esté vacía
  it("debería tener al menos 1 producto", function () {
    expect(apiProducts.length).toBeGreaterThan(0);  // Verifica que haya productos
  });

  // Test para verificar el primer producto
  it("el primer producto debería ser Manzanas Orgánicas", function () {
    const producto = apiProducts[0];
    expect(producto.nombre).toBe("Manzanas Orgánicas");  // Verifica que el primer producto sea Manzanas Orgánicas
  });

  // Test para verificar que la estructura del primer producto es correcta
  it("el primer producto debería tener la propiedad precio", function () {
    const producto = apiProducts[0];
    expect(producto.precio).toBeDefined();  // Verifica que el producto tenga un precio definido
    expect(typeof producto.precio).toBe("number");  // Verifica que el precio sea un número
  });

});
