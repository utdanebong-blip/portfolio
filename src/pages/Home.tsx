import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, Sparkles, Download, Calendar, Clock, ChevronRight, Palette, Layers, Lightbulb, GraduationCap, Gamepad2, Zap, Building2, MapPin, Briefcase, Package, Star, ArrowUpRight, BookOpen, Play, Code2, Target, SplitSquareHorizontal, Check, Crown, Cpu } from 'lucide-react';
import { projects, plugins, posts, archvizProjects, productVizProjects, showreel } from '@/hooks/usePortfolioData';
import { useEffect, useRef, useState, useCallback } from 'react';
import useInView from '@/hooks/useInView';
import { cn } from '@/lib/utils';
import ShowreelVideoSection from '@/components/ShowreelVideoSection';
import ArchvizVideoSection from '@/components/ArchvizVideoSection';
import ProductVizVideoSection from '@/components/ProductVizVideoSection';
import Blog from './Blog';
import BlogPost from './BlogPost';

function HeroText() {
  const { ref, inView } = useInView();
  return (
    <p
      ref={ref as any}
      className={`font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed transition-all duration-700 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: '180ms' }}
    >
      Crafting forms in
      <span className="block text-2xl md:text-4xl lg:text-2xl font-semibold text-primary text-glow-green mx-2">3 DIMENSION.</span>
    </p>
  );
}


function ScrollPauseHandler({ productRef, videoLibRef, videosLoaded, setVideosLoaded }: { productRef: React.RefObject<HTMLElement | null>; videoLibRef: React.RefObject<HTMLElement | null>; videosLoaded: boolean; setVideosLoaded: (v: boolean) => void; }) {
  const wheelHandlerRef = useRef<((e: WheelEvent) => void) | null>(null);
  const touchStartRef = useRef<number | null>(null);
  const [isBlocking, setIsBlocking] = useState(false);
  const [userTriedScroll, setUserTriedScroll] = useState(false);

  const enableScroll = useCallback(() => {
    const h = wheelHandlerRef.current;
    if (h) {
      window.removeEventListener('wheel', h as any, { passive: false } as any);
      window.removeEventListener('touchmove', h as any, { passive: false } as any);
      wheelHandlerRef.current = null;
    }
    try {
      document.documentElement.style.overscrollBehavior = '';
      document.documentElement.style.touchAction = '';
    } catch (e) {}
  }, []);

  const disableDownwardScroll = useCallback(() => {
    if (wheelHandlerRef.current) return;
    const handler = (e: WheelEvent) => {
      if (e.deltaY > 0) {
        e.preventDefault();
      }
    };
    wheelHandlerRef.current = handler;
    window.addEventListener('wheel', handler as any, { passive: false } as any);
    window.addEventListener('touchmove', handler as any, { passive: false } as any);
    try {
      document.documentElement.style.overscrollBehavior = 'contain';
      document.documentElement.style.touchAction = 'pan-y';
    } catch (e) {}
  }, []);

  useEffect(() => {
    const root = videoLibRef.current;
    if (!root) return;

    // Only consider the Showreel (first section) for the blocking rule
    const checkAndAttachMediaListeners = () => {
      if (!root) return;
      const sections = Array.from(root.querySelectorAll(':scope > section')) as HTMLElement[];
      const showreelSection = sections[0];
      if (!showreelSection) return;

      // Attach iframe load listeners
      const iframes = Array.from(showreelSection.querySelectorAll('iframe')) as HTMLIFrameElement[];
      for (const iframe of iframes) {
        if ((iframe as any).dataset && (iframe as any).dataset.loaded === '1') {
          setVideosLoaded(true);
          setIsBlocking(false);
          return;
        }
        if (!iframe.dataset.__listener) {
          const onload = () => {
            iframe.dataset.loaded = '1';
            setVideosLoaded(true);
            setIsBlocking(false);
          };
          iframe.addEventListener('load', onload, { once: true });
          iframe.dataset.__listener = '1';
        }
      }

      // Attach video canplaythrough listeners
      const videos = Array.from(showreelSection.querySelectorAll('video')) as HTMLVideoElement[];
      for (const v of videos) {
        if (v.readyState >= 3) {
          setVideosLoaded(true);
          setIsBlocking(false);
          return;
        }
        if (!v.dataset.__listener) {
          const onCan = () => {
            setVideosLoaded(true);
            setIsBlocking(false);
          };
          v.addEventListener('canplaythrough', onCan, { once: true });
          v.dataset.__listener = '1';
        }
      }
    };

    const isShowreelLoaded = () => {
      if (!root) return false;
      const sections = Array.from(root.querySelectorAll(':scope > section')) as HTMLElement[];
      const showreelSection = sections[0];
      if (!showreelSection) return false;
      const iframes = Array.from(showreelSection.querySelectorAll('iframe')) as HTMLIFrameElement[];
      for (const iframe of iframes) {
        if ((iframe as any).dataset && (iframe as any).dataset.loaded === '1') return true;
      }
      const videos = Array.from(showreelSection.querySelectorAll('video')) as HTMLVideoElement[];
      for (const v of videos) {
        if (v.readyState >= 3) return true;
      }
      return false;
    };

    const mo = new MutationObserver(() => checkAndAttachMediaListeners());
    mo.observe(root, { childList: true, subtree: true });

    // Block downward scroll (wheel/touch) when NONE of the video elements are visible
    // For our rule we check only the Showreel section visibility
    const isShowreelInView = () => {
      const container = videoLibRef?.current || root;
      if (!container) return false;
      const sections = Array.from(container.querySelectorAll(':scope > section')) as HTMLElement[];
      const showreelSection = sections[0];
      if (!showreelSection) return false;
      const medias = Array.from(showreelSection.querySelectorAll('video, iframe')) as (HTMLVideoElement | HTMLIFrameElement)[];
      if (!medias.length) return false;
      for (const m of medias) {
        const r = m.getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) return true;
      }
      return false;
    };

    const wheelHandler = (e: WheelEvent) => {
      if (e.deltaY <= 0) return; // only block downward scroll
      const productEl = productRef?.current;
      if (!productEl) return;
      const pRect = productEl.getBoundingClientRect();
      const proximity = 120; // only trigger when product section is nearly revealed
      // Only start blocking when product section is coming into view (close enough)
      if (pRect.top > window.innerHeight + proximity) return;

      // If the showreel media are visible or already loaded, allow scroll
      const showLoaded = isShowreelLoaded();
      const showVisible = isShowreelInView();
      if (showLoaded || showVisible || videosLoaded) {
        setUserTriedScroll(false);
        setIsBlocking(false);
        return;
      }

      // Block downward scroll and show message only when trying to pass the product render section
      e.preventDefault();
      setIsBlocking(true);
      setUserTriedScroll(true);
    };

    const touchStart = (ev: TouchEvent) => {
      touchStartRef.current = ev.touches?.[0]?.clientY ?? null;
    };

    const touchMove = (ev: TouchEvent) => {
      const startY = touchStartRef.current;
      if (startY == null) return;
      const moveY = ev.touches?.[0]?.clientY ?? startY;
      const delta = startY - moveY; // positive when swiping up (scroll down)
      if (delta <= 0) return; // only block downward scroll
      const productEl = productRef?.current;
      if (!productEl) return;
      const pRect = productEl.getBoundingClientRect();
      const proximity = 120;
      if (pRect.top > window.innerHeight + proximity) return;

      const showLoaded = isShowreelLoaded();
      const showVisible = isShowreelInView();
      if (showLoaded || showVisible || videosLoaded) {
        setUserTriedScroll(false);
        setIsBlocking(false);
        return;
      }

      ev.preventDefault();
      setIsBlocking(true);
      setUserTriedScroll(true);
    };

    window.addEventListener('wheel', wheelHandler, { passive: false } as any);
    window.addEventListener('touchstart', touchStart as any, { passive: true } as any);
    window.addEventListener('touchmove', touchMove as any, { passive: false } as any);

    // initial check
    checkAndAttachMediaListeners();

    // update blocking status on scroll/resize so the notification appears as soon as user approaches
    const updateBlockingStatus = () => {
      if (videosLoaded) {
        setIsBlocking(false);
        setUserTriedScroll(false);
        return;
      }
      const productEl = productRef?.current;
      if (!productEl) {
        setIsBlocking(false);
        return;
      }
      const pRect = productEl.getBoundingClientRect();
      const proximity = 120;
      if (pRect.top <= window.innerHeight + proximity) {
        const showLoaded = isShowreelLoaded();
        const showVisible = isShowreelInView();
        setIsBlocking(!(showLoaded || showVisible || videosLoaded));
        return;
      }
      setIsBlocking(false);
    };

    window.addEventListener('scroll', updateBlockingStatus, { passive: true } as any);
    window.addEventListener('resize', updateBlockingStatus, { passive: true } as any);
    updateBlockingStatus();

    // reset user tried scroll flag when videos load
    if (videosLoaded) setUserTriedScroll(false);

    return () => {
      mo.disconnect();
      window.removeEventListener('wheel', wheelHandler as any);
      window.removeEventListener('touchstart', touchStart as any);
      window.removeEventListener('touchmove', touchMove as any);
      window.removeEventListener('scroll', updateBlockingStatus as any);
      window.removeEventListener('resize', updateBlockingStatus as any);
    };
  }, [videoLibRef, videosLoaded, setVideosLoaded]);

  return (
    <>
      {isBlocking && userTriedScroll && !videosLoaded && (
        <div className="fixed left-1/2 bottom-24 -translate-x-1/2 z-50">
          <div className="px-5 py-3 rounded-full bg-black/80 text-white text-sm font-medium shadow-lg">
            Loading something awesome — please wait
          </div>
        </div>
      )}
    </>
  );
}

function FadeIn({ children, delay = 0 }: { children: any; delay?: number }) {
  const { ref, inView } = useInView();
  return (
    <div
      ref={ref as any}
      className={`transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
// Demo books for the section
const featuredBooks = [
  {
    id: '1',
    title: 'Optimizing game props: A deep dive into LOD techniques',
    cover: `${import.meta.env.BASE_URL}assets/Optimizing-Game-Props-A-Deep-Dive-into-LOD-Techniques.png`,
    category: '3D Art',
  },
  {
    id: '2',
    title: 'My substance painter smart library.',
    cover: `${import.meta.env.BASE_URL}assets/smartlib.png`,
    category: 'Game Dev',
  },
  {
    id: '3',
    title: 'Breaking down AA games props',
    cover: `${import.meta.env.BASE_URL}assets/breaking.png`,
    category: 'Sculpting',
  },
];
export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const featuredArchviz = archvizProjects.slice(0, 2);
  const featuredProductViz = productVizProjects.slice(0, 3);
  const featuredShowreel = showreel.slice(0, 1);
  const videoLibRef = useRef<HTMLElement | null>(null);
  const productRef = useRef<HTMLElement | null>(null);
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewport, setViewport] = useState({ w: typeof window !== 'undefined' ? window.innerWidth : 0, h: typeof window !== 'undefined' ? window.innerHeight : 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    handleResize();
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout>
       {/* Hero Section - Asymmetric & Bold */}
      <section className="min-h-screen relative overflow-hidden bg-background">
        {/* Animated Background with Multiple Layers */}
      <div className="absolute inset-0">
        {/* Primary Glow */}
        <div 
          className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 transition-transform duration-1000 ease-out"
          style={{
            background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
            left: `calc(50% + ${(mousePos.x - (viewport.w / 2 || 0)) * 0.05}px)`,
            top: `calc(30% + ${(mousePos.y - (viewport.h / 2 || 0)) * 0.05}px)`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        
        {/* Secondary Accent Glow */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(var(--accent)) 0%, transparent 70%)',
            right: '10%',
            bottom: '20%',
          }}
        />

        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Scan Lines */}
        <div className="absolute inset-0 scanlines opacity-20" />

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/50 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${10 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        {/* Geometric Shapes */}
        <div className="absolute top-[20%] left-[10%] w-32 h-32 border border-primary/20 rotate-45 animate-pulse" />
        <div className="absolute bottom-[30%] right-[15%] w-24 h-24 border border-accent/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-[60%] left-[5%] w-16 h-16 bg-primary/5 rotate-12" />
      </div>

      <div className="relative z-10 min-h-screen flex items-center">
        <div className="container mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 pt-24 lg:pt-0">
              {/* Glowing Status Badge */}
              <div className="inline-flex items-center gap-3 mb-8">
                <div className="relative">
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-card/90 backdrop-blur-xl rounded-full border border-primary/30 shadow-lg shadow-primary/10">
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary shadow-lg shadow-primary/50"></span>
                    </div>
                    <span className="font-mono text-xs tracking-[0.2em] text-primary uppercase">Available for Work</span>
                  </div>
                  {/* Glow Effect Behind Badge */}
                  <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full -z-10" />
                </div>
              </div>

              {/* Main Title with Neon Effect */}
              <div className="space-y-4 mb-8">
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter text-foreground leading-[0.85]">
                  <span className="block">DIGITAL</span>
                  <span className="block text-primary text-glow-green relative">
                    ARTISAN
                    <span className="absolute -inset-1 blur-2xl bg-primary/30 -z-10 rounded-lg" />
                  </span>
                </h1>
              </div>

              {/* Subtitle with Typing Effect */}
              <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-xl mb-10 leading-relaxed">
                Crafting <span className="text-foreground font-medium">immersive 3D experiences</span> — from game-ready assets to photorealistic architectural visions.
              </p>

              {/* Specialty Tags with Neon Borders */}
              <div className="flex flex-wrap gap-4 mb-12">
                {[
                  { icon: Gamepad2, label: 'Game Props', color: 'primary' },
                  { icon: Building2, label: 'Archviz', color: 'accent' },
                  { icon: Package, label: 'Product Viz', color: 'neon-orange' },
                ].map((item) => (
                  <div 
                    key={item.label}
                    className="group flex items-center gap-3 px-5 py-3 rounded-2xl bg-card/50 border border-border/50 hover:border-primary/50 hover:bg-card/80 transition-all duration-500 cursor-default backdrop-blur-sm"
                  >
                    <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <item.icon size={18} className="text-primary" />
                    </div>
                    <span className="font-mono text-sm tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons with Glow */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/gallery">
                  <Button size="lg" className="w-full sm:w-auto font-display gap-3 px-10 py-7 text-base rounded-2xl glow-green group relative overflow-hidden">
                    <span className="relative z-10 flex items-center gap-3">
                      Explore Portfolio 
                      <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-display gap-3 px-10 py-7 text-base rounded-2xl border-2 border-border/50 hover:border-primary/50 hover:bg-primary/5 backdrop-blur-sm">
                    Let's Talk
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Visual - 5 columns */}
            <div className="hidden lg:flex lg:col-span-5 justify-center items-center relative">
              <div className="relative w-full aspect-square max-w-[500px]">
                {/* Central Orb */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border border-primary/30 animate-[spin_30s_linear_infinite]">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow-lg shadow-primary/50" />
                    </div>
                    {/* Middle Ring */}
                    <div className="absolute inset-8 rounded-full border border-accent/30 animate-[spin_20s_linear_infinite_reverse]">
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-accent rounded-full shadow-lg shadow-accent/50" />
                    </div>
                    {/* Inner Core */}
                    <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 backdrop-blur-xl border border-white/10 flex items-center justify-center">
                      <Box size={40} className="text-primary/80" />
                    </div>
                  </div>
                </div>

                {/* Floating Project Cards */}
                {featuredProjects.slice(0, 3).map((project, index) => {
                  const positions = [
                    { top: '5%', left: '0%', rotate: '-8deg' },
                    { top: '55%', right: '-5%', rotate: '5deg' },
                    { bottom: '0%', left: '15%', rotate: '-3deg' },
                  ];
                  const pos = positions[index];
                  return (
                    <Link
                      key={project.id}
                      to={`/gallery/${project.id}`}
                      className="absolute group cursor-pointer animate-float"
                      style={{
                        ...pos,
                        animationDelay: `${index * 0.5}s`,
                        transform: `rotate(${pos.rotate})`,
                      }}
                    >
                      <div className="w-36 h-28 rounded-xl overflow-hidden border-2 border-border/50 bg-card shadow-2xl group-hover:scale-110 scale:2x group-hover:border-primary/50 group-hover:shadow-primary/20 transition-all duration-500">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="font-mono text-[10px] text-primary truncate">{project.title}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      
        {/* Scroll indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <div className="flex flex-col items-center gap-2 animate-bounce">
                  <span className="font-mono text-xs text-muted-foreground tracking-widest">SCROLL</span>
                  <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent" />
                </div>
              </div>
      </section>
     <AIEnhancerPromoSection /> 
    {/* Skills Section - Glowing Cards */}
      <SkillsSection />
      

      {/* Blog Display - Artistic Shelf */}
          <div className="relative">
            {/* Shelf decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-r from-violet-500/10 via-violet-500/20 to-violet-500/10 rounded-full blur-xl" />
            
            <div className="flex justify-center gap-6 md:gap-12 flex-wrap md:flex-nowrap">
              {featuredBooks.map((book, index) => (
                <Link
                  key={book.id}
                  to="/blog"
                  className="group relative"
                  style={{ 
                    transform: `rotate(${index === 1 ? 0 : index === 0 ? -3 : 3}deg)`,
                    zIndex: index === 1 ? 2 : 1
                  }}
                >
                  {/* Blog glow effect */}
                  <div className="absolute -inset-4 bg-violet-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative w-40 md:w-48 transform group-hover:scale-105 group-hover:-translate-y-4 transition-all duration-500">
                    {/* Blog cover */}
                    <div className="relative aspect-[3/4] rounded-lg overflow-hidden border-2 border-border/30 group-hover:border-violet-500/50 shadow-2xl shadow-black/30 transition-all duration-500">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      
                      {/* Blog spine effect */}
                      <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/30 to-transparent" />
                      
                      {/* Title overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <span className="text-xs font-mono text-violet-400 mb-1 block">{book.category}</span>
                        <h4 className="font-display text-sm font-semibold text-foreground line-clamp-2">{book.title}</h4>
                      </div>
                    </div>
                    
                    {/* Blog shadow/reflection */}
                    <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/20 blur-md rounded-full" />
                  </div>
                </Link>
              ))}
            </div>
            
            {/* View all button */}
            <div className="text-center mt-16">
              <Link to="/blog">
                <Button variant="outline" className="font-display gap-3 border-violet-500/30 text-violet-400 hover:bg-violet-500/10 rounded-2xl px-8 py-6">
                  <BookOpen size={18} />
                  Read More Here <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </div>

          
           
      {/* ProductViz Section - Card Stack */}
      <section ref={productRef as any} className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-orange/[0.02] to-background" />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neon-orange/20 bg-neon-orange/5 backdrop-blur-sm mb-6">
                <Package className="w-4 h-4 text-neon-orange" />
                <span className="font-mono text-xs text-neon-orange tracking-widest uppercase">Image Renders</span>
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground">
                Product <span className="text-neon-orange">Renders</span>
              </h2>
              <p className="font-body text-muted-foreground text-lg mt-4">
                Premium product visualization that elevates brands and drives conversions.
              </p>
            </div>
            <Link to="/gallery?tab=productviz" className="group">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-neon-orange transition-colors">
                <span className="font-mono text-sm tracking-wider uppercase">More</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* Horizontal Scroll on Mobile */}
          <div className="flex gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:overflow-visible scrollbar-hide">
            {featuredProductViz.map((project, index) => (
              <Link
                key={project.id}
                to={`/productviz/${project.id}`}
                className="flex-shrink-0 w-[280px] md:w-auto group relative rounded-3xl overflow-hidden bg-card border border-border/30 hover:border-neon-orange/50 transition-all duration-500"
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img 
                    src={project.thumbnail} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-neon-orange/20 text-neon-orange border border-neon-orange/30 backdrop-blur-xl">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <Briefcase className="w-3.5 h-3.5 text-neon-orange" />
                    <span>{project.specs.client}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-neon-orange transition-colors">
                    {project.title}
                  </h3>
                  {project.highlights && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.highlights.slice(0, 2).map((h) => (
                        <span key={h} className="flex items-center gap-1 text-[10px] text-muted-foreground bg-secondary/50 px-2.5 py-1 rounded-full">
                          <Star className="w-2.5 h-2.5 text-neon-orange" />{h}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative overflow-hidden">
        {/* Section Accent */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary to-transparent" />
        
        <div className="container mx-auto px-4">
          {/* Section Header - Editorial */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
              <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
                Video <span className="text-primary text-glow-green">Libary</span>
              </h2>
              <p className="font-body text-muted-foreground text-lg">
                Video plays automatically on hover, click the sound button to enable audio.
              </p>
            </div>
            <Link to="/gallery" className="group">
              <div className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors">
                <span className="font-mono text-sm tracking-wider uppercase">View All</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
                    {/* Showreel Section - Cinematic Reels */}
                    <div ref={videoLibRef as any}>
                      <ShowreelVideoSection featuredShowreel={featuredShowreel} />
                      {/* Archviz Section - Cinematic with Video */}
                      <ArchvizVideoSection featuredArchviz={featuredArchviz} /> 
                      {/* ProductViz Section - Cinematic with Video (shared UI) */}
                      <ProductVizVideoSection featuredProductViz={featuredProductViz} />
                    </div>
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>
        </div>
      </section>

      {/* Scroll pause logic: pause downward scroll when user is near the video library and media aren't loaded yet */}
      <ScrollPauseHandler productRef={productRef} videoLibRef={videoLibRef} videosLoaded={videosLoaded} setVideosLoaded={setVideosLoaded} />

    
      

      {/* Tools & Resources */}
      <section className="py-24 bg-card/20 border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-primary tracking-widest uppercase mb-4 block">Free Resources</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Tools & <span className="text-primary">Plugins</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Open-source utilities crafted to streamline your creative workflow
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
            {plugins.map((plugin, index) => (
              <div
                key={plugin.id}
                className="w-full sm:w-[48%] lg:w-[23%] max-w-[360px] mx-auto"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="group bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 animate-fade-in h-full">
                  <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300">{plugin.icon}</div>
                  <span className="text-xs font-mono text-primary/80 bg-primary/10 px-3 py-1 rounded-full">{plugin.category}</span>
                  <h3 className="font-display text-lg font-semibold mt-4 mb-2 text-foreground">{plugin.name}</h3>
                  <p className="font-body text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">{plugin.description}</p>
                  <a href={plugin.downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm" className="w-full gap-2 border-border/50 hover:border-primary/50">
                      <Download size={14} /> Download Free
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Dramatic */}
      <section className="py-32 md:py-40 relative overflow-hidden">
        {/* Background Art */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 border border-primary/20 mb-8">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Ready to Create Something <span className="text-primary text-glow-green">Extraordinary</span>?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Whether you need game-ready props, architectural visualization, or creative consultation let's bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="w-full sm:w-auto font-display gap-3 px-10 py-7 text-lg rounded-2xl glow-green">
                  Start a Conversation <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-display gap-3 px-10 py-7 text-lg rounded-2xl border-border/50 hover:bg-card/50">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
// Skills Section with Glowing Cards
function SkillsSection(): JSX.Element {
  const skills = [
    { icon: Gamepad2, title: 'Game Development', desc: 'Optimized 3D assets with clean topology and PBR materials for AAA quality', color: 'primary' },
    { icon: Building2, title: 'Architectural Viz', desc: 'Photorealistic renders that bring architectural designs to life', color: 'accent' },
    { icon: Package, title: 'Product Rendering', desc: 'Premium product visuals that elevate brands and drive conversions', color: 'neon-orange' },
    { icon: Code2, title: 'Technical Art', desc: 'Custom shaders, procedural systems, and pipeline optimization', color: 'primary' },
    { icon: Palette, title: 'Creative Direction', desc: 'Cohesive visual storytelling from concept to final delivery', color: 'accent' },
    { icon: Zap, title: 'Real-time Rendering', desc: 'Interactive experiences powered by Unreal Engine 5', color: 'neon-orange' },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Target size={14} className="text-primary" />
            <span className="font-mono text-xs text-primary tracking-widest uppercase">Core Expertise</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            What I <span className="text-primary text-glow-green">Deliver</span>
          </h2>
          <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto">
            Specialized in creating high-fidelity 3D content across multiple industries
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.title}
              className="group relative p-8 rounded-3xl bg-card/50 border border-border/30 hover:border-primary/50 transition-all duration-500 overflow-hidden backdrop-blur-sm"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-[100px] transition-all duration-500 group-hover:w-32 group-hover:h-32 group-hover:bg-primary/10" />

              <div className="relative">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 group-hover:bg-primary/20 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-500">
                  <skill.icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="font-display text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {skill.title}
                </h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">
                  {skill.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// AI Render Enhancer Promo Section
function AIEnhancerPromoSection() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-neon-cyan/5 to-primary/5" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-neon-cyan/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 grid-pattern opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles size={14} className="text-primary animate-pulse" />
              <span className="font-mono text-xs text-primary tracking-widest uppercase">New App Release</span>
            </div>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              AI Archviz
              <span className="block text-primary text-glow-green">Render Enhancer</span>
            </h2>

            <p className="font-body text-lg text-muted-foreground mb-8 max-w-lg leading-relaxed">
              Transform your architectural renders with AI-powered enhancement. 
              Non-destructive processing, GPU acceleration, and batch capabilities — 
              all in one powerful tool.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {[
                { icon: SplitSquareHorizontal, label: 'VFB Comparison' },
                { icon: Cpu, label: 'GPU Accelerated' },
                { icon: Layers, label: 'Batch Processing' },
              ].map((feature) => (
                <div
                  key={feature.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card/50 border border-border/50 backdrop-blur-sm"
                >
                  <feature.icon size={16} className="text-primary" />
                  <span className="font-mono text-xs text-foreground">{feature.label}</span>
                </div>
              ))}
            </div>

            {/* Free Badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="text-center">
                <p className="font-display text-4xl font-bold text-neon-green">$0</p>
                <p className="font-mono text-xs text-muted-foreground">Free for testing</p>
              </div>
              <div className="h-12 w-px bg-border/50" />
              <div className="flex items-center gap-2">
                <Check size={18} className="text-neon-green" />
                <span className="text-sm text-muted-foreground">All features unlocked</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/ai-render-enhancer">
                <Button size="lg" className="w-full sm:w-auto font-display gap-3 px-8 py-6 text-base rounded-2xl glow-green group">
                  <Download size={18} className="group-hover:animate-bounce" />
                  Try for Free
                </Button>
              </Link>
              <Link to="/ai-render-enhancer">
                <Button size="lg" variant="outline" className="w-full sm:w-auto font-display gap-3 px-8 py-6 text-base rounded-2xl border-2 border-border/50 hover:border-primary/50">
                  Learn More
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visual - Feature Preview Card */}
          <div className="relative">
            <div className="relative bg-card/50 border border-border/50 rounded-3xl p-8 backdrop-blur-xl overflow-hidden">
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/20 to-transparent" />
              
              {/* Comparison Demo */}
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-border/30 bg-muted/30 mb-6">
                {/* Background photo (replace URL with your image) */}
                <img
                  src={`${import.meta.env.BASE_URL}assets/comparison-bg.png`}
                  alt="comparison background"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
                {/* Dimming overlay to keep text readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 z-5" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center relative z-10">
                    
                    <p className="font-mono text-xs text-muted-foreground">Enhanced / Original</p>
                  </div>
                </div>
              </div>

              {/* Feature Checkmarks */}
              <div className="space-y-3">
                {[
                  'AI-powered enhancement preserves details',
                  'Process hundreds of images in batch',
                  'Add text & image watermarks easily'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                      <Check size={12} className="text-neon-green" />
                    </div>
                    <span className="font-body text-sm text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Floating Badge */}
              <div className="absolute -top-3 -right-3 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-mono text-xs shadow-lg shadow-primary/30 rotate-3">
                NEW
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 w-24 h-24 border border-primary/20 rounded-full" />
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-primary/10 rounded-xl rotate-12" />
          </div>
        </div>
      </div>
    </section>
  );
}