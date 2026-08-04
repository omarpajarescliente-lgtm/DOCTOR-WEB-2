import { MapPin, Phone, Instagram, Facebook, Mail, ShieldCheck, FileText, Building2 } from 'lucide-react';
import { ViewPath } from '../types';
import { siteConfig } from '../config';

interface FooterProps {
  onNavigate: (view: ViewPath) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (href: ViewPath) => {
    onNavigate(href);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#001424] text-white pt-8 lg:pt-12 overflow-visible border-t border-slate-800 z-20">
      <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-12 items-start">
          
          {/* Left Curved Brand Info Card (Exact Dr. Piskulich Floating Style) */}
          <div className="lg:col-span-5 bg-[#00385d] text-white p-8 sm:p-10 rounded-tl-3xl rounded-tr-3xl rounded-bl-3xl rounded-br-[70px] shadow-2xl relative border-2 border-cyan-400/30 space-y-7 -mt-16 sm:-mt-24 lg:-mt-28 z-30">
            
            {/* Brand Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif text-2xl sm:text-3xl font-black uppercase tracking-wider text-white">
                  DR. <span className="text-[#00c3e6]">PAJARES</span>
                </span>
              </div>
              <p className="text-[11px] font-mono font-bold text-cyan-300 uppercase tracking-widest">
                MEDICINA FÍSICA Y REHABILITACIÓN
              </p>
            </div>

            {/* Phone Item */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white border-2 border-white shadow-lg">
                <Phone className="h-6 w-6 stroke-[2.5] fill-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Teléfono / WhatsApp</h4>
                <p className="text-sm font-black text-white tracking-wide">932 388 579</p>
              </div>
            </div>

            {/* Email Item */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white border-2 border-white shadow-lg">
                <Mail className="h-6 w-6 stroke-[2.5] fill-white" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider">Email</h4>
                <p className="text-xs font-black text-white tracking-wide">proloterapiaperu@gmail.com</p>
              </div>
            </div>

            {/* Identificador Fiscal Subheading */}
            <div className="pt-2 border-t border-cyan-800/60 space-y-4">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-cyan-300">
                Identificador Fiscal
              </h4>

              {/* RUC */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white border-2 border-white shadow-md">
                  <FileText className="h-5 w-5 stroke-[2.5] fill-white" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-slate-200 uppercase">RUC</h5>
                  <p className="text-xs font-black text-white">20604142700</p>
                </div>
              </div>

              {/* Razón Social */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white border-2 border-white shadow-md">
                  <Building2 className="h-5 w-5 stroke-[2.5] fill-white" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-slate-200 uppercase">Razón Social</h5>
                  <p className="text-xs font-black text-white">Proloterapia Peru Eirl</p>
                </div>
              </div>

              {/* Dirección Fiscal */}
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00c3e6] text-white border-2 border-white shadow-md">
                  <MapPin className="h-5 w-5 stroke-[2.5] fill-white" />
                </div>
                <div>
                  <h5 className="text-[11px] font-bold text-slate-200 uppercase">Dirección Fiscal</h5>
                  <p className="text-xs font-black text-white">{siteConfig.address}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Dr. Piskulich Main Footer Content) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
            
            <div className="space-y-4">
              {/* Dossier PDF / Privacy policy link */}
              <div className="flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleLinkClick('/resumen-revision')}
                  className="text-xs font-bold text-[#00c3e6] hover:underline transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <FileText className="h-4 w-4" />
                  <span>Dossier de Contenido para Revisión (Imprimir / PDF)</span>
                </button>

                <button
                  onClick={() => handleLinkClick('/politica-de-privacidad')}
                  className="text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ShieldCheck className="h-4 w-4 text-[#00c3e6]" />
                  <span>Políticas de Privacidad & Protección de Datos</span>
                </button>
              </div>

              <h4 className="font-serif text-lg font-black uppercase text-[#00c3e6] tracking-wider">
                TRATAMIENTOS REGENERATIVOS ECOGUIADOS:
              </h4>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-extrabold text-slate-200 pt-1">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00c3e6]"></span>
                  <span>Plasma Rico en Plaquetas (PRP)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00c3e6]"></span>
                  <span>Células Madre Mesenquimales</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00c3e6]"></span>
                  <span>Proloterapia Ecoguiada</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00c3e6]"></span>
                  <span>Ácido Hialurónico Intraarticular</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00c3e6]"></span>
                  <span>Artrosis de Rodilla y Cadera</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00c3e6]"></span>
                  <span>Rehabilitación Intervencionista</span>
                </li>
              </ul>
            </div>

            {/* CTA & Social Icons */}
            <div className="space-y-6 pt-4 border-t border-slate-800">
              
              {/* Cyan Button: RESERVA TU CITA */}
              <div>
                <button
                  onClick={() => handleLinkClick('/reservar-cita')}
                  className="cursor-pointer inline-flex items-center justify-center rounded-full bg-[#00c3e6] hover:bg-[#0092ad] text-white font-black text-xs uppercase tracking-wider px-8 py-3.5 shadow-xl transition-all hover:scale-105 border border-white/20"
                >
                  RESERVA TU CITA
                </button>
              </div>

              {/* Social links */}
              <div className="space-y-3">
                <h5 className="text-xs font-bold text-white uppercase tracking-wider">
                  Síguenos en nuestras redes sociales:
                </h5>

                <div className="flex items-center gap-3">
                  <a
                    href={siteConfig.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00c3e6] text-white border-2 border-white hover:bg-white hover:text-[#00243d] hover:scale-110 transition-all shadow-lg"
                    title="Instagram"
                  >
                    <Instagram className="h-6 w-6 stroke-[2.5]" />
                  </a>
                  <a
                    href={siteConfig.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00c3e6] text-white border-2 border-white hover:bg-white hover:text-[#00243d] hover:scale-110 transition-all shadow-lg"
                    title="Facebook"
                  >
                    <Facebook className="h-6 w-6 fill-current" />
                  </a>
                  <a
                    href={siteConfig.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-[#00c3e6] text-white border-2 border-white hover:bg-white hover:text-[#00243d] hover:scale-110 transition-all shadow-lg"
                    title="TikTok"
                  >
                    <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64c.29 0 .56.04.82.11V9.4a6.33 6.33 0 00-1-.08A6.34 6.34 0 003 15.66a6.34 6.34 0 0010.86 4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.04-.52z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#002642] py-4 text-center border-t border-slate-800 px-4">
        <p className="text-xs font-semibold text-slate-300 tracking-wider">
          © {new Date().getFullYear()} Dr. Omar Pajares Tequen. Todos los derechos reservados. | Médicos Fisiatras Especialistas en Medicina Regenerativa
        </p>
      </div>
    </footer>
  );
}


