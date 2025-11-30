import React, { useState } from "react";
import "../styles/Registro.css";
import { useUser } from "../context/UserContext";

const Registro = () => {
  const [modo, setModo] = useState("login"); // "login" o "registro"
  const { login, register } = useUser();
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
  });
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  // Validaciones básicas
  const validarEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

    const { nombre, email, password } = formData;

    // Validaciones
    if (!email || !password || (modo === "registro" && !nombre)) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    if (!validarEmail(email)) {
      setMensaje("El correo ingresado no es válido.");
      return;
    }

    if (password.length < 6) {
      setMensaje("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setCargando(true);
    try {
      if (modo === "login") {
        await login(email, password); // 🔐 login real contra backend
        setMensaje(`✅ Bienvenido nuevamente, ${email}!`);
      } else {
        await register(nombre, email, password); // 🆕 registro real
        setMensaje(`🎉 Registro exitoso. ¡Bienvenido/a, ${nombre}!`);
      }

      setFormData({ nombre: "", email: "", password: "" });
      setTimeout(() => setMensaje(""), 4000);
    } catch (err) {
      console.error("Error en autenticación:", err);
      setMensaje(
        modo === "login"
          ? "Correo o contraseña incorrectos."
          : "No se pudo completar el registro. Intenta nuevamente."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="registro-container">
      <section className="registro-hero">
        <h1>{modo === "login" ? "Iniciar Sesión" : "Crear Cuenta"}</h1>
        <p>
          {modo === "login"
            ? "Accede a tu cuenta para seguir comprando productos frescos."
            : "Regístrate para recibir ofertas y novedades de Orgánica."}
        </p>
      </section>

      <section className="registro-form">
        <form onSubmit={handleSubmit}>
          {modo === "registro" && (
            <div className="form-group">
              <label htmlFor="nombre">Nombre completo</label>
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
          )}

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
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Mínimo 6 caracteres"
              required
            />
          </div>

          <button type="submit" className="btn-enviar" disabled={cargando}>
            {cargando
              ? modo === "login"
                ? "Ingresando..."
                : "Registrando..."
              : modo === "login"
              ? "Ingresar"
              : "Registrarme"}
          </button>

          {mensaje && <p className="form-feedback">{mensaje}</p>}
        </form>

        <div className="switch-mode">
          {modo === "login" ? (
            <p>
              ¿No tienes cuenta?{" "}
              <button type="button" onClick={() => setModo("registro")}>
                Crear una cuenta
              </button>
            </p>
          ) : (
            <p>
              ¿Ya tienes cuenta?{" "}
              <button type="button" onClick={() => setModo("login")}>
                Iniciar sesión
              </button>
            </p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Registro;
