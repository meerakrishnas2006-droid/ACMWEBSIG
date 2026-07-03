import { motion } from 'framer-motion'
import { useState } from 'react'

const leads = [
  {
    name: 'Arjun Mehta',
    role: 'Club Lead',
    domain: 'Full Stack Dev',
    image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&q=80&auto=format&fit=crop&face',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Priya Nair',
    role: 'Co-Lead',
    domain: 'UI/UX & Frontend',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop&face',
    github: '#',
    linkedin: '#',
  },
  {
    name: 'Karan Iyer',
    role: 'Technical Head',
    domain: 'Backend & APIs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop&face',
    github: '#',
    linkedin: '#',
  },
]

const members = [
  { name: 'Sneha Rajan',    role: 'App Dev',       image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80&auto=format&fit=crop' },
  { name: 'Dev Pillai',     role: 'Web Dev',        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80&auto=format&fit=crop' },
  { name: 'Meera Raj',      role: 'UI Design',      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80&auto=format&fit=crop' },
  { name: 'Aditya Menon',   role: 'Backend',        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80&auto=format&fit=crop' },
  { name: 'Asha Varma',     role: 'React Dev',      image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=300&q=80&auto=format&fit=crop' },
  { name: 'Rohan Das',      role: 'Flutter Dev',    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80&auto=format&fit=crop' },
  { name: 'Kavitha Sree',   role: 'Cloud & DevOps', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&q=80&auto=format&fit=crop' },
  { name: 'Nikhil Kumar',   role: 'ML Integration', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80&auto=format&fit=crop' },
]

export default function Members() {
  return (
    <section id="members" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">

        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 gap-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">The Team</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight">
              Meet the <em className="font-display italic not-italic">Members</em>
            </h2>
            <p className="text-sm text-muted mt-3 max-w-sm font-body leading-relaxed">
              A passionate community of builders, designers, and innovators driving the future of tech.
            </p>
          </div>

          {/* Member count badge */}
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-stroke bg-surface/50">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-sm text-muted font-body">
              <span className="text-text-primary font-semibold">{members.length + leads.length}</span> active members
            </span>
          </div>
        </motion.div>

        {/* Leads Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {leads.map((lead, i) => (
            <LeadCard key={lead.name} member={lead} index={i} />
          ))}
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {members.map((member, i) => (
            <MemberCard key={member.name} member={member} index={i} />
          ))}
        </div>

        {/* Join CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 md:p-8 rounded-3xl bg-surface/40 border border-stroke text-center sm:text-left"
        >
          <div>
            <h3 className="text-xl md:text-2xl font-body font-light text-text-primary">
              Want to see your face <em className="font-display italic not-italic">here</em>?
            </h3>
            <p className="text-sm text-muted font-body mt-1">Applications for the new batch are open.</p>
          </div>
          <JoinButton />
        </motion.div>

      </div>
    </section>
  )
}

function JoinButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-body font-medium text-bg bg-text-primary cursor-pointer overflow-visible flex-shrink-0 transition-transform duration-300"
      style={{ transform: hovered ? 'scale(1.05)' : 'scale(1)' }}
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{ inset: '-2px', background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)', zIndex: -1 }}
        />
      )}
      <span className="relative z-10">Apply to join</span>
      <span className="relative z-10 text-xs">↗</span>
    </button>
  )
}

function LeadCard({ member, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-3xl overflow-hidden bg-surface border border-stroke hover:border-transparent transition-all duration-300 cursor-pointer"
    >
      {/* Gradient border on hover */}
      {hovered && (
        <span
          className="absolute rounded-3xl pointer-events-none"
          style={{ inset: '-2px', background: 'linear-gradient(135deg, #89AACC 0%, #4E85BF 100%)', zIndex: -1 }}
        />
      )}

      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          animate={{ scale: hovered ? 1.06 : 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* Role badge */}
        <div className="absolute top-3 left-3">
          <span
            className="text-[10px] font-body font-semibold px-2.5 py-1 rounded-full text-white"
            style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }}
          >
            {member.role}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
      </div>

      {/* Info */}
      <div className="p-5">
        <h3 className="text-base font-body font-semibold text-text-primary mb-0.5">{member.name}</h3>
        <p className="text-xs text-muted font-body mb-4">{member.domain}</p>

        {/* Social links */}
        <div className="flex gap-2">
          <SocialBtn href={member.github} icon="GH" />
          <SocialBtn href={member.linkedin} icon="in" />
        </div>
      </div>
    </motion.div>
  )
}

function MemberCard({ member, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group flex flex-col items-center text-center p-4 rounded-2xl bg-surface/30 hover:bg-surface border border-stroke hover:border-white/10 transition-all duration-300 cursor-pointer"
    >
      {/* Avatar */}
      <div className="relative w-16 h-16 rounded-full overflow-hidden mb-3 ring-2 ring-stroke group-hover:ring-white/20 transition-all duration-300">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover object-top"
          animate={{ scale: hovered ? 1.1 : 1 }}
          transition={{ duration: 0.4 }}
        />
      </div>
      <p className="text-sm font-body font-medium text-text-primary leading-tight">{member.name}</p>
      <p className="text-[11px] text-muted font-body mt-0.5">{member.role}</p>
    </motion.div>
  )
}

function SocialBtn({ href, icon }) {
  const external = href && href !== '#'
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={icon === 'GH' ? 'GitHub profile' : 'LinkedIn profile'}
      className="w-7 h-7 rounded-full bg-stroke/50 hover:bg-white/10 flex items-center justify-center text-[10px] font-body font-bold text-muted hover:text-text-primary transition-all duration-200"
    >
      {icon}
    </a>
  )
}
