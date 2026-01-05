import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from '@/components/layout';
import { useArchvizProjects } from '@/hooks/usePortfolioData';
import { ArrowLeft, MapPin, Maximize, Calendar, Building2, Sparkles, Image, Layout as LayoutIcon, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const hashLink = (path: string) => `#${path}`;

type ViewMode = 'exterior' | 'interior' | 'floorPlan' | 'detail';

export default function ArchvizProjectDetail() {
  const { id } = useParams();
  const { getProject } = useArchvizProjects();
  const project = getProject(id || '');
  const [viewMode, setViewMode] = useState<ViewMode>('exterior');

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Project not found</h1>
          <Link to="/gallery?tab=archviz"><Button>Back to Gallery</Button></Link>
        </div>
      </Layout>
    );
  }

  const viewModes: { id: ViewMode; label: string; icon: any }[] = [
    { id: 'exterior', label: 'Exterior', icon: Building2 },
    { id: 'interior', label: 'Interior', icon: Eye },
    { id: 'floorPlan', label: 'Plan', icon: LayoutIcon },
    { id: 'detail', label: 'Details', icon: Sparkles },
  ];

  const currentIndex = viewModes.findIndex(m => m.id === viewMode);
  
  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % viewModes.length;
    setViewMode(viewModes[nextIndex].id);
  };
  
  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + viewModes.length) % viewModes.length;
    setViewMode(viewModes[prevIndex].id);
  };

  return (
    <Layout>
      {/* Hero Section with Full Image */}
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <img
          src={project.images[viewMode]}
          alt={`${project.title} - ${viewMode}`}
          className="w-full h-full object-cover transition-all duration-700"
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />
        
        {/* Mobile navigation arrows */}
        <button 
          onClick={goToPrev}
          className="md:hidden absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground/70 active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} />
        </button>
        <button 
          onClick={goToNext}
          className="md:hidden absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/30 backdrop-blur-sm border border-border/30 flex items-center justify-center text-foreground/70 active:scale-95 transition-transform"
        >
          <ChevronRight size={20} />
        </button>
        
        {/* Back Button */}
        <Link 
          to="/gallery?tab=archviz" 
          className="absolute top-4 left-4 md:top-8 md:left-8 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors backdrop-blur-sm bg-background/20 px-3 py-2 md:px-4 md:py-2 rounded-full border border-border/30"
        >
          <ArrowLeft size={14} /> <span className="hidden sm:inline">Gallery</span>
        </Link>
        
        {/* Status Badge */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${
            (project.specs as any).status === 'Completed' 
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
              : (project.specs as any).status === 'In Development'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-accent/20 text-accent border border-accent/30'
          }`}>
            {(project.specs as any).status}
          </span>
        </div>

        {/* View Mode Selector - Desktop */}
        <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 gap-2 backdrop-blur-md bg-background/30 p-2 rounded-full border border-border/30">
          {viewModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === mode.id 
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/20' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
                }`}
              >
                <Icon size={14} /> {mode.label}
              </button>
            );
          })}
        </div>

        {/* View Mode Dots - Mobile */}
        <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {viewModes.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setViewMode(mode.id)}
              className={`w-2 h-2 rounded-full transition-all ${
                viewMode === mode.id 
                  ? 'bg-accent w-6' 
                  : 'bg-foreground/30'
              }`}
            />
          ))}
        </div>

        {/* Title Overlay - Bottom */}
          <div className="absolute bottom-16 md:bottom-24 left-4 md:left-8 right-4 md:right-8">
          <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground mb-2 md:mb-3">
            <MapPin size={14} className="text-accent" />
            <span>{(project.specs as any).location}</span>
          </div>
          <h1 className="font-display text-2xl sm:text-4xl md:text-6xl font-bold tracking-tight text-foreground">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          
          {/* Description */}
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {project.description}
          </p>

          {/* Specs Grid - Scrollable on mobile */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 min-w-max md:min-w-0">
              {[
                { icon: Maximize, value: (project.specs as any).area, label: 'Total Area' },
                { icon: Building2, value: (project.specs as any).type, label: 'Project Type' },
                { icon: Sparkles, value: (project.specs as any).style, label: 'Design Style' },
                { icon: Calendar, value: (project.specs as any).year, label: 'Year' },
              ].map((spec, index) => (
                <div 
                  key={spec.label}
                  className="flex-shrink-0 w-36 md:w-auto bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl md:rounded-2xl p-4 md:p-6 text-center group hover:border-accent/30 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <spec.icon className="w-5 h-5 md:w-6 md:h-6 text-accent mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-display text-base md:text-xl font-bold text-foreground mb-0.5 md:mb-1">{spec.value}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Concept Section */}
          {(project as any).concept && (
            <div className="relative bg-gradient-to-br from-accent/5 to-transparent border border-accent/20 rounded-xl md:rounded-2xl p-5 md:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
              <div className="absolute -left-1 top-6 md:top-8 bottom-6 md:bottom-8 w-1 bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-full" />
              <div className="pl-4 md:pl-6 relative">
                <h2 className="font-display text-lg md:text-xl font-bold mb-3 md:mb-4 text-foreground">Design Philosophy</h2>
                <p className="font-body text-sm md:text-lg text-muted-foreground leading-relaxed italic">
                  "{(project as any).concept}"
                </p>
              </div>
            </div>
          )}

          {/* Image Gallery */}
          <div>
            <h2 className="font-display text-lg md:text-xl font-bold mb-4 md:mb-6 text-foreground">Project Views</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                return (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`relative aspect-[4/3] rounded-lg md:rounded-xl overflow-hidden group transition-all ${
                    viewMode === mode.id ? 'ring-2 ring-accent ring-offset-2 ring-offset-background' : ''
                  }`}
                >
                  <img
                    src={project.images[mode.id]}
                    alt={mode.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 md:bottom-3 md:left-3 flex items-center gap-1.5">
                    <Icon size={12} className="text-accent" />
                    <span className="text-[10px] md:text-xs font-medium text-foreground">
                      {mode.label}
                    </span>
                  </div>
                </button>
                )
              })}
            </div>
          </div>

          {/* Software Section */}
          <div className="bg-card/50 border border-border/30 rounded-xl md:rounded-2xl p-5 md:p-8">
            <h2 className="font-display text-base md:text-lg font-bold mb-4 md:mb-6 text-foreground">Visualization Tools</h2>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {project.software.map((sw) => (
                <span 
                  key={sw} 
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-background/50 border border-border/30 text-foreground/80 font-body text-xs md:text-sm hover:border-accent/50 hover:text-accent transition-colors"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full font-display gap-2">
                Request Similar Project <ChevronRight size={16} />
              </Button>
            </Link>
            <Link to="/gallery?tab=archviz" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full font-display gap-2 border-border/50 hover:border-accent/50">
                View More Projects
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}