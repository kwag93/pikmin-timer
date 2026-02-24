export const cardVariants = {
  initial: { opacity: 0, scale: 0.85, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 320, damping: 24 } },
  exit: { opacity: 0, scale: 0.9, y: -8, transition: { duration: 0.22, ease: 'easeIn' } },
}

export const formVariants = {
  initial: { opacity: 0, y: -24 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
}

export const presetTapVariants = {
  whileHover: { scale: 1.06, y: -2 },
  whileTap: { scale: 0.94 },
}
