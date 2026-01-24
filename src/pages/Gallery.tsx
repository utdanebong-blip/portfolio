import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Layout } from '@/components/layout';
import { useProjects, useArchvizProjects, useProductVizProjects } from '@/hooks/usePortfolioData';
import { ProjectTimeline } from '@/components/gallery/ProjectTimeline';
import { 
  Box, 
  Play, 
  Film, 
  MapPin, 
  Maximize, 
  Building2,
  Sparkles,
  Eye,
  Layers,
  Palette,
  Triangle,
  Grid3X3,
  LayoutGrid,
  Package,
  Briefcase,
  Star,
  Calendar,
  ArrowUpRight,
  Zap,
  Target,
  Heart,
  Share2,
  MessageCircle,
  Bookmark,
  Volume2,
  VolumeX,
  ChevronDown
} from 'lucide-react';

const showreelVideos = [
  {
    id: '1',
    title: 'Demo Reel 2026',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
    duration: '2:45',
    description: 'A comprehensive showcase of my latest 3D work and animations',
    category: 'Full Reel',
    views: '12.4K'
  },
  {
    id: '2',
    title: 'Environment Showcase',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    duration: '3:12',
    description: 'Cinematic environment breakdowns and lighting studies',
    category: 'Environment',
    views: '8.2K'
  },
  {
    id: '3',
    title: 'Prop Modeling Breakdown',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    duration: '4:30',
    description: 'Step-by-step breakdown of prop creation workflow',
    category: 'Tutorial',
    views: '15.7K'
  }
];

type TabType = 'props' | 'productviz' | 'archviz' | 'showreel';

