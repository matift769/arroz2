import { useState } from 'react';
import { Check, X, ChevronRight, RotateCcw, Trophy } from 'lucide-react';
import Encabezado from '@/components/Encabezado';
import { preguntasDeSesion, PreguntaTrivia } from '@/data/trivia';
import { reglaPorId } from '@/data/reglas';
import { vibrar } from '@/lib/hablar';
import { guardarResultado, enviarASheets } from '@/lib/storage';

interface TriviaProps {
  onAtras: () => void;
}

export default function Trivia({ onAtras }: TriviaProps) {
  const [preguntas, setPreguntas] = useState<PreguntaTrivia[]>(() => preguntasDeSesion());
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const pregunta = preguntas[indice];

  function elegir(i: number) {
    if (elegida !== null) return;
    setElegida(i);
    const correcta = i === pregunta.correcta;
    if (correcta) setAciertos((a) => a + 1);
    vibrar(correcta ? 50 : [40, 50, 40]);
    guardarResultado({ reglaId: pregunta.reglaId, acierto: correcta, fecha: new Date().toISOString() });
    enviarASheets({ origen: 'trivia', reglaId: pregunta.reglaId, pregunta: pregunta.pregunta, acierto: correcta });
  }

  function siguiente() {
    if (indice + 1 >= preguntas.length) {
      setTerminado(true);
    } else {
      setIndice((i) => i + 1);
      setElegida(null);
    }
  }

  function reiniciar() {
    setPreguntas(preguntasDeSesion());
    setIndice(0);
    setElegida(null);
    setAciertos(0);
    setTerminado(false);
  }

  if (terminado) {
    const mensaje =
      aciertos >= 6 ? '¡Muy bien! Manejas las reglas.' : aciertos >= 4 ? 'Vas mejorando. Repasa lo que falló.' : 'Repasa la guía y vuelve a intentarlo.';
    return (
      <>
        <Encabezado titulo="Evaluación" onAtras={onAtras} />
        <div className="px-4 pt-6 pb-4">
          <div className="text-center">
            <span className="grid place-items-center w-24 h-24 rounded-full bg-verde text-white mx-auto animate-pop">
              <Trophy className="w-12 h-12" strokeWidth={2.2} />
            </span>
            <p className="mt-4 text-3xl font-extrabold text-azulo">
              {aciertos} de {preguntas.length}
            </p>
            <p className="mt-2 text-base text-azulo/70 font-semibold">{mensaje}</p>
          </div>

          <button
            onClick={reiniciar}
            className="mt-6 w-full min-h-[64px] rounded-2xl bg-azulo text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-azulo-claro"
          >
            <RotateCcw className="w-5 h-5" /> Intentar de nuevo
          </button>
        </div>
      </>
    );
  }

  const regla = reglaPorId(pregunta.reglaId)!;

  return (
    <>
      <Encabezado titulo="Evaluación" onAtras={onAtras} />
      <div className="px-4 pt-4 pb-4">
        <p className="text-lg font-extrabold text-azulo mb-3">👆 Responde tocando uno de los botones</p>
        <p className="text-sm font-bold text-azulo/60 mb-2">
          Pregunta {indice + 1} de {preguntas.length}
        </p>
        <div className="h-2 rounded-full bg-azulo/10 mb-4">
          <div
            className="h-2 rounded-full bg-verde transition-all"
            style={{ width: `${((indice + (elegida !== null ? 1 : 0)) / preguntas.length) * 100}%` }}
          />
        </div>

        <div className="rounded-3xl bg-white border-2 border-azulo/10 p-5 mb-4 animate-slide-up">
          <p className="text-xl font-extrabold text-azulo leading-tight">{pregunta.pregunta}</p>
        </div>

        <div className="flex flex-col gap-3">
          {pregunta.opciones.map((op, i) => {
            const esCorrecta = i === pregunta.correcta;
            const elegidaIdx = elegida === i;
            const mostrarBien = elegida !== null && esCorrecta;
            const mostrarMal = elegidaIdx && !esCorrecta;
            return (
              <button
                key={i}
                onClick={() => elegir(i)}
                disabled={elegida !== null}
                className={`min-h-[64px] rounded-xl px-4 font-semibold text-left border-2 flex items-center justify-between gap-2 ${
                  mostrarBien
                    ? 'bg-verde text-white border-verde'
                    : mostrarMal
                      ? 'bg-rojo text-white border-rojo'
                      : 'bg-white text-azulo border-azulo/10'
                }`}
              >
                <span>{op}</span>
                {mostrarBien && <Check className="w-6 h-6 shrink-0" />}
                {mostrarMal && <X className="w-6 h-6 shrink-0" />}
              </button>
            );
          })}
        </div>

        {elegida !== null && (
          <div className="mt-4 animate-slide-up">
            <div className={`rounded-2xl p-4 ${elegida === pregunta.correcta ? 'bg-verde-claro border-2 border-verde' : 'bg-rojo-claro border-2 border-rojo'}`}>
              <p className="text-lg font-extrabold text-azulo flex items-center gap-2">
                {elegida === pregunta.correcta ? (
                  <><Check className="w-6 h-6 text-verde-oscuro" /> Correcto</>
                ) : (
                  <><X className="w-6 h-6 text-rojo-oscuro" /> Incorrecto</>
                )}
              </p>
            </div>
            <div className="mt-3">
              <TarjetaResumenRegla reglaId={pregunta.reglaId} />
            </div>
            <button
              onClick={siguiente}
              className="mt-4 w-full min-h-[64px] rounded-2xl bg-azulo text-white font-bold text-lg flex items-center justify-center gap-2 hover:bg-azulo-claro"
            >
              {indice + 1 >= preguntas.length ? 'Ver resultado' : 'Siguiente'} <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}

function TarjetaResumenRegla({ reglaId }: { reglaId: string }) {
  const regla = reglaPorId(reglaId)!;
  return (
    <div className="rounded-2xl bg-white border-2 border-azulo/10 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-azulo/50">
        {regla.id} · {regla.zona}
      </p>
      <p className="mt-1 text-base font-semibold text-azulo leading-snug">{regla.corta}</p>
    </div>
  );
}
