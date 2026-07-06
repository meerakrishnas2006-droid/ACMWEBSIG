import { useState } from 'react'
import { motion } from 'framer-motion'

// Career-focused reasons to join — the payoff, not the perks.
// Placed right before the Contact CTA so it sells the "Join the club" moment.
const benefits = [
  {
    title: 'A Portfolio That Gets You Hired',
    description: 'Ship real, deployed projects — not tutorials. Walk into interviews with work recruiters can actually click on.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M4 4h16v14H4z" />
        <path d="M4 9h16" />
        <path d="M9 13h6" />
      </svg>
    ),
  },
  {
    title: 'Mentors in Your Corner',
    description: 'Learn faster with code reviews, pair-programming, and seniors who have been through the internship grind and came out the other side.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3 3 8l9 5 9-5-9-5z" />
        <path d="M7 10.5V16c0 1 2.2 2.5 5 2.5s5-1.5 5-2.5v-5.5" />
      </svg>
    ),
  },
  {
    title: 'A Network That Opens Doors',
    description: 'Tap into alumni at top companies, referrals, and a community that shares the internship and job leads before they hit LinkedIn.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="18" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M12 7.5v4M10.2 13.5 6.5 16M13.8 13.5l3.7 2.5" />
      </svg>
    ),
  },
  {
    title: 'A Resume That Stands Out',
    description: 'ACM membership, hackathon wins, and leadership roles you can put in ink — the kind of lines that make a fresher resume impossible to skip.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 2 15 8l6 .9-4.5 4.4 1 6.1L12 16.8 6.5 19.4l1-6.1L3 8.9 9 8z" />
      </svg>
    ),
  },
  {
    title: 'Skills the Classroom Skips',
    description: 'Git, teamwork, shipping under deadlines, presenting your work — the real-world muscles that decide who actually gets the offer.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4l-6 6a1.5 1.5 0 0 0 2 2l6-6a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3z" />
      </svg>
    ),
  },
  {
    title: 'A Head Start on the Offer',
    description: 'Mock interviews, DSA sprints, and hackathon reps mean you walk into placement season already warmed up while others are just starting.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M13 2 3 14h7l-1 8 10-12h-7l1-8z" />
      </svg>
    ),
  },
]

const headerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] } },
}

export default function WhyJoin() {
  return (
    <section id="why-join" className="bg-bg py-16 md:py-24 border-t border-red-950/40">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-8 h-px bg-red-900/50" />
            <span className="text-xs text-red-500 uppercase tracking-[0.3em] font-retro font-bold">BENEFITS</span>
            <div className="w-8 h-px bg-red-900/50" />
          </div>
          <h2 className="text-4xl md:text-5xl font-display uppercase font-extrabold text-neutral-200 leading-tight">
            YOU DON'T JUST JOIN — <span className="text-red-600 stranger-glow">YOU LEVEL UP</span>
          </h2>
          <p className="text-sm text-neutral-400 mt-3 max-w-lg mx-auto font-body leading-relaxed">
            Four years fly by. Spend them building the resume, the network, and the skills that turn a
            degree into an offer letter.
          </p>
        </motion.div>

        {/* Benefit cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((benefit, i) => (
            <BenefitCard key={benefit.title} benefit={benefit} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BenefitCard({ benefit, index }) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group rounded-3xl bg-[#090002]/40 border border-red-950/40 hover:border-transparent transition-all duration-300 p-6 flex flex-col cursor-default"
    >
      {/* Gradient border on hover */}
      {hovered && (
        <span
          className="absolute rounded-3xl pointer-events-none"
          style={{ inset: '-1.5px', background: 'linear-gradient(135deg, #ff1a1a 0%, #7f1d1d 100%)', zIndex: -1 }}
        />
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 text-red-500 transition-all duration-300"
        style={{
          background: hovered
            ? 'linear-gradient(135deg, #ff1a1a 0%, #7f1d1d 100%)'
            : 'hsl(350 40% 8%)',
        }}
      >
        {benefit.icon}
      </div>

      <h3 className="text-lg font-body font-semibold text-neutral-200 mb-2">{benefit.title}</h3>
      <p className="text-sm text-neutral-400 font-body leading-relaxed flex-1">{benefit.description}</p>
    </motion.div>
  )
}
