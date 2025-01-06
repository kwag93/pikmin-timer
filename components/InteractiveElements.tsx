'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InteractiveElementsProps {
  timeLeft: number
  onMushroomClick: () => void
}

export function InteractiveElements({ timeLeft, onMushroomClick }: InteractiveElementsProps) {
  const [mushrooms, setMushrooms] = useState<{ id: number; x: number; y: number; scale: number }[]>([])

  useEffect(() => {
    if (timeLeft <= 300 && mushrooms.length === 0) {
      addMushroom()
    }
  }, [timeLeft, mushrooms.length])

  const addMushroom = () => {
    const newMushroom = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      scale: 1 + (300 - timeLeft) / 60, // Mushroom grows over time
    }
    setMushrooms(prev => [...prev, newMushroom])
  }

  const removeMushroom = (id: number) => {
    setMushrooms(prev => prev.filter(m => m.id !== id))
    onMushroomClick()
  }

  return (
    <div className="relative w-full h-20 bg-green-100 rounded-lg mt-2 overflow-hidden">
      <AnimatePresence>
        {mushrooms.map(mushroom => (
          <motion.div
            key={mushroom.id}
            className="absolute cursor-pointer"
            style={{ 
              top: `${mushroom.y}%`, 
              left: `${mushroom.x}%`,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: mushroom.scale }}
            exit={{ scale: 0 }}
            onClick={() => removeMushroom(mushroom.id)}
          >
            <span role="img" aria-label="mushroom" style={{ fontSize: `${mushroom.scale}rem` }}>
              🍄
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

