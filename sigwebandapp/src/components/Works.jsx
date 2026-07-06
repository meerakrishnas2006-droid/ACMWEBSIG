import { useState } from 'react'
import { motion } from 'framer-motion'

// Placeholder repos — swap `link` for the real GitHub URLs when they're ready.
const GITHUB_ORG = 'https://github.com'

const projects = [
  {
    id: 1,
    title: 'CampusConnect',
    subtitle: 'A student networking & club discovery platform.',
    tags: ['React', 'Node', 'MongoDB'],
    link: GITHUB_ORG,
    span: 7,
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'EventHub',
    subtitle: 'Mobile app for managing club events & RSVPs.',
    tags: ['Flutter', 'Firebase'],
    link: GITHUB_ORG,
    span: 5,
    aspect: 'aspect-[3/4]',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'CodeArena',
    subtitle: 'A competitive-coding progress tracker.',
    tags: ['Next.js', 'Postgres'],
    link: GITHUB_ORG,
    span: 5,
    aspect: 'aspect-[3/4]',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=700&q=80&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'DevPortal',
    subtitle: 'The showcase site for member projects & blogs.',
    tags: ['React', 'Tailwind', 'Vite'],
    link: GITHUB_ORG,
    span: 7,
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=900&q=80&auto=format&fit=crop',
  },
]

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
}

export default function Works() {
  return (
    <section id="works" className="bg-bg py-12 md:py-16">
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
              <div className="w-8 h-px bg-red-900/50" />
              <span className="text-xs text-red-500 uppercase tracking-[0.3em] font-retro font-bold">OPERATIONS LOG</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display uppercase font-extrabold text-neutral-200 leading-tight">
              Classified <span className="text-red-600 stranger-glow">Archives</span>
            </h2>
            <p className="text-sm text-neutral-400 mt-3 max-w-xs font-body">
              Secure assets and software built by the party, from raw code to public transmission.
            </p>
          </div>

          <ViewAllButton />
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} on GitHub`}
      className={`group relative md:col-span-${project.span} ${project.aspect} rounded-3xl overflow-hidden bg-[#090002]/40 border border-red-950/40 hover:border-red-900/40 cursor-pointer block`}
      style={{ gridColumn: `span ${project.span}` }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Background image */}
      <motion.img
        src={project.image}
        alt={project.title}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-80"
        animate={{ scale: hovered ? 1.05 : 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />

      {/* Halftone overlay */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
          backgroundSize: '4px 4px',
        }}
      />

      {/* Always-visible title bar (so cards never read as blank) */}
      <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[#020204]/90 via-[#020204]/40 to-transparent pointer-events-none">
        <h3 className="text-lg font-body font-semibold text-neutral-100 leading-tight">{project.title}</h3>
        <p className="text-xs text-neutral-400 font-body mt-0.5">{project.subtitle}</p>
      </div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-[#020204]/85 backdrop-blur-lg flex flex-col justify-between p-6 vhs-noise"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-retro text-red-500 px-2.5 py-1 rounded-full border border-red-950 bg-red-950/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <div>
          <p className="text-sm text-neutral-400 font-body mb-4 max-w-xs">{project.subtitle}</p>
          {/* Label pill */}
          <div className="relative inline-flex rounded-full overflow-visible">
            <span
              className="absolute rounded-full pointer-events-none"
              style={{ inset: '-2px', background: 'linear-gradient(90deg, #ff1a1a 0%, #7f1d1d 100%)', zIndex: -1 }}
            />
            <span className="relative bg-red-600 text-white font-retro uppercase font-bold text-sm px-4 py-2 rounded-full whitespace-nowrap inline-flex items-center gap-1.5 shadow-md shadow-red-950/30">
              OPEN DIRECTORY — <span className="font-bold text-white">{project.title}</span>
              <span className="text-xs">↗</span>
            </span>
          </div>
        </div>
      </motion.div>
    </motion.a>
  )
}

function ViewAllButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={GITHUB_ORG}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative hidden md:inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-retro uppercase tracking-wider font-bold text-red-500 border border-red-950/60 transition-all duration-300 hover:border-transparent cursor-pointer overflow-visible"
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{ inset: '-2px', background: 'linear-gradient(90deg, #ff1a1a 0%, #7f1d1d 100%)', zIndex: -1 }}
        />
      )}
      <span className="relative z-10">OPEN GITHUB VAULT</span>
      <span className="relative z-10 text-red-700 font-black">↗</span>
    </a>
  )
}
