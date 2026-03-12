'use client';

import React from 'react';
// Si tienes un sistema de estilos de Open Notebook, importa el CSS aquí.
// Si vas a migrar tu 'form.css', cámbialo por un import de un CSS module:
// import styles from './Desiderativo.module.css';

export default function DesiderativoPage() {
  return (
    <div className="container">
      <header>
        <h1>📋 Análisis Cuestionario Desiderativo</h1>
        <p className="subtitle">Análisis clínico integral</p>
      </header>
      <main>
        <form id="desiderativo-form">
          {/* DATOS DEL EVALUADO */}
          <section className="form-section">
            <h2>Datos del Evaluado</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre/ID del protocolo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  placeholder="Ej: Protocolo ACR"
                />
              </div>
              <div className="form-group">
                <label htmlFor="edad">Edad *</label>
                <input
                  type="number"
                  id="edad"
                  name="edad"
                  min={4}
                  max={100}
                  required
                  placeholder="Años"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="genero">Sexo</label>
                <select id="genero" name="genero">
                  <option value="">Seleccionar...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                  <option value="no-especifica">Prefiere no especificar</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="nivel_educativo">Nivel educativo</label>
                <select id="nivel_educativo" name="nivel_educativo">
                  <option value="">Seleccionar...</option>
                  <option value="inicial">Inicial</option>
                  <option value="primario">Primario</option>
                  <option value="secundario">Secundario</option>
                  <option value="terciario">Terciario</option>
                  <option value="universitario">Universitario</option>
                  <option value="posgrado">Posgrado</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fecha">Fecha de aplicación *</label>
                <input
                  type="date"
                  id="fecha"
                  name="fecha"
                  required
                />
              </div>
            </div>
          </section>
          {/* Aquí añade más secciones de tu formulario según lo que tengas en App2 */}
          {/* ... */}
          <div>
            <button type="submit">Generar Informe</button>
          </div>
        </form>
      </main>
    </div>
  );
}
