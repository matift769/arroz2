import { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';

interface EncabezadoProps {
  titulo: string;
  onAtras?: () => void;
  acento?: 'azulo' | 'amarillo';
  children?: ReactNode;
}

export default function Encabezado({ titulo, onAtras, acento = 'azulo', children }: EncabezadoProps) {
  const esAmarillo = acento === 'amarillo';
  return (
    <header className="relative overflow-hidden bg-azulo text-white">
      {esAmarillo && <div className="h-2 hazard-stripes" aria-hidden="true" />}
      <div className="flex flex-col gap-3 px-4 py-4">
        <h1 className="text-2xl font-extrabold leading-tight">{titulo}</h1>
        {onAtras && (
          <button
            onClick={onAtras}
            aria-label="Volver al menú"
            className="flex items-center justify-center gap-2 w-full min-h-[64px] rounded-2xl bg-white/10 hover:bg-white/20 font-bold text-lg"
          >
            <ArrowLeft className="w-6 h-6" />
            Volver al menú
          </button>
        )}
      </div>
      {children}
    </header>
  );
}
