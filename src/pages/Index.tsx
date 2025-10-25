import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FilterSidebar, Filters } from '@/components/FilterSidebar';
import { EventGrid } from '@/components/EventGrid';
import { CalendarView } from '@/components/CalendarView';
import { mockEvents } from '@/data/mockEvents';

/**
 * Main Index Page - Hackathon Aggregator MVP
 * Layout: Header + Hero + Two-column (Sidebar + Main content)
 * State: Filters, search query, view mode (grid/calendar)
 */
const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'grid' | 'calendar'>('grid');
  const [filterSidebarOpen, setFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    platforms: [],
    mode: 'all',
    categories: [],
    skillLevel: 'all',
    teamSize: 'all'
  });

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return mockEvents.filter(event => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Platform filter
      const matchesPlatform = filters.platforms.length === 0 || 
        filters.platforms.includes(event.platform);

      // Mode filter
      const matchesMode = filters.mode === 'all' || event.mode === filters.mode;

      // Category filter
      const matchesCategory = filters.categories.length === 0 ||
        filters.categories.some(cat => event.tags.includes(cat));

      // Skill level filter
      const matchesSkillLevel = filters.skillLevel === 'all' || 
        event.skill_level === filters.skillLevel;

      // Team size filter
      const matchesTeamSize = filters.teamSize === 'all' || 
        event.team_size === filters.teamSize;

      return matchesSearch && matchesPlatform && matchesMode && 
             matchesCategory && matchesSkillLevel && matchesTeamSize;
    });
  }, [searchQuery, filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onViewChange={setCurrentView}
        currentView={currentView}
      />

      {/* Hero Section */}
      <Hero />

      {/* Main Content Area */}
      <div id="events-section" className="container mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filter Sidebar */}
          <FilterSidebar
            filters={filters}
            onFilterChange={setFilters}
            isOpen={filterSidebarOpen}
            onClose={() => setFilterSidebarOpen(false)}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {currentView === 'grid' ? (
              <EventGrid 
                events={filteredEvents} 
                onFilterToggle={() => setFilterSidebarOpen(true)}
              />
            ) : (
              <CalendarView events={filteredEvents} />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
