import { useState } from 'react';
import { Printer, ShieldCheck, FileText, ArrowLeft, Send, RotateCcw, Edit3, Plus, Trash2, Globe, CreditCard, Camera, MapPin, Mail, Clock, Share2, HelpCircle } from 'lucide-react';
import { ViewPath } from '../types';
import { siteConfig } from '../config';
import { TREATMENTS } from '../data/treatments';

interface ResumenRevisionViewProps {
  onNavigate: (view: ViewPath) => void;
}

const DEFAULT_FAQS = [
  {
    pregunta: '¿Cuánto cuesta la consulta médica presencial?',
    respuesta: 'La consulta médica presencial tiene un costo de S/ 200 soles e incluye evaluación clínica integral con ecografía articular in situ realizada por el Dr. Omar Pajares (Médico Fisiatra).'
  },
  {
    pregunta: '¿Cuál es el costo referencial del tratamiento de Plasma Rico en Plaquetas (PRP)?',
    respuesta: 'La aplicación de Plasma Rico en Plaquetas (PRP) en una rodilla u otra articulación con guía ecográfica in situ tiene un costo orientativo de S/ 600 soles una vez al mes.'
  },
  {
    pregunta: '¿Qué diferencia a un Médico Fisiatra de un Fisioterapeuta?',
    respuesta: 'El Fisiatra es un Médico Cirujano con especialidad en Medicina Física y Rehabilitación que evalúa diagnósticos, realiza ecografías e inyecta procedimientos biológicos ecoguiados de precisión, mientras que el fisioterapeuta es un tecnólogo médico que ejecuta masajes o ejercicios prescritos.'
  },
  {
    pregunta: '¿Los procedimientos requieren sala de operaciones o anestesia general?',
    respuesta: 'No, todos los tratamientos son ambulatorios, indoloros y se realizan en consultorio mediante guía ecográfica en tiempo real, permitiendo volver a sus actividades normales de inmediato.'
  }
];

const DEFAULT_TRIAGE = [
  { label: 'Zona afectada', text: 'Rodilla (Artrosis / Meniscos Rotos), Hernia Discal Lumbar (Dolor Ciático), Cadera, Codo/Hombro, Fascitis Plantar, Otra articulación.' },
  { label: 'Tiempo con la molestia', text: 'Menos de 1 mes, Entre 1 y 6 meses, Más de 6 meses (dolor crónico).' },
  { label: 'Intensidad del dolor', text: 'Leve (1 a 3), Moderado (4 a 6), Severo (7 a 10).' },
  { label: 'Antecedentes médicos', text: 'No es mi primera atención, Ya usé analgésicos/fisioterapia sin éxito, Me indicaron cirugía pero busco alternativas.' },
  { label: 'Datos del Paciente', text: 'Nombre completo del paciente y número de teléfono/WhatsApp de contacto.' }
];

