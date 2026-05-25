'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface RSVP {
  id: string
  guest_name: string
  starter: string | null
  entree: string
  sides: string[]
  created_at: string
}

const starterLabels: Record<string, string> = {
  soup: 'Butternut Squash Soup',
  salad: 'Autumn Harvest Salad',
  none: 'No Starter',
}

const entreeLabels: Record<string, string> = {
  beef: 'Filet Mignon',
  salmon: 'Pan-Seared Salmon',
  chicken: 'Herb-Roasted Chicken',
  vegetarian: 'Wild Mushroom Risotto',
}

const sideLabels: Record<string, string> = {
  asparagus: 'Asparagus',
  potatoes: 'Potatoes',
  greenbeans: 'Haricots Verts',
  brussels: 'Brussels Sprouts',
}

export function RSVPTable() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRsvps = async () => {
      try {
        const response = await fetch('/api/rsvps', {
          cache: 'no-store',
        })

        if (!response.ok) {
          throw new Error('Failed to load RSVPs')
        }

        const data = (await response.json()) as RSVP[]
        setRsvps(data)
      } catch {
        setRsvps([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchRsvps()

    const handleUpdate = () => {
      fetchRsvps()
    }

    window.addEventListener('rsvp-updated', handleUpdate)

    return () => {
      window.removeEventListener('rsvp-updated', handleUpdate)
    }
  }, [])

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Guest List
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground font-sans">
            {rsvps.length} {rsvps.length === 1 ? 'guest' : 'guests'} confirmed
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-xl overflow-hidden"
        >
          {isLoading ? (
            <div className="p-12 text-center">
              <svg className="animate-spin w-8 h-8 text-primary mx-auto" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
            </div>
          ) : rsvps.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-muted-foreground font-sans">No RSVPs yet. Be the first to respond!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="px-6 py-4 text-left text-sm font-sans font-medium text-primary uppercase tracking-wider">
                      Guest
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-sans font-medium text-primary uppercase tracking-wider hidden md:table-cell">
                      Starter
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-sans font-medium text-primary uppercase tracking-wider">
                      Entrée
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-sans font-medium text-primary uppercase tracking-wider hidden lg:table-cell">
                      Sides
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((rsvp, index) => (
                    <motion.tr
                      key={rsvp.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-border/50 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <p className="font-serif text-cream" style={{ fontFamily: 'var(--font-serif)' }}>{rsvp.guest_name}</p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <p className="text-muted-foreground font-sans text-sm">
                          {rsvp.starter ? starterLabels[rsvp.starter] || rsvp.starter : '-'}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-cream font-sans text-sm">
                          {entreeLabels[rsvp.entree] || rsvp.entree}
                        </p>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <p className="text-muted-foreground font-sans text-sm">
                          {rsvp.sides.length > 0
                            ? rsvp.sides.map((s) => sideLabels[s] || s).join(', ')
                            : '-'}
                        </p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
