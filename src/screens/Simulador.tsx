import { useState, useCallback } from 'react';
import { Check, X, ChevronRight, Trophy, Home, Play } from 'lucide-react';
import Encabezado from '@/components/Encabezado';
import { SITUACIONES, barajarOpciones, OpcionSituacion, Situacion } from '@/data/situaciones';
import { reglaPorId } from '@/data/reglas';
import TarjetaRegla from '@/components/TarjetaRegla';
import { vibrar } from '@/lib/hablar';

interface SimuladorProps {
  onAtras: () => void;
}

const TAMAÑO_RONDA = 5;

interface SesionSimulador {
  ronda: Situacion[];
  restantes: Situacion[];
  usadas: number[];
  numeroRonda: number;
}

function nuevaRonda(restantes: Situacion[], usadas: number[], numeroRonda: number): SesionSimulador {
  let pool = restantes;
  let usadasSet = new Set(usadas);

  if (pool.length < TAMAÑO_RONDA) {
    pool = [...SITUACIONES];
    usadasSet = new Set<number>();
  }

  const indices = pool.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }

  const elegidasIdx = indices.slice(0, TAMAÑO_RONDA);
  const ronda = elegidasIdx.map((i) => ({
    ...pool[i],
    opciones: barajarOpciones(pool[i].opciones),
  }));

  const nuevasUsadas = [...usadasSet];
  for (const s of ronda) nuevasUsadas.push(s.id);
  const nuevasRestantes = pool.filter((s) => !ronda.some((r) => r.id === s.id));

  return { ronda, restantes: nuevasRestantes, usadas: nuevasUsadas, numeroRonda };
}

