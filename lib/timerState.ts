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
  safe: { text: 'text-green-600', bg: 'bg-green-50', border: 'border-green-400', progress: 'stroke-green-500' },
  warn: { text: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-400', progress: 'stroke-yellow-500' },
  danger: { text: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-400', progress: 'stroke-orange-500' },
  done: { text: 'text-red-600', bg: 'bg-red-50', border: 'border-red-400', progress: 'stroke-red-500' },
}