export default function Gallery() {
  const [activeTab, setActiveTab] = useState<TabType>('props');
  const [propsLayout, setPropsLayout] = useState<'grid' | 'masonry'>('grid');
  const [showTimeline, setShowTimeline] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const { projects } = useProjects();
  const { projects: archvizProjects } = useArchvizProjects();
  const { projects: productVizProjects } = useProductVizProjects();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
      return () => hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const tabs = [
    { id: 'props' as TabType, label: 'Game Props', icon: Box, count: projects.length, color: 'primary' },
    { id: 'productviz' as TabType, label: 'Product Viz', icon: Package, count: productVizProjects.length, color: 'amber' },
    { id: 'archviz' as TabType, label: 'Arch Viz', icon: Building2, count: archvizProjects.length, color: 'accent' },
    { id: 'showreel' as TabType, label: 'Showreel', icon: Film, count: showreelVideos.length, color: 'rose' }
  ];

  const getActiveColor = () => {
    const tab = tabs.find(t => t.id === activeTab);
    return tab?.color || 'primary';
  };

  return (
    <Layout>
      {/* Immersive Hero Section */}
      <section 
        ref={heroRef}
        className="relative min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden"
      >
        {/* Interactive Mouse Glow */}
        <div 
          className="pointer-events-none absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[100px] transition-all duration-300 ease-out"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)`,
            left: mousePosition.x - 250,
            top: mousePosition.y - 250,
          }}
        />

        {/* Animated Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background" />
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/5 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/5 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
                             linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }} />
          
          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--foreground) / 0.03) 2px, hsl(var(--foreground) / 0.03) 4px)',
          }} />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-10 md:left-32 w-16 h-16 md:w-24 md:h-24 border border-primary/20 rounded-2xl rotate-12 animate-float opacity-30" />
        <div className="absolute top-32 right-10 md:right-24 w-12 h-12 md:w-16 md:h-16 border border-accent/20 rounded-xl -rotate-12 animate-float opacity-30" style={{ animationDelay: '-2s' }} />
        <div className="absolute bottom-32 left-20 w-8 h-8 md:w-12 md:h-12 bg-primary/10 rounded-lg rotate-45 animate-float" style={{ animationDelay: '-4s' }} />
        <div className="absolute bottom-20 right-32 w-20 h-20 border border-primary/10 rounded-full animate-float opacity-20" style={{ animationDelay: '-1s' }} />

        <div className="container mx-auto px-4 relative z-10 text-center pt-16 md:pt-0">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/40 backdrop-blur-2xl border border-border/30 mb-6 md:mb-8 animate-fade-in">
            <div className="relative">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
            </div>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.2em]">Available for Work</span>
          </div>
          
          {/* Main title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <span className="text-foreground">Creative</span>
            <br className="md:hidden" />
            <span className="relative ml-0 md:ml-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary to-accent">Portfolio</span>
              <Sparkles className="absolute -top-2 -right-6 md:-right-8 w-5 h-5 md:w-6 md:h-6 text-primary animate-pulse" />
            </span>
          </h1>
          
          <p className="font-body text-base md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 md:mb-12 animate-fade-in px-4" style={{ animationDelay: '0.2s' }}>
            Explore my collection of <span className="text-foreground font-medium">{projects.length + archvizProjects.length + productVizProjects.length}+ projects</span> spanning game assets, architectural visualizations, and product renders
          </p>

          {/* Category tabs - Glassmorphic cards */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 animate-fade-in mb-8" style={{ animationDelay: '0.3s' }}>
            {tabs.map((tab, index) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative flex flex-col items-center gap-2 p-4 md:p-6 rounded-2xl md:rounded-3xl font-medium transition-all duration-500 min-w-[100px] md:min-w-[140px] ${
                    isActive
                      ? 'bg-card/60 backdrop-blur-2xl border-2 border-primary/50 shadow-2xl shadow-primary/20 scale-105'
                      : 'bg-card/30 backdrop-blur-xl border border-border/30 hover:border-primary/30 hover:bg-card/40'
                  }`}
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  {/* Glow effect on active */}
                  {isActive && (
                    <div className="absolute inset-0 rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary/10 to-transparent" />
                  )}
                  
                  {/* Icon container */}
                  <div className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
                      : 'bg-muted/50 text-muted-foreground group-hover:bg-muted group-hover:text-foreground'
                  }`}>
                    <tab.icon className="w-5 h-5 md:w-6 md:h-6" />
                    {isActive && (
                      <div className="absolute -inset-1 rounded-xl md:rounded-2xl bg-primary/30 blur animate-pulse" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <span className={`font-display text-xs md:text-sm transition-colors ${
                    isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                  }`}>
                    {tab.label}
                  </span>
                  
                  {/* Count badge */}
                  <span className={`font-mono text-xs px-2 py-0.5 rounded-full ${
                    isActive 
                      ? 'bg-primary/20 text-primary' 
                      : 'bg-muted/50 text-muted-foreground'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scroll indicator */}
          <div className="hidden md:flex flex-col items-center gap-2 animate-bounce opacity-50">
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">Scroll to explore</span>
            <ChevronDown className="w-5 h-5 text-primary" />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="pb-16 md:pb-32 relative">
        <div className="container mx-auto px-4">
          
          {/* Props Tab */}
          {activeTab === 'props' && (
            <div className="animate-fade-in space-y-6 md:space-y-8">
              {/* Section Header - Bento style */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-2xl border border-border/30 relative overflow-hidden">
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                  
                  <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/30">
                        <Box className="w-7 h-7 md:w-8 md:h-8 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">Game-Ready Props</h2>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                          <Zap className="w-4 h-4 text-primary" />
                          {projects.length} optimized assets ready for production
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 self-end md:self-auto">
                      <button 
                        onClick={() => setShowTimeline(!showTimeline)}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium ${
                          showTimeline 
                            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' 
                            : 'bg-card/50 border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30'
                        }`}
                      >
                        <Calendar className="w-4 h-4" />
                        <span className="hidden sm:inline">Timeline</span>
                      </button>
                      <div className="h-8 w-px bg-border/30" />
                      <div className="flex items-center bg-card/50 border border-border/30 rounded-xl p-1">
                        <button 
                          onClick={() => setPropsLayout('grid')}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            propsLayout === 'grid' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <Grid3X3 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setPropsLayout('masonry')}
                          className={`p-2 rounded-lg transition-all duration-300 ${
                            propsLayout === 'masonry' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          <LayoutGrid className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 md:p-5 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30 text-center">
                    <Triangle className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="font-mono text-lg md:text-xl font-bold text-foreground">
                      {Math.round(projects.reduce((acc, p) => acc + p.specs.polyCount, 0) / 1000)}K
                    </div>
                    <div className="text-xs text-muted-foreground">Avg. Tris</div>
                  </div>
                  <div className="p-4 md:p-5 rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30 text-center">
                    <Palette className="w-5 h-5 text-primary mx-auto mb-2" />
                    <div className="font-mono text-lg md:text-xl font-bold text-foreground">4K</div>
                    <div className="text-xs text-muted-foreground">Textures</div>
                  </div>
                </div>
              </div>

              {/* Project Timeline */}
              {showTimeline && (
                <div className="animate-fade-in">
                  <ProjectTimeline projects={projects} />
                </div>
              )}

              {/* Props Grid - Enhanced cards */}
              <div className={`grid gap-4 md:gap-6 ${
                propsLayout === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {projects.map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/gallery/${project.id}`}
                    className={`group relative rounded-2xl md:rounded-3xl overflow-hidden bg-card/40 backdrop-blur-2xl border border-border/30 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10 animate-fade-in ${
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
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Top HUD */}
                      <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 flex items-center justify-between">
                        <span className="px-3 py-1.5 rounded-full text-[10px] md:text-xs font-mono bg-card/80 backdrop-blur-xl border border-border/50 text-primary uppercase tracking-wider">
                          {project.category}
                        </span>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 backdrop-blur-xl border border-emerald-500/30">
                          <div className="relative">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full" />
                            <div className="absolute inset-0 w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                          </div>
                          <span className="text-[10px] md:text-xs font-mono text-emerald-400">READY</span>
                        </div>
                      </div>

                      {/* View Button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="w-14 h-14 md:w-18 md:h-18 rounded-2xl bg-primary/90 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-primary/40 scale-75 group-hover:scale-100 transition-transform duration-300">
                          <Eye className="w-6 h-6 md:w-7 md:h-7 text-primary-foreground" />
                        </div>
                      </div>
                      
                      {/* Corner accents */}
                      <div className="absolute top-2 left-2 w-6 h-6 md:w-8 md:h-8 border-t-2 border-l-2 border-primary/40 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute top-2 right-2 w-6 h-6 md:w-8 md:h-8 border-t-2 border-r-2 border-primary/40 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-2 left-2 w-6 h-6 md:w-8 md:h-8 border-b-2 border-l-2 border-primary/40 rounded-bl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute bottom-2 right-2 w-6 h-6 md:w-8 md:h-8 border-b-2 border-r-2 border-primary/40 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 md:p-6">
                      <h3 className="font-display text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs md:text-sm text-muted-foreground line-clamp-2 mb-4">
                        {project.description}
                      </p>
                      
                      {/* Stats Grid - Horizontal pills */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                          <Triangle className="w-3 h-3 text-primary" />
                          <span className="text-[10px] md:text-xs font-mono text-primary font-bold">
                            {(project.specs.polyCount / 1000).toFixed(0)}K
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full border border-border/30">
                          <Layers className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] md:text-xs font-mono text-muted-foreground">
                            {project.specs.materialSlots} mats
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted/50 rounded-full border border-border/30">
                          <Palette className="w-3 h-3 text-muted-foreground" />
                          <span className="text-[10px] md:text-xs font-mono text-muted-foreground">
                            {project.specs.textureResolution}
                          </span>
                        </div>
                      </div>
                      
                      {/* Software Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/20">
                        {project.software.slice(0, 3).map((sw) => (
                          <span 
                            key={sw} 
                            className="text-[9px] md:text-[10px] font-mono text-muted-foreground bg-muted/30 px-2 py-1 rounded-md"
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
            <div className="animate-fade-in space-y-6 md:space-y-8">
              {/* Section Header */}
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-amber-500/10 via-card/50 to-card/30 backdrop-blur-2xl border border-amber-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl" />
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 flex items-center justify-center border border-amber-500/30">
                    <Package className="w-7 h-7 md:w-8 md:h-8 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">Product Visualization</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Target className="w-4 h-4 text-amber-400" />
                      {productVizProjects.length} commercial campaigns delivered
                    </p>
                  </div>
                </div>
              </div>

              {/* Featured Product - Cinematic */}
              {productVizProjects[0] && (
                <Link 
                  to={`/productviz/${productVizProjects[0].id}`}
                  className="group block"
                >
                  <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden">
                    <div className="aspect-[16/10] md:aspect-[21/9]">
                      <img 
                        src={productVizProjects[0].thumbnail}
                        alt={productVizProjects[0].title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent" />
                    
                    {/* Warm glow */}
                    <div className="absolute -bottom-20 -left-20 w-80 md:w-[500px] h-80 md:h-[500px] bg-amber-500/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {productVizProjects[0].specs.industry}
                        </span>
                        <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-mono bg-card/50 backdrop-blur-xl border border-border/30 text-muted-foreground">
                          {productVizProjects[0].specs.year}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-2xl md:text-5xl lg:text-6xl font-black text-foreground mb-2 md:mb-4 group-hover:text-amber-400 transition-colors duration-500">
                        {productVizProjects[0].title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm md:text-base text-muted-foreground mb-4">
                        <span className="flex items-center gap-2">
                          <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
                          {productVizProjects[0].specs.client}
                        </span>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        <span className="hidden md:block">{productVizProjects[0].specs.deliverables}</span>
                      </div>
                      
                      {/* Highlights */}
                      {productVizProjects[0].highlights && (
                        <div className="hidden md:flex flex-wrap gap-2">
                          {productVizProjects[0].highlights.map((highlight) => (
                            <span key={highlight} className="flex items-center gap-2 px-4 py-2 rounded-full text-sm bg-card/50 backdrop-blur-xl border border-border/30">
                              <Star className="w-4 h-4 text-amber-400" />
                              {highlight}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-4 md:top-8 left-4 md:left-8 w-8 md:w-16 h-8 md:h-16 border-t-2 border-l-2 border-amber-500/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 md:top-8 right-4 md:right-8 w-8 md:w-16 h-8 md:h-16 border-t-2 border-r-2 border-amber-500/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* View more indicator */}
                    <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-amber-500/90 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 shadow-xl shadow-amber-500/30">
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                  </div>
                </Link>
              )}

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {productVizProjects.slice(1).map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/productviz/${project.id}`}
                    className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-card/40 backdrop-blur-2xl border border-border/30 hover:border-amber-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10 animate-fade-in"
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
                        <span className="px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {project.category}
                        </span>
                      </div>
                      
                      {/* View button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-amber-500/90 backdrop-blur-xl flex items-center justify-center shadow-xl shadow-amber-500/30">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Briefcase className="w-4 h-4 text-amber-400" />
                        <span>{project.specs.client}</span>
                      </div>
                      <h3 className="font-display text-base md:text-lg font-bold text-foreground group-hover:text-amber-400 transition-colors line-clamp-1 mb-2">
                        {project.title}
                      </h3>
                      <p className="font-body text-xs text-muted-foreground line-clamp-2 hidden md:block mb-3">
                        {project.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{project.specs.duration}</span>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="truncate">{project.specs.deliverables}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Archviz Tab */}
          {activeTab === 'archviz' && (
            <div className="animate-fade-in space-y-6 md:space-y-8">
              {/* Section Header */}
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-accent/10 via-card/50 to-card/30 backdrop-blur-2xl border border-accent/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center border border-accent/30">
                    <Building2 className="w-7 h-7 md:w-8 md:h-8 text-accent" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">Architectural Visualization</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-accent" />
                      {archvizProjects.length} stunning architectural renders
                    </p>
                  </div>
                </div>
              </div>

              {/* Featured Project */}
              {archvizProjects[0] && (
                <Link 
                  to={`/archviz/${archvizProjects[0].id}`}
                  className="group block"
                >
                  <div className="relative rounded-2xl md:rounded-[2rem] overflow-hidden">
                    <div className="aspect-[16/10] md:aspect-[21/9]">
                      <img 
                        src={archvizProjects[0].thumbnail}
                        alt={archvizProjects[0].title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                    </div>
                    
                    {/* Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-background/70 via-transparent to-transparent" />
                    
                    {/* Accent glow */}
                    <div className="absolute -bottom-20 -left-20 w-80 md:w-[500px] h-80 md:h-[500px] bg-accent/20 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
                      <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium backdrop-blur-xl ${
                          archvizProjects[0].specs.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {archvizProjects[0].specs.status}
                        </span>
                        <span className="px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs font-mono bg-card/50 backdrop-blur-xl border border-border/30 text-muted-foreground">
                          {archvizProjects[0].specs.year}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-2xl md:text-5xl lg:text-6xl font-black text-foreground mb-2 md:mb-4 group-hover:text-accent transition-colors duration-500">
                        {archvizProjects[0].title}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-3 md:gap-6 text-sm md:text-base text-muted-foreground">
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                          {archvizProjects[0].specs.location}
                        </span>
                        <span className="hidden md:block w-1.5 h-1.5 rounded-full bg-muted-foreground/30" />
                        <span className="hidden md:flex items-center gap-2">
                          <Maximize className="w-5 h-5 text-accent" />
                          {archvizProjects[0].specs.area}
                        </span>
                      </div>
                    </div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-4 md:top-8 left-4 md:left-8 w-8 md:w-16 h-8 md:h-16 border-t-2 border-l-2 border-accent/30 rounded-tl-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 md:top-8 right-4 md:right-8 w-8 md:w-16 h-8 md:h-16 border-t-2 border-r-2 border-accent/30 rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* View more indicator */}
                    <div className="absolute bottom-6 md:bottom-12 right-6 md:right-12 w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-accent/90 backdrop-blur-xl flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-500 shadow-xl shadow-accent/30">
                      <ArrowUpRight className="w-5 h-5 md:w-6 md:h-6 text-accent-foreground" />
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {archvizProjects.slice(1).map((project, index) => (
                  <Link
                    key={project.id}
                    to={`/archviz/${project.id}`}
                    className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-card/40 backdrop-blur-2xl border border-border/30 hover:border-accent/30 transition-all duration-500 hover:shadow-2xl hover:shadow-accent/10 animate-fade-in"
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
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-xl ${
                          project.specs.status === 'Completed'
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                        }`}>
                          {project.specs.status}
                        </span>
                      </div>
                      
                      {/* View button */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-14 h-14 rounded-2xl bg-accent/90 backdrop-blur-xl flex items-center justify-center shadow-xl shadow-accent/30">
                          <Eye className="w-6 h-6 text-accent-foreground" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 md:p-6">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{project.specs.location}</span>
                      </div>
                      <h3 className="font-display text-base md:text-lg font-bold text-foreground group-hover:text-accent transition-colors line-clamp-1 mb-2">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
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

          {/* Showreel Tab - Cinematic Video Gallery */}
          {activeTab === 'showreel' && (
            <div className="animate-fade-in space-y-6 md:space-y-8">
              {/* Section Header */}
              <div className="p-6 md:p-8 rounded-2xl md:rounded-3xl bg-gradient-to-br from-rose-500/10 via-card/50 to-card/30 backdrop-blur-2xl border border-rose-500/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-60 h-60 bg-rose-500/10 rounded-full blur-3xl" />
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-rose-500/30 to-pink-500/20 flex items-center justify-center border border-rose-500/30">
                    <Film className="w-7 h-7 md:w-8 md:h-8 text-rose-400" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mb-1">Showreel Collection</h2>
                    <p className="text-sm text-muted-foreground flex items-center gap-2">
                      <Play className="w-4 h-4 text-rose-400" />
                      {showreelVideos.length} video showcases
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Grid - Cinematic cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {showreelVideos.map((video, index) => (
                  <div
                    key={video.id}
                    className="group relative rounded-2xl md:rounded-3xl overflow-hidden bg-card/40 backdrop-blur-2xl border border-border/30 hover:border-rose-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-rose-500/10 animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 0.15}s` }}
                  >
                    {/* Video Container - 16:9 aspect ratio */}
                    <div className="relative aspect-video overflow-hidden bg-gradient-to-b from-card to-background">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Gradient overlays */}
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                      <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-rose-500/90 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-rose-500/40 scale-90 group-hover:scale-100 transition-all duration-300">
                          <Play className="w-7 h-7 md:w-8 md:h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                      
                      {/* Duration badge */}
                      <div className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-xl border border-border/50">
                        <span className="font-mono text-xs text-foreground">{video.duration}</span>
                      </div>
                      
                      {/* Views */}
                      <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-xl border border-border/50">
                        <Eye className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="font-mono text-xs text-muted-foreground">{video.views}</span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-5 md:p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-[10px] md:text-xs font-medium bg-rose-500/20 text-rose-400 border border-rose-500/30">
                          {video.category}
                        </span>
                      </div>
                      
                      <h3 className="font-display text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-rose-400 transition-colors">
                        {video.title}
                      </h3>
                      
                      <p className="font-body text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                      
                      {/* Action bar */}
                      <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
                        <div className="flex items-center gap-4">
                          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-rose-400 transition-colors">
                            <Heart className="w-4 h-4" />
                            <span className="text-xs font-mono">Like</span>
                          </button>
                          <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                            <Share2 className="w-4 h-4" />
                            <span className="text-xs font-mono">Share</span>
                          </button>
                        </div>
                        <button className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* CTA */}
              <div className="text-center py-8 md:py-12">
                <p className="text-muted-foreground mb-4">Want to see more of my work?</p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a 
                    href="https://youtube.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30 hover:bg-rose-500/30 transition-all duration-300 font-medium"
                  >
                    <Play className="w-4 h-4" />
                    YouTube Channel
                  </a>
                  <a 
                    href="https://vimeo.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card/50 text-foreground border border-border/30 hover:border-primary/30 transition-all duration-300 font-medium"
                  >
                    <Film className="w-4 h-4" />
                    Vimeo Portfolio
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}