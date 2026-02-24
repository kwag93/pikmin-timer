import { useEffect, useRef } from 'react'
import { Timer } from '@/types/timer'
import { playNotificationSound } from '@/lib/sound'

interface UseTimerAlertsOptions {
  timers: Timer[]
  now: number
  onTimerComplete?: (timer: Timer) => void
  notify: (title: string, options?: NotificationOptions) => Notification | null
}

export function useTimerAlerts({ timers, now, onTimerComplete, notify }: UseTimerAlertsOptions) {
  const notifiedRef = useRef(new Set<string>())
  const timeoutRefs = useRef(new Map<string, NodeJS.Timeout>())

  // Schedule notifications for running timers
  useEffect(() => {
    timers.forEach(timer => {
      if (timer.status !== 'running') return
      if (notifiedRef.current.has(timer.id)) return
      if (timeoutRefs.current.has(timer.id)) return

      const delay = timer.endAt - Date.now()
      if (delay <= 0) return // Will be caught by the check below

      const timeoutId = setTimeout(() => {
        if (!notifiedRef.current.has(timer.id)) {
          notifiedRef.current.add(timer.id)
          notify(`🍄 ${timer.label} 리스폰!`, {
            body: '버섯이 다시 나타났어요!',
          })
          playNotificationSound()
          onTimerComplete?.(timer)
        }
        timeoutRefs.current.delete(timer.id)
      }, delay)

      timeoutRefs.current.set(timer.id, timeoutId)
    })

    const currentTimeouts = timeoutRefs.current
    return () => {
      // Clean up timeouts for removed timers
      const activeIds = new Set(timers.map(t => t.id))
      currentTimeouts.forEach((timeoutId, timerId) => {
        if (!activeIds.has(timerId)) {
          clearTimeout(timeoutId)
          currentTimeouts.delete(timerId)
        }
      })
    }
  }, [timers, notify, onTimerComplete])

  // Check for timers that completed while tab was in background
  useEffect(() => {
    timers.forEach(timer => {
      if (
        timer.status === 'running' &&
        timer.endAt <= now &&
        !notifiedRef.current.has(timer.id)
      ) {
        notifiedRef.current.add(timer.id)
        notify(`🍄 ${timer.label} 리스폰!`, {
          body: '버섯이 다시 나타났어요!',
        })
        playNotificationSound()
        onTimerComplete?.(timer)
      }
    })
  }, [timers, now, notify, onTimerComplete])

  // Clean up notified set when timers are removed
  useEffect(() => {
    const activeIds = new Set(timers.map(t => t.id))
    notifiedRef.current.forEach(id => {
      if (!activeIds.has(id)) {
        notifiedRef.current.delete(id)
      }
    })
  }, [timers])

  // Cleanup all timeouts on unmount
  useEffect(() => {
    const currentTimeouts = timeoutRefs.current
    return () => {
      currentTimeouts.forEach(clearTimeout)
      currentTimeouts.clear()
    }
  }, [])
}
