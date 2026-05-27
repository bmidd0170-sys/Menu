'use client'

import { useState } from 'react'
import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import menu from '@/data/menu'

// Use the shared menu data; combine entree + mains for main course options
const starters = menu.starters
const entrees = [...(menu.entrees || []), ...(menu.mains || [])]
const sides = menu.sides
const smokedChickenId = 'entree-smoked-chicken'

export function RSVPForm() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const [guestName, setGuestName] = useState('')
  const [email, setEmail] = useState('')
  const [selectedStarter, setSelectedStarter] = useState('')
  const [selectedEntree, setSelectedEntree] = useState('')
  const [selectedSides, setSelectedSides] = useState<string[]>([])
  const [wantsBbq, setWantsBbq] = useState(false)
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

  useEffect(() => {
    if (selectedEntree !== smokedChickenId) {
      setWantsBbq(false)
    }
  }, [selectedEntree])

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
          bbq_preference: wantsBbq,
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
              Your dinner selection has been received. We look forward to celebrating with you.
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
            Dinner Preferences
          </h2>
          <div className="w-16 h-px bg-primary mx-auto mb-4" />
          <p className="text-muted-foreground font-sans max-w-lg mx-auto">
            Please select your dinner preferences below. Choose one starter, one main course, and up to two sides.
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
            <h3 className="text-xl font-serif text-primary mb-2" style={{ fontFamily: 'var(--font-serif)' }}>First Course (Appetizers)</h3>
            <p className="text-sm text-muted-foreground mb-6 font-sans">Select 1 first Course</p>
            <div className="grid md:grid-cols-3 gap-4">
              {starters.map((starter) => (
                <motion.button
                  key={starter.id}
                  type="button"
                  onClick={() => setSelectedStarter(starter.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${selectedStarter === starter.id
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
            <h3 className="text-xl font-serif text-primary mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Main Course (Entree)</h3>
            <p className="text-sm text-muted-foreground mb-6 font-sans">Select 1 Main Course</p>
            <div className="grid md:grid-cols-2 gap-4">
              {entrees.map((entree) => (
                <motion.button
                  key={entree.id}
                  type="button"
                  onClick={() => setSelectedEntree(entree.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`p-5 rounded-lg border-2 text-left transition-all ${selectedEntree === entree.id
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                    }`}
                >
                  <p className="font-serif text-cream text-lg mb-1" style={{ fontFamily: 'var(--font-serif)' }}>{entree.name}</p>
                  <p className="text-sm text-muted-foreground font-sans">{entree.description}</p>
                </motion.button>
              ))}
            </div>

            {selectedEntree === smokedChickenId && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-lg border border-primary/30 bg-primary/5 p-4"
              >
                <p className="text-sm text-cream font-sans mb-3">
                  Would you like BBQ as a side option?
                </p>
                <button
                  type="button"
                  onClick={() => setWantsBbq((prev) => !prev)}
                  className={`rounded-md border px-4 py-2 text-sm font-sans transition-colors ${
                    wantsBbq
                      ? 'border-primary bg-primary/10 text-cream'
                      : 'border-border text-muted-foreground hover:border-primary/50 hover:text-cream'
                  }`}
                >
                  {wantsBbq ? 'BBQ preferred =' : 'Add BBQ on the side'}
                </button>
              </motion.div>
            )}
          </div>

          {/* Sides selection */}
          <div className="glass-card rounded-xl p-8">
            <h3 className="text-xl font-serif text-primary mb-2" style={{ fontFamily: 'var(--font-serif)' }}>Side Dishes</h3>
            <p className="text-sm text-muted-foreground mb-6 font-sans">Select up to 2 sides</p>
            <div className="grid md:grid-cols-3 gap-4">
              {sides.map((side) => (
                <motion.button
                  key={side.id}
                  type="button"
                  onClick={() => toggleSide(side.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex h-full w-full flex-col p-4 rounded-lg border-2 text-left transition-all ${selectedSides.includes(side.id)
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                    }`}
                >
                  <p
                    className={`font-serif text-cream text-lg mb-1 ${side.id === 'side-rice-beans' ? 'whitespace-nowrap' : ''}`}
                    style={{ fontFamily: 'var(--font-serif)' }}
                  >
                    {side.name}
                  </p>
                  <p className="text-xs text-muted-foreground font-sans">{side.description}</p>
                </motion.button>
              ))}
            </div>
            <p className="text-sm text-cream mt-4 font-sans text-center"><span style={{ color: 'var(--red)' }}>*</span>Alcoholic beverages are not included<span style={{ color: 'var(--red)' }}>*</span></p>
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
              'Confirm Dinner Selection'
            )}
          </motion.button>
        </motion.form>
      </div>
    </section>
  )
}
