// catalog.js — Render del catálogo HuertoHogar
// Requiere: data.js (DATA), cart.js (getCarrito/setCarrito/actualizarBadge)

(() => {
  const $$ = (s, c=document) => c.querySelector(s);
  const $$$ = (s, c=document) => [...c.querySelectorAll(s)];
  const CLP = (n) => (n || 0).toLocaleString('es-CL');

  const cont = $$('#contenido');
  const selCat = $$('#cat');
  const inputQ = $$('#q');
  const selOrden = $$('#orden');
  const formFiltros = $$('#filtros');

  if(!cont || !selCat || !inputQ || !selOrden){
    console.warn('catalog.js: faltan elementos en el DOM');
    return;
  }

  // ---- NUEVO: leer parámetros iniciales desde la URL (cat, q, orden)
  const params = new URLSearchParams(location.search);
  const catParam   = params.get('cat') || 'todas';
  const qParam     = params.get('q')   || '';
  const ordenParam = params.get('orden') || 'relevancia';
  // -----------------------------

  // Estado de filtros
  let state = {
    cat: 'todas',
    q: '',
    orden: 'relevancia',
  };

  // Poblar categorías
  function cargarCategorias(){
    selCat.innerHTML = '<option value="todas">Todas</option>';
    DATA.categorias.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.nombre;
      selCat.appendChild(opt);
    });
  }

  function normalizar(str){
    return (str || '').toString().toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '');
  }

  function filtrarYOrdenar(data){
    let out = [...data];

    // Filtro por cat
    if(state.cat !== 'todas'){
      out = out.filter(p => p.categoria === state.cat);
    }

    // Búsqueda
    const q = normalizar(state.q);
    if(q){
      out = out.filter(p => {
        const hay = normalizar(p.nombre).includes(q)
                  || normalizar(p.descripcion).includes(q)
                  || normalizar(p.id).includes(q)
                  || normalizar(p.origen).includes(q);
        return hay;
      });
    }

    // Orden
    switch(state.orden){
      case 'precio-asc': out.sort((a,b)=> a.precio - b.precio); break;
      case 'precio-desc': out.sort((a,b)=> b.precio - a.precio); break;
      case 'nombre-asc': out.sort((a,b)=> a.nombre.localeCompare(b.nombre,'es')); break;
      case 'nombre-desc': out.sort((a,b)=> b.nombre.localeCompare(a.nombre,'es')); break;
      default: /* relevancia = sin cambios */;
    }

    return out;
  }

  function productoCard(p){
    const unidad = p.unidad ? `/${p.unidad}` : '';
    const sinStock = p.stock <= 0;
    const alt = `${p.nombre} · ${p.descripcion || ''}`.trim();

    return `
      <article class="card-prod" data-id="${p.id}">
        <div class="thumb">
          <img src="${p.img || '../../public/img/placeholder.jpg'}" alt="${alt}" loading="lazy">
          ${sinStock ? '<span class="badge badge-warn">Sin stock</span>' : ''}
        </div>
        <div class="body">
          <h3>${p.nombre}</h3>
          <p class="muted">${p.origen || ''}</p>
          <p class="desc">${p.descripcion || ''}</p>
          <div class="price">
            <strong>$${CLP(p.precio)}</strong> <span class="muted">${unidad}</span>
          </div>
          <div class="actions">
            <button class="btn btn-primary btn-sm" ${sinStock ? 'disabled' : ''} data-add="${p.id}">
              Añadir al carrito
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function render(){
    const prods = filtrarYOrdenar(DATA.productos);
    if(prods.length === 0){
      cont.innerHTML = `<p class="muted">No se encontraron productos con los filtros aplicados.</p>`;
      return;
    }
    cont.innerHTML = prods.map(productoCard).join('');

    // Enlazar botones "Añadir"
    $$$('[data-add]', cont).forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-add');
        const p = DATA.productos.find(x => x.id === id);
        if(!p) return;

        const carrito = getCarrito();
        const item = carrito.find(x => x.id === id);
        if(item){
          if(item.cantidad < p.stock) item.cantidad += 1;
        } else {
          carrito.push({ id: p.id, nombre: p.nombre, precio: p.precio, cantidad: 1, stock: p.stock, unidad: p.unidad, img: p.img || '../public/img/placeholder.jpg' });
        }
        setCarrito(carrito);
        if(typeof actualizarBadge === 'function') actualizarBadge();
        btn.textContent = 'Añadido ✓';
        setTimeout(()=> btn.textContent = 'Añadir al carrito', 900);
      });
    });
  }

  // ---- NUEVO: actualizar la URL al cambiar filtros (sin recargar)
  function syncURL(){
    const usp = new URLSearchParams();
    if(state.cat && state.cat !== 'todas') usp.set('cat', state.cat);
    if(state.q) usp.set('q', state.q);
    if(state.orden && state.orden !== 'relevancia') usp.set('orden', state.orden);
    const qs = usp.toString();
    const newURL = qs ? `${location.pathname}?${qs}` : location.pathname;
    history.replaceState(null, '', newURL);
  }
  // -----------------------------

  // Eventos
  selCat.addEventListener('change', (e)=>{ state.cat = e.target.value; render(); syncURL(); });
  inputQ.addEventListener('input', (e)=>{ state.q = e.target.value; render(); syncURL(); });
  selOrden.addEventListener('change', (e)=>{ state.orden = e.target.value; render(); syncURL(); });

  // Init
  cargarCategorias();

  // ---- NUEVO: inicializar estado y controles desde parámetros de URL
  const catIds = new Set(['todas', ...DATA.categorias.map(c => c.id)]);
  state.cat = catIds.has(catParam) ? catParam : 'todas';
  state.q = qParam;
  state.orden = ['relevancia','precio-asc','precio-desc','nombre-asc','nombre-desc'].includes(ordenParam)
    ? ordenParam : 'relevancia';

  selCat.value = state.cat;
  inputQ.value = state.q;
  selOrden.value = state.orden;
  // -----------------------------

  render();
  syncURL(); // deja la URL limpia y sincronizada al cargar
})();
