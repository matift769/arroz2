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
