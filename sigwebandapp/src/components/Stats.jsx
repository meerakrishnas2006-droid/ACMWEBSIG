import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

// Real club numbers instead of the agency-template copy.
const stats = [
  { num: 50, suffix: '+', label: 'Active Members', description: 'Builders, designers & developers' },
  { num: 30, suffix: '+', label: 'Projects Shipped', description: 'From first idea to deployment' },
  { num: 20, suffix: '+', label: 'Workshops Hosted', description: 'Hands-on, beginner-friendly sessions' },
  { num: 5,  suffix: '',  label: 'Hackathon Wins', description: 'Awards earned across the year' },
]

// Ease-out count-up that runs once the row scrolls into view.
function useCountUp(target, active, duration = 1600) {
  const [value, setValue] = useState(0)
  const rafRef = useRef(null)

  useEffect(() => {
    if (!active) return
    let startTs
    const step = (ts) => {
      if (startTs === undefined) startTs = ts
      const progress = Math.min((ts - startTs) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, target, duration])

  return value
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stats" className="bg-bg py-16 md:py-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">By the Numbers</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight">
            A year of <em className="font-display italic not-italic">building</em>
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-0 md:divide-x md:divide-stroke/50">
          {stats.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StatItem({ stat, index, inView }) {
  const count = useCountUp(stat.num, inView)
  return (
    <motion.div
      className="flex flex-col items-center text-center md:px-6 lg:px-10"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <span
        className="text-5xl md:text-6xl lg:text-7xl font-display italic leading-none mb-3 tabular-nums"
        style={{
          background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        {count}{stat.suffix}
      </span>
      <p className="text-sm font-body font-semibold text-text-primary uppercase tracking-[0.15em] mb-2">
        {stat.label}
      </p>
      <p className="text-xs text-muted font-body leading-relaxed max-w-[180px]">
        {stat.description}
      </p>
    </motion.div>
  )
}
