
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
      <div className="flex flex-col items-center justify-center py-16 text-slate-400">
        <span className="text-5xl mb-3">🍄</span>
        <p className="text-lg font-medium text-slate-600">타이머를 추가하세요</p>
        <p className="text-sm mt-1 text-slate-400">위 폼에서 시간을 설정하세요</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Section header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-slate-800">Active Spawns</h3>
        <span className="text-sm text-slate-500">{timers.length}개 진행 중</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
    </div>
  )
}
