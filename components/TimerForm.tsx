'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { formVariants } from '@/lib/motionVariants'
import { QuickAddBar } from '@/components/QuickAddBar'

interface TimerFormProps {
  onAddTimer: (durationSeconds: number, label: string) => void
  canAddTimer: boolean
}

export function TimerForm({ onAddTimer, canAddTimer }: TimerFormProps) {
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [label, setLabel] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const total = minutes * 60 + seconds
    if (total <= 0) return
    onAddTimer(total, label)
    setMinutes(5)
    setSeconds(0)
    setLabel('')
  }

  const handlePresetSelect = (durationSeconds: number, presetLabel: string) => {
    onAddTimer(durationSeconds, presetLabel)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      variants={formVariants}
      initial="initial"
      animate="animate"
      className="w-full max-w-md bg-white/85 backdrop-blur-sm rounded-2xl shadow-lg p-5 flex flex-col gap-4"
    >
      {/* Quick presets */}
      <QuickAddBar onSelect={handlePresetSelect} disabled={!canAddTimer} />

      {/* Time inputs */}
      <div className="flex items-end gap-3 justify-center">
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="minutes" className="text-xs text-gray-500 font-medium">분</label>
          <input
            id="minutes"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Math.max(0, Math.min(30, Number(e.target.value))))}
            min="0"
            max="30"
            className="w-20 px-3 py-2 border-2 border-green-300 rounded-xl text-center text-2xl font-bold text-green-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
          />
        </div>
        <span className="text-2xl font-bold text-gray-400 mb-2">:</span>
        <div className="flex flex-col items-center gap-1">
          <label htmlFor="seconds" className="text-xs text-gray-500 font-medium">초</label>
          <input
            id="seconds"
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))}
            min="0"
            max="59"
            className="w-20 px-3 py-2 border-2 border-green-300 rounded-xl text-center text-2xl font-bold text-green-800 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 bg-green-50"
          />
        </div>
      </div>

      {/* Label input */}
      <input
        type="text"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        placeholder="타이머 이름 (선택)"
        maxLength={20}
        className="w-full px-4 py-2.5 border-2 border-gray-200 rounded-xl text-center focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 text-gray-700 placeholder-gray-400"
      />

      {/* Submit */}
      <button
        type="submit"
        disabled={!canAddTimer || (minutes * 60 + seconds) <= 0}
        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
      >
        {canAddTimer ? '타이머 시작 🍄' : '최대 8개까지 생성 가능합니다'}
      </button>
    </motion.form>
  )
}
