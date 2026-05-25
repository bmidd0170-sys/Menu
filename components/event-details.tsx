'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const eventDetails = [
  {
    time: '5:30 PM',
    title: 'Arrival & Cocktails',
    description: 'Welcome drinks and hors d\'oeuvres',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    time: '6:30 PM',
    title: 'Dinner Service',
    description: 'A curated four-course dining experience',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    time: '8:30 PM',
    title: 'Celebration & Toasts',
    description: 'Honoring Patricia with heartfelt words',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
  },
  {
    time: '9:30 PM',
    title: 'Dancing & Festivities',
    description: 'Music, memories, and merriment',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
  },
]

export function EventDetails() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
           Location & Date
          </h2>
          <div className="w-16 h-px bg-primary mx-auto" />
        </motion.div>

        {/* Venue info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-xl p-8 mb-16 text-center"
        >
          <p className="text-primary text-lg tracking-widest uppercase mb-2 font-sans">Venue</p>
          <p className="text-2xl md:text-3xl font-serif text-cream mb-2" style={{ fontFamily: 'var(--font-serif)' }}>
            Kimpton Grand Roatán Resort & Spa
          </p>
          <p className="text-muted-foreground font-sans">
            <span className="text-2xl md:text-3xl" style={{ color: 'var(--red)' }}>ALera</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="glass-card rounded-xl p-8 mb-16 text-center"
        >
          <p className="text-primary text-lg tracking-widest uppercase mb-2 font-sans">Date</p>
          <div className="space-y-1">
            <p className="text-2xl md:text-3xl font-serif text-cream" style={{ fontFamily: 'var(--font-serif)' }}>
              June 14, 2026
            </p>
            <p className="text-sm md:text-base font-sans uppercase tracking-[0.3em]" style={{ color: 'var(--red)' }}>
              (Sunday)
            </p>
          </div>
        </motion.div>

        {/* Timeline removed per request */}
      </div>
    </section>
  )
}
