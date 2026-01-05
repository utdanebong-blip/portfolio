import { Link, useLocation } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { projects, showreel, archvizProjects } from '@/hooks/usePortfolioData';
import { Box, Play, Film, MapPin, Maximize, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState, useRef } from 'react';

export const hashLink = (path: string) => `#${path}`;


const defaultShowreel = [
  {
    id: '1',
    title: 'Character Animation Reel 2024',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60',
    duration: '2:45',
    description: 'A compilation of character animations and rigging work',
  },
  {
    id: '2',
    title: 'Environment Showcase',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=60',
    duration: '3:12',
    description: 'Cinematic environment breakdowns and lighting studies',
  },
  {
    id: '3',
    title: 'Prop Modeling Breakdown',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60',
    duration: '4:30',
    description: 'Step-by-step breakdown of prop creation workflow',
  },
];

const showreelVideos = (showreel && showreel.length > 0)
  ? (showreel as any[]).map((s) => ({
      id: s.id || s.title || Math.random().toString(36).slice(2, 9),
      title: s.title || 'Showreel',
      thumbnail: s.poster || '',
      duration: s.duration || '',
      description: s.description || '',
      videoUrl: s.videoUrl || '',
    }))
  : defaultShowreel;

export default function Gallery() {
  const location = useLocation();
  const [tab, setTab] = useState(() => {
    // prefer query param `tab`, fall back to hash
    try {
      const params = new URLSearchParams(location.search);
      return params.get('tab') || (location.hash ? location.hash.replace('#', '') : 'projects');
    } catch (e) {
      return location.hash ? location.hash.replace('#', '') : 'projects';
    }
  });

  useEffect(() => {
    // update tab when location changes (search or hash)
    try {
      const params = new URLSearchParams(location.search);
      const t = params.get('tab') || (location.hash ? location.hash.replace('#', '') : 'projects');
      if (t && t !== tab) setTab(t);
    } catch (e) {
      const h = location.hash ? location.hash.replace('#', '') : '';
      if (h && h !== tab) setTab(h);
    }
  }, [location.search, location.hash]);

  // keep URL in sync when tab changes (use hash-router friendly query param)
  useEffect(() => {
    if (!tab) return;
    try {
      const base = window.location.pathname || '/';
      const newHash = `#/gallery?tab=${encodeURIComponent(tab)}`;
      window.history.replaceState(null, '', newHash);
    } catch (e) {
      window.location.hash = `gallery?tab=${tab}`;
    }
  }, [tab]);
  // `projects` is imported directly from demo data (read-only)
  const [viewer, setViewer] = useState<{ url: string; title?: string } | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setViewer(null);
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Viewer transform state
  const imgRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const lastPan = useRef<{ x: number; y: number } | null>(null);
  const lastTouchDist = useRef<number | null>(null);

  useEffect(() => {
    // reset transforms when opening a new viewer
    setScale(1);
    setTranslate({ x: 0, y: 0 });
    lastPan.current = null;
    lastTouchDist.current = null;
  }, [viewer]);

  function clamp(v: number, a = 0.5, b = 4) {
    return Math.max(a, Math.min(b, v));
  }

  const onWheel = (e: any) => {
    e.preventDefault();
    const delta = -e.deltaY;
    const factor = delta > 0 ? 1.1 : 1 / 1.1;
    setScale((s) => clamp(s * factor));
  };

  const onDoubleClick = () => {
    setScale((s) => (s > 1 ? 1 : 2));
    setTranslate({ x: 0, y: 0 });
  };

  const onMouseDown = (e: any) => {
    e.preventDefault();
    setIsPanning(true);
    lastPan.current = { x: e.clientX, y: e.clientY };
  };

  const onMouseMove = (e: any) => {
    if (!isPanning || !lastPan.current) return;
    const dx = e.clientX - lastPan.current.x;
    const dy = e.clientY - lastPan.current.y;
    lastPan.current = { x: e.clientX, y: e.clientY };
    setTranslate((t) => ({ x: t.x + dx, y: t.y + dy }));
  };

  const onMouseUp = () => {
    setIsPanning(false);
    lastPan.current = null;
  };

  const onTouchStart = (e: any) => {
    if (e.touches.length === 2) {
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      lastTouchDist.current = dist;
    } else if (e.touches.length === 1) {
      const t = e.touches[0];
      lastPan.current = { x: t.clientX, y: t.clientY };
    }
  };

  const onTouchMove = (e: any) => {
    if (e.touches.length === 2 && lastTouchDist.current) {
      const [a, b] = [e.touches[0], e.touches[1]];
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const factor = dist / lastTouchDist.current;
      setScale((s) => clamp(s * factor));
      lastTouchDist.current = dist;
    } else if (e.touches.length === 1 && lastPan.current) {
      const t = e.touches[0];
      const dx = t.clientX - lastPan.current.x;
      const dy = t.clientY - lastPan.current.y;
      lastPan.current = { x: t.clientX, y: t.clientY };
      setTranslate((t0) => ({ x: t0.x + dx, y: t0.y + dy }));
    }
  };

  const onTouchEnd = (e: any) => {
    if (e.touches.length < 2) lastTouchDist.current = null;
    if (e.touches.length === 0) lastPan.current = null;
  };

  const zoomIn = () => setScale((s) => clamp(s * 1.25));
  const zoomOut = () => setScale((s) => clamp(s / 1.25));
  const fit = () => {
    setScale(1);
    setTranslate({ x: 0, y: 0 });
  };

  return (
    <Layout>
      <div className="relative overflow-hidden py-20 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 text-primary font-mono text-sm mb-4 bg-primary/10 px-4 py-2 rounded-full">
              <Box size={16} /> All Projects
            </span>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <TypewriterGallery />
              <span className="block text-primary">Gallery</span>
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
              A collection of 3D props, Archviz projects, and showreels
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
          <Tabs value={tab} onValueChange={(v) => setTab(v)} className="w-full">
          <TabsList className="mb-8 bg-card border border-border">
            <TabsTrigger value="projects" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Box size={16} /> Projects
            </TabsTrigger>
            <TabsTrigger value="archviz" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Box size={16} /> Archviz
            </TabsTrigger>
            <TabsTrigger value="showreel" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Film size={16} /> Showreel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/gallery/${project.id}`}
                  className="group relative rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500"
                >
                  {/* Top HUD bar */}
                  <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2.5 bg-gradient-to-b from-background/95 to-transparent">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                      <span className="font-mono text-[10px] text-primary uppercase tracking-wider">{project.category}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-card/50 backdrop-blur-sm rounded px-2 py-0.5">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span className="font-mono text-[10px] text-green-400">GAME READY</span>
                    </div>
                  </div>
                  
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                    
                    {/* Scan line effect */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent animate-pulse" />
                    </div>
                    
                    {/* Corner brackets */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Bottom info panel - Game UI style */}
                  <div className="p-4 bg-card border-t border-border/50">
                    <h3 className="font-display text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-body text-xs text-muted-foreground line-clamp-2 mb-4">{project.description}</p>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-4 gap-2 font-mono text-[10px]">
                      <div className="bg-secondary/50 border border-border/30 rounded px-2 py-2 text-center">
                        <span className="text-muted-foreground block mb-0.5">POLYS</span>
                        <span className="text-primary font-bold text-sm">{(project.specs.polyCount / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="bg-secondary/50 border border-border/30 rounded px-2 py-2 text-center">
                        <span className="text-muted-foreground block mb-0.5">VERTS</span>
                        <span className="text-primary font-bold text-sm">{(project.specs.vertexCount / 1000).toFixed(1)}K</span>
                      </div>
                      <div className="bg-secondary/50 border border-border/30 rounded px-2 py-2 text-center">
                        <span className="text-muted-foreground block mb-0.5">TEX</span>
                        <span className="text-primary font-bold text-sm">{project.specs.textureResolution}</span>
                      </div>
                      <div className="bg-secondary/50 border border-border/30 rounded px-2 py-2 text-center">
                        <span className="text-muted-foreground block mb-0.5">MATS</span>
                        <span className="text-primary font-bold text-sm">{project.specs.materialSlots}</span>
                      </div>
                    </div>
                    
                    {/* Software tags */}
                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/30">
                      {project.software.slice(0, 3).map((sw) => (
                        <span key={sw} className="text-[9px] font-mono text-muted-foreground bg-background/50 px-2 py-0.5 rounded">
                          {sw}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="archviz" className="animate-fade-in">
            {/* Elegant masonry-style grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archvizProjects.map((project, index) => (
                <Link 
                  key={project.id} 
                  to={`/archviz/${project.id}`} 
                  className={`group relative overflow-hidden rounded-2xl bg-card transition-all duration-700 hover:shadow-2xl hover:shadow-accent/10 animate-fade-in ${
                    index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`overflow-hidden relative ${index === 0 ? 'aspect-[16/12]' : 'aspect-[4/3]'}`}>
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" 
                    />
                    
                    {/* Elegant gradient overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    {/* Subtle border glow on hover */}
                    <div className="absolute inset-0 border border-accent/0 group-hover:border-accent/20 rounded-2xl transition-all duration-500" />
                  </div>
                  
                  {/* Status Badge - Refined */}
                  <div className="absolute top-5 left-5">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md transition-all duration-300 ${
                      (project.specs as any).status === 'Completed' 
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                        : (project.specs as any).status === 'In Development'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : 'bg-accent/10 text-accent border border-accent/20'
                    }`}>
                      {(project.specs as any).status}
                    </span>
                  </div>
                  
                  {/* Year Badge */}
                  <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <span className="px-3 py-1.5 rounded-full text-xs font-mono text-foreground/70 backdrop-blur-md bg-background/30 border border-border/20">
                      {(project.specs as any).year}
                    </span>
                  </div>
                  
                  {/* Content Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {/* Location with icon */}
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/80 mb-3">
                      <MapPin size={12} className="text-accent" />
                      <span className="font-light tracking-wide">{(project.specs as any).location}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className={`font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors duration-500 ${
                      index === 0 ? 'text-3xl' : 'text-xl'
                    }`}>
                      {project.title}
                    </h3>
                    
                    {/* Description - only on larger cards */}
                    {index === 0 && (
                      <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-4 opacity-80">
                        {project.description}
                      </p>
                    )}
                    
                    {/* Specs row */}
                    <div className="flex items-center gap-4 text-xs font-light">
                      <span className="text-foreground/60 flex items-center gap-1.5">
                        <Maximize size={11} className="text-accent/70" />
                        {(project.specs as any).area}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-foreground/60">{(project.specs as any).type}</span>
                      <span className="w-1 h-1 rounded-full bg-border" />
                      <span className="text-foreground/60">{(project.specs as any).style}</span>
                    </div>
                    
                    {/* View button - appears on hover */}
                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <span className="inline-flex items-center gap-2 text-sm text-accent font-medium">
                        View Project
                        <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="showreel" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {showreelVideos.map((video) => (
                <div
                  key={video.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => video.videoUrl && window.open(video.videoUrl, '_blank', 'noopener')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      video.videoUrl && window.open(video.videoUrl, '_blank', 'noopener');
                    }
                  }}
                  className="group rounded-lg overflow-hidden border border-border bg-card hover-glow cursor-pointer"
                >
                  <div className="aspect-video overflow-hidden relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Play size={28} className="text-primary-foreground ml-1" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 bg-background/80 text-foreground text-xs font-mono px-2 py-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{video.title}</h3>
                    <p className="font-body text-sm text-muted-foreground line-clamp-2">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        {viewer && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="fixed inset-0 bg-black/70"
              onClick={() => setViewer(null)}
            />
            <div
              className="relative max-w-[calc(100vw-40px)] max-h-[calc(100vh-40px)] w-full mx-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-2 right-2 z-30 flex gap-2">
                <button
                  aria-label="Zoom out"
                  onClick={zoomOut}
                  className="bg-background/90 text-foreground rounded-full p-2 shadow"
                >
                  −
                </button>
                <button
                  aria-label="Fit"
                  onClick={fit}
                  className="bg-background/90 text-foreground rounded-full p-2 shadow"
                >
                  ⤢
                </button>
                <button
                  aria-label="Zoom in"
                  onClick={zoomIn}
                  className="bg-background/90 text-foreground rounded-full p-2 shadow"
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={() => setViewer(null)}
                  aria-label="Close viewer"
                  className="bg-background/90 text-foreground rounded-full p-2 shadow"
                >
                  ×
                </button>
              </div>

              <div
                ref={containerRef}
                onWheel={onWheel}
                onDoubleClick={onDoubleClick}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseUp}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                className="w-full h-full flex items-center justify-center"
              >
                <img
                  ref={imgRef}
                  src={viewer.url}
                  alt={viewer.title}
                  className="max-w-full max-h-[80vh] object-contain rounded shadow-lg touch-none"
                  style={{
                    transform: `translate(${translate.x}px, ${translate.y}px) scale(${scale})`,
                    transition: isPanning ? 'none' : 'transform 120ms ease-out',
                    cursor: isPanning ? 'grabbing' : 'grab',
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function TypewriterGallery() {
  const words = ['Projects', 'Props', 'Archviz', 'Showreels'];
  return <Typewriter words={words} loop={true} pause={1400} />;
}

function Typewriter({ words, loop = true, pause = 1200, typeSpeed = 80, deleteSpeed = 40 }: { words: string[]; loop?: boolean; pause?: number; typeSpeed?: number; deleteSpeed?: number }) {
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState('');
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    let timer: number | undefined;
    const word = words[index % words.length];

    if (typing) {
      if (display.length < word.length) {
        timer = window.setTimeout(() => setDisplay(word.slice(0, display.length + 1)), typeSpeed);
      } else {
        timer = window.setTimeout(() => setTyping(false), pause);
      }
    } else {
      if (display.length > 0) {
        timer = window.setTimeout(() => setDisplay(display.slice(0, display.length - 1)), deleteSpeed);
      } else {
        setTyping(true);
        setIndex((i) => i + 1);
      }
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [display, typing, index, words, pause, typeSpeed, deleteSpeed]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b), '');
  return (
    <span className="block text-center mb-2">
      <span className="relative inline-block mx-auto">
        {/* invisible widest word reserves the width and centers itself */}
        <span className="invisible block font-display font-bold leading-tight">{longest}</span>

        {/* overlay the visible typed text centered over the reserved width */}
        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display font-bold leading-tight">{display}</span>
          <span className="inline-block w-1 h-7 bg-primary ml-3 animate-blink" />
        </span>
      </span>
      <style>{`.animate-blink{animation:blink 1s steps(2,end) infinite}@keyframes blink{50%{opacity:0}}`}</style>
    </span>
  );
}
