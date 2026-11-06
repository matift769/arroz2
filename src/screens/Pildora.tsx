import { useMemo, useState } from 'react';
import { Check, X, Volume2, Flame } from 'lucide-react';
import Encabezado from '@/components/Encabezado';
import { reglaDelDia } from '@/data/situaciones';
import { REGLAS, Regla } from '@/data/reglas';
import { hablar, vibrar, vozDisponible } from '@/lib/hablar';
import { leerRacha, registrarDiaRacha } from '@/lib/storage';

interface PildoraProps {
  onAtras: () => void;
}

interface PreguntaLeccion {
  pregunta: string;
  opciones: string[];
  correcta: number;
}

const PREGUNTAS: Record<string, PreguntaLeccion[]> = {
  R1: [
    { pregunta: '¿Dónde son obligatorios estos elementos?', opciones: ['En todas las zonas demarcadas en amarillo', 'Solo en la bodega'], correcta: 0 },
    { pregunta: '¿Qué debes usar en zona amarilla?', opciones: ['Casco, gafas, protección auditiva y botas', 'Solo botas'], correcta: 0 },
    { pregunta: '¿La zona amarilla exige protección?', opciones: ['Sí', 'No'], correcta: 0 },
  ],
  R2: [
    { pregunta: '¿Cuándo se interviene una máquina?', opciones: ['Cuando está detenida y bloqueada con candado y tarjeta personal', 'Cuando sigue funcionando'], correcta: 0 },
    { pregunta: '¿Qué acompaña al bloqueo de la máquina?', opciones: ['Candado y tarjeta personal', 'Una nota del turno'], correcta: 0 },
    { pregunta: '¿La máquina debe estar detenida antes de intervenirla?', opciones: ['Sí', 'No'], correcta: 0 },
  ],
  R3: [
    { pregunta: '¿Por dónde se camina en bodega?', opciones: ['Por los pasillos peatonales demarcados en verde', 'Por cualquier zona'], correcta: 0 },
    { pregunta: '¿Qué color tienen los pasillos peatonales?', opciones: ['Verde', 'Amarillo'], correcta: 0 },
    { pregunta: 'En bodega, ¿qué pasillos se usan?', opciones: ['Los pasillos peatonales demarcados en verde', 'Las zonas de montacargas'], correcta: 0 },
  ],
  R4: [
    { pregunta: '¿Está permitido cruzar por las zonas de montacargas?', opciones: ['No', 'Sí'], correcta: 0 },
    { pregunta: '¿Qué está prohibido?', opciones: ['Cruzar por las zonas de montacargas', 'Caminar por el pasillo verde'], correcta: 0 },
    { pregunta: '¿Se cruzan las zonas de montacargas?', opciones: ['No', 'Sí, si es rápido'], correcta: 0 },
  ],
  R5: [
    { pregunta: '¿Qué deben portar visitantes y contratistas?', opciones: ['La escarapela visible', 'La escarapela guardada'], correcta: 0 },
    { pregunta: '¿Quién acompaña al visitante en producción?', opciones: ['Un colaborador', 'Nadie'], correcta: 0 },
    { pregunta: '¿Dónde deben estar acompañados?', opciones: ['En las áreas de producción', 'Fuera de la empresa'], correcta: 0 },
  ],
  R6: [
    { pregunta: '¿En qué plazo se reporta?', opciones: ['En un plazo máximo de 24 horas', 'Al terminar el mes'], correcta: 0 },
    { pregunta: '¿Qué se reporta?', opciones: ['Todo incidente, casi accidente o situación sospechosa', 'Solo los accidentes'], correcta: 0 },
    { pregunta: '¿A quién se reporta?', opciones: ['Al líder inmediato o a la línea interna de seguridad', 'A otro compañero'], correcta: 0 },
  ],
  R7: [
    { pregunta: '¿Qué se hace con la tarea durante una evacuación?', opciones: ['Se suspende', 'Se termina'], correcta: 0 },
    { pregunta: '¿Se usan ascensores en una evacuación?', opciones: ['No', 'Sí'], correcta: 0 },
    { pregunta: '¿Qué ruta se sigue?', opciones: ['La ruta señalizada', 'Una ruta cualquiera'], correcta: 0 },
  ],
};

