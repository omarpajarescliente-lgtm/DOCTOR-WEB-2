import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ArrowRight,
  Eye,
  Target,
  Dna,
  Syringe,
  Scan,
  Sparkles,
  Award,
  UserCheck,
  User,
  HeartPulse,
  ShieldCheck,
  Headphones,
  FileCheck,
  Stethoscope
} from 'lucide-react';
import { ViewPath } from '../types';
import { siteConfig } from '../config';
import { TREATMENTS } from '../data/treatments';

import { 
  doctorDeskImg, 
  doctorEcografiaImg, 
  doctorCelulasMadreImg, 
  doctorCutoutCleanImg, 
  clinicBgImg 
} from '../assets/imageData';

interface HomeViewProps {
  onNavigate: (view: ViewPath) => void;
  onSelectTreatment: (treatmentId: string) => void;
  onOpenAppointmentModal?: (msg?: string) => void;
  onOpenAiTriage?: (initialTopic?: string) => void;
}

// Animated Counter component with smooth numbers
function AnimatedCounter({ 
  end, 
  prefix = '', 
  suffix = '', 
  duration = 2000 
}: { 
  end: number; 
  prefix?: string; 
  suffix?: string; 
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const nodeRef = useRef<HTMLSpanElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quad
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrame);
  }, [hasStarted, end, duration]);

  return (
    <span ref={nodeRef} className="tabular-nums">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HomeView({ onNavigate, onSelectTreatment, onOpenAppointmentModal, onOpenAiTriage }: HomeViewProps) {
  // Accordion FAQ state
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleCtaClick = () => {
    if (onOpenAppointmentModal) {
      onOpenAppointmentModal('Hola Dr. Omar Pajares, me comunico desde la página web para solicitar información sobre sus consultas médicas y agendar mi cita.');
    } else {
      onNavigate('/reservar-cita');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const faqs = [
    {
      q: "¿Por qué es tan importante que el procedimiento sea ECOGUIADO?",
      a: "La ecografía de alta resolución permite observar la articulación, tendón o menisco en tiempo real. Esto garantiza dos cosas fundamentales: 1) Diagnóstico preciso in situ durante la consulta. 2) Infiltración milimétrica exacta, asegurando que el PRP, las células madre o la proloterapia ingresen justo en el foco de la lesión para máxima efectividad."
    },
    {
      q: "¿Qué diferencia hay entre el PRP, las Células Madre y la Proloterapia?",
      a: "El PRP utiliza factores de crecimiento de tu sangre para reparar tejidos moderadamente lesionados; las Células Madre de cordón umbilical tienen el mayor poder regenerativo para artrosis severa y desgaste articular avanzado; y la Proloterapia estimula la reconstrucción de ligamentos y tendones debilitados para devolver estabilidad."
    },
    {
      q: "¿Cuánto cuesta la consulta médica?",
      a: "La consulta médica especializada con el Dr. Omar Pajares Tequen tiene un costo de S/ 200. Incluye evaluación médica especializada, exploración clínica y orientación directa para tu plan regenerativo."
    },
    {
      q: "¿Necesito cirugía para mi artrosis o hernia discal?",
      a: "En la gran mayoría de casos no es necesaria. La medicina regenerativa ecoguiada ofrece una alternativa efectiva, no quirúrgica y ambulatoria para reparar el tejido, reducir la inflamación y devolverte tu calidad de vida."
    },
    {
      q: "¿Dónde queda el consultorio del Dr. Pajares?",
      a: "En Av. Gregorio Escobedo 788, Of. 304, Urb. Los Patricios, Jesús María, Lima - Perú."
    }
  ];

  return (
    <div className="overflow-x-hidden bg-white">
      {/* 1. Hero Section (Dr. Piskulich Style Cyan/Teal Gradient with Clinic Backdrop) */}
      <section className="relative bg-[#00243d] pt-10 pb-0 md:pt-16 md:pb-0 text-white">
        {/* Background Clinic Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={clinicBgImg} 
            alt="Consultorio médico Dr. Omar Pajares" 
            className="w-full h-full object-cover object-center opacity-30 mix-blend-overlay"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001d30]/95 via-[#005a76]/85 to-[#00243d]/95 backdrop-blur-[1px]"></div>
        </div>

        {/* Subtle Background Pattern Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(255,255,255,0.15),transparent)] pointer-events-none z-0"></div>
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-full bg-cyan-300/20 blur-3xl pointer-events-none z-0"></div>
        <div className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-sky-900/30 blur-3xl pointer-events-none z-0"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-12 items-center">
            
            {/* Left Column Text (Exact Dr. Piskulich Visual Structure) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#00c3e6]/20 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-cyan-300 border border-cyan-400/40">
                <ShieldCheck className="h-4 w-4" />
                MÉDICO FISIATRA — ESPECIALISTA REGENERATIVO
              </div>

              <h1 className="font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight uppercase drop-shadow-md">
                ALIVIA EL DOLOR DE <span className="text-cyan-300 underline decoration-cyan-300 decoration-4 underline-offset-8">RODILLA Y HERNIA DISCAL</span> SIN CIRUGÍA
              </h1>

              <p className="text-base sm:text-lg text-white/95 font-medium max-w-2xl leading-relaxed">
                El <strong className="font-black text-cyan-200">90% de nuestros casos</strong> de éxito responden a infiltraciones regenerativas con ecografía en <strong className="text-white underline">Artrosis, Meniscopatía y Hernia Discal Lumbar</strong>.
              </p>

              {/* Consultation Price Banner */}
              <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 max-w-xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-cyan-200 uppercase tracking-wider block">Consulta Médica Presencial Especializada</span>
                  <p className="text-xs text-slate-200">Evaluación ecoguiada in situ con el Dr. Omar Pajares</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="bg-emerald-500 text-slate-950 px-3.5 py-1 rounded-xl font-black text-base shadow-md inline-block">
                    S/ 200
                  </span>
                </div>
              </div>

              {/* CTA BUTTONS (Agenda Cita + Triaje con IA) */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={handleCtaClick}
                  className="cursor-pointer inline-flex items-center justify-center gap-3 rounded-full border-2 border-white bg-[#00c3e6] hover:bg-white hover:text-[#00385d] text-white font-black text-sm uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-2xl hover:scale-105"
                >
                  <span>AGENDA TU CITA</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                {onOpenAiTriage && (
                  <button
                    onClick={() => onOpenAiTriage()}
                    className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border-2 border-cyan-300/50 bg-[#02111c]/80 hover:bg-[#00c3e6] text-cyan-200 hover:text-white font-black text-sm uppercase tracking-wider px-6 py-4 transition-all duration-300 shadow-xl hover:scale-105"
                  >
                    <Stethoscope className="h-4 w-4 text-cyan-300" />
                    <span>ORIENTACIÓN EN LÍNEA</span>
                  </button>
                )}
              </div>
            </motion.div>

            {/* Right Showcase Column (Large Cutout Image aligned seamlessly to bottom feature bar) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-5 relative flex flex-col items-center justify-end h-full pt-2 lg:pt-0 z-20"
            >
              <div className="relative w-full max-w-[540px] sm:max-w-[600px] lg:max-w-[680px] flex items-end justify-center">
                {/* Soft ambient cyan backlight radial glow behind doctor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-cyan-400/20 blur-3xl -z-10 pointer-events-none"></div>

                {/* Large Doctor Cutout Image sitting flush at the bottom edge extending into white card */}
                <div 
                  className="relative w-full flex items-end justify-center translate-y-6 sm:translate-y-10 lg:translate-y-14 -mb-8 sm:-mb-12 lg:-mb-16 pointer-events-none"
                  style={{
                    maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)',
                    WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 75%, rgba(0,0,0,0) 100%)'
                  }}
                >
                  <img
                    src={doctorCutoutCleanImg}
                    alt="Dr. Omar Pajares Tequen"
                    className="w-auto h-[520px] sm:h-[640px] md:h-[720px] lg:h-[800px] max-w-full object-contain object-bottom filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] transition-transform duration-500 hover:scale-[1.01] pointer-events-auto"
                  />
                </div>

                {/* Floating Info Badge on the bottom left (framing the cutout without overlapping the doctor's coat) */}
                <div className="absolute bottom-16 left-0 sm:left-2 lg:-left-4 bg-[#001728]/90 backdrop-blur-md border border-cyan-400/40 rounded-2xl p-3.5 shadow-2xl text-white z-30 max-w-[240px]">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300 font-black">DR. OMAR PAJARES</span>
                  </div>
                  <p className="text-xs font-bold text-white leading-tight">Médico Fisiatra</p>
                  <p className="text-[11px] text-cyan-200 font-medium">Especialista en Medicina Regenerativa</p>
                  <p className="text-[10px] text-cyan-300/80 font-mono mt-1 pt-1 border-t border-cyan-500/20">{siteConfig.cmp && siteConfig.rne ? `${siteConfig.cmp} · ${siteConfig.rne}` : 'Jesús María — Lima, Perú'}</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 2. Floating 3-Column Feature Card (3 Pillars highlighted by Doctor) */}
      <div className="relative z-30 mx-auto max-w-6xl px-4 -mt-16 sm:-mt-20">
        <div className="rounded-3xl bg-white border-2 border-slate-200 shadow-2xl p-6 sm:p-8 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          
          {/* Column 1 */}
          <div className="flex items-center gap-4 pt-4 md:pt-0">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00c3e6]/15 text-[#00a8ca]">
              <Award className="h-7 w-7 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-serif text-base font-black text-[#00243d]">10 años de experiencia</h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">Especialista en Medicina Regenerativa Celular</p>
            </div>
          </div>

          {/* Column 2 */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00c3e6]/15 text-[#00a8ca]">
              <Scan className="h-7 w-7 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-serif text-base font-black text-[#00243d]">+45,000 Infiltraciones</h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">Procedimientos ecoguiados in situ</p>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex items-center gap-4 pt-4 md:pt-0 md:pl-6">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#00c3e6]/15 text-[#00a8ca]">
              <CheckCircle2 className="h-7 w-7 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="font-serif text-base font-black text-[#00243d]">+12,000 Pacientes</h3>
              <p className="text-xs text-slate-600 font-medium mt-0.5">Tratados, aliviados y sin dolor</p>
            </div>
          </div>

        </div>
      </div>

      {/* 2A. Interactive Nurse Callout Banner */}
      {onOpenAiTriage && (
        <section className="py-8 bg-slate-50 border-y border-slate-200 mt-10">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="relative rounded-3xl bg-gradient-to-r from-[#02111c] via-[#00385d] to-[#00243d] p-6 sm:p-8 text-white shadow-xl overflow-hidden border border-cyan-500/20">
              <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-[#00c3e6]/10 to-transparent pointer-events-none" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-2 text-left max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00c3e6]/20 text-[#00c3e6] border border-[#00c3e6]/30 text-xs font-black uppercase tracking-wider">
                    <Stethoscope className="h-3.5 w-3.5" />
                    Orientación de Casos y Tratamientos
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                    ¿Eres candidato a tratamiento sin cirugía?
                  </h3>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    Nuestra <strong className="text-cyan-300">Asistente Médica en Línea</strong> te guiará en 3 preguntas rápidas para evaluar si tu dolor de rodilla, hernia discal o artrosis califica para nuestros tratamientos regenerativos.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
                  <button
                    onClick={() => onOpenAiTriage()}
                    className="w-full sm:w-auto cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-[#00c3e6] hover:bg-white text-[#02111c] hover:text-[#00243d] font-black text-xs sm:text-sm uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-xl hover:scale-105"
                  >
                    <Stethoscope className="h-4 w-4" />
                    <span>CONSULTAR MI CASO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2B. Dr. Omar Pajares Profile Section (Exact Dr. Piskulich Screenshot Layout) */}
      <section className="py-16 md:py-24 bg-white border-b border-slate-200 overflow-hidden">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* Right Column (order-1 on mobile, order-2 on lg): Text Bio & CTA */}
            <div className="lg:col-span-7 space-y-5 text-left order-1 lg:order-2">
              <span className="inline-block text-[#00a8ca] font-mono text-xs font-black tracking-widest uppercase bg-cyan-50 px-3 py-1 rounded-md border border-cyan-100">
                MÉDICO FISIATRA — ESPECIALISTA EN MEDICINA REGENERATIVA
              </span>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#00243d] uppercase tracking-tight">
                DR. OMAR PAJARES TEQUEN
              </h2>

              <p className="text-[#2d3748] text-base leading-relaxed font-semibold">
                Soy el <strong className="text-slate-950 font-bold">Dr. Omar Pajares Tequen</strong>, <strong className="text-[#00a8ca] font-extrabold">Médico Fisiatra</strong>. Como médico especialista evalúo y trato de manera directa tus lesiones articulares.
              </p>

              <p className="text-[#2d3748] text-base leading-relaxed font-semibold">
                Mi enfoque clínico está especializado en <strong className="text-slate-950">Rodilla (Artrosis y Meniscos Rotos) y Hernia Discal Lumbar (Dolor Ciático)</strong>, que corresponden al <strong className="text-[#00a8ca]">90% de nuestros casos atendidos con mayor éxito</strong> mediante infiltraciones ecoguiadas in situ de Plasma Rico en Plaquetas (PRP), Exosomas y Células Madre.
              </p>

              {/* AAOM USA Certification Pill */}
              <div className="p-3.5 rounded-2xl bg-[#001f35] text-white border border-amber-400/50 flex items-center gap-3 shadow-md">
                <span className="text-2xl shrink-0">🇺🇸</span>
                <div>
                  <p className="text-xs font-black text-amber-300 uppercase tracking-wider">
                    CERTIFICADO EN ESTADOS UNIDOS POR LA AAOM
                  </p>
                  <p className="text-[11px] text-slate-200 font-medium">
                    American Association of Orthopaedic Medicine — IROM—C Certified en Inyecciones Regenerativas.
                  </p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
                Y estoy aquí para resolverte todas las dudas que tengas acerca de tu lesión articular y encontrar la mejor solución para ti.
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onNavigate('/el-doctor');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full border-2 border-[#00c3e6] bg-white hover:bg-[#00c3e6] text-[#00a8ca] hover:text-white px-8 py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-md hover:scale-105"
                >
                  <span>CONOCE MÁS SOBRE MÍ</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Left Column (order-2 on mobile, order-1 on lg): Doctor Photo inside Piskulich Framed Border Box */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 pt-4 lg:pt-0">
              <div className="relative w-full max-w-[360px]">
                {/* Yellow/Amber Accent Frame as seen in Piskulich Screenshot */}
                <div className="rounded-[2.5rem] border-3 border-amber-400 p-2 sm:p-3 bg-white shadow-2xl relative">
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-slate-100">
                    <img 
                      src={doctorDeskImg} 
                      alt="Dr. Omar Pajares Tequen en consultorio" 
                      className="h-full w-full object-cover object-top hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Factor Diferencial (Light Section with High Contrast) */}
      <section className="relative overflow-hidden bg-slate-50 py-20 text-slate-900 border-b border-slate-200">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100/80 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#00a8ca] border border-cyan-200">
              <Eye className="h-4 w-4" />
              EL FACTOR DIFERENCIAL
            </span>
            <h2 className="font-serif text-3xl font-black text-slate-950 md:text-4xl uppercase">
              Evaluación y Procedimiento Ecoguiado de Precisión
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed">
              En la consulta del Dr. Omar Pajares, la <strong className="text-[#00a8ca]">ecografía de alta resolución</strong> nos permite examinar las articulaciones y guiarnos con máxima precisión durante la aplicación del tratamiento cuando el caso lo requiere.
            </p>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {/* Step 1: Ecographic Evaluation */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col group">
              <div className="h-52 sm:h-60 w-full relative overflow-hidden bg-slate-900">
                <img 
                  src={doctorEcografiaImg} 
                  alt="Dr. Omar Pajares en evaluación ecográfica in situ"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-[#00243d]/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/40 text-[10px] font-black uppercase text-cyan-300 tracking-wider">
                  EVALUACIÓN ECOGRÁFICA IN SITU
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#02111c] text-[#00c3e6] font-black mb-4 shadow-sm">
                    <Scan className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#00a8ca]">PASO 1</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-950 mt-1 uppercase">1. EVALUACIÓN ECOGRÁFICA IN SITU</h3>
                  <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
                    Exploramos la articulación o tendón afectado en tiempo real durante tu consulta clínica con ecógrafo de alta resolución Vinno.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Visualización de cartílagos, meniscos, tendones y ligamentos",
                      "Detección de derrames y micro-desgarros no visibles a simple vista",
                      "Permite afinar el diagnóstico exacto en la misma cita"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-[#00a8ca] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 2: Ecoguided Application & Biotherapy */}
            <div className="rounded-3xl border border-slate-200 bg-white overflow-hidden shadow-md hover:shadow-lg transition-all flex flex-col group">
              <div className="h-52 sm:h-60 w-full relative overflow-hidden bg-slate-900">
                <img 
                  src={doctorCelulasMadreImg} 
                  alt="Dr. Omar Pajares con Células Madre en Cabina de Flujo Laminar"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute top-4 left-4 bg-[#00243d]/90 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/50 text-[10px] font-black uppercase text-amber-300 tracking-wider">
                  CABINA DE FLUJO LAMINAR Y APLICACIÓN
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#02111c] text-[#00c3e6] font-black mb-4 shadow-sm">
                    <Target className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-[#00a8ca]">PASO 2</span>
                  <h3 className="font-serif text-2xl font-bold text-slate-950 mt-1 uppercase">2. APLICACIÓN ECOGUIADA MILIMÉTRICA</h3>
                  <p className="text-slate-600 text-xs md:text-sm mt-3 leading-relaxed">
                    Preparación estéril de Células Madre y PRP en cabina de flujo laminar e infiltración guiada por ecografía al punto exacto.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Procesamiento estéril con máximos estándares de bioseguridad",
                      "Dirige el biológico exactamente hacia la zona anatómica a reparar",
                      "Procedimiento seguro, limpio y enfocado en la regeneración"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-[#00a8ca] mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2B. ÁREAS Y ZONAS DE ESPECIALIZACIÓN (Rodilla & Lumbar como Foco Principal) */}
      <section className="py-16 md:py-20 bg-white border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#00a8ca] border border-cyan-200">
              SEGMENTACIÓN CLÍNICA ESPECIALIZADA
            </span>
            <h2 className="font-serif text-3xl font-black text-[#00243d] md:text-4xl uppercase">
              Áreas Anatómicas que Tratamos
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
              Especializados principalmente en <strong className="text-slate-950 font-bold">Rodilla y Hernia Discal Lumbar</strong> sin cirugía, abordando también lesiones complejas en otras articulaciones clave.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Main Focus 1: Rodilla */}
            <div className="rounded-2xl bg-[#00243d] text-white p-7 border border-[#003d66] shadow-xl space-y-4 relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00c3e6]/10 text-[#00c3e6] border border-[#00c3e6]/30">
                    <Target className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00c3e6] bg-[#00c3e6]/10 px-2.5 py-0.5 rounded border border-[#00c3e6]/20">
                      ESPECIALIDAD PRINCIPAL
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-black text-white uppercase tracking-tight">
                DOLOR DE RODILLA
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Tratamiento biológico regenerativo ecoguiado diseñado para recuperar la movilidad y evitar cirugías o prótesis.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200 font-medium pt-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00c3e6] shrink-0" />
                  <span>Artrosis de Rodilla (Grados I a IV)</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00c3e6] shrink-0" />
                  <span>Lesiones y Ruptura de Meniscos</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00c3e6] shrink-0" />
                  <span>Tendinitis y Desgaste de Cartílago</span>
                </li>
              </ul>
            </div>

            {/* Main Focus 2: Columna Lumbar */}
            <div className="rounded-2xl bg-[#00243d] text-white p-7 border border-[#003d66] shadow-xl space-y-4 relative overflow-hidden group">
              <div className="flex items-center justify-between border-b border-cyan-500/20 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00c3e6]/10 text-[#00c3e6] border border-[#00c3e6]/30">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#00c3e6] bg-[#00c3e6]/10 px-2.5 py-0.5 rounded border border-[#00c3e6]/20">
                      ESPECIALIDAD PRINCIPAL
                    </span>
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-2xl font-black text-white uppercase tracking-tight">
                HERNIA DISCAL LUMBAR
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Desinflamación profunda y regeneración tisular de la columna vertebral sin pasar por el quirófano.
              </p>
              <ul className="space-y-2.5 text-xs text-slate-200 font-medium pt-2">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00c3e6] shrink-0" />
                  <span>Hernia Discal Lumbar y Protrusiones</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00c3e6] shrink-0" />
                  <span>Ciática y Compresión Radicular</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#00c3e6] shrink-0" />
                  <span>Lumbalgia Crónica y Fascitis</span>
                </li>
              </ul>
            </div>

            {/* Secondary Areas Box */}
            <div className="md:col-span-2 lg:col-span-1 rounded-2xl bg-slate-50 p-7 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00a8ca] bg-cyan-50 border border-cyan-200 px-2.5 py-1 rounded">
                  OTRAS ZONAS TRATADAS
                </span>
                <h3 className="font-serif text-xl font-extrabold text-slate-900 mt-3 uppercase tracking-tight">
                  OTRAS ARTICULACIONES
                </h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Evaluación y tratamiento regenerativo no quirúrgico para dolor e inflamación crónica en:
                </p>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700 font-semibold">
                  <li className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#00a8ca]"></span>
                    <span><strong>Hombro:</strong> Manguito rotador y bursitis.</span>
                  </li>
                  <li className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#00a8ca]"></span>
                    <span><strong>Cadera:</strong> Artrosis y trocanteritis.</span>
                  </li>
                  <li className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#00a8ca]"></span>
                    <span><strong>Tobillo y Pie:</strong> Fascitis plantar y esguinces.</span>
                  </li>
                  <li className="flex items-center gap-2.5 bg-white p-2.5 rounded-xl border border-slate-200 shadow-2xs">
                    <span className="h-2 w-2 rounded-full bg-[#00a8ca]"></span>
                    <span><strong>Codo:</strong> Epicondilitis y tendinopatías.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. NUESTROS TRATAMIENTOS Section (Piskulich Style Grid) */}
      <section className="relative overflow-hidden bg-[#f4f7f9] py-20 md:py-28 text-slate-900 border-b border-slate-200">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-xs font-black uppercase tracking-widest text-[#00a8ca] shadow-sm">
              <Syringe className="h-4 w-4" />
              MEDICINA REGENERATIVA Y AUTÓLOGA
            </span>
            <h2 className="font-serif text-3xl font-black text-[#00385d] md:text-5xl uppercase tracking-tight">
              NUESTROS TRATAMIENTOS
            </h2>
            <p className="text-slate-600 text-xs md:text-sm leading-relaxed max-w-2xl mx-auto font-medium">
              Procedimientos ambulatorios de alta biotecnología ecoguiada para estimular la autoreparación articular sin necesidad de cirugía.
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {TREATMENTS.map((proc, index) => {
              const Icon = index === 0 ? Syringe : index === 1 ? Dna : Sparkles;

              return (
                <div
                  key={proc.id}
                  className="group relative rounded-3xl p-8 bg-white border border-slate-200/90 shadow-lg flex flex-col justify-between items-center text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#00c3e6]"
                >
                  <div>
                    {/* Outline Circle Icon */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#00c3e6] text-[#00385d] bg-cyan-50/50 mb-6 group-hover:bg-[#00c3e6] group-hover:text-white transition-all shadow-sm">
                      <Icon className="h-9 w-9" />
                    </div>

                    <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-cyan-50 text-[#00a8ca] border border-cyan-200">
                      {proc.badge}
                    </span>

                    <h3 className="font-serif text-xl font-black text-[#00385d] mt-4 uppercase leading-snug">
                      {proc.title}
                    </h3>

                    <p className="text-slate-600 text-xs mt-3 leading-relaxed font-medium">
                      {proc.cardDesc}
                    </p>
                  </div>

                  {/* VER MÁS Button (Piskulich Cyan Pill Style) */}
                  <div className="mt-8 pt-4 w-full">
                    <button
                      onClick={() => onSelectTreatment(proc.id)}
                      className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-[#00c3e6] hover:bg-[#00a8ca] px-8 py-3.5 text-xs font-black uppercase tracking-widest text-white transition-all duration-300 shadow-md hover:scale-105"
                    >
                      <span>VER MÁS</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3B. Animated Stats Counter Section (Dr. Piskulich Dark Clinical Banner Style) */}
      <section className="relative overflow-hidden bg-[#011627] py-16 md:py-20 text-white border-y border-slate-800">
        {/* Background dark overlay with subtle blue glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,195,230,0.12)_0%,rgba(1,22,39,0.95)_70%)] pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-900/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center text-left">
            
            {/* Stat 1: Infiltraciones Ecoguiadas */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-16 w-2 rounded-full bg-gradient-to-b from-amber-400 to-amber-500 shrink-0 shadow-lg shadow-amber-500/20"></div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <AnimatedCounter end={45000} prefix="+" duration={2200} />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-200 mt-1 uppercase tracking-wide leading-tight">
                  Infiltraciones Ecoguiadas
                </p>
              </div>
            </div>

            {/* Stat 2: Pacientes Tratados */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-16 w-2 rounded-full bg-gradient-to-b from-cyan-400 to-cyan-500 shrink-0 shadow-lg shadow-cyan-500/20"></div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <AnimatedCounter end={12000} prefix="+" duration={2000} />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-200 mt-1 uppercase tracking-wide leading-tight">
                  Pacientes Tratados
                </p>
              </div>
            </div>

            {/* Stat 3: Años de Experiencia */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-16 w-2 rounded-full bg-slate-600 shrink-0"></div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <AnimatedCounter end={10} prefix="+" duration={1800} />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-200 mt-1 uppercase tracking-wide leading-tight">
                  Años de Experiencia
                </p>
              </div>
            </div>

            {/* Stat 4: Cirugías Innecesarias */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-16 w-2 rounded-full bg-slate-600 shrink-0"></div>
              <div>
                <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <AnimatedCounter end={0} suffix="%" duration={1500} />
                </div>
                <p className="text-xs sm:text-sm font-bold text-slate-200 mt-1 uppercase tracking-wide leading-tight">
                  Cirugías Innecesarias
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FAQs Section */}
      <section className="py-16 bg-white border-b border-slate-200 md:py-24">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a8ca]">RESOLVEMOS TUS DUDAS</span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold text-[#00385d] md:text-4xl uppercase">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-slate-50/50 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#00a8ca] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Bottom CTA Banner (High-Contrast Expert Design on Light Canvas) */}
      <section className="relative bg-gradient-to-b from-white via-cyan-50/50 to-slate-100 text-slate-900 pt-16 pb-32 border-t border-slate-200 overflow-hidden">
        {/* Subtle cyan glow behind card */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-200/40 blur-3xl rounded-full pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
          <div className="rounded-3xl bg-white border-2 border-cyan-400/40 p-8 sm:p-12 shadow-2xl text-center space-y-5 relative overflow-hidden">
            {/* Ambient corner light */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-100/60 rounded-full blur-2xl pointer-events-none"></div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-[#00385d] text-[#00c3e6] px-4 py-1.5 text-xs font-black uppercase tracking-widest border border-cyan-500/30 shadow-sm">
                CONSULTA MÉDICA ESPECIALIZADA
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#00243d] uppercase tracking-tight">
              Recupera tu calidad de vida <span className="text-[#00a8ca]">sin cirugías</span>
            </h2>

            <p className="mx-auto max-w-xl text-slate-600 text-xs sm:text-sm font-medium leading-relaxed">
              Completa tu formulario para reservar tu cita médica de evaluación ecográfica directa con el Dr. Omar Pajares.
            </p>

            <div className="pt-3">
              <button
                onClick={handleCtaClick}
                className="cursor-pointer inline-flex items-center justify-center gap-3 rounded-full bg-[#00c3e6] hover:bg-[#0092ad] text-white px-10 py-4 font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-cyan-500/25 hover:scale-105"
              >
                <span>AGENDAR CITA</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
