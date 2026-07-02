import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import gsap from 'gsap'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'
const words = ['ideas', 'curiosity']

export default function Hero() {
  const videoRef = useRef(null)
  const [wordIndex, setWordIndex] = useState(0)

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(HLS_SRC)
      hls.attachMedia(video)
      return () => hls.destroy()
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = HLS_SRC
    }
  }, [])

  // Word cycling: ideas ↔ curiosity
  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex(i => (i + 1) % words.length)
    }, 2000)
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
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay muted loop playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto">

        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8 font-body">
          S1 INDUCTION
        </p>

        {/* Club Name */}
        <h1 className="name-reveal text-5xl md:text-7xl lg:text-8xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Web and App Dev
        </h1>

        {/* Tagline with alternating word */}
        <p className="blur-in text-lg md:text-xl text-muted mb-4 font-body">
          where{' '}
          <span
            key={wordIndex}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {words[wordIndex]}
          </span>
          {' '}become application.
        </p>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-lg mb-12 font-body leading-relaxed">
          Transform your curiosity into real-world digital experiences.
          <br />
          Learn, build, and innovate with a community of passionate developers.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in inline-flex gap-4 flex-wrap justify-center">
          <HeroButton
            primary
            onClick={() => document.getElementById('works')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Our Projects
          </HeroButton>
          <HeroButton
            onClick={() => document.getElementById('members')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Meet the Team
          </HeroButton>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em] font-body">SCROLL</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute inset-x-0 h-full accent-gradient animate-scroll-down" />
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
      className={`relative rounded-full text-sm px-7 py-3.5 font-body font-medium cursor-pointer overflow-visible ${
        primary
          ? 'bg-text-primary text-bg hover:bg-bg hover:text-text-primary'
          : 'border-2 border-stroke bg-bg text-text-primary'
      }`}
      style={{
        transform: hovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease, background 0.3s ease',
      }}
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{ inset: '-2px', background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)', zIndex: -1 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  )
}
