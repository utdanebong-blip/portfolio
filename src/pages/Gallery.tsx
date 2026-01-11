import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { projects as projectsData, archvizProjects as archvizProjectsData, showreel as demoShowreel, productVizProjects as productVizProjectsData } from '@/hooks/usePortfolioData';
import { 
  Box, 
  Play, 
  Film, 
  MapPin, 
  Maximize, 
  ArrowRight, 
  Building2,
  Sparkles,
  Eye,
  Clock,
  Layers,
  Palette,
  Triangle,
  Grid3X3,
  LayoutGrid,
  Package,
  Briefcase,
  Star
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';

// Use demoShowreel from the data hook so showreels are easy to update centrally
const showreelVideos = demoShowreel;

type TabType = 'props' | 'productviz' | 'archviz' | 'showreel';

export default function Gallery() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<TabType>('props');
  const [propsLayout, setPropsLayout] = useState<'grid' | 'masonry'>('grid');
  const projects = projectsData;
  const archvizProjects = archvizProjectsData;
  const productVizProjects = productVizProjectsData;

  const tabs = [
    { id: 'props' as TabType, label: 'Props', icon: Box, count: projects.length },
    { id: 'productviz' as TabType, label: 'ProductViz', icon: Package, count: productVizProjects.length },
    { id: 'archviz' as TabType, label: 'Archviz', icon: Building2, count: archvizProjects.length },
    { id: 'showreel' as TabType, label: 'Showreel', icon: Film, count: showreelVideos.length }
  ];

  const [activeVideo, setActiveVideo] = useState<any | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [mediaError, setMediaError] = useState(false);

  const isVideoFile = (url: string) => {
    if (!url) return false;
    return /\.(mp4|webm|ogg)(?:\?.*)?$/i.test(url);
  };

  const openVideoModal = (video: any) => {
    const url = video?.videoUrl || '';
    const embed = getEmbedUrl(url);
    const isEmbeddable = /youtube\.com|youtu\.be|vimeo\.com/.test(url);
    const isFile = isVideoFile(url);

    // If it's a self-hosted video file, open modal with HTML5 player
    if (isFile) {
      setMediaError(false);
      setMediaLoading(true);
      setActiveVideo(video);
      setIsDialogOpen(true);
      return;
    }

    // If the URL is embeddable (YouTube/Vimeo) open modal with iframe
    if (isEmbeddable) {
      setMediaError(false);
      setMediaLoading(true);
      setActiveVideo(video);
      setIsDialogOpen(true);
      return;
    }

    // Non-embeddable external links (LinkedIn etc.) open in a new tab
    try {
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      location.href = url;
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return '';
    const yt = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/);
    if (yt) return `https://www.youtube.com/embed/${yt[1]}?autoplay=1`;
    const vimeo = url.match(/vimeo\.com\/(\d+)/);
    if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1`;
    return url;
  };

  // Respect `?tab=` from multiple sources so navigation works with HashRouter and state
  useEffect(() => {
    const allowed = ['props', 'productviz', 'archviz', 'showreel'];

    const getTabFromSearch = (search: string | null) => {
      if (!search) return null;
      const params = new URLSearchParams(search);
      return params.get('tab') as TabType | null;
    };

    let tab: TabType | null = getTabFromSearch(location.search);

    // If HashRouter encoded the query into the hash (e.g. #/gallery?tab=productviz)
    if (!tab && location.hash) {
      const qIndex = location.hash.indexOf('?');
      if (qIndex !== -1) {
        tab = getTabFromSearch(location.hash.slice(qIndex));
      }
    }

    // Also accept a `from` string passed via location.state (e.g. '/gallery?tab=archviz')
    if (!tab && (location.state as any)?.from) {
      try {
        const from = (location.state as any).from as string;
        const q = from.split('?')[1] || '';
        if (q) tab = new URLSearchParams('?' + q).get('tab') as TabType | null;
      } catch (e) {
        // ignore
      }
    }

    if (tab && allowed.includes(tab)) setActiveTab(tab as TabType);
  }, [location]);

  return (
    <Layout>
      {/* Hero Section - Futuristic */}
      <section className="relative min-h-[45vh] md:min-h-[55vh] flex items-center justify-center overflow-hidden pt-16 md:pt-0">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div className="absolute top-1/3 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/10 rounded-full blur-[100px] md:blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-accent/10 rounded-full blur-[80px] md:blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          
          {/* Grid overlay - hidden on mobile for performance */}
          <div className="absolute inset-0 opacity-[0.02] md:opacity-[0.03] hidden md:block" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '80px 80px'
          }} />
        </div>

        {/* Floating Elements - simplified on mobile */}
        <div className="absolute top-20 left-5 md:left-20 w-12 md:w-20 h-12 md:h-20 border border-primary/20 rounded-2xl rotate-12 animate-float opacity-20 md:opacity-30" />
        <div className="absolute bottom-24 md:bottom-32 right-5 md:right-32 w-10 md:w-16 h-10 md:h-16 border border-accent/20 rounded-xl -rotate-12 animate-float opacity-20 md:opacity-30" style={{ animationDelay: '-2s' }} />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Floating badge */}
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-card/50 backdrop-blur-xl border border-border/50 mb-4 md:mb-6 animate-fade-in">
            <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-primary" />
            <span className="font-mono text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest">Portfolio</span>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Project</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent"> Gallery</span>
          </h1>
          
          <p className="font-body text-sm md:text-base lg:text-lg text-muted-foreground max-w-xl md:max-w-2xl mx-auto mb-6 md:mb-8 animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
            Explore my collection of 3D props, product visualization, architectural renders, and showreels
          </p>

          {/* Tab Switcher - Horizontal scroll on mobile */}
          <div className="flex justify-start md:justify-center gap-2 md:gap-3 animate-fade-in overflow-x-auto pb-2 px-2 -mx-2 md:mx-0 scrollbar-hide" style={{ animationDelay: '0.3s' }}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group relative flex items-center gap-1.5 md:gap-3 px-3 md:px-5 py-2.5 md:py-3.5 rounded-xl md:rounded-2xl font-medium text-xs md:text-sm transition-all duration-500 flex-shrink-0 ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                    : 'bg-card/50 backdrop-blur-xl border border-border/50 text-muted-foreground hover:text-foreground hover:border-primary/30'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span className="font-display">{tab.label}</span>
                <span className={`flex items-center justify-center min-w-[18px] md:min-w-[24px] h-5 md:h-6 px-1.5 md:px-2 rounded-full text-[10px] md:text-xs font-mono ${
                  activeTab === tab.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Scroll hint - hidden on mobile */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 opacity-50 animate-bounce hidden md:flex">
          <div className="w-px h-6 md:h-8 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 md:pb-24 relative">
        <div className="container mx-auto px-4">
          
          {/* Props Tab */}
          {activeTab === 'props' && (
            <div className="animate-fade-in">
              {/* Section Stats */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Box className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-base md:text-xl font-bold text-foreground">Game-Ready Props</h2>
                    <p className="text-xs md:text-sm text-muted-foreground">{projects.length} assets available</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <button 
                    onClick={() => setPropsLayout('grid')}
                    className={`p-2 rounded-lg transition-colors ${propsLayout === 'grid' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => setPropsLayout('masonry')}
                    className={`p-2 rounded-lg transition-colors ${propsLayout === 'masonry' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                </div>
              </div>
              {/* Video Modal */}
              <Dialog open={isDialogOpen} onOpenChange={(open) => {
                if (!open) {
                  setActiveVideo(null);
                  setMediaLoading(false);
                  setMediaError(false);
                }
                setIsDialogOpen(open);
              }}>
                {activeVideo && (
                  <DialogContent className="max-w-4xl w-[95%] md:w-[80%]">
                    <div className="w-full">
                      <div className="aspect-video w-full bg-black relative">
                        {mediaLoading && (
                          <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                          </div>
                        )}
                        {mediaError && (
                          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                            <p className="text-white mb-2">Unable to load preview.</p>
                            <a href={activeVideo.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">Open in new tab</a>
                          </div>
                        )}

                        {/* If self-hosted video file, render HTML5 player */}
                        {isVideoFile(activeVideo.videoUrl) && !mediaError && (
                          <video
                            src={activeVideo.videoUrl}
                            className="w-full h-full"
                            controls
                            autoPlay
                            playsInline
                            onLoadedData={() => setMediaLoading(false)}
                            onError={() => { setMediaLoading(false); setMediaError(true); }}
                          />
                        )}

                        {/* Otherwise render iframe for embeddable sources */}
                        {!isVideoFile(activeVideo.videoUrl) && !mediaError && (
                          <iframe
                            title={activeVideo.title}
                            src={getEmbedUrl(activeVideo.videoUrl)}
                            className="w-full h-full"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                            onLoad={() => setMediaLoading(false)}
                            onError={() => { setMediaLoading(false); setMediaError(true); }}
                          />
                        )}
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold">{activeVideo.title}</h3>
                          <p className="text-sm text-muted-foreground">{activeVideo.description}</p>
                        </div>
                        <div>
                          <a href={activeVideo.videoUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline">Open in new tab</a>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                )}
              </Dialog>

              {/* Props Grid */}
              <div className={`grid gap-4 md:gap-6 ${
                propsLayout === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {projects.map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/gallery/${project.id}`}
                    state={{ from: '/gallery?tab=props' }}
                    className={`group relative rounded-xl md:rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl border border-border/30 hover:border-primary/50 transition-all duration-500 animate-fade-in ${
                      propsLayout === 'masonry' && index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    {/* Image Container */}
                    <div className={`overflow-hidden relative ${
                      propsLayout === 'masonry' && index === 0 ? 'aspect-square sm:aspect-[4/3]' : 'aspect-square'
                    }`}>
                      <img 
                        src={project.thumbnail} 
                        alt={project.title} 
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                      />
                      
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Top HUD */}
                      <div className="absolute top-2.5 md:top-4 left-2.5 md:left-4 right-2.5 md:right-4 flex items-center justify-between">
                        <span className="px-2 md:px-3 py-1 rounded-full text-[9px] md:text-xs font-mono bg-card/80 backdrop-blur-xl border border-border/50 text-primary uppercase tracking-wider">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-1 px-2 md:px-3 py-1 rounded-full bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30">
                          <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                          <span className="text-[9px] md:text-xs font-mono text-emerald-400">READY</span>
                        </div>
                      </div>

                      {/* View Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/90 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-primary/30 scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
                        </div>
                      </div>
                      
                      {/* Corner accents */}
                      <div className="absolute top-2 left-2 w-4 h-4 md:w-6 md:h-6 border-t-2 border-l-2 border-primary/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-2 right-2 w-4 h-4 md:w-6 md:h-6 border-t-2 border-r-2 border-primary/40 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-3 md:p-5">
                      <h3 className="font-display text-sm md:text-lg font-bold text-foreground mb-1.5 md:mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3 md:mb-4">
                        {project.description}
                      </p>
                      
                      {/* Stats Grid */}
                      <div className="grid grid-cols-4 gap-1 md:gap-2">
                        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-1.5 md:p-2.5 text-center border border-border/20">
                          <Triangle className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-primary mx-auto mb-0.5 md:mb-1" />
                          <span className="text-[9px] md:text-xs font-mono text-primary font-bold block">
                            {(project.specs.polyCount / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-1.5 md:p-2.5 text-center border border-border/20">
                          <Layers className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-primary mx-auto mb-0.5 md:mb-1" />
                          <span className="text-[9px] md:text-xs font-mono text-primary font-bold block">
                            {project.specs.materialSlots}
                          </span>
                        </div>
                        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-1.5 md:p-2.5 text-center border border-border/20">
                          <Palette className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-primary mx-auto mb-0.5 md:mb-1" />
                          <span className="text-[9px] md:text-xs font-mono text-primary font-bold block">
                            {project.specs.textureResolution}
                          </span>
                        </div>
                        <div className="bg-secondary/30 backdrop-blur-sm rounded-lg p-1.5 md:p-2.5 text-center border border-border/20">
                          <Grid3X3 className="w-2.5 h-2.5 md:w-3.5 md:h-3.5 text-primary mx-auto mb-0.5 md:mb-1" />
                          <span className="text-[9px] md:text-xs font-mono text-primary font-bold block">
                            {(project.specs.vertexCount / 1000).toFixed(0)}K
                          </span>
                        </div>
                      </div>
                      
                      {/* Software Tags */}
                      <div className="flex flex-wrap gap-1 mt-2.5 md:mt-3 pt-2.5 md:pt-3 border-t border-border/20">
                        {project.software.slice(0, 3).map((sw) => (
                          <span 
                            key={sw} 
                            className="text-[8px] md:text-[10px] font-mono text-muted-foreground bg-muted/50 px-1.5 md:px-2 py-0.5 rounded"
                          >
                            {sw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* ProductViz Tab */}
          {activeTab === 'productviz' && (
            <div className="animate-fade-in">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                    <Package className="w-5 h-5 md:w-6 md:h-6 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="font-display text-base md:text-xl font-bold text-foreground">Product Visualization</h2>
                    <p className="text-xs md:text-sm text-muted-foreground">{productVizProjects.length} campaigns</p>
                  </div>
                </div>
              </div>

              {/* Featured Product */}
              {productVizProjects[0] && (
                <Link to={`/productviz/${productVizProjects[0].id}`} state={{ from: '/gallery?tab=productviz' }} className="group mb-6 md:mb-8 relative rounded-xl md:rounded-3xl overflow-hidden">
                  <div className="aspect-[16/10] md:aspect-[21/9] cursor-pointer">
                    <img 
                      src={productVizProjects[0].thumbnail}
                      alt={productVizProjects[0].title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
                  
                  {/* Warm glow */}
                  <div className="absolute -bottom-20 -left-20 w-60 md:w-80 h-60 md:h-80 bg-amber-500/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-4">
                      <span className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                        {productVizProjects[0].specs.industry}
                      </span>
                      <span className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-mono bg-background/50 backdrop-blur-xl border border-border/30 text-muted-foreground">
                        {productVizProjects[0].specs.year}
                      </span>
                    </div>
                    
                    <h3 className="font-display text-xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 md:mb-3 group-hover:text-amber-400 transition-colors duration-500">
                      {productVizProjects[0].title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-sm text-muted-foreground mb-2 md:mb-4">
                      <span className="flex items-center gap-1 md:gap-1.5">
                        <Briefcase className="w-3 h-3 md:w-4 md:h-4 text-amber-400" />
                        {productVizProjects[0].specs.client}
                      </span>
                      <span className="hidden md:inline w-1 h-1 rounded-full bg-muted-foreground/30" />
                      <span className="hidden md:block">{productVizProjects[0].specs.deliverables}</span>
                    </div>
                    
                    {/* Highlights */}
                    {productVizProjects[0].highlights && (
                      <div className="hidden md:flex flex-wrap gap-2 mt-4">
                        {productVizProjects[0].highlights.map((highlight) => (
                          <span key={highlight} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-card/50 backdrop-blur-xl border border-border/30">
                            <Star className="w-3 h-3 text-amber-400" />
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-3 md:top-6 left-3 md:left-6 w-6 md:w-12 h-6 md:h-12 border-t-2 border-l-2 border-amber-500/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 md:top-6 right-3 md:right-6 w-6 md:w-12 h-6 md:h-12 border-t-2 border-r-2 border-amber-500/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </Link>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {productVizProjects.slice(1).map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/productviz/${project.id}`}
                    state={{ from: '/gallery?tab=productviz' }}
                    className="group relative rounded-xl md:rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl border border-border/30 hover:border-amber-500/30 transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Category */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* View button */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openVideoModal(video); }}>
                        <Play className="w-4 h-4 text-primary-foreground" />
                      </div>
                    </div>
                    </div>
                    
                    <div className="p-3 md:p-5">
                      <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground mb-1.5 md:mb-2">
                        <Briefcase className="w-3 h-3 text-amber-400" />
                        <span>{project.specs.client}</span>
                      </div>
                      <h3 className="font-display text-sm md:text-lg font-bold text-foreground group-hover:text-amber-400 transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground mt-1 line-clamp-2 hidden md:block">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3 text-[10px] md:text-xs text-muted-foreground">
                        <span>{project.specs.duration}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{project.specs.deliverables}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Archviz Tab */}
          {activeTab === 'archviz' && (
            <div className="animate-fade-in">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 md:w-6 md:h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display text-base md:text-xl font-bold text-foreground">Architectural Visualization</h2>
                    <p className="text-xs md:text-sm text-muted-foreground">{archvizProjects.length} projects</p>
                  </div>
                </div>
              </div>

              {/* Featured Project */}
              {archvizProjects[0] && (
                <Link 
                  to={`/archviz/${archvizProjects[0].id}`} state={{ from: '/gallery?tab=archviz' }}
                  className="group block mb-5 md:mb-8"
                >
                  <div className="relative rounded-xl md:rounded-3xl overflow-hidden">
                    <div className="aspect-[16/10] md:aspect-[21/9]">
                      <img 
                        src={archvizProjects[0].thumbnail}
                        alt={archvizProjects[0].title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
                    
                    {/* Accent glow */}
                    <div className="absolute -bottom-20 -left-20 w-60 md:w-80 h-60 md:h-80 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-4">
                        <span className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-xl ${
                          archvizProjects[0].specs.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {archvizProjects[0].specs.status}
                        </span>
                        <span className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-mono bg-background/50 backdrop-blur-xl border border-border/30 text-muted-foreground">
                          {archvizProjects[0].specs.year}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-xl md:text-4xl lg:text-5xl font-bold text-foreground mb-1 md:mb-3 group-hover:text-accent transition-colors duration-500">
                        {archvizProjects[0].title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-2 md:gap-4 text-[10px] md:text-sm text-muted-foreground">
                        <span className="flex items-center gap-1 md:gap-1.5">
                          <MapPin className="w-3 h-3 md:w-4 md:h-4 text-accent" />
                          {archvizProjects[0].specs.location}
                        </span>
                        <span className="hidden md:inline w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span className="hidden md:flex items-center gap-1.5">
                          <Maximize className="w-4 h-4 text-accent" />
                          {archvizProjects[0].specs.area}
                        </span>
                      </div>
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-3 md:top-6 left-3 md:left-6 w-6 md:w-12 h-6 md:h-12 border-t-2 border-l-2 border-accent/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-3 md:top-6 right-3 md:right-6 w-6 md:w-12 h-6 md:h-12 border-t-2 border-r-2 border-accent/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {archvizProjects.slice(1).map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/archviz/${project.id}`} state={{ from: '/gallery?tab=archviz' }}
                    className="group relative rounded-xl md:rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl border border-border/30 hover:border-accent/30 transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img 
                        src={project.thumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Status */}
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium backdrop-blur-xl ${
                          project.specs.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {project.specs.status}
                        </span>
                      </div>
                      
                      {/* View button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-accent/90 backdrop-blur-xl flex items-center justify-center shadow-xl">
                          <Eye className="w-5 h-5 md:w-6 md:h-6 text-accent-foreground" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 md:p-5">
                      <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground mb-1.5 md:mb-2">
                        <MapPin className="w-3 h-3 text-accent" />
                        <span>{project.specs.location}</span>
                      </div>
                      <h3 className="font-display text-sm md:text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2 text-[10px] md:text-xs text-muted-foreground">
                        <span>{project.specs.area}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span>{project.specs.type}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

           {/* Showreel Tab - Instagram Reels Style */}
          {activeTab === 'showreel' && (
            <div className="animate-fade-in">
              {/* Reels Container */}
              <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
                {/* Main Reels Feed - Mobile optimized vertical scroll */}
                <div className="flex-1 flex flex-col items-center">
                  <div className="w-full max-w-[400px] space-y-4 md:space-y-6">
                    {showreelVideos.map((video, index) => (
                      <div
                        key={video.id}
                        className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-card/80 backdrop-blur-xl border border-border/30 hover:border-primary/50 transition-all duration-500 animate-fade-in"
                        style={{ animationDelay: `${index * 0.15}s` }}
                      >
                        {/* Video Container - 9:16 aspect ratio like Reels */}
                        <div className="relative aspect-[9/16] overflow-hidden bg-gradient-to-b from-card to-background">
                          <img 
                            src={video.poster || ''}
                            alt={video.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          
                          {/* Gradient overlays */}
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-transparent" />
                          
                          {/* Top Bar - Category & Duration */}
                          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                                <Film className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
                              </div>
                              <div>
                                <p className="text-xs md:text-sm font-semibold text-foreground">Captionstudioz</p>
                                <p className="text-[10px] md:text-xs text-muted-foreground">@utibe_ebong</p>
                              </div>
                            </div>
                            <span className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium bg-card/80 backdrop-blur-xl border border-border/50">
                              {video.category}
                            </span>
                          </div>
                          
                          {/* Center Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                              <div className="relative cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openVideoModal(video); }}>
                              <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: '2s' }} />
                              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary/90 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-primary/40 group-hover:scale-110 group-hover:bg-primary transition-all duration-300">
                                <Play className="w-7 h-7 md:w-9 md:h-9 text-primary-foreground ml-1 fill-current" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Right Side Actions - Like Instagram Reels */}
                          <div className="absolute right-3 md:right-4 bottom-32 md:bottom-40 flex flex-col items-center gap-5 md:gap-6">
                            <button className="flex flex-col items-center gap-1 group/action">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/60 backdrop-blur-xl border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                              </div>
                              <span className="text-[10px] md:text-xs font-medium text-foreground"></span>
                            </button>
                            
                            <button className="flex flex-col items-center gap-1 group/action">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/60 backdrop-blur-xl border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                              </div>
                              <span className="text-[10px] md:text-xs font-medium text-foreground"></span>
                            </button>
                            
                            <button className="flex flex-col items-center gap-1 group/action">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/60 backdrop-blur-xl border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                              </div>
                              <span className="text-[10px] md:text-xs font-medium text-foreground">Share</span>
                            </button>
                            
                            <button className="flex flex-col items-center gap-1 group/action">
                              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-card/60 backdrop-blur-xl border border-border/30 flex items-center justify-center hover:bg-primary/20 hover:border-primary/50 transition-all duration-300">
                                <svg className="w-5 h-5 md:w-6 md:h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                                </svg>
                              </div>
                              <span className="text-[10px] md:text-xs font-medium text-foreground">Save</span>
                            </button>
                          </div>
                          
                          {/* Bottom Content */}
                          <div className="absolute bottom-4 md:bottom-6 left-4 right-16 md:right-20">
                            <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2">
                              {video.title}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground line-clamp-2 mb-3">
                              {video.description}
                            </p>
                            
                            {/* Duration & Views */}
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/60 backdrop-blur-xl border border-border/30">
                                <Clock className="w-3 h-3 text-primary" />
                                <span className="text-[10px] md:text-xs font-mono text-foreground">{video.duration}</span>
                              </div>
                              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card/60 backdrop-blur-xl border border-border/30">
                                <Eye className="w-3 h-3 text-primary" />
                                <span className="text-[10px] md:text-xs font-mono text-foreground">102K</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Progress Bar */}
                          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted/30">
                            <div className="h-full bg-gradient-to-r from-primary to-accent w-1/3 rounded-full" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Sidebar - Desktop only */}
                <div className="hidden lg:block w-80 space-y-6">
                  {/* More Videos Section */}
                  <div className="p-5 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30">
                    <h3 className="font-display text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                      <Film className="w-5 h-5 text-primary" />
                      More Content
                    </h3>
                    <div className="space-y-3">
                      {showreelVideos.map((video) => (
                        <div key={video.id} className="group flex items-center gap-3 p-2 rounded-xl hover:bg-muted/30 transition-colors cursor-pointer" onClick={(e) => { e.preventDefault(); e.stopPropagation(); openVideoModal(video); }}>
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={video.poster || ''}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                              <Play className="w-5 h-5 text-foreground fill-current" />
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">{video.title}</p>
                            <p className="text-xs text-muted-foreground">{video.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Platforms CTA */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                    <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                      <Play className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground mb-2">Watch More</h3>
                    <p className="text-sm text-muted-foreground mb-4">Full videos available on my video platforms</p>
                    <div className="flex flex-col gap-2">
                      <Button asChild variant="outline" size="sm" className="w-full justify-center gap-2 rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4" /> YouTube
                        </a>
                      </Button>
                      <Button asChild variant="outline" size="sm" className="w-full justify-center gap-2 rounded-xl border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground">
                        <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">
                          <Play className="w-4 h-4" /> Vimeo
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile CTA - Only visible on mobile */}
              <div className="lg:hidden mt-8 text-center">
                <div className="inline-flex flex-col items-center p-5 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30">
                  <p className="text-sm text-muted-foreground mb-4">More on my video platforms</p>
                  <div className="flex gap-3">
                    <Button asChild variant="outline" size="sm" className="rounded-full gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground">
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4" /> YouTube
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="rounded-full gap-2 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground">
                      <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4" /> Vimeo
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}