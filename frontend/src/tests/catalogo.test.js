describe("📦 Catálogo de Productos (Jasmine + Karma)", function () {

  let productos;
  let categorias;
  let filtro;
  let productosFiltrados;

  beforeEach(function () {
    productos = [
      { id: 1, nombre: "Manzana", categoria: "Frutas", precio: 1500 },
      { id: 2, nombre: "Pera", categoria: "Frutas", precio: 1000 },
      { id: 3, nombre: "Lechuga", categoria: "Verduras", precio: 800 },
      { id: 4, nombre: "Zanahoria", categoria: "Verduras", precio: 900 },
      { id: 5, nombre: "Miel", categoria: "Otros", precio: 2500 }
    ];

    categorias = ["Todos", "Frutas", "Verduras", "Otros"];
    filtro = "Todos";
  });

  // ✅ TEST 1: Los productos existen
  it("debería contener 5 productos cargados", function () {
    expect(productos.length).toBe(5);
  });

  // ✅ TEST 2: Filtrar por categoría
  it("debería filtrar productos por la categoría 'Frutas'", function () {
    filtro = "Frutas";
    productosFiltrados = productos.filter(p => p.categoria === filtro);
    expect(productosFiltrados.length).toBe(2);
  });

  // ✅ TEST 3: Ordenar por precio ascendente
  it("debería ordenar productos por precio ascendente", function () {
    let ordenados = [...productos].sort((a, b) => a.precio - b.precio);
    expect(ordenados[0].precio).toBe(800);
    expect(ordenados[4].precio).toBe(2500);
  });

  // ✅ TEST 4: Buscar por nombre
  it("debería encontrar productos que contengan 'a' en el nombre", function () {
    let busqueda = "a";
    let encontrados = productos.filter(p => p.nombre.toLowerCase().includes(busqueda));
    expect(encontrados.length).toBeGreaterThan(0);
  });

  // ✅ TEST 5: Mostrar categorías disponibles
  it("debería tener 4 categorías configuradas", function () {
    expect(categorias.length).toBe(4);
    expect(categorias).toContain("Frutas");
    expect(categorias).toContain("Verduras");
  });

});
