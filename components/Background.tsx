'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const flowers = ['🌼', '🌸', '🌺', '🌻', '🌷']

export function Background() {
  const [backgroundFlowers, setBackgroundFlowers] = useState<{ id: number; x: number; y: number; flower: string }[]>([])

  useEffect(() => {
    const newFlowers = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      flower: flowers[Math.floor(Math.random() * flowers.length)]
    }))
    setBackgroundFlowers(newFlowers)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {backgroundFlowers.map((flower) => (
        <motion.div
          key={flower.id}
          className="absolute text-4xl"
          style={{ left: `${flower.x}%`, top: `${flower.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
        >
          {flower.flower}
        </motion.div>
      ))}
    </div>
  )
}

