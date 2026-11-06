import { ShieldCheck, HardHat, Wrench } from 'lucide-react';

interface SeleccionProps {
  onTrabajador: () => void;
  onAdministrador: () => void;
}

export default function Seleccion({ onTrabajador, onAdministrador }: SeleccionProps) {
  return (
    <div className="px-4 pt-10 pb-6 min-h-screen flex flex-col justify-center">
      <div className="flex items-center gap-3 mb-6 justify-center">
        <span className="grid place-items-center w-14 h-14 rounded-2xl bg-azulo text-amarillo">
          <ShieldCheck className="w-8 h-8" strokeWidth={2.4} />
        </span>
        <h1 className="text-2xl font-extrabold text-azulo leading-tight">Consulta de Seguridad</h1>
      </div>

      <p className="text-xl font-extrabold text-azulo text-center mb-6">¿Cómo quieres entrar?</p>

      <div className="flex flex-col gap-4">
        <button
          onClick={onTrabajador}
          className="flex items-center gap-4 rounded-2xl px-5 py-4 min-h-[80px] w-full text-left bg-amarillo text-azulo hover:bg-amarillo-oscuro active:scale-[0.99] transition-transform shadow-sm"
        >
          <span className="shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-white/30">
            <HardHat className="w-7 h-7" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col flex-1">
            <span className="text-lg font-extrabold leading-tight">Trabajador</span>
            <span className="text-sm font-normal opacity-90 leading-snug">Consulta, practica y reporta</span>
          </span>
        </button>

        <button
          onClick={onAdministrador}
          className="flex items-center gap-4 rounded-2xl px-5 py-4 min-h-[80px] w-full text-left bg-azulo text-white hover:bg-azulo-claro active:scale-[0.99] transition-transform shadow-sm"
        >
          <span className="shrink-0 grid place-items-center w-12 h-12 rounded-xl bg-white/15">
            <Wrench className="w-7 h-7" strokeWidth={2.2} />
          </span>
          <span className="flex flex-col flex-1">
            <span className="text-lg font-extrabold leading-tight">Administrador</span>
            <span className="text-sm font-normal opacity-90 leading-snug">Estadísticas y reportes</span>
          </span>
        </button>
      </div>
    </div>
  );
}
