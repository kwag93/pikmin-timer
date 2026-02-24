
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Pikmin } from './Pikmin'
import { InteractiveElements } from './InteractiveElements'
import { X } from 'lucide-react'

interface TimerDisplayProps {
  id: number
  startTime: Date
  endTime: Date
  label: string
  onRemove: (id: number) => void
}

export function TimerDisplay({ id, endTime, label, onRemove }: TimerDisplayProps) {
  const [timeLeft, setTimeLeft] = useState(0)
  const [pikmin, setPikmin] = useState<{ id: number; color: string }[]>([])

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const diff = endTime.getTime() - now.getTime()
      if (diff <= 0) {
        setTimeLeft(0)
        clearInterval(interval)
      } else {
        setTimeLeft(Math.floor(diff / 1000))
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [endTime])

  useEffect(() => {
    setPikmin(Array.from({ length: 30 }, (_, index) => ({
      id: index,
      color: ['red', 'yellow', 'blue', 'white', 'purple', 'rock', 'winged'][index % 7] as string
    })))
  }, [])

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="bg-white bg-opacity-80 rounded-lg shadow-lg p-4 flex flex-col items-center relative"
    >
      <button 
        onClick={() => onRemove(id)} 
        className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors"
      >
        <X size={20} />
      </button>
      <h3 className="text-lg font-semibold mb-2">{label}</h3>
      <div className="text-3xl font-bold mb-2 text-green-600">
        {formatTime(timeLeft)}
      </div>
      <div className="relative w-40 h-40 bg-green-100 rounded-full flex items-center justify-center mb-2 overflow-hidden">
        <AnimatePresence>
          {pikmin.slice(0, Math.ceil(timeLeft / 10)).map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                top: `${50 + 40 * Math.sin((index / pikmin.length) * Math.PI * 2)}%`,
                left: `${50 + 40 * Math.cos((index / pikmin.length) * Math.PI * 2)}%`,
              }}
            >
              <Pikmin color={p.color as 'red' | 'yellow' | 'blue' | 'white' | 'purple' | 'rock' | 'winged'} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <InteractiveElements timeLeft={timeLeft} onMushroomClick={() => {}} />
    </motion.div>
  )
}

