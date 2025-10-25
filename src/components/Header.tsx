import { Search, Menu, X, Calendar, TrendingUp, Info, User } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onViewChange: (view: 'grid' | 'calendar') => void;
  currentView: 'grid' | 'calendar';
}

/**
 * Header/Navbar Component
 * Features: Logo, search bar, navigation links, auth placeholder
 * Responsive: Hamburger menu on mobile
 */
export const Header = ({ searchQuery, onSearchChange, onViewChange, currentView }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-secondary shadow-glow-pink">
              <Calendar className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="hidden font-bold text-xl text-foreground sm:inline-block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              HackMyWay
            </span>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search hackathons, keywords..."
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            <Button
              variant={currentView === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('grid')}
            >
              Home
            </Button>
            <Button
              variant={currentView === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('calendar')}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button variant="ghost" size="sm">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
            <Button variant="ghost" size="sm">
              <Info className="h-4 w-4 mr-2" />
              About
            </Button>
          </nav>

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hover-glow-pink">
              Login
            </Button>
            <Button variant="neon" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search hackathons..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4 space-y-2 animate-in slide-in-from-top">
            <Button
              variant={currentView === 'grid' ? 'default' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                onViewChange('grid');
                setMobileMenuOpen(false);
              }}
            >
              Home
            </Button>
            <Button
              variant={currentView === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              className="w-full justify-start"
              onClick={() => {
                onViewChange('calendar');
                setMobileMenuOpen(false);
              }}
            >
              <Calendar className="h-4 w-4 mr-2" />
              Calendar
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </Button>
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Info className="h-4 w-4 mr-2" />
              About
            </Button>
            <div className="pt-2 border-t space-y-2">
              <Button variant="ghost" size="sm" className="w-full hover-glow-pink">
                <User className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button variant="neon" size="sm" className="w-full">
                Sign Up
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
