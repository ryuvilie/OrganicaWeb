import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <main>
      {/* HERO (diseño del estático) */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero__text">
            <h1>Frescura orgánica a tu mesa</h1>
            <p>Frutas y verduras de productores locales, seleccionadas y de temporada.</p>
            <div className="hero__actions">
              <Link to="/productos" className="btn-solid">Ver catálogo</Link>
              <Link to="/ofertas" className="btn-link">Ofertas</Link>
            </div>
          </div>

          <div className="hero__img">
            {/* Si no tienes imagen, déjalo así: el bloque no rompe el layout */}
            <img src="/assets/img/hero.jpg" alt="Orgánicos" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
          </div>
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section className="home-categories">
        <div className="container">
          <h2>Categorías</h2>
          <div className="grid">
            <article className="card">
              <h3>Frutas Frescas</h3>
              <a className="btn-link" href="/catalogo?cat=frutas">Explorar</a>
            </article>
            <article className="card">
              <h3>Verduras</h3>
              <a className="btn-link" href="/catalogo?cat=verduras">Explorar</a>
            </article>
            <article className="card">
              <h3>Semillas</h3>
              <a className="btn-link" href="/catalogo?cat=semillas">Explorar</a>
            </article>
            <article className="card">
              <h3>Ofertas</h3>
              <a className="btn-link" href="/ofertas">Explorar</a>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
