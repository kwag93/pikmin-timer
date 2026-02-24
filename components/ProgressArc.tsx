'use client'

import { type TimerPhase, phaseColors } from '@/lib/timerState'

interface ProgressArcProps {
  progress: number
  phase: TimerPhase
  size?: number
}

export function ProgressArc({ progress, phase, size = 112 }: ProgressArcProps) {
  const radius = 52
  const circumference = 2 * Math.PI * radius
  const offset = circumference * (1 - Math.max(0, Math.min(1, progress)))

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      style={{ transform: 'rotate(-90deg)' }}
    >
      {/* Background circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke="hsl(0, 0%, 89%)"
        strokeWidth="6"
      />
      {/* Progress circle */}
      <circle
        cx="60"
        cy="60"
        r={radius}
        fill="none"
        stroke={phaseColors[phase]}
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.5s ease' }}
      />
    </svg>
  )
}
