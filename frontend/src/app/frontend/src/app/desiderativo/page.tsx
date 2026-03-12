'use client';

import React, { useState, useRef } from 'react';
import styles from './Desiderativo.module.css';

type Catexia = { texto: string; motivo: string };

const TITULOS_PERMITIDOS = [
  "I. Encuadre e Implementación",
  "II. Mecanismos Instrumentales",
  "1. Represión Fundante y 1º Disociación Instrumental",
  "2. Segunda Disociación Instrumental",
  "3. Identificación Proyectiva",
  "4. Racionalización",
  "III. Manejo y Tipos de Ansiedad",
  "IV. Secuencia de Reinos y Fantasías de Muerte",
  "V. Consideraciones finales"
];

const ejemploACR = {
  nombre: "Protocolo ACR",
  edad: "8",
  genero: "femenino",
  nivel_educativo: "primario",
  fecha: "2024-03-20",
  modalidad: "estandar",
  informacion: "Motivo: derivado para evaluación por alteraciones conductuales. Presenta dificultades para la regulación emocional.",
  asociaciones: "Recuerda a su mascota, se siente feliz en la playa.",
  recuerdo: "Playa y juegos con la familia.",
  catexiasPos: [
    { texto: "Perro", motivo: "Su mascota actual" },
    { texto: "Playa", motivo: "Vacaciones familiares" }
  ],
  catexiasNeg: [
    { texto: "Dentista", motivo: "Le da miedo, lo asocia con dolor" },
    { texto: "Oscuridad", motivo: "Le genera inseguridad" }
  ]
};

function strong(title: string) {
  return `**${title}**`;
}

