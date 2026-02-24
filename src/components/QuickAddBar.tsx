
import { motion } from 'framer-motion'
import { QUICK_PRESETS } from '@/lib/presets'
import { presetTapVariants } from '@/lib/motionVariants'

interface QuickAddBarProps {
  onSelect: (durationSeconds: number, label: string) => void
  disabled?: boolean
}

export function QuickAddBar({ onSelect, disabled = false }: QuickAddBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {QUICK_PRESETS.map((preset) => (
        <motion.button
          key={preset.label}
          type="button"
          onClick={() => onSelect(preset.durationSeconds, preset.label)}
          disabled={disabled}
          whileHover={disabled ? undefined : presetTapVariants.whileHover}
          whileTap={disabled ? undefined : presetTapVariants.whileTap}
          className="flex items-center gap-1 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:bg-sky-200 disabled:opacity-50 disabled:cursor-not-allowed"
          title={preset.description}
        >
          <span className="text-base leading-none">+</span>
          {preset.label}
        </motion.button>
      ))}
    </div>
  )
}
