import { Home, Search, CalendarDays, Gamepad2, BarChart3 } from 'lucide-react';

export type Pantalla = 'inicio' | 'guia' | 'pildora' | 'simulador' | 'trivia';

interface BarraNavProps {
  actual: Pantalla;
  ir: (p: Pantalla) => void;
}

const items: { id: Pantalla; icono: typeof Home; label: string }[] = [
  { id: 'guia', icono: Search, label: 'Consultar' },
  { id: 'pildora', icono: CalendarDays, label: 'Lección' },
  { id: 'inicio', icono: Home, label: 'Inicio' },
  { id: 'simulador', icono: Gamepad2, label: 'Simulador' },
  { id: 'trivia', icono: BarChart3, label: 'Evaluación' },
];

export default function BarraNav({ actual, ir }: BarraNavProps) {
  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-azulo text-white z-40 border-t border-white/10">
      <ul className="flex items-stretch justify-around">
        {items.map((it) => {
          const activo = actual === it.id;
          const Icono = it.icono;
          return (
            <li key={it.id} className="flex-1">
              <button
                onClick={() => ir(it.id)}
                className="flex flex-col items-center justify-center gap-1 w-full py-2 min-h-[64px]"
                aria-label={it.label}
                aria-current={activo ? 'page' : undefined}
              >
                <Icono
                  className={`w-6 h-6 ${activo ? 'text-amarillo' : 'text-white/70'}`}
                  strokeWidth={activo ? 2.6 : 2}
                />
                <span className={`text-[11px] font-semibold ${activo ? 'text-amarillo' : 'text-white/70'}`}>
                  {it.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
