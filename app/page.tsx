'use client'

import { useState } from 'react'
import { TimerGrid } from './components/TimerGrid'
import { TimerForm } from './components/TimerForm'
import { Background } from './components/Background'

export interface Timer {
  id: number
  startTime: Date
  endTime: Date
  label: string
}

export default function PikminBloomTimer() {
  const [timers, setTimers] = useState<Timer[]>([])

  const addTimer = (hours: number, minutes: number, seconds: number, label: string) => {
    const startTime = new Date()
    startTime.setHours(hours, minutes, seconds)
    const endTime = new Date(startTime.getTime() + 5 * 60 * 1000) // 5 minutes later
    const newTimer = { id: Date.now(), startTime, endTime, label }
    setTimers(prev => [...prev, newTimer])
  }

  const removeTimer = (id: number) => {
    setTimers(prev => prev.filter(timer => timer.id !== id))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-400 to-sky-200 flex flex-col items-center justify-start p-4 relative overflow-hidden">
      <Background />
      <h1 className="text-4xl font-bold text-white mb-8 z-10">Pikmin Bloom Timer</h1>
      <TimerForm onSubmit={addTimer} />
      <TimerGrid timers={timers} onRemoveTimer={removeTimer} />
    </div>
  )
}

