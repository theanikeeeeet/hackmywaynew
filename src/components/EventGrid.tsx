import { EventCard } from './EventCard';
import { HackathonEvent } from '@/data/mockEvents';
import { Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventGridProps {
  events: HackathonEvent[];
  onFilterToggle: () => void;
}

/**
 * Event Grid Component
 * Displays: Responsive grid of event cards
 * Layout: 1 column mobile, 2 columns tablet, 3 columns desktop
 */
export const EventGrid = ({ events, onFilterToggle }: EventGridProps) => {
  if (events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="text-center space-y-4 max-w-md">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-2xl font-semibold text-foreground">No hackathons found</h3>
          <p className="text-muted-foreground">
            Try adjusting your filters or search terms to find more hackathons.
          </p>
          <Button onClick={onFilterToggle} variant="outline">
            <Filter className="h-4 w-4 mr-2" />
            Adjust Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">
            {events.length} Hackathon{events.length !== 1 ? 's' : ''} Found
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Explore opportunities to build, learn, and win
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden"
          onClick={onFilterToggle}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
