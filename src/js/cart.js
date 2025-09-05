// ---- Utilidades base compartidas ----
const $$ = (s, c=document) => c.querySelector(s);
const $$$ = (s, c=document) => [...c.querySelectorAll(s)];
const CLP = (n) => (n || 0).toLocaleString('es-CL');

// Año footer
const y = $$('#y'); if (y) y.textContent = new Date().getFullYear();

// Carrito (LS)
const KEY = 'carritoHuerto';
const getCarrito = () => JSON.parse(localStorage.getItem(KEY) || '[]');
const setCarrito = (c) => localStorage.setItem(KEY, JSON.stringify(c));

// Badge header
function actualizarBadge(){
  const c = getCarrito();
  const total = c.reduce((a,i)=>a+i.cantidad,0);
  const badge = $$('#cartCount');
  if(!badge) return;
  if(total>0){ badge.textContent = total; badge.style.display='inline-block'; }
  else { badge.style.display='none'; }
}

// Elementos
const tbody = $$('#carritoBody');
const totalEl = $$('#total');
const wrap = $$('#carritoWrap');
const vacio = $$('#carritoVacio');
const btnVaciar = $$('#btnVaciar');
const btnConfirmar = $$('#btnConfirmar');

// Render tabla
function render(){
  const cart = getCarrito();

  // Vacío
  if(cart.length === 0){
    wrap.style.display = 'none';
    vacio.style.display = 'block';
    actualizarBadge();
    return;
  } else {
    wrap.style.display = 'block';
    vacio.style.display = 'none';
  }

  tbody.innerHTML = cart.map((it, idx) => {
    // Intentar leer stock/unidad desde DATA si existe
    let unidad = 'unidad', stock = 9999;
    if (window.DATA && Array.isArray(DATA.productos)) {
      const d = DATA.productos.find(p => p.id === it.id);
      if (d) { unidad = d.unidad || unidad; stock = d.stock ?? stock; }
    }
    const subtotal = it.precio * it.cantidad;

    return `
      <tr data-id="${it.id}">
        <td>
          <strong>${it.nombre}</strong>
          <div class="muted">ID: ${it.id}${unidad ? ` · ${unidad}` : ''}</div>
        </td>
        <td>$${CLP(it.precio)}</td>
        <td>
          <div style="display:flex;gap:6px;align-items:center">
            <button class="btn btn-secondary btn-sm" data-act="menos" aria-label="Restar 1">−</button>
            <input type="number" min="1" max="${stock}" value="${it.cantidad}" class="q-input" aria-label="Cantidad" 
                   style="width:64px;padding:.4rem;border:1px solid #e5e5e5;border-radius:8px;text-align:center">
            <button class="btn btn-primary btn-sm" data-act="mas" aria-label="Sumar 1">+</button>
          </div>
          <small class="muted">Stock máx: ${stock}</small>
        </td>
        <td>$${CLP(subtotal)}</td>
        <td><button class="btn btn-link" data-act="quitar" aria-label="Eliminar">Eliminar</button></td>
      </tr>
    `;
  }).join('');

  // Total
  const total = cart.reduce((a,i)=> a + (i.precio * i.cantidad), 0);
  totalEl.textContent = CLP(total);

  actualizarBadge();
}

// Delegación de eventos en la tabla
tbody?.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if(!btn) return;

  const tr = e.target.closest('tr');
  const id = tr?.dataset?.id;
  if(!id) return;

  let cart = getCarrito();
  const idx = cart.findIndex(x => x.id === id);
  if(idx === -1) return;

  const act = btn.dataset.act;

  if (act === 'quitar') {
    cart.splice(idx, 1);
  }

  if (act === 'mas') {
    // limitar al stock si existe
    let stock = Infinity;
    const d = window.DATA?.productos?.find(p => p.id === id);
    if (d && typeof d.stock === 'number') stock = d.stock;
    if (cart[idx].cantidad < stock) cart[idx].cantidad += 1;
  }

  if (act === 'menos') {
    cart[idx].cantidad = Math.max(1, cart[idx].cantidad - 1);
  }

  setCarrito(cart);
  render();
});

// Cambio manual en input cantidad
tbody?.addEventListener('change', (e) => {
  if (e.target.classList.contains('q-input')) {
    const tr = e.target.closest('tr');
    const id = tr?.dataset?.id;
    let cart = getCarrito();
    const idx = cart.findIndex(x => x.id === id);
    if(idx === -1) return;

    let val = parseInt(e.target.value, 10);
    if (isNaN(val) || val < 1) val = 1;

    // validar contra stock
    let stock = Infinity;
    const d = window.DATA?.productos?.find(p => p.id === id);
    if (d && typeof d.stock === 'number') stock = d.stock;
    if (val > stock) val = stock;

    cart[idx].cantidad = val;
    setCarrito(cart);
    render();
  }
});

// Vaciar
btnVaciar?.addEventListener('click', () => {
  if (confirm('¿Vaciar todo el carrito?')) {
    setCarrito([]);
    render();
  }
});

// Confirmar pedido (simulado)
btnConfirmar?.addEventListener('click', () => {
  const cart = getCarrito();
  if (!cart.length) return alert('Tu carrito está vacío.');
  const total = cart.reduce((a,i)=> a + (i.precio*i.cantidad), 0);
  alert(`¡Pedido confirmado!\n\nÍtems: ${cart.length}\nTotal: $${CLP(total)}\n\n(Flujo de pago/boleta va en siguientes entregas)`);
  setCarrito([]);
  render();
});

// Init
render();
