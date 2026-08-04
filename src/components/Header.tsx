import { useState } from 'react';
import { Menu, X, Activity, Stethoscope } from 'lucide-react';
import { ViewPath } from '../types';
import { siteConfig, getWhatsappLink } from '../config';

interface HeaderProps {
  currentView: ViewPath;
  onNavigate: (view: ViewPath) => void;
  onOpenAppointmentModal?: (msg?: string) => void;
  onOpenAiTriage?: () => void;
}

export default function Header({ currentView, onNavigate, onOpenAppointmentModal, onOpenAiTriage }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { label: 'HOME', href: '/' as ViewPath },
    { label: 'EL DOCTOR', href: '/el-doctor' as ViewPath },
    { label: 'TRATAMIENTOS', href: '/tratamientos' as ViewPath },
    { label: 'CONTACTO', href: '/reservar-cita' as ViewPath },
  ];

  const handleLinkClick = (href: ViewPath) => {
    onNavigate(href);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCtaClick = () => {
    setIsOpen(false);
    if (onOpenAppointmentModal) {
      onOpenAppointmentModal('Hola Dr. Omar Pajares, me comunico desde la página web para solicitar información sobre sus consultas médicas y agendar mi cita.');
    } else {
      handleLinkClick('/reservar-cita');
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        
        {/* Logo (Piskulich Style typography) */}
        <button
          onClick={() => handleLinkClick('/')}
          className="flex items-center gap-2.5 text-left cursor-pointer group"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#02111c] text-[#00c3e6] transition-transform group-hover:scale-105 shadow-sm">
            <Activity className="h-5.5 w-5.5" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-serif font-black text-base sm:text-lg tracking-wider text-[#02111c] uppercase">
              DR. OMAR PAJARES
            </span>
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#00a8ca]">
              MÉDICO FISIATRA
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden items-center gap-2 md:flex">
          {menuItems.map((item) => {
            const isActive = currentView === item.href;
            return (
              <li key={item.href}>
                <button
                  onClick={() => handleLinkClick(item.href)}
                  className={`cursor-pointer rounded-full px-4 py-2 text-xs font-black tracking-wider uppercase transition-all duration-200 ${
                    isActive
                      ? 'bg-[#02111c] text-white shadow-sm'
                      : 'text-slate-700 hover:text-[#00a8ca] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* CTA Buttons */}
        <div className="flex items-center gap-2">
          {onOpenAiTriage && (
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenAiTriage();
              }}
              className="inline-flex items-center gap-1.5 rounded-full bg-[#02111c] hover:bg-[#00a8ca] text-[#00c3e6] hover:text-white px-4 py-2 text-xs font-black uppercase tracking-wider border border-[#00c3e6]/30 shadow-sm transition-all cursor-pointer"
            >
              <Stethoscope className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">ORIENTACIÓN MÉDICA</span>
              <span className="sm:hidden">EVALUAR CASO</span>
            </button>
          )}

          <button
            onClick={handleCtaClick}
            className="hidden items-center gap-1.5 rounded-full bg-[#00c3e6] hover:bg-[#02111c] px-6 py-2.5 text-xs font-black uppercase tracking-wider text-white shadow-md transition-all sm:inline-flex cursor-pointer"
          >
            <span>AGENDAR CITA</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-800 hover:bg-slate-100 md:hidden"
            aria-label="Abrir menú"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer menu */}
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 py-4 md:hidden shadow-lg">
          <ul className="flex flex-col gap-2 py-1">
            {menuItems.map((item) => {
              const isActive = currentView === item.href;
              return (
                <li key={item.href}>
                  <button
                    onClick={() => handleLinkClick(item.href)}
                    className={`w-full text-left rounded-xl px-4 py-3 text-xs font-black tracking-wider uppercase transition-colors ${
                      isActive
                        ? 'bg-[#02111c] text-white'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    {item.label}
                  </button>
                </li>
              );
            })}
            <li className="pt-2 border-t border-slate-100 mt-2">
              <button
                onClick={handleCtaClick}
                className="w-full cursor-pointer flex items-center justify-center gap-2 rounded-xl bg-[#00c3e6] px-4 py-3 text-xs font-black uppercase tracking-wider text-white shadow-sm"
              >
                <span>AGENDAR CITA</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

