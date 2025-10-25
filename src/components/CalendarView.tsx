import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, List, Grid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { HackathonEvent } from '@/data/mockEvents';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { EventCard } from './EventCard';

interface CalendarViewProps {
  events: HackathonEvent[];
}

type ViewMode = 'month' | 'list';

/**
 * Calendar View Component
 * Features: Month/Week/List toggle, color-coded events by mode
 * Interaction: Click event → popover with details + CTA buttons
 */
export const CalendarView = ({ events }: CalendarViewProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [currentDate, setCurrentDate] = useState(new Date());

  const getModeColor = (mode: string) => {
    switch (mode) {
      case 'Online': return 'bg-[hsl(var(--online))]';
      case 'Offline': return 'bg-[hsl(var(--offline))]';
      case 'Hybrid': return 'bg-[hsl(var(--hybrid))]';
      default: return 'bg-muted';
    }
  };

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getDaysInMonth = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (Date | null)[] = [];
    
    // Add empty slots for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const getEventsForDay = (date: Date | null) => {
    if (!date) return [];
    
    return events.filter(event => {
      const eventStart = new Date(event.start_time);
      const eventEnd = new Date(event.end_time);
      
      return date >= new Date(eventStart.toDateString()) && 
             date <= new Date(eventEnd.toDateString());
    });
  };

  const days = getDaysInMonth();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  if (viewMode === 'list') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-foreground">Calendar View - List</h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setViewMode('month')}
            >
              <Grid className="h-4 w-4 mr-2" />
              Month
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="h-4 w-4 mr-2" />
              List
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          {events.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <CalendarIcon className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No events found for the selected filters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={goToPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold text-foreground min-w-[200px] text-center">
            {formatMonthYear(currentDate)}
          </h2>
          <Button variant="outline" size="sm" onClick={goToNextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setViewMode('month')}
          >
            <Grid className="h-4 w-4 mr-2" />
            Month
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4 mr-2" />
            List
          </Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(var(--online))]" />
          <span className="text-muted-foreground">Online</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(var(--offline))]" />
          <span className="text-muted-foreground">Offline</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-[hsl(var(--hybrid))]" />
          <span className="text-muted-foreground">Hybrid</span>
        </div>
      </div>

      {/* Calendar Grid */}
      <Card>
        <CardHeader>
          <div className="grid grid-cols-7 gap-2">
            {weekDays.map(day => (
              <div key={day} className="text-center text-sm font-semibold text-muted-foreground py-2">
                {day}
              </div>
            ))}
          </div>
        </CardHeader>
        <CardContent className="p-2">
          <div className="grid grid-cols-7 gap-2">
            {days.map((date, index) => {
              const dayEvents = getEventsForDay(date);
              const isToday = date && date.toDateString() === new Date().toDateString();

              return (
                <div
                  key={index}
                  className={`
                    min-h-[100px] p-2 rounded-lg border transition-colors
                    ${date ? 'bg-card hover:bg-accent/50' : 'bg-muted/20'}
                    ${isToday ? 'border-primary border-2' : 'border-border'}
                  `}
                >
                  {date && (
                    <>
                      <div className={`text-sm font-medium mb-2 ${isToday ? 'text-primary' : 'text-foreground'}`}>
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <Popover key={event.id}>
                            <PopoverTrigger asChild>
                              <button
                                className={`
                                  w-full text-left text-xs p-1 rounded truncate
                                  ${getModeColor(event.mode)} text-white
                                  hover:opacity-80 transition-opacity
                                `}
                              >
                                {event.title}
                              </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-0" align="start">
                              <EventCard event={event} />
                            </PopoverContent>
                          </Popover>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-muted-foreground text-center py-1">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
