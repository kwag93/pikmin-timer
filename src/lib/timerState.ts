export type TimerPhase = 'safe' | 'warn' | 'danger' | 'done'

export function getTimerPhase(secondsLeft: number): TimerPhase {
  if (secondsLeft <= 0) return 'done'
  if (secondsLeft <= 60) return 'danger'
  if (secondsLeft <= 180) return 'warn'
  return 'safe'
}

export const phaseColors: Record<TimerPhase, string> = {
  safe: 'hsl(128, 42%, 42%)',
  warn: 'hsl(42, 95%, 52%)',
  danger: 'hsl(14, 90%, 58%)',
  done: 'hsl(0, 72%, 52%)',
}

export const phaseClasses: Record<TimerPhase, { text: string; bg: string; border: string; progress: string }> = {
  safe: { text: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-l-emerald-400', progress: 'stroke-emerald-400' },
  warn: { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-l-yellow-400', progress: 'stroke-yellow-400' },
  danger: { text: 'text-orange-500', bg: 'bg-orange-50', border: 'border-l-orange-400', progress: 'stroke-orange-400' },
  done: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-l-red-500', progress: 'stroke-red-500' },
}
