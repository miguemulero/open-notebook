import React, { useState, useEffect } from "react";

// Puedes editar este array según los fileIds de tu bibliografía real
const BIBLIOGRAFIA = [
 { id: "files/analisis_de_las_respuestas_al_cuestionar", nombre: "ANaLISIS_DE_LAS_RESPUESTAS_AL_CUESTIONAR.pdf" },
  { id: "files/caso_jade", nombre: "CASO JADE.pdf" },
  { id: "files/casos", nombre: "CASOS.pdf" },
  { id: "files/cd_diana", nombre: "CD DIANA.pdf" },
  { id: "files/cd_graciela_celener", nombre: "CD Graciela Celener.pdf" },
  { id: "files/cd_pulsiones_y_defensas_en_patologías_desvalimiento", nombre: "CD pulsiones y defensas en patologías desvalimiento.pdf" },
  { id: "files/cuadro_proye_-_catexias_positivas_y_negativas", nombre: "Cuadro proye - Catexias positivas y negativas.pdf" },
  { id: "files/cuestionario_desiderativo_aplicado_a_niños2", nombre: "Cuestionario desiderativo aplicado a niños2.pdf" },
  { id: "files/cuestionario_desiderativo-sneiderman3", nombre: "Cuestionario desiderativo-Sneiderman3.pdf" },
  { id: "files/indicadores-psicopatologicos_-_cd", nombre: "Indicadores-Psicopatologicos - CD.pdf" },
  { id: "files/o_questionario_desiderativo_fundamentos", nombre: "O_questionario_desiderativo_fundamentos.pdf" },
  { id: "files/ocampo_arzeno", nombre: "Ocampo Arzeno.pdf" },
  { id: "files/preconsciente_y_su_relación_con_el_lenguaje", nombre: "Preconsciente y su relación con el lenguaje.pdf" },
  { id: "files/psicodiagnostico_clinico_93-117", nombre: "Psicodiagnostico Clinico 93-117.pdf" },
  { id: "files/sneiderman_2011-cuestionario", nombre: "Sneiderman_2011-Cuestionario.pdf" },
  { id: "files/teorÍa,_tÉcnica_y_aplicaciÓn", nombre: "TEORÍA, TÉCNICA Y APLICACIÓN.pdf" },
  { id: "files/una_contribución_a_la_interpretación_del_cuestionario_desiderativo", nombre: "Una contribución a la interpretación del Cuestionario Desiderativo.pdf" },
  { id: "files/vinculo_hostil", nombre: "Vinculo hostil.pdf" },
  { id: "files/bullying", nombre: "bullying.pdf" },
  { id: "files/criterios_de_interpretación", nombre: "criterios de interpretación.pdf" },
  { id: "files/niños_latentes", nombre: "niños latentes.pdf" },
];

export default function FormularioDesiderativo() {
  // Estado para los campos principales del protocolo
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [catexiasPos, setCatexiasPos] = useState([]);
  const [catexiasNeg, setCatexiasNeg] = useState([]);
  const [textoCatPos, setTextoCatPos] = useState("");
  const [motivoCatPos, setMotivoCatPos] = useState("");
  const [textoCatNeg, setTextoCatNeg] = useState("");
  const [motivoCatNeg, setMotivoCatNeg] = useState("");
  const [fileIds, setFileIds] = useState([]);
  const [informe, setInforme] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  // Función para añadir catexia positiva
  const agregarCatexiaPos = () => {
    if (textoCatPos.trim() && motivoCatPos.trim()) {
      setCatexiasPos([...catexiasPos, { texto: textoCatPos.trim(), motivo: motivoCatPos.trim() }]);
      setTextoCatPos(""); setMotivoCatPos("");
    }
  };

  // Función para añadir catexia negativa
  const agregarCatexiaNeg = () => {
    if (textoCatNeg.trim() && motivoCatNeg.trim()) {
      setCatexiasNeg([...catexiasNeg, { texto: textoCatNeg.trim(), motivo: motivoCatNeg.trim() }]);
      setTextoCatNeg(""); setMotivoCatNeg("");
    }
  };

  // Eliminar catexias por índice
  const eliminarCatexiaPos = idx => setCatexiasPos(catexiasPos.filter((c, i) => i !== idx));
  const eliminarCatexiaNeg = idx => setCatexiasNeg(catexiasNeg.filter((c, i) => i !== idx));

  // Función principal para analizar (enviar al backend)
  const analizarProtocolo = async () => {
    setCargando(true); setInforme(""); setError("");
    try {
      const payload = {
        datos: { nombre, edad },
        catexiasPos,
        catexiasNeg,
        fileIds,
      };

      // Cambia la URL si tu backend está en otro puerto/host
      const resp = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error("Error en backend");
      const data = await resp.json();
      setInforme(data.informe || "No se recibió informe");
    } catch (err) {
      setError("Error al generar informe: " + err.message);
    } finally {
      setCargando(false);
    }
  };

  // Vista realista del formulario
  return (
    <div style={{ maxWidth: 800, margin: "auto" }}>
      <h2>Protocolo Desiderativo</h2>
      <div>
        <label>Nombre: <input value={nombre} onChange={e => setNombre(e.target.value)} /></label>
        <label>Edad: <input type="number" value={edad} onChange={e => setEdad(e.target.value)} /></label>
      </div>

      <h3>Catexias Positivas</h3>
      <ul>
        {catexiasPos.map((cat, i) =>
          <li key={i}>{cat.texto} ({cat.motivo}) <button onClick={() => eliminarCatexiaPos(i)}>Eliminar</button></li>
        )}
      </ul>
      <input
        placeholder="Texto catexia positiva"
        value={textoCatPos}
        onChange={e => setTextoCatPos(e.target.value)}
      />
      <input
        placeholder="Motivo"
        value={motivoCatPos}
        onChange={e => setMotivoCatPos(e.target.value)}
      />
      <button onClick={agregarCatexiaPos}>Añadir</button>

      <h3>Catexias Negativas</h3>
      <ul>
        {catexiasNeg.map((cat, i) =>
          <li key={i}>{cat.texto} ({cat.motivo}) <button onClick={() => eliminarCatexiaNeg(i)}>Eliminar</button></li>
        )}
      </ul>
      <input
        placeholder="Texto catexia negativa"
        value={textoCatNeg}
        onChange={e => setTextoCatNeg(e.target.value)}
      />
      <input
        placeholder="Motivo"
        value={motivoCatNeg}
        onChange={e => setMotivoCatNeg(e.target.value)}
      />
      <button onClick={agregarCatexiaNeg}>Añadir</button>

      <h3>Bibliografía a usar</h3>
      <div>
        {BIBLIOGRAFIA.map(bib =>
          <label key={bib.id} style={{ display: "block" }}>
            <input
              type="checkbox"
              checked={fileIds.includes(bib.id)}
              onChange={e => {
                if (e.target.checked) setFileIds([...fileIds, bib.id]);
                else setFileIds(fileIds.filter(fid => fid !== bib.id));
              }}
            />
            {bib.nombre}
          </label>
        )}
      </div>

      <button onClick={analizarProtocolo} disabled={cargando}>
        {cargando ? "Analizando..." : "Analizar"}
      </button>

      {error && <div style={{ color: "red", margin: "1em 0" }}>{error}</div>}

      <h3>Informe generado</h3>
      <textarea
        value={informe}
        readOnly
        rows={18}
        style={{ width: "100%", whiteSpace: "pre-wrap" }}
      />
    </div>
  );
}
