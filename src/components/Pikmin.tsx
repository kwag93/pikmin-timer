const pikminColors = {
  red: '#FF6B6B',
  yellow: '#FFD93D',
  blue: '#4D96FF',
  white: '#F4F4F4',
  purple: '#B088F9',
  rock: '#8D8D8D',
  winged: '#FF9999'
}

interface PikminProps {
  color: keyof typeof pikminColors
}

export function Pikmin({ color }: PikminProps) {
  return (
    <svg width="30" height="30" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" fill={pikminColors[color]} />
      <circle cx="40" cy="40" r="12" fill="white" />
      <circle cx="60" cy="40" r="12" fill="white" />
      <circle cx="40" cy="40" r="6" fill="black" />
      <circle cx="60" cy="40" r="6" fill="black" />
      <path d="M35 65 Q50 80 65 65" stroke="black" strokeWidth="4" fill="none" />
      <path d="M50 90 L60 70 M50 90 L40 70" stroke={pikminColors[color]} strokeWidth="4" />
    </svg>
  )
}

