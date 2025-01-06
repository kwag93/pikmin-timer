'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

interface TimerFormProps {
  onSubmit: (hours: number, minutes: number, seconds: number, label: string) => void
}

export function TimerForm({ onSubmit }: TimerFormProps) {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [label, setLabel] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (hours === 0 && minutes === 0 && seconds === 0) return
    onSubmit(hours, minutes, seconds, label || '타이머')
    setHours(0)
    setMinutes(0)
    setSeconds(0)
    setLabel('')
  }

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="flex flex-col items-center bg-white bg-opacity-80 p-6 rounded-lg shadow-lg z-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex gap-4 mb-4">
        <div className="flex flex-col items-center">
          <label htmlFor="hours" className="text-sm text-gray-600 mb-1">시</label>
          <input
            id="hours"
            type="number"
            value={hours}
            onChange={(e) => setHours(Number(e.target.value))}
            min="0"
            max="23"
            className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="minutes" className="text-sm text-gray-600 mb-1">분</label>
          <input
            id="minutes"
            type="number"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
            min="0"
            max="59"
            className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="seconds" className="text-sm text-gray-600 mb-1">초</label>
          <input
            id="seconds"
            type="number"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
            min="0"
            max="59"
            className="w-16 px-2 py-1 border rounded text-center focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>
      <div className="w-full mb-4">
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          placeholder="타이머 라벨"
          className="w-full px-3 py-2 border rounded text-center focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button 
        type="submit" 
        className="px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        타이머 생성
      </button>
    </motion.form>
  )
}

