import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'
import gsap from 'gsap'

const HLS_SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

const CONTACT_EMAIL = 'webandapp@aseam.acm.org'

const socials = [
  { label: 'GitHub', href: 'https://github.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'Discord', href: 'https://discord.com' },
]

const MARQUEE_TEXT = 'HAWKINS AV CLUB • DECODING THE UPSIDE DOWN • '

export default function Contact() {
  const videoRef = useRef(null)
  const marqueeRef = useRef(null)

  // HLS video
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

  // GSAP marquee
  useEffect(() => {
    if (!marqueeRef.current) return
    const tween = gsap.to(marqueeRef.current, {
      xPercent: -50,
      duration: 40,
      ease: 'none',
      repeat: -1,
    })
    return () => tween.kill()
  }, [])

  return (
    <section id="contact" className="bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      {/* Background video container */}
      <div className="relative mb-16 md:mb-20">
        <div className="relative h-[60vh] overflow-hidden rounded-3xl mx-6 md:mx-10 lg:mx-16">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2 opacity-50"
            style={{ transform: 'translate(-50%, -50%) scaleY(-1)' }}
          />
          {/* Heavy red-black overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#020204]/90 via-red-950/20 to-[#020204]/90" />

          {/* Marquee */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 overflow-hidden py-4">
            <div
              ref={marqueeRef}
              className="flex whitespace-nowrap"
              style={{ width: 'max-content' }}
            >
              {Array(20).fill(MARQUEE_TEXT).map((text, i) => (
                <span
                  key={i}
                  className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-red-900/20 uppercase tracking-widest pr-8"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* CTA overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">
            <p className="text-xs text-red-500/80 uppercase tracking-[0.3em] font-retro font-bold mb-4">
              READY TO TRANSMIT?
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display uppercase font-black text-neutral-100 mb-8 leading-tight stranger-glow">
              JOIN THE AV CLUB
            </h2>
            <EmailButton />
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-red-950/40">
          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-red-500/80 hover:text-red-400 font-retro font-bold transition-colors duration-200 uppercase tracking-[0.15em]"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600" />
            </span>
            <span className="text-xs text-neutral-400 font-retro font-bold uppercase tracking-wider">Signal Active · Recruiting Agents</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-neutral-500/40 font-body mt-6">
          © 2026 HAWKINS STUDENT CHAPTER. All rights reserved.
        </p>
      </div>
    </section>
  )
}

function EmailButton() {
  const [hovered, setHovered] = useState(false)
  return (
    <a
      href={`mailto:${CONTACT_EMAIL}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-xs font-retro uppercase tracking-widest font-bold text-red-500 border border-red-950/60 hover:border-transparent transition-all duration-300 cursor-pointer overflow-visible"
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{ inset: '-2px', background: 'linear-gradient(90deg, #ff1a1a 0%, #7f1d1d 100%)', zIndex: -1 }}
        />
      )}
      <span className="relative z-10">{CONTACT_EMAIL}</span>
      <span className="relative z-10 text-red-600 text-xs">↗</span>
    </a>
  )
}
