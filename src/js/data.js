// DATA oficial del catálogo HuertoHogar
// Paleta/estilo los maneja styles.css; acá definimos solo datos.

const DATA = {
  categorias: [
    { id: 'frutas',   nombre: 'Frutas Frescas' },
    { id: 'verduras', nombre: 'Verduras Orgánicas' },
    { id: 'organicos',nombre: 'Productos Orgánicos' },
    { id: 'lacteos',  nombre: 'Productos Lácteos' },
  ],
  productos: [
    // FRUTAS
    {
      id:'FR001', categoria:'frutas', nombre:'Manzanas Fuji',
      precio:1200, unidad:'kilo', stock:150,
      origen:'Valle del Maule',
      descripcion:'Manzanas crujientes y dulces, perfectas para colaciones o postres.',
      img:'../../public/img/productos/FR001.jpg'
    },
    {
      id:'FR002', categoria:'frutas', nombre:'Naranjas Valencia',
      precio:1000, unidad:'kilo', stock:200,
      origen:'Región de Coquimbo',
      descripcion:'Jugosas y ricas en vitamina C, ideales para jugos frescos.',
      img:'../../public/img/productos/FR002.jpg'
    },
    {
      id:'FR003', categoria:'frutas', nombre:'Plátanos Cavendish',
      precio:800, unidad:'kilo', stock:250,
      origen:'Importación autorizada',
      descripcion:'Dulces y energéticos; fuente natural de potasio.',
      img:'../../public/img/productos/FR003.jpg'
    },

    // VERDURAS
    {
      id:'VR001', categoria:'verduras', nombre:'Zanahorias Orgánicas',
      precio:900, unidad:'kilo', stock:100,
      origen:"Región de O'Higgins",
      descripcion:'Cultivadas sin pesticidas; excelentes para ensaladas o jugos.',
      img:'../../public/img/productos/VR001.jpg'
    },
    {
      id:'VR002', categoria:'verduras', nombre:'Espinacas Frescas',
      precio:700, unidad:'bolsa 500g', stock:80,
      origen:'Agricultor local',
      descripcion:'Tiernas, nutritivas y listas para tus batidos verdes.',
      img:'../../public/img/productos/VR002.jpg'
    },
    {
      id:'VR003', categoria:'verduras', nombre:'Pimientos Tricolores',
      precio:1500, unidad:'kilo', stock:120,
      origen:'Invernadero local',
      descripcion:'Rojos, amarillos y verdes; color y antioxidantes para tus platos.',
      img:'../../public/img/productos/VR003.jpg'
    },

    // ORGÁNICOS
    {
      id:'PO001', categoria:'organicos', nombre:'Miel Orgánica',
      precio:5000, unidad:'frasco 500g', stock:50,
      origen:'Apicultores locales',
      descripcion:'Pura, aromática y rica en antioxidantes.',
      img:'../../public/img/productos/PO001.jpg'
    },
    {
      id:'PO003', categoria:'organicos', nombre:'Quinua Orgánica',
      precio:3800, unidad:'bolsa 1kg', stock:60,
      origen:'Altiplano chileno',
      descripcion:'Grano andino de alto valor proteico para tus ensaladas y bowls.',
      img:'../../public/img/productos/PO003.jpg'
    },

    // LÁCTEOS
    {
      id:'PL001', categoria:'lacteos', nombre:'Leche Entera',
      precio:1200, unidad:'litro', stock:200,
      origen:'Granja local',
      descripcion:'Fresca y de sabor auténtico, ideal para tu desayuno.',
      img:'../../public/img/productos/PL001.jpg'
    },
  ]
};
