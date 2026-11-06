import { Siren } from 'lucide-react';

interface BotonReportarProps {
  onClick: () => void;
}

export default function BotonReportar({ onClick }: BotonReportarProps) {
  return (
    <button
      onClick={onClick}
      aria-label="Reportar incidente"
      className="fixed bottom-[72px] left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 min-h-[56px] rounded-full bg-rojo text-white font-extrabold shadow-lg shadow-rojo/40 hover:bg-rojo-oscuro active:scale-95 transition-transform"
    >
      <Siren className="w-6 h-6" />
      <span className="text-base">Reportar incidente (&lt; 24 h)</span>
    </button>
  );
}