export default function Simulador({ onAtras }: SimuladorProps) {
  const [sesion, setSesion] = useState<SesionSimulador>(() =>
    nuevaRonda([...SITUACIONES], [], 1),
  );
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState<OpcionSituacion | null>(null);
  const [aciertosRonda, setAciertosRonda] = useState(0);
  const [aciertosTotal, setAciertosTotal] = useState(0);
  const [situacionesTotal, setSituacionesTotal] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const actual = sesion.ronda[indice];

  const responder = useCallback(
    (opcion: OpcionSituacion) => {
      if (elegida) return;
      setElegida(opcion);
      if (opcion.correcta) setAciertosRonda((v) => v + 1);
      vibrar(opcion.correcta ? 45 : [30, 40, 30]);
    },
    [elegida],
  );

  const siguiente = useCallback(() => {
    if (indice + 1 >= sesion.ronda.length) {
      setAciertosTotal((t) => t + aciertosRonda);
      setSituacionesTotal((t) => t + sesion.ronda.length);
      setTerminado(true);
    } else {
      setIndice((v) => v + 1);
      setElegida(null);
    }
  }, [indice, sesion.ronda.length, aciertosRonda]);

  const iniciarNuevaRonda = useCallback(() => {
    setSesion((prev) => nuevaRonda(prev.restantes, prev.usadas, prev.numeroRonda + 1));
    setIndice(0);
    setElegida(null);
    setAciertosRonda(0);
    setTerminado(false);
  }, []);

  if (terminado) {
    const mensaje =
      aciertosRonda >= 4
        ? '¡Muy bien!'
        : aciertosRonda >= 2
          ? 'Vas bien, sigue practicando'
          : 'Repasa las normas y sigue intentando';

    return (
      <>
        <Encabezado titulo="Simulador" onAtras={onAtras} />
        <div className="px-4 pt-6 pb-4 text-center">
          <span className="grid place-items-center w-24 h-24 rounded-full bg-amarillo text-azulo mx-auto animate-pop">
            <Trophy className="w-12 h-12" strokeWidth={2.2} />
          </span>
          <p className="mt-4 text-3xl font-extrabold text-azulo">
            Acertaste {aciertosRonda} de {TAMAÑO_RONDA}
          </p>
          <p className="mt-2 text-base text-azulo/80 font-semibold">{mensaje}</p>

          <div className="mt-6 flex flex-col gap-3">
            <button
              onClick={iniciarNuevaRonda}
              className="flex items-center justify-center gap-2 w-full min-h-[64px] rounded-2xl bg-verde text-white font-bold text-lg hover:bg-verde-oscuro"
            >
              <Play className="w-5 h-5" /> Seguir con 5 más
            </button>
            <button
              onClick={onAtras}
              className="flex items-center justify-center gap-2 w-full min-h-[64px] rounded-2xl bg-azulo text-white font-bold text-lg hover:bg-azulo-claro"
            >
              <Home className="w-5 h-5" /> Volver al menú
            </button>
          </div>

          <p className="mt-5 text-sm text-azulo/50 font-semibold">
            Llevas {aciertosTotal + aciertosRonda} aciertos en {situacionesTotal} situaciones
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Encabezado titulo="Simulador" onAtras={onAtras} />
      <div className="px-4 pt-4 pb-4">
        <p className="text-lg font-extrabold text-azulo mb-3">👆 Responde tocando uno de los botones</p>
        <p className="text-sm font-bold text-azulo/70 mb-2">
          Ronda {sesion.numeroRonda} · Situación {indice + 1} de {TAMAÑO_RONDA}
        </p>
        <div className="h-3 rounded-full bg-azulo/10 mb-4">
          <div
            className="h-3 rounded-full bg-verde transition-all"
            style={{ width: `${((indice + (elegida ? 1 : 0)) / TAMAÑO_RONDA) * 100}%` }}
          />
        </div>

        <div className="rounded-3xl bg-white border-2 border-azulo/10 p-5 mb-4 animate-slide-up">
          <p className="text-xl font-extrabold text-azulo leading-tight">{actual.escena}</p>
        </div>

        <div className="flex flex-col gap-3">
          {actual.opciones.map((opcion) => {
            const seleccionada = elegida === opcion;
            const mostrarBien = elegida !== null && opcion.correcta;
            const mostrarMal = seleccionada && !opcion.correcta;
            return (
              <button
                key={opcion.texto}
                onClick={() => responder(opcion)}
                disabled={elegida !== null}
                className={`flex items-center justify-between gap-3 w-full min-h-[68px] rounded-2xl px-4 text-left font-semibold border-2 ${
                  mostrarBien ? 'bg-verde text-white border-verde' : mostrarMal ? 'bg-rojo text-white border-rojo' : 'bg-white text-azulo border-azulo/10'
                }`}
              >
                <span>{opcion.texto}</span>
                {mostrarBien && <Check className="w-6 h-6 shrink-0" />}
                {mostrarMal && <X className="w-6 h-6 shrink-0" />}
              </button>
            );
          })}
        </div>

        {elegida && (
          <div className="mt-4 animate-slide-up">
            <div className={`rounded-2xl p-4 ${elegida.correcta ? 'bg-verde-claro border-2 border-verde' : 'bg-rojo-claro border-2 border-rojo'}`}>
              <p className="text-lg font-extrabold text-azulo flex items-center gap-2">
                {elegida.correcta ? <><Check className="w-6 h-6 text-verde-oscuro" /> Correcto</> : <><X className="w-6 h-6 text-rojo-oscuro" /> Incorrecto</>}
              </p>
              <p className="mt-1 text-base font-semibold text-azulo">Norma relacionada:</p>
            </div>
            <div className="mt-3">
              <TarjetaRegla regla={reglaPorId(elegida.reglaId)!} />
            </div>
            <button
              onClick={siguiente}
              className="mt-4 flex items-center justify-center gap-2 w-full min-h-[64px] rounded-2xl bg-azulo text-white font-bold text-lg"
            >
              {indice + 1 >= sesion.ronda.length ? 'Ver resultado' : 'Siguiente situación'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
