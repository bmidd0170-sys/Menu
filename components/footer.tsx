'use client'

import { motion } from 'framer-motion'

export function Footer() {
  return (
    <footer className="relative py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-32 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-12"
        />

        <div className="text-center space-y-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-2xl md:text-3xl font-serif text-cream italic"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            &ldquo;Sixty years of <span style={{ color: 'var(--red)' }}>grace</span>, <span style={{ color: 'var(--red)' }}>love</span>, and <span style={{ color: 'var(--red)' }}>laughter</span>&rdquo;
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-muted-foreground font-sans text-sm">
              For questions, please contact the celebration committee
            </p>
            <a
              href="mailto:celebration@example.com"
              className="text-primary hover:text-primary/80 transition-colors font-sans"
            >
              bkhouse275@gmail.com
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8"
          >
            <p className="text-xs text-muted-foreground/60 font-sans tracking-widest uppercase">
              Patricia&apos;s 60th Birthday Celebration
            </p>
            <div className="mt-1 space-y-1">
              <p className="text-xs text-muted-foreground/40 font-sans">
                June 14, 2026
              </p>
              <p className="text-xs font-sans uppercase tracking-[0.3em]" style={{ color: 'var(--red)' }}>
                (Sunday)
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
