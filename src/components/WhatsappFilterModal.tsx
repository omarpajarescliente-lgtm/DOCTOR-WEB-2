import { useState, useMemo } from 'react';
import { X, MessageCircle, ShieldCheck, Stethoscope, Heart, Activity, ChevronRight, ChevronLeft, CheckCircle2, Clock } from 'lucide-react';
import { siteConfig, getWhatsappLink } from '../config';

interface WhatsappFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetMessage: string;
}

export default function WhatsappFilterModal({ isOpen, onClose, presetMessage }: WhatsappFilterModalProps) {
  // Step state for questionnaire inside popup: 0 to 5
  const [currentStep, setCurrentStep] = useState(0);

  // Form answers state
  const [answers, setAnswers] = useState({
    zona: '',
    tiempo: '',
    intensidad: '',
    previos: '',
    nombre: '',
    telefono: ''
  });

  // Check if presetMessage comes from an already finished form or specific treatment
  const isFromEvaluation = useMemo(() => {
    return presetMessage.includes('Completé la evaluación previa') || presetMessage.includes('Zona de dolor') || presetMessage.includes('Completé mi registro');
  }, [presetMessage]);

  if (!isOpen) return null;

  const questions = [
    {
      title: '1. ¿En qué zona sientes el dolor o molestia principal?',
      key: 'zona' as const,
      options: [
        'Rodilla (Artrosis / Meniscos Rotos)',
        'Hernia Discal Lumbar / Columna (Dolor Ciático)',
        'Cadera (Artrosis / Desgaste)',
        'Hombro / Codo / Tendinitis',
        'Fascitis Plantar / Tobillo',
        'Otra articulación / Múltiples zonas'
      ]
    },
    {
      title: '2. ¿Hace cuánto tiempo presentas esta molestia?',
      key: 'tiempo' as const,
      options: [
        'Menos de 1 mes',
        '1 a 6 meses',
        '6 meses a 1 año',
        'Más de 1 año'
      ]
    },
    {
      title: '3. ¿Qué intensidad tiene tu dolor en escala de 1 a 10?',
      key: 'intensidad' as const,
      options: [
        'Leve (1 a 3)',
        'Moderado (4 a 6)',
        'Fuerte (7 a 8)',
        'Muy fuerte (9 a 10)'
      ]
    },
    {
      title: '4. ¿Has recibido tratamientos o infiltraciones previas?',
      key: 'previos' as const,
      options: [
        'No, es mi primera atención',
        'Sí, terapia física / medicamentos',
        'Sí, infiltraciones ecoguiadas',
        'Sí, cirugía o prótesis'
      ]
    }
  ];

  const totalSteps = isFromEvaluation ? 1 : questions.length + 2; // 4 questions + patient data + final summary = 6 steps

  const handleSelectOption = (key: 'zona' | 'tiempo' | 'intensidad' | 'previos', value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
    // Automatically transition to the next step after a short delay
    setTimeout(() => {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
    }, 220);
  };

  const handleOpenWhatsApp = (customMsg?: string) => {
    let msg = customMsg;
    if (!msg) {
      if (answers.zona || answers.nombre) {
        msg = `Hola Dr. Omar Pajares, me comunico desde la página web para solicitar mi consulta médica presencial.
Mis datos de evaluación previa:
• Nombre: ${answers.nombre || '(por indicar)'}
• Teléfono: ${answers.telefono || '(por indicar)'}
• Zona de molestia: ${answers.zona || '(por indicar)'}
• Tiempo con dolor: ${answers.tiempo || '(por indicar)'}
• Intensidad de dolor: ${answers.intensidad || '(por indicar)'}
• Tratamientos previos: ${answers.previos || '(por indicar)'}

Deseo coordinar fecha y hora para mi atención. ¡Gracias!`;
      } else {
        msg = presetMessage || "Hola Dr. Omar Pajares, me comunico desde la página web para solicitar información sobre sus consultas y agendar mi cita.";
      }
    }

    const url = getWhatsappLink(msg);
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  const resetAndClose = () => {
    setCurrentStep(0);
    setAnswers({
      zona: '',
      tiempo: '',
      intensidad: '',
      previos: '',
      nombre: '',
      telefono: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/65 backdrop-blur-sm animate-fade-in"
        onClick={resetAndClose}
      />

      {/* Modal Container */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl border border-slate-100 animate-scale-in flex flex-col max-h-[90vh]">
        
        {/* Header decoration */}
        <div className="bg-[#02111c] px-6 py-4.5 text-white flex items-center justify-between border-b border-cyan-900/50">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#00c3e6] text-[#02111c]">
              <Stethoscope className="h-4.5 w-4.5" />
            </span>
            <div>
              <h3 className="font-serif text-base font-bold text-white">Reserva de Cita Médica</h3>
              <p className="text-[10px] text-[#00c3e6] font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00c3e6] animate-pulse"></span>
                Dr. Omar Pajares — Canal Oficial
              </p>
            </div>
          </div>
          <button 
            onClick={resetAndClose}
            className="rounded-lg p-1 text-slate-300 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
            aria-label="Cerrar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 text-sm text-left leading-relaxed text-slate-800">
          
          {/* Top Banner / Price Badge - Highlighted clearly for senior patients */}
          <div className="p-4 rounded-2xl border-2 border-emerald-500/80 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-black">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm sm:text-base">Consulta Médica Presencial</h4>
                <p className="text-xs sm:text-sm font-medium text-slate-700">Con evaluación ecoguiada in situ por Médico Fisiatra</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <span className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl font-black text-sm sm:text-base shadow-sm inline-block animate-pulse">
                S/ 200
              </span>
              <p className="text-[10px] font-bold text-emerald-800 uppercase mt-0.5">Atención Directa</p>
            </div>
          </div>

          {/* Response Time Notice Banner */}
          <div className="p-3 bg-amber-50 border border-amber-200/90 rounded-2xl flex items-start sm:items-center gap-2.5 text-xs text-amber-950 font-medium">
            <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5 sm:mt-0" />
            <span><strong>Aviso de respuesta:</strong> Las respuestas por WhatsApp pueden tomar entre <strong>10 a 15 minutos</strong> mientras el equipo atiende en consulta médica. ¡Agradecemos su paciencia!</span>
          </div>

          {/* If presetMessage comes from evaluation or external source */}
          {isFromEvaluation ? (
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-serif text-base font-black text-[#00243d] flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#00c3e6]" />
                  <span>Mensaje de Consulta Listo</span>
                </h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Tu mensaje para agendar la cita médica ha sido configurado. Haz clic en el botón inferior para abrir WhatsApp y contactar directamente a Recepción.
                </p>
              </div>
            </div>
          ) : (
            /* Multi-step Questionnaire inside Modal */
            <div className="space-y-4">
              
              {/* Progress Indicator */}
              {currentStep < questions.length ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800">
                    <span>Pregunta {currentStep + 1} de {questions.length}</span>
                    <span className="text-[#00a8ca] font-black">
                      {Math.round(((currentStep + 1) / questions.length) * 100)}%
                    </span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                    <div 
                      className="h-full bg-[#00c3e6] transition-all duration-300 ease-out"
                      style={{ width: `${Math.round(((currentStep + 1) / questions.length) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : currentStep === questions.length ? (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800">
                    <span>Paso 5: Datos del Paciente</span>
                    <span className="text-[#00a8ca] font-black">100%</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                    <div className="h-full bg-[#00c3e6] w-full" />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold text-slate-800">
                    <span>Paso Final: Ficha Lista</span>
                    <span className="text-emerald-600 font-black">✓ Completado</span>
                  </div>
                  <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden border border-slate-300">
                    <div className="h-full bg-emerald-500 w-full" />
                  </div>
                </div>
              )}

              {/* Steps 0 to 3: Multiple choice questions */}
              {currentStep < questions.length && (
                <div className="space-y-3 pt-1">
                  <h4 className="font-serif text-base sm:text-lg font-black text-[#00243d]">
                    {questions[currentStep].title}
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5">
                    {questions[currentStep].options.map((option, idx) => {
                      const isSel = answers[questions[currentStep].key] === option;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(questions[currentStep].key, option)}
                          className={`p-4 rounded-2xl border-2 text-left font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSel
                              ? 'border-[#00c3e6] bg-cyan-50 text-[#00243d] ring-2 ring-[#00c3e6]/30 shadow-md'
                              : 'border-slate-200 hover:border-[#00c3e6] hover:bg-slate-50 text-slate-800 bg-white'
                          }`}
                        >
                          <span className="text-sm font-bold">{option}</span>
                          <span className={`h-6 w-6 rounded-full border-2 flex items-center justify-center shrink-0 ${
                            isSel ? 'border-[#00c3e6] bg-[#00c3e6] text-white' : 'border-slate-300'
                          }`}>
                            {isSel ? <span className="text-xs font-black">✓</span> : null}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 4: Patient Name and Phone inputs */}
              {currentStep === questions.length && (
                <div className="space-y-4 pt-1">
                  <h4 className="font-serif text-base sm:text-lg font-black text-[#00243d]">
                    5. Datos del Paciente (para preparar tu ficha previa)
                  </h4>

                  <div className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                        Nombre Completo del Paciente
                      </label>
                      <input
                        type="text"
                        value={answers.nombre}
                        onChange={(e) => setAnswers(prev => ({ ...prev, nombre: e.target.value }))}
                        placeholder="Ej. Juan Carlos Mendoza"
                        className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 font-semibold placeholder-slate-400 outline-none focus:border-[#00a8ca]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 uppercase mb-1">
                        Teléfono / WhatsApp de Contacto
                      </label>
                      <input
                        type="text"
                        value={answers.telefono}
                        onChange={(e) => setAnswers(prev => ({ ...prev, telefono: e.target.value }))}
                        placeholder="Ej. 981 052 205"
                        className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 font-semibold placeholder-slate-400 outline-none focus:border-[#00a8ca]"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setCurrentStep(prev => prev + 1)}
                    className="w-full mt-2 py-3.5 bg-[#00243d] hover:bg-[#00385d] text-white rounded-xl font-extrabold text-sm tracking-wider uppercase transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <span>Ver Resumen y Finalizar</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              {/* Step 5: Final Summary */}
              {currentStep === totalSteps - 1 && (
                <div className="space-y-4 pt-1">
                  <div className="p-4 rounded-2xl bg-cyan-50 border-2 border-cyan-200 space-y-2.5">
                    <h4 className="font-serif text-sm font-black uppercase text-[#00385d] flex items-center gap-1.5">
                      <CheckCircle2 className="h-5 w-5 text-[#00a8ca]" />
                      <span>Ficha Previa Registrada</span>
                    </h4>
                    
                    <div className="text-xs sm:text-sm space-y-1.5 text-slate-800 font-semibold border-t border-cyan-100 pt-2.5">
                      <p>• <strong>Paciente:</strong> {answers.nombre || 'Sin especificar'}</p>
                      <p>• <strong>Teléfono:</strong> {answers.telefono || 'Sin especificar'}</p>
                      <p>• <strong>Zona:</strong> {answers.zona || 'General'}</p>
                      <p>• <strong>Tiempo:</strong> {answers.tiempo || 'Sin especificar'}</p>
                      <p>• <strong>Intensidad:</strong> {answers.intensidad || 'Sin especificar'}</p>
                      <p>• <strong>Antecedentes:</strong> {answers.previos || 'Sin especificar'}</p>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs sm:text-sm text-amber-900 font-medium leading-relaxed">
                    <strong>Nota importante:</strong> La respuesta y coordinación por WhatsApp puede tomar algunos minutos. ¡Agradecemos su amable paciencia!
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 text-center font-bold">
                    Haz clic en el botón verde inferior para enviar tu ficha directamente por WhatsApp al Dr. Omar Pajares.
                  </p>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-100 p-4 flex items-center justify-between gap-3">
          
          {/* Back button if in questionnaire */}
          {!isFromEvaluation && currentStep > 0 && currentStep < totalSteps - 1 ? (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
              className="px-3.5 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 cursor-pointer flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Atrás</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={resetAndClose}
              className="px-3.5 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-800 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 cursor-pointer"
            >
              Cancelar
            </button>
          )}

          {/* Action button: Show "Siguiente" for standard question steps, and green WhatsApp button ONLY at final step */}
          {currentStep === totalSteps - 1 || isFromEvaluation ? (
            <button
              type="button"
              onClick={() => handleOpenWhatsApp()}
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold text-white transition-all cursor-pointer shadow-md bg-[#25D366] hover:bg-[#20b855] hover:scale-[1.01]"
            >
              <MessageCircle className="h-4.5 w-4.5 fill-current" />
              <span>ENVIAR FICHA Y ABRIR WHATSAPP</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : currentStep < questions.length ? (
            <button
              type="button"
              onClick={() => {
                const currentKey = questions[currentStep].key;
                if (!answers[currentKey]) {
                  // Default to first option if not clicked yet
                  setAnswers(prev => ({ ...prev, [currentKey]: questions[currentStep].options[0] }));
                }
                setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1));
              }}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white bg-[#00243d] hover:bg-[#00385d] transition-all cursor-pointer shadow-sm"
            >
              <span>Siguiente</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setCurrentStep(prev => Math.min(prev + 1, totalSteps - 1))}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-2.5 text-xs font-bold text-white bg-[#00243d] hover:bg-[#00385d] transition-all cursor-pointer shadow-sm"
            >
              <span>Ver Resumen</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

