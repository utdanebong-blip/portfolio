import React, { Suspense, lazy, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { getProject } from '@/hooks/usePortfolioData';
import ModelViewerPlaceholder from '@/components/3d/ModelViewerPlaceholder';
import usePageMeta from '@/hooks/usePageMeta';
import { ArrowLeft, Box, Layers, Grid3X3, RotateCcw, ChevronRight, Download, Cpu, Package, Palette, HardDrive, ZoomIn, ZoomOut, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Lazy-load the heavy 3D viewer only when the user selects the 3D view.
const ModelViewer = lazy(() => import('@/components/3d/ModelViewer').then((m) => ({ default: m.ModelViewer })));

export const hashLink = (path: string) => `#${path}`;


type ViewMode = 'rendered' | 'rendered2' | 'topology' | 'uv' | '3d';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProject(id || '');
  usePageMeta({ title: project?.title || 'Project', description: project?.excerpt || '', image: project?.images?.[0] || project?.coverImage });
  const [viewMode, setViewMode] = useState<ViewMode>('rendered');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);

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

  const viewModes: { id: ViewMode; label: string; icon: any; shortLabel: string }[] = [
    { id: 'rendered', label: 'Render 1', shortLabel: 'R1', icon: Box },
    { id: 'rendered2', label: 'Render 2', shortLabel: 'R2', icon: Box },
    { id: 'topology', label: 'Topology', shortLabel: 'Topo', icon: Grid3X3 },
    { id: 'uv', label: 'UV Map', shortLabel: 'UV', icon: Layers },
    { id: '3d', label: '3D View', shortLabel: '3D', icon: RotateCcw },
  ];

  const specs = [
    { label: 'Polygons', value: project.specs.polyCount.toLocaleString(), icon: Cpu },
    { label: 'Vertices', value: project.specs.vertexCount.toLocaleString(), icon: Package },
    { label: 'Materials', value: project.specs.materialSlots, icon: Palette },
    { label: 'File Size', value: project.specs.fileSize, icon: HardDrive },
  ];

  const getCurrentImage = () => {
    switch (viewMode) {
      case 'rendered':
        return project.images.rendered || project.thumbnail || project.images.uv || project.images.topology;
      case 'rendered2':
        return project.images.rendered2 || project.thumbnail || project.images.rendered || project.images.topology;
      case 'topology':
        return project.images.topology || project.images.rendered;
      case 'uv':
        return project.images.uv || project.images.rendered || project.thumbnail;
      default:
        return project.images.rendered || project.thumbnail;
    }
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));
  const resetZoom = () => setZoom(1);

  return (
    <Layout>
      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl flex items-center justify-center p-4">
          <button
            onClick={() => { setIsFullscreen(false); resetZoom(); }}
            className="absolute top-4 right-4 md:top-8 md:right-8 z-50 p-2 rounded-full bg-card/80 text-foreground hover:bg-card transition-colors"
          >
            <X size={24} />
          </button>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2">
            <button onClick={handleZoomOut} className="p-2 rounded-full bg-card/80 text-foreground hover:bg-card">
              <ZoomOut size={20} />
            </button>
            <span className="px-3 py-2 rounded-full bg-card/80 text-foreground text-sm font-mono">{Math.round(zoom * 100)}%</span>
            <button onClick={handleZoomIn} className="p-2 rounded-full bg-card/80 text-foreground hover:bg-card">
              <ZoomIn size={20} />
            </button>
          </div>
          <div className="max-w-full max-h-full overflow-auto">
            <img
              src={getCurrentImage()}
              alt={project.title}
              className="transition-transform duration-300"
              style={{ transform: `scale(${zoom})`, maxWidth: '2000px', maxHeight: '2000px' }}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="min-h-screen bg-gradient-to-b from-card/50 via-background to-background">
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
            <span className="px-3 py-1 rounded-full text-xs font-mono text-primary bg-primary/10 border border-primary/20">
              {project.category}
            </span>
          </div>
        </div>

        <div className="container mx-auto px-4 py-6 md:py-10">
          {/* Title Section */}
          <div className="text-center mb-6 md:mb-8">
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 tracking-tight text-foreground">
              {project.title}
            </h1>
            <p className="font-body text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
              {project.description}
            </p>
          </div>

          {/* Main Layout - Image Viewer + Sidebar */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 max-w-7xl mx-auto">
            
            {/* Large Square Image Viewer */}
            <div className="flex-1 lg:max-w-[800px]">
              {/* View Mode Tabs - Horizontal scroll on mobile */}
              <div className="flex gap-1 mb-4 overflow-x-auto pb-2 -mx-2 px-2 scrollbar-hide">
                {viewModes.map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id)}
                      className={`flex-shrink-0 flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                        viewMode === mode.id 
                          ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20' 
                          : 'bg-card/50 text-muted-foreground hover:text-foreground hover:bg-card border border-border/30'
                      }`}
                    >
                      <Icon size={14} />
                      <span className="hidden sm:inline">{mode.label}</span>
                      <span className="sm:hidden">{mode.shortLabel}</span>
                    </button>
                  );
                })}
              </div>

              {/* Square Image Container - 1:1 Aspect Ratio */}
              <div 
                className="relative aspect-square w-full rounded-xl md:rounded-2xl overflow-hidden border border-border/30 bg-card/30 shadow-2xl shadow-primary/5 cursor-pointer group"
                onClick={() => viewMode !== '3d' && setIsFullscreen(true)}
              >
                {viewMode === '3d' ? (
                  <ModelViewerPlaceholder className="w-full h-full" />
                ) : (
                  <>
                    <img
                      src={getCurrentImage()}
                      alt={`${project.title} - ${viewMode}`}
                      className="w-full h-full object-cover transition-all duration-500"
                    />
                    {/* Zoom hint overlay */}
                    <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 text-foreground text-sm">
                        <ZoomIn size={16} />
                        <span>Click to zoom</span>
                      </div>
                    </div>
                  </>
                )}
                
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-primary/40 rounded-tl pointer-events-none" />
                <div className="absolute top-3 right-3 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-primary/40 rounded-tr pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-primary/40 rounded-bl pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-primary/40 rounded-br pointer-events-none" />

                {/* View indicator */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-card/90 backdrop-blur-sm text-xs font-mono text-foreground border border-border/50">
                  {viewModes.find(m => m.id === viewMode)?.label}
                </div>
              </div>

              {/* Thumbnail Strip */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {viewModes.filter(m => m.id !== '3d').map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden transition-all ${
                      viewMode === mode.id 
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                        : 'opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={
                        mode.id === 'rendered'
                          ? (project.images.rendered || project.thumbnail)
                          : mode.id === 'rendered2'
                          ? (project.images.rendered2 || project.thumbnail || project.images.rendered)
                          : mode.id === 'topology'
                          ? (project.images.topology || project.images.rendered)
                          : (project.images.uv || project.images.rendered)
                      }
                      alt={mode.label}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    <span className="absolute bottom-1 left-1 text-[8px] md:text-[10px] font-mono text-foreground">
                      {mode.shortLabel}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sidebar - Specs & Details */}
            <div className="lg:w-80 xl:w-96 space-y-4 md:space-y-6">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                {specs.map((spec, index) => (
                  <div 
                    key={spec.label}
                    className="bg-card/50 border border-border/30 rounded-xl p-3 md:p-4 group hover:border-primary/30 transition-all"
                  >
                    <spec.icon className="w-4 h-4 md:w-5 md:h-5 text-primary mb-2 group-hover:scale-110 transition-transform" />
                    <p className="font-mono text-base md:text-lg font-bold text-foreground">{spec.value}</p>
                    <p className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wider">{spec.label}</p>
                  </div>
                ))}
              </div>

              {/* Technical Details */}
              <div className="bg-card/50 border border-border/30 rounded-xl p-4 md:p-5">
                <h3 className="font-display text-sm md:text-base font-semibold mb-4 text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-primary" />
                  Technical Specs
                </h3>
                <div className="space-y-3 font-mono text-xs md:text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Texel Density</span>
                    <span className="text-foreground font-medium">{project.specs.texelDensity}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-border/30">
                    <span className="text-muted-foreground">Texture Resolution</span>
                    <span className="text-foreground font-medium">{project.specs.textureResolution}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-muted-foreground">Material Slots</span>
                    <span className="text-foreground font-medium">{project.specs.materialSlots}</span>
                  </div>
                </div>
              </div>

              {/* Software Used */}
              <div className="bg-card/50 border border-border/30 rounded-xl p-4 md:p-5">
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

              {/* Creation Process */}
              {project.process && (
                <div className="bg-gradient-to-br from-card/50 to-card/30 border border-border/30 rounded-xl p-4 md:p-5">
                  <h3 className="font-display text-sm md:text-base font-semibold mb-3 text-foreground">
                    Creation Process
                  </h3>
                  <p className="font-body text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {project.process}
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3 pt-2">
                <Button size="lg" className="w-full font-display gap-2 glow-green">
                  <Download size={18} /> Download Asset
                </Button>
                <Link to="/contact" className="w-full">
                  <Button size="lg" variant="outline" className="w-full font-display gap-2 border-border/50 hover:border-primary/50">
                    Request Custom <ChevronRight size={16} />
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