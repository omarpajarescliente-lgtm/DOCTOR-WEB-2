import { useState, useEffect } from 'react';
import { MessageCircle, Stethoscope } from 'lucide-react';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeView from './components/HomeView';
import DoctorView from './components/DoctorView';
import TratamientosView from './components/TratamientosView';
import ReservarView from './components/ReservarView';
import ResumenRevisionView from './components/ResumenRevisionView';
import PrivacidadView from './components/PrivacidadView';
import WhatsappFilterModal from './components/WhatsappFilterModal';
import AiTriageModal from './components/AiTriageModal';
import { ViewPath } from './types';
import { getWhatsappLink } from './config';

export default function App() {
  const [view, setView] = useState<ViewPath>('/');
  const [selectedTreatmentId, setSelectedTreatmentId] = useState<string | null>(null);
  const [isWhatsappFilterOpen, setIsWhatsappFilterOpen] = useState(false);
  const [pendingWhatsappMessage, setPendingWhatsappMessage] = useState('');
  
  // AI Triage Modal state
  const [isAiTriageOpen, setIsAiTriageOpen] = useState(false);
  const [aiTriageTopic, setAiTriageTopic] = useState<string | undefined>(undefined);

  // Listen to popstate to support browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as ViewPath;
      if (['/', '/el-doctor', '/tratamientos', '/reservar-cita', '/resumen-revision', '/politica-de-privacidad'].includes(path)) {
        setView(path);
      } else {
        setView('/');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Global event listener to intercept general WhatsApp link clicks (triggers popup filter)
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor) {
        // Skip filter if explicitly marked or if user is already on the reservation view (/reservar-cita)
        if (
          anchor.getAttribute('data-skip-filter') === 'true' || 
          anchor.dataset.skipFilter === 'true' || 
          window.location.pathname === '/reservar-cita'
        ) {
          return; // Allow direct opening of WhatsApp without modal
        }

        const href = anchor.getAttribute('href');
        if (href && (href.startsWith('https://wa.me/') || href.startsWith('https://api.whatsapp.com/send'))) {
          e.preventDefault();
          
          let textParam = '';
          try {
            if (href.includes('?')) {
              const queryStr = href.split('?')[1];
              const params = new URLSearchParams(queryStr);
              textParam = params.get('text') || '';
            } else {
              const urlObj = new URL(href);
              textParam = urlObj.searchParams.get('text') || '';
            }
          } catch (err) {
            if (href.includes('text=')) {
              const matches = href.match(/text=([^&]+)/);
              if (matches && matches[1]) {
                textParam = decodeURIComponent(matches[1]);
              }
            }
          }
          
          setPendingWhatsappMessage(textParam);
          setIsWhatsappFilterOpen(true);
        }
      }
    };

    document.addEventListener('click', handleGlobalClick, true); // use capture to intercept first
    return () => document.removeEventListener('click', handleGlobalClick, true);
  }, []);

  // Update URL path (without page reload) when navigating
  const handleNavigate = (newView: ViewPath) => {
    setView(newView);
    if (newView !== '/tratamientos') {
      setSelectedTreatmentId(null);
    }
    window.history.pushState(null, '', newView);

    if (newView === '/reservar-cita') {
      setTimeout(() => {
        const formEl = document.getElementById('formulario-cita');
        if (formEl) {
          formEl.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectTreatment = (treatmentId: string) => {
    setSelectedTreatmentId(treatmentId);
    setView('/tratamientos');
    window.history.pushState(null, '', '/tratamientos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAppointmentModal = (msg?: string) => {
    const message = msg || "Hola Dr. Omar Pajares, me comunico desde la página web para solicitar información sobre sus consultas médicas y agendar mi cita.";
    setPendingWhatsappMessage(message);
    setIsWhatsappFilterOpen(true);
  };

  const handleOpenAiTriage = (topic?: string) => {
    setAiTriageTopic(topic);
    setIsAiTriageOpen(true);
  };

  const renderView = () => {
    switch (view) {
      case '/':
        return (
          <HomeView 
            onNavigate={handleNavigate} 
            onSelectTreatment={handleSelectTreatment}
            onOpenAppointmentModal={handleOpenAppointmentModal}
            onOpenAiTriage={handleOpenAiTriage}
          />
        );
      case '/el-doctor':
        return <DoctorView onNavigate={handleNavigate} onOpenAppointmentModal={handleOpenAppointmentModal} />;
      case '/tratamientos':
        return (
          <TratamientosView 
            onNavigate={handleNavigate} 
            selectedTreatmentId={selectedTreatmentId}
            onSelectTreatment={(id) => setSelectedTreatmentId(id)}
            onClearTreatment={() => setSelectedTreatmentId(null)}
            onOpenAppointmentModal={handleOpenAppointmentModal}
          />
        );
      case '/reservar-cita':
        return <ReservarView />;
      case '/resumen-revision':
        return <ResumenRevisionView onNavigate={handleNavigate} />;
      case '/politica-de-privacidad':
        return <PrivacidadView onNavigate={handleNavigate} />;
      default:
        return (
          <HomeView 
            onNavigate={handleNavigate} 
            onSelectTreatment={handleSelectTreatment} 
            onOpenAppointmentModal={handleOpenAppointmentModal}
            onOpenAiTriage={handleOpenAiTriage}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-800 antialiased selection:bg-[#00c3e6]/20 selection:text-[#00385d]">
      {/* Navbar Header */}
      <Header 
        currentView={view} 
        onNavigate={handleNavigate} 
        onOpenAppointmentModal={handleOpenAppointmentModal} 
        onOpenAiTriage={handleOpenAiTriage}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {renderView()}
      </main>

      {/* Footer Block */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Buttons: Floating Clinical Assistant + Floating WhatsApp */}
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => handleOpenAiTriage()}
          aria-label="Consulta y Orientación Médica"
          className="flex items-center gap-2 rounded-full bg-[#02111c] hover:bg-[#00a8ca] text-[#00c3e6] hover:text-white px-4 py-3 shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-[#00c3e6]/40 cursor-pointer group"
        >
          <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#00c3e6] text-[#02111c]">
            <Stethoscope className="h-4 w-4" />
          </div>
          <span className="text-xs font-black uppercase tracking-wider pr-1">
            Asistente Médica
          </span>
        </button>
      </div>

      {/* Persistent Floating WhatsApp Button on all pages */}
      <a
        href={getWhatsappLink("Hola Dr. Omar Pajares, me comunico desde la página web para solicitar información sobre sus consultas médicas.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] hover:bg-[#20ba5a] text-white shadow-2xl transition-all duration-300 hover:scale-110 focus:outline-none border-2 border-white group"
      >
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white ring-2 ring-white">
          1
        </span>
        <MessageCircle className="h-8 w-8 fill-current shrink-0" />
        
        {/* Tooltip on hover */}
        <span className="absolute right-16 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl whitespace-nowrap shadow-xl pointer-events-none">
          ¿Consultas? Escríbenos
        </span>
      </a>

      {/* AI Triage Nurse Modal */}
      <AiTriageModal
        isOpen={isAiTriageOpen}
        onClose={() => setIsAiTriageOpen(false)}
        initialTopic={aiTriageTopic}
      />

      {/* Interactive WhatsApp Qualifier/Filter Modal if needed */}
      <WhatsappFilterModal 
        isOpen={isWhatsappFilterOpen} 
        onClose={() => setIsWhatsappFilterOpen(false)} 
        presetMessage={pendingWhatsappMessage} 
      />
    </div>
  );
}
