'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import type { Timer } from '@/types/timer'
import { getTimerPhase, phaseClasses } from '@/lib/timerState'
import { formatTime } from '@/lib/utils'
import { cardVariants } from '@/lib/motionVariants'
import { ProgressArc } from '@/components/ProgressArc'
import { MushroomIcon } from '@/components/MushroomIcon'

interface TimerCardProps {
  timer: Timer
  now: number
  onRemove: (id: string) => void
}

function TimerCardInner({ timer, now, onRemove }: TimerCardProps) {
  const remainingMs = Math.max(0, timer.endAt - now)
  const displaySeconds = Math.ceil(remainingMs / 1000)
  const progress = 1 - remainingMs / timer.durationMs
  const phase = getTimerPhase(displaySeconds)
  const classes = phaseClasses[phase]
  const isDone = phase === 'done'

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      layout
      className={[
        'relative flex flex-col items-center gap-3 p-4 rounded-2xl border-2',
        'bg-white/85 backdrop-blur-sm shadow-md',
        classes.border,
        isDone ? 'animate-timer-done' : '',
      ].join(' ')}
    >
      {/* Header */}
      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-semibold text-gray-700 truncate max-w-[80%]">
          {timer.label || '타이머'}
        </span>
        <button
          onClick={() => onRemove(timer.id)}
          className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 ml-1"
          aria-label="타이머 삭제"
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress arc + mushroom icon */}
      <div className="relative flex items-center justify-center">
        <ProgressArc progress={progress} phase={phase} size={112} />
        <div className="absolute inset-0 flex items-center justify-center">
          <MushroomIcon phase={phase} size={40} />
        </div>
      </div>

      {/* Countdown */}
      {isDone ? (
        <span className={['text-2xl font-bold font-timer tabular-nums', classes.text].join(' ')}>
          리스폰!
        </span>
      ) : (
        <span className={['text-4xl font-bold font-timer tabular-nums', classes.text].join(' ')}>
          {formatTime(displaySeconds)}
        </span>
      )}
    </motion.div>
  )
}

export const TimerCard = React.memo(TimerCardInner)
