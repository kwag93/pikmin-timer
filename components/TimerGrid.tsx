'use client'

import { AnimatePresence } from 'framer-motion'
import type { Timer } from '@/types/timer'
import { TimerCard } from '@/components/TimerCard'

interface TimerGridProps {
  timers: Timer[]
  now: number
  onRemoveTimer: (id: string) => void
}

export function TimerGrid({ timers, now, onRemoveTimer }: TimerGridProps) {
  if (timers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-white/80">
        <span className="text-5xl mb-3">🍄</span>
        <p className="text-lg font-medium">타이머를 추가하세요</p>
        <p className="text-sm mt-1 text-white/60">위 폼에서 시간을 설정하세요</p>
      </div>
    )
  }

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <AnimatePresence mode="popLayout">
        {timers.map((timer) => (
          <TimerCard
            key={timer.id}
            timer={timer}
            now={now}
            onRemove={onRemoveTimer}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
