// FUENTE ÚNICA DE VERDAD — Consulta de Seguridad
// Todo el contenido de seguridad sale de este archivo.
// Está PROHIBIDO agregar, resumir o suavizar reglas fuera de aquí.

export type TemaColor = 'amarillo' | 'verde' | 'rojo' | 'azul';

export interface Regla {
  id: 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7';
  zona: string;
  titulo: string;
  corta: string; // versión corta para pantalla (texto principal)
  oficial: string; // texto oficial literal, no modificar
  color: TemaColor;
  icono: string; // nombre de icono lucide-react
  palabras: string[]; // para búsqueda por palabra clave
}

export const REGLAS: Regla[] = [
  {
    id: 'R1',
    zona: 'Zona amarilla – EPP',
    titulo: 'Protección personal',
    corta: 'Zona amarilla = casco, gafas, protección auditiva y botas',
    oficial:
      'Los elementos de protección personal (casco, gafas, protección auditiva y botas) son obligatorios en todas las zonas demarcadas en amarillo.',
    color: 'amarillo',
    icono: 'HardHat',
    palabras: ['casco', 'gafas', 'auditiva', 'botas', 'epp', 'proteccion', 'amarillo', 'zona'],
  },
  {
    id: 'R2',
    zona: 'Máquinas',
    titulo: 'Máquinas',
    corta: 'Máquina detenida + candado y tarjeta personal',
    oficial:
      'Nadie interviene una máquina si no está detenida y bloqueada con candado y tarjeta personal.',
    color: 'rojo',
    icono: 'Cog',
    palabras: ['maquina', 'candado', 'tarjeta', 'bloqueo', 'intervenir', 'detenida'],
  },
  {
    id: 'R3',
    zona: 'Bodega – pasillos',
    titulo: 'Bodega: pasillos',
    corta: 'En bodega, solo por el pasillo verde',
    oficial: 'En bodega solo se camina por los pasillos peatonales demarcados en verde.',
    color: 'verde',
    icono: 'Footprints',
    palabras: ['bodega', 'pasillos', 'peatonal', 'verde', 'caminar'],
  },
  {
    id: 'R4',
    zona: 'Bodega – montacargas',
    titulo: 'Montacargas',
    corta: 'Zona de montacargas: NO cruzar',
    oficial: 'Está prohibido cruzar por las zonas de montacargas.',
    color: 'rojo',
    icono: 'Forklift',
    palabras: ['montacargas', 'cruzar', 'prohibido', 'bodega', 'zona'],
  },
  {
    id: 'R5',
    zona: 'Visitantes y contratistas',
    titulo: 'Visitantes',
    corta: 'Visitante: escarapela visible + acompañante en producción',
    oficial:
      'Visitantes y contratistas deben portar la escarapela visible y estar acompañados por un colaborador en las áreas de producción.',
    color: 'azul',
    icono: 'BadgeCheck',
    palabras: ['visitante', 'contratista', 'escarapela', 'acompanante', 'produccion'],
  },
  {
    id: 'R6',
    zona: 'Reporte',
    titulo: 'Reportar',
    corta: 'Incidente o casi accidente: repórtalo en máximo 24 horas',
    oficial:
      'Todo incidente, casi accidente o situación sospechosa se reporta en un plazo máximo de 24 horas al líder inmediato o a la línea interna de seguridad.',
    color: 'rojo',
    icono: 'Siren',
    palabras: ['reporte', 'incidente', 'casi accidente', 'sospechosa', '24', 'horas', 'lider', 'linea'],
  },
  {
    id: 'R7',
    zona: 'Evacuación',
    titulo: 'Evacuación',
    corta: 'Evacuación: deja la tarea, sin ascensor, ruta señalizada, repórtate con tu líder en el punto de encuentro',
    oficial:
      'En una evacuación se suspende la tarea, no se usan ascensores, se sigue la ruta señalizada y cada persona se reporta con su líder en el punto de encuentro.',
    color: 'rojo',
    icono: 'DoorOpen',
    palabras: ['evacuacion', 'alarma', 'ascensor', 'ruta', 'punto de encuentro', 'lider', 'salir'],
  },
];

export const reglaPorId = (id: string): Regla | undefined =>
  REGLAS.find((r) => r.id === id);
