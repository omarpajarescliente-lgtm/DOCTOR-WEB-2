import { SiteConfig } from './types';

export const siteConfig: SiteConfig = {
  shortName: "Dr. Omar Pajares",
  doctorName: "Dr. Omar Pajares Tequen",
  title: "Médico Fisiatra — Esp. Rodilla, Hernia Discal Lumbar y Medicina Regenerativa",
  tagline: "Recupera tu movilidad sin cirugía ni quirófano",
  cmp: "",
  rne: "",
  whatsappNumber: "51932388579",
  email: "proloterapiaperu@gmail.com",
  address: "Av. Gregorio Escobedo 788, Of. 304",
  district: "Jesús María, Lima - Perú",
  mapsQuery: "Av. Gregorio Escobedo 788, Jesús María, Lima, Perú",
  instagram: "https://www.instagram.com/dr_omar_pajares?igsh=bnNlMDJ3b3I4cjZx&utm_source=qr",
  instagramHandle: "@dr_omar_pajares",
  facebook: "https://www.facebook.com/share/1CmaY43CfT/?mibextid=wwXIfr",
  facebookHandle: "Dr. Omar Pajares",
  tiktok: "https://www.tiktok.com/@dr.omarpajares?_r=1&_t=ZS-97tohTlZich",
  tiktokHandle: "@dr.omarpajares",
  consultaCosto: 200,
  consultaMoneda: "S/",
  horario: [
    { dia: "Lunes a Viernes", horas: "9:00 a.m. – 7:00 p.m." },
    { dia: "Sábados", horas: "9:00 a.m. – 1:00 p.m." }
  ],
  url: "https://www.dromarpajares.com"
};

export function getWhatsappLink(message?: string): string {
  const base = `https://wa.me/${siteConfig.whatsappNumber}`;
  if (message) {
    return `${base}?text=${encodeURIComponent(message)}`;
  }
  return base;
}
