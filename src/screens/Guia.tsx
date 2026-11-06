import { useState } from 'react';
import { Search as SearchIcon, X, HardHat, Cog, Footprints, Forklift, BadgeCheck, Siren, DoorOpen, ShieldAlert, type LucideIcon } from 'lucide-react';
import Encabezado from '@/components/Encabezado';
import TarjetaRegla from '@/components/TarjetaRegla';
import { REGLAS, Regla } from '@/data/reglas';

const iconos: Record<string, LucideIcon> = {
  HardHat,
  Cog,
  Footprints,
  Forklift,
  BadgeCheck,
  Siren,
  DoorOpen,
};

interface GuiaProps {
  onAtras: () => void;
}

export default function Guia({ onAtras }: GuiaProps) {
  const [busqueda, setBusqueda] = useState('');
  const [seleccionada, setSeleccionada] = useState<Regla | null>(null);
  const [mapaAbierto, setMapaAbierto] = useState(false);

  const q = busqueda.trim().toLowerCase();
  const filtradas = q
    ? REGLAS.filter(
        (r) =>
          r.titulo.toLowerCase().includes(q) ||
          r.zona.toLowerCase().includes(q) ||
          r.palabras.some((p) => p.includes(q)) ||
          r.corta.toLowerCase().includes(q),
      )
    : REGLAS;

  if (seleccionada) {
    return (
      <div className="px-4 pt-4 pb-4">
        <TarjetaRegla
          regla={seleccionada}
          pantallaCompleta
          onClose={() => setSeleccionada(null)}
        />
      </div>
    );
  }

  return (
    <>
      <Encabezado titulo="Guía de bolsillo" onAtras={onAtras} acento="amarillo" />
      <div className="px-4 pt-4 pb-4">
        <section className="mb-4 rounded-2xl border-2 border-azulo/10 bg-white p-3 shadow-sm">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2 className="text-lg font-extrabold text-azulo">Mapa de zonas</h2>
            <span className="text-xs font-semibold text-azulo/55">Toca para ampliar</span>
          </div>
          <button
            type="button"
            onClick={() => setMapaAbierto(true)}
            className="block w-full overflow-hidden rounded-xl bg-hueso text-left transition-transform hover:brightness-95 active:scale-[0.99]"
            aria-label="Abrir mapa de las zonas de la planta"
          >
            <span className="block aspect-[16/9] w-full">
              <img
                src="/images/mapa-zonas.png"
                alt="Mapa de las zonas de la planta con los colores de cada norma"
                loading="lazy"
                className="h-full w-full object-contain"
              />
            </span>
          </button>
        </section>

        <div className="relative mb-4">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-azulo/40" />
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Busca: casco, candado, montacargas…"
            className="w-full min-h-[56px] rounded-xl pl-11 pr-10 text-base bg-white border-2 border-azulo/10"
            aria-label="Buscar regla por palabra clave"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              aria-label="Borrar búsqueda"
              className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-full text-azulo/50 hover:bg-hueso"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {filtradas.length === 0 ? (
          <p className="text-center text-azulo/60 py-10">
            No encontramos esa palabra. Prueba con otra.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-3">
            {filtradas.map((r) => {
              const Icono = iconos[r.icono] ?? ShieldAlert;
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setSeleccionada(r)}
                    className={`flex flex-col items-center gap-2 w-full min-h-[140px] rounded-2xl p-3 border-2 ${fondoPorColor(r.color)} hover:brightness-95 active:scale-[0.98] transition-transform`}
                    aria-label={`Ver regla ${r.id}: ${r.titulo}`}
                  >
                    <span className={`grid place-items-center w-14 h-14 rounded-xl ${rellenoPorColor(r.color)}`}>
                      <Icono className="w-8 h-8" strokeWidth={2.2} />
                    </span>
                    <span className="text-sm font-bold text-azulo text-center leading-tight">
                      {r.titulo}
                    </span>
                    <span className={`text-[11px] font-semibold ${acentoPorColor(r.color)}`}>
                      {r.id}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        {mapaAbierto && (
          <div
            className="fixed inset-0 z-50 grid place-items-center bg-black/90 p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Mapa ampliado de las zonas de la planta"
            onClick={() => setMapaAbierto(false)}
          >
            <button
              type="button"
              onClick={() => setMapaAbierto(false)}
              className="absolute right-4 top-4 z-10 min-h-[52px] rounded-xl bg-white px-5 text-base font-extrabold text-azulo shadow-lg"
            >
              Cerrar
            </button>
            <img
              src="/images/mapa-zonas.png"
              alt="Mapa de las zonas de la planta con los colores de cada norma"
              onClick={(e) => e.stopPropagation()}
              className="max-h-[calc(100vh-40px)] max-w-full object-contain [touch-action:pinch-zoom]"
            />
          </div>
        )}
      </div>
    </>
  );
}

function fondoPorColor(c: string): string {
  if (c === 'amarillo') return 'bg-amarillo-claro border-amarillo';
  if (c === 'verde') return 'bg-verde-claro border-verde';
  if (c === 'azul') return 'bg-hueso border-azulo';
  return 'bg-rojo-claro border-rojo';
}
function rellenoPorColor(c: string): string {
  if (c === 'amarillo') return 'bg-amarillo text-azulo';
  if (c === 'verde') return 'bg-verde text-white';
  if (c === 'azul') return 'bg-azulo text-white';
  return 'bg-rojo text-white';
}
function acentoPorColor(c: string): string {
  if (c === 'amarillo') return 'text-amarillo-oscuro';
  if (c === 'verde') return 'text-verde-oscuro';
  if (c === 'azul') return 'text-azulo-claro';
  return 'text-rojo-oscuro';
}
