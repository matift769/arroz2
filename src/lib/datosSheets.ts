import { URL_SHEETS } from '@/lib/storage';

export interface RespuestaSheet {
  fecha: string;
  origen: string;
  regla: string;
  pregunta: string;
  acierto: boolean;
}

export interface ReporteSheet {
  fecha: string;
  tipo: string;
  lugar: string;
  destino: string;
}

export interface DatosSheets {
  respuestas: RespuestaSheet[];
  reportes: ReporteSheet[];
}

export async function obtenerDatosSheets(): Promise<DatosSheets> {
  const res = await fetch(URL_SHEETS, {
    method: 'GET',
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as Partial<DatosSheets>;
  return {
    respuestas: Array.isArray(data.respuestas) ? data.respuestas : [],
    reportes: Array.isArray(data.reportes) ? data.reportes : [],
  };
}
