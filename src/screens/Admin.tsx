import { useEffect, useState, useMemo } from 'react';
import { RefreshCw, LogOut, BarChart3, Siren, AlertTriangle, Eye, TrendingUp, ClipboardList, MessagesSquare, BookOpen } from 'lucide-react';
import { REGLAS } from '@/data/reglas';
import { obtenerDatosSheets, DatosSheets } from '@/lib/datosSheets';
import {
  RECORDACION_30_DIAS,
  INCIDENTES_REPORTADOS,
  ENCUESTA_INTERNA,
  MANUAL_ACTUALIZACION,
  PERFIL_PROTOTIPO,
} from '@/data/estadisticasAnio';

interface AdminProps {
  onCerrarSesion: () => void;
}

type Pestana = 'estadisticas' | 'reportes' | 'anio';

const TIPOS_REPORTE = ['Incidente', 'Casi accidente', 'Situación sospechosa'] as const;
type TipoReporte = (typeof TIPOS_REPORTE)[number];

const iconoTipo: Record<TipoReporte, typeof Siren> = {
  Incidente: Siren,
  'Casi accidente': AlertTriangle,
  'Situación sospechosa': Eye,
};

const colorTipo: Record<TipoReporte, string> = {
  Incidente: 'bg-rojo text-white',
  'Casi accidente': 'bg-amarillo text-azulo',
  'Situación sospechosa': 'bg-azulo text-white',
};

export default function Admin({ onCerrarSesion }: AdminProps) {
  const [pestanas, setPestanas] = useState<Pestana>('estadisticas');
  const [datos, setDatos] = useState<DatosSheets | null>(null);
  const [estado, setEstado] = useState<'cargando' | 'ok' | 'error'>('cargando');
  const [ultimaAct, setUltimaAct] = useState<Date | null>(null);

  async function cargar() {
    setEstado('cargando');
    try {
      const d = await obtenerDatosSheets();
      setDatos(d);
      setUltimaAct(new Date());
      setEstado('ok');
    } catch {
      setEstado('error');
    }
  }

  useEffect(() => {
    cargar();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-azulo-oscuro text-white">
        <div className="px-4 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="grid place-items-center w-9 h-9 rounded-lg bg-white/10 text-amarillo text-xs font-extrabold">
              ADMIN
            </span>
            <span className="text-sm font-bold">Administrador</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={cargar}
              className="flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-semibold"
              aria-label="Actualizar datos"
            >
              <RefreshCw className="w-4 h-4" />
              Actualizar
            </button>
            <button
              onClick={onCerrarSesion}
              className="flex items-center gap-1.5 min-h-[44px] px-3 rounded-xl bg-rojo hover:bg-rojo-oscuro text-sm font-semibold"
            >
              <LogOut className="w-4 h-4" />
              Cerrar sesión
            </button>
          </div>
        </div>
        {ultimaAct && (
          <div className="px-4 pb-2 text-xs text-white/60">
            Última actualización: {ultimaAct.toLocaleString('es-CO')}
          </div>
        )}
      </header>

      <div className="flex flex-col flex-1 max-w-[768px] w-full mx-auto px-4 pt-4 pb-6">
        {estado === 'cargando' && (
          <div className="flex flex-col items-center justify-center py-16 text-azulo/70">
            <RefreshCw className="w-8 h-8 animate-spin mb-3" />
            <p className="font-semibold">Cargando datos…</p>
          </div>
        )}

        {estado === 'error' && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="font-semibold text-azulo mb-4">No se pudieron cargar los datos. Revisa la conexión</p>
            <button
              onClick={cargar}
              className="flex items-center gap-2 min-h-[56px] px-5 rounded-2xl bg-azulo text-white font-bold hover:bg-azulo-claro"
            >
              <RefreshCw className="w-5 h-5" />
              Reintentar
            </button>
          </div>
        )}

        {estado === 'ok' && datos && (
          <>
            <div className="flex gap-2 mb-5 flex-wrap">
              <PestanaBoton
                activo={pestanas === 'estadisticas'}
                onClick={() => setPestanas('estadisticas')}
                icono={BarChart3}
                label="📊 Estadísticas"
              />
              <PestanaBoton
                activo={pestanas === 'reportes'}
                onClick={() => setPestanas('reportes')}
                icono={Siren}
                label="🚨 Reportes"
              />
              <PestanaBoton
                activo={pestanas === 'anio'}
                onClick={() => setPestanas('anio')}
                icono={TrendingUp}
                label="📈 Estadísticas último año"
              />
            </div>

            {pestanas === 'estadisticas' ? (
              <Estadisticas datos={datos} />
            ) : pestanas === 'reportes' ? (
              <Reportes datos={datos} />
            ) : (
              <EstadisticasAnio />
            )}
          </>
        )}
      </div>
    </div>
  );
}

