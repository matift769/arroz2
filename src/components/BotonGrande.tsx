import { ButtonHTMLAttributes } from 'react';
import { ChevronRight, LucideIcon } from 'lucide-react';

interface BotonGrandeProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icono: LucideIcon;
  titulo: string;
  subtitulo?: string;
  color?: 'azulo' | 'amarillo' | 'verde' | 'rojo' | 'hueso';
}

const colores: Record<string, string> = {
  azulo: 'bg-azulo text-white hover:bg-azulo-claro active:bg-azulo-oscuro',
  amarillo: 'bg-amarillo text-azulo hover:bg-amarillo-oscuro',
  verde: 'bg-verde text-white hover:bg-verde-oscuro',
  rojo: 'bg-rojo text-white hover:bg-rojo-oscuro',
  hueso: 'bg-white text-azulo hover:bg-hueso border border-azulo/10',
};

export default function BotonGrande({
  icono: Icono,
  titulo,
  subtitulo,
  color = 'azulo',
  className = '',
  ...props
}: BotonGrandeProps) {
  return (
    <button
      {...props}
      className={`flex items-center gap-4 rounded-2xl px-5 py-4 min-h-[80px] w-full text-left transition-colors shadow-sm ${colores[color]} ${className}`}
    >
      <span className="shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-white/15">
        <Icono className="w-7 h-7" strokeWidth={2.2} />
      </span>
      <span className="flex flex-col flex-1">
        <span className="text-lg font-extrabold leading-tight">{titulo}</span>
        {subtitulo && (
          <span className="text-sm font-normal opacity-90 leading-snug">{subtitulo}</span>
        )}
      </span>
      <ChevronRight className="w-7 h-7 shrink-0" strokeWidth={2.6} aria-hidden="true" />
    </button>
  );
}