export default function ResumenRevisionView({ onNavigate }: ResumenRevisionViewProps) {
  // Destination phone number for receiving the doctor's feedback/edits (agency/developer number)
  const DEST_WHATSAPP = '51958297236';

  // Editable Doctor Data & Contact Info
  const [doctorData, setDoctorData] = useState({
    doctorName: siteConfig.doctorName,
    especialidad: 'Médico Fisiatra (Medicina Física y Rehabilitación)',
    cmp: siteConfig.cmp,
    rne: siteConfig.rne,
    ruc: '20604142700',
    razonSocial: 'Proloterapia Peru Eirl',
    consultaCosto: siteConfig.consultaCosto,
    whatsappNumber: siteConfig.whatsappNumber,
    email: 'contacto@dromarpajares.com',
    direccion: 'Av. Primavera 517, Of. 302, San Borja, Lima',
    horarios: 'Lunes a Viernes: 9:00 am - 7:00 pm | Sábados: 9:00 am - 1:00 pm',
    googleMapsUrl: 'https://maps.google.com/?q=Av.+Primavera+517+San+Borja+Lima',
    facebook: 'https://facebook.com/dromarpajares',
    instagram: 'https://instagram.com/dromarpajares',
    tiktok: 'https://tiktok.com/@dromarpajares',
    sociedades: 'Sociedad Peruana de Medicina Física y Rehabilitación (SOPEMFYR)',
    politicaCitas: 'Tolerancia máxima de 15 min. Reprogramación con 24h de anticipación vía WhatsApp.',
    libroReclamaciones: 'Activar formulario de Libro de Reclamaciones Virtual (Exigencia INDECOPI Perú para RUC 20604142700)',
    tiempoRespuestaWhatsapp: 'Aviso: Las respuestas por WhatsApp pueden tomar entre 10 a 15 minutos (mientras se atiende en consulta médica).'
  });

  // Domain & Canva Migration Settings
  const [domainConfig, setDomainConfig] = useState({
    opcionDominio: 'nuevo', // 'nuevo' | 'canva' | 'existente'
    dominioNombre: 'dromarpajares.com',
    notasDominio: 'Actualmente el doctor tiene un diseño preliminar en Canva. Se requiere trasladar o registrar el dominio profesional dromarpajares.com'
  });

  // Payment Setup (Izipay & Direct Payments)
  const [paymentConfig, setPaymentConfig] = useState({
    metodoPreferido: 'izipay_yape', // 'izipay_yape' | 'solo_whatsapp'
    tieneCuentaIzipay: 'ayuda_alta', // 'si' | 'no' | 'ayuda_alta'
    rucIzipay: '20604142700',
    titularCuenta: 'Proloterapia Peru Eirl',
    bancoDepósitos: 'BCP / Interbank',
    cciCuenta: '002-191-000000000000-00',
    emailIzipay: 'contacto@dromarpajares.com',
    notasPagos: 'Requiero ayuda para darme de alta en Izipay con mi RUC y número CCI bancario para cobro automático.'
  });

  // Multimedia & Photos checklist (Recordatorio de dimensiones y envío)
  const [mediaChecklist, setMediaChecklist] = useState({
    fotoPerfil: 'PENDIENTE DE ENVÍO: Foto vertical en bata/ambo (1200x1600px)',
    fotoConsultorio: 'PENDIENTE DE ENVÍO: Foto horizontal consultorio/ecógrafo (1920x1080px)',
    logoFirma: 'Usar tipografía médica profesional / PNG transparente'
  });

  // Editable Pillars
  const [pillars, setPillars] = useState([
    '10 años de experiencia — Especialista en Medicina Regenerativa Celular.',
    '+45,000 Infiltraciones Ecoguiadas — Ecografía articular in situ en cada aplicación.',
    '+12,000 Pacientes Tratados — Pacientes rehabilitados, aliviados y sin dolor.'
  ]);

  // Editable Treatments
  const [treatmentsList, setTreatmentsList] = useState(
    TREATMENTS.map(t => ({
      title: t.title,
      desc: t.cardDesc,
      indicaciones: t.indicacionesList.join(', ')
    }))
  );

  // Editable Triage Questions
  const [triageList, setTriageList] = useState(DEFAULT_TRIAGE);

  // Editable FAQs
  const [faqsList, setFaqsList] = useState(DEFAULT_FAQS);

  // General notes
  const [generalObs, setGeneralObs] = useState('');

  const handleResetDefaults = () => {
    if (window.confirm('¿Desea restablecer todos los textos a los valores iniciales de la web?')) {
      setDoctorData({
        doctorName: siteConfig.doctorName,
        especialidad: 'Médico Fisiatra (Medicina Física y Rehabilitación)',
        cmp: siteConfig.cmp,
        rne: siteConfig.rne,
        ruc: '20604142700',
        razonSocial: 'Proloterapia Peru Eirl',
        consultaCosto: siteConfig.consultaCosto,
        whatsappNumber: siteConfig.whatsappNumber,
        email: 'contacto@dromarpajares.com',
        direccion: 'Av. Primavera 517, Of. 302, San Borja, Lima',
        horarios: 'Lunes a Viernes: 9:00 am - 7:00 pm | Sábados: 9:00 am - 1:00 pm',
        googleMapsUrl: 'https://maps.google.com/?q=Av.+Primavera+517+San+Borja+Lima',
        facebook: 'https://facebook.com/dromarpajares',
        instagram: 'https://instagram.com/dromarpajares',
        tiktok: 'https://tiktok.com/@dromarpajares',
        sociedades: 'Sociedad Peruana de Medicina Física y Rehabilitación (SOPEMFYR)',
        politicaCitas: 'Tolerancia máxima de 15 min. Reprogramación con 24h de anticipación vía WhatsApp.',
        libroReclamaciones: 'Activar formulario de Libro de Reclamaciones Virtual (Exigencia INDECOPI Perú para RUC 20604142700)',
        tiempoRespuestaWhatsapp: 'Aviso: Las respuestas por WhatsApp pueden tomar entre 10 a 15 minutos (mientras se atiende en consulta médica).'
      });
      setDomainConfig({
        opcionDominio: 'nuevo',
        dominioNombre: 'dromarpajares.com',
        notasDominio: 'Actualmente el doctor tiene un diseño preliminar en Canva. Se requiere trasladar o registrar el dominio profesional dromarpajares.com'
      });
      setPaymentConfig({
        metodoPreferido: 'izipay_yape',
        tieneCuentaIzipay: 'ayuda_alta',
        rucIzipay: '20604142700',
        titularCuenta: 'Proloterapia Peru Eirl',
        bancoDepósitos: 'BCP / Interbank',
        cciCuenta: '002-191-000000000000-00',
        emailIzipay: 'contacto@dromarpajares.com',
        notasPagos: 'Requiero ayuda para darme de alta en Izipay con mi RUC y número CCI bancario para cobro automático.'
      });
      setMediaChecklist({
        fotoPerfil: 'PENDIENTE DE ENVÍO: Foto vertical en bata/ambo (1200x1600px)',
        fotoConsultorio: 'PENDIENTE DE ENVÍO: Foto horizontal consultorio/ecógrafo (1920x1080px)',
        logoFirma: 'Usar tipografía médica profesional / PNG transparente'
      });
      setPillars([
        '10 años de experiencia — Especialista en Medicina Regenerativa Celular.',
        'Infiltraciones Ecoguiadas — Ecografía articular in situ en cada aplicación.',
        '+12,000 casos de éxito — Pacientes rehabilitados sin cirugías.'
      ]);
      setTreatmentsList(
        TREATMENTS.map(t => ({
          title: t.title,
          desc: t.cardDesc,
          indicaciones: t.indicacionesList.join(', ')
        }))
      );
      setTriageList(DEFAULT_TRIAGE);
      setFaqsList(DEFAULT_FAQS);
      setGeneralObs('');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSendWhatsappNotes = () => {
    let cleanPhone = DEST_WHATSAPP.replace(/\D/g, '');

    let msg = `📋 *REVISIÓN COMPLETA Y CONFIGURACIÓN DOSSIER WEB*\n`;
    msg += `👨‍⚕️ *Doctor:* ${doctorData.doctorName}\n\n`;

    msg += `1️⃣ *Datos Médicos, Ubicación y Legales:*\n`;
    msg += `• CMP: ${doctorData.cmp} | RNE: ${doctorData.rne}\n`;
    msg += `• Costo Consulta: S/ ${doctorData.consultaCosto}\n`;
    msg += `• WhatsApp Atención: ${doctorData.whatsappNumber}\n`;
    msg += `• Correo: ${doctorData.email}\n`;
    msg += `• Dirección: ${doctorData.direccion}\n`;
    msg += `• Google Maps: ${doctorData.googleMapsUrl}\n`;
    msg += `• Horarios: ${doctorData.horarios}\n`;
    msg += `• Redes: IG/FB/TikTok\n`;
    msg += `• Sociedades: ${doctorData.sociedades}\n`;
    msg += `• Política Citas: ${doctorData.politicaCitas}\n`;
    msg += `• Libro de Reclamaciones: ${doctorData.libroReclamaciones}\n`;
    msg += `• Tiempo Respuesta WA (10-15 min): ${doctorData.tiempoRespuestaWhatsapp}\n\n`;

    msg += `2️⃣ *Dominio y Migración Canva:*\n`;
    msg += `• Opción: ${domainConfig.opcionDominio === 'canva' ? 'Migrar desde Canva' : domainConfig.opcionDominio === 'nuevo' ? 'Registrar Dominio Nuevo' : 'Usar Dominio Existente'}\n`;
    msg += `• Nombre Dominio: ${domainConfig.dominioNombre}\n`;
    msg += `• Detalle: ${domainConfig.notasDominio}\n\n`;

    msg += `3️⃣ *Pasarela de Pagos (Izipay / Yape):*\n`;
    msg += `• Modalidad: ${paymentConfig.metodoPreferido === 'izipay_yape' ? 'Izipay + Yape/Plin (Cobro Web)' : 'Reserva por WhatsApp (Directo con QR/CCI)'}\n`;
    msg += `• Estado Izipay: ${paymentConfig.tieneCuentaIzipay === 'ayuda_alta' ? 'Solicita asistencia para Alta en Izipay' : paymentConfig.tieneCuentaIzipay === 'si' ? 'Cuenta Izipay Activa' : 'Sin Izipay (Solo WhatsApp direct)'}\n`;
    msg += `• RUC Izipay: ${paymentConfig.rucIzipay} | Titular: ${paymentConfig.titularCuenta}\n`;
    msg += `• Banco/CCI: ${paymentConfig.cciCuenta}\n`;
    msg += `• Correo Registro: ${paymentConfig.emailIzipay}\n`;
    msg += `• Notas Adicionales: ${paymentConfig.notasPagos}\n\n`;

    msg += `4️⃣ *RECORDATORIO DE FOTOS PENDIENTES (Dimensiones):*\n`;
    msg += `• Foto Principal (Vertical 1200x1600px): ${mediaChecklist.fotoPerfil}\n`;
    msg += `• Foto Consultorio (Horizontal 1920x1080px): ${mediaChecklist.fotoConsultorio}\n`;
    msg += `• Logo / Firma: ${mediaChecklist.logoFirma}\n\n`;

    msg += `5️⃣ *Pilares de Portada:*\n`;
    pillars.forEach((p, i) => {
      msg += `• Pilar ${i + 1}: ${p}\n`;
    });
    msg += `\n`;

    msg += `6️⃣ *FAQs Revisadas (${faqsList.length}):*\n`;
    faqsList.forEach((faq, i) => {
      msg += `Q${i + 1}: ${faq.pregunta}\nA: ${faq.respuesta}\n\n`;
    });

    if (generalObs.trim()) {
      msg += `💬 *Comentario Adicional:*\n"${generalObs.trim()}"\n\n`;
    }

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // FAQ Handlers
  const handleFaqChange = (index: number, field: 'pregunta' | 'respuesta', value: string) => {
    const updated = [...faqsList];
    updated[index][field] = value;
    setFaqsList(updated);
  };

  const handleAddFaq = () => {
    setFaqsList([...faqsList, { pregunta: 'Escriba aquí la nueva pregunta...', respuesta: 'Escriba aquí la respuesta...' }]);
  };

  const handleRemoveFaq = (index: number) => {
    setFaqsList(faqsList.filter((_, i) => i !== index));
  };

  // Treatment Handlers
  const handleTreatmentChange = (index: number, field: 'title' | 'desc' | 'indicaciones', value: string) => {
    const updated = [...treatmentsList];
    updated[index][field] = value;
    setTreatmentsList(updated);
  };

  // Triage Handlers
  const handleTriageChange = (index: number, field: 'label' | 'text', value: string) => {
    const updated = [...triageList];
    updated[index][field] = value;
    setTriageList(updated);
  };

  // Pillar Handler
  const handlePillarChange = (index: number, value: string) => {
    const updated = [...pillars];
    updated[index] = value;
    setPillars(updated);
  };

  return (
    <div className="bg-slate-100 min-h-screen py-4 sm:py-8 px-2.5 sm:px-6 lg:px-8 print:bg-white print:py-0 print:px-0">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 p-4 sm:p-10 print:shadow-none print:border-none print:p-0">
        
        {/* Navigation & Action Header (Hidden when printing) */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 pb-5 border-b border-slate-200 print:hidden">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-[#00a8ca] transition-colors cursor-pointer py-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a la Web Principal</span>
          </button>

          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleResetDefaults}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer"
              title="Restablecer textos originales"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Restablecer</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-900 text-white px-3.5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <Printer className="h-4 w-4" />
              <span>Guardar PDF</span>
            </button>

            <button
              onClick={handleSendWhatsappNotes}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Enviar Cambios por WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Document Title Header */}
        <div className="text-center space-y-2 pb-6 border-b-2 border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-200 rounded-lg text-cyan-800 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5" />
            HOJA DE REVISIÓN EDICIÓN DIRECTA DE CONTENIDOS WEB
          </div>

          <div className="flex justify-center items-center gap-2">
            <input
              type="text"
              value={doctorData.doctorName}
              onChange={(e) => setDoctorData({ ...doctorData, doctorName: e.target.value })}
              className="font-serif text-2xl sm:text-3xl font-black text-slate-900 uppercase text-center w-full bg-transparent border-b border-dashed border-transparent hover:border-slate-400 focus:border-[#00a8ca] focus:bg-slate-50 focus:outline-none rounded px-2 py-0.5 transition-all"
            />
          </div>

          <p className="text-xs text-slate-600 font-bold uppercase tracking-wider">
            {siteConfig.tagline} {doctorData.cmp ? `· C.M.P. ${doctorData.cmp}` : ''} {doctorData.rne ? `· R.N.E. ${doctorData.rne}` : ''}
          </p>

          <p className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl py-2 px-4 max-w-2xl mx-auto print:hidden flex items-center justify-center gap-2">
            <Edit3 className="h-4 w-4 text-emerald-600 shrink-0" />
            <span><strong>💡 Edición en tiempo real:</strong> Haga clic sobre cualquier pregunta, texto o precio para corregirlo directamente antes de imprimir o enviar.</span>
          </p>
        </div>

        {/* Section 1: Doctor & Business Identifiers + Contact Data */}
        <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="font-serif text-base font-black text-[#00243d] uppercase flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[#00a8ca]" />
              1. Ficha del Médico y Datos de Contacto
            </span>
            <span className="text-[10px] text-slate-400 font-sans font-normal print:hidden">Haz clic sobre cualquier campo para editar</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-800 font-medium">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Nombre Médico:</label>
              <input
                type="text"
                value={doctorData.doctorName}
                onChange={(e) => setDoctorData({ ...doctorData, doctorName: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Especialidad:</label>
              <input
                type="text"
                value={doctorData.especialidad}
                onChange={(e) => setDoctorData({ ...doctorData, especialidad: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">C.M.P.:</label>
              <input
                type="text"
                value={doctorData.cmp}
                onChange={(e) => setDoctorData({ ...doctorData, cmp: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">R.N.E.:</label>
              <input
                type="text"
                value={doctorData.rne}
                onChange={(e) => setDoctorData({ ...doctorData, rne: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Costo Consulta Presencial (S/):</label>
              <input
                type="text"
                value={doctorData.consultaCosto}
                onChange={(e) => setDoctorData({ ...doctorData, consultaCosto: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">WhatsApp de Atención:</label>
              <input
                type="text"
                value={doctorData.whatsappNumber}
                onChange={(e) => setDoctorData({ ...doctorData, whatsappNumber: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Correo Electrónico Consultorio:</label>
              <input
                type="email"
                value={doctorData.email}
                onChange={(e) => setDoctorData({ ...doctorData, email: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Dirección Física de Atención:</label>
              <input
                type="text"
                value={doctorData.direccion}
                onChange={(e) => setDoctorData({ ...doctorData, direccion: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Horarios de Citas:</label>
              <input
                type="text"
                value={doctorData.horarios}
                onChange={(e) => setDoctorData({ ...doctorData, horarios: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Enlace Google Maps / Waze (Ubicación botón "Cómo Llegar"):</label>
              <input
                type="text"
                value={doctorData.googleMapsUrl}
                onChange={(e) => setDoctorData({ ...doctorData, googleMapsUrl: e.target.value })}
                placeholder="https://maps.google.com/..."
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono text-xs text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Sociedades Médicas y Certificaciones (Sellos de Confianza):</label>
              <input
                type="text"
                value={doctorData.sociedades}
                onChange={(e) => setDoctorData({ ...doctorData, sociedades: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Política de Asistencia y Reprogramación de Citas:</label>
              <input
                type="text"
                value={doctorData.politicaCitas}
                onChange={(e) => setDoctorData({ ...doctorData, politicaCitas: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Requisito Legal INDECOPI (Libro de Reclamaciones Virtual):</label>
              <input
                type="text"
                value={doctorData.libroReclamaciones}
                onChange={(e) => setDoctorData({ ...doctorData, libroReclamaciones: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-amber-700 uppercase flex items-center gap-1">
                <Clock className="h-3.5 w-3.5 text-amber-600" />
                Aviso de Tiempo de Respuesta por WhatsApp (Informa al Paciente):
              </label>
              <input
                type="text"
                value={doctorData.tiempoRespuestaWhatsapp}
                onChange={(e) => setDoctorData({ ...doctorData, tiempoRespuestaWhatsapp: e.target.value })}
                className="w-full bg-amber-50 border border-amber-300 rounded-lg p-2 font-medium text-amber-950 focus:ring-2 focus:ring-amber-500 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Domain Web & Canva Migration */}
        <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="font-serif text-base font-black text-[#00243d] uppercase flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[#00a8ca]" />
              2. Dominio Web y Migración desde Canva
            </span>
            <span className="text-[10px] text-slate-400 font-sans font-normal print:hidden">Configuración del enlace web</span>
          </h2>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
            <p className="font-bold flex items-center gap-1.5">
              <HelpCircle className="h-4 w-4 text-amber-600 shrink-0" />
              ¿Cómo trasladamos su web desde Canva?
            </p>
            <p className="text-[11px] leading-relaxed">
              Actualmente el diseño está en Canva. Para tener una web médica profesional, rápida y con reserva interactiva de citas, utilizaremos un dominio profesional propio (ej: <strong className="font-mono text-slate-900">dromarpajares.com</strong> o <strong className="font-mono text-slate-900">dromarpajares.pe</strong>). Nos encargamos de todo el proceso de apuntamiento y configuración servidor.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Nombre de Dominio Propuesto:</label>
              <input
                type="text"
                value={domainConfig.dominioNombre}
                onChange={(e) => setDomainConfig({ ...domainConfig, dominioNombre: e.target.value })}
                placeholder="ej. dromarpajares.com"
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono font-bold text-[#00385d] focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Situación Actual del Dominio:</label>
              <select
                value={domainConfig.opcionDominio}
                onChange={(e) => setDomainConfig({ ...domainConfig, opcionDominio: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              >
                <option value="nuevo">Registrar un nuevo dominio profesional a mi nombre (.com / .pe)</option>
                <option value="canva">Tengo dominio vinculado en Canva (daré acceso para redirección DNS)</option>
                <option value="existente">Tengo un dominio comprado en GoDaddy / NIC.pe / Namecheap</option>
              </select>
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Notas sobre Dominio o Accesos:</label>
              <textarea
                rows={2}
                value={domainConfig.notasDominio}
                onChange={(e) => setDomainConfig({ ...domainConfig, notasDominio: e.target.value })}
                placeholder="Indique cualquier detalle sobre el dominio o si prefiere que le enviemos las opciones de compra recomendadas."
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 text-xs focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Payment Gateway (Izipay / WhatsApp Direct Payments) */}
        <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="font-serif text-base font-black text-[#00243d] uppercase flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-[#00a8ca]" />
              3. Configuración de Pasarela Izipay y Cobros
            </span>
            <span className="text-[10px] text-slate-400 font-sans font-normal print:hidden">Cobro de consultas online</span>
          </h2>

          <div className="p-3.5 bg-cyan-50 border border-cyan-200 rounded-xl text-xs text-cyan-950 space-y-2">
            <p className="font-bold flex items-center gap-1.5 text-cyan-900">
              <HelpCircle className="h-4 w-4 text-cyan-600 shrink-0" />
              ¿Cómo gestionaremos Izipay para su web médica?
            </p>
            <p className="text-[11px] leading-relaxed">
              <strong>Izipay</strong> permite que los pacientes paguen sus consultas directamente con <strong>Tarjeta de Crédito/Débito o Yape</strong>. 
              Si usted aún no cuenta con la pasarela activa, <strong>nosotros le brindamos la asistencia completa para darlo de alta</strong> utilizando su RUC y su número CCI bancario donde Izipay le abonará los pagos recibidos.<br />
              <span className="text-slate-600 block mt-1"><em>Nota alternativa: Si prefiere evitar trámites o comisiones de pasarela, activamos el botón de reserva directa a su WhatsApp personal con su QR Yape/Plin y CCI.</em></span>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Modalidad de Cobro Elegida:</label>
              <select
                value={paymentConfig.metodoPreferido}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, metodoPreferido: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-bold text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              >
                <option value="izipay_yape">Izipay (Cobro Automático Web con Tarjetas + Yape)</option>
                <option value="solo_whatsapp">Reserva por WhatsApp con QR Yape/Plin + CCI directo (Sin Izipay)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Estado de su Cuenta en Izipay:</label>
              <select
                value={paymentConfig.tieneCuentaIzipay}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, tieneCuentaIzipay: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              >
                <option value="ayuda_alta">No tengo Izipay — Solicito asistencia para darme de alta</option>
                <option value="si">Sí tengo cuenta Izipay activa (Entregaré llaves API / accesos)</option>
                <option value="no">No me interesa Izipay (Solo cobraré directo por Yape/Plin en WhatsApp)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">RUC de Facturación / Alta Izipay:</label>
              <input
                type="text"
                value={paymentConfig.rucIzipay}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, rucIzipay: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 font-mono font-bold text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Titular de la Cuenta Bancaria:</label>
              <input
                type="text"
                value={paymentConfig.titularCuenta}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, titularCuenta: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Banco y CCI de Abonado (donde Izipay transferirá):</label>
              <input
                type="text"
                value={paymentConfig.cciCuenta}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, cciCuenta: e.target.value })}
                placeholder="ej. BCP CCI: 002-191-..."
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Correo Registrado en Izipay / Empresa:</label>
              <input
                type="email"
                value={paymentConfig.emailIzipay}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, emailIzipay: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <label className="text-[10px] font-bold text-slate-500 uppercase">Notas sobre Cobros o Asistencia Izipay:</label>
              <textarea
                rows={2}
                value={paymentConfig.notasPagos}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, notasPagos: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-800 text-xs focus:ring-2 focus:ring-[#00a8ca]"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Photography & Media Reminder Checklist */}
        <div className="my-6 p-5 rounded-2xl bg-amber-50/80 border-2 border-amber-300/80 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-base font-black text-amber-950 uppercase flex items-center gap-2">
              <Camera className="h-5 w-5 text-amber-600" />
              4. Recordatorio Pendiente: Fotografías e Imágenes (Especificaciones)
            </h2>
            <span className="px-2.5 py-0.5 bg-amber-200 text-amber-900 rounded-full text-[10px] font-black uppercase tracking-wider">
              Checklist Requerido
            </span>
          </div>

          <p className="text-xs text-amber-900 leading-relaxed">
            📌 <strong>Nota Importante para el Doctor:</strong> Para finalizar la maquetación en alta definición de la web médica, solicitamos el envío de las siguientes fotografías respetando las dimensiones sugeridas:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Spec Card 1 */}
            <div className="p-3 bg-white border border-amber-200 rounded-xl space-y-1.5 shadow-sm">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>📸 Foto Principal / Perfil</span>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold">1200 x 1600 px</span>
              </div>
              <p className="text-[11px] text-slate-600">
                • Orientación: Vertical (Alta Resolución).<br />
                • Atuendo: Bata médica blanca o ambo clínico impecable.<br />
                • Encuadre: Plano medio, sonrisa cercana y profesional.
              </p>
              <div className="pt-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase block">Estado de envío:</label>
                <input
                  type="text"
                  value={mediaChecklist.fotoPerfil}
                  onChange={(e) => setMediaChecklist({ ...mediaChecklist, fotoPerfil: e.target.value })}
                  className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded p-1.5 text-slate-800 focus:bg-white"
                />
              </div>
            </div>

            {/* Spec Card 2 */}
            <div className="p-3 bg-white border border-amber-200 rounded-xl space-y-1.5 shadow-sm">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>🏥 Consultorio / Ecógrafo</span>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold">1920 x 1080 px</span>
              </div>
              <p className="text-[11px] text-slate-600">
                • Orientación: Horizontal (HD 16:9).<br />
                • Escenario: Aplicación de ecografía articular in situ, sala de procedimiento o camilla médica.
              </p>
              <div className="pt-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase block">Estado de envío:</label>
                <input
                  type="text"
                  value={mediaChecklist.fotoConsultorio}
                  onChange={(e) => setMediaChecklist({ ...mediaChecklist, fotoConsultorio: e.target.value })}
                  className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded p-1.5 text-slate-800 focus:bg-white"
                />
              </div>
            </div>

            {/* Spec Card 3 */}
            <div className="p-3 bg-white border border-amber-200 rounded-xl space-y-1.5 shadow-sm">
              <div className="font-bold text-slate-900 flex items-center justify-between">
                <span>🖊️ Logo / Firma Médica</span>
                <span className="text-[10px] font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded font-bold">PNG Transparente</span>
              </div>
              <p className="text-[11px] text-slate-600">
                • Formato: PNG sin fondo o archivo vectorial.<br />
                • En caso de no contar con logo, se genera tipografía médica oficial en la web.
              </p>
              <div className="pt-2">
                <label className="text-[9px] font-bold text-slate-400 uppercase block">Estado de envío:</label>
                <input
                  type="text"
                  value={mediaChecklist.logoFirma}
                  onChange={(e) => setMediaChecklist({ ...mediaChecklist, logoFirma: e.target.value })}
                  className="w-full text-[11px] bg-slate-50 border border-slate-200 rounded p-1.5 text-slate-800 focus:bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5: Promotional Pillars */}
        <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="font-serif text-base font-black text-[#00243d] uppercase flex items-center justify-between">
            <span>5. Pilares de Comunicación de la Portada</span>
            <span className="text-[10px] text-slate-400 font-sans font-normal print:hidden">Haz clic para modificar el texto</span>
          </h2>

          <div className="space-y-2">
            {pillars.map((pilar, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="font-bold text-xs text-[#00a8ca] shrink-0">Pilar {idx + 1}:</span>
                <input
                  type="text"
                  value={pilar}
                  onChange={(e) => handlePillarChange(idx, e.target.value)}
                  className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00a8ca]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Treatments List */}
        <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="font-serif text-base font-black text-[#00243d] uppercase flex items-center justify-between">
            <span>6. Catálogo de Tratamientos y Servicios</span>
            <span className="text-[10px] text-slate-400 font-sans font-normal print:hidden">Edite los nombres, textos o indicaciones</span>
          </h2>

          <div className="space-y-4">
            {treatmentsList.map((item, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#00385d] uppercase">Título del Tratamiento:</label>
                  <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTreatmentChange(idx, 'title', e.target.value)}
                    className="w-full text-xs font-bold text-[#00385d] bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00a8ca]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Descripción corta en la web:</label>
                  <textarea
                    rows={2}
                    value={item.desc}
                    onChange={(e) => handleTreatmentChange(idx, 'desc', e.target.value)}
                    className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00a8ca]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Indicaciones (separadas por coma):</label>
                  <input
                    type="text"
                    value={item.indicaciones}
                    onChange={(e) => handleTreatmentChange(idx, 'indicaciones', e.target.value)}
                    className="w-full text-xs text-slate-600 bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00a8ca]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 7: WhatsApp Qualifier Questionnaire */}
        <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <h2 className="font-serif text-base font-black text-[#00243d] uppercase flex items-center justify-between">
            <span>7. Cuestionario de Triaje (Preguntas de WhatsApp)</span>
            <span className="text-[10px] text-slate-400 font-sans font-normal print:hidden">Edite los enunciados o alternativas</span>
          </h2>

          <div className="space-y-3">
            {triageList.map((item, idx) => (
              <div key={idx} className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 shrink-0">{idx + 1}.</span>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => handleTriageChange(idx, 'label', e.target.value)}
                    className="w-1/3 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg p-1.5 focus:ring-2 focus:ring-[#00a8ca]"
                  />
                </div>
                <input
                  type="text"
                  value={item.text}
                  onChange={(e) => handleTriageChange(idx, 'text', e.target.value)}
                  className="w-full text-xs text-slate-700 bg-slate-50 border border-slate-300 rounded-lg p-1.5 focus:ring-2 focus:ring-[#00a8ca]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Section 8: FAQs */}
        <div className="my-6 p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h2 className="font-serif text-base font-black text-[#00243d] uppercase">
              8. Preguntas Frecuentes (FAQs) — Editables en tiempo real
            </h2>

            <button
              type="button"
              onClick={handleAddFaq}
              className="inline-flex items-center gap-1.5 bg-[#00a8ca] hover:bg-[#008ba8] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer print:hidden"
            >
              <Plus className="h-3.5 w-3.5" />
              <span>Añadir Pregunta</span>
            </button>
          </div>

          <div className="space-y-4">
            {faqsList.map((faq, idx) => (
              <div key={idx} className="p-4 bg-white border border-slate-200 rounded-xl space-y-2 relative group">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-black uppercase text-cyan-800 bg-cyan-50 px-2 py-0.5 rounded">
                    Pregunta {idx + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFaq(idx)}
                    className="text-rose-500 hover:text-rose-700 text-xs font-bold inline-flex items-center gap-1 print:hidden cursor-pointer"
                    title="Eliminar pregunta"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Eliminar</span>
                  </button>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pregunta (Q):</label>
                  <input
                    type="text"
                    value={faq.pregunta}
                    onChange={(e) => handleFaqChange(idx, 'pregunta', e.target.value)}
                    className="w-full text-xs font-bold text-slate-900 bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00a8ca]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Respuesta (A):</label>
                  <textarea
                    rows={3}
                    value={faq.respuesta}
                    onChange={(e) => handleFaqChange(idx, 'respuesta', e.target.value)}
                    className="w-full text-xs text-slate-700 leading-relaxed font-medium bg-slate-50 border border-slate-300 rounded-lg p-2 focus:ring-2 focus:ring-[#00a8ca]"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 9: General Comments */}
        <div className="my-6 p-5 rounded-2xl bg-[#00243d] text-white space-y-3 print:hidden">
          <h2 className="font-serif text-base font-black uppercase text-[#00c3e6]">
            9. Comentarios o Instrucciones Adicionales
          </h2>
          <textarea
            rows={3}
            value={generalObs}
            onChange={(e) => setGeneralObs(e.target.value)}
            placeholder="Escriba aquí cualquier otra indicación o sugerencia que desee enviar..."
            className="w-full text-xs p-3 rounded-xl border border-slate-600 bg-slate-800 text-white placeholder-slate-400 focus:ring-2 focus:ring-[#00c3e6] focus:border-transparent"
          />

          <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[11px] text-slate-300">
              📱 Al hacer clic, se abrirá WhatsApp con el mensaje estructurado listo para enviar.
            </p>
            <button
              onClick={handleSendWhatsappNotes}
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider shadow-lg transition-transform hover:scale-105 cursor-pointer"
            >
              <Send className="h-4 w-4" />
              <span>Enviar Cambios Actualizados por WhatsApp</span>
            </button>
          </div>
        </div>

        {/* Footer info in PDF */}
        <div className="pt-6 border-t border-slate-300 text-center text-[10px] text-slate-500 uppercase tracking-widest font-bold">
          Documento interactivo generado para revisión y corrección de contenidos del Dr. Omar Pajares Tequen
        </div>

      </div>

      {/* Floating Action Bar on Mobile Phones (Sticky Bottom) */}
      <div className="sm:hidden fixed bottom-3 left-3 right-3 bg-slate-900/95 backdrop-blur border border-slate-700/80 p-2.5 rounded-2xl shadow-2xl flex items-center gap-2 z-50 print:hidden">
        <button
          onClick={handlePrint}
          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white py-2.5 px-2 rounded-xl text-xs font-bold transition-all border border-slate-600 cursor-pointer"
        >
          <Printer className="h-4 w-4 text-cyan-400" />
          <span>Guardar PDF</span>
        </button>

        <button
          onClick={handleSendWhatsappNotes}
          className="flex-[1.5] inline-flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-emerald-600 active:bg-emerald-700 text-white py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-lg cursor-pointer"
        >
          <Send className="h-4 w-4" />
          <span>Enviar WhatsApp</span>
        </button>
      </div>

    </div>
  );
}


