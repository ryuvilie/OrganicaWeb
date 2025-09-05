/* forms.js - Validaciones JS personalizadas (DSY1104)
   - Mensajes de error junto a cada input
   - Sugerencias (hints) via <small>.hint
   - Accesible (aria-invalid, aria-describedby)
*/

// Utilidades DOM
const $$  = (sel, ctx=document) => ctx.querySelector(sel);
const $$$ = (sel, ctx=document) => [...ctx.querySelectorAll(sel)];

// Año footer
const y = $$('#y'); if (y) y.textContent = new Date().getFullYear();

// ==== Helpers de validación ====
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || '').toLowerCase());
const minLen = (v, n) => String(v || '').length >= n;

function showError(input, msg) {
  input.setAttribute('aria-invalid', 'true');
  const err = $$('#' + input.id + '-error');
  if (err) { err.textContent = msg; err.hidden = false; }
}

function clearError(input) {
  input.removeAttribute('aria-invalid');
  const err = $$('#' + input.id + '-error');
  if (err) { err.textContent = ''; err.hidden = true; }
}

function validateLoginForm(form) {
  let ok = true;
  const email = $$('#email', form);
  const pass  = $$('#pass', form);

  // Reset previo
  [email, pass].forEach(clearError);

  // Email
  if (!email.value.trim()) {
    showError(email, 'El correo es obligatorio.');
    ok = false;
  } else if (!isEmail(email.value)) {
    showError(email, 'Ingresa un correo válido (ej: nombre@dominio.cl).');
    ok = false;
  }

  // Contraseña
  if (!pass.value.trim()) {
    showError(pass, 'La contraseña es obligatoria.');
    ok = false;
  } else if (!minLen(pass.value, 6)) {
    showError(pass, 'La contraseña debe tener al menos 6 caracteres.');
    ok = false;
  }

  return ok;
}

// ==== Login ====
const formLogin = $$('#formLogin');
if (formLogin) {
  // Sugerencias en tiempo real (blur/input)
  $$$('input', formLogin).forEach(inp => {
    inp.addEventListener('input', () => clearError(inp));
    inp.addEventListener('blur',  () => {
      // Validación suave al salir del campo
      if (inp.id === 'email' && inp.value && !isEmail(inp.value)) {
        showError(inp, 'Formato de correo no válido.');
      }
      if (inp.id === 'pass' && inp.value && !minLen(inp.value, 6)) {
        showError(inp, 'Mínimo 6 caracteres.');
      }
    });
  });

  formLogin.addEventListener('submit', (e) => {
    e.preventDefault();
    const ok = validateLoginForm(formLogin);
    const msg = $$('#form-msg');

    if (!ok) {
      if (msg) { msg.className = 'form-msg error-msg'; msg.textContent = 'Revisa los campos marcados en rojo.'; }
      return;
    }

    // Simulación simple de autenticación (educativa):
    // - Si "Recordarme" está marcado, guardamos el correo en localStorage para precargarlo.
    const email = $$('#email').value.trim().toLowerCase();
    const remember = $$('#remember').checked;

    if (remember) localStorage.setItem('rememberEmail', email);
    else localStorage.removeItem('rememberEmail');

    // Feedback de éxito (aquí podrías redirigir al catálogo o cuenta)
    if (msg) { msg.className = 'form-msg ok-msg'; msg.textContent = 'Inicio de sesión correcto. ¡Bienvenida/o!'; }

    // Ejemplo: redirigir tras 900 ms
    setTimeout(() => location.href = './catalogo.html', 900);
  });

  // Autocompletar demo (facilita revisión de la rúbrica)
  const btnDemo = $$('#btnDemo');
  if (btnDemo) {
    btnDemo.addEventListener('click', () => {
      $$('#email').value = 'cliente@huertohogar.cl';
      $$('#pass').value  = 'verdelimon';
      $$$('input', formLogin).forEach(clearError);
      const msg = $$('#form-msg');
      if (msg) { msg.className = 'form-msg'; msg.textContent = 'Campos de ejemplo cargados. Puedes enviar el formulario.'; }
    });
  }

  // Precarga correo si el usuario marcó "Recordarme" antes
  const remembered = localStorage.getItem('rememberEmail');
  if (remembered) $$('#email').value = remembered;
}
// ==== Contacto ====

// Reglas simples
const soloLetras = (v) => /^[A-Za-zÁÉÍÓÚáéíóúÑñüÜ\s]+$/.test(String(v || '').trim());
const min = (v, n) => String(v || '').trim().length >= n;

function showErr(id, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = msg;
  el.hidden = !msg;
}
function clearErr(id){ showErr(id, ''); }

