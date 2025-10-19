// contacto.js — Validaciones accesibles + demo + confirmación (simulada)
(() => {
  const $ = (s, c=document) => c.querySelector(s);

  const form   = $('#formContacto');
  const nombre = $('#c-nombre');
  const email  = $('#c-email');
  const asunto = $('#c-asunto');
  const msj    = $('#c-mensaje');
  const demo   = $('#c-btnDemo');
  const enviar = $('#c-btnEnviar');
  const banner = $('#c-form-msg');

  if (!form) return;

  // Reglas
  const reNombre = /^[A-Za-zÁÉÍÓÚÑáéíóúñ ]{2,}$/;
  const reEmail  = /^\S+@\S+\.\S+$/;

  form.addEventListener('input', () => {
    // habilita el botón si hay contenido en todos
    enviar.disabled = !(nombre.value.trim() && email.value.trim() && asunto.value.trim() && msj.value.trim());
  });

  demo.addEventListener('click', () => {
    nombre.value = 'Moira Guzmán';
    email.value  = 'cliente@huertohogar.cl';
    asunto.value = 'Consulta por envío a Viña del Mar';
    msj.value    = 'Hola, quisiera saber tiempos y costo de despacho para la zona de Viña del Mar. ¡Gracias!';
    clearErrors();
    enviar.disabled = false;
    nombre.focus();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();
    banner.hidden = true;

    const errs = {};
    if (!reNombre.test(nombre.value.trim())) errs.nombre = 'Ingresa tu nombre y apellido (solo letras y espacios).';
    if (!reEmail.test(email.value.trim()))   errs.email  = 'Ingresa un correo válido (ej: nombre@dominio.cl).';
    if (asunto.value.trim().length < 3)      errs.asunto = 'El asunto debe tener al menos 3 caracteres.';
    if (msj.value.trim().length < 10)        errs.msj    = 'El mensaje debe tener al menos 10 caracteres.';

    if (Object.keys(errs).length) {
      if (errs.nombre) setError(nombre,  '#c-nombre-error',  errs.nombre);
      if (errs.email)  setError(email,   '#c-email-error',   errs.email);
      if (errs.asunto) setError(asunto,  '#c-asunto-error',  errs.asunto);
      if (errs.msj)    setError(msj,     '#c-mensaje-error', errs.msj);
      (errs.nombre && nombre || errs.email && email || errs.asunto && asunto || msj).focus();
      return;
    }

    // Simulación de envío OK
    enviar.disabled = true;
    banner.textContent = '¡Gracias! Hemos recibido tu mensaje y te responderemos a la brevedad.';
    banner.hidden = false;

    // Reset suave
    setTimeout(() => {
      form.reset();
      enviar.disabled = true;
    }, 800);
  });

  function setError(input, sel, msg){
    input.setAttribute('aria-invalid', 'true');
    const out = $(sel);
    if (out) out.textContent = msg;
  }
  function clearErrors(){
    form.querySelectorAll('[aria-invalid="true"]').forEach(i => i.removeAttribute('aria-invalid'));
    form.querySelectorAll('.error').forEach(s => s.textContent = '');
  }
})();
