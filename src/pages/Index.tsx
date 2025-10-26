import { useState, useMemo, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { FilterSidebar, Filters } from '@/components/FilterSidebar';
import { EventGrid } from '@/components/EventGrid';
import { CalendarView } from '@/components/CalendarView';
import { useHackathons, useTriggerFetch } from '@/hooks/useHackathons';
import { HackathonEvent } from '@/data/mockEvents';
import { toast } from 'sonner';

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

  const { data: hackathons, isLoading, error } = useHackathons();
  const triggerFetch = useTriggerFetch();

  // Trigger initial data fetch on mount if no data exists
  useEffect(() => {
    const fetchInitialData = async () => {
      if (hackathons && hackathons.length === 0) {
        try {
          await triggerFetch();
          toast.success('Fetched latest hackathons from APIs');
        } catch (err) {
          console.error('Failed to fetch initial data:', err);
          toast.error('Failed to fetch hackathons');
        }
      }
    };
    
    fetchInitialData();
  }, []);

  // Convert database hackathons to app format
  const events: HackathonEvent[] = useMemo(() => {
    if (!hackathons) return [];
    
    return hackathons.map(h => {
      // Map source to valid platform
      const platformMap: Record<string, HackathonEvent['platform']> = {
        'MLH': 'MLH',
        'Devpost': 'Devpost',
        'Unstop': 'Unstop',
        'Devfolio': 'Devfolio',
        'DoraHacks': 'DoraHacks',
      };
      
      return {
        id: h.id,
        title: h.title,
        platform: platformMap[h.source] || 'Devpost',
        organizer: h.source,
        start_time: h.start_date,
        end_time: h.end_date,
        registration_deadline: h.end_date,
        tags: h.theme || [],
        mode: h.location as 'Online' | 'Offline' | 'Hybrid',
        region: h.location,
        verified: h.source === 'MLH',
        prize_info: null,
        skill_level: 'Beginner',
        team_size: '2-3',
        registration_url: h.url,
        supports_direct_registration: false,
      };
    });
  }, [hackathons]);

  // Filter events based on search and filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
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
  }, [searchQuery, filters, events]);

  if (error) {
    toast.error('Failed to load hackathons');
  }

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
