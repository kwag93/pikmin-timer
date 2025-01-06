'use client'

import { Timer } from '../page'
import { TimerDisplay } from './TimerDisplay'

interface TimerGridProps {
  timers: Timer[]
  onRemoveTimer: (id: number) => void
}

export function TimerGrid({ timers, onRemoveTimer }: TimerGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 z-10">
      {timers.map(timer => (
        <TimerDisplay 
          key={timer.id} 
          id={timer.id}
          startTime={timer.startTime} 
          endTime={timer.endTime} 
          label={timer.label}
          onRemove={onRemoveTimer}
        />
      ))}
    </div>
  )
}

