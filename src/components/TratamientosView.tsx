import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  CheckCircle2, 
  Syringe,
  Dna,
  ShieldCheck,
  Target,
  ChevronDown,
  ArrowRight,
  Activity,
  Flame,
  Layers,
  HeartPulse,
  UserCheck
} from 'lucide-react';
import { ViewPath } from '../types';
import { TREATMENTS } from '../data/treatments';
import TreatmentDetailView from './TreatmentDetailView';
import { clinicBgImg } from '../assets/imageData';

interface TratamientosViewProps {
  onNavigate: (view: ViewPath) => void;
  selectedTreatmentId?: string | null;
  onSelectTreatment?: (id: string) => void;
  onClearTreatment?: () => void;
  onOpenAppointmentModal?: (msg?: string) => void;
}

export default function TratamientosView({ 
  onNavigate, 
  selectedTreatmentId, 
  onSelectTreatment, 
  onClearTreatment,
  onOpenAppointmentModal
}: TratamientosViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleCtaClick = () => {
    if (onOpenAppointmentModal) {
      onOpenAppointmentModal('Hola Dr. Omar Pajares, me comunico desde la página web para consultar sobre los tratamientos ecoguiados y agendar mi cita.');
    } else {
      onNavigate('/reservar-cita');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // If a treatment is selected, show the detailed explanation view matching images 1-5
  const currentTreatment = TREATMENTS.find(t => t.id === selectedTreatmentId);

  if (currentTreatment) {
    return (
      <TreatmentDetailView
        treatment={currentTreatment}
        onNavigate={onNavigate}
        onOpenAppointmentModal={onOpenAppointmentModal}
        onBack={() => {
          if (onClearTreatment) {
            onClearTreatment();
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  const pathologies = [
    {
      title: "Artrosis y Meniscopatía de Rodilla",
      desc: "Tratamiento ecoguiado del desgaste del cartílago y lesiones meniscales para recuperar la flexión y caminata sin dolor.",
      icon: Activity,
      items: ["Artrosis de rodilla (grados I-IV)", "Rupturas y lesiones de menisco", "Tendinitis rotuliana y pata de ganso"]
    },
    {
      title: "Artrosis y Bursitis de Cadera",
      desc: "Manejo no quirúrgico del dolor inguinal y lateral de cadera que limita el paso o el movimiento cotidiano.",
      icon: Target,
      items: ["Artrosis coxofemoral", "Bursitis trocantérea lateral", "Pinzamiento articular y rigidez"]
    },
    {
      title: "Hernia Discal Lumbar y Columna",
      desc: "Manejo de la lumbociática crónica reduciendo la inflamación de la raíz nerviosa sin recurrir a cirugía.",
      icon: Flame,
      items: ["Hernia discal L4-L5 / L5-S1", "Ciática y dolor lumbar irradiado", "Discopatía degenerativa"]
    },
    {
      title: "Tendinitis de Codo y Hombro",
      desc: "Tratamiento de epicondilitis (codo de tenista) y lesiones del manguito rotador en el hombro.",
      icon: HeartPulse,
      items: ["Epicondilitis lateral y medial", "Tendinitis del manguito rotador", "Pinzamiento subacromial de hombro"]
    },
    {
      title: "Fascitis Plantar y Tendinitis de Aquiles",
      desc: "Alivio del dolor punzante en el talón al dar los primeros pasos del día y tendinopatías en el tobillo.",
      icon: Layers,
      items: ["Fascitis plantar recalcitrante", "Tendinitis aquileana crónica", "Espolón calcáneo sintomático"]
    }
  ];

  const faqs = [
    {
      q: "¿Cómo garantiza la ecografía la efectividad del tratamiento?",
      a: "El ecógrafo nos permite observar con nitidez la aguja y la estructura lesionada en tiempo real durante la aplicación. De esta forma aseguramos que el PRP, las células madre o la proloterapia queden depositados exactamente en el sitio exacto de la lesión."
    },
    {
      q: "¿Los tratamientos son dolorosos?",
      a: "Son procedimientos mínimamente invasivos y ambulatorios. Al ser ecoguiados, la aplicación es rápida, limpia y muy bien tolerada por los pacientes."
    },
    {
      q: "¿Cuántas sesiones necesitaré?",
      a: "Varía según tu diagnóstico. Tras la evaluación ecográfica in situ en tu consulta, el Dr. Omar Pajares determinará el protocolo personalizado y el número de aplicaciones estimadas."
    }
  ];

  return (
    <div>
      {/* 1. Hero header with Clinic Background Image and Teal Gradient Overlay */}
      <section className="relative overflow-hidden py-20 md:py-28 text-white border-b border-cyan-900">
        {/* Clinic Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src={clinicBgImg} 
            alt="Clínica y consultorio médico" 
            className="w-full h-full object-cover object-center"
          />
          {/* Cyan / Dark Teal Overlay for readability and professional feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#003d5c]/95 via-[#005a80]/90 to-[#00243d]/95 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 text-center space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 bg-white/10 backdrop-blur-md px-5 py-2 text-xs font-black uppercase tracking-widest text-cyan-200 shadow-lg">
            <Sparkles className="h-4 w-4 text-cyan-300" />
            MEDICINA REGENERATIVA Y REHABILITACIÓN
          </span>

          <h1 className="font-serif text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl uppercase leading-tight drop-shadow-md">
            NUESTROS TRATAMIENTOS <span className="text-[#00c3e6] underline decoration-cyan-400 decoration-4 underline-offset-8">REGENERATIVOS</span>
          </h1>

          <p className="mx-auto max-w-3xl text-slate-100 text-sm md:text-base leading-relaxed font-medium">
            El <strong className="text-white font-bold">Dr. Omar Pajares Tequen</strong> ofrece procedimientos biológicos avanzados para regenerar cartílago, tendones y ligamentos sin recurrir a cirugías ni prótesis.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => {
                onNavigate('/reservar-cita');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="cursor-pointer inline-flex items-center justify-center gap-3 rounded-full bg-[#00c3e6] hover:bg-white hover:text-[#00385d] text-white font-black text-xs uppercase tracking-widest px-8 py-4 transition-all duration-300 shadow-xl hover:scale-105"
            >
              <span>AGENDAR MI CITA</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 2. Highlight Benefits Band */}
      <section className="bg-gradient-to-r from-[#002b47] via-[#00385d] to-[#00243d] border-b border-cyan-900/60 py-6 text-white">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
          
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00c3e6]/20 text-[#00c3e6]">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-xs font-black text-white uppercase tracking-wider">Procedimientos Autólogos</h4>
              <p className="text-[11px] text-cyan-200">Biológicos 100% seguros y naturales</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00c3e6]/20 text-[#00c3e6]">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-xs font-black text-white uppercase tracking-wider">Atención Especializada</h4>
              <p className="text-[11px] text-cyan-200">Evaluación médica presencial directa</p>
            </div>
          </div>

          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#00c3e6]/20 text-[#00c3e6]">
              <Target className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-serif text-xs font-black text-white uppercase tracking-wider">Sin Tiempo de Incapacidad</h4>
              <p className="text-[11px] text-cyan-200">Tratamientos ambulatorios y efectivos</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. Detailed Procedures Grid */}
      <section className="py-16 md:py-24 bg-[#f4f7f9] text-slate-900 border-b border-slate-200 relative overflow-hidden">
        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-100/80 px-3.5 py-1 text-xs font-black uppercase tracking-widest text-[#00a8ca] border border-cyan-200">
              TRATAMIENTOS ESPECIALIZADOS
            </span>
            <h2 className="font-serif text-3xl font-black text-[#00385d] md:text-4xl uppercase">
              Procedimientos Biológicos <span className="text-[#00a8ca]">Sin Cirugía</span>
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
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

                  {/* VER MÁS Button */}
                  <div className="mt-8 pt-4 w-full">
                    <button
                      onClick={() => {
                        if (onSelectTreatment) {
                          onSelectTreatment(proc.id);
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
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

      {/* 4. Patologías que tratamos */}
      <section className="py-16 bg-white md:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a8ca]">DIAGNÓSTICO Y COBERTURA</span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold text-[#00385d] md:text-4xl uppercase">
              Enfermedades y Lesiones Tratadas
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pathologies.map((patho, idx) => {
              const Icon = patho.icon;
              return (
                <div key={idx} className="border border-slate-200 bg-slate-50/50 rounded-2xl p-6 hover:shadow-md transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#00243d] text-[#00c3e6]">
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <h3 className="font-serif text-base font-bold text-slate-900">{patho.title}</h3>
                  </div>
                  <p className="text-slate-600 text-xs leading-relaxed">{patho.desc}</p>
                  <ul className="mt-4 space-y-2 border-t border-slate-200/60 pt-3">
                    {patho.items.map((it, i) => (
                      <li key={i} className="flex items-center gap-2 text-[11px] font-semibold text-slate-700">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#00a8ca] shrink-0" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FAQs */}
      <section className="py-16 bg-slate-50 md:py-24 border-b border-slate-200">
        <div className="mx-auto max-w-3xl px-4">
          <div className="text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#00a8ca]">RESOLVEMOS TUS DUDAS</span>
            <h2 className="mt-2 font-serif text-3xl font-extrabold text-[#00385d] md:text-4xl uppercase">
              Preguntas sobre los Procedimientos
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-slate-900 text-sm md:text-base cursor-pointer hover:bg-slate-50 transition-colors"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-[#00a8ca] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. CTA Bottom */}
      <section className="relative bg-gradient-to-b from-white via-cyan-50/50 to-slate-100 text-slate-900 pt-16 pb-32 border-t border-slate-200 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl bg-white border-2 border-cyan-400/40 p-8 sm:p-10 shadow-2xl text-center space-y-4">
            <h2 className="font-serif text-2xl font-black text-[#00243d] md:text-3xl uppercase">
              Solicita tu Evaluación Ecoguiada hoy
            </h2>
            <p className="mx-auto max-w-md text-slate-600 text-xs md:text-sm font-medium">
              Completa tu formulario de cita médica para agendar tu consulta directa con el Dr. Omar Pajares.
            </p>
            <div className="pt-3">
              <button
                onClick={handleCtaClick}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-[#00c3e6] hover:bg-[#0092ad] text-white px-8 py-3.5 font-black uppercase tracking-widest text-xs transition-colors shadow-xl shadow-cyan-500/20 hover:scale-105"
              >
                <span>AGENDAR CITA MÉDICA</span>
                <ArrowRight className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
