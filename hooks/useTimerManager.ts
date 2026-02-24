'use client'
import { useState, useEffect, useCallback } from 'react'
import { Timer, MAX_TIMERS } from '@/types/timer'
import { saveTimers, loadTimers } from '@/lib/timerStorage'

export function useTimerManager() {
  const [timers, setTimers] = useState<Timer[]>(() => {
    if (typeof window === 'undefined') return []
    return loadTimers()
  })
  const [now, setNow] = useState(Date.now())

  // Single interval for all timers
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  // Visibility change handler for background tab correction
  useEffect(() => {
    const handler = () => {
      if (document.visibilityState === 'visible') setNow(Date.now())
    }
    document.addEventListener('visibilitychange', handler)
    return () => document.removeEventListener('visibilitychange', handler)
  }, [])

  // Auto-update status for completed timers
  useEffect(() => {
    setTimers(prev => {
      const updated = prev.map(t =>
        t.status === 'running' && t.endAt <= now
          ? { ...t, status: 'completed' as const }
          : t
      )
      // Only update if something changed
      if (updated.some((t, i) => t.status !== prev[i].status)) return updated
      return prev
    })
  }, [now])

  // Persist to localStorage
  useEffect(() => { saveTimers(timers) }, [timers])

  const addTimer = useCallback((durationSeconds: number, label: string) => {
    if (timers.length >= MAX_TIMERS) return
    const createdAt = Date.now()
    const durationMs = durationSeconds * 1000
    setTimers(prev => [...prev, {
      id: crypto.randomUUID(),
      label: label || `버섯 ${prev.length + 1}`,
      createdAt,
      durationMs,
      endAt: createdAt + durationMs,
      status: 'running',
    }])
  }, [timers.length])

  const removeTimer = useCallback((id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id))
  }, [])

  const dismissTimer = useCallback((id: string) => {
    setTimers(prev => prev.map(t =>
      t.id === id ? { ...t, status: 'dismissed' as const } : t
    ))
  }, [])

  const clearCompleted = useCallback(() => {
    setTimers(prev => prev.filter(t => t.status === 'running'))
  }, [])

  return {
    timers,
    now,
    addTimer,
    removeTimer,
    dismissTimer,
    clearCompleted,
    canAddTimer: timers.length < MAX_TIMERS,
  }
}
