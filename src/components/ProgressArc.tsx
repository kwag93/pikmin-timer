
import { type TimerPhase } from '@/lib/timerState'

interface ProgressArcProps {
  progress: number
  phase: TimerPhase
  size?: number
}

const phaseStrokeClass: Record<TimerPhase, string> = {
  safe: '#34d399',    // emerald-400
  warn: '#facc15',    // yellow-400
  danger: '#fb923c',  // orange-400
  done: '#ef4444',    // red-500
}

export function ProgressArc({ progress, phase, size = 96 }: ProgressArcProps) {
  // progress: 0 (start) → 1 (complete)
  // stroke-dasharray first value = percentage of circumference filled (0–100)
  const pct = Math.round(Math.max(0, Math.min(1, progress)) * 100)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      className="-rotate-90"
      aria-hidden="true"
    >
      {/* Track */}
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#e2e8f0"
        strokeWidth="3"
      />
      {/* Progress */}
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke={phaseStrokeClass[phase]}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray={`${pct}, 100`}
        style={{ transition: 'stroke-dasharray 1s linear, stroke 0.5s ease' }}
      />
    </svg>
  )
}