function PestanaBoton({
  activo,
  onClick,
  icono: Icono,
  label,
}: {
  activo: boolean;
  onClick: () => void;
  icono: typeof BarChart3;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 flex items-center justify-center gap-2 min-h-[56px] rounded-2xl font-extrabold text-base transition-colors ${
        activo ? 'bg-azulo text-white' : 'bg-white text-azulo border-2 border-azulo/10 hover:bg-hueso'
      }`}
    >
      <Icono className="w-5 h-5" />
      {label}
    </button>
  );
}

// ---------------- ESTADÍSTICAS ----------------

interface ResumenRegla {
  id: string;
  titulo: string;
  aciertos: number;
  errores: number;
  total: number;
  porcentaje: number;
  porcentajeError: number;
}

function Estadisticas({ datos }: { datos: DatosSheets }) {
  const { respuestas } = datos;
  const total = respuestas.length;
  const aciertos = respuestas.filter((r) => r.acierto).length;
  const porcentajeGeneral = total > 0 ? Math.round((aciertos / total) * 100) : 0;

  const resumen: ResumenRegla[] = useMemo(() => {
    const map: Record<string, ResumenRegla> = {};
    for (const r of REGLAS) {
      map[r.id] = {
        id: r.id,
        titulo: r.titulo,
        aciertos: 0,
        errores: 0,
        total: 0,
        porcentaje: 0,
        porcentajeError: 0,
      };
    }
    for (const r of respuestas) {
      const entry = map[r.regla];
      if (!entry) continue;
      entry.total += 1;
      if (r.acierto) entry.aciertos += 1;
      else entry.errores += 1;
    }
    const lista = Object.values(map);
    for (const e of lista) {
      e.porcentaje = e.total > 0 ? Math.round((e.aciertos / e.total) * 100) : 0;
      e.porcentajeError = e.total > 0 ? Math.round((e.errores / e.total) * 100) : 0;
    }
    return lista;
  }, [respuestas]);

  const reforzarIds = useMemo(() => {
    return resumen
      .filter((r) => r.errores >= 1)
      .sort((a, b) => b.porcentajeError - a.porcentajeError)
      .slice(0, 3)
      .map((r) => r.id);
  }, [resumen]);

  if (total === 0) {
    return <EstadoVacio />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3">
        <TarjetaResumen valor={String(total)} label="Total de respuestas" />
        <TarjetaResumen valor={`${porcentajeGeneral}%`} label="Aciertos general" />
      </div>

      <div className="flex flex-col gap-4">
        {resumen.map((r) => {
          const reforzar = reforzarIds.includes(r.id);
          return (
            <div key={r.id} className="bg-white rounded-2xl p-4 border border-azulo/10">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="font-bold text-azulo text-sm leading-tight">
                  {r.id} · {r.titulo}
                </span>
                {reforzar && (
                  <span className="shrink-0 text-[11px] font-extrabold bg-rojo text-white px-2 py-1 rounded-full">
                    Reforzar
                  </span>
                )}
              </div>

              {r.total === 0 ? (
                <p className="text-sm text-azulo/50">Sin respuestas todavía</p>
              ) : (
                <>
                  <div className="flex h-5 rounded-full overflow-hidden bg-hueso border border-azulo/10">
                    <div
                      className="bg-verde transition-all"
                      style={{ width: `${(r.aciertos / r.total) * 100}%` }}
                      title={`Aciertos: ${r.aciertos}`}
                    />
                    <div
                      className="bg-rojo transition-all"
                      style={{ width: `${(r.errores / r.total) * 100}%` }}
                      title={`Errores: ${r.errores}`}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2 text-xs font-semibold">
                    <span className="text-verde-oscuro">{r.aciertos} aciertos</span>
                    <span className="text-rojo-oscuro">{r.errores} errores</span>
                    <span className="text-azulo">{r.porcentaje}% acierto</span>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {reforzarIds.length > 0 && (
        <p className="text-sm text-azulo/70 text-center">Las normas marcadas necesitan más refuerzo</p>
      )}
    </div>
  );
}

function TarjetaResumen({ valor, label }: { valor: string; label: string }) {
  return (
    <div className="bg-azulo text-white rounded-2xl p-4 flex flex-col items-center text-center">
      <span className="text-3xl font-extrabold leading-none">{valor}</span>
      <span className="text-xs font-semibold text-white/70 mt-2 leading-tight">{label}</span>
    </div>
  );
}

// ---------------- REPORTES ----------------

function Reportes({ datos }: { datos: DatosSheets }) {
  const { reportes } = datos;
  const [filtro, setFiltro] = useState<'Todos' | TipoReporte>('Todos');

  const ordenados = useMemo(() => {
    const copia = [...reportes];
    copia.sort((a, b) => (a.fecha < b.fecha ? 1 : a.fecha > b.fecha ? -1 : 0));
    return copia;
  }, [reportes]);

  const filtrados = useMemo(() => {
    if (filtro === 'Todos') return ordenados;
    return ordenados.filter((r) => r.tipo === filtro);
  }, [ordenados, filtro]);

  const conteoTipo: Record<string, number> = useMemo(() => {
    const c: Record<string, number> = { Incidente: 0, 'Casi accidente': 0, 'Situación sospechosa': 0 };
    for (const r of reportes) {
      if (c[r.tipo] !== undefined) c[r.tipo] += 1;
    }
    return c;
  }, [reportes]);

  if (reportes.length === 0) {
    return <EstadoVacio />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <TarjetaResumen valor={String(reportes.length)} label="Total reportes" />
        {TIPOS_REPORTE.map((t) => (
          <TarjetaResumen key={t} valor={String(conteoTipo[t] ?? 0)} label={t} />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <FiltroBoton activo={filtro === 'Todos'} onClick={() => setFiltro('Todos')} label="Todos" />
        {TIPOS_REPORTE.map((t) => (
          <FiltroBoton key={t} activo={filtro === t} onClick={() => setFiltro(t)} label={t} />
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filtrados.map((r, i) => {
          const tipo = r.tipo as TipoReporte;
          const Icono = iconoTipo[tipo] ?? Siren;
          const color = colorTipo[tipo] ?? 'bg-azulo text-white';
          let fechaLocal = r.fecha;
          try {
            const d = new Date(r.fecha);
            if (!isNaN(d.getTime())) fechaLocal = d.toLocaleString('es-CO');
          } catch {
            // dejar original
          }
          return (
            <div key={i} className="bg-white rounded-2xl p-4 border border-azulo/10">
              <div className="flex items-center gap-3 mb-2">
                <span className={`shrink-0 grid place-items-center w-10 h-10 rounded-xl ${color}`}>
                  <Icono className="w-5 h-5" />
                </span>
                <div className="flex flex-col">
                  <span className="font-bold text-azulo text-sm">{r.tipo}</span>
                  <span className="text-xs text-azulo/60">{fechaLocal}</span>
                </div>
              </div>
              <div className="flex flex-col gap-1 text-sm">
                <span className="text-azulo/80">
                  <span className="font-semibold text-azulo">Lugar: </span>
                  {r.lugar}
                </span>
                <span className="text-azulo/80">
                  <span className="font-semibold text-azulo">Reportado a: </span>
                  {r.destino}
                </span>
              </div>
            </div>
          );
        })}
        {filtrados.length === 0 && (
          <p className="text-center text-azulo/60 py-6">No hay reportes de este tipo.</p>
        )}
      </div>

      <p className="text-xs text-azulo/50 text-center">
        Por privacidad no se registran descripciones ni datos personales
      </p>
    </div>
  );
}

function FiltroBoton({
  activo,
  onClick,
  label,
}: {
  activo: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[44px] px-4 rounded-xl text-sm font-semibold border-2 transition-colors ${
        activo ? 'bg-azulo text-white border-azulo' : 'bg-white text-azulo border-azulo/10 hover:bg-hueso'
      }`}
    >
      {label}
    </button>
  );
}

