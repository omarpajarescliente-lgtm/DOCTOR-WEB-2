/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SiteConfig {
  shortName: string;
  doctorName: string;
  title: string;
  tagline: string;
  cmp: string;
  rne: string;
  whatsappNumber: string;
  email: string;
  address: string;
  district: string;
  mapsQuery: string;
  instagram: string;
  instagramHandle: string;
  facebook: string;
  facebookHandle: string;
  tiktok: string;
  tiktokHandle: string;
  consultaCosto: number;
  consultaMoneda: string;
  horario: Array<{ dia: string; horas: string }>;
  url: string;
}

export interface EvaluationState {
  zona: string;
  tiempo: string;
  intensidad: string;
  previos: string;
  edad: string;
  nombre: string;
  telefono: string;
}

export type ViewPath = '/' | '/el-doctor' | '/tratamientos' | '/reservar-cita' | '/resumen-revision' | '/politica-de-privacidad';
