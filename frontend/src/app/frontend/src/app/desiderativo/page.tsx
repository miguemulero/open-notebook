'use client';

import React from 'react';

export default function DesiderativoPage() {
  return (
    <div className="container">
      <header className="app-header">
        <div className="header-title">
          <img src="/icon black.png" alt="Icono" className="app-icon" />
          <div className="header-text">
            <h1 className="app-title">Análisis Cuestionario Desiderativo</h1>
            <p className="subtitle">Análisis clínico integral</p>
          </div>
        </div>
      </header>

      <main>
        <form id="desiderativo-form">
          <section className="form-section form-section--datos">
            <h2>Datos</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="nombre">Nombre/ID del protocolo *</label>
                <input type="text" id="nombre" name="nombre" required placeholder="Ej: Protocolo ACR" />
              </div>
              <div className="form-group">
                <label htmlFor="edad">Edad *</label>
                <input type="number" id="edad" name="edad" min={4} max={100} required placeholder="Años" />
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
                <input type="date" id="fecha" name="fecha" required />
              </div>
              <div className="form-group">
                <label htmlFor="modalidad">Modalidad de aplicación</label>
                <select id="modalidad" name="modalidad">
                  <option value="estandar">Estándar</option>
                  <option value="guiada">Guiada</option>
                  <option value="modificada">Modificada</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="informacion">Información contextual relevante</label>
              <textarea
                id="informacion"
                name="informacion"
                rows={3}
                placeholder="Motivo de consulta, antecedentes, observaciones de conducta durante la aplicación..."
              />
            </div>
          </section>

          <div className="catexias-two-col">
            <section className="form-section">
              <h2>🟢 Catexias Positivas</h2>
              <div id="positivas-container"></div>
            </section>
            <section className="form-section">
              <h2>🔴 Catexias Negativas</h2>
              <div id="negativas-container"></div>
            </section>
          </div>

          <section className="form-section">
            <h2>Asociaciones y Recuerdo</h2>
            <div className="form-group">
              <label htmlFor="asociaciones">Asociaciones espontáneas</label>
              <textarea
                id="asociaciones"
                name="asociaciones"
                rows={3}
                placeholder="Asociaciones libres, comentarios espontáneos durante o después de la aplicación..."
              />
            </div>
            <div className="form-group">
              <label htmlFor="recuerdo">Recuerdo positivo</label>
              <textarea
                id="recuerdo"
                name="recuerdo"
                rows={2}
                placeholder="Recuerdo positivo solicitado al finalizar..."
              />
            </div>
          </section>

          <section className="form-actions">
            <button type="button" id="limpiar" className="btn btn-secondary">
              Limpiar formulario
            </button>
            <button type="button" id="analizar" className="btn btn-primary">
              Analizar protocolo
            </button>
          </section>

          <div className="status-container">
            <div id="spinner" className="spinner" hidden></div>
            <p id="statusText" className="status-text"></p>
          </div>
        </form>

        <section id="result-section" className="result-section" style={{ display: 'none' }}>
          <div className="result-header">
            <h2>Informe de Análisis</h2>
            <button type="button" id="guardar-imprimir" className="btn btn-success">
              Guardar / Imprimir
            </button>
          </div>
          <textarea id="result-text" className="result-textarea" readOnly></textarea>
        </section>
      </main>

      <footer className="app-footer" aria-hidden="true"></footer>
    </div>
  );
}
