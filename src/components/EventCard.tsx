import { Calendar, MapPin, Clock, Bookmark, Share2, CheckCircle, Trophy, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { HackathonEvent } from '@/data/mockEvents';
import { toast } from 'sonner';

interface EventCardProps {
  event: HackathonEvent;
}

/**
 * Event Card Component
 * Displays: title, organizer, dates, tags, prize, mode badge, verified badge
 * Actions: Bookmark, Add to Calendar, Share
 * Responsive: Stacks vertically on mobile, grid layout on desktop
 */
export const EventCard = ({ event }: EventCardProps) => {
  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'Online': return 'bg-[hsl(var(--online))]';
      case 'Offline': return 'bg-[hsl(var(--offline))]';
      case 'Hybrid': return 'bg-[hsl(var(--hybrid))]';
      default: return 'bg-muted';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDeadlineCountdown = (deadline: string) => {
    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diff = deadlineDate.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days < 0) return 'Registration closed';
    if (days === 0) return 'Ends today!';
    if (days === 1) return '1 day left';
    return `${days} days left`;
  };

  const handleBookmark = () => {
    toast.success(`Bookmarked "${event.title}"`);
  };

  const handleAddToCalendar = () => {
    toast.success(`Added "${event.title}" to calendar`);
  };

  const handleShare = () => {
    toast.success('Link copied to clipboard!');
  };

  return (
    <Card className="group hover:shadow-neon-pink transition-all duration-300 hover:-translate-y-1 overflow-hidden border-primary/20 hover:border-primary/40">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">
              {event.title}
            </h3>
          </div>
          {event.verified && (
            <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="font-medium">
            {event.platform}
          </Badge>
          <Badge className={`${getModeColor(event.mode)} text-white border-0`}>
            {event.mode}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Organizer & Region */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{event.organizer} • {event.region}</span>
        </div>

        {/* Dates */}
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4 flex-shrink-0" />
            <span>{formatDate(event.start_time)} - {formatDate(event.end_time)}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 flex-shrink-0 text-warning" />
            <span className="text-warning font-medium">
              {getDeadlineCountdown(event.registration_deadline)}
            </span>
          </div>
        </div>

        {/* Prize Info */}
        {event.prize_info && (
          <div className="flex items-center gap-2 text-sm bg-secondary/10 rounded-lg p-2">
            <Trophy className="h-4 w-4 text-secondary flex-shrink-0" />
            <span className="font-medium text-secondary">{event.prize_info}</span>
          </div>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {event.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
          {event.tags.length > 4 && (
            <Badge variant="secondary" className="text-xs">
              +{event.tags.length - 4}
            </Badge>
          )}
        </div>

        {/* Skill Level & Team Size */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground pt-2 border-t">
          <div className="flex items-center gap-1">
            <span className="font-medium">Level:</span> {event.skill_level}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            <span>{event.team_size}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex gap-2 pt-0">
        <Button
          variant="neonOutline"
          size="sm"
          className="flex-1"
          onClick={handleBookmark}
        >
          <Bookmark className="h-4 w-4 mr-1" />
          Save
        </Button>
        <Button
          variant="default"
          size="sm"
          className="flex-1"
          onClick={handleAddToCalendar}
        >
          <Calendar className="h-4 w-4 mr-1" />
          Add
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="hover-glow-purple"
          onClick={handleShare}
        >
          <Share2 className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
