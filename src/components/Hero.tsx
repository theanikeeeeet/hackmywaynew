import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hero Section Component
 * Features: Banner with title, subtitle, and CTA buttons
 * CTAs: Browse Hackathons (scrolls to events), Add Your Hackathon
 */
export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/20 via-background to-secondary/20 border-b border-primary/20 overflow-hidden">
      {/* Subtle network background effect */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-secondary blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-accent blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Discover Hackathons
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary mt-2 animate-pulse">
              Your Way
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse thousands of hackathons worldwide. Filter by platform, mode, skill level, and more.
            Never miss an opportunity to build something amazing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
              variant="neon"
              className="text-base font-semibold"
              onClick={() => {
                document.getElementById('events-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Search className="mr-2 h-5 w-5" />
              Browse Hackathons
            </Button>
            <Button
              size="lg"
              variant="neonOutline"
              className="text-base font-semibold"
            >
              <Plus className="mr-2 h-5 w-5" />
              Add Your Hackathon
            </Button>
          </div>

          <div className="pt-8 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>500+ Active Hackathons</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-success" />
              <span>$5M+ in Prizes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-secondary" />
              <span>50+ Countries</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
