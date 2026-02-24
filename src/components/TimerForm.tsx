
import { useState } from 'react'
import { motion } from 'framer-motion'
import { formVariants } from '@/lib/motionVariants'
import { QuickAddBar } from '@/components/QuickAddBar'

interface TimerFormProps {
  onAddTimer: (durationSeconds: number, label: string) => void
  canAddTimer: boolean
}

function parseMmSs(value: string): number | null {
  // Accept "MM:SS" or plain number (treated as minutes)
  const colonMatch = value.match(/^(\d{1,2}):(\d{2})$/)
  if (colonMatch) {
    const m = parseInt(colonMatch[1], 10)
    const s = parseInt(colonMatch[2], 10)
    if (s > 59) return null
    return m * 60 + s
  }
  const numMatch = value.match(/^\d+$/)
  if (numMatch) {
    return parseInt(value, 10) * 60
  }
  return null
}

export function TimerForm({ onAddTimer, canAddTimer }: TimerFormProps) {
  const [duration, setDuration] = useState('15:00')
  const [label, setLabel] = useState('')
  const [durationError, setDurationError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const total = parseMmSs(duration.trim())
    if (total === null || total <= 0) {
      setDurationError(true)
      return
    }
    setDurationError(false)
    onAddTimer(total, label)
    setDuration('15:00')
    setLabel('')
  }

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDuration(e.target.value)
    setDurationError(false)
  }

  const handlePresetSelect = (durationSeconds: number, presetLabel: string) => {
    onAddTimer(durationSeconds, presetLabel)
  }

  return (
    <motion.div
      variants={formVariants}
      initial="initial"
      animate="animate"
      className="mx-auto w-full max-w-4xl"
    >
      <div className="glass-card rounded-2xl p-6 shadow-lg shadow-emerald-900/5">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-slate-800">New Timer</h2>
            <p className="text-sm text-slate-500">Set a custom countdown for your mushroom battles.</p>
          </div>

          {/* Presets */}
          <QuickAddBar onSelect={handlePresetSelect} disabled={!canAddTimer} />

          {/* Inputs row */}
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            {/* Duration input */}
            <label className="flex flex-1 flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-700">Duration (MM:SS)</span>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg leading-none">
                  🕐
                </span>
                <input
                  type="text"
                  value={duration}
                  onChange={handleDurationChange}
                  placeholder="15:00"
                  className={[
                    'w-full rounded-xl border bg-white py-3 pl-10 pr-4 text-slate-900 placeholder-slate-400',
                    'focus:outline-none focus:ring-2',
                    durationError
                      ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
                      : 'border-slate-200 focus:border-[#19e6a2] focus:ring-[#19e6a2]/30',
                  ].join(' ')}
                />
              </div>
              {durationError && (
                <span className="text-xs text-red-500">MM:SS 형식으로 입력하세요 (예: 15:00)</span>
              )}
            </label>

            {/* Label input */}
            <label className="flex flex-[2] flex-col gap-1.5">
              <span className="text-sm font-medium text-slate-700">Label (Optional)</span>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="e.g. Small Red Mushroom near Park"
                maxLength={30}
                className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#19e6a2] focus:ring-2 focus:ring-[#19e6a2]/30"
              />
            </label>

            {/* Submit button */}
            <button
              type="submit"
              disabled={!canAddTimer}
              className="flex h-[50px] items-center justify-center gap-2 rounded-xl px-8 text-base font-bold text-slate-900 shadow-md transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed min-w-[140px]"
              style={{ backgroundColor: '#19e6a2', boxShadow: '0 4px 14px rgba(25,230,162,0.3)' }}
            >
              <span className="text-lg leading-none">⏰</span>
              <span>{canAddTimer ? 'Add Timer' : '최대 8개'}</span>
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
