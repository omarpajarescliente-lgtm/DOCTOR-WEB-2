var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// server.ts
var server_exports = {};
__export(server_exports, {
  default: () => server_default
});
module.exports = __toCommonJS(server_exports);

// api/index.ts
var import_express = __toESM(require("express"), 1);
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
var app = (0, import_express.default)();
app.use(import_express.default.json());
var SYSTEM_INSTRUCTION = `Eres Luc\xEDa, la recepcionista y asistente del consultorio del Dr. Omar Pajares (M\xE9dico Fisiatra, Jes\xFAs Mar\xEDa, Lima).

TONO Y PERSONALIDAD (100% HUMANA, PERUANA, CORTA Y DIRECTA):
- Hablas exactamente como una recepcionista real de consultorio m\xE9dico por WhatsApp en Lima: amable, pr\xE1ctica, atenta y directa al grano.
- PROHIBIDO usar falsa empat\xEDa dram\xE1tica de IA (NUNCA digas: "Lamento que...", "Siento mucho que est\xE9s pasando por eso", "Debe ser pesado para ti", "Es una l\xE1stima").
- PROHIBIDO usar lenguaje rob\xF3tico o rebuscado (NUNCA digas: "Estimado paciente", "Ciertamente", "Comprendo perfectamente", "En relaci\xF3n a tu consulta").
- Respuestas CORTAS (1 a 2 oraciones sencillas por mensaje, estilo WhatsApp real).

REGLAS DE SEGURIDAD Y FILTROS ESTRICTOS (MANDATORIO):
1. NUNCA INVENTAR O CONFIRMAR CITAS NI HORARIOS: T\xFA NO tienes acceso a la agenda en vivo ni ves los turnos libres del doctor. NUNCA digas "d\xE9jame revisar la agenda", "mientras me carga el sistema", "te separo el turno" ni confirmes horarios.
   - Si el usuario pide agendar, reservar o pregunta por horarios disponibles, responde DIRECTAMENTE: "Para revisar la agenda en tiempo real y separar tu turno, por favor presiona el bot\xF3n verde de WhatsApp de abajo para escribirle directamente a la enfermera de recepci\xF3n".
2. LO QUE NO SEPAS O SEA MUY T\xC9CNICO, DIR\xCDGELO A WHATSAPP: Si no sabes un dato espec\xEDfico o te hacen una pregunta m\xE9dica t\xE9cnica/compleja, NO inventes ni supongas nada. Di con naturalidad: "Ese detalle lo coordina directamente la enfermera por WhatsApp o el doctor en la consulta. Puedes escribirle a la enfermera tocando el bot\xF3n verde de WhatsApp de abajo".
3. PRIVACIDAD Y SEGURIDAD DE DATOS: NUNCA des datos personales privados del Dr. Omar (tel\xE9fono personal, DNI, correo personal, direcci\xF3n particular). Solo la direcci\xF3n oficial del consultorio: Av. Gregorio Escobedo 788, Of. 304, Jes\xFAs Mar\xEDa, Lima.
4. NO RECETAR NI DIAGNOSTICAR: La evaluaci\xF3n formal se realiza en consulta presencial con ecograf\xEDa articular in situ por S/ 200.

OBJETIVO Y ORIENTACI\xD3N SUTIL A LA CONSULTA:
- Averiguar progresivamente: 1) Zona del dolor y tiempo, 2) Si tiene ecograf\xEDa/placas previas.
- Orientar sutilmente hacia la consulta presencial de S/ 200 (que YA INCLUYE la evaluaci\xF3n con ecograf\xEDa articular in situ en el consultorio de Jes\xFAs Mar\xEDa) envi\xE1ndolo a agendar v\xEDa el bot\xF3n de WhatsApp.`;
app.post(["/api/gemini/triage", "/gemini/triage", "/api", "/"], async (req, res) => {
  try {
    const { messages, userMessage } = req.body || {};
    if (!userMessage || typeof userMessage !== "string") {
      return res.status(400).json({ reply: "Mensaje no v\xE1lido" });
    }
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || !apiKey.trim()) {
      return res.status(200).json({
        reply: "\u26A0\uFE0F No se ha detectado GEMINI_API_KEY en Vercel. Por favor, aseg\xFArate de haber agregado GEMINI_API_KEY en Vercel -> Settings -> Environment Variables y haber hecho Redeploy.",
        isAiPowered: false
      });
    }
    const ai = new import_genai.GoogleGenAI({
      apiKey: apiKey.trim()
    });
    const formattedHistory = Array.isArray(messages) ? messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }]
    })) : [];
    const contents = [
      ...formattedHistory,
      { role: "user", parts: [{ text: userMessage }] }
    ];
    const modelsToTry = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-flash-latest", "gemini-2.0-flash-lite"];
    let responseText = "";
    let lastError = null;
    for (const modelName of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.4
          }
        });
        if (response?.text) {
          responseText = response.text;
          break;
        }
      } catch (err) {
        lastError = err;
        console.error(`Error al llamar a Gemini con modelo ${modelName}:`, err);
      }
    }
    if (responseText) {
      return res.json({
        reply: responseText,
        isAiPowered: true
      });
    } else {
      const errMsg = lastError?.message || String(lastError || "Sin respuesta");
      return res.status(200).json({
        reply: `\u26A0\uFE0F La API de Gemini devolvi\xF3 un error: "${errMsg}". Verifica en Google AI Studio que la API Key est\xE9 activa.`,
        isAiPowered: false
      });
    }
  } catch (error) {
    console.error("Error en /api/gemini/triage:", error);
    return res.status(200).json({
      reply: `\u26A0\uFE0F Error en el servidor Vercel: ${error?.message || String(error)}`,
      isAiPowered: false
    });
  }
});
app.get(["/api/health", "/health"], (req, res) => {
  res.json({ status: "ok", doctor: "Dr. Omar Pajares" });
});
var api_default = app;

// server.ts
var import_path = __toESM(require("path"), 1);
var import_express2 = __toESM(require("express"), 1);
var import_vite = require("vite");
var PORT = 3e3;
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    api_default.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    api_default.use(import_express2.default.static(distPath));
    api_default.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  api_default.listen(PORT, "0.0.0.0", () => {
    console.log(`Servidor del Dr. Omar Pajares corriendo en http://localhost:${PORT}`);
  });
}
if (!process.env.VERCEL) {
  startServer();
}
var server_default = api_default;
//# sourceMappingURL=server.cjs.map
