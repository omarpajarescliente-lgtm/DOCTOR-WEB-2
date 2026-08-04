import { useState } from 'react';
import { 
  CheckCircle2, 
  GraduationCap, 
  User, 
  Star, 
  ArrowRight,
  Award,
  Globe,
  Maximize2,
  X
} from 'lucide-react';
import { ViewPath } from '../types';
import { siteConfig } from '../config';

// Import real photos of Dr. Omar Pajares
import { 
  doctorDeskImg, 
  doctorEcografiaImg, 
  doctorCelulasMadreImg, 
  doctorCutoutCleanImg, 
  clinicBgImg,
  aaomCertificateImg
} from '../assets/imageData';

interface DoctorViewProps {
  onNavigate: (view: ViewPath) => void;
  onOpenAppointmentModal?: (msg?: string) => void;
}

export default function DoctorView({ onNavigate, onOpenAppointmentModal }: DoctorViewProps) {
  const [showCertModal, setShowCertModal] = useState(false);

  const handleCtaClick = () => {
    if (onOpenAppointmentModal) {
      onOpenAppointmentModal('Hola Dr. Omar Pajares, me comunico desde la página web para agendar una cita médica especializada.');
    } else {
      onNavigate('/reservar-cita');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  const trajectoryItems = [
    "Médico Especialista en Medicina Física y Rehabilitación.",
    "Certificado Internacional por la AAOM (American Association of Orthopaedic Medicine, USA - IROM-C).",
    "Entrenamiento e Intervencionismo en Ecografía Musculoesquelética en Tiempo Real.",
    "Enfoque Avanzado en Medicina Regenerativa: Células Madre, PRP, Exosomas y Proloterapia."
  ];

  return (
    <div className="bg-white text-slate-900 overflow-x-hidden font-sans">
      
      {/* 1. HERO BANNER - Clinic Background Overlay & Piskulich Framed Doctor Image */}
      <section className="relative bg-[#00243d] text-white pt-12 pb-0 md:pt-16 md:pb-0">
        {/* Background Clinic Image with Dark Teal Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={clinicBgImg} 
            alt="Consultorio médico Dr. Omar Pajares" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#001c30]/95 via-[#002b47]/90 to-[#001a2e]/95 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:grid-cols-12 items-center">
            
            {/* Title & Headline Left */}
            <div className="md:col-span-7 space-y-4 text-left z-10">
              <span className="inline-block bg-[#00c3e6] text-white text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-md font-mono shadow-sm">
                MEDICINA REGENERATIVA ECOGUIADA
              </span>
              
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase tracking-tight leading-none drop-shadow-md">
                DR. OMAR<br />PAJARES
              </h1>
              
              <p className="text-lg md:text-xl font-bold text-cyan-300 tracking-wide pt-1">
                Médico Fisiatra — Esp. en Medicina Regenerativa
              </p>

              <p className="text-sm md:text-base text-slate-200 max-w-xl leading-relaxed pt-2 font-medium">
                Tratamiento especializado en <strong className="text-white">Rodilla (Artrosis y Meniscos Rotos) y Hernia Discal Lumbar</strong> mediante infiltraciones ecoguiadas de Plasma Rico en Plaquetas (PRP), Exosomas y Células Madre.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleCtaClick}
                  className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#00c3e6] hover:bg-white hover:text-[#00243d] text-white px-8 py-4 font-black uppercase tracking-wider text-xs md:text-sm transition-all duration-300 hover:scale-105 shadow-xl shadow-cyan-950/50"
                >
                  <span>AGENDAR CITA MÉDICA</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Doctor Hero Image Right (Large Cutout Image matching HomeView) */}
            <div className="md:col-span-5 relative flex flex-col items-center justify-end h-full pt-4 md:pt-0 z-20">
              <div className="relative w-full max-w-[540px] sm:max-w-[600px] lg:max-w-[660px] flex items-end justify-center">
                {/* Soft ambient cyan backlight radial glow behind doctor */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-cyan-400/20 blur-3xl -z-10 pointer-events-none"></div>

                {/* Large Doctor Cutout Image sitting flush at bottom edge with mask gradient */}
                <div 
                  className="relative w-full flex items-end justify-center translate-y-6 sm:translate-y-8 lg:translate-y-12 -mb-6 sm:-mb-10 lg:-mb-14 pointer-events-none"
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

                {/* Floating Info Badge on the bottom left */}
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
            </div>

          </div>
        </div>

        {/* Curved Wave Bottom Divider (Piskulich signature style) */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none z-30">
          <svg className="relative block w-full h-12 md:h-20 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 2. SECTION 2: STATS & ¿QUIÉN SOY? (Piskulich Layout Clone) */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Block: 3 Bullet Stats with Cyan Checks */}
            <div className="lg:col-span-4 space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white font-black shadow-md">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-extrabold text-slate-950">+45,000 Infiltraciones Ecoguiadas</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Procedimientos guiados por ecografía in situ para máxima precisión y seguridad.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white font-black shadow-md">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-extrabold text-slate-950">+12,000 Pacientes Tratados</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Casos con alta efectividad en alivio del dolor y recuperación de movilidad sin cirugías.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white font-black shadow-md">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-serif text-base font-extrabold text-slate-950">+10 Años de Experiencia</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">Dedicados exclusivamente al tratamiento regenerativo de articulaciones y columna.</p>
                </div>
              </div>
            </div>

            {/* Center Block: Doctor Image Frame with Offset Deep Navy Border (hidden on mobile to prevent stacked photos, visible on lg) */}
            <div className="lg:col-span-4 hidden lg:flex justify-center">
              <div className="relative w-full max-w-[320px]">
                {/* Deep Steel Ocean Navy Background Card Frame */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-[#00385d]"></div>
                
                {/* Foreground Image Container */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl bg-slate-100 border-2 border-slate-200 shadow-xl group">
                  <img 
                    src={doctorDeskImg} 
                    alt="Dr. Omar Pajares Tequen en consultorio"
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-3 left-3 right-3 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl text-center">
                    <p className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider">Atención Especializada</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Block: ¿QUIÉN SOY? Card Box */}
            <div className="lg:col-span-4">
              <div className="rounded-3xl bg-[#f2f5f8] p-8 border border-slate-200/80 shadow-sm space-y-5">
                
                {/* Cyan Header Box with WHITE text as in original web */}
                <div className="inline-block bg-[#00c3e6] text-white font-black uppercase text-xl md:text-2xl px-6 py-2.5 rounded-lg shadow-sm font-serif">
                  ¿QUIÉN SOY?
                </div>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                  Soy el <strong className="text-slate-950 font-bold">Dr. Omar Pajares Tequen</strong>, médico especialista en Medicina Física y Rehabilitación, dedicado a abordar el dolor articular, tendinoso y muscular desde una perspectiva integral no quirúrgica.
                </p>

                <p className="text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                  Mi práctica se basa en la aplicación precisa de <strong className="text-[#00a8ca] font-bold">Medicina Regenerativa Ecoguiada</strong> (PRP, Células Madre y Proloterapia), ayudando a mis pacientes a recuperar su autonomía, calidad de vida y bienestar sin necesidad de someterse a cirugías invasivas.
                </p>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SECTION 3: CONOCE MI HISTORIA (Personal vs Profesional) */}
      <section className="py-16 md:py-24 bg-[#f8fafc] border-t border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Column: Photo Frame with Gold Border (Order 2 on mobile, Order 1 on lg) */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1 pt-4 lg:pt-0">
              <div className="relative w-full max-w-[340px]">
                {/* Gold rounded frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl border-4 border-amber-400 shadow-2xl bg-slate-900 group">
                  <img 
                    src={doctorEcografiaImg} 
                    alt="Dr. Omar Pajares Tequen"
                    className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00243d]/90 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-amber-300 font-bold">
                      Médico Fisiatra — Especialista Regenerativo
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 2 Cards (Personal & Profesional) (Order 1 on mobile, Order 2 on lg) */}
            <div className="lg:col-span-7 grid gap-6 sm:grid-cols-2 order-1 lg:order-2">
              
              {/* Card 1: Personal */}
              <div className="rounded-3xl bg-white p-7 border border-slate-200 shadow-md flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-[#00a8ca] mb-4">
                    <User className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-extrabold text-slate-950">Personal</h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-3 leading-relaxed">
                    Desde el inicio de mi formación sentí una profunda vocación por el alivio del dolor musculoesquelético. Entender el impacto limitante que genera la artrosis o una lesión articular en la vida cotidiana de una persona me motivó a buscar soluciones médicas efectivas y seguras.
                  </p>
                </div>
              </div>

              {/* Card 2: Profesional */}
              <div className="rounded-3xl bg-white p-7 border border-slate-200 shadow-md flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-[#00a8ca] mb-4">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <h3 className="font-serif text-xl font-extrabold text-slate-950">Profesional</h3>
                  <p className="text-xs md:text-sm text-slate-600 mt-3 leading-relaxed">
                    Médico Especialista en Fisiatría. Me he especializado en el uso del ecógrafo de alta resolución para diagnósticos articular in situ y en la aplicación milimétrica de terapias biológicas (PRP, Células Madre y Proloterapia) en Jesús María, Lima.
                  </p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>



      {/* 4. SECTION 4: TRAYECTORIA PROFESIONAL (Piskulich Vibrant Ocean Blue Banner with Oversized Floating Circle Photo) */}
      <section className="relative bg-[#0082ba] text-white py-20 md:py-28 overflow-visible">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg className="relative block w-full h-10 md:h-16 text-[#f8fafc] fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,0 L0,0 Z"></path>
          </svg>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-serif text-3xl font-black text-white md:text-4xl lg:text-5xl uppercase tracking-tight">
              TRAYECTORIA PROFESIONAL
            </h2>
          </div>

          <div className="grid gap-12 lg:grid-cols-12 items-center">
            
            {/* Left Side: 3 White Pill Boxes with Checkmarks */}
            <div className="lg:col-span-7 space-y-5">
              {trajectoryItems.map((text, idx) => (
                <div 
                  key={idx}
                  className="bg-white text-slate-900 rounded-2xl p-5 md:p-6 shadow-xl flex items-center gap-4 transition-transform hover:scale-[1.02]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white font-black shadow-sm">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <p className="font-serif text-xs md:text-sm font-bold text-slate-900 leading-snug">
                    {text}
                  </p>
                </div>
              ))}
            </div>

            {/* Right Side: Oversized Circular Photo Frame (visible on lg, hidden on mobile to prevent photo clutter) */}
            <div className="lg:col-span-5 hidden lg:flex justify-center items-center">
              <div className="relative w-72 h-72 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px] rounded-full border-[10px] border-white/90 shadow-2xl overflow-hidden bg-slate-100 lg:-my-10 z-20 transition-transform duration-300 hover:scale-105">
                <img 
                  src={doctorDeskImg} 
                  alt={siteConfig.doctorName}
                  className="h-full w-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Wave */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
          <svg className="relative block w-full h-10 md:h-16 text-white fill-current" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,60 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* 5. SECTION 5: PREMIOS Y RECONOCIMIENTOS & SOCIEDADES MÉDICAS */}
      <section className="py-16 md:py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
          
          {/* Part A: Premios y Reconocimientos */}
          <div>
            <div className="text-center max-w-3xl mx-auto mb-10">
              <h2 className="font-serif text-3xl font-black text-[#00c3e6] md:text-4xl lg:text-5xl uppercase tracking-tight">
                PREMIOS Y RECONOCIMIENTOS
              </h2>
            </div>

            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              
              {/* Cyan Card */}
              <div className="bg-[#00c3e6] text-white rounded-2xl p-8 shadow-lg text-center flex flex-col items-center justify-center space-y-4">
                <Star className="h-16 w-16 text-white stroke-[1.5] fill-none" />
                <h3 className="font-serif text-lg md:text-xl font-black uppercase tracking-wide text-white">
                  EXCELENCIA EN INTERVENCIONISMO ECOGUIADO
                </h3>
                <p className="text-xs md:text-sm font-medium text-white/95 leading-relaxed max-w-md">
                  Reconocimiento a la aplicación precisa de biológicos articulares con ecógrafo de alta resolución en tiempo real.
                </p>
              </div>

              {/* Deep Steel Ocean Navy Card */}
              <div className="bg-[#00385d] text-white rounded-2xl p-8 shadow-lg text-center flex flex-col items-center justify-center space-y-4">
                <Star className="h-16 w-16 text-white stroke-[1.5] fill-none" />
                <h3 className="font-serif text-lg md:text-xl font-black uppercase tracking-wide text-white">
                  EFECTIVIDAD EN TRATAMIENTOS REGENERATIVOS
                </h3>
                <p className="text-xs md:text-sm text-white/90 leading-relaxed max-w-md">
                  Pionero en la aplicación de Plasma Rico en Plaquetas (PRP), Células Madre y Proloterapia para evitar cirugías invasivas.
                </p>
              </div>

            </div>
          </div>

          {/* Part A.2: CERTIFICACIÓN INTERNACIONAL AAOM (USA) */}
          <div className="pt-6">
            <div className="rounded-3xl bg-gradient-to-br from-[#001c30] via-[#00385d] to-[#00243d] text-white p-8 sm:p-10 border-2 border-amber-400/60 shadow-2xl relative overflow-hidden max-w-5xl mx-auto">
              {/* Background ambient glow */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

              <div className="grid gap-8 lg:grid-cols-12 items-center relative z-10">
                {/* Left Text Info */}
                <div className="lg:col-span-7 space-y-4 text-left">
                  <div className="inline-flex items-center gap-2 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider font-mono">
                    <span>🇺🇸 CERTIFICACIÓN INTERNACIONAL EN ESTADOS UNIDOS</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white uppercase leading-snug">
                    AAOM — American Association of Orthopaedic Medicine
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                    Certificado en <strong className="text-amber-300 font-extrabold">Inyecciones Regenerativas Intervencionistas (IROM—C Certified)</strong> por la prestigiosa Asociación Americana de Medicina Ortopédica en Estados Unidos (Designación Oficial: <em className="not-italic text-cyan-300 font-mono">October 16, 2019</em>).
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={() => setShowCertModal(true)}
                      className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 px-6 py-3 text-xs font-black uppercase tracking-wider transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      <Maximize2 className="h-4 w-4" />
                      <span>VER CERTIFICADO AAOM EE.UU.</span>
                    </button>
                    <span className="text-[11px] font-mono text-cyan-300 font-bold bg-white/10 px-3 py-1.5 rounded-full border border-cyan-400/30">
                      IROM-C CERTIFIED · USA 🇺🇸
                    </span>
                  </div>
                </div>

                {/* Right Certificate Thumbnail Preview */}
                <div className="lg:col-span-5 flex justify-center">
                  <div 
                    onClick={() => setShowCertModal(true)}
                    className="relative w-full max-w-[320px] aspect-[4/3] rounded-2xl overflow-hidden border-2 border-amber-400/80 shadow-2xl bg-white cursor-pointer group hover:scale-105 transition-all duration-300"
                  >
                    <img 
                      src={aaomCertificateImg} 
                      alt="Certificado Oficial AAOM USA - Dr. Omar Pajares" 
                      className="w-full h-full object-cover group-hover:brightness-105 transition-all"
                    />
                    <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-amber-400 text-slate-950 font-black text-xs px-4 py-2 rounded-full uppercase tracking-wider shadow-xl flex items-center gap-1.5">
                        <Maximize2 className="h-3.5 w-3.5" /> AMPLIAR CERTIFICADO
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. BOTTOM CTA BANNER */}
      <section className="relative bg-gradient-to-b from-white via-cyan-50/50 to-slate-100 text-slate-900 pt-16 pb-32 border-t border-slate-200 overflow-hidden">
        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-3xl bg-white border-2 border-cyan-400/40 p-8 sm:p-10 shadow-2xl text-center space-y-4">
            <span className="inline-block rounded-md bg-[#00385d] px-3.5 py-1.5 text-xs font-black uppercase tracking-widest text-[#00c3e6] font-mono shadow-sm border border-cyan-500/30">
              CONSULTA MÉDICA ESPECIALIZADA (S/ 200)
            </span>
            <h2 className="font-serif text-2xl font-black text-[#00243d] md:text-3xl uppercase">
              Agenda tu Evaluación con el Dr. Omar Pajares
            </h2>
            <p className="mx-auto max-w-md text-slate-600 text-xs md:text-sm font-medium">
              Atención presencial con evaluación ecográfica in situ en el consultorio de Jesús María, Lima.
            </p>
            <div className="pt-3">
              <button
                onClick={handleCtaClick}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full bg-[#00c3e6] hover:bg-[#0092ad] text-white px-9 py-4 font-black uppercase tracking-widest text-xs md:text-sm transition-transform duration-200 hover:scale-105 shadow-xl shadow-cyan-500/20"
              >
                <span>AGENDAR CITA PRESENCIAL</span>
                <ArrowRight className="h-4.5 w-4.5 text-white" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AAOM CERTIFICATE ZOOM MODAL */}
      {showCertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl p-4 sm:p-6 shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xl">🇺🇸</span>
                <div>
                  <h3 className="font-serif font-black text-slate-900 text-sm sm:text-base uppercase">
                    American Association of Orthopaedic Medicine (AAOM - USA)
                  </h3>
                  <p className="text-xs text-[#00a8ca] font-bold font-mono">
                    IROM-C CERTIFIED · Interventional Regenerative Orthopedic Medicine
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowCertModal(false)}
                className="cursor-pointer p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                title="Cerrar modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-auto flex-1 flex items-center justify-center p-2 bg-slate-50 rounded-2xl">
              <img 
                src={aaomCertificateImg} 
                alt="Certificado AAOM Oficial Dr. Omar Pajares" 
                className="w-full h-auto max-h-[70vh] object-contain shadow-lg rounded-xl border border-slate-200"
              />
            </div>

            <div className="pt-4 flex items-center justify-between text-xs text-slate-500 font-medium">
              <span>Doctor Omar Pajares Tequen, MD — October 16, 2019</span>
              <button
                onClick={() => setShowCertModal(false)}
                className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2 rounded-full uppercase tracking-wider text-[11px]"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}




