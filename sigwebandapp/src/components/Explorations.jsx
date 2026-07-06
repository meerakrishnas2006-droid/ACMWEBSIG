import { useEffect, useRef, useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// All cards live inside the pinned viewport div.
// yFrom = starting y offset (px). yTo = ending y offset (px).
// Cards with large positive yFrom start below the viewport and scroll UP into view.
// Cards starting at y=0 are visible immediately and scroll OUT through the top.
// Single scrub from section-top to section-bottom drives all movement.
const cards = [
  {
    id: 1,
    // Green cylinders — visible from start (top-right), exits upward
    image: 'https://images.unsplash.com/photo-1618005198919-d3d4b5a92ead?w=900&q=80&auto=format&fit=crop',
    top: '2%', right: '2%', width: 450, rotation: 5,
    yFrom: 0,    yTo: -750,
  },
  {
    id: 2,
    // Silver wave — visible from start (mid-left), exits upward
    image: 'https://images.unsplash.com/photo-1572615578015-863b32e44e06?w=900&q=80&auto=format&fit=crop',
    top: '36%', left: '3%', width: 420, rotation: -4,
    yFrom: 0,    yTo: -980,
  },
  {
    id: 3,
    // Blue 3D cubes — enters from below (bottom-right) mid-scroll
    image: 'https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=800&q=80&auto=format&fit=crop',
    top: '42%', right: '3%', width: 400, rotation: 3,
    yFrom: 720,  yTo: -650,
  },
  {
    id: 4,
    // Blue smoke abstract — enters from below (top-left area) later
    image: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80&auto=format&fit=crop',
    top: '8%', left: '3%', width: 360, rotation: -6,
    yFrom: 900,  yTo: -600,
  },
  {
    id: 5,
    // Marble gradient — last to enter, bottom-center-left
    image: 'https://images.unsplash.com/photo-1557682250-f326d9f2b5e0?w=800&q=80&auto=format&fit=crop',
    top: '55%', left: '28%', width: 330, rotation: 2,
    yFrom: 1050, yTo: -500,
  },
  {
    id: 6,
    // Code on screen — top-right, visible early
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=800&q=80&auto=format&fit=crop',
    top: '22%', right: '22%', width: 300, rotation: -5,
    yFrom: 200, yTo: -820,
  },
  {
    id: 7,
    // Circuit board — enters from below, right side
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop',
    top: '68%', right: '10%', width: 320, rotation: 6,
    yFrom: 880, yTo: -560,
  },
  {
    id: 8,
    // Colorful code editor — enters from below, left side
    image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=800&q=80&auto=format&fit=crop',
    top: '18%', left: '22%', width: 300, rotation: 4,
    yFrom: 620, yTo: -760,
  },
  {
    id: 9,
    // Server / cloud — bottom-left, last group
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80&auto=format&fit=crop',
    top: '60%', left: '6%', width: 300, rotation: -3,
    yFrom: 1150, yTo: -480,
  },
  {
    id: 10,
    // Team collaborating — mid-right filler
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&auto=format&fit=crop',
    top: '48%', right: '26%', width: 260, rotation: 3,
    yFrom: 1000, yTo: -520,
  },
]

function generateStars(count) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() < 0.7 ? 1.5 : Math.random() < 0.9 ? 2.5 : 3.5,
    opacity: 0.15 + Math.random() * 0.55,
    duration: 2 + Math.random() * 4,
    delay: Math.random() * 5,
  }))
}