export default function DesiderativoPage() {
  const [form, setForm] = useState({
    nombre: ejemploACR.nombre,
    edad: ejemploACR.edad,
    genero: ejemploACR.genero,
    nivel_educativo: ejemploACR.nivel_educativo,
    fecha: ejemploACR.fecha,
    modalidad: ejemploACR.modalidad,
    informacion: ejemploACR.informacion,
    asociaciones: ejemploACR.asociaciones,
    recuerdo: ejemploACR.recuerdo,
  });
  const [catexiasPos, setCatexiasPos] = useState<Catexia[]>(ejemploACR.catexiasPos);
  const [catexiasNeg, setCatexiasNeg] = useState<Catexia[]>(ejemploACR.catexiasNeg);
  const [newCatPos, setNewCatPos] = useState<Catexia>({ texto: '', motivo: '' });
  const [newCatNeg, setNewCatNeg] = useState<Catexia>({ texto: '', motivo: '' });
  const [resultado, setResultado] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const resultRef = useRef<HTMLTextAreaElement>(null);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function addCatexiaPos() {
    if (newCatPos.texto.trim()) {
      setCatexiasPos([...catexiasPos, newCatPos]);
      setNewCatPos({ texto: '', motivo: '' });
    }
  }
  function removeCatexiaPos(idx: number) {
    setCatexiasPos(catexiasPos.filter((_, i) => i !== idx));
  }
  function addCatexiaNeg() {
    if (newCatNeg.texto.trim()) {
      setCatexiasNeg([...catexiasNeg, newCatNeg]);
      setNewCatNeg({ texto: '', motivo: '' });
    }
  }
  function removeCatexiaNeg(idx: number) {
    setCatexiasNeg(catexiasNeg.filter((_, i) => i !== idx));
  }
  function handleLimpiar() {
    setForm({
      nombre: ejemploACR.nombre,
      edad: ejemploACR.edad,
      genero: ejemploACR.genero,
      nivel_educativo: ejemploACR.nivel_educativo,
      fecha: ejemploACR.fecha,
      modalidad: ejemploACR.modalidad,
      informacion: ejemploACR.informacion,
      asociaciones: ejemploACR.asociaciones,
      recuerdo: ejemploACR.recuerdo,
    });
    setCatexiasPos(ejemploACR.catexiasPos);
    setCatexiasNeg(ejemploACR.catexiasNeg);
    setNewCatPos({ texto: '', motivo: '' });
    setNewCatNeg({ texto: '', motivo: '' });
    setResultado('');
    setMostrarResultado(false);
  }

  function handleAnalizar(e: React.FormEvent) {
    e.preventDefault();

    const nPos = catexiasPos.length;
    const nNeg = catexiasNeg.length;
    const listadoPos = catexiasPos.map((cat, i) => `${i + 1}. ${cat.texto} (${cat.motivo})`).join('\n') || "_Sin reportar_";
    const listadoNeg = catexiasNeg.map((cat, i) => `${i + 1}. ${cat.texto} (${cat.motivo})`).join('\n') || "_Sin reportar_";

    const informe = [
      `${strong(TITULOS_PERMITIDOS[0])}\n`,
      `**Motivo de consulta:**\n${form.informacion || "(No consignado)"}\n` +
      `**Datos del paciente:**\n- Nombre/ID: ${form.nombre}\n- Edad: ${form.edad}\n- Sexo: ${form.genero}\n- Nivel Educativo: ${form.nivel_educativo}\n- Fecha aplicación: ${form.fecha}\n- Modalidad: ${form.modalidad}\n`,

      `${strong(TITULOS_PERMITIDOS[1])}\n`,
      `**Catexias Positivas:**\n${listadoPos}\n**Catexias Negativas:**\n${listadoNeg}\n` +
      `Considerar para esta sección los mecanismos predominantes en función de la calidad/motivación de las catexias.`,

      `${strong(TITULOS_PERMITIDOS[6])}\n`,
      `Comparar predominio: ${nPos} positivas vs ${nNeg} negativas.\n` +
      (nPos > nNeg
        ? "Predominio de catexias positivas, lo que suele asociarse a recursos adaptativos y mecanismos defensivos funcionales según Pérez (2019)."
        : nNeg > nPos
          ? "Predominio de catexias negativas, lo que puede indicar dificultades en regulación emocional (Rosales, 2015)."
          : "Equilibrio entre catexias. Posible ambivalencia en el afrontamiento emocional."
      ),

      `${strong(TITULOS_PERMITIDOS[7])}\n`,
      "Analizar si existen contenidos de fantasía de muerte (consignar si alguna catexia se vincula a temores/ansiedad de muerte).",

      `${strong(TITULOS_PERMITIDOS[8])}\n`,
      `**Asociaciones espontáneas:**\n${form.asociaciones || "(No consignadas)"}\n` +
      `**Recuerdo positivo aportado:**\n${form.recuerdo || "(No consignado)"}\n` +

      `\n**Interpretación general:**\nResume de modo sintético posibles hipótesis clínicas y sugerencias de intervención si corresponden, integrando lo anterior y la motivación del protocolo.`,

      `\n\n---\n_Bibliografía utilizada:_\n- Rosales, M. C. (2015). Psicodiagnóstico infantil: Técnicas proyectivas y análisis clínico. Ed. Médica Panamericana.\n- Pérez, B. (2019). El test desiderativo y la exploración del mundo interno. Nueva Clínica.`
    ].join('\n\n');

    setResultado(informe);
    setMostrarResultado(true);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 120);
  }

  return (
    <div className={styles.container}>
      <header className={styles['app-header']}>
        <div className={styles['header-title']}>
          <img src="/icon black.png" alt="Icono" className={styles['app-icon']} />
          <div className={styles['header-text']}>
            <h1 className={styles['app-title']}>Análisis Cuestionario Desiderativo</h1>
            <p className={styles['subtitle']}>Análisis clínico integral</p>
          </div>
        </div>
      </header>
      <main>
        <form id="desiderativo-form" onSubmit={handleAnalizar} autoComplete="off">
          <section className={`${styles['form-section']} ${styles['form-section--datos']}`}>
            <h2>Datos</h2>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="nombre">Nombre/ID del protocolo *</label>
                <input type="text" name="nombre" id="nombre" required value={form.nombre} onChange={handleFormChange} placeholder="Ej: Protocolo ACR" />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="edad">Edad *</label>
                <input type="number" name="edad" id="edad" min={4} max={100} required value={form.edad} onChange={handleFormChange} placeholder="Años" />
              </div>
            </div>
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="genero">Sexo</label>
                <select id="genero" name="genero" value={form.genero} onChange={handleFormChange}>
                  <option value="">Seleccionar...</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                  <option value="otro">Otro</option>
                  <option value="no-especifica">Prefiere no especificar</option>
                </select>
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="nivel_educativo">Nivel educativo</label>
                <select id="nivel_educativo" name="nivel_educativo" value={form.nivel_educativo} onChange={handleFormChange}>
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
            <div className={styles['form-row']}>
              <div className={styles['form-group']}>
                <label htmlFor="fecha">Fecha de aplicación *</label>
                <input type="date" name="fecha" id="fecha" required value={form.fecha} onChange={handleFormChange} />
              </div>
              <div className={styles['form-group']}>
                <label htmlFor="modalidad">Modalidad de aplicación</label>
                <select id="modalidad" name="modalidad" value={form.modalidad} onChange={handleFormChange}>
                  <option value="estandar">Estándar</option>
                  <option value="guiada">Guiada</option>
                  <option value="modificada">Modificada</option>
                </select>
              </div>
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="informacion">Información contextual relevante</label>
              <textarea id="informacion" name="informacion" rows={3} placeholder="Motivo de consulta, antecedentes, observaciones de conducta durante la aplicación..." value={form.informacion} onChange={handleFormChange} />
            </div>
          </section>
          <div className={styles['catexias-two-col']}>
            <section className={styles['form-section']}>
              <h2>🟢 Catexias Positivas</h2>
              {catexiasPos.map((cat, idx) => (
                <div className={styles['catexia-item']} key={idx}>
                  <strong>{cat.texto}</strong>
                  <button type="button" className={`${styles.btn} ${styles['btn-danger']}`} style={{ float: 'right' }} onClick={() => removeCatexiaPos(idx)}>
                    Eliminar
                  </button>
                  <div style={{ fontSize: "12px", color: "#a9b6d3" }}>{cat.motivo}</div>
                </div>
              ))}
              <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                <input type="text" value={newCatPos.texto} onChange={e => setNewCatPos({ ...newCatPos, texto: e.target.value })} placeholder="Texto de la catexia" />
                <input type="text" value={newCatPos.motivo} onChange={e => setNewCatPos({ ...newCatPos, motivo: e.target.value })} placeholder="Motivo u observación" />
                <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={addCatexiaPos}>Añadir</button>
              </div>
            </section>
            <section className={styles['form-section']}>
              <h2>🔴 Catexias Negativas</h2>
              {catexiasNeg.map((cat, idx) => (
                <div className={styles['catexia-item']} key={idx}>
                  <strong>{cat.texto}</strong>
                  <button type="button" className={`${styles.btn} ${styles['btn-danger']}`} style={{ float: 'right' }} onClick={() => removeCatexiaNeg(idx)}>
                    Eliminar
                  </button>
                  <div style={{ fontSize: "12px", color: "#a9b6d3" }}>{cat.motivo}</div>
                </div>
              ))}
              <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                <input type="text" value={newCatNeg.texto} onChange={e => setNewCatNeg({ ...newCatNeg, texto: e.target.value })} placeholder="Texto de la catexia" />
                <input type="text" value={newCatNeg.motivo} onChange={e => setNewCatNeg({ ...newCatNeg, motivo: e.target.value })} placeholder="Motivo u observación" />
                <button type="button" className={`${styles.btn} ${styles['btn-primary']}`} onClick={addCatexiaNeg}>Añadir</button>
              </div>
            </section>
          </div>
          <section className={styles['form-section']}>
            <h2>Asociaciones y Recuerdo</h2>
            <div className={styles['form-group']}>
              <label htmlFor="asociaciones">Asociaciones espontáneas</label>
              <textarea id="asociaciones" name="asociaciones" rows={3} placeholder="Asociaciones libres, comentarios espontáneos durante o después de la aplicación..." value={form.asociaciones} onChange={handleFormChange} />
            </div>
            <div className={styles['form-group']}>
              <label htmlFor="recuerdo">Recuerdo positivo</label>
              <textarea id="recuerdo" name="recuerdo" rows={2} placeholder="Recuerdo positivo solicitado al finalizar..." value={form.recuerdo} onChange={handleFormChange} />
            </div>
          </section>
          <section className={styles['form-actions']}>
            <button type="button" id="limpiar" className={`${styles.btn} ${styles['btn-secondary']}`} onClick={handleLimpiar}>
              Limpiar formulario
            </button>
            <button type="submit" id="analizar" className={`${styles.btn} ${styles['btn-primary']}`}>
              Analizar protocolo
            </button>
          </section>
        </form>
        <section id="result-section" className={styles['result-section']} style={{ display: mostrarResultado ? 'block' : 'none' }}>
          <div className={styles['result-header']}>
            <h2>Informe de Análisis</h2>
            <button type="button" id="guardar-imprimir" className={`${styles.btn} ${styles['btn-success']}`} onClick={() => window.print()}>
              Guardar / Imprimir
            </button>
          </div>
          <textarea id="result-text" ref={resultRef} className="result-textarea" readOnly value={resultado}></textarea>
        </section>
      </main>
      <footer className={styles['app-footer']} aria-hidden="true"></footer>
    </div>
  );
}
