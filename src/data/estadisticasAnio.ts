// Fuente: Anexo B del reto, datos adaptados con fines académicos

export interface PerfilRecordacion {
  perfil: string;
  porcentaje: number;
}

export const RECORDACION_30_DIAS: PerfilRecordacion[] = [
  { perfil: 'Planta', porcentaje: 48 },
  { perfil: 'Bodega', porcentaje: 55 },
  { perfil: 'Conductores', porcentaje: 51 },
  { perfil: 'Personal administrativo', porcentaje: 63 },
];

export interface IncidenteAnio {
  cantidad: number;
  descripcion: string;
}

export const INCIDENTES_REPORTADOS: IncidenteAnio[] = [
  { cantidad: 37, descripcion: 'casi accidentes en bodega por circulación peatonal' },
  { cantidad: 22, descripcion: 'eventos en planta por omitir el bloqueo de máquinas o los elementos de protección' },
  { cantidad: 14, descripcion: 'correos de suplantación (phishing), en 3 de los cuales alguien hizo clic en el enlace' },
  { cantidad: 6, descripcion: 'casos de información de rutas compartida por mensajería' },
];

export interface DatoEncuesta {
  porcentaje: number;
  descripcion: string;
}

export const ENCUESTA_INTERNA: DatoEncuesta[] = [
  { porcentaje: 71, descripcion: 'del personal no sabe dónde consultar un procedimiento cuando tiene una duda' },
  { porcentaje: 64, descripcion: 'considera que los correos de seguridad son demasiado largos' },
];

export const MANUAL_ACTUALIZACION = 'se actualiza en promedio dos veces al año';

export const PERFIL_PROTOTIPO = 'Planta';
