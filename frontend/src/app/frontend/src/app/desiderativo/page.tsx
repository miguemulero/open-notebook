// ...otros imports
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

// Función para "forzar" título (negrita con markdown, o mayúsculas si prefieres)
function strong(title: string) {
  return `**${title}**`;
}

// ---- REEMPLAZA SOLO LA FUNCIÓN DE ANÁLISIS DEL COMPONENTE ----
function handleAnalizar(e: React.FormEvent) {
  e.preventDefault();

  // Datos del contexto
  const nPos = catexiasPos.length;
  const nNeg = catexiasNeg.length;
  const listadoPos = catexiasPos.map((cat, i) => `${i + 1}. ${cat.texto} (${cat.motivo})`).join('\n') || "_Sin reportar_";
  const listadoNeg = catexiasNeg.map((cat, i) => `${i + 1}. ${cat.texto} (${cat.motivo})`).join('\n') || "_Sin reportar_";

  // PROMPT ESTRUCTURADO COMO EN APP2:
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
// ---- FIN FUNCIÓN ----
