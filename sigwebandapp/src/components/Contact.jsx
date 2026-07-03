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

const MARQUEE_TEXT = 'BUILDING THE FUTURE • '

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
            className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
            style={{ transform: 'translate(-50%, -50%) scaleY(-1)' }}
          />
          {/* Heavy overlay */}
          <div className="absolute inset-0 bg-black/60" />

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
                  className="text-3xl md:text-5xl lg:text-6xl font-display italic text-white/20 uppercase tracking-widest pr-8"
                >
                  {text}
                </span>
              ))}
            </div>
          </div>

          {/* CTA overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-6">
            <p className="text-xs text-white/50 uppercase tracking-[0.3em] font-body mb-4">
              Ready to build?
            </p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display italic text-white mb-8 leading-tight">
              Join the club
            </h2>
            <EmailButton />
          </div>
        </div>
      </div>

      {/* Footer bar */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-stroke/50">
          {/* Social links */}
          <div className="flex items-center gap-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted hover:text-text-primary font-body transition-colors duration-200 uppercase tracking-[0.1em]"
              >
                {social.label}
              </a>
            ))}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
            </span>
            <span className="text-xs text-muted font-body">Recruiting new members</span>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-muted/40 font-body mt-6">
          © 2026 ACM Student Chapter. All rights reserved.
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
      className="relative inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-body font-medium text-white border border-white/20 hover:border-transparent transition-all duration-300 cursor-pointer overflow-visible"
    >
      {hovered && (
        <span
          className="absolute rounded-full pointer-events-none"
          style={{ inset: '-2px', background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)', zIndex: -1 }}
        />
      )}
      <span className="relative z-10">{CONTACT_EMAIL}</span>
      <span className="relative z-10 text-white/60 text-xs">↗</span>
    </a>
  )
}
