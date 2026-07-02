import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['Build', 'Innovate', 'Deploy']

export default function LoadingScreen({ onComplete }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const startTime = useRef(null)
  const rafId = useRef(null)
  const duration = 2700

  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTime.current) startTime.current = timestamp
      const elapsed = timestamp - startTime.current
      const progress = Math.min(elapsed / duration, 1)
      const eased = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2
      setCount(Math.round(eased * 100))
      if (progress < 1) {
        rafId.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => onComplete(), 400)
      }
    }
    rafId.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId.current)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Top-left — Club identity */}
      <motion.div
        className="absolute top-8 left-8 md:top-10 md:left-10 flex flex-col gap-1"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
          ACM Student Chapter
        </span>
        <span className="text-[10px] text-muted/50 uppercase tracking-[0.2em] font-body">
          S1 Induction · Web &amp; App Dev
        </span>
      </motion.div>

      {/* Top-right — tagline */}
      <motion.div
        className="absolute top-8 right-8 md:top-10 md:right-10"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
      >
        <span className="text-[10px] text-muted/50 uppercase tracking-[0.2em] font-body">
          where ideas become application
        </span>
      </motion.div>

      {/* Center — cycling word */}
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80 select-none"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-muted/40 uppercase tracking-[0.25em] font-body">
          Web &amp; App Dev Club
        </span>
      </div>

      {/* Bottom — counter + progress bar */}
      <div className="px-8 md:px-10 pb-8 md:pb-10">
        <div className="flex items-end justify-between mb-4">
          <span className="text-xs text-muted/40 uppercase tracking-[0.2em] font-body self-end mb-2">
            Loading experience
          </span>
          <span className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none">
            {String(count).padStart(3, '0')}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-[3px] bg-stroke/50 rounded-full overflow-hidden">
          <motion.div
            className="h-full accent-gradient rounded-full"
            style={{
              scaleX: count / 100,
              transformOrigin: 'left',
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
            }}
          />
        </div>
      </div>
    </motion.div>
  )
}
