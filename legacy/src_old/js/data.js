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
      img:'https://tse4.mm.bing.net/th/id/OIP.xxSKBuyPVbqb5YErjQLPuwHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id:'FR002', categoria:'frutas', nombre:'Naranjas Valencia',
      precio:1000, unidad:'kilo', stock:200,
      origen:'Región de Coquimbo',
      descripcion:'Jugosas y ricas en vitamina C, ideales para jugos frescos.',
      img:'https://th.bing.com/th/id/R.c915e4e054f128399ed85f93042747b9?rik=7emDbUF9%2bDdk3Q&pid=ImgRaw&r=0'
    },
    {
      id:'FR003', categoria:'frutas', nombre:'Plátanos Cavendish',
      precio:800, unidad:'kilo', stock:250,
      origen:'Importación autorizada',
      descripcion:'Dulces y energéticos; fuente natural de potasio.',
      img:'https://tse3.mm.bing.net/th/id/OIP.f5Ch72onfXXu8mrF2BCqugHaGZ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },

    // VERDURAS
    {
      id:'VR001', categoria:'verduras', nombre:'Zanahorias Orgánicas',
      precio:900, unidad:'kilo', stock:100,
      origen:"Región de O'Higgins",
      descripcion:'Cultivadas sin pesticidas; excelentes para ensaladas o jugos.',
      img:'https://tse4.mm.bing.net/th/id/OIP.-6wnLRYBZLOVCwucwiQ7rAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
    {
      id:'VR002', categoria:'verduras', nombre:'Espinacas Frescas',
      precio:700, unidad:'bolsa 500g', stock:80,
      origen:'Agricultor local',
      descripcion:'Tiernas, nutritivas y listas para tus batidos verdes.',
      img:'https://img.freepik.com/fotos-premium/verduras-frescas-espinacas-sobre-fondo-blanco_602089-2898.jpg'
    },
    {
      id:'VR003', categoria:'verduras', nombre:'Pimientos Tricolores',
      precio:1500, unidad:'kilo', stock:120,
      origen:'Invernadero local',
      descripcion:'Rojos, amarillos y verdes; color y antioxidantes para tus platos.',
      img:'https://tse1.mm.bing.net/th/id/OIP.tj2GxjoLiVSrAKhuUrwkSAHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },

    // ORGÁNICOS
    {
      id:'PO001', categoria:'organicos', nombre:'Miel Orgánica',
      precio:5000, unidad:'frasco 500g', stock:50,
      origen:'Apicultores locales',
      descripcion:'Pura, aromática y rica en antioxidantes.',
      img:'https://img.freepik.com/fotos-premium/deliciosa-miel-natural-sobre-fondo-blanco-producto-organico_495423-45834.jpg'
    },
    {
      id:'PO003', categoria:'organicos', nombre:'Quinua Orgánica',
      precio:3800, unidad:'bolsa 1kg', stock:60,
      origen:'Altiplano chileno',
      descripcion:'Grano andino de alto valor proteico para tus ensaladas y bowls.',
      img:'https://tse3.mm.bing.net/th/id/OIP.XpzI-XhFVqkaTe6qpQWC5AHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },

    // LÁCTEOS
    {
      id:'PL001', categoria:'lacteos', nombre:'Leche Entera',
      precio:1200, unidad:'litro', stock:200,
      origen:'Granja local',
      descripcion:'Fresca y de sabor auténtico, ideal para tu desayuno.',
      img:'https://tse2.mm.bing.net/th/id/OIP.iIw5i9aspnF0VqoLlXrhRgHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
    },
  ]
};