// ---------------- ESTADÍSTICAS ÚLTIMO AÑO ----------------

function EstadisticasAnio() {
  return (
    <div className="flex flex-col gap-6">
      <BloqueTitulo icono={TrendingUp} titulo="Recordación a 30 días" />
      <div className="flex flex-col gap-3">
        {RECORDACION_30_DIAS.map((r) => {
          const esPrototipo = r.perfil === PERFIL_PROTOTIPO;
          return (
            <div key={r.perfil} className="bg-white rounded-2xl p-4 border border-azulo/10">
              <div className="flex items-center justify-between mb-2 gap-2">
                <span className="font-bold text-azulo text-sm">{r.perfil}</span>
                {esPrototipo && (
                  <span className="shrink-0 text-[11px] font-extrabold bg-azulo text-white px-2 py-1 rounded-full">
                    Perfil de este prototipo
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-6 rounded-full overflow-hidden bg-azulo/10 border border-azulo/10">
                  <div
                    className="h-6 rounded-full bg-azulo transition-all"
                    style={{ width: `${r.porcentaje}%` }}
                  />
                </div>
                <span className="text-2xl font-extrabold text-azulo w-14 text-right">{r.porcentaje}%</span>
              </div>
            </div>
          );
        })}
      </div>

      <BloqueTitulo icono={ClipboardList} titulo="Incidentes reportados" />
      <div className="flex flex-col gap-3">
        {INCIDENTES_REPORTADOS.map((inc, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-azulo/10 flex items-center gap-4">
            <span className="text-3xl font-extrabold text-azulo leading-none shrink-0 w-12 text-center">
              {inc.cantidad}
            </span>
            <span className="text-sm text-azulo/80 leading-snug">{inc.descripcion}</span>
          </div>
        ))}
      </div>

      <BloqueTitulo icono={MessagesSquare} titulo="Encuesta interna" />
      <div className="flex flex-col gap-3">
        {ENCUESTA_INTERNA.map((d, i) => (
          <div key={i} className="bg-white rounded-2xl p-4 border border-azulo/10 flex items-center gap-4">
            <span className="text-3xl font-extrabold text-azulo leading-none shrink-0 w-14 text-center">
              {d.porcentaje}%
            </span>
            <span className="text-sm text-azulo/80 leading-snug">{d.descripcion}</span>
          </div>
        ))}
      </div>

      <div className="bg-azulo text-white rounded-2xl p-4 flex items-center gap-3">
        <BookOpen className="w-6 h-6 shrink-0" />
        <div className="flex flex-col">
          <span className="text-sm font-bold">Manual</span>
          <span className="text-sm text-white/80">{MANUAL_ACTUALIZACION}</span>
        </div>
      </div>

      <p className="text-xs text-azulo/50 text-center">
        Fuente: Anexo B del reto. Datos adaptados con fines académicos; no corresponden a una organización real.
      </p>
    </div>
  );
}

function BloqueTitulo({ icono: Icono, titulo }: { icono: typeof BarChart3; titulo: string }) {
  return (
    <h2 className="text-lg font-extrabold text-azulo flex items-center gap-2">
      <Icono className="w-5 h-5" />
      {titulo}
    </h2>
  );
}

function EstadoVacio() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-azulo/60 text-center">
      <p className="font-semibold">Aún no hay datos</p>
    </div>
  );
}
