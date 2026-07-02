import { motion } from 'framer-motion'

const entries = [
  {
    id: 1,
    title: 'The Future of Interaction Design',
    readTime: '5 min read',
    date: 'Jun 2026',
    image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Building with Intent: Design Systems',
    readTime: '8 min read',
    date: 'May 2026',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Motion as Communication',
    readTime: '4 min read',
    date: 'Apr 2026',
    image: 'https://images.unsplash.com/photo-1519638399535-1b036603ac77?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Typography in the Age of AI',
    readTime: '6 min read',
    date: 'Mar 2026',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=200&q=80&auto=format&fit=crop',
  },
]

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14 gap-6"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight">
              Recent <em className="font-display italic not-italic">thoughts</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-xs font-body">
              Musings on design, technology, and the spaces in between.
            </p>
          </div>

          <ViewAllButton />
        </motion.div>

        {/* Journal Entries */}
        <div className="flex flex-col gap-3">
          {entries.map((entry, i) => (
            <JournalEntry key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function JournalEntry({ entry, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex items-center gap-4 sm:gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300 cursor-pointer"
    >
      {/* Image */}
      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
        <img
          src={entry.image}
          alt={entry.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Title */}
      <p className="flex-1 text-sm sm:text-base font-body font-medium text-text-primary group-hover:text-white transition-colors duration-200 min-w-0 truncate">
        {entry.title}
      </p>

      {/* Meta */}
      <div className="flex items-center gap-4 flex-shrink-0 text-xs text-muted font-body">
        <span className="hidden sm:block">{entry.readTime}</span>
        <span>{entry.date}</span>
        <span className="w-6 h-6 rounded-full border border-stroke flex items-center justify-center text-[10px] group-hover:border-white/30 transition-colors">→</span>
      </div>
    </motion.div>
  )
}

function ViewAllButton() {
  return (
    <button className="relative hidden md:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-body text-text-primary border border-stroke hover:border-transparent transition-all duration-300 cursor-pointer group overflow-visible">
      <span className="absolute rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ inset: '-2px', background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)', zIndex: -1 }} />
      <span className="relative z-10">View all posts</span>
      <span className="relative z-10 text-muted">→</span>
    </button>
  )
}
