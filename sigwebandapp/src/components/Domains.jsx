import { useState } from 'react'
import { motion } from 'framer-motion'

// What the club actually works on — mirrors the "The Team / Projects" header style.
const domains = [
  {
    title: 'Web Development',
    description: 'Responsive, fast websites with modern frameworks — from Hawkins lab dashboards to full-stack portals.',
    tags: ['React', 'Next.js', 'Tailwind'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
        <line x1="13" y1="4" x2="11" y2="20" />
      </svg>
    ),
  },
  {
    title: 'App Development',
    description: 'Cross-platform mobile apps that feel native, built for communication across dimensions.',
    tags: ['Flutter', 'React Native', 'Kotlin'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="5" y="2" width="14" height="20" rx="2.5" />
        <line x1="10" y1="18" x2="14" y2="18" />
      </svg>
    ),
  },
  {
    title: 'UI / UX Design',
    description: 'Visual interfaces that are intuitive and delightful — mapping the Upside Down in Figma.',
    tags: ['Figma', 'Prototyping', 'Motion'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="13.5" cy="6.5" r="1.5" />
        <circle cx="17.5" cy="10.5" r="1.5" />
        <circle cx="8.5" cy="7.5" r="1.5" />
        <circle cx="6.5" cy="12.5" r="1.5" />
        <path d="M12 2C6.5 2 2 6 2 11c0 4 3 7 7 7 1.4 0 2-1 2-2 0-1.5 1-2 2.5-2H16c3.3 0 6-2.7 6-6 0-3.9-4.5-6-10-6z" />
      </svg>
    ),
  },
  {
    title: 'Backend & Cloud',
    description: 'Scalable APIs, databases, and secure gateways that keep the AV Club signals clear.',
    tags: ['Node', 'MongoDB', 'AWS'],
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="7" rx="1.5" />
        <rect x="2" y="14" width="20" height="7" rx="1.5" />
        <line x1="6" y1="6.5" x2="6.01" y2="6.5" />
        <line x1="6" y1="17.5" x2="6.01" y2="17.5" />
      </svg>
    ),
  },
]

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Domains() {
  return (
    <section id="what-we-do" className="bg-bg py-16 md:py-24 border-t border-red-950/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="mb-10 md:mb-14"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-red-900/50" />
            <span className="text-xs text-red-500 uppercase tracking-[0.3em] font-retro font-bold">OPERATIONS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-display uppercase font-extrabold text-neutral-200 leading-tight">
            Four domains, one <span className="text-red-600 font-black stranger-glow">Party</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-3 max-w-md font-body leading-relaxed">
            Whatever you want to build, there's a slot in the party for you. Pick a path or explore them all.
          </p>
        </motion.div>

        {/* Domain cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {domains.map((domain, i) => (
            <DomainCard key={domain.title} domain={domain} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DomainCard({ domain, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-3xl bg-[#090002]/40 border border-red-950/40 hover:border-transparent transition-all duration-300 p-6 flex flex-col cursor-default"
    >
      {/* Gradient border on hover */}
      {hovered && (
        <span
          className="absolute rounded-3xl pointer-events-none"
          style={{ inset: '-1.5px', background: 'linear-gradient(135deg, #ff1a1a 0%, #7f1d1d 100%)', zIndex: -1 }}
        />
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-red-500 transition-all duration-300"
        style={{
          background: hovered
            ? 'linear-gradient(135deg, #ff1a1a 0%, #7f1d1d 100%)'
            : 'hsl(350 40% 8%)',
        }}
      >
        {domain.icon}
      </div>

      <h3 className="text-lg font-body font-semibold text-neutral-200 mb-2">{domain.title}</h3>
      <p className="text-sm text-neutral-400 font-body leading-relaxed mb-5 flex-1">{domain.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {domain.tags.map((tag) => (
          <span
            key={tag}
            className="text-[11px] font-retro text-red-500/80 px-2.5 py-1 rounded-full border border-red-950/60 bg-[#020204]/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}
