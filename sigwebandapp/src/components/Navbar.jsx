import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const navLinks = [
  { label: 'About',        id: 'home' },
  { label: 'Projects',     id: 'works' },
  { label: 'Achievements', id: 'achievements' },
  { label: 'Members',      id: 'members' },
  { label: 'Contact Us',   id: 'contact' },
]

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [hoveredContact, setHoveredContact] = useState(false)
  const [logoHovered, setLogoHovered] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (id) => {
    if (id === 'home') window.scrollTo({ top: 0, behavior: 'smooth' })
    else document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay: 0.2 }}
    >
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-red-950/40 bg-surface/80 px-2 py-2 transition-shadow duration-300 ${scrolled ? 'shadow-md shadow-red-950/10' : ''}`}
      >
        {/* Logo */}
        <motion.button
          className="relative w-9 h-9 rounded-full flex items-center justify-center cursor-pointer flex-shrink-0"
          onHoverStart={() => setLogoHovered(true)}
          onHoverEnd={() => setLogoHovered(false)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <div
            className="absolute inset-0 rounded-full p-[1.5px]"
            style={{
              background: logoHovered
                ? 'linear-gradient(270deg, #ff1a1a 0%, #7f1d1d 100%)'
                : 'linear-gradient(90deg, #ff1a1a 0%, #7f1d1d 100%)',
              transition: 'background 0.4s ease',
            }}
          >
            <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display font-extrabold text-[12px] text-red-500 leading-none stranger-glow">AV</span>
            </div>
          </div>
        </motion.button>

        {/* Divider */}
        <div className="w-px h-5 bg-red-950/60 mx-1 hidden sm:block" />

        {/* Nav links */}
        {navLinks.map(({ label, id }) => {
          const isActive = activeSection === id
          return (
            <button
              key={label}
              onClick={() => handleNavClick(id)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-body transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'text-red-500 bg-red-950/30 border border-red-900/20'
                  : 'text-muted hover:text-red-500 hover:bg-red-950/20'
              }`}
            >
              {label}
            </button>
          )
        })}

        {/* Divider */}
        <div className="w-px h-5 bg-red-950/60 mx-1 hidden sm:block" />

        {/* Contact Us CTA */}
        <motion.button
          className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-body text-red-500 cursor-pointer overflow-visible"
          onHoverStart={() => setHoveredContact(true)}
          onHoverEnd={() => setHoveredContact(false)}
          whileHover={{ scale: 1.05 }}
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
        >
          {hoveredContact && (
            <span
              className="absolute pointer-events-none rounded-full"
              style={{
                inset: '-2px',
                background: 'linear-gradient(90deg, #ff1a1a 0%, #ea580c 100%)',
                zIndex: -1,
              }}
            />
          )}
          <span className="relative z-10 bg-surface/85 border border-red-950/40 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md inline-flex items-center gap-1">
            Join Us <span className="text-[10px] text-red-600">↗</span>
          </span>
        </motion.button>
      </div>
    </motion.div>
  )
}
