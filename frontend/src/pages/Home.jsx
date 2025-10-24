import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <main>
      {/* 🌱 HERO */}
      <section
        className="hero"
        style={{
          backgroundImage: "url('/assets/img/hero.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="hero-overlay">
          <div className="container hero-inner">
            <div className="hero-text">
              <h1>Frescura orgánica a tu mesa</h1>
              <p>
                Frutas y verduras de productores locales, seleccionadas y de temporada.
              </p>
              <div className="hero-actions">
                <Link to="/catalogo" className="btn-solid">
                  Ver catálogo
                </Link>
                <Link to="/ofertas" className="btn-link">
                  Ofertas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🥬 CATEGORÍAS */}
      <section className="home-categories">
        <div className="container">
          <h2>Categorías</h2>
          <div className="grid">
            <article className="card">
              <h3>Frutas Frescas</h3>
              <Link to="/catalogo?cat=frutas" className="btn-link" aria-label="Explorar Frutas">
                Explorar
              </Link>
            </article>

            <article className="card">
              <h3>Verduras</h3>
              <Link to="/catalogo?cat=verduras" className="btn-link" aria-label="Explorar Verduras">
                Explorar
              </Link>
            </article>

            <article className="card">
              <h3>Semillas</h3>
              <Link to="/catalogo?cat=Semillas" className="btn-link" aria-label="Explorar Semillas">
                Explorar
              </Link>
            </article>

            <article className="card">
              <h3>Ofertas</h3>

              <Link to="/ofertas" className="btn-link" aria-label="Ver Ofertas">
                Explorar
              </Link>

            </article>
          </div>
        </div>
      </section>

      {/* 🌿 MISIÓN Y VISIÓN */}
      <section className="home-mision-vision">
        <div className="container">
          <h2>Nuestra Esencia</h2>

        <div className="mision-vision-grid">
          <article className="mision-card">
            <h3>🌱 Misión</h3>
            <p>
              Proporcionar productos frescos y de calidad directamente desde el campo
              hasta la puerta de nuestros clientes, garantizando la frescura y el sabor
              en cada entrega. Nos comprometemos a fomentar una conexión más cercana
              entre consumidores y agricultores locales, promoviendo prácticas sostenibles
              y una alimentación saludable.
            </p>
          </article>

          <article className="vision-card">
            <h3>🍃 Visión</h3>
            <p>
              Ser la tienda online líder en distribución de productos frescos y naturales
              en Chile, reconocida por su calidad, servicio y compromiso con la
              sostenibilidad. Aspiramos a expandir nuestra presencia nacional e
              internacional, estableciendo un nuevo estándar en la conexión directa
              entre productor y consumidor.
            </p>
          </article>
        </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
