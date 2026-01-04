import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from '@/components/layout';
import { useArchvizProjects } from '@/hooks/usePortfolioData';
import { ArrowLeft, MapPin, Maximize, Calendar, Building2, Sparkles, Image, Layout as LayoutIcon, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'exterior' | 'interior' | 'floorPlan' | 'detail';
export const hashLink = (path: string) => `#${path}`;

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
    { id: 'floorPlan', label: 'Floor Plan', icon: LayoutIcon },
    { id: 'detail', label: 'Details', icon: Sparkles },
  ];

  return (
    <Layout>
      {/* Hero Section with Full Image */}
      <div className="relative h-[70vh] overflow-hidden">
        <img
          src={project.images[viewMode]}
          alt={`${project.title} - ${viewMode}`}
          className="w-full h-full object-cover transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 to-transparent" />
        
        {/* Back Button */}
        <Link 
            to="/gallery?tab=archviz" 
          className="absolute top-8 left-8 inline-flex items-center gap-2 text-foreground/80 hover:text-primary transition-colors backdrop-blur-sm bg-background/20 px-4 py-2 rounded-full border border-border/30"
        >
          <ArrowLeft size={16} /> Back to Gallery
        </Link>
        
        {/* View Mode Selector */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 backdrop-blur-md bg-background/30 p-2 rounded-full border border-border/30">
          {viewModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setViewMode(mode.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  viewMode === mode.id 
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                    : 'text-foreground/70 hover:text-foreground hover:bg-foreground/10'
                }`}
              >
                <Icon size={14} /> {mode.label}
              </button>
            );
          })}
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-8 right-8">
          <span className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm ${
            project.specs.status === 'Completed' 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : project.specs.status === 'In Development'
              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
              : 'bg-primary/20 text-primary border border-primary/30'
          }`}>
            {project.specs.status}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-4">
              <MapPin size={16} />
              <span className="font-body">{project.specs.location}</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold mb-6 tracking-tight">
              {project.title}
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-6 text-center group hover:border-primary/30 transition-colors">
              <Maximize className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-foreground mb-1">{project.specs.area}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Area</p>
            </div>
            <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-6 text-center group hover:border-primary/30 transition-colors">
              <Building2 className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-foreground mb-1">{project.specs.type}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Project Type</p>
            </div>
            <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-6 text-center group hover:border-primary/30 transition-colors">
              <Sparkles className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-foreground mb-1">{project.specs.style}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Design Style</p>
            </div>
            <div className="bg-gradient-to-br from-card to-card/50 border border-border/50 rounded-2xl p-6 text-center group hover:border-primary/30 transition-colors">
              <Calendar className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="font-display text-2xl font-bold text-foreground mb-1">{project.specs.year}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Year</p>
            </div>
          </div>

          {/* Concept Section */}
          {project.concept && (
            <div className="relative mb-16">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-primary/50 to-transparent rounded-full" />
              <div className="pl-8">
                <h2 className="font-display text-2xl font-bold mb-4 text-foreground">Design Philosophy</h2>
                <p className="font-body text-lg text-muted-foreground leading-relaxed italic">
                  "{project.concept}"
                </p>
              </div>
            </div>
          )}

          {/* Image Gallery */}
          <div className="mb-16">
            <h2 className="font-display text-2xl font-bold mb-8 text-foreground">Project Views</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`relative aspect-[4/3] rounded-xl overflow-hidden group transition-all ${
                    viewMode === mode.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''
                  }`}
                >
                  <img
                    src={project.images[mode.id]}
                    alt={mode.label}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="absolute bottom-3 left-3 text-sm font-medium text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                    {mode.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Software Section */}
          <div className="bg-gradient-to-br from-card to-card/30 border border-border/50 rounded-2xl p-8">
            <h2 className="font-display text-xl font-bold mb-6 text-foreground">Visualization Tools</h2>
            <div className="flex flex-wrap gap-3">
              {project.software.map((sw) => (
                <span 
                  key={sw} 
                  className="px-4 py-2 rounded-full bg-background/50 border border-border/50 text-foreground/80 font-body text-sm hover:border-primary/50 hover:text-primary transition-colors"
                >
                  {sw}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}