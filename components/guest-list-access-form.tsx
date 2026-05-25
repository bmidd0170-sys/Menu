'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export function GuestListAccessForm() {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/guest-list/access', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      })

      const result = (await response.json().catch(() => null)) as { error?: string } | null

      if (!response.ok) {
        setError(result?.error ?? 'Unable to verify access right now.')
        return
      }

      setCode('')
      router.refresh()
    } catch {
      setError('Unable to verify access right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="relative py-24 px-6">
      <div className="max-w-xl mx-auto">
        <div className="glass-card rounded-2xl p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.3em] text-primary/80 mb-3 font-sans">Private access</p>
          <h1 className="text-3xl md:text-4xl font-serif text-cream mb-4" style={{ fontFamily: 'var(--font-serif)' }}>
            Guest List Access
          </h1>
          <p className="text-muted-foreground font-sans mb-8">
            Enter the access code to view the guest list.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-2 font-sans">Access Code</label>
              <input
                type="password"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="Enter code"
                className="w-full bg-input border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 font-sans"
                autoComplete="off"
              />
            </div>

            {error ? <p className="text-sm text-red-300 font-sans">{error}</p> : null}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-primary px-4 py-3 text-background font-sans font-medium transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {isSubmitting ? 'Checking access...' : 'View guest list'}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}