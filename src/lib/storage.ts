// Persistencia ligera en localStorage para racha y resultados de trivia.

export function leerJSON<T>(clave: string, porDefecto: T): T {
  try {
    const raw = localStorage.getItem(clave);
    return raw ? (JSON.parse(raw) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}

export function guardarJSON<T>(clave: string, valor: T): void {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch {
    // noop
  }
}

// ---- Racha de la píldora del día ----
const CLAVE_RACHA = 'consulta_seguridad_racha';

export interface EstadoRacha {
  dias: number;
  ultimaFecha: string; // YYYY-MM-DD
  ultimaReglaId: string;
}

export function leerRacha(): EstadoRacha {
  return leerJSON<EstadoRacha>(CLAVE_RACHA, {
    dias: 0,
    ultimaFecha: '',
    ultimaReglaId: '',
  });
}

function fechaLocal(d: Date): string {
  const mes = String(d.getMonth() + 1).padStart(2, '0');
  const dia = String(d.getDate()).padStart(2, '0');
  return `${d.getFullYear()}-${mes}-${dia}`;
}

export function registrarDiaRacha(reglaId: string): EstadoRacha {
  const hoy = fechaLocal(new Date());
  const estado = leerRacha();

  // Sin repetir dos días seguidos la misma regla y solo suma una vez por día.
  if (estado.ultimaFecha === hoy) {
    if (estado.ultimaReglaId !== reglaId) {
      const nuevo = { ...estado, ultimaReglaId: reglaId };
      guardarJSON(CLAVE_RACHA, nuevo);
      return nuevo;
    }
    return estado;
  }

  // ¿Es consecutivo respecto al día anterior?
  const ayerDate = new Date();
  ayerDate.setDate(ayerDate.getDate() - 1);
  const ayer = fechaLocal(ayerDate);
  const dias = estado.ultimaFecha === ayer ? estado.dias + 1 : 1;

  const nuevo: EstadoRacha = {
    dias,
    ultimaFecha: hoy,
    ultimaReglaId: reglaId,
  };
  guardarJSON(CLAVE_RACHA, nuevo);
  return nuevo;
}

// ---- Resultados de trivia ----
const CLAVE_RESULTADOS = 'consulta_seguridad_resultados';

export interface ResultadoTrivia {
  reglaId: string;
  acierto: boolean;
  fecha: string;
}

export function guardarResultado(r: ResultadoTrivia): void {
  const lista = leerJSON<ResultadoTrivia[]>(CLAVE_RESULTADOS, []);
  lista.push(r);
  guardarJSON(CLAVE_RESULTADOS, lista);
}

export function leerResultados(): ResultadoTrivia[] {
  return leerJSON<ResultadoTrivia[]>(CLAVE_RESULTADOS, []);
}

// Envío de datos a Google Sheets (Google Apps Script). Fire-and-forget:
// usa mode 'no-cors' y nunca rechaza para no afectar la app.
export const URL_SHEETS = 'https://script.google.com/macros/s/AKfycbzo0YDMsX4e2vIw6njs68ljBk7ElmkZWSAzkTQM6XEo7WOCf0jJDlXLV5l2xrOGlB62_Q/exec';

export function enviarASheets(datos: Record<string, unknown>): void {
  fetch(URL_SHEETS, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(datos),
  }).catch(() => {});
}

// Cuenta aciertos/errores por regla para "tus temas por reforzar".
export function resumenPorRegla(): Record<string, { aciertos: number; errores: number }> {
  const lista = leerResultados();
  const res: Record<string, { aciertos: number; errores: number }> = {};
  for (const r of lista) {
    if (!res[r.reglaId]) res[r.reglaId] = { aciertos: 0, errores: 0 };
    if (r.acierto) res[r.reglaId].aciertos += 1;
    else res[r.reglaId].errores += 1;
  }
  return res;
}
