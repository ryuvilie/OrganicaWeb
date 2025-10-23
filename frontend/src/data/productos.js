const productos = [
  {
    id: 1,
    nombre: "Manzanas Orgánicas",
    descripcion: "Crujientes y dulces, cosechadas en el sur de Chile.",
    precio: 1800,
    categoria: "Frutas",
    oferta: false,
    stock: 30,
    imagen: "/assets/img/hero.png"
  },
  {
    id: 2,
    nombre: "Lechuga Hidropónica",
    descripcion: "Fresca, sin pesticidas y cultivada con agua purificada.",
    precio: 1200,
    categoria: "Verduras",
    oferta: false,
    stock: 25,
    imagen: "/assets/img/hero.png"
  },
  {
    id: 3,
    nombre: "Miel de Ulmo",
    descripcion: "Pura miel de bosque nativo, sin aditivos ni azúcar añadida.",
    precio: 4500,
    categoria: "Otros",
    oferta: true, // ✅ en oferta
    stock: 10,
    imagen: "/assets/img/hero.png"
  },
  {
    id: 4,
    nombre: "Tomates Cherry",
    descripcion: "Pequeños, jugosos y perfectos para ensaladas frescas.",
    precio: 2500,
    categoria: "Verduras",
    oferta: false,
    stock: 40,
    imagen: "/assets/img/hero.png"
  },
  {
    id: 5,
    nombre: "Frutillas Orgánicas",
    descripcion: "Dulces y rojas, cultivadas sin químicos en la región del Maule.",
    precio: 3500,
    categoria: "Frutas",
    oferta: true, // ✅ en oferta
    stock: 20,
    imagen: "/assets/img/hero.png"
  },
  {
    id: 6,
    nombre: "Mix de Semillas",
    descripcion: "Chía, linaza y sésamo: ideal para ensaladas y batidos.",
    precio: 2800,
    categoria: "Semillas",
    oferta: false,
    stock: 15,
    imagen: "/assets/img/hero.png"
  }
];

export default productos;
