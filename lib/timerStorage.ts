import { Timer } from '@/types/timer'

const STORAGE_KEY = 'pikmin-timers'

export function saveTimers(timers: Timer[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timers))
  } catch {
    // ignore storage errors
  }
}

export function loadTimers(): Timer[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as Timer[]
    const now = Date.now()
    return parsed.map(t =>
      t.status === 'running' && t.endAt <= now
        ? { ...t, status: 'completed' as const }
        : t
    )
  } catch {
    return []
  }
}
