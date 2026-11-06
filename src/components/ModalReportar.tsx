import { useState } from 'react';
import { X, Mic, Check, AlertTriangle } from 'lucide-react';
import {
  guardarReporte,
  enviarReporte,
  TipoReporte,
  LugarReporte,
  DestinoReporte,
} from '@/lib/reportar';
import { vibrar } from '@/lib/hablar';

interface ModalReportarProps {
  onClose: () => void;
}

const tipos: TipoReporte[] = ['Incidente', 'Casi accidente', 'Situación sospechosa'];
const lugares: LugarReporte[] = ['Planta', 'Bodega', 'Otro'];
const destinos: DestinoReporte[] = ['Líder inmediato', 'Línea interna de seguridad'];

export default function ModalReportar({ onClose }: ModalReportarProps) {
  const [tipo, setTipo] = useState<TipoReporte | null>(null);
  const [lugar, setLugar] = useState<LugarReporte | null>(null);
  const [descripcion, setDescripcion] = useState('');
  const [destino, setDestino] = useState<DestinoReporte | null>(null);
  const [enviado, setEnviado] = useState(false);

  const listo = tipo && lugar && destino;

  function enviar() {
    if (!listo) return;
    const rep = guardarReporte({ tipo, lugar, descripcion, destino });
    void enviarReporte(rep);
    vibrar(60);
    setEnviado(true);
  }

  function reset() {
    setTipo(null);
    setLugar(null);
    setDescripcion('');
    setDestino(null);
    setEnviado(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 animate-fade-in">
      <div className="w-full max-w-[390px] bg-hueso rounded-t-3xl sm:rounded-3xl p-5 max-h-[90vh] overflow-y-auto animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-extrabold text-azulo flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-rojo" /> Reportar incidente
          </h2>
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="grid place-items-center w-10 h-10 rounded-full bg-white text-azulo hover:bg-hueso border border-azulo/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {enviado ? (
          <div className="text-center py-6 animate-pop">
            <span className="grid place-items-center w-20 h-20 rounded-full bg-verde text-white mx-auto">
              <Check className="w-10 h-10" strokeWidth={3} />
            </span>
            <p className="mt-4 text-xl font-extrabold text-azulo">Reporte registrado</p>
            <p className="mt-1 text-base text-azulo/70">
              Recuerda: máximo 24 horas para notificar a tu líder o a la línea interna de seguridad.
            </p>
            <button
              onClick={reset}
              className="mt-6 w-full min-h-[64px] rounded-2xl bg-azulo text-white font-bold text-lg hover:bg-azulo-claro"
            >
              Hacer otro reporte
            </button>
            <button
              onClick={onClose}
              className="mt-3 w-full min-h-[56px] rounded-2xl bg-white text-azulo font-bold border border-azulo/10"
            >
              Listo
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-azulo/60 mb-4">
              Prototipo: el reporte se guarda en este dispositivo.
            </p>

            <fieldset className="mb-4">
              <legend className="text-sm font-bold text-azulo mb-2">Tipo</legend>
              <div className="flex flex-col gap-2">
                {tipos.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTipo(t)}
                    className={`min-h-[56px] rounded-xl px-4 text-left font-semibold border-2 ${
                      tipo === t
                        ? 'bg-rojo text-white border-rojo'
                        : 'bg-white text-azulo border-azulo/10'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-4">
              <legend className="text-sm font-bold text-azulo mb-2">Lugar</legend>
              <div className="flex gap-2">
                {lugares.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLugar(l)}
                    className={`flex-1 min-h-[56px] rounded-xl font-semibold border-2 ${
                      lugar === l
                        ? 'bg-azulo text-white border-azulo'
                        : 'bg-white text-azulo border-azulo/10'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="mb-4">
              <legend className="text-sm font-bold text-azulo mb-2">
                Descripción (opcional, máx. 140)
              </legend>
              <div className="relative">
                <textarea
                  value={descripcion}
                  onChange={(e) => setDescripcion(e.target.value.slice(0, 140))}
                  rows={3}
                  className="w-full rounded-xl p-3 text-base bg-white border-2 border-azulo/10 resize-none"
                  placeholder="Cuenta brevemente qué pasó"
                />
                <button
                  onClick={() => dictarDescripcion(setDescripcion, descripcion)}
                  className="absolute bottom-2 right-2 grid place-items-center w-10 h-10 rounded-full bg-azulo text-white hover:bg-azulo-claro"
                  aria-label="Dictar descripción"
                  title="Dictar"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>
              <span className="text-xs text-azulo/50">{descripcion.length}/140</span>
            </fieldset>

            <fieldset className="mb-4">
              <legend className="text-sm font-bold text-azulo mb-2">¿A quién se reporta?</legend>
              <div className="flex flex-col gap-2">
                {destinos.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDestino(d)}
                    className={`min-h-[56px] rounded-xl px-4 text-left font-semibold border-2 ${
                      destino === d
                        ? 'bg-azulo text-white border-azulo'
                        : 'bg-white text-azulo border-azulo/10'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </fieldset>

            <button
              onClick={enviar}
              disabled={!listo}
              className="w-full min-h-[64px] rounded-2xl bg-rojo text-white font-extrabold text-lg disabled:opacity-40 hover:bg-rojo-oscuro"
            >
              Enviar reporte
            </button>
          </>
        )}
      </div>
    </div>
  );
}

// Dictado por voz si el navegador lo soporta. Usa Any para evitar tipos ausentes.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function dictarDescripcion(set: (v: string) => void, actual: string): void {
  const w = window as any;
  const SR = w.SpeechRecognition || w.webkitSpeechRecognition;
  if (!SR) return;
  const rec = new SR();
  rec.lang = 'es-CO';
  rec.onresult = (e: any) => {
    const texto = Array.from(e.results).map((r: any) => r[0].transcript).join(' ');
    set((actual + ' ' + texto).slice(0, 140).trim());
  };
  try {
    rec.start();
  } catch {
    // noop
  }
}