export default function Explorations() {
  const sectionRef = useRef(null)
  const pinnedRef  = useRef(null)
  const cardRefs   = useRef([])
  const [lightbox, setLightbox] = useState(null)
  const stars = useMemo(() => generateStars(80), [])

  useEffect(() => {
    const ctx = gsap.context(() => {

      // Pin the h-screen div for the whole scroll duration
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pinnedRef.current,
        pinSpacing: false,
      })

      // Single shared scroll range drives ALL card movement
      // Each card moves from yFrom → yTo over the full section scroll
      cardRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.fromTo(el,
          { y: cards[i].yFrom },
          {
            y: cards[i].yTo,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 2,
            },
          }
        )
      })

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <section
        ref={sectionRef}
        id="achievements"
        className="relative bg-bg"
        style={{ minHeight: '320vh' }}
      >
        {/* Pinned viewport div — everything lives here */}
        <div ref={pinnedRef} className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-[#020204] via-red-950/5 to-[#020204]">

          {/* ── Custom Background Styles ── */}
          <style>{`
            @keyframes lightning-flash {
              0%, 93%, 95%, 97%, 100% {
                opacity: 0;
              }
              94%, 96% {
                opacity: 0.15;
                background-color: #ff1a1a;
              }
            }
            @keyframes pulse-rift {
              0%, 100% {
                opacity: 0.25;
                filter: drop-shadow(0 0 5px #ff1a1a);
              }
              50% {
                opacity: 0.55;
                filter: drop-shadow(0 0 16px #e50914);
              }
            }
            .animate-lightning {
              animation: lightning-flash 9s infinite alternate;
            }
            .animate-pulse-rift {
              animation: pulse-rift 4s infinite ease-in-out;
            }

          `}</style>

          {/* ── Red Lightning Flash Overlay ── */}
          <div className="absolute inset-0 pointer-events-none z-[2] animate-lightning" />

          {/* ── Glowing Portal Rift ── */}
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-64 pointer-events-none z-0 flex items-center justify-center animate-pulse-rift">
            <svg viewBox="0 0 100 800" className="h-full w-full text-red-600 fill-current opacity-40">
              <path d="M 50,0 Q 48,100 52,200 Q 55,300 48,400 Q 43,500 51,600 Q 55,700 50,800 L 51,800 Q 56,700 52,600 Q 44,500 49,400 Q 56,300 53,200 Q 49,100 51,0 Z" />
              {/* Branching veins */}
              <path d="M 50,250 Q 30,230 15,200 M 52,380 Q 75,410 90,430 M 47,550 Q 25,580 10,620 M 53,150 Q 70,120 85,90" stroke="#ff1a1a" strokeWidth="1.5" fill="none" className="opacity-60" />
            </svg>
          </div>

          {/* ── Red Anomaly Embers ── */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {stars.map(star => (
              <div
                key={star.id}
                className="absolute rounded-full bg-red-600/30 shadow-[0_0_6px_#ff1a1a]"
                style={{
                  top: star.top,
                  left: star.left,
                  width: star.size,
                  height: star.size,
                  opacity: star.opacity,
                  animation: `twinkle ${star.duration}s ${star.delay}s ease-in-out infinite alternate`,
                }}
              />
            ))}
          </div>

          {/* ── Image cards — all z-10, moved by GSAP ── */}
          {cards.map((card, i) => (
            <div
              key={card.id}
              ref={el => (cardRefs.current[i] = el)}
              className="absolute z-10 pointer-events-auto"
              style={{
                top:   card.top,
                left:  card.left  ?? undefined,
                right: card.right ?? undefined,
                width: card.width,
                // Set initial transform so cards with large yFrom start off-screen
                transform: `translateY(${card.yFrom}px)`,
                willChange: 'transform',
              }}
            >
              <motion.div
                className="relative rounded-2xl overflow-hidden cursor-pointer border border-red-950/40 shadow-2xl shadow-red-950/20"
                style={{ rotate: card.rotation }}
                whileHover={{ scale: 1.04, rotate: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                onClick={() => setLightbox(card)}
              >
                <img
                  src={card.image}
                  alt=""
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover opacity-85"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-950/30 pointer-events-none" />
              </motion.div>
            </div>
          ))}

          {/* ── Center text — z-20, always on top ── */}
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <motion.div
              className="text-center px-6 max-w-md pointer-events-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="w-8 h-px bg-red-900/50" />
                <span className="text-[10px] text-red-500 uppercase tracking-[0.35em] font-retro font-bold">
                  INVESTIGATIONS
                </span>
                <div className="w-8 h-px bg-red-900/50" />
              </div>

              <h2 className="text-5xl md:text-6xl font-display uppercase font-extrabold text-neutral-200 leading-tight mb-4">
                System <span className="text-red-600 stranger-glow">Anomalies</span>
              </h2>

              <p className="text-sm text-neutral-400 font-body mb-7 leading-relaxed max-w-xs mx-auto">
                Investigations, breach reports, and hackathon milestones from the AV Club archives.
              </p>

              <DribbbleButton />
            </motion.div>
          </div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <motion.img
              src={lightbox.image}
              alt=""
              className="max-w-full max-h-full rounded-2xl border border-red-950/40 object-contain shadow-2xl shadow-red-950/10"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function DribbbleButton() {
  const [hovered, setHovered] = useState(false)
  const handleClick = () => {
    document.getElementById('stats')?.scrollIntoView({ behavior: 'smooth' })
  }
  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-retro uppercase font-bold tracking-wider text-red-500 border border-red-950/60 transition-all duration-300 cursor-pointer overflow-visible"
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{ inset: '-2px', background: 'linear-gradient(90deg, #ff1a1a 0%, #7f1d1d 100%)', zIndex: -1 }}
        />
      )}
      {/* Trophy icon */}
      <svg className="w-3.5 h-3.5 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 21h8M12 17v4M7 4h10v4a5 5 0 0 1-10 0V4z" />
        <path d="M5 4H3v2a3 3 0 0 0 3 3M19 4h2v2a3 3 0 0 1-3 3" />
      </svg>
      <span className="relative z-10">DECRYPT ANOMALIES</span>
      <span className="relative z-10 text-red-700 font-bold">»</span>
    </button>
  )
}
