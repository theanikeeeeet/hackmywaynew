import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

/**
 * Hero Section Component
 * Features: Banner with title, subtitle, and CTA buttons
 * CTAs: Browse Hackathons (scrolls to events), Add Your Hackathon
 */
export const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 border-b">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground tracking-tight">
            Discover Your Next
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mt-2">
              Hackathon Adventure
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse thousands of hackathons worldwide. Filter by platform, mode, skill level, and more.
            Never miss an opportunity to build something amazing.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              size="lg"
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
              variant="outline"
              className="text-base font-semibold border-2"
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
