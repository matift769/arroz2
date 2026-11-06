// Banco de preguntas de trivia generadas SOLO a partir de R1–R7.
// El texto oficial se referencia por id de regla; nunca se duplica aquí.

import { leerJSON, guardarJSON } from '@/lib/storage';

export interface PreguntaTrivia {
  id: number;
  pregunta: string;
  opciones: string[];
  correcta: number; // índice de la opción correcta
  reglaId: 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7';
}

export const TRIVIA: PreguntaTrivia[] = [
  {
    id: 1,
    pregunta: '¿Cuándo son obligatorios casco, gafas, protección auditiva y botas?',
    opciones: [
      'Solo cuando hay inspección',
      'En todas las zonas demarcadas en amarillo',
      'Solo en bodega',
    ],
    correcta: 1,
    reglaId: 'R1',
  },
  {
    id: 2,
    pregunta: '¿Cuándo puedes intervenir una máquina?',
    opciones: [
      'Cuando está detenida y bloqueada con candado y tarjeta personal',
      'Cuando va lenta',
      'Cuando tu compañero vigila',
    ],
    correcta: 0,
    reglaId: 'R2',
  },
  {
    id: 3,
    pregunta: 'En bodega, ¿por dónde debes caminar?',
    opciones: [
      'Por donde sea más corto',
      'Por las zonas de montacargas',
      'Solo por los pasillos peatonales demarcados en verde',
    ],
    correcta: 2,
    reglaId: 'R3',
  },
  {
    id: 4,
    pregunta: '¿Puedes cruzar por las zonas de montacargas?',
    opciones: [
      'No, está prohibido cruzar por las zonas de montacargas',
      'Sí, si miras a ambos lados',
      'Sí, si vas rápido',
    ],
    correcta: 0,
    reglaId: 'R4',
  },
  {
    id: 5,
    pregunta: '¿Qué deben llevar los visitantes en las áreas de producción?',
    opciones: [
      'Solo el carnet de la empresa',
      'Escarapela visible y estar acompañados por un colaborador',
      'Nada, si vienen con el gerente',
    ],
    correcta: 1,
    reglaId: 'R5',
  },
  {
    id: 6,
    pregunta: '¿En qué plazo se reporta un incidente o casi accidente?',
    opciones: [
      'En un plazo máximo de 24 horas al líder inmediato o a la línea interna de seguridad',
      'Cuando tengas tiempo libre',
      'A fin de mes',
    ],
    correcta: 0,
    reglaId: 'R6',
  },
  {
    id: 7,
    pregunta: 'En una evacuación, ¿qué debes hacer?',
    opciones: [
      'Tomar el ascensor para bajar rápido',
      'Terminar tu tarea y luego salir',
      'Suspender la tarea, seguir la ruta señalizada y reportarte con tu líder en el punto de encuentro',
    ],
    correcta: 2,
    reglaId: 'R7',
  },
  {
    id: 8,
    pregunta: 'En una evacuación, ¿se pueden usar ascensores?',
    opciones: ['Sí, si están libres', 'No, no se usan ascensores', 'Solo si vas con un compañero'],
    correcta: 1,
    reglaId: 'R7',
  },
  {
    id: 9,
    pregunta: '¿Qué elementos son obligatorios en zona amarilla?',
    opciones: [
      'Casco, gafas, protección auditiva y botas',
      'Solo casco',
      'Solo botas',
    ],
    correcta: 0,
    reglaId: 'R1',
  },
  {
    id: 10,
    pregunta: 'Un visitante sin escarapela visible en producción es...',
    opciones: [
      'Algo normal',
      'Un riesgo: debe portar escarapela visible y estar acompañado',
      'Responsabilidad solo de seguridad',
    ],
    correcta: 1,
    reglaId: 'R5',
  },
  {
    id: 11,
    pregunta: '¿A quién se reporta un incidente?',
    opciones: [
      'Al líder inmediato o a la línea interna de seguridad',
      'A tu compañero de turno',
      'A nadie, si no hubo heridos',
    ],
    correcta: 0,
    reglaId: 'R6',
  },
  {
    id: 12,
    pregunta: '¿Qué se debe hacer con la máquina antes de intervenirla?',
    opciones: [
      'Avisar al compañero y trabajar rápido',
      'Dejarla detenida y bloqueada con candado y tarjeta personal',
      'Bajarle la velocidad y revisarla',
    ],
    correcta: 1,
    reglaId: 'R2',
  },
  // ---- 23 preguntas nuevas (total 35, 5 por norma) ----
  // R1 (+3)
  {
    id: 13,
    pregunta: 'En una zona demarcada en amarillo, ¿qué protección llevas siempre?',
    opciones: [
      'Casco, gafas, protección auditiva y botas',
      'Solo guantes si lo pide el jefe',
      'Ninguna, si es un recorrido corto',
    ],
    correcta: 0,
    reglaId: 'R1',
  },
  {
    id: 14,
    pregunta: '¿Dónde es obligatorio usar los elementos de protección personal?',
    opciones: [
      'Solo en la entrada',
      'En todas las zonas demarcadas en amarillo',
      'Solo si hay supervisores presentes',
    ],
    correcta: 1,
    reglaId: 'R1',
  },
  {
    id: 15,
    pregunta: '¿Cuáles de estos elementos son obligatorios en zona amarilla?',
    opciones: [
      'Casco, gafas, protección auditiva y botas',
      'Solo gafas y guantes',
      'Solo protección auditiva',
    ],
    correcta: 0,
    reglaId: 'R1',
  },
  // R2 (+3)
  {
    id: 16,
    pregunta: 'Si una máquina no está detenida y bloqueada, ¿puedes intervenirla?',
    opciones: [
      'Sí, si llevas casco',
      'No, nadie interviene una máquina si no está detenida y bloqueada con candado y tarjeta personal',
      'Sí, si otro compañero apaga la luz',
    ],
    correcta: 1,
    reglaId: 'R2',
  },
  {
    id: 17,
    pregunta: 'Para intervenir una máquina, ¿qué debe estar puesto?',
    opciones: [
      'Candado y tarjeta personal, con la máquina detenida',
      'Solo una señal de precaución',
      'Solo avisar por radio',
    ],
    correcta: 0,
    reglaId: 'R2',
  },
  {
    id: 18,
    pregunta: '¿Es suficiente con que un compañero vigile para intervenir una máquina en marcha?',
    opciones: [
      'Sí, si el compañero tiene experiencia',
      'No, la máquina debe estar detenida y bloqueada con candado y tarjeta personal',
      'Sí, si es solo un ajuste rápido',
    ],
    correcta: 1,
    reglaId: 'R2',
  },
  // R3 (+4)
  {
    id: 19,
    pregunta: 'En bodega, ¿por qué pasillos debes caminar?',
    opciones: [
      'Por los pasillos peatonales demarcados en verde',
      'Por el pasillo más ancho, sea del color que sea',
      'Por donde no haya mercancía apilada',
    ],
    correcta: 0,
    reglaId: 'R3',
  },
  {
    id: 20,
    pregunta: '¿De qué color están demarcados los pasillos peatonales en bodega?',
    opciones: [
      'Amarillo',
      'Verde',
      'Rojo',
    ],
    correcta: 1,
    reglaId: 'R3',
  },
  {
    id: 21,
    pregunta: 'En bodega, ¿puedes caminar fuera de los pasillos peatonales demarcados en verde?',
    opciones: [
      'Sí, si no hay montacargas cerca',
      'No, en bodega solo se camina por los pasillos peatonales demarcados en verde',
      'Sí, si vas acompañado',
    ],
    correcta: 1,
    reglaId: 'R3',
  },
  {
    id: 22,
    pregunta: '¿Quién puede caminar por los pasillos peatonales demarcados en verde en bodega?',
    opciones: [
      'Solo los conductores de montacargas',
      'Todo el personal, son los únicos pasillos peatonales en bodega',
      'Solo supervisores',
    ],
    correcta: 1,
    reglaId: 'R3',
  },
  // R4 (+4)
  {
    id: 23,
    pregunta: '¿Está permitido cruzar por las zonas de montacargas?',
    opciones: [
      'Sí, si el montacargas está apagado',
      'No, está prohibido cruzar por las zonas de montacargas',
      'Sí, si llevas chaleco reflectivo',
    ],
    correcta: 1,
    reglaId: 'R4',
  },
  {
    id: 24,
    pregunta: 'Si necesitas ir al otro lado de una zona de montacargas, ¿qué haces?',
    opciones: [
      'Cruzo rápido mirando a ambos lados',
      'No cruzo por la zona de montacargas, está prohibido',
      'Cruzo solo si el conductor me hace una seña',
    ],
    correcta: 1,
    reglaId: 'R4',
  },
  {
    id: 25,
    pregunta: '¿Por qué no se cruza por las zonas de montacargas?',
    opciones: [
      'Porque está prohibido cruzar por las zonas de montacargas',
      'Porque hay que pedir permiso al jefe',
      'Porque solo personal autorizado puede cruzar',
    ],
    correcta: 0,
    reglaId: 'R4',
  },
  {
    id: 26,
    pregunta: 'Cruzar por una zona de montacargas aunque parezca vacía es...',
    opciones: [
      'Seguro si no hay ruido',
      'Algo prohibido',
      'Aceptable si es para alcanzar algo rápido',
    ],
    correcta: 1,
    reglaId: 'R4',
  },
  // R5 (+3)
  {
    id: 27,
    pregunta: 'Un contratista en áreas de producción, ¿cómo debe estar?',
    opciones: [
      'Con escarapela visible y acompañado por un colaborador',
      'Solo con su cédula',
      'Puede moverse solo si conoce la planta',
    ],
    correcta: 0,
    reglaId: 'R5',
  },
  {
    id: 28,
    pregunta: '¿Qué deben portar los visitantes y contratistas?',
    opciones: [
      'Solo el carnet del cliente',
      'La escarapela visible',
      'Nada, si los recibe el gerente',
    ],
    correcta: 1,
    reglaId: 'R5',
  },
  {
    id: 29,
    pregunta: 'En áreas de producción, un visitante sin acompañante es...',
    opciones: [
      'Normal si es de confianza',
      'Un incumplimiento: debe estar acompañado por un colaborador',
      'Permisible en visitas cortas',
    ],
    correcta: 1,
    reglaId: 'R5',
  },
  // R6 (+3)
  {
    id: 30,
    pregunta: 'Viste una situación sospechosa. ¿Qué haces y con qué plazo?',
    opciones: [
      'La reporto cuando termine la semana',
      'La reporto en un plazo máximo de 24 horas al líder inmediato o a la línea interna de seguridad',
      'La comento solo con mi compañero',
    ],
    correcta: 1,
    reglaId: 'R6',
  },
  {
    id: 31,
    pregunta: 'Un casi accidente sin heridos, ¿se reporta?',
    opciones: [
      'No, porque no hubo heridos',
      'Sí, en un plazo máximo de 24 horas al líder inmediato o a la línea interna de seguridad',
      'Solo si el jefe lo pide',
    ],
    correcta: 1,
    reglaId: 'R6',
  },
  {
    id: 32,
    pregunta: '¿Cuál es el plazo máximo para reportar un incidente?',
    opciones: [
      '24 horas',
      'Una semana',
      'Cuando se haga la reunión de seguridad',
    ],
    correcta: 0,
    reglaId: 'R6',
  },
  // R7 (+3)
  {
    id: 33,
    pregunta: 'En una evacuación, ¿qué haces con la tarea que estás realizando?',
    opciones: [
      'La termino antes de salir',
      'La suspendo',
      'La dejo en un punto seguro y la termino después de evacuar',
    ],
    correcta: 1,
    reglaId: 'R7',
  },
  {
    id: 34,
    pregunta: 'En una evacuación, ¿a dónde debes ir?',
    opciones: [
      'Al punto de encuentro, siguiendo la ruta señalizada',
      'A la entrada principal, por donde llegué',
      'Al estacionamiento, sin seguir ruta',
    ],
    correcta: 0,
    reglaId: 'R7',
  },
  {
    id: 35,
    pregunta: 'En el punto de encuentro, ¿qué debes hacer?',
    opciones: [
      'Irte en cuanto confirmes que estás bien',
      'Reportarte con tu líder',
      'Esperar a que vuelva la normalidad sin avisar a nadie',
    ],
    correcta: 1,
    reglaId: 'R7',
  },
];

