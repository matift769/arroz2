import { useState } from 'react';
import BarraNav, { Pantalla } from '@/components/BarraNav';
import BotonReportar from '@/components/BotonReportar';
import ModalReportar from '@/components/ModalReportar';
import Inicio from '@/screens/Inicio';
import Guia from '@/screens/Guia';
import Pildora from '@/screens/Pildora';
import Simulador from '@/screens/Simulador';
import Trivia from '@/screens/Trivia';
import Seleccion from '@/screens/Seleccion';
import AccesoAdmin from '@/screens/AccesoAdmin';
import Admin from '@/screens/Admin';

type Perfil = 'seleccion' | 'trabajador' | 'acceso' | 'admin';

export default function App() {
  const [perfil, setPerfil] = useState<Perfil>('seleccion');
  const [pantalla, setPantalla] = useState<Pantalla>('inicio');
  const [modalReporte, setModalReporte] = useState(false);

  function ir(p: Pantalla) {
    setPantalla(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Pantalla de selección de perfil
  if (perfil === 'seleccion') {
    return (
      <div className="relative min-h-screen w-full bg-[url('/image.png')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-white/65" aria-hidden="true" />
        <div className="relative min-h-screen mx-auto w-full max-w-[390px] shadow-xl">
          <Seleccion
            onTrabajador={() => {
              setPantalla('inicio');
              setPerfil('trabajador');
            }}
            onAdministrador={() => setPerfil('acceso')}
          />
        </div>
      </div>
    );
  }

  // Acceso de administrador (contraseña)
  if (perfil === 'acceso') {
    return (
      <div className="relative min-h-screen w-full bg-[url('/image.png')] bg-cover bg-center bg-fixed">
        <div className="absolute inset-0 bg-white/65" aria-hidden="true" />
        <div className="relative min-h-screen mx-auto w-full max-w-[390px] shadow-xl">
          <AccesoAdmin
            onEntrar={() => setPerfil('admin')}
            onVolver={() => setPerfil('seleccion')}
          />
        </div>
      </div>
    );
  }

  // Panel de administrador
  if (perfil === 'admin') {
    return (
      <div className="relative min-h-screen w-full bg-hueso">
        <div className="relative min-h-screen mx-auto w-full max-w-[768px] shadow-xl">
          <Admin onCerrarSesion={() => setPerfil('seleccion')} />
        </div>
      </div>
    );
  }

  // Modo trabajador (idéntico al comportamiento anterior)
  return (
    <div className="relative min-h-screen w-full bg-[url('/image.png')] bg-cover bg-center bg-fixed">
      <div className="absolute inset-0 bg-white/65" aria-hidden="true" />
      <div className="relative min-h-screen mx-auto w-full max-w-[390px] shadow-xl">
        <main className="min-h-screen pb-[148px]">
          {pantalla === 'inicio' && <Inicio ir={ir} onCambiarPerfil={() => setPerfil('seleccion')} />}
          {pantalla === 'guia' && <Guia onAtras={() => ir('inicio')} />}
          {pantalla === 'pildora' && <Pildora onAtras={() => ir('inicio')} />}
          {pantalla === 'simulador' && <Simulador onAtras={() => ir('inicio')} />}
          {pantalla === 'trivia' && <Trivia onAtras={() => ir('inicio')} />}
        </main>

        <BotonReportar onClick={() => setModalReporte(true)} />
        <BarraNav actual={pantalla} ir={ir} />
        {modalReporte && <ModalReportar onClose={() => setModalReporte(false)} />}
      </div>
    </div>
  );
}
