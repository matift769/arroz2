import { useState } from 'react';
import { Volume2, ChevronDown, ChevronUp, X, type LucideIcon } from 'lucide-react';
import * as Lucide from 'lucide-react';
import { Regla } from '@/data/reglas';
import { hablar, vozDisponible } from '@/lib/hablar';

interface TarjetaReglaProps {
  regla: Regla;
  onClose?: () => void;
  pantallaCompleta?: boolean;
}

const coloresBorde: Record<string, string> = {
  amarillo: 'border-amarillo bg-amarillo-claro',
  verde: 'border-verde bg-verde-claro',
  rojo: 'border-rojo bg-rojo-claro',
  azul: 'border-azulo bg-hueso',
};
const coloresIcono: Record<string, string> = {
  amarillo: 'bg-amarillo text-azulo',
  verde: 'bg-verde text-white',
  rojo: 'bg-rojo text-white',
  azul: 'bg-azulo text-white',
};
const coloresAcento: Record<string, string> = {
  amarillo: 'text-amarillo-oscuro',
  verde: 'text-verde-oscuro',
  rojo: 'text-rojo-oscuro',
  azul: 'text-azulo-claro',
};

function iconoDe(nombre: string): LucideIcon {
  return (Lucide as unknown as Record<string, LucideIcon>)[nombre] ?? Lucide.ShieldAlert;
}

export default function TarjetaRegla({ regla, onClose, pantallaCompleta }: TarjetaReglaProps) {
  const [abierta, setAbierta] = useState(false);
  const Icono = iconoDe(regla.icono);

  return (
    <div
      className={`rounded-3xl border-2 ${coloresBorde[regla.color]} p-5 animate-slide-up`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-4">
          <span
            className={`grid place-items-center w-16 h-16 rounded-2xl ${coloresIcono[regla.color]} shrink-0`}
          >
            <Icono className="w-9 h-9" strokeWidth={2.2} />
          </span>
          <div>
            <span className={`text-xs font-bold uppercase tracking-wide ${coloresAcento[regla.color]}`}>
              {regla.id} · {regla.zona}
            </span>
            <h2 className="text-2xl font-extrabold text-azulo leading-tight">{regla.titulo}</h2>
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            aria-label="Cerrar"
            className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-white/70 text-azulo hover:bg-white"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      <p className="mt-4 text-xl font-semibold text-azulo leading-snug">{regla.corta}</p>

      <div className="flex gap-3 mt-4">
        {vozDisponible() && (
          <button
            onClick={() => hablar(regla.corta + '. ' + regla.oficial)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-azulo font-semibold text-sm hover:bg-hueso border border-azulo/10"
            aria-label={`Escuchar la regla ${regla.id}`}
          >
            <Volume2 className="w-5 h-5" /> Escuchar
          </button>
        )}
      </div>

      <button
        onClick={() => setAbierta((v) => !v)}
        className="flex items-center gap-2 mt-4 text-sm font-semibold text-azulo/70 hover:text-azulo"
        aria-expanded={abierta}
      >
        {abierta ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        Ver regla completa
      </button>
      {abierta && (
        <blockquote className="mt-2 pl-4 border-l-4 border-azulo/20 text-base text-azulo/80 italic leading-relaxed animate-fade-in">
          {regla.oficial}
        </blockquote>
      )}

      {pantallaCompleta && onClose && (
        <button
          onClick={onClose}
          className="mt-6 w-full min-h-[64px] rounded-2xl bg-azulo text-white font-bold text-lg hover:bg-azulo-claro"
        >
          Volver
        </button>
      )}
    </div>
  );
}
