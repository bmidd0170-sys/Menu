import { FloatingParticles } from '@/components/floating-particles'
import { HeroSection } from '@/components/hero-section'
import { EventDetails } from '@/components/event-details'
import { RSVPForm } from '@/components/rsvp-form'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Floating gold particles background */}
      <FloatingParticles />

      {/* Content sections */}
      <div className="relative z-10">
        <HeroSection />

        {/* Elegant section divider */}
        <div className="relative py-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-px h-24 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
          </div>
        </div>

        <EventDetails />

        {/* Section divider */}
        <div className="relative py-8">
          <div className="max-w-xs mx-auto flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rounded-full bg-primary/50" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>

        <RSVPForm />

        {/* Section divider */}
        <div className="relative py-8">
          <div className="max-w-xs mx-auto flex items-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/30" />
            <div className="w-2 h-2 rounded-full bg-primary/50" />
            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/30" />
          </div>
        </div>

        <Footer />
      </div>
    </main>
  )
}
