import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { projects, showreel } from '@/hooks/usePortfolioData';
import { Box, Play, Film } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState, useRef } from 'react';

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
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Project <span className="text-primary">Gallery</span>
        </h1>
        <p className="font-body text-muted-foreground mb-12">A collection of 3D props, game assets, and showreels</p>

        <Tabs defaultValue="projects" className="w-full">
          <TabsList className="mb-8 bg-card border border-border">
            <TabsTrigger value="projects" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Box size={16} /> Projects
            </TabsTrigger>
            <TabsTrigger value="showreel" className="gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Film size={16} /> Showreel
            </TabsTrigger>
          </TabsList>

          <TabsContent value="projects" className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="group rounded-lg overflow-hidden border border-border bg-card hover-glow relative">
                    <Link to={`/portfolio/gallery/${project.id}`} className="block">
                      <div className="aspect-video overflow-hidden relative">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-display text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                        <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="flex items-center gap-1 text-primary">
                            <Box size={12} /> {project.specs.polyCount.toLocaleString()} polys
                          </span>
                          <span className="text-muted-foreground">{project.specs.textureResolution}</span>
                        </div>
                      </div>
                    </Link>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const url = project.images?.rendered || project.thumbnail;
                        if (url) setViewer({ url, title: project.title });
                      }}
                      className="absolute top-3 right-3 bg-background/80 text-foreground px-3 py-1 rounded opacity-90 hover:opacity-100 z-10"
                    >
                      View Render
                    </button>
                  </div>
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
