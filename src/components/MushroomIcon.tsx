
import { type TimerPhase, phaseColors } from '@/lib/timerState'

interface MushroomIconProps {
  phase: TimerPhase
  size?: number
}

export function MushroomIcon({ phase, size = 40 }: MushroomIconProps) {
  const capColor = phaseColors[phase]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Stem */}
      <rect
        x="14"
        y="24"
        width="12"
        height="12"
        rx="3"
        fill="hsl(30, 40%, 72%)"
      />
      {/* Cap */}
      <ellipse
        cx="20"
        cy="22"
        rx="16"
        ry="12"
        fill={capColor}
        style={{ transition: 'fill 0.5s ease' }}
      />
      {/* White dots */}
      <circle cx="14" cy="19" r="2.5" fill="white" opacity="0.85" />
      <circle cx="22" cy="15" r="2" fill="white" opacity="0.85" />
      <circle cx="28" cy="20" r="2" fill="white" opacity="0.85" />
    </svg>
  )
}