function validateContactoForm(form) {
  let ok = true;

  const nombre  = document.getElementById('c-nombre');
  const email   = document.getElementById('c-email');
  const asunto  = document.getElementById('c-asunto');
  const mensaje = document.getElementById('c-mensaje');

  // Reset
  [nombre, email, asunto, mensaje].forEach(i => i && i.removeAttribute('aria-invalid'));
  ['c-nombre-error','c-email-error','c-asunto-error','c-mensaje-error'].forEach(clearErr);

  // Nombre
  if (!min(nombre.value, 2)) {
    nombre.setAttribute('aria-invalid','true');
    showErr('c-nombre-error','Ingresa tu nombre (mínimo 2 caracteres).');
    ok = false;
  } else if (!soloLetras(nombre.value)) {
    nombre.setAttribute('aria-invalid','true');
    showErr('c-nombre-error','Solo letras y espacios.');
    ok = false;
  }

  // Email
  if (!min(email.value, 1)) {
    email.setAttribute('aria-invalid','true');
    showErr('c-email-error','El correo es obligatorio.');
    ok = false;
  } else if (!isEmail(email.value)) {
    email.setAttribute('aria-invalid','true');
    showErr('c-email-error','Formato de correo no válido.');
    ok = false;
  }

  // Asunto
  if (!min(asunto.value, 3)) {
    asunto.setAttribute('aria-invalid','true');
    showErr('c-asunto-error','El asunto debe tener al menos 3 caracteres.');
    ok = false;
  }

  // Mensaje
  if (!min(mensaje.value, 10)) {
    mensaje.setAttribute('aria-invalid','true');
    showErr('c-mensaje-error','El mensaje debe tener al menos 10 caracteres.');
    ok = false;
  }

  return ok;
}

const formContacto = document.getElementById('formContacto');
if (formContacto) {

  // Validación suave al escribir/salir de campos
  [['c-nombre','c-nombre-error', v=>min(v,2) && soloLetras(v), 'Nombre inválido.'],
   ['c-email','c-email-error', v=>isEmail(v), 'Correo inválido.'],
   ['c-asunto','c-asunto-error', v=>min(v,3), 'Asunto muy corto.'],
   ['c-mensaje','c-mensaje-error', v=>min(v,10), 'Mensaje muy corto.']
  ].forEach(([inputId, errId, fn])=>{
    const inp = document.getElementById(inputId);
    if (!inp) return;
    inp.addEventListener('input', ()=> {
      if (fn(inp.value)) {
        inp.removeAttribute('aria-invalid');
        clearErr(errId);
      }
    });
    inp.addEventListener('blur', ()=> {
      if (!fn(inp.value)) {
        inp.setAttribute('aria-invalid','true');
        // El mensaje detallado lo fija validateContactoForm en submit
      }
    });
  });

  formContacto.addEventListener('submit', (e)=>{
    e.preventDefault();
    const ok = validateContactoForm(formContacto);
    const msg = document.getElementById('c-form-msg');

    if (!ok) {
      if (msg) { msg.className = 'form-msg error-msg'; msg.textContent = 'Revisa los campos marcados en rojo.'; }
      return;
    }

    // Simulación de envío: guardamos en LocalStorage para evidenciar flujo (educativo)
    const payload = {
      nombre:  document.getElementById('c-nombre').value.trim(),
      email:   document.getElementById('c-email').value.trim().toLowerCase(),
      asunto:  document.getElementById('c-asunto').value.trim(),
      mensaje: document.getElementById('c-mensaje').value.trim(),
      fecha:   new Date().toISOString()
    };
    const bandeja = JSON.parse(localStorage.getItem('contactosHuerto') || '[]');
    bandeja.push(payload);
    localStorage.setItem('contactosHuerto', JSON.stringify(bandeja));

    if (msg) { msg.className = 'form-msg ok-msg'; msg.textContent = '¡Mensaje enviado! Te contactaremos pronto.'; }
    formContacto.reset();
  });

  // Autocompletar demo
  const demo = document.getElementById('c-btnDemo');
  if (demo) {
    demo.addEventListener('click', ()=>{
      document.getElementById('c-nombre').value  = 'Moira Guzmán';
      document.getElementById('c-email').value   = 'cliente@huertohogar.cl';
      document.getElementById('c-asunto').value  = 'Consulta disponibilidad Miel Orgánica';
      document.getElementById('c-mensaje').value = 'Hola, ¿tienen stock para entrega en Valparaíso esta semana?';
      ['c-nombre-error','c-email-error','c-asunto-error','c-mensaje-error'].forEach(clearErr);
      const msg = document.getElementById('c-form-msg');
      if (msg) { msg.className = 'form-msg'; msg.textContent = 'Campos de ejemplo cargados. Puedes enviar el formulario.'; }
    });
  }
}
