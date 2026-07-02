import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '20+', label: 'Years Experience', description: 'Decades of crafting digital experiences' },
  { value: '95+', label: 'Projects Done', description: 'Delivered across industries worldwide' },
  { value: '200%', label: 'Satisfied Clients', description: 'Exceeding expectations, every time' },
]

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="stats" className="bg-bg py-16 md:py-24 border-t border-stroke/50">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 md:divide-x md:divide-stroke/50">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              className="flex flex-col items-center text-center md:px-10"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <span
                className="text-6xl md:text-7xl lg:text-8xl font-display italic leading-none mb-3"
                style={{
                  background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {stat.value}
              </span>
              <p className="text-sm font-body font-semibold text-text-primary uppercase tracking-[0.15em] mb-2">
                {stat.label}
              </p>
              <p className="text-xs text-muted font-body leading-relaxed max-w-[180px]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
