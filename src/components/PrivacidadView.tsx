import { ShieldCheck, Lock, FileText, ArrowLeft, CreditCard, MessageCircle, HeartPulse, Building2, CheckCircle2 } from 'lucide-react';
import { ViewPath } from '../types';
import { siteConfig } from '../config';

interface PrivacidadViewProps {
  onNavigate: (view: ViewPath) => void;
}

export default function PrivacidadView({ onNavigate }: PrivacidadViewProps) {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl bg-white rounded-3xl shadow-xl border border-slate-200 p-6 sm:p-10 text-slate-800 space-y-8">
        
        {/* Navigation back button */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-6">
          <button
            onClick={() => onNavigate('/')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Volver al Inicio</span>
          </button>

          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>Ley N.º 29733 — Perú</span>
          </div>
        </div>

        {/* Document Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#00c3e6]/10 border border-[#00c3e6]/30 rounded-full text-[#00385d] text-xs font-black uppercase tracking-widest">
            <Lock className="h-3.5 w-3.5 text-[#00a8ca]" />
            <span>Protección de Datos Personales</span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-[#00243d]">
            POLÍTICA DE PRIVACIDAD Y TÉRMINOS DEL SERVICIO
          </h1>
          <p className="text-xs text-slate-500 font-medium max-w-2xl mx-auto">
            Última actualización: Julio 2026. Esta política describe cómo el <strong>Dr. Omar Pajares Tequen</strong> recopila, utiliza y protege la información personal y médica enviada a través de este sitio web.
          </p>
        </div>

        {/* Notice Banner */}
        <div className="p-4 bg-slate-900 text-white rounded-2xl space-y-2">
          <div className="flex items-center gap-2 font-bold text-xs text-[#00c3e6]">
            <Building2 className="h-4 w-[#00c3e6]" />
            <span>DATOS DEL RESPONSABLE DEL TRATAMIENTO DE DATOS</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            • <strong>Titular / Razón Social:</strong> Proloterapia Peru Eirl (Dr. Omar Pajares Tequen)<br />
            • <strong>RUC:</strong> 20604142700<br />
            • <strong>Dirección de Atención:</strong> Av. Primavera 517, Of. 302, San Borja, Lima, Perú<br />
            • <strong>Correo de Contacto:</strong> {siteConfig.email}<br />
            • <strong>Teléfono / WhatsApp:</strong> +51 {siteConfig.whatsappNumber}
          </p>
        </div>

        {/* Section 1: Data Collection */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-black text-[#00243d] flex items-center gap-2 border-b border-slate-100 pb-2">
            <HeartPulse className="h-5 w-5 text-[#00a8ca]" />
            1. Información que Recopilamos
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            A través de nuestros formularios interactivos de reserva y cuestionario de triaje, recopilamos únicamente los datos necesarios para brindar una atención médica orientada y personalizada:
          </p>
          <ul className="text-xs text-slate-700 space-y-1.5 list-disc pl-5">
            <li><strong>Datos de Identificación y Contacto:</strong> Nombre completo, número de teléfono móvil / WhatsApp, edad y correo electrónico.</li>
            <li><strong>Información Sintomática Básica (Triaje Preventivo):</strong> Zona anatómica de dolor o molestia, tiempo de evolución, intensidad del síntoma y tratamientos recibidos previamente.</li>
            <li><strong>Comprobantes de Pago:</strong> En caso de realizar la reserva vía transferencia o Yape, recibimos el código de operación o captura de pantalla enviada por el usuario para validar la cita.</li>
          </ul>
        </section>

        {/* Section 2: Purpose */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-black text-[#00243d] flex items-center gap-2 border-b border-slate-100 pb-2">
            <FileText className="h-5 w-5 text-[#00a8ca]" />
            2. Finalidad del Uso de los Datos
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sus datos personales y la información de sus síntomas se utilizan exclusivamente con los siguientes fines asistenciales e informativos:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-[#00385d] flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Agendamiento de Citas
              </span>
              <p className="text-slate-600 text-[11px]">Coordinar la fecha y hora de su consulta presencial en el consultorio de San Borja.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-[#00385d] flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Triaje Médico Previo
              </span>
              <p className="text-slate-600 text-[11px]">Permite al Dr. Omar Pajares preparar con anticipación la evaluación ecográfica de su caso.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-[#00385d] flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Recordatorios por WhatsApp
              </span>
              <p className="text-slate-600 text-[11px]">Envío de confirmaciones, ubicación del consultorio e instrucciones previas a su cita.</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
              <span className="font-bold text-[#00385d] flex items-center gap-1">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Emisión de Comprobantes
              </span>
              <p className="text-slate-600 text-[11px]">Emisión de boletas o facturas médicas conforme a los requerimientos de la SUNAT.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Payments & Security */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-black text-[#00243d] flex items-center gap-2 border-b border-slate-100 pb-2">
            <CreditCard className="h-5 w-5 text-[#00a8ca]" />
            3. Procesamiento de Pagos y Seguridad Financiera
          </h2>
          <div className="p-4 bg-cyan-50/70 border border-cyan-200 rounded-2xl text-xs text-cyan-950 space-y-2">
            <p className="font-bold text-[#00385d]">
              💳 Cifrado de Transacciones y Pasarela Izipay / Yape
            </p>
            <p className="text-[11px] leading-relaxed">
              • <strong>Pasarela Izipay:</strong> Cuando realiza el pago con tarjeta de crédito, débito o Yape a través de la pasarela integrada Izipay, las operaciones se procesan bajo protocolos de cifrado seguro SSL/TLS propios de la entidad financiera. <strong>Este sitio web no almacena números de tarjeta ni claves secretas.</strong><br />
              • <strong>Transferencias Directas (BCP / Interbank / Plin):</strong> Los comprobantes enviados para confirmación manual se revisan únicamente con fines de verificación contable.
            </p>
          </div>
        </section>

        {/* Section 4: WhatsApp Communications */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-black text-[#00243d] flex items-center gap-2 border-b border-slate-100 pb-2">
            <MessageCircle className="h-5 w-5 text-[#00a8ca]" />
            4. Comunicaciones vía WhatsApp y Tiempos de Respuesta
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Al presionar el botón de contacto o agendamiento por WhatsApp, usted acepta iniciar una conversación con nuestro equipo asistencial.<br />
            <strong>Tiempo de respuesta estimado:</strong> Las respuestas pueden demorar entre <strong>10 a 15 minutos</strong> durante el horario de atención, debido a que el médico y el personal se encuentran en atención médica presencial.
          </p>
        </section>

        {/* Section 5: ARCO Rights */}
        <section className="space-y-3">
          <h2 className="font-serif text-lg font-black text-[#00243d] flex items-center gap-2 border-b border-slate-100 pb-2">
            <ShieldCheck className="h-5 w-5 text-[#00a8ca]" />
            5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)
          </h2>
          <p className="text-xs text-slate-600 leading-relaxed">
            Conforme a la Ley N.º 29733 (Ley de Protección de Datos Personales de Perú), el titular de los datos tiene derecho a solicitar la actualización, rectificación o eliminación de sus datos en cualquier momento escribiendo al correo electrónico: <strong className="text-slate-900 font-mono">{siteConfig.email}</strong> o enviando una solicitud a nuestra dirección física en San Borja, Lima.
          </p>
        </section>

        {/* Footer actions */}
        <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-slate-400">
            © {new Date().getFullYear()} Dr. Omar Pajares Tequen — Todos los derechos reservados.
          </p>
          <button
            onClick={() => onNavigate('/reservar-cita')}
            className="px-6 py-3 bg-[#00c3e6] hover:bg-[#0092ad] text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-lg transition-all cursor-pointer"
          >
            Ir a Reservar Cita
          </button>
        </div>

      </div>
    </div>
  );
}
