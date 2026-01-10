import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useRef } from 'react';
import { Layout } from '@/components/layout';
import { useProductVizProjects } from '@/hooks/usePortfolioData';
import { ArrowLeft, MapPin, Image, Calendar, Sparkles, Eye, Layout as LayoutIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'front' | 'top' | 'side' | '3dperspective';

export default function ProductDetailViz() {
  const { id } = useParams();
  const { getProject } = useProductVizProjects();
  const project = getProject(id || '');
  const [viewMode, setViewMode] = useState<ViewMode>('front');

  const navigate = useNavigate();
  const location = useLocation();

  // Pan & zoom state
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragRef = useRef({ active: false, startX: 0, startY: 0, startOffsetX: 0, startOffsetY: 0 });
  // Track active pointers for touch pinch gestures
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinchRef = useRef({ active: false, initialDistance: 0, initialScale: 1, initialMid: { x: 0, y: 0 }, initialOffset: { x: 0, y: 0 } });
  const [controlsActive, setControlsActive] = useState(false);

  const clamp = (v: number, a = 0.5, b = 3) => Math.min(b, Math.max(a, v));

  const onWheel = (e: any) => {
    if (!controlsActive) return;
    // when controls are active, consume wheel to zoom (prevent page scroll)
    e.preventDefault();
    const delta = -e.deltaY / 500;
    setScale((s) => clamp(Number((s + delta).toFixed(2))));
  };

  const onPointerDown = (e: any) => {
    if (!controlsActive) return;

    const el = e.currentTarget as HTMLElement;

    // Mouse: only pan with middle button — ignore left-clicks so buttons work
    if (e.pointerType === 'mouse') {
      if (e.button !== 1) return;
      // begin mouse pan: prevent default autoscroll and capture pointer
      e.preventDefault?.();
      el.setPointerCapture?.(e.pointerId);
      dragRef.current.active = true;
      dragRef.current.startX = e.clientX;
      dragRef.current.startY = e.clientY;
      dragRef.current.startOffsetX = offset.x;
      dragRef.current.startOffsetY = offset.y;
      return;
    }

    // Touch / pen: track pointers and capture
    if (e.pointerType === 'touch' || e.pointerType === 'pen') {
      e.preventDefault?.();
      el.setPointerCapture?.(e.pointerId);
      pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      if (pointersRef.current.size === 2) {
        const pts = Array.from(pointersRef.current.values());
        const dx = pts[0].x - pts[1].x;
        const dy = pts[0].y - pts[1].y;
        const dist = Math.hypot(dx, dy);
        const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
        pinchRef.current.active = true;
        pinchRef.current.initialDistance = dist;
        pinchRef.current.initialScale = scale;
        pinchRef.current.initialMid = mid;
        pinchRef.current.initialOffset = { ...offset };
      } else {
        // single-finger touch -> start panning
        dragRef.current.active = true;
        dragRef.current.startX = e.clientX;
        dragRef.current.startY = e.clientY;
        dragRef.current.startOffsetX = offset.x;
        dragRef.current.startOffsetY = offset.y;
      }
      return;
    }
  };

  const onPointerMove = (e: any) => {
    if (!controlsActive) return;

    if (e.pointerType === 'touch') {
      // update pointer position
      if (pointersRef.current.has(e.pointerId)) {
        pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
      }
      // If two pointers -> pinch gesture
      if (pinchRef.current.active && pointersRef.current.size >= 2) {
        const pts = Array.from(pointersRef.current.values()).slice(0, 2);
        const dx = pts[0].x - pts[1].x;
        const dy = pts[0].y - pts[1].y;
        const dist = Math.hypot(dx, dy);
        const mid = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
        const newScale = clamp((dist / pinchRef.current.initialDistance) * pinchRef.current.initialScale);
        // Adjust offset so the point under the initial midpoint remains anchored
        const S0 = pinchRef.current.initialScale;
        const S1 = newScale;
        const M0 = pinchRef.current.initialMid;
        const M1 = mid;
        const O0 = pinchRef.current.initialOffset;
        const O1x = M1.x - S1 * ((M0.x - O0.x) / S0);
        const O1y = M1.y - S1 * ((M0.y - O0.y) / S0);
        setScale(newScale);
        setOffset({ x: O1x, y: O1y });
        return;
      }

      // Single touch panning
      if (dragRef.current.active) {
        const dx = e.clientX - dragRef.current.startX;
        const dy = e.clientY - dragRef.current.startY;
        setOffset({ x: dragRef.current.startOffsetX + dx, y: dragRef.current.startOffsetY + dy });
      }
      return;
    }

    // Mouse panning
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    setOffset({ x: dragRef.current.startOffsetX + dx, y: dragRef.current.startOffsetY + dy });
  };

  const onPointerUp = (e: any) => {
    if (!controlsActive) return;
    const el = e.currentTarget as HTMLElement;
    try { el.releasePointerCapture?.(e.pointerId); } catch {}

    if (e.pointerType === 'touch') {
      // remove pointer
      pointersRef.current.delete(e.pointerId);
      if (pointersRef.current.size < 2) {
        pinchRef.current.active = false;
      }
      // end single-touch drag when all pointers gone
      if (pointersRef.current.size === 0) {
        dragRef.current.active = false;
      }
      return;
    }

    dragRef.current.active = false;
  };

  const zoomIn = () => setScale((s) => clamp(Number((s + 0.25).toFixed(2))));
  const zoomOut = () => setScale((s) => clamp(Number((s - 0.25).toFixed(2))));
  const resetView = () => { setScale(1); setOffset({ x: 0, y: 0 }); };

  const goBack = () => {
    const from = (location.state as any)?.from;
    if (from) {
      navigate(from, { replace: true });
      return;
    }
    navigate('/gallery?tab=productviz', { replace: true });
  };

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Project not found</h1>
          <button onClick={() => navigate('/gallery?tab=productviz', { replace: true })}><Button>Back to Gallery</Button></button>
        </div>
      </Layout>
    );
  }

  const viewModes: { id: ViewMode; label: string; icon: any }[] = [
    { id: 'front', label: 'Front View', icon: Image },
    { id: 'top', label: 'Top View', icon: LayoutIcon },
    { id: 'side', label: 'Side View', icon: Eye },
    { id: '3dperspective', label: '3dperspective', icon: Sparkles },
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
      <div className="relative h-[60vh] md:h-[80vh] overflow-hidden">
        <div
          onWheel={onWheel}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          className="w-full h-full"
          style={{ touchAction: 'none', cursor: dragRef.active ? 'grabbing' : 'grab' }}
        >
          <img
            key={viewMode}
            src={(project.images as any)[viewMode]}
            alt={`${project.title} - ${viewMode}`}
            className="w-full h-full object-cover transition-transform duration-150"
            style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})` }}
          />

          {/* Controls & Activation Toggle - center-right */}
          <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-3 z-30">
            <button
              onClick={() => setControlsActive((v) => !v)}
              aria-pressed={controlsActive}
              className={`w-12 h-12 rounded-full flex items-center justify-center border border-border/30 backdrop-blur-md transition-colors ${controlsActive ? 'bg-accent text-accent-foreground' : 'bg-background/60 text-foreground'}`}
              title={controlsActive ? 'Disable Controls' : 'Activate Controls'}
            >
              {controlsActive ? 'ON' : 'OFF'}
            </button>

            {controlsActive && (
              <div className="flex flex-col gap-2">
                <button onClick={zoomIn} className="w-10 h-10 rounded-full bg-background/60 backdrop-blur-md border border-border/30 flex items-center justify-center">+</button>
                <button onClick={zoomOut} className="w-10 h-10 rounded-full bg-background/60 backdrop-blur-md border border-border/30 flex items-center justify-center">−</button>
                <button onClick={resetView} className="w-10 h-10 rounded-full bg-background/60 backdrop-blur-md border border-border/30 flex items-center justify-center">↺</button>
              </div>
            )}
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/40 to-transparent" />

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

        <button
          onClick={goBack}
          className="absolute top-4 left-4 md:top-8 md:left-8 inline-flex items-center gap-2 text-sm text-foreground/80 hover:text-primary transition-colors backdrop-blur-sm bg-background/20 px-3 py-2 md:px-4 md:py-2 rounded-full border border-border/30"
        >
          <ArrowLeft size={14} /> <span className="hidden sm:inline">Gallery</span>
        </button>

        <div className="absolute top-4 right-4 md:top-8 md:right-8">
          <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${{} as any}`}>
            {(project.specs as any).status}
          </span>
        </div>

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

      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto space-y-8 md:space-y-12">
          <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed max-w-3xl">
            {project.description}
          </p>

          <div className="overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
            <div className="flex md:grid md:grid-cols-4 gap-3 md:gap-4 min-w-max md:min-w-0">
              {[
                { icon: Image, value: (project.specs as any).deliverables || 'Renders', label: 'Deliverables' },
                { icon: Sparkles, value: (project.specs as any).client || (project.specs as any).location, label: 'Client' },
                { icon: Calendar, value: (project.specs as any).year, label: 'Year' },
                { icon: LayoutIcon, value: (project.specs as any).status, label: 'Status' },
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
                    src={(project.images as any)[mode.id]}
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

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center pt-4">
            <Link to="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full font-display gap-2">
                Request Similar Project <ChevronRight size={16} />
              </Button>
            </Link>
            <Link to="/gallery?tab=productviz" className="w-full sm:w-auto">
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
