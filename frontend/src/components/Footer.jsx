import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  const anioActual = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Izquierda: Logo y lema */}
        <div className="footer-brand">
          <h2>Orgánica</h2>
          <p>Productos frescos del campo a tu mesa</p>
        </div>

        {/* Centro: Enlaces */}
        <div className="footer-links">
          <a href="/">Inicio</a>
          <a href="/catalogo">Catálogo</a>
          <a href="/registro">Registro</a>
          <a href="/contacto">Contacto</a>
        </div>

        {/* Derecha: Redes */}
        <div className="footer-social">
          <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
            <img src="/img/instagram.svg" alt="Instagram" />
          </a>
          <a href="https://www.facebook.com" target="_blank" rel="noreferrer">
            <img src="/img/facebook.svg" alt="Facebook" />
          </a>
          <a href="mailto:contacto@organica.cl">
            <img src="/img/mail.svg" alt="Correo" />
          </a>
        </div>
      </div>

      {/* Línea inferior */}
      <div className="footer-bottom">
        <p>© {anioActual} Orgánica — Todos los derechos reservados</p>
      </div>
    </footer>
  );
};

export default Footer;
