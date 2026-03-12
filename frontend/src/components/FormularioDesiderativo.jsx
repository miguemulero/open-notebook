import React, { useState, useEffect } from "react";

// Puedes editar este array según los fileIds de tu bibliografía real
const BIBLIOGRAFIA = [
  { id: "files/wsd4dpqu0915", nombre: "WSD4DPQ - Cuestionario desiderativo" },
  { id: "files/bullying", nombre: "Bullying y desiderativo" },
  { id: "files/casos", nombre: "Casos clínicos desiderativo" },
  // ...añade aquí todos tus fileIds y títulos
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
