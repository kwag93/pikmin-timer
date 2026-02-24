export interface Timer {
  id: string
  label: string
  createdAt: number  // epoch ms
  durationMs: number // total duration in ms
  endAt: number      // createdAt + durationMs (epoch ms)
  status: 'running' | 'completed' | 'dismissed'
}

export const MAX_TIMERS = 8
