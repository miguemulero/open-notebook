from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any
import PyPDF2
import os

from api.bibliografia_map import FILEID_MAP

app = FastAPI()

# CORS (permite que el frontend acceda a este backend si están en dominios distintos)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Cambia esto en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de entrada
class Catexia(BaseModel):
    texto: str
    motivo: str

class AnalisisRequest(BaseModel):
    datos: Dict[str, Any]  # Datos generales del protocolo (nombre, edad, etc.)
    catexiasPos: List[Catexia]
    catexiasNeg: List[Catexia]
    fileIds: List[str]

def extract_text_from_pdf(pdf_path: str) -> str:
    if not os.path.isfile(pdf_path):
        return f"[No encontrado: {pdf_path}]\n"
    with open(pdf_path, "rb") as f:
        try:
            reader = PyPDF2.PdfReader(f)
            texts = []
            for page in reader.pages:
                t = page.extract_text()
                if t:
                    texts.append(t)
            return "\n".join(texts)
        except Exception as e:
            return f"[Error leyendo {pdf_path}: {e}]"

@app.post("/analyze")
def analyze_protocolo(payload: AnalisisRequest):
    # 1. Extrae los textos de la bibliografía usando los fileIDs recibidos
    textos_bibliografia = []
    for fileid in payload.fileIds:
        pdf_path = FILEID_MAP.get(fileid)
        if pdf_path:
            textos_bibliografia.append(extract_text_from_pdf(pdf_path))
        else:
            textos_bibliografia.append(f"[No existe mapeo para {fileid}]")
    texto_bibliografia = "\n\n---\n\n".join(textos_bibliografia)

    # 2. Construye el prompt para la IA (o el informe, si no llamas IA aún)
    datos = payload.datos
    catexias_pos = "\n".join([f"• {c.texto} ({c.motivo})" for c in payload.catexiasPos])
    catexias_neg = "\n".join([f"• {c.texto} ({c.motivo})" for c in payload.catexiasNeg])

    prompt = (
        f"Analizar protocolo DESIDERATIVO según bibliografía adjunta."
        f"\n\nDATOS:\n{datos}\n\n"
        f"Catexias positivas:\n{catexias_pos}\n\n"
        f"Catexias negativas:\n{catexias_neg}\n\n"
        f"BIBLIOGRAFÍA (extractos):\n{texto_bibliografia}\n\n"
        f"Genera informe con secciones clínicas, títulos forzados y fundamenta las interpretaciones."
    )
    
    # 3. Aquí llamarías a la IA (Gemini, OpenAI, LLama…) usando `prompt` y recibes el informe:

    # --- Ejemplo de demo para testing (SUSTITUYE por llamada real a la IA) ---
    informe = (
        "INFORME IA (demo)\n"
        "=================\n"
        f"{prompt[:2500]}..."  # Solo muestra inicio por si el prompt es muy largo
    )

    return {
        "informe": informe
    }
