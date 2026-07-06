import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Domains from './components/Domains'
import Works from './components/Works'
import Explorations from './components/Explorations'
import Members from './components/Members'
import Events from './components/Events'
import Stats from './components/Stats'
import WhyJoin from './components/WhyJoin'
import Contact from './components/Contact'
import Spores from './components/Spores'
import CassettePlayer from './components/CassettePlayer'
import StrangerWidgets from './components/StrangerWidgets'
import PsychicSequence from './components/PsychicSequence'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  const [isTelekinesisActive, setIsTelekinesisActive] = useState(false)
  const [shouldShake, setShouldShake] = useState(false)
  const [isUpsideDown, setIsUpsideDown] = useState(false)
  const [isPsychicSequenceActive, setIsPsychicSequenceActive] = useState(false)

  const toggleTelekinesis = () => {
    setIsTelekinesisActive(!isTelekinesisActive)
    setShouldShake(true)
    setTimeout(() => setShouldShake(false), 600)
  }

  useEffect(() => {
    if (isLoading) return
    const sectionIds = ['home', 'what-we-do', 'works', 'achievements', 'members', 'events', 'stats', 'why-join', 'contact']

    const handleScroll = () => {
      const scrollY = window.scrollY
      const detectionY = scrollY + window.innerHeight * 0.4
      let current = 'home'
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (!el) continue
        // getBoundingClientRect().top + scrollY = absolute position from document top
        const sectionTop = el.getBoundingClientRect().top + scrollY
        if (sectionTop <= detectionY) current = id
      }
      setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // set correct state on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loading" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          <div className={`min-h-screen w-full transition-transform ease-in-out origin-center ${isUpsideDown ? 'rotate-180 upside-down-active' : ''}`} style={{ transitionDuration: '1600ms' }}>
            <Navbar activeSection={activeSection} />
            <Spores />
            <CassettePlayer />
            <StrangerWidgets
              isTelekinesisActive={isTelekinesisActive}
              onToggleTelekinesis={toggleTelekinesis}
              isUpsideDown={isUpsideDown}
              onTogglePortal={() => setIsPsychicSequenceActive(true)}
            />
            <main className={`relative z-10 transition-transform duration-500 ${shouldShake ? 'animate-shake' : ''} ${isTelekinesisActive ? 'telekinesis-active' : ''}`}>
              <Hero />
              <Domains />
              <Works />
              <Explorations />
              <Members />
              <Events />
              <Stats />
              <WhyJoin />
              <Contact />
            </main>
          </div>

          {/* Psychic Sequence Overlay */}
          {isPsychicSequenceActive && (
            <PsychicSequence
              onComplete={() => {
                setIsUpsideDown(!isUpsideDown)
                setTimeout(() => setIsPsychicSequenceActive(false), 900)
              }}
            />
          )}

          {/* Upright exit button */}
          {isUpsideDown && (
            <button
              onClick={() => setIsPsychicSequenceActive(true)}
              className="fixed top-8 left-1/2 -translate-x-1/2 z-[10000] px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-retro font-bold text-xs uppercase tracking-widest cursor-pointer shadow-[0_0_20px_#ef4444] border border-red-500 animate-pulse"
            >
              Exit Upside Down
            </button>
          )}
        </>
      )}
    </>
  )
}