// ---- Sorteo de 7 preguntas, una por norma, sin repetir (registro por norma) ----

const CLAVE_VISTAS = 'consulta_seguridad_trivia_vistas_por_norma';

type RegistroPorNorma = Record<string, number[]>;

function leerVistasPorNorma(): RegistroPorNorma {
  return leerJSON<RegistroPorNorma>(CLAVE_VISTAS, {});
}

function guardarVistasPorNorma(reg: RegistroPorNorma): void {
  guardarJSON(CLAVE_VISTAS, reg);
}

function barajar<T>(arr: T[]): T[] {
  const copia = [...arr];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

// Baraja las opciones de una pregunta y recalcula el índice correcto.
function barajarOpciones(p: PreguntaTrivia): PreguntaTrivia {
  const textoCorrecto = p.opciones[p.correcta];
  const opciones = barajar(p.opciones);
  return {
    ...p,
    opciones,
    correcta: opciones.indexOf(textoCorrecto),
  };
}

const NORMAS = ['R1', 'R2', 'R3', 'R4', 'R5', 'R6', 'R7'] as const;

// Elige 7 preguntas (una por norma) no vistas antes; reinicia el registro de una
// norma cuando se agotan sus preguntas, excluyendo la última para no repetir seguida.
export function preguntasDeSesion(): PreguntaTrivia[] {
  const registro = leerVistasPorNorma();

  const elegidas: PreguntaTrivia[] = [];

  for (const norma of barajar([...NORMAS])) {
    const deNorma = TRIVIA.filter((p) => p.reglaId === norma);
    const vistas = registro[norma] ?? [];
    const noVistas = deNorma.filter((p) => !vistas.includes(p.id));

    let elegida: PreguntaTrivia;
    let nuevasVistas: number[];

    if (noVistas.length > 0) {
      elegida = noVistas[Math.floor(Math.random() * noVistas.length)];
      nuevasVistas = [...vistas, elegida.id];
    } else {
      // Se agotaron: reiniciar el registro de esta norma excluyendo la última usada.
      const ultima = vistas[vistas.length - 1];
      const candidatos = deNorma.filter((p) => p.id !== ultima);
      if (candidatos.length > 0) {
        elegida = candidatos[Math.floor(Math.random() * candidatos.length)];
      } else {
        // Solo hay una pregunta para esta norma: usarla sin fallar.
        elegida = deNorma[0];
      }
      nuevasVistas = [elegida.id];
    }

    registro[norma] = nuevasVistas;
    elegidas.push(elegida);
  }

  guardarVistasPorNorma(registro);

  // Sin repetir dentro de la ronda (una por norma garantiza esto) y opciones barajadas.
  return elegidas.map(barajarOpciones);
}
