'use client';

import React, { useState } from 'react';
import styles from './Desiderativo.module.css'; // si usas CSS Module

type Catexia = {
  texto: string;
  motivo: string;
};

export default function DesiderativoPage() {
  // Estado para catexias
  const [catexiasPositivas, setCatexiasPositivas] = useState<Catexia[]>([]);
  const [catexiasNegativas, setCatexiasNegativas] = useState<Catexia[]>([]);

  // Inputs controlados para añadir catexia
  const [nuevaCatexiaPos, setNuevaCatexiaPos] = useState<Catexia>({ texto: '', motivo: '' });
  const [nuevaCatexiaNeg, setNuevaCatexiaNeg] = useState<Catexia>({ texto: '', motivo: '' });

  // Métodos de añadir/borrar
  const addCatexiaPositiva = () => {
    if (nuevaCatexiaPos.texto.trim() !== '') {
      setCatexiasPositivas([...catexiasPositivas, nuevaCatexiaPos]);
      setNuevaCatexiaPos({ texto: '', motivo: '' });
    }
  };
  const addCatexiaNegativa = () => {
    if (nuevaCatexiaNeg.texto.trim() !== '') {
      setCatexiasNegativas([...catexiasNegativas, nuevaCatexiaNeg]);
      setNuevaCatexiaNeg({ texto: '', motivo: '' });
    }
  };
  const removeCatexiaPos = (idx: number) =>
    setCatexiasPositivas(catexiasPositivas.filter((_, i) => i !== idx));
  const removeCatexiaNeg = (idx: number) =>
    setCatexiasNegativas(catexiasNegativas.filter((_, i) => i !== idx));

  // Para limpiar todo el formulario
  const handleLimpiar = () => {
    (document.getElementById('desiderativo-form') as HTMLFormElement)?.reset();
    setCatexiasPositivas([]);
    setCatexiasNegativas([]);
    setNuevaCatexiaPos({ texto: '', motivo: '' });
    setNuevaCatexiaNeg({ texto: '', motivo: '' });
    setResultado('');
    setMostrarResultado(false);
  };

  // Estado y lógica análisis y mostrar resultados
  const [resultado, setResultado] = useState<string>('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Lógica para “Analizar protocolo” (aquí deberías construir el informe real)
  const handleAnalizar = (event: React.FormEvent) => {
    event.preventDefault();
    // Aquí construirías el prompt/informe (ejemplo de demo a continuación)
    setResultado('INFORME GENERADO.\n\n(Construir aquí el prompt con info del formulario y catexias)');
    setMostrarResultado(true);
    // puedes además enviar datos al backend si hace falta
  };

  return (
    <div className={styles.container}>
      {/* ... header igual ... */}
      <main>
        <form id="desiderativo-form" onSubmit={handleAnalizar} autoComplete="off">
          <section className={styles['form-section'] + ' ' + styles['form-section--datos']}>
            <h2>Datos</h2>
            {/* ... aquí el bloque datos generales, igual que antes ... */}
          </section>

          <div className={styles['catexias-two-col']}>
            <section className={styles['form-section']}>
              <h2>🟢 Catexias Positivas</h2>
              {catexiasPositivas.map((cat, idx) => (
                <div className="catexia-item" key={idx}>
                  <strong>{cat.texto}</strong>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ float: 'right' }}
                    onClick={() => removeCatexiaPos(idx)}
                  >
                    Eliminar
                  </button>
                  <div style={{ fontSize: "12px", color: "#a9b6d3" }}>{cat.motivo}</div>
                </div>
              ))}
              {/* Inputs para nueva catexia positiva */}
              <div style={{ marginTop: 8 }}>
                <input
                  type="text"
                  value={nuevaCatexiaPos.texto}
                  onChange={e => setNuevaCatexiaPos({ ...nuevaCatexiaPos, texto: e.target.value })}
                  placeholder="Texto de la catexia"
                />
                <input
                  type="text"
                  value={nuevaCatexiaPos.motivo}
                  onChange={e => setNuevaCatexiaPos({ ...nuevaCatexiaPos, motivo: e.target.value })}
                  placeholder="Motivo u observación"
                />
                <button type="button" className="btn btn-primary" onClick={addCatexiaPositiva}>
                  Añadir
                </button>
              </div>
            </section>

            <section className={styles['form-section']}>
              <h2>🔴 Catexias Negativas</h2>
              {catexiasNegativas.map((cat, idx) => (
                <div className="catexia-item" key={idx}>
                  <strong>{cat.texto}</strong>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ float: 'right' }}
                    onClick={() => removeCatexiaNeg(idx)}
                  >
                    Eliminar
                  </button>
                  <div style={{ fontSize: "12px", color: "#a9b6d3" }}>{cat.motivo}</div>
                </div>
              ))}
              {/* Inputs para nueva catexia negativa */}
              <div style={{ marginTop: 8 }}>
                <input
                  type="text"
                  value={nuevaCatexiaNeg.texto}
                  onChange={e => setNuevaCatexiaNeg({ ...nuevaCatexiaNeg, texto: e.target.value })}
                  placeholder="Texto de la catexia"
                />
                <input
                  type="text"
                  value={nuevaCatexiaNeg.motivo}
                  onChange={e => setNuevaCatexiaNeg({ ...nuevaCatexiaNeg, motivo: e.target.value })}
                  placeholder="Motivo u observación"
                />
                <button type="button" className="btn btn-primary" onClick={addCatexiaNegativa}>
                  Añadir
                </button>
              </div>
            </section>
          </div>
          {/* ...el resto del formulario... */}
          <section className={styles['form-actions']}>
            <button type="button" id="limpiar" className="btn btn-secondary" onClick={handleLimpiar}>
              Limpiar formulario
            </button>
            <button type="submit" id="analizar" className="btn btn-primary">
              Analizar protocolo
            </button>
          </section>
        </form>

        <section
          id="result-section"
          className={styles['result-section']}
          style={{ display: mostrarResultado ? 'block' : 'none' }}
        >
          <div className={styles['result-header']}>
            <h2>Informe de Análisis</h2>
            <button
              type="button"
              id="guardar-imprimir"
              className="btn btn-success"
              onClick={() => window.print()}
            >
              Guardar / Imprimir
            </button>
          </div>
          <textarea
            id="result-text"
            className="result-textarea"
            readOnly
            value={resultado}
          ></textarea>
        </section>
      </main>
      <footer className={styles['app-footer']} aria-hidden="true"></footer>
    </div>
  );
}
