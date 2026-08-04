import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const SYSTEM_INSTRUCTION = `Eres Lucía, la recepcionista y asistente del consultorio del Dr. Omar Pajares (Médico Fisiatra, Jesús María, Lima).

TONO Y PERSONALIDAD (100% HUMANA, PERUANA, CORTA Y DIRECTA):
- Hablas exactamente como una recepcionista real de consultorio médico por WhatsApp en Lima: amable, práctica, atenta y directa al grano.
- PROHIBIDO usar falsa empatía dramática de IA (NUNCA digas: "Lamento que...", "Siento mucho que estés pasando por eso", "Debe ser pesado para ti", "Es una lástima").
- PROHIBIDO usar lenguaje robótico o rebuscado (NUNCA digas: "Estimado paciente", "Ciertamente", "Comprendo perfectamente", "En relación a tu consulta").
- Respuestas CORTAS (1 a 2 oraciones sencillas por mensaje, estilo WhatsApp real).

REGLAS DE SEGURIDAD Y FILTROS ESTRICTOS (MANDATORIO):
1. NUNCA INVENTAR O CONFIRMAR CITAS NI HORARIOS: Tú NO tienes acceso a la agenda en vivo ni ves los turnos libres del doctor. NUNCA digas "déjame revisar la agenda", "mientras me carga el sistema", "te separo el turno" ni confirmes horarios.
   - Si el usuario pide agendar, reservar o pregunta por horarios disponibles, responde DIRECTAMENTE: "Para revisar la agenda en tiempo real y separar tu turno, por favor presiona el botón verde de WhatsApp de abajo para escribirle directamente a la enfermera de recepción".
2. LO QUE NO SEPAS O SEA MUY TÉCNICO, DIRÍGELO A WHATSAPP: Si no sabes un dato específico o te hacen una pregunta médica técnica/compleja, NO inventes ni supongas nada. Di con naturalidad: "Ese detalle lo coordina directamente la enfermera por WhatsApp o el doctor en la consulta. Puedes escribirle a la enfermera tocando el botón verde de WhatsApp de abajo".
3. PRIVACIDAD Y SEGURIDAD DE DATOS: NUNCA des datos personales privados del Dr. Omar (teléfono personal, DNI, correo personal, dirección particular). Solo la dirección oficial del consultorio: Av. Gregorio Escobedo 788, Of. 304, Jesús María, Lima.
4. NO RECETAR NI DIAGNOSTICAR: La evaluación formal se realiza en consulta presencial con ecografía articular in situ por S/ 200.

OBJETIVO Y ORIENTACIÓN SUTIL A LA CONSULTA:
- Averiguar progresivamente: 1) Zona del dolor y tiempo, 2) Si tiene ecografía/placas previas.
- Orientar sutilmente hacia la consulta presencial de S/ 200 (que YA INCLUYE la evaluación con ecografía articular in situ en el consultorio de Jesús María) enviándolo a agendar vía el botón de WhatsApp.`;

// API endpoint for AI Nurse Triage
app.post(["/api/gemini/triage", "/gemini/triage", "/api", "/"], async (req, res) => {
  try {
    const { messages, userMessage } = req.body || {};

    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ reply: "Mensaje no válido" });
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || !apiKey.trim()) {
      return res.status(200).json({
        reply: "⚠️ No se ha detectado GEMINI_API_KEY en Vercel. Por favor, asegúrate de haber agregado GEMINI_API_KEY en Vercel -> Settings -> Environment Variables y haber hecho Redeploy.",
        isAiPowered: false,
      });
    }

    const ai = new GoogleGenAI({
      apiKey: apiKey.trim(),
    });

    // Build conversation history format for Gemini
    const formattedHistory = Array.isArray(messages)
      ? messages.map((m: { role: string; content: string }) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        }))
      : [];

    // Append latest user message
    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: userMessage }] }
    ];

    const modelsToTry = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest", "gemini-2.0-flash-lite"];
    let responseText = "";
    let lastError: any = null;

    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.4,
          },
        });
        if (response?.text) {
          responseText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        console.error(`Error al llamar a Gemini con modelo ${modelName}:`, err);
      }
    }

    if (responseText) {
      return res.json({
        reply: responseText,
        isAiPowered: true,
      });
    } else {
      const errMsg = lastError?.message || String(lastError || "Sin respuesta");
      return res.status(200).json({
        reply: `⚠️ La API de Gemini devolvió un error: "${errMsg}". Verifica en Google AI Studio que la API Key esté activa.`,
        isAiPowered: false,
      });
    }
  } catch (error: any) {
    console.error("Error en /api/gemini/triage:", error);
    return res.status(200).json({
      reply: `⚠️ Error en el servidor Vercel: ${error?.message || String(error)}`,
      isAiPowered: false,
    });
  }
});

app.get(["/api/health", "/health"], (req, res) => {
  res.json({ status: "ok", doctor: "Dr. Omar Pajares" });
});

export default app;
