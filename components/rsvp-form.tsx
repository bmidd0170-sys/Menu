'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const starters = [
  { id: 'soup', name: 'Butternut Squash Soup', description: 'Silky smooth with crème fraîche and toasted pepitas' },
  { id: 'salad', name: 'Autumn Harvest Salad', description: 'Mixed greens, candied walnuts, pears, gorgonzola' },
  { id: 'none', name: 'No Starter', description: 'Skip the first course' },
]

const entrees = [
  { id: 'beef', name: 'Filet Mignon', description: 'Prime cut with red wine reduction, truffle mashed potatoes' },
  { id: 'salmon', name: 'Pan-Seared Salmon', description: 'Wild-caught with lemon beurre blanc, seasonal vegetables' },
  { id: 'chicken', name: 'Herb-Roasted Chicken', description: 'Free-range with rosemary jus, roasted fingerlings' },
  { id: 'vegetarian', name: 'Wild Mushroom Risotto', description: 'Arborio rice, porcini, parmesan, white truffle oil' },
]

const sides = [
  { id: 'asparagus', name: 'Grilled Asparagus', description: 'With hollandaise' },
  { id: 'potatoes', name: 'Roasted Potatoes', description: 'Herb-seasoned' },
  { id: 'greenbeans', name: 'Haricots Verts', description: 'With almonds' },
  { id: 'brussels', name: 'Brussels Sprouts', description: 'Crispy bacon bits' },
]

export function RSVPForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  
  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedStarter, setSelectedStarter] = useState('')
  const [selectedEntree, setSelectedEntree] = useState('')
  const [selectedSides, setSelectedSides] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState('')

  const toggleSide = (sideId: string) => {
    setSelectedSides((prev) =>
      prev.includes(sideId)
        ? prev.filter((id) => id !== sideId)
        : prev.length < 2
        ? [...prev, sideId]
        : prev
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!guestName.trim()) {
      setError('Please enter your name')
      return
    }
    if (!selectedEntree) {
      setError('Please select an entrée')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/rsvps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          guest_name: guestName.trim(),
          email: email.trim() || null,
          starter: selectedStarter || null,
          entree: selectedEntree,
          sides: selectedSides,
        }),
      })

      const result = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        setError(result?.error ?? 'Failed to submit RSVP. Please try again.')
        return
      }
      
      setIsSubmitted(true)
      window.dispatchEvent(new Event('rsvp-updated'))
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section ref={ref} className="relative py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-6"
            >
              <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="text-3xl font-serif text-cream mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
              Thank You, {guestName}!
            </h3>
            <p className="text-muted-foreground font-sans">
              Your RSVP has been received. We look forward to celebrating with you.
            </p>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-light text-cream mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            RSVP & Menu Selection
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Please select your dinner preferences below. Choose one starter, one entrée, and up to two sides.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSubmit}
          className="space-y-10"
        >
          {/* Guest info */}
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-xl font-serif text-primary mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Your Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-sans">Full Name *</label>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
                />
              </div>
              <div>
                <label className="block text-sm text-muted-foreground mb-2 font-sans">Email (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For confirmation"
                  className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
                />
              </div>
            </div>
          </div>

          {/* Starter selection */}
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-xl font-serif text-primary mb-6" style={{ fontFamily: 'var(--font-serif)' }}>First Course</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {starters.map((starter) => (
                <motion.button
                  key={starter.id}
                  type="button"
                  onClick={() => setSelectedStarter(starter.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedStarter === starter.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-serif text-cream mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{starter.name}</p>
                  <p className="text-xs text-muted-foreground font-sans">{starter.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Entrée selection */}
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-xl font-serif text-primary mb-6" style={{ fontFamily: 'var(--font-serif)' }}>Main Course *</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {entrees.map((entree) => (
                <motion.button
                  key={entree.id}
                  type="button"
                  onClick={() => setSelectedEntree(entree.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-5 rounded-lg border-2 text-left transition-all ${
                    selectedEntree === entree.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-serif text-cream text-lg mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{entree.name}</p>
                  <p className="text-sm text-muted-foreground font-sans">{entree.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Sides selection */}
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-xl font-serif text-primary mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Side Dishes</h3>
            <p className="text-sm text-muted-foreground mb-6 font-sans">Select up to 2 sides</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {sides.map((side) => (
                <motion.button
                  key={side.id}
                  type="button"
                  onClick={() => toggleSide(side.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedSides.includes(side.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <p className="font-serif text-cream text-sm mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{side.name}</p>
                  <p className="text-xs text-muted-foreground font-sans">{side.description}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 text-center"
              >
                <p className="text-destructive font-sans">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 px-8 rounded-lg bg-primary text-primary-foreground font-sans font-medium tracking-wide uppercase text-sm transition-all hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Submitting...
              </span>
            ) : (
              'Confirm RSVP'
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
