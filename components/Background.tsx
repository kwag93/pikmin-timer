'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const FLOWERS = ['🌸', '🌼', '🌺']
const LEAVES = ['🍃']

interface FloatingItem {
  id: number
  x: number
  y: number
  emoji: string
  duration: number
  delay: number
}

export function Background() {
  const [flowers, setFlowers] = useState<FloatingItem[]>([])
  const [leaves, setLeaves] = useState<FloatingItem[]>([])

  useEffect(() => {
    setFlowers(
      Array.from({ length: 12 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        emoji: FLOWERS[i % FLOWERS.length],
        duration: 3 + Math.random() * 3,
        delay: Math.random() * 2,
      }))
    )
    setLeaves(
      Array.from({ length: 6 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: -10,
        emoji: LEAVES[0],
        duration: 7 + Math.random() * 4,
        delay: Math.random() * 6,
      }))
    )
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* SVG hills at bottom */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 160"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <path
          d="M0,80 C240,160 480,0 720,80 C960,160 1200,20 1440,80 L1440,160 L0,160 Z"
          fill="hsl(130, 45%, 28%)"
          opacity="0.7"
        />
        <path
          d="M0,110 C360,40 720,160 1080,80 C1260,50 1380,120 1440,110 L1440,160 L0,160 Z"
          fill="hsl(128, 42%, 42%)"
          opacity="0.6"
        />
      </svg>

      {/* Floating flowers */}
      {flowers.map((flower) => (
        <motion.span
          key={flower.id}
          className="absolute text-2xl select-none"
          style={{ left: `${flower.x}%`, top: `${flower.y}%`, opacity: 0.4 }}
          animate={{ rotate: [-6, 6, -6] }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          aria-hidden="true"
        >
          {flower.emoji}
        </motion.span>
      ))}

      {/* Falling leaves */}
      {leaves.map((leaf) => (
        <span
          key={leaf.id}
          className="absolute text-xl select-none"
          style={{
            left: `${leaf.x}%`,
            top: 0,
            animationName: 'leaf-fall',
            animationDuration: `${leaf.duration}s`,
            animationDelay: `${leaf.delay}s`,
            animationTimingFunction: 'linear',
            animationIterationCount: 'infinite',
          }}
          aria-hidden="true"
        >
          {leaf.emoji}
        </span>
      ))}
    </div>
  )
}
