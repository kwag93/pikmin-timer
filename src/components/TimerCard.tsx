
import React from 'react'
import { motion } from 'framer-motion'
import type { Timer } from '@/types/timer'
import { getTimerPhase, phaseClasses } from '@/lib/timerState'
import { formatTime } from '@/lib/utils'
import { cardVariants } from '@/lib/motionVariants'
import { ProgressArc } from '@/components/ProgressArc'

interface TimerCardProps {
  timer: Timer
  now: number
  onRemove: (id: string) => void
}

function formatStartTime(startAt: number): string {
  return new Date(startAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function TimerCardInner({ timer, now, onRemove }: TimerCardProps) {
  const remainingMs = Math.max(0, timer.endAt - now)
  const displaySeconds = Math.ceil(remainingMs / 1000)
  const progress = 1 - remainingMs / timer.durationMs
  const phase = getTimerPhase(displaySeconds)
  const classes = phaseClasses[phase]
  const isDone = phase === 'done'

  const borderColorClass = {
    safe: 'border-l-emerald-400',
    warn: 'border-l-yellow-400',
    danger: 'border-l-orange-400',
    done: 'border-l-red-500',
  }[phase]

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className={[
        'glass-card relative flex flex-col items-center gap-4 rounded-2xl border-l-4 p-5 shadow-sm transition hover:shadow-md',
        borderColorClass,
        isDone ? 'ring-4 ring-red-500/10 animate-pulse' : '',
      ].join(' ')}
    >
      {/* Delete button */}
      <button
        onClick={() => onRemove(timer.id)}
        className="absolute right-3 top-3 text-slate-400 hover:text-red-500 transition-colors"
        aria-label="타이머 삭제"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Label + start time */}
      <div className="mt-2 text-center">
        <h4 className="font-bold text-slate-800 truncate max-w-[160px]">
          {timer.label || '타이머'}
        </h4>
        <p className="text-xs text-slate-500 mt-0.5">
          {isDone ? 'Completed' : `Started ${formatStartTime(timer.endAt - timer.durationMs)}`}
        </p>
      </div>

      {/* Progress ring + mushroom emoji */}
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0">
          <ProgressArc progress={progress} phase={phase} size={96} />
        </div>
        <span className="text-2xl" aria-hidden="true">🍄</span>
      </div>

      {/* Countdown */}
      <div className={['font-mono text-3xl font-bold tabular-nums', classes.text].join(' ')}>
        {isDone ? '리스폰!' : formatTime(displaySeconds)}
      </div>
    </motion.div>
  )
}

export const TimerCard = React.memo(TimerCardInner)
