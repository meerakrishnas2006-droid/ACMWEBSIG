import { motion } from 'framer-motion'

// Repurposed from the old design "Journal" list into club events & workshops.
const events = [
  {
    id: 1,
    title: 'S1 Induction — Meet & Build',
    type: 'Induction',
    date: 'Aug 2026',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Intro to React & Tailwind Workshop',
    type: 'Workshop',
    date: 'Sep 2026',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Build-a-Thon: 24hr App Sprint',
    type: 'Hackathon',
    date: 'Oct 2026',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=200&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Deploy Day — Ship Your First App',
    type: 'Workshop',
    date: 'Nov 2026',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=200&q=80&auto=format&fit=crop',
  },
]

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function Events() {
  return (
    <section id="events" className="bg-bg py-16 md:py-24">
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
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">What's Happening</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight">
              Events &amp; <em className="font-display italic not-italic">workshops</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-xs font-body">
              Hands-on sessions, hackathons, and talks — open to every member.
            </p>
          </div>

          <ViewAllButton />
        </motion.div>

        {/* Event list */}
        <div className="flex flex-col gap-3">
          {events.map((entry, i) => (
            <EventRow key={entry.id} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function EventRow({ entry, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      className="group flex items-center gap-4 sm:gap-6 p-4 rounded-[40px] sm:rounded-full bg-surface/30 hover:bg-surface border border-stroke transition-all duration-300"
    >
      {/* Image */}
      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden">
        <img
          src={entry.image}
          alt={entry.title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Type badge + title */}
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <span
          className="hidden sm:inline-block text-[10px] font-body font-semibold px-2.5 py-1 rounded-full text-white flex-shrink-0"
          style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
        >
          {entry.type}
        </span>
        <p className="text-sm sm:text-base font-body font-medium text-text-primary group-hover:text-white transition-colors duration-200 min-w-0 truncate">
          {entry.title}
        </p>
      </div>

      {/* Meta */}
      <div className="flex items-center gap-4 flex-shrink-0 text-xs text-muted font-body">
        <span>{entry.date}</span>
        <span className="w-6 h-6 rounded-full border border-stroke flex items-center justify-center text-[10px] group-hover:border-white/30 transition-colors">→</span>
      </div>
    </motion.div>
  )
}

function ViewAllButton() {
  const handleClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <button
      onClick={handleClick}
      className="relative hidden md:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-body text-text-primary border border-stroke hover:border-transparent transition-all duration-300 cursor-pointer group overflow-visible"
    >
      <span className="absolute rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ inset: '-2px', background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)', zIndex: -1 }} />
      <span className="relative z-10">Get notified</span>
      <span className="relative z-10 text-muted">→</span>
    </button>
  )
}
