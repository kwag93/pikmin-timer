'use client'

import { motion } from 'framer-motion'
import { QUICK_PRESETS } from '@/lib/presets'
import { presetTapVariants } from '@/lib/motionVariants'

interface QuickAddBarProps {
  onSelect: (durationSeconds: number, label: string) => void
  disabled?: boolean
}

export function QuickAddBar({ onSelect, disabled = false }: QuickAddBarProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {QUICK_PRESETS.map((preset) => (
        <motion.button
          key={preset.label}
          type="button"
          onClick={() => onSelect(preset.durationSeconds, preset.label)}
          disabled={disabled}
          whileHover={disabled ? undefined : presetTapVariants.whileHover}
          whileTap={disabled ? undefined : presetTapVariants.whileTap}
          className="px-3 py-1.5 rounded-full bg-sky-100 hover:bg-sky-200 text-sky-800 text-sm font-medium border border-sky-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={preset.description}
        >
          {preset.label}
        </motion.button>
      ))}
    </div>
  )
}
