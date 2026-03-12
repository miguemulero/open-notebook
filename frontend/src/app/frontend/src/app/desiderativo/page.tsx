'use client';

import React, { useState, useRef } from 'react';
import styles from './Desiderativo.module.css';

type Catexia = { texto: string; motivo: string };

export default function DesiderativoPage() {
  // Estados para el formulario principal
  const [form, setForm] = useState({
    nombre: '',
    edad: '',
    genero: '',
    nivel_educativo: '',
    fecha: '',
    modalidad: 'estandar',
    informacion: '',
    asociaciones: '',
    recuerdo: '',
  });

  // Estados para catexias y los campos temporales de nueva catexia
  const [catexiasPos, setCatexiasPos] = useState<Catexia[]>([]);
  const [catexiasNeg, setCatexiasNeg] = useState<Catexia[]>([]);
  const [newCatPos, setNewCatPos] = useState<Catexia>({ texto: '', motivo: '' });
  const [newCatNeg, setNewCatNeg] = useState<Catexia>({ texto: '', motivo: '' });

  // Estado resultado informe y visibilidad
  const [resultado, setResultado] = useState('');
  const [mostrarResultado, setMostrarResultado] = useState(false);

  // Para scroll al resultado tras analizar
  const resultRef = useRef<HTMLTextAreaElement>(null);

  function handleFormChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Lógica para catexias positivas
  function addCatexiaPos() {
    if (newCatPos.texto.trim()) {
      setCatexiasPos([...catexiasPos, newCatPos]);
      setNewCatPos({ texto: '', motivo: '' });
    }
  }
  function removeCatexiaPos(idx: number) {
    setCatexiasPos(catexiasPos.filter((_, i) => i !== idx));
  }

  // Lógica para catexias negativas
  function addCatexiaNeg() {
    if (newCatNeg.texto.trim()) {
      setCatexiasNeg([...catexiasNeg, newCatNeg]);
      setNewCatNeg({ texto: '', motivo: '' });
    }
  }
  function removeCatexiaNeg(idx: number) {
    setCatexiasNeg(catexiasNeg.filter((_, i) => i !== idx));
  }

  // Limpiar todo
  function handleLimpiar() {
    setForm({
      nombre: '',
      edad: '',
      genero: '',
      nivel_educativo: '',
      fecha: '',
      modalidad: 'estandar',
      informacion: '',
      asociaciones: '',
      recuerdo: '',
    });
    setCatexiasPos([]);
    setCatexiasNeg([]);
    setNewCatPos({ texto: '', motivo: '' });
    setNewCatNeg({ texto: '', motivo: '' });
    setResultado('');
    setMostrarResultado(false);
  }

  // Analizar protocolo
  function handleAnalizar(e: React.FormEvent) {
    e.preventDefault();
    // Arma aquí el informe con todos los datos y catexias (aquí solo demo)
    const informe = [
      `INFORME DE PRUEBA (rellena campos y catexias reales)`,
      `---`,
      `Nombre/ID: ${form.nombre}`,
      `Edad: ${form.edad}`,
      `Sexo: ${form.genero}`,
      `Nivel educativo: ${form.nivel_educativo}`,
      `Fecha de aplicación: ${form.fecha}`,
      `Modalidad: ${form.modalidad}`,
      '',
      `Información contextual: ${form.informacion || '(ninguna)'}`,
      '',
      `🟢 Catexias Positivas:`,
      ...catexiasPos.map((cat, i) => `${i + 1}. ${cat.texto} - ${cat.motivo}`),
      '',
      `🔴 Catexias Negativas:`,
      ...catexiasNeg.map((cat, i) => `${i + 1}. ${cat.texto} - ${cat.motivo}`),
      '',
      `Asociaciones espontáneas: ${form.asociaciones || '(ninguna)'}`,
      `Recuerdo positivo: ${form.recuerdo || '(ninguno)'}`,
    ].join('\n');

    setResultado(informe);
    setMostrarResultado(true);
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
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
