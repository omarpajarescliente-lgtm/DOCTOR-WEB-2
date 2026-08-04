import { useState, useRef, useEffect } from 'react';
import { 
  X, Send, User, MessageCircle, 
  ShieldCheck, RefreshCw, Stethoscope, HeartPulse
} from 'lucide-react';
import { getWhatsappLink } from '../config';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  isSummary?: boolean;
}

interface AiTriageModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTopic?: string;
}

export default function AiTriageModal({ isOpen, onClose, initialTopic }: AiTriageModalProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: '¡Hola! Soy Lucía, del equipo del Dr. Omar Pajares (Fisiatra).\n\n¿En qué parte te duele, qué edad tienes y desde cuándo sientes la molestia?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [patientData, setPatientData] = useState({
    zona: '',
    tiempo: '',
    tieneExamenes: '',
    candidato: 'Evaluando...'
  });

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  // Handle initial topic if provided
  useEffect(() => {
    if (isOpen && initialTopic && messages.length === 1) {
      handleSendMessage(initialTopic);
    }
  }, [isOpen, initialTopic]);

  if (!isOpen) return null;

  const quickPrompts = [
    { label: '🦵 Dolor de Rodilla / Artrosis', query: 'Tengo dolor en la rodilla y desgaste de cartílago.' },
    { label: '🦴 Hernia Discal / Columna', query: 'Tengo dolor de espalda baja y hernia discal lumbar con ciática.' },
    { label: '📄 ¿No tengo resonancia ni placas?', query: 'Aún no tengo resonancia ni placas de radiografía, ¿puedo atenderme igual?' },
    { label: '💰 ¿Cuánto cuesta la consulta?', query: '¿Cuál es el costo de la consulta médica y qué incluye?' },
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputMessage.trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputMessage('');
    setIsLoading(true);

    // Extract quick structured data heuristics for summary
    const textLower = text.toLowerCase();
    setPatientData((prev) => {
      let updated = { ...prev };
      if (!prev.zona) {
        if (textLower.includes('rodilla')) updated.zona = 'Rodilla';
        else if (textLower.includes('columna') || textLower.includes('hernia') || textLower.includes('espalda') || textLower.includes('ciatica')) updated.zona = 'Columna / Hernia Discal';
        else if (textLower.includes('cadera')) updated.zona = 'Cadera';
        else if (textLower.includes('hombro')) updated.zona = 'Hombro';
        else updated.zona = 'Articulación / Músculo';
      }
      if (textLower.includes('no') && (textLower.includes('tengo') || textLower.includes('resonancia') || textLower.includes('placa') || textLower.includes('examen'))) {
        updated.tieneExamenes = 'Pendiente (Ecografía in situ incluida en consulta)';
      } else if (textLower.includes('si') && (textLower.includes('tengo') || textLower.includes('resonancia') || textLower.includes('placa'))) {
        updated.tieneExamenes = 'Sí (Cuenta con placas o resonancia)';
      }
      return updated;
    });

    try {
      // Call backend triage endpoint
      const response = await fetch('/api/gemini/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map((m) => ({ role: m.role, content: m.content })),
          userMessage: text,
        }),
      });

      let replyText = '';
      try {
        const rawText = await response.text();
        try {
          const data = JSON.parse(rawText);
          replyText = data.reply || data.error;
        } catch {
          replyText = `⚠️ Error del servidor Vercel (${response.status}): ${rawText.slice(0, 150)}`;
        }
      } catch (readErr: any) {
        replyText = `⚠️ No se pudo leer la respuesta del servidor (${readErr?.message || response.status}).`;
      }

      if (!replyText) {
        replyText = `⚠️ El servidor devolvió respuesta vacía (HTTP ${response.status}).`;
      }

      // Simular tiempo de tecleo humano natural (1.5s a 2.5s según la longitud)
      const typingDelay = Math.min(2800, Math.max(1500, replyText.length * 20));
      await new Promise((resolve) => setTimeout(resolve, typingDelay));

      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Error in triage chat:', err);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `⚠️ Error de red/conexión: ${err?.message || 'No se pudo conectar con el servidor de la IA'}.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome_reset',
        role: 'assistant',
        content: '¡Conversación reiniciada! Hola, soy Lucía, del consultorio del Dr. Omar Pajares. ¿En qué parte te duele y qué edad tienes?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setPatientData({
      zona: '',
      tiempo: '',
      tieneExamenes: '',
      candidato: 'Evaluando...'
    });
  };

  // Generate WhatsApp message with pre-evaluation details
  const buildWhatsappSummaryText = () => {
    const historyText = messages
      .filter((m) => m.role === 'user')
      .map((m) => `- ${m.content}`)
      .join('\n');

    return `Hola Dr. Omar Pajares, completé la consulta previa en su página web:
📌 *Resumen de Orientación*:
${historyText || '- Evaluación inicial de dolor articular'}
${patientData.zona ? `📍 *Zona principal*: ${patientData.zona}` : ''}
${patientData.tieneExamenes ? `📄 *Exámenes disponibles*: ${patientData.tieneExamenes}` : ''}

Deseo agendar mi consulta médica presencial de S/ 200 (con ecografía in situ) en la sede de Jesús María.`;
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-slate-900/75 backdrop-blur-md animate-fade-in">
      <div className="relative flex flex-col w-full max-w-2xl h-[92vh] max-h-[720px] bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-[#02111c] text-white shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00c3e6] text-[#02111c] font-black shadow-inner">
              <Stethoscope className="h-6 w-6" />
              <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-[#02111c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif font-bold text-base sm:text-lg text-white tracking-wide">
                  Orientación Médica Previa
                </h3>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#00c3e6]/20 text-[#00c3e6] border border-[#00c3e6]/30">
                  Lic. Lucía • Asistente Médica
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Dr. Omar Pajares • Fisiatra — Especialista Regenerativo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              title="Reiniciar conversación"
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Notice Banner */}
        <div className="bg-cyan-50/90 border-b border-cyan-100 px-4 py-2 text-[11px] text-cyan-900 flex items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-[#00a8ca] shrink-0" />
            <span>
              <strong>Consulta S/ 200:</strong> Incluye evaluación completa con ecografía articular in situ en Jesús María, Lima.
            </span>
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl font-bold text-xs shadow-sm ${
                  msg.role === 'user'
                    ? 'bg-[#02111c] text-white'
                    : 'bg-[#00c3e6] text-[#02111c]'
                }`}
              >
                {msg.role === 'user' ? <User className="h-4 w-4" /> : <HeartPulse className="h-4 w-4" />}
              </div>

              {/* Message Content Bubble */}
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-[#02111c] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line font-normal">{msg.content}</div>
                
                <div
                  className={`mt-1.5 text-[10px] ${
                    msg.role === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                  }`}
                >
                  {msg.timestamp}
                </div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isLoading && (
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#00c3e6] text-[#02111c] shadow-sm">
                <HeartPulse className="h-4 w-4 animate-pulse" />
              </div>
              <div className="bg-white border border-slate-100 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm text-xs text-slate-500 flex items-center gap-2">
                <div className="flex gap-1">
                  <span className="h-2 w-2 rounded-full bg-[#00c3e6] animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-[#00c3e6] animate-pulse [animation-delay:0.2s]" />
                  <span className="h-2 w-2 rounded-full bg-[#00c3e6] animate-pulse [animation-delay:0.4s]" />
                </div>
                <span>Escribiendo respuesta...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Pills */}
        <div className="bg-white px-4 py-2 border-t border-slate-100 shrink-0">
          <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-1.5">
            Preguntas habituales:
          </p>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(p.query)}
                disabled={isLoading}
                className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-cyan-50 hover:text-[#00a8ca] hover:border-cyan-200 border border-transparent text-xs font-medium text-slate-700 transition-all cursor-pointer disabled:opacity-50"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Clinical Callout & WhatsApp CTA */}
        <div className="bg-slate-900 text-white px-4 py-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-200 text-center sm:text-left">
            <span className="text-[11px] leading-tight block">
              💡 <strong>Sin perder tiempo ni dinero:</strong> La consulta de <strong>S/ 200</strong> ya incluye ecografía in situ.
            </span>
          </div>

          <a
            href={getWhatsappLink(buildWhatsappSummaryText())}
            target="_blank"
            rel="noopener noreferrer"
            data-skip-filter="true"
            className="w-full sm:w-auto shrink-0 flex items-center justify-center gap-2 bg-[#25d366] hover:bg-[#20ba5a] text-white text-xs font-black px-4 py-2.5 rounded-xl shadow-lg transition-transform hover:scale-105 uppercase tracking-wider whitespace-nowrap"
          >
            <MessageCircle className="h-4 w-4 fill-current" />
            <span>AGENDAR CITA POR WHATSAPP</span>
          </a>
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-100 shrink-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Escribe tu consulta o dolor aquí..."
              disabled={isLoading}
              className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:border-[#00c3e6] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00c3e6]/20 transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim() || isLoading}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00c3e6] text-white hover:bg-[#02111c] disabled:opacity-40 disabled:hover:bg-[#00c3e6] transition-colors shadow-md shrink-0 cursor-pointer"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
