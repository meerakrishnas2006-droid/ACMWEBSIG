import { useEffect, useState } from 'react'
import gsap from 'gsap'

const words = ['curiosity', 'dimensions', 'telekinesis', 'the upside down', 'friends don\'t lie']

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0)

  // Word cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ ease: 'power3.out' })
      tl.fromTo('.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      )
      tl.fromTo('.blur-in',
        { opacity: 0, filter: 'blur(10px)', y: 20 },
        { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, delay: 0.3 },
        '<'
      )
    })
    return () => ctx.revert()
  }, [])

  return (
    <section id="home" className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      {/* Background Image matching user's photo with cinematic animation */}
      <div className="absolute inset-0 overflow-hidden">
        <style>{`
          @keyframes cinematic-breath {
            0%, 100% { transform: translate(-50%, -50%) scale(1.02); }
            50% { transform: translate(-50%, -50%) scale(1.05); }
          }
          @keyframes flash-sky {
            0%, 93%, 95%, 97%, 100% { opacity: 0.5; }
            94%, 96% { opacity: 0.85; filter: brightness(1.2) contrast(1.1); }
          }
          .animate-breath {
            animation: cinematic-breath 16s ease-in-out infinite;
          }
          .animate-sky-flash {
            animation: flash-sky 8s infinite;
          }
        `}</style>
        <img
          src="/hero-bg.png"
          alt="Stranger Things Custom Landscape"
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-50 animate-breath animate-sky-flash hero-bg-img transition-all duration-700"
        />
        {/* Mysterious reddish portal and vignette glow to match the bottom dark text */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-red-950/10 to-[#020204]/95" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020204]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <p className="blur-in text-xs text-red-500 uppercase tracking-[0.45em] mb-8 font-retro font-bold animate-pulse">
          SYSTEM ANOMALY DETECTED · S1 INDUCTION
        </p>

        {/* Club Name - styled like Stranger Things title */}
        <h1 className="name-reveal text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-red-600 mb-6 font-display font-black uppercase stranger-title animate-flicker">
          Web and App Dev
        </h1>

        {/* Tagline with alternating word */}
        <p className="blur-in text-lg md:text-xl text-neutral-300 mb-4 font-body">
          where{' '}
          <span
            key={wordIndex}
            className="font-retro font-bold text-red-500 animate-role-fade-in inline-block stranger-glow tracking-wider text-xl md:text-2xl"
          >
            {words[wordIndex]}
          </span>
          {' '}is decoded.
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-neutral-400 max-w-lg mb-12 font-body leading-relaxed">
          Transform your curiosity into digital relics. Decode the mysteries of the front-end, construct backend portals, and build the future with Hawkins' finest developers.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          <HeroButton
            primary
            onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Enter Operations
          </HeroButton>
          <HeroButton
            onClick={() => document.getElementById('members')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Meet the Party
          </HeroButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-red-600 font-retro tracking-[0.2em] font-bold">SCROLL</span>
        <div className="relative w-px h-10 bg-red-950/60 overflow-hidden">
          <div className="absolute inset-x-0 h-full bg-red-600 animate-scroll-down" style={{ boxShadow: '0 0 6px #ff1a1a' }} />
        </div>
      </div>
    </section>
  )
}

function HeroButton({ children, primary, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative rounded-full text-xs md:text-sm px-7 py-3.5 font-retro uppercase tracking-wider font-bold cursor-pointer overflow-visible ${
        primary
          ? 'bg-red-600 text-neutral-100 hover:bg-red-700 border-2 border-red-600 shadow-lg shadow-red-900/30'
          : 'border-2 border-red-950/60 bg-[#020204]/80 text-red-500'
      }`}
      style={{
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease, background 0.3s ease',
      }}
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{ inset: '-2px', background: 'linear-gradient(90deg, #ff1a1a 0%, #ea580c 100%)', zIndex: -1 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
