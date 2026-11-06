// Utilidades de texto a voz (Web Speech API).
// Lee el texto en voz alta, pensando en quienes leen con dificultad.

let vozSoportada: boolean | null = null;

export function vozDisponible(): boolean {
  if (vozSoportada === null) {
    vozSoportada = typeof window !== 'undefined' && 'speechSynthesis' in window;
  }
  return vozSoportada;
}

export function hablar(texto: string): void {
  if (!vozDisponible()) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(texto);
    u.lang = 'es-CO';
    u.rate = 0.95;
    // Buscar una voz en español (es-CO o es-ES)
    const voces = window.speechSynthesis.getVoices();
    const vozEs =
      voces.find((v) => v.lang === 'es-CO') ||
      voces.find((v) => v.lang === 'es-ES') ||
      voces.find((v) => v.lang.startsWith('es'));
    if (vozEs) u.voice = vozEs;
    window.speechSynthesis.speak(u);
  } catch {
    // Si falla, no bloquea la app
  }
}

export function detenerVoz(): void {
  if (vozDisponible()) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      // noop
    }
  }
}

// Vibración corta para feedback al responder.
export function vibrar(ms: number | number[] = 40): void {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(ms);
    } catch {
      // noop
    }
  }
}
