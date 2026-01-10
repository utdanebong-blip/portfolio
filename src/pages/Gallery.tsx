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

const showreelVideos = [
  {
    id: '1',
    title: 'Demo Reel 2026',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
    duration: '2:45',
    description: 'A comprehensive showcase of my latest 3D work and animations',
    category: 'Full Reel'
  },
  {
    id: '2',
    title: 'Environment Showcase',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    duration: '3:12',
    description: 'Cinematic environment breakdowns and lighting studies',
    category: 'Environment'
  },
  {
    id: '3',
    title: 'Prop Modeling Breakdown',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    duration: '4:30',
    description: 'Step-by-step breakdown of prop creation workflow',
    category: 'Tutorial'
  }
];

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

  // Respect `?tab=` query param so returning from detail pages restores the tab
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab') as TabType | null;
    if (tab && ['props', 'productviz', 'archviz', 'showreel'].includes(tab)) {
      setActiveTab(tab as TabType);
    }
  }, [location.search]);

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
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-amber-500/90 backdrop-blur-xl flex items-center justify-center shadow-xl">
                          <Eye className="w-5 h-5 md:w-6 md:h-6 text-white" />
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

          {/* Showreel Tab */}
          {activeTab === 'showreel' && (
            <div className="animate-fade-in">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 mb-6 md:mb-8 p-4 md:p-6 rounded-xl md:rounded-2xl bg-card/30 backdrop-blur-xl border border-border/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Film className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="font-display text-base md:text-xl font-bold text-foreground">Showreels & Breakdowns</h2>
                    <p className="text-xs md:text-sm text-muted-foreground">{showreelVideos.length} videos</p>
                  </div>
                </div>
              </div>

              {/* Featured Video */}
              <div className="mb-5 md:mb-10">
                <div className="group relative rounded-xl md:rounded-3xl overflow-hidden cursor-pointer">
                  <div className="aspect-video md:aspect-[21/9]">
                    <img 
                      src={showreelVideos[0].thumbnail}
                      alt={showreelVideos[0].title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-background/10 transition-colors duration-500" />
                  
                  {/* Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
                      <div className="absolute -inset-3 md:-inset-6 rounded-full border border-primary/20 animate-pulse" style={{ animationDuration: '3s' }} />
                      <div className="relative w-14 h-14 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-2xl shadow-primary/30 group-hover:scale-110 transition-transform duration-500">
                        <Play className="w-6 h-6 md:w-10 md:h-10 text-primary-foreground ml-0.5 md:ml-1 fill-current" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-10">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-2 md:mb-4">
                      <span className="px-2.5 md:px-4 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-semibold bg-primary text-primary-foreground">
                        Featured
                      </span>
                      <span className="flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-[10px] md:text-xs font-mono bg-background/60 backdrop-blur-xl border border-border/30">
                        <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {showreelVideos[0].duration}
                      </span>
                    </div>
                    <h2 className="font-display text-lg md:text-3xl lg:text-4xl font-bold text-foreground mb-1 md:mb-2">
                      {showreelVideos[0].title}
                    </h2>
                    <p className="font-body text-xs md:text-base text-muted-foreground max-w-2xl hidden md:block">
                      {showreelVideos[0].description}
                    </p>
                  </div>
                  
                  {/* Corner decorations */}
                  <div className="absolute top-3 md:top-6 left-3 md:left-6 w-5 md:w-10 h-5 md:h-10 border-t-2 border-l-2 border-primary/40 rounded-tl-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 md:top-6 right-3 md:right-6 w-5 md:w-10 h-5 md:h-10 border-t-2 border-r-2 border-primary/40 rounded-tr-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Video Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {showreelVideos.slice(1).map((video, index) => (
                  <div
                    key={video.id}
                    className="group relative rounded-xl md:rounded-2xl overflow-hidden bg-card/50 backdrop-blur-xl border border-border/30 hover:border-primary/30 transition-all duration-500 cursor-pointer animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-video overflow-hidden relative">
                      <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                      <div className="absolute inset-0 bg-background/30 group-hover:bg-background/10 transition-colors duration-300" />
                      
                      {/* Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-primary/90 backdrop-blur-xl flex items-center justify-center shadow-lg opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                          <Play className="w-5 h-5 md:w-6 md:h-6 text-primary-foreground ml-0.5 fill-current" />
                        </div>
                      </div>
                      
                      {/* Duration & Category */}
                      <div className="absolute top-2.5 md:top-3 left-2.5 md:left-3 right-2.5 md:right-3 flex items-center justify-between">
                        <span className="px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-medium bg-card/80 backdrop-blur-xl border border-border/50">
                          {video.category}
                        </span>
                        <span className="flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-[9px] md:text-xs font-mono bg-background/80 backdrop-blur-xl">
                          <Clock className="w-2.5 h-2.5 md:w-3 md:h-3" />
                          {video.duration}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-3 md:p-5">
                      <h3 className="font-display text-sm md:text-lg font-bold text-foreground mb-1 md:mb-2 group-hover:text-primary transition-colors">
                        {video.title}
                      </h3>
                      <p className="font-body text-[10px] md:text-sm text-muted-foreground line-clamp-2">
                        {video.description}
                      </p>
                      
                      <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-border/20 flex items-center justify-between">
                        <span className="text-[10px] md:text-xs font-mono text-muted-foreground uppercase tracking-wider">Watch Now</span>
                        <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8 md:mt-12 text-center">
                <div className="inline-flex flex-col items-center p-5 md:p-8 rounded-xl md:rounded-3xl bg-card/30 backdrop-blur-xl border border-border/30">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-primary/10 flex items-center justify-center mb-3 md:mb-4">
                    <Film className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                  </div>
                  <p className="text-xs md:text-base text-muted-foreground mb-3 md:mb-4">More content on my video platforms</p>
                  <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                    <Button asChild variant="outline" size="sm" className="rounded-full gap-1.5 md:gap-2 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground text-xs md:text-sm">
                      <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                        <Play className="w-3.5 h-3.5 md:w-4 md:h-4" /> YouTube
                      </a>
                    </Button>
                    <Button asChild variant="outline" size="sm" className="rounded-full gap-1.5 md:gap-2 border-accent/30 text-accent hover:bg-accent hover:text-accent-foreground text-xs md:text-sm">
                      <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer">
                        <Play className="w-3.5 h-3.5 md:w-4 md:h-4" /> Vimeo
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