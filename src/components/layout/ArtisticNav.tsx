import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Home, User, Image, Mail, BookOpen, Menu, X, Library, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { path: '/', label: 'Home', icon: Home, accent: 'primary' },
  { path: '/gallery', label: 'Gallery', icon: Image, accent: 'neon-orange' },
  { path: '/ai-render-enhancer', label: 'Enhancer', icon: Sparkles, accent: 'neon-green' },
  { path: '/about', label: 'About', icon: User, accent: 'accent' },
  { path: '/blog', label: 'Blog', icon: BookOpen, accent: 'neon-cyan' },
  { path: '/contact', label: 'Contact', icon: Mail, accent: 'primary' },
];

export function ArtisticNav() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop: Floating Orbital Nav */}
      <nav className={cn(
        "fixed top-6 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500",
        scrolled 
          ? "bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl shadow-primary/5" 
          : "bg-transparent"
      )}>
        {/* Logo */}
        <Link to="/" className="group flex items-center gap-2 px-4 py-2 mr-2">
          <div className="relative">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center rotate-3 group-hover:rotate-0 transition-transform duration-300">
              <span className="font-display font-bold text-primary-foreground text-sm">UE</span>
            </div>
            <div className="absolute -inset-1 rounded-xl bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
          </div>
        </Link>

        {/* Nav Items - Pill Style */}
        <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 rounded-full font-body text-sm transition-all duration-300 overflow-hidden",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                )}
              >
                <Icon size={16} />
                <span className="hidden lg:block">{item.label}</span>
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Mobile: Edge-Docked Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-4 right-4 z-50 md:hidden p-3 rounded-2xl transition-all duration-300",
          isOpen 
            ? "bg-destructive text-destructive-foreground rotate-90" 
            : "bg-card/80 backdrop-blur-xl border border-border text-foreground"
        )}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Logo */}
      <Link 
        to="/" 
        className="fixed top-4 left-4 z-50 md:hidden"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
          <span className="font-display font-bold text-primary-foreground text-sm">UE</span>
        </div>
      </Link>

      {/* Mobile: Fullscreen Overlay Nav */}
      <div className={cn(
        "fixed inset-0 z-40 md:hidden transition-all duration-500",
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
        
        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center gap-2 p-8">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
          
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "group flex items-center gap-6 px-8 py-5 rounded-2xl font-display text-2xl transition-all duration-300 w-full max-w-xs",
                  isActive
                    ? "bg-primary/20 text-primary border border-primary/30"
                    : "text-foreground hover:bg-secondary/50 hover:translate-x-2"
                )}
                style={{ 
                  transitionDelay: isOpen ? `${index * 50}ms` : '0ms',
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  opacity: isOpen ? 1 : 0
                }}
              >
                <div className={cn(
                  "p-3 rounded-xl transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                )}>
                  <Icon size={24} />
                </div>
                <span>{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 rounded-full bg-primary animate-pulse" />
                )}
              </Link>
            );
          })}

          {/* Bottom Brand */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <span className="font-mono text-xs text-muted-foreground tracking-widest">UTIBE EBONG © 2024</span>
          </div>
        </div>
      </div>
    </>
  );
}
