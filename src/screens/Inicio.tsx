import { Search, CalendarDays, Gamepad2, BarChart3, ShieldCheck, ArrowLeftRight, MessageCircle } from 'lucide-react';
import BotonGrande from '@/components/BotonGrande';
import { Pantalla } from '@/components/BarraNav';

interface InicioProps {
  ir: (p: Pantalla) => void;
  onCambiarPerfil: () => void;
}

const URL_ASISTENTE_IA = 'https://gemini.google.com/gem/1_xgKSnME15VkJtSLIJnvolDUXEnfAVOp?usp=sharing';

export default function Inicio({ ir, onCambiarPerfil }: InicioProps) {
  return (
    <div className="px-4 pt-6 pb-4">
      <div className="flex items-center gap-3 mb-5">
        <span className="grid place-items-center w-14 h-14 rounded-2xl bg-azulo text-amarillo">
          <ShieldCheck className="w-8 h-8" strokeWidth={2.4} />
        </span>
        <div>
          <h1 className="text-2xl font-extrabold text-azulo leading-tight">Consulta de Seguridad</h1>
          <p className="text-base text-azulo/80">Hola, ¿qué necesitas hoy?</p>
        </div>
      </div>

      <a
        href={URL_ASISTENTE_IA}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 w-full min-h-[64px] rounded-2xl bg-white text-azulo font-semibold border border-azulo/15 hover:bg-hueso px-4 mb-4"
      >
        <MessageCircle className="w-6 h-6 shrink-0" />
        <span className="flex flex-col">
          <span className="text-base font-bold leading-tight">💬 Preguntar al asistente</span>
          <span className="text-xs font-normal text-azulo/60 leading-snug">
            Complemento con IA. Puede equivocarse: las normas oficiales están en esta Guía.
          </span>
        </span>
      </a>

      <p className="text-2xl font-extrabold text-azulo leading-tight mb-4">Toca un botón para empezar 👇</p>

      <div className="flex flex-col gap-3">
        <BotonGrande
          icono={Search}
          titulo="Consultar una norma"
          subtitulo="Busca qué debes hacer"
          color="amarillo"
          onClick={() => ir('guia')}
        />
        <BotonGrande
          icono={CalendarDays}
          titulo="Lección diaria"
          subtitulo="Una norma nueva cada día"
          color="azulo"
          onClick={() => ir('pildora')}
        />
        <BotonGrande
          icono={Gamepad2}
          titulo="Simulador"
          subtitulo="Practica qué harías"
          color="verde"
          onClick={() => ir('simulador')}
        />
        <BotonGrande
          icono={BarChart3}
          titulo="Evaluación"
          subtitulo="Mide qué tanto recuerdas"
          color="rojo"
          onClick={() => ir('trivia')}
        />
      </div>

      <button
        onClick={onCambiarPerfil}
        className="mt-4 w-full min-h-[56px] rounded-2xl bg-white text-azulo font-semibold border border-azulo/15 hover:bg-hueso flex items-center justify-center gap-2"
      >
        <ArrowLeftRight className="w-5 h-5" />
        Cambiar de perfil
      </button>
    </div>
  );
}
