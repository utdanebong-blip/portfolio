import { useParams, Link } from 'react-router-dom';
import { useState, useRef, useCallback, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { useProductVizProjects } from '@/hooks/usePortfolioData';
import { 
  ArrowLeft, 
  ZoomIn, 
  ZoomOut, 
  Move, 
  RotateCcw, 
  Maximize2, 
  X, 
  ChevronRight, 
  Download,
  Sparkles,
  Clock,
  Building2,
  Layers,
  Star,
  Package
} from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'hero' | 'lifestyle' | 'detail' | 'packaging';

interface ImageTransform {
  scale: number;
  x: number;
  y: number;
}

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  images: {
    hero: string;
    lifestyle: string;
    detail: string;
    packaging?: string;
  };
  specs: {
    client: string;
    industry: string;
    duration: string;
    year: string;
    deliverables: string;
  };
  software: string[];
  highlights?: string[];
  favorite?: boolean;
}

export default function ProductVizProjectDetail() {
  const { id } = useParams();
  const { getProject, updateProject } = useProductVizProjects();
  const project = getProject(id || '');
  
  const [viewMode, setViewMode] = useState<ViewMode>('hero');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPanning, setIsPanning] = useState(false);
  const [transform, setTransform] = useState<ImageTransform>({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Reset transform when view mode changes
  useEffect(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
  }, [viewMode]);

  const handleZoomIn = useCallback(() => {
    setTransform(prev => ({ ...prev, scale: Math.min(prev.scale + 0.5, 5) }));
  }, []);

  const handleZoomOut = useCallback(() => {
    setTransform(prev => ({ 
      ...prev, 
      scale: Math.max(prev.scale - 0.5, 1),
      x: prev.scale <= 1.5 ? 0 : prev.x,
      y: prev.scale <= 1.5 ? 0 : prev.y
    }));
  }, []);

  const handleReset = useCallback(() => {
    setTransform({ scale: 1, x: 0, y: 0 });
    setIsPanning(false);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (isPanning && transform.scale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - transform.x, y: e.clientY - transform.y });
    }
  }, [isPanning, transform]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isDragging && isPanning) {
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      setTransform(prev => ({ ...prev, x: newX, y: newY }));
    }
  }, [isDragging, isPanning, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.25 : 0.25;
    setTransform(prev => ({
      ...prev,
      scale: Math.min(Math.max(prev.scale + delta, 1), 5)
    }));
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (isPanning && transform.scale > 1 && e.touches.length === 1) {
      setIsDragging(true);
      setDragStart({ 
        x: e.touches[0].clientX - transform.x, 
        y: e.touches[0].clientY - transform.y 
      });
    }
  }, [isPanning, transform]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isDragging && isPanning && e.touches.length === 1) {
      const newX = e.touches[0].clientX - dragStart.x;
      const newY = e.touches[0].clientY - dragStart.y;
      setTransform(prev => ({ ...prev, x: newX, y: newY }));
    }
  }, [isDragging, isPanning, dragStart]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Project not found</h1>
          <Link to="/gallery"><Button>Back to Gallery</Button></Link>
        </div>
      </Layout>
    );
  }

  const allViewModes: { id: ViewMode; label: string; available: boolean }[] = [
    { id: 'hero', label: 'Hero', available: true },
    { id: 'lifestyle', label: 'Lifestyle', available: true },
    { id: 'detail', label: 'Detail', available: true },
    { id: 'packaging', label: 'Packaging', available: !!project.images.packaging },
  ];
  
  const viewModes = allViewModes.filter(m => m.available);

  const getCurrentImage = () => {
    switch (viewMode) {
      case 'hero': return project.images.hero;
      case 'lifestyle': return project.images.lifestyle;
      case 'detail': return project.images.detail;
      case 'packaging': return project.images.packaging || project.images.hero;
      default: return project.images.hero;
    }
  };

  const specs = [
    { label: 'Client', value: project.specs.client, icon: Building2 },
    { label: 'Industry', value: project.specs.industry, icon: Package },
    { label: 'Duration', value: project.specs.duration, icon: Clock },
    { label: 'Year', value: project.specs.year, icon: Sparkles },
  ];

  return (
    <Layout>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/98 backdrop-blur-2xl flex flex-col">
          {/* Fullscreen Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/30">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg bg-card/80 text-foreground hover:bg-card transition-colors"
              >
                <X size={20} />
              </button>
              <span className="font-display text-sm text-foreground">{project.title}</span>
            </div>
            
            {/* Fullscreen Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPanning(!isPanning)}
                className={`p-2 rounded-lg transition-colors ${
                  isPanning ? 'bg-primary text-primary-foreground' : 'bg-card/80 text-foreground hover:bg-card'
                }`}
              >
                <Move size={18} />
              </button>
              <button onClick={handleZoomOut} className="p-2 rounded-lg bg-card/80 text-foreground hover:bg-card">
                <ZoomOut size={18} />
              </button>
              <span className="px-3 py-1.5 rounded-lg bg-card/80 text-foreground text-xs font-mono min-w-[60px] text-center">
                {Math.round(transform.scale * 100)}%
              </span>
              <button onClick={handleZoomIn} className="p-2 rounded-lg bg-card/80 text-foreground hover:bg-card">
                <ZoomIn size={18} />
              </button>
              <button onClick={handleReset} className="p-2 rounded-lg bg-card/80 text-foreground hover:bg-card">
                <RotateCcw size={18} />
              </button>
            </div>
          </div>

          {/* Fullscreen Image */}
          <div 
            className="flex-1 overflow-hidden flex items-center justify-center"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: isPanning && transform.scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
          >
            <img
              src={getCurrentImage()}
              alt={project.title}
              className="max-w-full max-h-full object-contain transition-transform duration-150"
              style={{ 
                transform: `scale(${transform.scale}) translate(${transform.x / transform.scale}px, ${transform.y / transform.scale}px)`,
                pointerEvents: 'none'
              }}
              draggable={false}
            />
          </div>

          {/* Fullscreen Thumbnails */}
          <div className="flex justify-center gap-2 p-4 border-t border-border/30">
            {viewModes.map((mode) => (
              <button
                key={mode.id}
                onClick={() => { setViewMode(mode.id); handleReset(); }}
                className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                  viewMode === mode.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Futuristic Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border/10 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/5 rounded-full" />
        </div>

        {/* Header Bar */}
        <div className="sticky top-0 z-30 backdrop-blur-xl bg-background/80 border-b border-border/30">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link 
              to="/gallery" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft size={16} /> 
              <span className="hidden sm:inline">Back to Gallery</span>
              <span className="sm:hidden">Back</span>
            </Link>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono text-accent bg-accent/10 border border-accent/20">
                {project.category}
              </span>
              <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
                ProductViz
              </span>
              <button
                onClick={() => {
                  // toggle favorite flag on project in demo data
                  updateProject && updateProject(project.id, { favorite: !project.favorite });
                }}
                title={project.favorite ? 'Unfavorite' : 'Mark Favorite'}
                className="ml-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              >
                <Star className={project.favorite ? 'text-primary' : ''} />
              </button>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-10 relative z-10">
          {/* Title Section */}
          <div className="text-center mb-6 md:mb-8 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono mb-4">
              <Sparkles size={12} />
              <span>Product Visualization</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground">
              {project.description}
            </p>
          </div>

          {/* Main Layout */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
            
            {/* Image Viewer with Controls */}
            <div className="flex-1 lg:max-w-[800px]">
              {/* View Mode Tabs */}
              <div className="flex gap-1 mb-4 overflow-x-auto pb-2 -mx-2 px-2">
                {viewModes.map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`flex-shrink-0 px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all ${
                      viewMode === mode.id 
                        ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg shadow-primary/20' 
                        : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card border border-border/30'
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>

              {/* Image Container with Controls */}
              <div className="relative">
                {/* Control Bar */}
                <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 bg-card/90 backdrop-blur-sm rounded-lg p-1 border border-border/30">
                    <button
                      onClick={() => setIsPanning(!isPanning)}
                      className={`p-2 rounded-md transition-colors ${
                        isPanning 
                          ? 'bg-primary text-primary-foreground' 
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                      }`}
                      title="Toggle Pan Mode"
                    >
                      <Move size={16} />
                    </button>
                    <div className="w-px h-5 bg-border/50" />
                    <button
                      onClick={handleZoomOut}
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      title="Zoom Out"
                    >
                      <ZoomOut size={16} />
                    </button>
                    <span className="px-2 text-xs font-mono text-foreground min-w-[50px] text-center">
                      {Math.round(transform.scale * 100)}%
                    </span>
                    <button
                      onClick={handleZoomIn}
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      title="Zoom In"
                    >
                      <ZoomIn size={16} />
                    </button>
                    <div className="w-px h-5 bg-border/50" />
                    <button
                      onClick={handleReset}
                      className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      title="Reset View"
                    >
                      <RotateCcw size={16} />
                    </button>
                  </div>

                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="p-2 bg-card/90 backdrop-blur-sm rounded-lg border border-border/30 text-muted-foreground hover:text-foreground transition-colors"
                    title="Fullscreen"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>

                {/* Image Display */}
                <div 
                  ref={imageContainerRef}
                  className="relative aspect-[4/3] md:aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden border border-border/30 bg-gradient-to-br from-card/50 to-card/30 shadow-2xl shadow-primary/5"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onWheel={handleWheel}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{ cursor: isPanning && transform.scale > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }}
                >
                  <img
                    src={getCurrentImage()}
                    alt={`${project.title} - ${viewMode}`}
                    className="w-full h-full object-cover transition-transform duration-150"
                    style={{ 
                      transform: `scale(${transform.scale}) translate(${transform.x / transform.scale}px, ${transform.y / transform.scale}px)`,
                      pointerEvents: 'none'
                    }}
                    draggable={false}
                  />
                  
                  {/* Futuristic Corner Elements */}
                  <div className="absolute top-3 left-3 w-8 h-8 md:w-10 md:h-10 pointer-events-none">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                    <div className="absolute top-0 left-0 h-full w-0.5 bg-gradient-to-b from-primary to-transparent" />
                  </div>
                  <div className="absolute top-3 right-3 w-8 h-8 md:w-10 md:h-10 pointer-events-none">
                    <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-accent to-transparent" />
                    <div className="absolute top-0 right-0 h-full w-0.5 bg-gradient-to-b from-accent to-transparent" />
                  </div>
                  <div className="absolute bottom-3 left-3 w-8 h-8 md:w-10 md:h-10 pointer-events-none">
                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-transparent" />
                    <div className="absolute bottom-0 left-0 h-full w-0.5 bg-gradient-to-t from-primary to-transparent" />
                  </div>
                  <div className="absolute bottom-3 right-3 w-8 h-8 md:w-10 md:h-10 pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-full h-0.5 bg-gradient-to-l from-accent to-transparent" />
                    <div className="absolute bottom-0 right-0 h-full w-0.5 bg-gradient-to-t from-accent to-transparent" />
                  </div>

                  {/* View Label */}
                  <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-mono text-foreground border border-border/50">
                    {viewModes.find(m => m.id === viewMode)?.label} View
                  </div>

                  {/* Pan Mode Indicator */}
                  {isPanning && transform.scale > 1 && (
                    <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-mono animate-pulse">
                      Drag to Pan
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                  {viewModes.map((mode) => {
                    const imgSrc = mode.id === 'hero' ? project.images.hero :
                                   mode.id === 'lifestyle' ? project.images.lifestyle :
                                   mode.id === 'detail' ? project.images.detail :
                                   project.images.packaging || project.images.hero;
                    return (
                      <button
                        key={mode.id}
                        onClick={() => { setViewMode(mode.id); handleReset(); }}
                        className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
                          viewMode === mode.id 
                            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                            : 'opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={imgSrc}
                          alt={mode.label}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                        <span className="absolute bottom-1 left-1 text-[8px] md:text-[10px] font-mono text-foreground">
                          {mode.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-80 xl:w-96 space-y-4 md:space-y-5">
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec) => (
                  <div 
                    key={spec.label}
                    className="relative bg-gradient-to-br from-card/80 to-card/40 border border-border/30 rounded-xl p-3 md:p-4 group hover:border-primary/30 transition-all overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                    <spec.icon className="w-4 h-4 md:w-5 md:h-5 text-primary mb-2 relative z-10" />
                    <p className="font-body text-xs md:text-sm font-semibold text-foreground relative z-10 truncate">{spec.value}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider relative z-10">{spec.label}</p>
                  </div>
                ))}
              </div>

              {/* Deliverables */}
              <div className="bg-gradient-to-br from-card/80 to-card/40 border border-border/30 rounded-xl p-4 md:p-5">
                <h3 className="font-display text-sm md:text-base font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Deliverables
                </h3>
                <p className="font-body text-sm text-muted-foreground">{project.specs.deliverables}</p>
              </div>

              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div className="bg-gradient-to-br from-card/80 to-card/40 border border-border/30 rounded-xl p-4 md:p-5">
                  <h3 className="font-display text-sm md:text-base font-semibold mb-3 text-foreground flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    Highlights
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.highlights.map((highlight, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 text-foreground/90 text-xs"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Software */}
              <div className="bg-gradient-to-br from-card/80 to-card/40 border border-border/30 rounded-xl p-4 md:p-5">
                <h3 className="font-display text-sm md:text-base font-semibold mb-3 text-foreground flex items-center gap-2">
                  <Package className="w-4 h-4 text-primary" />
                  Software
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.software.map((sw) => (
                    <span 
                      key={sw}
                      className="px-2.5 py-1 rounded-full bg-background/50 border border-border/30 text-foreground/80 text-xs hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      {sw}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Button size="lg" className="w-full font-display gap-2 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                  <Download size={18} /> Download Renders
                </Button>
                <Link to="/contact" className="w-full">
                  <Button size="lg" variant="outline" className="w-full font-display gap-2 border-border/50 hover:border-primary/50">
                    Request Quote <ChevronRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
