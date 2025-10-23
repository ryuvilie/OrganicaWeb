import React, { useState } from "react";
import "../styles/Contacto.css";

const Contacto = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    mensaje: "",
  });
  const [mensajeEstado, setMensajeEstado] = useState("");

  // Validaciones simples
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { nombre, email, asunto, mensaje } = formData;

    if (!nombre || !email || !asunto || !mensaje) {
      setMensajeEstado("Por favor completa todos los campos.");
      return;
    }

    if (!validarEmail(email)) {
      setMensajeEstado("El correo ingresado no es válido.");
      return;
    }

    // Simulación de envío
    console.log("Mensaje enviado:", formData);
    setMensajeEstado("✅ ¡Mensaje enviado correctamente!");
    setFormData({ nombre: "", email: "", asunto: "", mensaje: "" });

    // Borra el mensaje después de unos segundos
    setTimeout(() => setMensajeEstado(""), 4000);
  };

  return (
    <main className="contacto-container">
      <section className="contacto-hero">
        <h1>Contáctanos</h1>
        <p>
          ¿Tienes dudas, sugerencias o quieres saber más sobre nuestros productos?
          Escríbenos, ¡nos encanta escucharte!
        </p>
      </section>

      <section className="contacto-formulario">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="nombre@correo.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="asunto">Asunto</label>
            <input
              type="text"
              id="asunto"
              name="asunto"
              value={formData.asunto}
              onChange={handleChange}
              placeholder="Motivo de tu mensaje"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              rows="5"
              placeholder="Escribe tu mensaje aquí..."
              required
            ></textarea>
          </div>

          <button type="submit" className="btn-enviar">
            Enviar mensaje
          </button>

          {mensajeEstado && (
            <p className="form-feedback">{mensajeEstado}</p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Contacto;