function colorRegla(regla: Regla): string {
  if (regla.color === 'amarillo') return 'border-amarillo bg-amarillo-claro';
  if (regla.color === 'verde') return 'border-verde bg-verde-claro';
  if (regla.color === 'rojo') return 'border-rojo bg-rojo-claro';
  return 'border-azulo bg-hueso';
}

export default function Pildora({ onAtras }: PildoraProps) {
  const indiceDia = reglaDelDia();
  const regla = REGLAS[indiceDia];
  const pregunta = useMemo(() => {
    const banco = PREGUNTAS[regla.id];
    const diaDelAno = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    const indicePregunta = (Math.floor(diaDelAno / 7) + diaDelAno) % banco.length;
    return banco[indicePregunta];
  }, [regla.id]);
  const [respuesta, setRespuesta] = useState<number | null>(null);
  const [racha, setRacha] = useState(leerRacha());

  function responder(indice: number) {
    if (respuesta !== null) return;
    setRespuesta(indice);
    vibrar(indice === pregunta.correcta ? 45 : [30, 40, 30]);
    setRacha(registrarDiaRacha(regla.id));
  }

  return (
    <>
      <Encabezado titulo="Lección diaria" onAtras={onAtras} />
      <div className="px-4 pt-4 pb-4">
        <p className="text-lg font-extrabold text-azulo mb-4">👆 Responde tocando uno de los botones</p>
        <div className={`rounded-3xl border-4 p-5 ${colorRegla(regla)} animate-slide-up`}>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-extrabold uppercase tracking-wide text-azulo/60">{regla.id} · {regla.zona}</p>
            <span className="flex items-center gap-1 text-sm font-bold text-rojo"><Flame className="w-5 h-5" /> {racha.dias}</span>
          </div>
          <p className="mt-4 text-xl font-extrabold text-azulo leading-snug">{regla.oficial}</p>
          {vozDisponible() && (
            <button
              onClick={() => hablar(regla.oficial)}
              className="mt-5 flex items-center justify-center gap-2 w-full min-h-[64px] rounded-2xl bg-azulo text-white font-bold text-lg"
              aria-label="Escuchar la norma"
            >
              <Volume2 className="w-6 h-6" /> Escuchar norma
            </button>
          )}
        </div>

        <div className="mt-5 rounded-3xl bg-white border-2 border-azulo/10 p-5">
          <p className="text-xl font-extrabold text-azulo">Ahora tú</p>
          <p className="mt-3 text-lg font-semibold text-azulo leading-snug">{pregunta.pregunta}</p>
          <div className="flex flex-col gap-3 mt-4">
            {pregunta.opciones.map((opcion, indice) => {
              const esCorrecta = indice === pregunta.correcta;
              const elegida = respuesta === indice;
              const bien = respuesta !== null && esCorrecta;
              const mal = elegida && !esCorrecta;
              return (
                <button
                  key={opcion}
                  onClick={() => responder(indice)}
                  disabled={respuesta !== null}
                  className={`flex items-center justify-between gap-3 w-full min-h-[68px] rounded-2xl px-4 text-left font-semibold border-2 ${
                    bien ? 'bg-verde text-white border-verde' : mal ? 'bg-rojo text-white border-rojo' : 'bg-white text-azulo border-azulo/10'
                  }`}
                >
                  <span>{opcion}</span>
                  {bien && <Check className="w-6 h-6 shrink-0" />}
                  {mal && <X className="w-6 h-6 shrink-0" />}
                </button>
              );
            })}
          </div>
          {respuesta !== null && (
            <div className="mt-4 rounded-2xl bg-hueso p-4 animate-fade-in">
              <p className={`font-extrabold flex items-center gap-2 ${respuesta === pregunta.correcta ? 'text-verde-oscuro' : 'text-rojo-oscuro'}`}>
                {respuesta === pregunta.correcta ? <Check className="w-6 h-6" /> : <X className="w-6 h-6" />}
                {respuesta === pregunta.correcta ? 'Correcto' : 'Revisa la norma'}
              </p>
              <p className="mt-2 text-base font-semibold text-azulo">{regla.oficial}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
