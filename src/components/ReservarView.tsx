import { useState, useMemo, FormEvent } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Zap, 
  Send,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Sparkles,
  CreditCard,
  QrCode,
  X,
  Clock
} from 'lucide-react';
import { EvaluationState } from '../types';
import { siteConfig, getWhatsappLink } from '../config';
import { doctorDeskImg, doctorEcografiaImg } from '../assets/imageData';

export default function ReservarView() {
  // Main mode: 'questionnaire' (Registro Previo) vs 'quick' (Escríbenos)
  const [formMode, setFormMode] = useState<'questionnaire' | 'quick'>('questionnaire');

  // Questionnaire step state
  const [step, setStep] = useState(0);
  
  // Form answers state
  const [answers, setAnswers] = useState<EvaluationState>({
    zona: '',
    tiempo: '',
    intensidad: '',
    previos: '',
    edad: '',
    nombre: '',
    telefono: ''
  });

  // Quick message form state
  const [quickName, setQuickName] = useState('');
  const [quickContact, setQuickContact] = useState('');
  const [quickMessage, setQuickMessage] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);

  // Modal checkout state for online booking
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'yape'>('card');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Questionnaire options
  const zonesOptions = [
    "Rodilla (Artrosis / Meniscos Rotos)", 
    "Hernia Discal Lumbar (Dolor Ciático)", 
    "Cadera (Artrosis / Desgaste)", 
    "Tendinitis de Codo / Hombro", 
    "Fascitis Plantar / Tendinitis de Aquiles", 
    "Otra articulación / Múltiples zonas"
  ];
  const timeOptions = ["Menos de 1 mes", "1 a 6 meses", "6 meses a 1 año", "Más de 1 año"];
  const intensityOptions = ["Leve (1-3)", "Moderado (4-6)", "Fuerte (7-8)", "Muy fuerte (9-10)"];
  const previousOptions = [
    "No, es mi primera atención", 
    "Sí, terapia física / medicamentos", 
    "Sí, infiltraciones", 
    "Sí, cirugía previa"
  ];

  const questions = [
    { title: "¿Dónde sientes el dolor o molestia principal?", key: 'zona' as keyof EvaluationState, options: zonesOptions },
    { title: "¿Hace cuánto tiempo presentas esta molestia?", key: 'tiempo' as keyof EvaluationState, options: timeOptions },
    { title: "¿Qué intensidad tiene tu dolor?", key: 'intensidad' as keyof EvaluationState, options: intensityOptions },
    { title: "¿Has recibido tratamientos o infiltraciones previas?", key: 'previos' as keyof EvaluationState, options: previousOptions }
  ];

  const totalSteps = questions.length + 2; // 4 questions + 1 demographics + 1 confirmation = 6
  const progressPercent = Math.round(((step + 1) / totalSteps) * 100);

  const isStepValid = useMemo(() => {
    if (step < questions.length) {
      const currentKey = questions[step].key;
      return !!answers[currentKey];
    }
    if (step === questions.length) {
      return (
        answers.nombre.trim().length >= 3 && 
        answers.edad.trim().length > 0 && 
        answers.telefono.trim().length >= 6
      );
    }
    return true;
  }, [step, answers, questions]);

  const handleOptionSelect = (key: keyof EvaluationState, val: string) => {
    setAnswers(prev => ({ ...prev, [key]: val }));
    
    if (step < questions.length) {
      setTimeout(() => {
        setStep(prevStep => Math.min(prevStep + 1, totalSteps - 1));
      }, 250);
    }
  };

  const handleNext = () => {
    if (isStepValid && step < totalSteps - 1) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  // Pre-filled WhatsApp message based on questionnaire answers
  const whatsappMessage = useMemo(() => {
    return `Hola Dr. Omar Pajares, estuve completando mi registro previo en la web y me gustaría agendar una consulta médica especializada.
Tengo los siguientes datos registrados:
• Nombre: ${answers.nombre || "(por indicar)"}
• Edad: ${answers.edad || "(por indicar)"}
• Zona de molestia: ${answers.zona || "(por indicar)"}
• Tiempo con molestia: ${answers.tiempo || "(por indicar)"}
• Intensidad: ${answers.intensidad || "(por indicar)"}
• Tratamientos previos: ${answers.previos || "(por indicar)"}

Quisiera coordinar la fecha y hora disponible para mi atención en Jesús María. ¡Muchas gracias!`;
  }, [answers]);

  const handleQuickSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!quickName || !quickContact || !quickMessage) return;
    
    const msg = `Hola Dr. Omar Pajares, me comunico desde el formulario de la web:
• Nombre: ${quickName}
• Contacto: ${quickContact}
• Consulta: ${quickMessage}`;

    window.open(getWhatsappLink(msg), '_blank');
    setQuickSubmitted(true);
  };

  const handleMockPay = (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPaymentSuccess(true);
    }, 2000);
  };

  const resetBooking = () => {
    setStep(0);
    setAnswers({
      zona: '',
      tiempo: '',
      intensidad: '',
      previos: '',
      edad: '',
      nombre: '',
      telefono: ''
    });
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    setPaymentSuccess(false);
    setIsCheckoutOpen(false);
  };

  return (
    <div className="bg-slate-50 text-slate-900 overflow-x-hidden">

      {/* 1. TOP HERO BANNER (Piskulich Style) */}
      <section className="relative bg-[#00385d] text-white pt-10 pb-20 md:pt-14 md:pb-24 overflow-hidden">
        {/* Subtle Radial Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#005a92] via-[#00385d] to-[#001e33] opacity-95 pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-12 items-center">
            
            {/* Left Headline & Orange Banner Badge */}
            <div className="md:col-span-8 text-left space-y-5">
              
              {/* ORANGE BANNER TAG (Screenshot 1 Style) */}
              <div>
                <span className="inline-block bg-[#f59e0b] text-[#00243d] text-sm sm:text-base md:text-lg font-black uppercase tracking-wider px-6 py-2.5 rounded-2xl shadow-xl font-mono">
                  ¡COMUNÍCATE CON NOSOTROS!
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-tight">
                REGISTRO PREVIO Y <span className="text-[#00c3e6]">RESERVA DE CITA</span>
              </h1>

              <p className="text-sm md:text-base text-slate-200 leading-relaxed font-medium max-w-2xl">
                Completa tu registro previo o envíanos un mensaje directo para coordinar tu consulta médica presencial de Medicina Física y Rehabilitación con el <strong className="text-white">Dr. Omar Pajares Tequen</strong>.
              </p>
            </div>

            {/* Right Doctor Portrait Hero (Ecografía In Situ) */}
            <div className="md:col-span-4 flex justify-center">
              <div className="relative w-full max-w-[320px] rounded-3xl overflow-hidden shadow-2xl border-4 border-cyan-400 bg-slate-900">
                <img
                  src={doctorEcografiaImg}
                  alt="Evaluación Ecoguiada con el Dr. Omar Pajares"
                  className="w-full h-auto object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00243d] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                  <p className="font-serif font-black text-sm uppercase">Evaluación Ecoguiada</p>
                  <p className="text-[10px] text-cyan-200 uppercase font-mono">{siteConfig.doctorName}{siteConfig.cmp ? ` · ${siteConfig.cmp}` : ''}</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg className="relative block w-full h-8 md:h-12 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. CANALES DE COMUNICACIÓN (Screenshot 1 Style) */}
      <section className="py-12 bg-white text-slate-900 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 text-center">
          
          <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#00385d] uppercase tracking-tight mb-10">
            PONEMOS A SU DISPOSICIÓN LOS SIGUIENTES CANALES DE COMUNICACIÓN
          </h2>

          <div className="grid gap-8 md:grid-cols-3">
            
            {/* Channel 1: Phone / WhatsApp */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-lg">
                <Phone className="h-8 w-8 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-base font-black text-[#00385d] uppercase">TELÉFONO / WHATSAPP</h3>
              <p className="text-sm font-black text-slate-800 tracking-wide">
                932 388 579
              </p>
            </div>

            {/* Channel 2: Email */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-lg">
                <Mail className="h-8 w-8 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-base font-black text-[#00385d] uppercase">CORREO ELECTRÓNICO</h3>
              <p className="text-sm font-black text-slate-800 tracking-wide">
                {siteConfig.email}
              </p>
            </div>

            {/* Channel 3: Address */}
            <div className="flex flex-col items-center text-center space-y-3 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition-shadow">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#f59e0b] text-white shadow-lg">
                <MapPin className="h-8 w-8 stroke-[2.5]" />
              </div>
              <h3 className="font-serif text-base font-black text-[#00385d] uppercase">DIRECCIÓN CONSULTORIO</h3>
              <p className="text-sm font-black text-slate-800 tracking-wide">
                Av. Gregorio Escobedo 788, Of. 304, Jesús María
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 3. MAIN FORM SECTION: REGISTRO PREVIO INTERACTIVO + ESCRÍBENOS (Screenshot 2 Style) */}
      <section id="formulario-cita" className="py-14 md:py-20 bg-[#f4f7f9] scroll-mt-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-12 md:grid-cols-12 items-start">
            
            {/* Left Column: Doctor Portrait in Curved Frame with Lightning bolt badge (Screenshot 2 Style) */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div className="relative w-full max-w-[340px]">
                
                {/* Yellow Lightning bolt badge icon (Screenshot 2 Style) */}
                <div className="absolute -top-4 -left-4 z-20 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f59e0b] text-[#00243d] shadow-xl">
                  <Zap className="h-8 w-8 fill-current" />
                </div>

                {/* Styled curved white frame container */}
                <div className="relative rounded-3xl border-2 border-slate-200 bg-white p-3 shadow-2xl overflow-hidden">
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 aspect-[3/4]">
                    <img
                      src={doctorDeskImg}
                      alt="Dr. Omar Pajares Tequen"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00243d] via-transparent to-transparent opacity-80"></div>
                    <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                      <p className="font-serif font-black text-base uppercase">Dr. Omar Pajares Tequen</p>
                      <p className="text-xs text-cyan-200 font-mono mt-0.5">Especialista en Medicina Física y Rehabilitación</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: "REGISTRO PREVIO" / "ESCRÍBENOS" Interactive Form */}
            <div className="md:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl text-left">
              
              {/* Header Title & Selector Tabs */}
              <div className="border-b border-slate-100 pb-5 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#00385d] uppercase tracking-tight">
                    {formMode === 'questionnaire' ? 'REGISTRO PREVIO DE CITA' : 'ESCRÍBENOS'}
                  </h2>
                  <p className="text-xs text-slate-500 font-medium mt-1">
                    {formMode === 'questionnaire' 
                      ? 'Responde estas breves preguntas para preparar tu ficha previa.' 
                      : 'Envíanos un mensaje directo para coordinar tu atención.'}
                  </p>
                </div>

                {/* Mode Selector Tabs */}
                <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200 shrink-0">
                  <button
                    type="button"
                    onClick={() => setFormMode('questionnaire')}
                    className={`px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-colors cursor-pointer ${
                      formMode === 'questionnaire'
                        ? 'bg-[#00385d] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Registro Previo
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormMode('quick')}
                    className={`px-3.5 py-1.5 text-xs font-extrabold rounded-lg transition-colors cursor-pointer ${
                      formMode === 'quick'
                        ? 'bg-[#00385d] text-white shadow-sm'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    Escríbenos
                  </button>
                </div>
              </div>

              {/* OPTION A: REGISTRO PREVIO INTERACTIVO (Step-by-step questionnaire) */}
              {formMode === 'questionnaire' && (
                <div>
                  {/* Gentle & Clear Consultation Price Banner */}
                  <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-500/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white font-black shadow-sm">
                        <ShieldCheck className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="font-serif font-black text-slate-900 text-sm">Consulta Médica Presencial</h4>
                        <p className="text-xs text-slate-700 font-medium">Evaluación integral con ecografía in situ por Médico Fisiatra</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                      <span className="text-xs text-slate-600 font-bold uppercase hidden sm:inline">Costo:</span>
                      <span className="bg-emerald-600 text-white px-3.5 py-1.5 rounded-xl font-black text-sm shadow-sm">
                        S/ 200
                      </span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-6">
                    <div className="flex justify-between text-xs font-bold text-[#00385d] mb-1.5">
                      <span>Paso {step + 1} de {totalSteps}</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div 
                        className="h-full bg-[#00c3e6] transition-all duration-300 ease-out"
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Questionnaire steps */}
                  <div className="min-h-[260px]">
                    
                    {/* Steps 1 to 4: Multiple Choice Questions */}
                    {step < questions.length && (
                      <div className="space-y-4">
                        <h3 className="font-serif text-base sm:text-lg font-black text-[#00385d] uppercase">
                          {questions[step].title}
                        </h3>

                        <div className="grid gap-3 sm:grid-cols-2 pt-2">
                          {questions[step].options.map((opt, idx) => {
                            const isSelected = answers[questions[step].key] === opt;
                            return (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => handleOptionSelect(questions[step].key, opt)}
                                className={`flex items-center justify-between gap-3 rounded-2xl border-2 p-4 text-left text-xs font-bold transition-all cursor-pointer ${
                                  isSelected
                                    ? 'border-[#00c3e6] bg-cyan-50/80 text-[#00385d] shadow-md'
                                    : 'border-slate-200 bg-white text-slate-700 hover:border-cyan-300 hover:bg-slate-50'
                                }`}
                              >
                                <span>{opt}</span>
                                <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                                  isSelected ? 'border-[#00c3e6] bg-[#00385d]' : 'border-slate-300 bg-white'
                                }`}>
                                  {isSelected && <span className="h-2 w-2 rounded-full bg-[#00c3e6]"></span>}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Step 5: Patient Details Inputs */}
                    {step === questions.length && (
                      <div className="space-y-5">
                        <h3 className="font-serif text-lg font-black text-[#00385d] uppercase">
                          Datos del Paciente para Ficha Médica
                        </h3>

                        <div className="space-y-4 pt-1">
                          <div>
                            <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">
                              Nombre Completo
                            </label>
                            <input
                              type="text"
                              value={answers.nombre}
                              onChange={(e) => handleOptionSelect('nombre', e.target.value)}
                              placeholder="Ingresa tu nombre y apellido"
                              className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#00385d] transition-colors"
                            />
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">
                                Edad
                              </label>
                              <input
                                type="number"
                                inputMode="numeric"
                                value={answers.edad}
                                onChange={(e) => handleOptionSelect('edad', e.target.value)}
                                placeholder="Ej. 48"
                                className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#00385d] transition-colors"
                              />
                            </div>

                            <div>
                              <label className="block text-xs font-extrabold text-slate-700 uppercase mb-1.5">
                                Teléfono de Contacto
                              </label>
                              <input
                                type="text"
                                value={answers.telefono}
                                onChange={(e) => handleOptionSelect('telefono', e.target.value)}
                                placeholder="Ej. 932 388 579"
                                className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#00385d] transition-colors"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 6: Confirmation & Booking Options */}
                    {step === totalSteps - 1 && (
                      <div className="space-y-6">
                        <div className="bg-cyan-50 border border-cyan-200 rounded-2xl p-4 flex flex-col gap-2">
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-6 w-6 text-[#00c3e6] shrink-0" />
                            <div>
                              <h4 className="font-serif text-xs font-bold uppercase text-[#00385d]">
                                ¡Registro Previo Completado!
                              </h4>
                              <p className="text-xs text-slate-600 font-medium">
                                Elige cómo deseas confirmar y coordinar tu consulta presencial:
                              </p>
                            </div>
                          </div>
                          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-950 font-medium flex items-start gap-2">
                            <Clock className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                            <span><strong>Aviso importante:</strong> La respuesta por WhatsApp puede demorar aproximadamente entre <strong>10 a 15 minutos</strong> mientras el médico atiende en consulta presencial. ¡Gracias por su comprensión!</span>
                          </div>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                          {/* Option A: WhatsApp Direct */}
                          <div className="border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-between bg-slate-50 hover:border-green-500 transition-colors">
                            <div>
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-500 text-white font-bold mb-3">
                                <MessageCircle className="h-5 w-5 fill-current" />
                              </div>
                              <h4 className="font-serif text-sm font-black text-[#00385d] uppercase">Coordinar por WhatsApp</h4>
                              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                Envía tus respuestas para acordar la fecha y hora con nuestra recepción.
                              </p>
                            </div>
                            <div className="mt-5">
                              <a
                                href={getWhatsappLink(whatsappMessage)}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-skip-filter="true"
                                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] hover:bg-green-600 px-4 py-3 text-xs font-black uppercase text-white shadow-md transition-transform hover:scale-105"
                              >
                                <MessageCircle className="h-4 w-4" />
                                <span>Enviar por WhatsApp</span>
                              </a>
                            </div>
                          </div>

                          {/* Option B: Pay Online */}
                          <div className="border-2 border-slate-200 rounded-2xl p-5 flex flex-col justify-between bg-slate-50 hover:border-[#00c3e6] transition-colors">
                            <div>
                              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00385d] text-[#00c3e6] font-bold mb-3">
                                <CreditCard className="h-5 w-5" />
                              </div>
                              <h4 className="font-serif text-sm font-black text-[#00385d] uppercase">Pagar y Separar Cita</h4>
                              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                Abona la consulta presencial (S/ 200) para asegurar tu turno prioritario.
                              </p>
                            </div>
                            <div className="mt-5">
                              <button
                                type="button"
                                onClick={() => setIsCheckoutOpen(true)}
                                className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#00385d] hover:bg-[#00243d] px-4 py-3 text-xs font-black uppercase text-white shadow-md transition-transform hover:scale-105"
                              >
                                <CreditCard className="h-4 w-4" />
                                <span>Separar Cita (S/ 200)</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* Navigation Buttons for Questionnaire */}
                  {step < totalSteps - 1 && (
                    <div className="mt-8 flex justify-between border-t border-slate-100 pt-5">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={step === 0}
                        className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full px-5 py-2.5 text-xs font-bold uppercase transition-all ${
                          step === 0
                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                        }`}
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span>Atrás</span>
                      </button>

                      {step === questions.length ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={!isStepValid}
                          className={`cursor-pointer inline-flex items-center gap-1.5 rounded-full px-8 py-3 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all ${
                            isStepValid
                              ? 'bg-[#f59e0b] hover:bg-amber-500 text-[#00243d]'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          <span>Siguiente</span>
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      ) : (
                        isStepValid && (
                          <button
                            type="button"
                            onClick={handleNext}
                            className="cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-[#f59e0b] hover:bg-amber-500 text-[#00243d] px-8 py-3 text-xs font-black uppercase tracking-wider shadow-md transition-all hover:scale-105"
                          >
                            <span>Siguiente</span>
                            <ChevronRight className="h-4 w-4" />
                          </button>
                        )
                      )}
                    </div>
                  )}

                </div>
              )}

              {/* OPTION B: QUICK MESSAGE FORM ("ESCRÍBENOS" - Exact Screenshot 2 Layout) */}
              {formMode === 'quick' && (
                <form onSubmit={handleQuickSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      required
                      value={quickName}
                      onChange={(e) => setQuickName(e.target.value)}
                      placeholder="Escribe tu nombre completo"
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#00385d] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">
                      Dirección de correo electrónico / Teléfono
                    </label>
                    <input
                      type="text"
                      required
                      value={quickContact}
                      onChange={(e) => setQuickContact(e.target.value)}
                      placeholder="Escribe tu correo o número de teléfono"
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#00385d] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold text-slate-700 uppercase mb-2">
                      Mensaje
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={quickMessage}
                      onChange={(e) => setQuickMessage(e.target.value)}
                      placeholder="Escribe tu consulta o síntoma..."
                      className="w-full rounded-xl border-2 border-slate-300 bg-white px-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 outline-none focus:border-[#00385d] transition-colors resize-none"
                    ></textarea>
                  </div>

                  {/* Orange Pill Button matching Screenshot 2 */}
                  <div className="pt-2 text-right">
                    <button
                      type="submit"
                      className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-[#f59e0b] hover:bg-amber-500 text-white font-black uppercase text-xs sm:text-sm px-10 py-4 shadow-xl transition-transform hover:scale-105"
                    >
                      <Send className="h-4 w-4" />
                      <span>ENVIAR MENSAJE</span>
                    </button>
                  </div>

                  {quickSubmitted && (
                    <div className="p-4 rounded-2xl bg-green-50 text-green-800 text-xs font-bold border border-green-200 flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-green-600 shrink-0" />
                      <span>¡Gracias por comunicarte! Redirigiendo a WhatsApp...</span>
                    </div>
                  )}
                </form>
              )}

            </div>

          </div>
        </div>
      </section>

      {/* 4. MAP SECTION (Screenshot 3 Style) */}
      <section className="bg-white py-12 border-t border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-[#00c3e6]">UBICACIÓN EN JESÚS MARÍA</span>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#00385d] uppercase mt-1">
              VISÍTANOS EN NUESTRO CONSULTORIO
            </h2>
            <p className="text-xs text-slate-600 font-medium mt-1">
              {siteConfig.address} — {siteConfig.district}
            </p>
          </div>

          <div className="rounded-3xl overflow-hidden border-2 border-slate-200 shadow-xl h-80 sm:h-96 w-full relative bg-slate-100">
            <iframe
              title="Ubicación Dr. Omar Pajares"
              src="https://maps.google.com/maps?q=Av.+Gregorio+Escobedo+788,+Jes%C3%BAs+Mar%C3%ADa,+Lima&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* 5. Checkout Modal for Izipay Online Payment */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 shadow-2xl rounded-3xl overflow-hidden p-6 md:p-8 text-left max-h-[92vh] overflow-y-auto">
            
            {/* Modal Header with Izipay Branding */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center rounded-xl bg-gradient-to-r from-[#ff0055] to-[#ff3300] px-3 py-1.5 text-white font-black text-xs tracking-wider shadow-md font-mono">
                  izipay
                </div>
                <div>
                  <h3 className="font-serif text-sm md:text-base font-black text-[#00385d] uppercase leading-tight">Pasarela de Pago Segura</h3>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Procesado por Izipay Perú (PCI-DSS)</p>
                </div>
              </div>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body */}
            {!paymentSuccess ? (
              <div className="mt-5 space-y-5">
                {/* Summary Box */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 flex justify-between items-center text-xs">
                  <div>
                    <span className="inline-block bg-[#00385d] text-[#00c3e6] text-[10px] font-black uppercase px-2 py-0.5 rounded-md mb-1">
                      CONSULTA PRESENCIAL
                    </span>
                    <p className="font-bold text-[#00385d] text-sm">Dr. Omar Pajares Tequen</p>
                    <p className="text-slate-500 mt-0.5 font-medium">Paciente: <strong className="text-slate-800">{answers.nombre || 'Consulta Médica'}</strong></p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Monto a Pagar</span>
                    <span className="font-extrabold text-[#00385d] text-xl">S/ 200</span>
                  </div>
                </div>

                {/* Payment Method Selector */}
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1.5 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-white text-[#00385d] shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    💳 Tarjeta Débito / Crédito
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-all ${
                      paymentMethod === 'yape'
                        ? 'bg-[#742284] text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    📱 Yape / Plin por Izipay
                  </button>
                </div>

                {paymentMethod === 'card' ? (
                  <form onSubmit={handleMockPay} className="space-y-4">
                    
                    {/* Card Brand Icons Banner */}
                    <div className="flex items-center justify-between px-1 py-1 text-[10px] font-bold text-slate-400 border-b border-slate-100 pb-2">
                      <span>Tarjetas Aceptadas:</span>
                      <div className="flex items-center gap-1.5 font-black text-slate-600">
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">VISA</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">MASTERCARD</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">AMEX</span>
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">DINERS</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex flex-col gap-1">
                        <label className="font-extrabold text-slate-700 uppercase text-[10px]">Documento (DNI / CE)</label>
                        <input
                          type="text"
                          required
                          maxLength={12}
                          placeholder="87654321"
                          className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-[#00385d]"
                        />
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-extrabold text-slate-700 uppercase text-[10px]">Correo Electrónico</label>
                        <input
                          type="email"
                          required
                          placeholder="tu@correo.com"
                          className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-[#00385d]"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1 text-xs">
                      <label className="font-extrabold text-slate-700 uppercase text-[10px]">Nombre del Titular</label>
                      <input
                        type="text"
                        required
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Como figura en la tarjeta"
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 outline-none focus:border-[#00385d]"
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-xs">
                      <label className="font-extrabold text-slate-700 uppercase text-[10px]">Número de Tarjeta</label>
                      <input
                        type="text"
                        required
                        maxLength={19}
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 font-mono outline-none focus:border-[#00385d]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex flex-col gap-1 text-xs">
                        <label className="font-extrabold text-slate-700 uppercase text-[10px]">Expiración</label>
                        <input
                          type="text"
                          required
                          maxLength={5}
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          placeholder="MM/AA"
                          className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 font-mono outline-none focus:border-[#00385d]"
                        />
                      </div>
                      <div className="flex flex-col gap-1 text-xs">
                        <label className="font-extrabold text-slate-700 uppercase text-[10px]">Código CVV / CVC</label>
                        <input
                          type="password"
                          required
                          maxLength={4}
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          placeholder="123"
                          className="rounded-xl border-2 border-slate-200 bg-white px-3 py-2.5 text-xs text-slate-800 font-mono outline-none focus:border-[#00385d]"
                        />
                      </div>
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 font-semibold">
                      <span className="flex items-center gap-1 text-emerald-700">
                        <ShieldCheck className="h-3.5 w-3.5" />
                        <span>Transacción encriptada a 256 bits</span>
                      </span>
                      <span className="text-[#ff0055] font-black">izipay</span>
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="cursor-pointer w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#00385d] to-[#005a92] hover:from-[#00243d] hover:to-[#00385d] py-4 text-xs font-black uppercase text-white tracking-widest transition-all disabled:opacity-50 shadow-xl"
                    >
                      {isLoading ? (
                        <span className="flex items-center gap-2">
                          <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                          <span>Procesando pago con Izipay...</span>
                        </span>
                      ) : (
                        <span>PAGAR S/ 200 CON IZIPAY</span>
                      )}
                    </button>
                  </form>
                ) : (
                  <div className="space-y-4 text-center">
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      Escanea el QR de <span className="font-bold text-[#742284]">Izipay Yape / Plin</span> por el monto de <strong className="text-slate-900">S/ 200</strong> y confirma tu pago.
                    </p>
                    
                    <div className="mx-auto flex flex-col items-center justify-center border-2 border-purple-200 bg-purple-50/50 p-4 rounded-2xl shadow-inner">
                      <QrCode className="h-36 w-36 text-slate-800" />
                      <span className="text-[10px] text-purple-900 font-bold uppercase tracking-wider mt-2">
                        Atención Médica: Dr. Omar Pajares
                      </span>
                    </div>

                    <button
                      onClick={() => {
                        setIsLoading(true);
                        setTimeout(() => {
                          setIsLoading(false);
                          setPaymentSuccess(true);
                        }, 1800);
                      }}
                      className="cursor-pointer w-full inline-flex items-center justify-center rounded-full bg-[#742284] hover:bg-purple-900 py-3.5 text-xs font-black uppercase text-white tracking-widest transition-colors shadow-md"
                    >
                      {isLoading ? "Verificando pago Izipay..." : "CONFIRMAR PAGO REALIZADO"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-5 space-y-5 text-center animate-fade-up">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 shadow-md">
                  <CheckCircle2 className="h-9 w-9 stroke-[2.5]" />
                </div>
                <div>
                  <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase px-2.5 py-1 rounded-md mb-2">
                    N° OPERACIÓN IZIPAY: IZP-2026-98421
                  </span>
                  <h4 className="font-serif text-xl font-black text-[#00385d] uppercase">¡Cita Separada Exitosamente!</h4>
                  <p className="text-xs text-slate-600 leading-relaxed mt-2 font-medium max-w-sm mx-auto">
                    Hemos confirmado tu pago de <strong className="text-slate-900">S/ 200</strong> a través de <strong>Izipay Perú</strong>. Tu registro previo está asociado a tu comprobante de atención.
                  </p>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-left text-xs space-y-1">
                  <p className="font-bold text-[#00385d]">Resumen de la Cita:</p>
                  <p className="text-slate-600">• Paciente: {answers.nombre || "Paciente"}</p>
                  <p className="text-slate-600">• Consultorio: Av. Gregorio Escobedo 788, Of. 304, Jesús María</p>
                  <p className="text-slate-600">• Estado: <strong className="text-emerald-600 font-bold">Cita Confirmada y Pagada</strong></p>
                </div>

                <div className="flex flex-col gap-2 pt-2">
                  <a
                    href={getWhatsappLink(`Hola Dr. Omar Pajares, acabo de realizar mi pago de S/ 200 en la web vía Izipay (Operación IZP-2026-98421) para mi consulta médica de ${answers.zona || 'Rodilla/Cadera'}. Quisiera confirmar la hora exacta de mi cita.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-700 py-3.5 text-xs font-black uppercase text-white tracking-wider shadow-md"
                  >
                    <MessageCircle className="h-4 w-4 fill-current" />
                    <span>ENVIAR COMPROBANTE A WHATSAPP</span>
                  </a>

                  <button
                    type="button"
                    onClick={resetBooking}
                    className="cursor-pointer text-xs font-bold text-slate-400 hover:text-slate-700 py-2 uppercase tracking-wider"
                  >
                    Cerrar ventana
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
