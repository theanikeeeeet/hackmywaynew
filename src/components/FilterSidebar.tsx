import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

export interface Filters {
  platforms: string[];
  mode: string;
  categories: string[];
  skillLevel: string;
  teamSize: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Filter Sidebar Component
 * Features: Platform, mode, category, skill level, team size filters
 * Responsive: Collapsible on mobile (slide-in overlay)
 */
export const FilterSidebar = ({ filters, onFilterChange, isOpen, onClose }: FilterSidebarProps) => {
  const platforms = ['Devpost', 'Devfolio', 'MLH', 'DoraHacks', 'Unstop', 'Corporate', 'Web3'];
  const categories = ['AI', 'Web3', 'ML', 'Fintech', 'Beginner-Friendly', 'Gaming', 'Healthcare', 'EdTech'];
  const skillLevels = ['Beginner', 'Intermediate', 'Advanced'];
  const teamSizes = ['Solo', '2-3', '4+'];

  const handlePlatformToggle = (platform: string) => {
    const newPlatforms = filters.platforms.includes(platform)
      ? filters.platforms.filter(p => p !== platform)
      : [...filters.platforms, platform];
    onFilterChange({ ...filters, platforms: newPlatforms });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
    onFilterChange({ ...filters, categories: newCategories });
  };

  const handleReset = () => {
    onFilterChange({
      platforms: [],
      mode: 'all',
      categories: [],
      skillLevel: 'all',
      teamSize: 'all'
    });
  };

  const activeFilterCount = 
    filters.platforms.length + 
    filters.categories.length + 
    (filters.mode !== 'all' ? 1 : 0) +
    (filters.skillLevel !== 'all' ? 1 : 0) +
    (filters.teamSize !== 'all' ? 1 : 0);

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 lg:top-20 left-0 h-[calc(100vh-4rem)] lg:h-[calc(100vh-5rem)]
          w-80 bg-card border-r overflow-y-auto z-40
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-semibold text-lg">Filters</h2>
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-2">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleReset}>
                Reset
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Separator />

          {/* Platform Filter */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Platform</h3>
            <div className="space-y-2">
              {platforms.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={`platform-${platform}`}
                    checked={filters.platforms.includes(platform)}
                    onCheckedChange={() => handlePlatformToggle(platform)}
                  />
                  <Label
                    htmlFor={`platform-${platform}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Mode Filter */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Mode</h3>
            <RadioGroup value={filters.mode} onValueChange={(value) => onFilterChange({ ...filters, mode: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="mode-all" />
                <Label htmlFor="mode-all" className="text-sm font-normal cursor-pointer">All</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Online" id="mode-online" />
                <Label htmlFor="mode-online" className="text-sm font-normal cursor-pointer">
                  <span className="flex items-center gap-2">
                    Online
                    <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--online))]" />
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Offline" id="mode-offline" />
                <Label htmlFor="mode-offline" className="text-sm font-normal cursor-pointer">
                  <span className="flex items-center gap-2">
                    Offline
                    <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--offline))]" />
                  </span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Hybrid" id="mode-hybrid" />
                <Label htmlFor="mode-hybrid" className="text-sm font-normal cursor-pointer">
                  <span className="flex items-center gap-2">
                    Hybrid
                    <span className="inline-block h-2 w-2 rounded-full bg-[hsl(var(--hybrid))]" />
                  </span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          {/* Category Tags */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category}`}
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryToggle(category)}
                  />
                  <Label
                    htmlFor={`category-${category}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Skill Level */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Skill Level</h3>
            <RadioGroup value={filters.skillLevel} onValueChange={(value) => onFilterChange({ ...filters, skillLevel: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="skill-all" />
                <Label htmlFor="skill-all" className="text-sm font-normal cursor-pointer">All</Label>
              </div>
              {skillLevels.map((level) => (
                <div key={level} className="flex items-center space-x-2">
                  <RadioGroupItem value={level} id={`skill-${level}`} />
                  <Label htmlFor={`skill-${level}`} className="text-sm font-normal cursor-pointer">
                    {level}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          {/* Team Size */}
          <div className="space-y-3">
            <h3 className="font-medium text-sm text-foreground">Team Size</h3>
            <RadioGroup value={filters.teamSize} onValueChange={(value) => onFilterChange({ ...filters, teamSize: value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="all" id="team-all" />
                <Label htmlFor="team-all" className="text-sm font-normal cursor-pointer">All</Label>
              </div>
              {teamSizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <RadioGroupItem value={size} id={`team-${size}`} />
                  <Label htmlFor={`team-${size}`} className="text-sm font-normal cursor-pointer">
                    {size}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </aside>
    </>
  );
};
