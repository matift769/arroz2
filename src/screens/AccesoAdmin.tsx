import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import { CLAVE_ACCESO_ADMIN } from '@/lib/acceso';

interface AccesoAdminProps {
  onEntrar: () => void;
  onVolver: () => void;
}

// Prototipo: acceso simulado en el navegador, no es seguridad real.
export default function AccesoAdmin({ onEntrar, onVolver }: AccesoAdminProps) {
  const [clave, setClave] = useState('');
  const [mostrar, setMostrar] = useState(false);
  const [error, setError] = useState(false);

  function entrar() {
    if (clave === CLAVE_ACCESO_ADMIN) {
      setError(false);
      onEntrar();
    } else {
      setError(true);
      setClave('');
    }
  }

  return (
    <div className="px-4 pt-6 pb-6 min-h-screen flex flex-col">
      <button
        onClick={onVolver}
        className="flex items-center gap-2 min-h-[56px] w-fit px-4 rounded-2xl bg-white text-azulo font-bold border border-azulo/10 hover:bg-hueso mb-6"
      >
        <ArrowLeft className="w-5 h-5" />
        Volver
      </button>

      <div className="flex flex-col justify-center flex-1 max-w-sm mx-auto w-full">
        <div className="flex items-center gap-3 mb-6 justify-center">
          <span className="grid place-items-center w-14 h-14 rounded-2xl bg-azulo text-amarillo">
            <Lock className="w-8 h-8" strokeWidth={2.4} />
          </span>
          <h1 className="text-2xl font-extrabold text-azulo leading-tight">Acceso de administrador</h1>
        </div>

        <label className="text-sm font-bold text-azulo mb-2" htmlFor="clave-admin">
          Contraseña
        </label>
        <div className="relative mb-3">
          <input
            id="clave-admin"
            type={mostrar ? 'text' : 'password'}
            value={clave}
            onChange={(e) => {
              setClave(e.target.value);
              setError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') entrar();
            }}
            placeholder="Escribe la contraseña"
            className="w-full min-h-[56px] rounded-xl pl-4 pr-12 text-base bg-white border-2 border-azulo/10"
            aria-label="Contraseña de administrador"
            aria-invalid={error}
          />
          <button
            type="button"
            onClick={() => setMostrar((m) => !m)}
            aria-label={mostrar ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            className="absolute right-2 top-1/2 -translate-y-1/2 grid place-items-center w-10 h-10 rounded-full text-azulo/60 hover:bg-hueso"
          >
            {mostrar ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && (
          <p className="text-rojo font-bold text-sm mb-3" role="alert">
            Contraseña incorrecta
          </p>
        )}

        <button
          onClick={entrar}
          className="w-full min-h-[56px] rounded-2xl bg-azulo text-white font-extrabold text-lg hover:bg-azulo-claro"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
