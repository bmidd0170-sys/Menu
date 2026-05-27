'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image (place your image at /public/images/patricia-60.jpg) */}
      <div
        className="absolute inset-0 z-0 bg-no-repeat bg-center bg-[length:80%_auto] md:bg-cover md:bg-center"
        style={{ backgroundImage: "url('/1596298992813115960.png')" }}
        aria-hidden="true"
      />

      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/55 to-background/85 z-10" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rounded-full animate-pulse" />
      <div className="absolute bottom-32 right-16 w-24 h-24 border border-primary/10 rounded-full animate-pulse delay-1000" />
      <div className="absolute top-1/3 right-1/4 w-16 h-16 border border-primary/15 rounded-full animate-pulse delay-500" />
      
      <div className="relative z-20 text-center px-6 max-w-4xl mx-auto">
        {/* Elegant divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-8"
        />
        
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-primary/80 tracking-[0.3em] uppercase text-sm font-sans mb-4"
        >
        </motion.p>
        
        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-wide mb-6"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          <span className="text-red-gradient">Patricia&apos;s</span>
          <br />
          <span className="text-cream">60th Birthday Menu</span>
        </motion.h1>
        
        {/* Celebration text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="text-2xl md:text-3xl text-primary font-serif italic mb-12"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          
        </motion.p>
        
        {/* Date */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="inline-block"
        >
          <div className="glass-card px-8 py-4 rounded-lg">
            <p className="text-lg md:text-xl text-muted-foreground tracking-widest uppercase font-sans">
              Dinner Preferences
            </p>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <svg
              className="w-5 h-5 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
