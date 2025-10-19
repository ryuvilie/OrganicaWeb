// login.js — versión con redirección a Home al validar datos
(() => {
  const $ = (s, c=document) => c.querySelector(s);

  const form = $('#loginForm');
  const email = $('#email');
  const pass = $('#password');
  const remember = $('#remember');
  const ok = $('#loginOK');
  const btnDemo = $('#btnDemo');
  const btnShow = $('.show-pass');
  const btnLogin = $('#btnLogin');

  // Mostrar/ocultar contraseña
  btnShow.addEventListener('click', () => {
    const isPwd = pass.type === 'password';
    pass.type = isPwd ? 'text' : 'password';
    btnShow.textContent = isPwd ? 'Ocultar' : 'Mostrar';
    btnShow.setAttribute('aria-pressed', String(isPwd));
    pass.focus();
  });

  // Autocompletar demo
  btnDemo.addEventListener('click', () => {
    email.value = 'cliente@huertohogar.cl';
    pass.value = 'demo1234';
    clearErrors();
    btnLogin.disabled = false;
  });

  // Habilitar/deshabilitar botón según campos
  form.addEventListener('input', () => {
    btnLogin.disabled = !(email.value.trim() && pass.value.trim());
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    ok.hidden = true;

    const mail = email.value.trim().toLowerCase();
    const pwd  = pass.value;

    // Validaciones mínimas
    if (!/^\S+@\S+\.\S+$/.test(mail)) {
      setError(email, 'Ingresa un correo válido (ej: nombre@dominio.cl).');
      email.focus(); return;
    }
    if (!pwd || pwd.length < 6) {
      setError(pass, 'La contraseña debe tener al menos 6 caracteres.');
      pass.focus(); return;
    }

    // (Opcional) recordar email
    if (remember.checked) localStorage.setItem('hh_last_user', mail);
    else localStorage.removeItem('hh_last_user');

    // Éxito visual breve y redirección
    ok.hidden = false;
    btnLogin.disabled = true; // evita doble envío
    setTimeout(() => {
      // Desde pages/login.html hacia pages/index.html (misma carpeta)
      window.location.href = './index.html';
    }, 400);
  });

  // Precargar último usuario recordado
  const last = localStorage.getItem('hh_last_user');
  if (last && !email.value) email.value = last;

  function setError(input, msg){
    const row = input.closest('.form-row');
    row.querySelector('.error').textContent = msg;
    input.setAttribute('aria-invalid', 'true');
  }
  function clearErrors(){
    form.querySelectorAll('.error').forEach(s => s.textContent = '');
    form.querySelectorAll('[aria-invalid="true"]').forEach(i => i.removeAttribute('aria-invalid'));
  }
})();
