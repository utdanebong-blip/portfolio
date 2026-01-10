import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from '@/components/layout';
import { getProject } from '@/hooks/usePortfolioData';
import { ModelViewerPlaceholder } from '@/components/3d';
import { ArrowLeft, Box, Layers, Grid3X3, RotateCcw, ExternalLink, Cpu, Package, Palette, HardDrive, Download, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const hashLink = (path: string) => `#${path}`;


type ViewMode = 'rendered' | 'wireframe' | 'uv' | '3d';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProject(id || '');
  const [viewMode, setViewMode] = useState<ViewMode>('rendered');
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    const from = (location.state as any)?.from;
    if (from) {
      navigate(from, { replace: true });
      return;
    }
    navigate('/gallery?tab=props', { replace: true });
  };

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Project not found</h1>
          <button onClick={() => navigate('/gallery?tab=props', { replace: true })}><Button>Back to Gallery</Button></button>
        </div>
      </Layout>
    );
  }

  const viewModes: { id: ViewMode; label: string; icon: any }[] = [
    { id: 'rendered', label: 'Render', icon: Box },
    { id: 'wireframe', label: 'Wire', icon: Grid3X3 },
    { id: 'uv', label: 'UV', icon: Layers },
    { id: '3d', label: '3D', icon: RotateCcw },
  ];

  const specs = [
    { label: 'Polygons', value: project.specs.polyCount.toLocaleString(), icon: Cpu },
    { label: 'Vertices', value: project.specs.vertexCount.toLocaleString(), icon: Package },
    { label: 'Materials', value: project.specs.materialSlots, icon: Palette },
    { label: 'File Size', value: project.specs.fileSize, icon: HardDrive },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="relative min-h-[50vh] md:min-h-[70vh] overflow-hidden bg-gradient-to-b from-card to-background">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        
        {/* Back Button */}
        <button
          onClick={goBack}
          className="absolute top-4 left-4 md:top-8 md:left-8 z-20 inline-flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors backdrop-blur-sm bg-background/30 px-3 py-2 md:px-4 md:py-2 rounded-full border border-border/30"
        >
          <ArrowLeft size={14} /> <span className="hidden sm:inline">Gallery</span>
        </button>

        {/* Category Badge */}
        <div className="absolute top-4 right-4 md:top-8 md:right-8 z-20">
          <span className="px-3 py-1.5 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20 backdrop-blur-sm">
            {project.category}
          </span>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 pt-20 pb-8 md:pt-28 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Title - Mobile optimized */}
            <div className="text-center mb-6 md:mb-8">
              <h1 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold mb-3 md:mb-4 tracking-tight">
                {project.title}
              </h1>
              <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                {project.description}
              </p>
            </div>

            {/* View Mode Selector - Mobile friendly */}
            <div className="flex justify-center gap-1.5 md:gap-2 mb-4 md:mb-6">
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                      viewMode === mode.id 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                        : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card border border-border/30'
                    }`}
                  >
                    <Icon size={14} className="md:w-4 md:h-4" /> 
                    <span>{mode.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Image/3D Display */}
            <div className="relative aspect-video md:aspect-[16/10] rounded-xl md:rounded-2xl overflow-hidden border border-border/30 bg-card/50 shadow-2xl shadow-primary/5">
              {viewMode === '3d' ? (
                <ModelViewerPlaceholder className="w-full h-full" />
              ) : (
                <img
                  src={viewMode === 'rendered' ? project.images.rendered : viewMode === 'wireframe' ? project.images.wireframe : project.images.uv}
                  alt={`${project.title} - ${viewMode}`}
                  className="w-full h-full object-cover transition-all duration-500"
                />
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-primary/30 rounded-tl" />
              <div className="absolute top-3 right-3 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-primary/30 rounded-tr" />
              <div className="absolute bottom-3 left-3 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-primary/30 rounded-bl" />
              <div className="absolute bottom-3 right-3 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-primary/30 rounded-br" />
            </div>
          </div>
        </div>
      </div>

      {/* Specs & Details Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          
          {/* Quick Specs - Horizontal scroll on mobile */}
          <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 min-w-max md:min-w-0">
              {specs.map((spec, index) => (
                <div 
                  key={spec.label}
                  className="flex-shrink-0 w-32 md:w-auto bg-gradient-to-br from-card to-card/50 border border-border/30 rounded-xl md:rounded-2xl p-4 md:p-6 text-center group hover:border-primary/30 transition-all animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <spec.icon className="w-5 h-5 md:w-6 md:h-6 text-primary mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform" />
                  <p className="font-mono text-lg md:text-2xl font-bold text-foreground mb-0.5 md:mb-1">{spec.value}</p>
                  <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{spec.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Specs */}
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <div className="bg-card/50 border border-border/30 rounded-xl md:rounded-2xl p-5 md:p-6">
              <h3 className="font-display text-base md:text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Layers className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Technical Details
              </h3>
              <div className="space-y-3 font-mono text-xs md:text-sm">
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-muted-foreground">Texel Density</span>
                  <span className="text-foreground font-medium">{project.specs.texelDensity}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-border/30">
                  <span className="text-muted-foreground">Texture Res</span>
                  <span className="text-foreground font-medium">{project.specs.textureResolution}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground">Materials</span>
                  <span className="text-foreground font-medium">{project.specs.materialSlots} Slots</span>
                </div>
              </div>
            </div>

            <div className="bg-card/50 border border-border/30 rounded-xl md:rounded-2xl p-5 md:p-6">
              <h3 className="font-display text-base md:text-lg font-semibold mb-4 text-foreground flex items-center gap-2">
                <Package className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                Software Used
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.software.map((sw) => (
                  <span 
                    key={sw} 
                    className="px-3 py-1.5 rounded-full bg-background/50 border border-border/30 text-foreground/80 font-body text-xs md:text-sm hover:border-primary/50 hover:text-primary transition-colors"
                  >
                    {sw}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Process Section */}
          {project.process && (
            <div className="relative bg-gradient-to-br from-card to-card/30 border border-border/30 rounded-xl md:rounded-2xl p-5 md:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <h3 className="font-display text-base md:text-lg font-semibold mb-3 md:mb-4 text-foreground relative">Creation Process</h3>
              <p className="font-body text-sm md:text-base text-muted-foreground leading-relaxed relative">{project.process}</p>
            </div>
          )}

          {/* View Thumbnails */}
          <div>
            <h3 className="font-display text-base md:text-lg font-semibold mb-4 text-foreground">All Views</h3>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {(['rendered', 'wireframe', 'uv'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`relative aspect-video rounded-lg md:rounded-xl overflow-hidden group transition-all ${
                    viewMode === mode ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : 'hover:opacity-80'
                  }`}
                >
                  <img
                    src={project.images[mode]}
                    alt={mode}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  <span className="absolute bottom-2 left-2 text-[10px] md:text-xs font-medium text-foreground capitalize">
                    {mode === 'uv' ? 'UV Map' : mode}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4">
            <Button size="lg" className="font-display gap-2 glow-green">
              <Download size={18} /> Download Asset
            </Button>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto font-display gap-2 border-border/50 hover:border-primary/50">
                Request Custom <ChevronRight size={16} />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}