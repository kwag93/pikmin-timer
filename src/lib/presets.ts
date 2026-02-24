export interface TimerPreset {
  label: string
  durationSeconds: number
  description: string
}

export const QUICK_PRESETS: TimerPreset[] = [
  { label: '+5분', durationSeconds: 300, description: '리스폰 대기' },
  { label: '+8분', durationSeconds: 480, description: '3분 남음 + 리스폰' },
  { label: '+10분', durationSeconds: 600, description: '5분 남음 + 리스폰' },
  { label: '+15분', durationSeconds: 900, description: '10분 남음 + 리스폰' },
]
