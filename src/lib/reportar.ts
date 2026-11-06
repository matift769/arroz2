// Reporte de incidentes — función de envío aislada.
// PROTOTIPO: el reporte se guarda en este dispositivo (localStorage).
// conectar aquí Google Forms / Make / Supabase

export type TipoReporte = 'Incidente' | 'Casi accidente' | 'Situación sospechosa';
export type LugarReporte = 'Planta' | 'Bodega' | 'Otro';
export type DestinoReporte = 'Líder inmediato' | 'Línea interna de seguridad';

export interface Reporte {
  id: string;
  tipo: TipoReporte;
  lugar: LugarReporte;
  descripcion: string;
  destino: DestinoReporte;
  fecha: string; // ISO
}

const CLAVE = 'consulta_seguridad_reportes';

export function guardarReporte(
  datos: Omit<Reporte, 'id' | 'fecha'>,
): Reporte {
  const reporte: Reporte = {
    ...datos,
    id: `rep_${Date.now()}`,
    fecha: new Date().toISOString(),
  };
  const existentes = leerReportes();
  existentes.push(reporte);
  localStorage.setItem(CLAVE, JSON.stringify(existentes));
  return reporte;
}

export function leerReportes(): Reporte[] {
  try {
    const raw = localStorage.getItem(CLAVE);
    return raw ? (JSON.parse(raw) as Reporte[]) : [];
  } catch {
    return [];
  }
}

import { enviarASheets } from '@/lib/storage';

// Punto de integración futuro: enviar el reporte a un backend.
// Por ahora solo se guarda localmente.
export async function enviarReporte(reporte: Reporte): Promise<boolean> {
  enviarASheets({ origen: 'reporte', tipo: reporte.tipo, lugar: reporte.lugar, destino: reporte.destino });
  return true;
}
