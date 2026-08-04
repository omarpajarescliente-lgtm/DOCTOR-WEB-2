import { useState } from 'react';
import { 
  CheckCircle2, 
  ChevronDown, 
  ArrowLeft,
  Calendar,
  Clock,
  Briefcase,
  Home,
  Check
} from 'lucide-react';
import { ViewPath } from '../types';
import { TreatmentData } from '../data/treatments';
import { doctorDeskImg } from '../assets/imageData';

interface TreatmentDetailViewProps {
  treatment: TreatmentData;
  onNavigate: (view: ViewPath) => void;
  onBack: () => void;
  onOpenAppointmentModal?: (msg?: string) => void;
}

export default function TreatmentDetailView({ treatment, onNavigate, onBack, onOpenAppointmentModal }: TreatmentDetailViewProps) {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleCtaClick = () => {
    if (onOpenAppointmentModal) {
      onOpenAppointmentModal(`Hola Dr. Omar Pajares, me comunico desde la página web para solicitar información sobre ${treatment.title} y agendar mi cita.`);
    } else {
      onNavigate('/reservar-cita');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden">
      
      {/* 1. TOP HERO BANNER (Piskulich Wave Blue Gradient style) */}
      <section className="relative bg-[#00385d] text-white pt-10 pb-20 md:pt-14 md:pb-28 overflow-hidden">
        {/* Subtle Radial Gradient overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#005a92] via-[#00385d] to-[#00243d] opacity-90 pointer-events-none"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Back Button */}
          <button
            onClick={onBack}
            className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 text-cyan-200 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-colors mb-6 backdrop-blur-sm border border-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a Tratamientos</span>
          </button>

          <div className="text-center max-w-4xl mx-auto space-y-4">
            <span className="inline-block bg-[#00c3e6] text-white text-xs font-black uppercase tracking-widest px-4 py-1.5 rounded-md font-mono shadow-sm">
              MEDICINA REGENERATIVA ECOGUIADA
            </span>

            <h1 className="font-serif text-3xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl uppercase leading-tight">
              {treatment.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-medium max-w-3xl mx-auto pt-2">
              {treatment.heroDesc}
            </p>
          </div>
        </div>

        {/* Bottom Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg className="relative block w-full h-10 md:h-16 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. SECTION: TIEMPO DE PROCEDIMIENTO Y FOTO DEL DOCTOR (Image 2 style) */}
      <section className="py-12 md:py-16 bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          
          <div className="grid gap-8 md:grid-cols-12 items-center">
            
            {/* Left Column: Yellow/Amber Box for Procedure Time */}
            <div className="md:col-span-7 space-y-6">
              <div className="bg-[#f59e0b] text-[#00243d] rounded-2xl p-6 md:p-8 shadow-xl space-y-4">
                <p className="text-sm md:text-base font-black uppercase tracking-wide">
                  El tiempo de procedimiento aprox.
                </p>
                
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#00243d]">
                  {treatment.timeApprox}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#00243d]/20 text-xs sm:text-sm font-extrabold">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00243d] text-[#00c3e6]">
                      <Home className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-[#00243d]/80">Tiempo de reposo:</span>
                      <span>{treatment.hospitalizationTime}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00243d] text-[#00c3e6]">
                      <Briefcase className="h-5 w-5" />
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-[#00243d]/80">Retorno al trabajo:</span>
                      <span>{treatment.returnToWorkTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Doctor Image cutout / Card */}
            <div className="md:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[320px] rounded-3xl overflow-hidden shadow-2xl border-4 border-[#00c3e6] bg-slate-900">
                <img
                  src={doctorDeskImg}
                  alt="Dr. Omar Pajares Tequen"
                  className="w-full h-auto object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00243d] via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-4 left-4 right-4 text-center text-white">
                  <p className="font-serif font-black text-sm uppercase">Dr. Omar Pajares Tequen</p>
                  <p className="text-[10px] text-cyan-200 uppercase font-mono">Especialista en Medicina Física y Rehabilitación</p>
                </div>
              </div>
            </div>

          </div>

          {/* SECTION: ¿PARA QUÉ SE REALIZA? */}
          <div className="mt-16 text-center">
            <h2 className="font-serif text-3xl font-black text-[#00385d] md:text-4xl uppercase tracking-tight">
              ¿PARA QUÉ SE REALIZA?
            </h2>
            <p className="text-slate-600 text-sm md:text-base font-bold mt-2">
              {treatment.paraQueSub}
            </p>

            {/* 3 Benefits Columns */}
            <div className="mt-10 grid gap-8 md:grid-cols-3 text-left">
              {treatment.benefits.map((b, i) => (
                <div key={i} className="flex gap-4 items-start bg-[#f8fafc] p-6 rounded-2xl border border-slate-200/80 shadow-sm">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white shadow-md mt-1">
                    <Check className="h-5 w-5 stroke-[3]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base md:text-lg font-black text-[#00385d] uppercase leading-snug">
                      {b.title}
                    </h3>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed mt-2 font-medium">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 3. SECTION: LAS INDICACIONES PARA ESTE TRATAMIENTO (Image 3 style) */}
      <section className="py-14 bg-[#f2f5f8] border-t border-b border-slate-200">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-serif text-3xl font-black text-[#00385d] md:text-4xl uppercase tracking-tight">
              LAS INDICACIONES PARA ESTE TRATAMIENTO
            </h2>

            {/* 3 Cyan Rectangles */}
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {treatment.indicacionesList.map((ind, i) => (
                <div 
                  key={i}
                  className="bg-[#00c3e6] text-white font-bold p-6 rounded-2xl text-center text-sm md:text-base flex items-center justify-center shadow-md min-h-[100px] font-serif uppercase tracking-wide"
                >
                  {ind}
                </div>
              ))}
            </div>

            <p className="text-xs md:text-sm text-slate-600 font-bold max-w-3xl mx-auto mt-6 leading-relaxed">
              {treatment.indicacionesDisclaimer}
            </p>

            {/* Long Term Banner */}
            <div className="mt-12 bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-xl space-y-3">
              <h3 className="font-serif text-2xl md:text-3xl font-black text-[#00385d] uppercase tracking-tight">
                {treatment.longTermBannerTitle}
              </h3>
              <p className="text-slate-600 text-xs md:text-sm font-semibold max-w-2xl mx-auto">
                {treatment.longTermBannerSub}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SECTION: OCEAN BLUE WAVE CTA BANNER (Image 4 style) */}
      <section className="relative bg-[#0082ba] text-white py-16 md:py-24 overflow-hidden">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg className="relative block w-full h-8 md:h-12 text-[#f2f5f8] fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,0 L0,0 Z"></path>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
          <div className="grid gap-8 md:grid-cols-12 items-center">
            
            {/* Left Content */}
            <div className="md:col-span-8 space-y-6 text-left">
              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black uppercase leading-tight tracking-tight text-white">
                SI QUIERES REALIZARTE ESTE TRATAMIENTO Y TENER UNA EVALUACIÓN PERSONALIZADA
              </h2>

              <div>
                <button
                  onClick={() => {
                    onNavigate('/reservar-cita');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="cursor-pointer inline-flex items-center justify-center gap-3 rounded-full bg-[#f59e0b] hover:bg-amber-400 text-[#00243d] px-8 py-4 font-black uppercase tracking-wider text-xs md:text-sm shadow-2xl transition-transform hover:scale-105"
                >
                  <Calendar className="h-5 w-5" />
                  <span>¡AGENDA TU CITA AHORA!</span>
                </button>
              </div>
            </div>

            {/* Right Doctor Image */}
            <div className="md:col-span-4 flex justify-center">
              <div className="w-56 h-56 sm:w-64 sm:h-64 rounded-full border-4 border-white/80 overflow-hidden shadow-2xl bg-slate-900">
                <img
                  src={doctorDeskImg}
                  alt="Dr. Omar Pajares Tequen"
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg className="relative block w-full h-8 md:h-12 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 5. SECTION: PREGUNTAS FRECUENTES (Image 5 style - Dark navy accordion bars) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl font-black text-[#00385d] md:text-4xl uppercase tracking-tight">
              PREGUNTAS FRECUENTES:
            </h2>
          </div>

          <div className="space-y-3">
            {treatment.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-xl overflow-hidden shadow-md transition-all border border-[#00385d]"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-serif font-black text-white text-sm md:text-base bg-[#00385d] hover:bg-[#002b49] transition-colors cursor-pointer"
                  >
                    <span className="pr-4 uppercase">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 shrink-0 text-cyan-300 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isOpen && (
                    <div className="p-5 text-xs md:text-sm text-slate-700 bg-slate-50 leading-relaxed font-medium border-t border-slate-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleCtaClick}
              className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-[#00c3e6] hover:bg-[#00a8ca] text-white px-9 py-4 font-black uppercase tracking-wider text-xs md:text-sm shadow-xl transition-transform hover:scale-105"
            >
              <span>AGENDAR CITA MÉDICA PRESENCIAL</span>
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
