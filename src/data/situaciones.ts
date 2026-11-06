export type ReglaId = 'R1' | 'R2' | 'R3' | 'R4' | 'R5' | 'R6' | 'R7';

export interface OpcionSituacion {
  texto: string;
  correcta: boolean;
  reglaId: ReglaId;
}

export interface Situacion {
  id: number;
  escena: string;
  opciones: OpcionSituacion[];
}

// Banco de situaciones. Las escenas son ficticias; cada una se resuelve
// con una norma R1–R7 existente en src/data/reglas.ts.
// Reparto completo (ids 1–60): R1=9, R2=9, R3=8, R4=8, R5=9, R6=9, R7=8.
// Más situaciones se agregarán a este mismo arreglo en partes posteriores.
export const SITUACIONES: Situacion[] = [
  // ── R1: EPP zona amarilla (3) ──
  {
    id: 1,
    escena: 'Andrés va a entrar a zona amarilla y un compañero le dice: "entra un minuto, no pasa nada". Él no tiene las gafas puestas.',
    opciones: [
      { texto: 'Entrar solo un momento', correcta: false, reglaId: 'R1' },
      { texto: 'Ponerse casco, gafas, protección auditiva y botas antes de entrar', correcta: true, reglaId: 'R1' },
      { texto: 'Entrar rápido y salir corriendo', correcta: false, reglaId: 'R1' },
    ],
  },
  {
    id: 2,
    escena: 'Julia llega tarde a la línea de producción en zona amarilla y se da cuenta de que dejó las botas en el casillero.',
    opciones: [
      { texto: 'Entrar con los zapatos normales, ya casi termina el turno', correcta: false, reglaId: 'R1' },
      { texto: 'Ir por el casco, gafas, protección auditiva y botas antes de entrar', correcta: true, reglaId: 'R1' },
    ],
  },
  {
    id: 3,
    escena: 'En el muelle de despacho demarcado en amarillo hace mucho ruido. Mateo cree que no necesita protección auditiva "por un rato".',
    opciones: [
      { texto: 'Usar casco, gafas, protección auditiva y botas', correcta: true, reglaId: 'R1' },
      { texto: 'Entrar sin protección auditiva, el ruido no es tanto', correcta: false, reglaId: 'R1' },
      { texto: 'Taparse los oídos con las manos y entrar', correcta: false, reglaId: 'R1' },
    ],
  },

  // ── R2: Máquinas – candado y tarjeta (3) ──
  {
    id: 4,
    escena: 'A Camilo le piden arreglar rápido una banda transportadora que sigue en movimiento.',
    opciones: [
      { texto: 'Arreglarla de una vez, es un detalle menor', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal antes de intervenirla', correcta: true, reglaId: 'R2' },
      { texto: 'Pedirle a otro compañero que la arregle sin detenerla', correcta: false, reglaId: 'R2' },
    ],
  },
  {
    id: 5,
    escena: 'En la línea de producción la máquina se atascó. El supervisor dice: "apágala y revisa rápido".',
    opciones: [
      { texto: 'Apagarla y revisar rápido sin candado', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal', correcta: true, reglaId: 'R2' },
      { texto: 'Revisar con la máquina en marcha para no parar producción', correcta: false, reglaId: 'R2' },
    ],
  },
  {
    id: 6,
    escena: 'Al final del turno, Lucas debe limpiar una columna de una máquina. Quiere irse temprano y omite el candado.',
    opciones: [
      { texto: 'Limpiar rápido con la máquina detenida pero sin candado ni tarjeta', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal', correcta: true, reglaId: 'R2' },
      { texto: 'Pedir a otro que limpie mientras él vigila', correcta: false, reglaId: 'R2' },
    ],
  },

  // ── R3: Bodega – pasillos verdes (3) ──
  {
    id: 7,
    escena: 'Lina termina su tarea en bodega y quiere ahorrar tiempo cruzando directo a la salida.',
    opciones: [
      { texto: 'Cruzar por donde sea más corto', correcta: false, reglaId: 'R3' },
      { texto: 'Caminar por el pasillo peatonal demarcado en verde', correcta: true, reglaId: 'R3' },
    ],
  },
  {
    id: 8,
    escena: 'En bodega hay estibas apiladas y el pasillo verde está bloqueado a la vista. Pedro piensa buscar otra ruta.',
    opciones: [
      { texto: 'Cruzar por la zona de montacargas porque no hay montacargas cerca', correcta: false, reglaId: 'R3' },
      { texto: 'Caminar por el pasillo peatonal demarcado en verde', correcta: true, reglaId: 'R3' },
      { texto: 'Pasar entre las estibas para acortar', correcta: false, reglaId: 'R3' },
    ],
  },
  {
    id: 9,
    escena: 'Es de noche en bodega, hay poca luz y Carlos no distingue los colores del piso. Un compañero le sugiere caminar por el centro.',
    opciones: [
      { texto: 'Caminar por el centro del pasillo para ver mejor', correcta: false, reglaId: 'R3' },
      { texto: 'Caminar por el pasillo peatonal demarcado en verde', correcta: true, reglaId: 'R3' },
    ],
  },

  // ── R4: Montacargas – no cruzar (3) ──
  {
    id: 10,
    escena: 'El montacargas se acerca en bodega. Pedro piensa cruzar rápido porque el pasillo verde queda más lejos.',
    opciones: [
      { texto: 'Cruzar rápido antes de que llegue el montacargas', correcta: false, reglaId: 'R4' },
      { texto: 'No cruzar por la zona de montacargas, ir por el pasillo verde', correcta: true, reglaId: 'R4' },
    ],
  },
  {
    id: 11,
    escena: 'En el muelle de despacho un montacargas baja una rampa. Diana tiene las manos ocupadas y quiere cruzar por ahí.',
    opciones: [
      { texto: 'Cruzar con cuidado mirando al montacargas', correcta: false, reglaId: 'R4' },
      { texto: 'No cruzar por la zona de montacargas', correcta: true, reglaId: 'R4' },
      { texto: 'Cruzar rápido porque el montacargas va lento', correcta: false, reglaId: 'R4' },
    ],
  },
  {
    id: 12,
    escena: 'Un compañero nuevo en bodega te pregunta si puede cruzar por la zona de montacargas porque "no hay nadie operando".',
    opciones: [
      { texto: 'Sí, si no hay montacargas operando se puede cruzar', correcta: false, reglaId: 'R4' },
      { texto: 'No, está prohibido cruzar por las zonas de montacargas', correcta: true, reglaId: 'R4' },
    ],
  },

  // ── R5: Visitantes y contratistas (3) ──
  {
    id: 13,
    escena: 'Un contratista llega a producción con la escarapela guardada en el bolsillo y sin nadie que lo acompañe.',
    opciones: [
      { texto: 'Dejarlo seguir solo si trae el carnet de la empresa', correcta: false, reglaId: 'R5' },
      { texto: 'Debe portar la escarapela visible y estar acompañado por un colaborador en producción', correcta: true, reglaId: 'R5' },
      { texto: 'Dejarlo entrar si dice que va a ser rápido', correcta: false, reglaId: 'R5' },
    ],
  },
  {
    id: 14,
    escena: 'Un visitante nuevo entra al área de producción del brazo del gerente. No lleva escarapela visible.',
    opciones: [
      { texto: 'No pasa nada, viene con el gerente', correcta: false, reglaId: 'R5' },
      { texto: 'Debe portar la escarapela visible y estar acompañado por un colaborador en producción', correcta: true, reglaId: 'R5' },
    ],
  },
  {
    id: 15,
    escena: 'Un grupo de contratistas va a trabajar en planta. Tienen escarapela visible pero su líder de turno no los acompaña.',
    opciones: [
      { texto: 'Pueden trabajar solos porque ya tienen escarapela', correcta: false, reglaId: 'R5' },
      { texto: 'Deben estar acompañados por un colaborador en las áreas de producción', correcta: true, reglaId: 'R5' },
      { texto: 'Solo necesitan escarapela visible, no acompañante', correcta: false, reglaId: 'R5' },
    ],
  },

  // ── R6: Reporte en 24 h (3) ──
  {
    id: 16,
    escena: 'Una caja casi cae junto a Mateo en el muelle. Nadie más lo vio y él está cansado al final del turno.',
    opciones: [
      { texto: 'No decir nada porque no hubo heridos', correcta: false, reglaId: 'R6' },
      { texto: 'Reportarlo como casi accidente en un plazo máximo de 24 horas al líder inmediato o a la línea interna de seguridad', correcta: true, reglaId: 'R6' },
    ],
  },
  {
    id: 17,
    escena: 'Sara nota un cable pelado en un pasillo de planta. Piensa que otro ya lo habrá reportado.',
    opciones: [
      { texto: 'Dejarlo, seguro alguien más ya lo reportó', correcta: false, reglaId: 'R6' },
      { texto: 'Reportar la situación sospechosa en máximo 24 horas al líder inmediato o a la línea interna de seguridad', correcta: true, reglaId: 'R6' },
      { texto: 'Avisar solo si llega a pasar algo', correcta: false, reglaId: 'R6' },
    ],
  },
  {
    id: 18,
    escena: 'Un contratista entra solo a producción sin escarapela visible. Andrés lo ve pero está ocupado con su tarea.',
    opciones: [
      { texto: 'Ignorarlo, no es su responsabilidad', correcta: false, reglaId: 'R6' },
      { texto: 'Reportar la situación al líder inmediato o a la línea interna de seguridad en máximo 24 horas', correcta: true, reglaId: 'R6' },
    ],
  },

  // ── R7: Evacuación (2) ──
  {
    id: 19,
    escena: 'Suena la alarma de evacuación. El ascensor está vacío y Sara está cansada al final de su turno.',
    opciones: [
      { texto: 'Tomar el ascensor para bajar más rápido', correcta: false, reglaId: 'R7' },
      { texto: 'Suspender la tarea, no usar ascensor, seguir la ruta señalizada y reportarse con su líder en el punto de encuentro', correcta: true, reglaId: 'R7' },
      { texto: 'Terminar la tarea antes de salir', correcta: false, reglaId: 'R7' },
    ],
  },
  {
    id: 20,
    escena: 'En una evacuación de noche, el pasillo señalizado está oscuro. Luis piensa buscar otra salida más corta.',
    opciones: [
      { texto: 'Buscar la salida más corta aunque no esté señalizada', correcta: false, reglaId: 'R7' },
      { texto: 'Seguir la ruta señalizada y reportarse con su líder en el punto de encuentro', correcta: true, reglaId: 'R7' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Parte 2 — ids 21 a 40 (R1=3, R2=3, R3=3, R4=3, R5=3, R6=3, R7=2)
  // ═══════════════════════════════════════════════════════

  // ── R1: EPP zona amarilla (3) ──
  {
    id: 21,
    escena: 'En el comedor hace calor y Paula guarda el casco ahí. Al volver a zona amarilla piensa no ponérselo porque "ya voy llegando".',
    opciones: [
      { texto: 'Entrar sin casco, ya va a llegar a su puesto', correcta: false, reglaId: 'R1' },
      { texto: 'Ponerse casco, gafas, protección auditiva y botas antes de entrar', correcta: true, reglaId: 'R1' },
      { texto: 'Pedir prestado el casco a otro en zona amarilla', correcta: false, reglaId: 'R1' },
    ],
  },
  {
    id: 22,
    escena: 'Turno de noche en planta. Diego termina su descanso y entra a zona amarilla sin gafas porque "no hay nadie revisando".',
    opciones: [
      { texto: 'Entrar sin gafas, de noche no revisan', correcta: false, reglaId: 'R1' },
      { texto: 'Usar casco, gafas, protección auditiva y botas', correcta: true, reglaId: 'R1' },
    ],
  },
  {
    id: 23,
    escena: 'Un inspector externo llega a zona amarilla. Trae casco y botas, pero no gafas ni protección auditiva.',
    opciones: [
      { texto: 'Dejarlo entrar, con casco y botas basta', correcta: false, reglaId: 'R1' },
      { texto: 'Debe usar casco, gafas, protección auditiva y botas', correcta: true, reglaId: 'R1' },
      { texto: 'Dejarlo entrar si la visita es breve', correcta: false, reglaId: 'R1' },
    ],
  },

  // ── R2: Máquinas – candado y tarjeta (3) ──
  {
    id: 24,
    escena: 'La prensa deja de hacer ruido sola. Roberto piensa meter la mano para ver qué pasó, sin detenerla ni bloquearla.',
    opciones: [
      { texto: 'Meter la mano a mirar, ya se detuvo sola', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal antes de revisarla', correcta: true, reglaId: 'R2' },
    ],
  },
  {
    id: 25,
    escena: 'Un compañero de otro turno dejó su candado puesto. Elena necesita intervenir la máquina y piensa quitarlo "solo un segundo".',
    opciones: [
      { texto: 'Quitar el candado ajeno y trabajar rápido', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal', correcta: true, reglaId: 'R2' },
      { texto: 'Trabajar sin candado porque ya estaba detenida', correcta: false, reglaId: 'R2' },
    ],
  },
  {
    id: 26,
    escena: 'En el muelle, una empacadora se atasca. Fernanda quiere sacarle el trozo con la máquina aún conectada.',
    opciones: [
      { texto: 'Sacar el trozo con la máquina conectada, es rápido', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal', correcta: true, reglaId: 'R2' },
    ],
  },

  // ── R3: Bodega – pasillos verdes (3) ──
  {
    id: 27,
    escena: 'En bodega, el pasillo verde tiene un charco. Camila prefiere caminar por fuera del demarcado para no mojarse los pies.',
    opciones: [
      { texto: 'Caminar por fuera del demarcado para evitar el charco', correcta: false, reglaId: 'R3' },
      { texto: 'Caminar por el pasillo peatonal demarcado en verde', correcta: true, reglaId: 'R3' },
      { texto: 'Cruzar por la zona de montacargas, está seco', correcta: false, reglaId: 'R3' },
    ],
  },
  {
    id: 28,
    escena: 'Es hora de salida en bodega y todos caminan juntos. Jorge sigue al grupo que corta camino fuera del pasillo verde.',
    opciones: [
      { texto: 'Seguir al grupo que corta camino', correcta: false, reglaId: 'R3' },
      { texto: 'Caminar por el pasillo peatonal demarcado en verde', correcta: true, reglaId: 'R3' },
    ],
  },
  {
    id: 29,
    escena: 'En la oficina de planta hay una puerta que da directo a bodega. Raúl quiere entrar por ahí en vez de dar la vuelta al pasillo verde.',
    opciones: [
      { texto: 'Entrar por la puerta directa, es más rápido', correcta: false, reglaId: 'R3' },
      { texto: 'Caminar por el pasillo peatonal demarcado en verde', correcta: true, reglaId: 'R3' },
      { texto: 'Entrar por donde esté más cerca', correcta: false, reglaId: 'R3' },
    ],
  },

  // ── R4: Montacargas – no cruzar (3) ──
  {
    id: 30,
    escena: 'Un montacargas carga una estiba alta que tapa la vista al operador. Tomás necesita cruzar al otro lado de bodega.',
    opciones: [
      { texto: 'Cruzar rápido por detrás del montacargas', correcta: false, reglaId: 'R4' },
      { texto: 'No cruzar por la zona de montacargas', correcta: true, reglaId: 'R4' },
    ],
  },
  {
    id: 31,
    escena: 'En el muelle de despacho hay dos montacargas en operación. Ana piensa pasar entre ellos para alcanzar su puesto.',
    opciones: [
      { texto: 'Pasar entre los dos montacargas con cuidado', correcta: false, reglaId: 'R4' },
      { texto: 'No cruzar por las zonas de montacargas', correcta: true, reglaId: 'R4' },
      { texto: 'Pasar rápido porque los operadores la ven', correcta: false, reglaId: 'R4' },
    ],
  },
  {
    id: 32,
    escena: 'Un montacargas está estacionado sin operador en bodega. David cree que puede cruzar por ahí porque no se está moviendo.',
    opciones: [
      { texto: 'Cruzar porque el montacargas está quieto', correcta: false, reglaId: 'R4' },
      { texto: 'No cruzar por la zona de montacargas, ir por el pasillo verde', correcta: true, reglaId: 'R4' },
    ],
  },

  // ── R5: Visitantes y contratistas (3) ──
  {
    id: 33,
    escena: 'Un técnico externo entra a producción con escarapela visible pero se separa del colaborador que lo acompañaba.',
    opciones: [
      { texto: 'Dejarlo trabajar solo, ya tiene escarapela', correcta: false, reglaId: 'R5' },
      { texto: 'Debe estar acompañado por un colaborador en las áreas de producción', correcta: true, reglaId: 'R5' },
    ],
  },
  {
    id: 34,
    escena: 'Llegan proveedores a la línea de producción. Tienen escarapela pero en el bolsillo, no visible.',
    opciones: [
      { texto: 'Dejarlos pasar, ya traen la escarapela', correcta: false, reglaId: 'R5' },
      { texto: 'Deben portar la escarapela visible y estar acompañados por un colaborador en producción', correcta: true, reglaId: 'R5' },
      { texto: 'Dejarlos entrar si prometen no tocar nada', correcta: false, reglaId: 'R5' },
    ],
  },
  {
    id: 35,
    escena: 'Un visitante deja la escarapela en el escritorio de la oficina de planta y camina solo hacia el área de producción.',
    opciones: [
      { texto: 'Dejarlo ir, ya firmó el ingreso', correcta: false, reglaId: 'R5' },
      { texto: 'Debe portar la escarapela visible y estar acompañado por un colaborador en producción', correcta: true, reglaId: 'R5' },
    ],
  },

  // ── R6: Reporte en 24 h (3) ──
  {
    id: 36,
    escena: 'Una herramienta resbala de una mesa y casi golpea a Lorena en la planta. Solo ella lo vio y piensa que "ya pasó".',
    opciones: [
      { texto: 'No reportar porque ya pasó y no pasó nada', correcta: false, reglaId: 'R6' },
      { texto: 'Reportar el casi accidente en máximo 24 horas al líder inmediato o a la línea interna de seguridad', correcta: true, reglaId: 'R6' },
      { texto: 'Reportar solo si vuelve a pasar', correcta: false, reglaId: 'R6' },
    ],
  },
  {
    id: 37,
    escena: 'En el pasillo de planta huele a quemado pero no hay fuego visible. Esteban cree que es del comedor y no dice nada.',
    opciones: [
      { texto: 'Ignorarlo, seguro es del comedor', correcta: false, reglaId: 'R6' },
      { texto: 'Reportar la situación sospechosa en máximo 24 horas al líder inmediato o a la línea interna de seguridad', correcta: true, reglaId: 'R6' },
    ],
  },
  {
    id: 38,
    escena: 'Al cambiar de turno, Clara nota que una protección de una máquina quedó floja. Piensa avisarle al compañero pero no al líder.',
    opciones: [
      { texto: 'Solo avisar al compañero de turno, no al líder', correcta: false, reglaId: 'R6' },
      { texto: 'Reportar la situación sospechosa en máximo 24 horas al líder inmediato o a la línea interna de seguridad', correcta: true, reglaId: 'R6' },
      { texto: 'Dejarla, el próximo turno la revisará', correcta: false, reglaId: 'R6' },
    ],
  },

  // ── R7: Evacuación (2) ──
  {
    id: 39,
    escena: 'Suena la alarma. Mario está en el segundo piso de planta y sus pertenencias están en el casillero. Quiere ir por ellas primero.',
    opciones: [
      { texto: 'Ir al casillero por sus pertenencias antes de salir', correcta: false, reglaId: 'R7' },
      { texto: 'Suspender la tarea, no usar ascensor, seguir la ruta señalizada y reportarse con su líder en el punto de encuentro', correcta: true, reglaId: 'R7' },
    ],
  },
  {
    id: 40,
    escena: 'Durante una evacuación, el punto de encuentro está bajo lluvia. Valeria piensa esperar dentro de la planta donde hay techo.',
    opciones: [
      { texto: 'Quedarse dentro de la planta donde hay techo', correcta: false, reglaId: 'R7' },
      { texto: 'Seguir la ruta señalizada y reportarse con su líder en el punto de encuentro', correcta: true, reglaId: 'R7' },
      { texto: 'Esperar a que deje de llover para salir', correcta: false, reglaId: 'R7' },
    ],
  },

  // ═══════════════════════════════════════════════════════
  // Parte 3 — ids 41 a 60 (R1=3, R2=3, R3=2, R4=2, R5=3, R6=3, R7=4)
  // Banco completo: 60 situaciones. R1=9, R2=9, R3=8, R4=8, R5=9, R6=9, R7=8.
  // ═══════════════════════════════════════════════════════

  // ── R1: EPP zona amarilla (3) ──
  {
    id: 41,
    escena: 'En zona amarilla hace calor. Carmen se quita el casco "solo mientras se enfría" y sigue trabajando.',
    opciones: [
      { texto: 'Quitarse el casco un momento para enfriarse', correcta: false, reglaId: 'R1' },
      { texto: 'Mantener casco, gafas, protección auditiva y botas puestos', correcta: true, reglaId: 'R1' },
    ],
  },
  {
    id: 42,
    escena: 'Un compañero presta sus gafas a Ricardo para entrar a zona amarilla. Las gafas están rayadas y casi no se ve.',
    opciones: [
      { texto: 'Entrar con las gafas prestadas aunque estén rayadas', correcta: false, reglaId: 'R1' },
      { texto: 'Usar casco, gafas, protección auditiva y botas en buen estado', correcta: true, reglaId: 'R1' },
      { texto: 'Entrar sin gafas y cuidarse con la vista', correcta: false, reglaId: 'R1' },
    ],
  },
  {
    id: 43,
    escena: 'Al inicio del turno, Johana se da cuenta de que le falta protección auditiva. Un compañero le dice que entre sin ella "hoy está tranquilo".',
    opciones: [
      { texto: 'Entrar sin protección auditiva porque hoy está tranquilo', correcta: false, reglaId: 'R1' },
      { texto: 'Ponerse casco, gafas, protección auditiva y botas antes de entrar', correcta: true, reglaId: 'R1' },
    ],
  },

  // ── R2: Máquinas – candado y tarjeta (3) ──
  {
    id: 44,
    escena: 'El motor de una máquina hace un ruido raro. Gustavo quiere abrir la tapa y revisar con la máquina funcionando para "escuchar mejor".',
    opciones: [
      { texto: 'Abrir la tapa con la máquina funcionando para escuchar', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal antes de revisarla', correcta: true, reglaId: 'R2' },
    ],
  },
  {
    id: 45,
    escena: 'En la línea de producción un sensor falla. Patricia piensa ajustarlo con la máquina en marcha porque "es solo un tornillo".',
    opciones: [
      { texto: 'Ajustar el sensor con la máquina en marcha, es solo un tornillo', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal', correcta: true, reglaId: 'R2' },
      { texto: 'Ajustarlo rápido sin candado, el sensor no es peligroso', correcta: false, reglaId: 'R2' },
    ],
  },
  {
    id: 46,
    escena: 'Un aprendiz va a intervenir una máquina y pregunta si basta con detenerla, sin candado. Su compañero le dice que sí.',
    opciones: [
      { texto: 'Detenerla sin candado, el compañero dijo que basta', correcta: false, reglaId: 'R2' },
      { texto: 'Dejarla detenida y bloqueada con candado y tarjeta personal', correcta: true, reglaId: 'R2' },
    ],
  },

  // ── R3: Bodega – pasillos verdes (2) ──
  {
    id: 47,
    escena: 'En bodega están descargando y el pasillo verde está ocupado por el tránsito. Néstor piensa bordear por la zona de montacargas.',
    opciones: [
      { texto: 'Bordear por la zona de montacargas porque el pasillo está ocupado', correcta: false, reglaId: 'R3' },
      { texto: 'Caminar por el pasillo peatonal demarcado en verde', correcta: true, reglaId: 'R3' },
      { texto: 'Esperar a que terminen de descargar para caminar donde sea', correcta: false, reglaId: 'R3' },
    ],
  },
  {
    id: 48,
    escena: 'Mónica lleva una caja grande que le tapa la vista en bodega. Piensa caminar por donde recuerda, sin buscar el pasillo verde.',
    opciones: [
      { texto: 'Caminar por donde recuerda, la caja le tapa la vista', correcta: false, reglaId: 'R3' },
      { texto: 'Caminar por el pasillo peatonal demarcado en verde', correcta: true, reglaId: 'R3' },
    ],
  },

  // ── R4: Montacargas – no cruzar (2) ──
  {
    id: 49,
    escena: 'El operador del montacargas baja y se aleja. Iván piensa cruzar la zona de montacargas porque "ya no hay nadie operando".',
    opciones: [
      { texto: 'Cruzar porque el operador se alejó', correcta: false, reglaId: 'R4' },
      { texto: 'No cruzar por la zona de montacargas, ir por el pasillo verde', correcta: true, reglaId: 'R4' },
    ],
  },
  {
    id: 50,
    escena: 'En el muelle hay un montacargas cargando. Sebastián piensa cruzar detrás de él porque "el operador ya miró para adelante".',
    opciones: [
      { texto: 'Cruzar detrás del montacargas porque el operador miró adelante', correcta: false, reglaId: 'R4' },
      { texto: 'No cruzar por la zona de montacargas', correcta: true, reglaId: 'R4' },
      { texto: 'Cruzar rápido por detrás, el operador ya sabe', correcta: false, reglaId: 'R4' },
    ],
  },

  // ── R5: Visitantes y contratistas (3) ──
  {
    id: 51,
    escena: 'Un auditor externo llega a planta con escarapela visible. El colaborador que lo acompaña lo deja esperando mientras va por un café.',
    opciones: [
      { texto: 'Dejarlo esperar solo un momento no importa', correcta: false, reglaId: 'R5' },
      { texto: 'Debe estar acompañado por un colaborador en las áreas de producción', correcta: true, reglaId: 'R5' },
    ],
  },
  {
    id: 52,
    escena: 'Un contratista termina su trabajo en producción y quiere quedarse conversando con un operario. Ya no tiene escarapela visible.',
    opciones: [
      { texto: 'Dejarlo quedarse, ya terminó su trabajo', correcta: false, reglaId: 'R5' },
      { texto: 'Debe portar la escarapela visible y estar acompañado por un colaborador en producción', correcta: true, reglaId: 'R5' },
      { texto: 'Dejarlo quedarse si no toca máquinas', correcta: false, reglaId: 'R5' },
    ],
  },
  {
    id: 53,
    escena: 'Un grupo de estudiantes de práctica entra a producción. Tienen escarapela pero nadie los acompaña porque "ya conocen la planta".',
    opciones: [
      { texto: 'Dejarlos solos porque ya conocen la planta', correcta: false, reglaId: 'R5' },
      { texto: 'Deben estar acompañados por un colaborador en las áreas de producción', correcta: true, reglaId: 'R5' },
    ],
  },

  // ── R6: Reporte en 24 h (3) ──
  {
    id: 54,
    escena: 'Un balde con químico se derrama en bodega. Elena lo limpia rápido pero no avisa a nadie porque "ya quedó".',
    opciones: [
      { texto: 'No avisar porque ya lo limpió', correcta: false, reglaId: 'R6' },
      { texto: 'Reportar el incidente en máximo 24 horas al líder inmediato o a la línea interna de seguridad', correcta: true, reglaId: 'R6' },
      { texto: 'Avisar solo si alguien pregunta', correcta: false, reglaId: 'R6' },
    ],
  },
  {
    id: 55,
    escena: 'Un operario se tropieza con un cable tendido en el pasillo de planta. No se cae pero le parece que "no es para reportar".',
    opciones: [
      { texto: 'No reportar porque no se cayó', correcta: false, reglaId: 'R6' },
      { texto: 'Reportar el casi accidente en máximo 24 horas al líder inmediato o a la línea interna de seguridad', correcta: true, reglaId: 'R6' },
    ],
  },
  {
    id: 56,
    escena: 'En el turno de noche, Olivia ve una persona desconocida en planta sin escarapela. Piensa que es de mantenimiento y no dice nada.',
    opciones: [
      { texto: 'No decir nada, seguro es de mantenimiento', correcta: false, reglaId: 'R6' },
      { texto: 'Reportar la situación sospechosa en máximo 24 horas al líder inmediato o a la línea interna de seguridad', correcta: true, reglaId: 'R6' },
      { texto: 'Confrontarlo ella misma antes de avisar', correcta: false, reglaId: 'R6' },
    ],
  },

  // ── R7: Evacuación (4) ──
  {
    id: 57,
    escena: 'Suena la alarma y Ricardo va con un grupo. Un compañero dice: "vamos por el ascensor, pesa mucho caminar las escalas".',
    opciones: [
      { texto: 'Usar el ascensor para no cansarse bajando', correcta: false, reglaId: 'R7' },
      { texto: 'No usar ascensor, seguir la ruta señalizada y reportarse con el líder en el punto de encuentro', correcta: true, reglaId: 'R7' },
    ],
  },
  {
    id: 58,
    escena: 'En una evacuación, Lucía no ve a su líder en el punto de encuentro. Piensa ir a buscarlo dentro de la planta.',
    opciones: [
      { texto: 'Volver a la planta a buscar al líder', correcta: false, reglaId: 'R7' },
      { texto: 'Quedarse en el punto de encuentro y esperar a su líder', correcta: true, reglaId: 'R7' },
      { texto: 'Irse a casa, ya salió de la planta', correcta: false, reglaId: 'R7' },
    ],
  },
  {
    id: 59,
    escena: 'Suena la alarma pero parece ser un simulacro. Fernando no suspende su tarea porque "seguro es practice".',
    opciones: [
      { texto: 'Seguir trabajando si parece un simulacro', correcta: false, reglaId: 'R7' },
      { texto: 'Suspender la tarea, seguir la ruta señalizada y reportarse con su líder en el punto de encuentro', correcta: true, reglaId: 'R7' },
    ],
  },
  {
    id: 60,
    escena: 'Durante una evacuación hay humo en el pasillo señalizado. Angélica piensa buscar otra ruta por el sótano donde no hay humo.',
    opciones: [
      { texto: 'Bajar al sótano donde no hay humo', correcta: false, reglaId: 'R7' },
      { texto: 'Seguir la ruta señalizada y reportarse con su líder en el punto de encuentro', correcta: true, reglaId: 'R7' },
      { texto: 'Esperar que se despeje el humo antes de salir', correcta: false, reglaId: 'R7' },
    ],
  },
];

export function barajarOpciones<T>(opciones: T[]): T[] {
  const copia = [...opciones];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

export function reglaDelDia() {
  const inicio = new Date(new Date().getFullYear(), 0, 0);
  const diaDelAno = Math.floor((Date.now() - inicio.getTime()) / 86400000);
  return diaDelAno % 7;
}
