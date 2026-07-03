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

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

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
          <Navbar activeSection={activeSection} />
          <main>
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
        </>
      )}
    </>
  )
}
