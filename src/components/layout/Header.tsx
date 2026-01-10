import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Menu, X, Home, User, Image, Mail, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';


const navItems = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/gallery', label: 'Gallery', icon: Image },
  { path: '/about', label: 'About', icon: User },
  { path: '/blog', label: 'Blog', icon: BookOpen },
  { path: '/contact', label: 'Contact', icon: Mail },
];

export function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded border border-primary flex items-center justify-center glow-green">
              <span className="font-display font-bold text-primary text-lg">UE</span>
            </div>
            <span className="font-display text-lg hidden sm:block text-foreground group-hover:text-primary transition-colors">
              UTIBE EBONG
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded font-body text-sm transition-all duration-300',
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border animate-slide-in-up">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded font-body transition-all',
                    isActive
                      ? 'bg-primary/20 text-primary border border-primary/50'
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                >
                  <Icon size={20} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
}
