import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, Sparkles, Download, Calendar, Clock, ChevronRight, Palette, Layers, Lightbulb, GraduationCap, Gamepad2, Zap, Building2, MapPin, Briefcase, Package, Star } from 'lucide-react';
import { projects, plugins, posts, archvizProjects, productVizProjects } from '@/hooks/usePortfolioData';
import { useEffect, useRef, useState } from 'react';
import useInView from '@/hooks/useInView';

function TypingQuote() {
  const quotes = [
    '“Every polygon tells a story. Every texture holds a memory. I create worlds one asset at a time.”',
    '“Design is not what it looks like, it’s how it performs; I sculpt pixels to perform beautifully.”',
    '“Lighting reveals the soul of a scene. I chase it until the moment feels alive.”',
    '“Good art balances purpose with restraint, detail is meaningful, not busywork.”',
    '“I make assets that play nice in engines and look breathtaking in stills.”',
    '“From concept to crafted 3D reality.”',
  ];

  const [text, setText] = useState('');
  const [index, setIndex] = useState(0);
  const refEl = useRef<HTMLElement | null>(null);
  const [started, setStarted] = useState(false);
  const [minHeight, setMinHeight] = useState<number | undefined>(undefined);
  const timeouts = useRef<number[]>([]);

  useEffect(() => {
    const el = refEl.current;
    if (!el) return;
    // measure longest quote height to reserve space and avoid layout shift
    const longest = quotes.reduce((a, b) => (a.length > b.length ? a : b), quotes[0]);
    const measure = document.createElement('div');
    measure.style.position = 'absolute';
    measure.style.visibility = 'hidden';
    measure.style.pointerEvents = 'none';
    measure.style.width = `${el.clientWidth || Math.min(900, window.innerWidth - 64)}px`;
    measure.className = 'font-display text-2xl md:text-4xl lg:text-5xl font-light leading-relaxed';
    measure.innerText = longest;
    document.body.appendChild(measure);
    const h = measure.clientHeight;
    setMinHeight(h);
    document.body.removeChild(measure);
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStarted(true);
            setIndex(0);
          } else {
            // pause typing and clear text when out of view to avoid layout shifts
            setStarted(false);
            setText('');
            timeouts.current.forEach((t) => clearTimeout(t));
            timeouts.current = [];
          }
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Type the current quote, then advance index after a pause
  useEffect(() => {
    if (!started) return;
    const q = quotes[index % quotes.length];
    let i = 0;

    function clearAll() {
      timeouts.current.forEach((t) => clearTimeout(t));
      timeouts.current = [];
    }

    function typeChar() {
      if (i <= q.length) {
        setText(q.slice(0, i));
        i += 1;
        timeouts.current.push(window.setTimeout(typeChar, 30));
      } else {
        // Hold the full quote, then clear and advance
        timeouts.current.push(window.setTimeout(() => {
          setText('');
          setIndex((prev) => (prev + 1) % quotes.length);
        }, 2000));
      }
    }

    clearAll();
    typeChar();

    return () => clearAll();
  }, [index, started]);

  // cleanup on unmount
  useEffect(() => {
    return () => {
      timeouts.current.forEach((t) => clearTimeout(t));
      timeouts.current = [];
    };
  }, []);

  return (
    <blockquote
      ref={refEl as any}
      className="font-display text-1xl md:text-2xl lg:text-3xl font-light text-foreground leading-relaxed mb-8"
      style={minHeight ? { minHeight: `${minHeight}px` } : undefined}
    >
      {text}
      <span className="text-primary" aria-hidden="true">|</span>
    </blockquote>
  );
}

function TypingName() {
  const first = 'Digital';
  const second = 'Craftsman';
  const [top, setTop] = useState('');
  const [bottom, setBottom] = useState('');
  const [cursor, setCursor] = useState(true);

  useEffect(() => {
    let mounted = true;
    let i = 0;
    const typeTop = () => {
      if (!mounted) return;
      if (i <= first.length) {
        setTop(first.slice(0, i));
        i += 1;
        setTimeout(typeTop, 80);
      } else {
        // pause then type bottom
        setTimeout(() => {
          let j = 0;
          const typeBottom = () => {
            if (!mounted) return;
            if (j <= second.length) {
              setBottom(second.slice(0, j));
              j += 1;
              setTimeout(typeBottom, 80);
            }
          };
          typeBottom();
        }, 300);
      }
    };
    typeTop();

    const cursorInterval = setInterval(() => setCursor((c) => !c), 500);
    return () => {
      mounted = false;
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <h1 className="relative font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
      {/* reserve vertical space using an invisible full-text placeholder */}
      <span className="invisible block text-foreground text-center whitespace-pre-line">
        {first}
        {"\n"}
        {second}
      </span>

      {/* overlay the typing text so it doesn't affect layout */}
      <span className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-foreground">{top}</span>
        <span className="text-primary text-glow-green">{bottom}{cursor ? '|' : ' '}</span>
      </span>
    </h1>
  );
}

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

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const featuredArchviz = archvizProjects.slice(0, 2);
  const featuredProductViz = productVizProjects.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section - Elegant & Artistic */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated background grid */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        {/* Floating orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
         {/* Geometric lines */}
        <div className="absolute bottom-20 right-0 w-1/3 h-px bg-gradient-to-l from-transparent via-accent/50 to-transparent" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/30 bg-card/50 backdrop-blur-sm mb-8 animate-fade-in">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="font-mono text-sm tracking-widest text-primary uppercase">Available for Projects</span>
          </div>
          
          <TypingName />
          
          <HeroText />
          
           <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-xs text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/50">
              <Gamepad2 size={14} className="text-primary" /> Game Props
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/50">
              <Building2 size={14} className="text-primary" /> Archviz
            </span>
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/50 border border-border/50">
              <Zap size={14} className="text-primary" /> Real-time
            </span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to="/gallery">
              <Button size="lg" className="font-display gap-3 px-8 py-6 text-base glow-green">
                Explore Work <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-display gap-3 px-8 py-6 text-base border-border/50 hover:bg-card/50 hover:border-primary/50">
                Start a Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Philosophy Statement */}
      <section className="py-32 relative border-t border-border/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Sparkles className="w-8 h-8 text-primary mx-auto mb-8 opacity-60" />
            <TypingQuote />
            <div className="flex items-center justify-center gap-4">
              <div className="h-px w-12 bg-border" />
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">TODAY - 2026</span>
              <div className="h-px w-12 bg-border" />
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
      

      
 {/* Game Props Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-20" />
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 border border-primary/30">
                  <Gamepad2 className="w-5 h-5 text-primary" />
                </div>
                <span className="font-mono text-xs text-primary tracking-widest uppercase">Game Assets</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                3D <span className="text-primary text-glow-green">Props</span>
              </h2>
              <p className="font-body text-muted-foreground mt-3 max-w-lg">
                Game-ready assets optimized for real-time rendering with AAA quality texturing.
              </p>
            </div>
            <Link to="/gallery">
              <Button variant="ghost" className="font-mono gap-2 text-muted-foreground hover:text-primary uppercase text-xs tracking-wider">
                View All Props <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <FadeIn key={project.id} delay={index * 100}>
              <Link
                to={`/gallery/${project.id}`}
                state={{ from: '/gallery?tab=props' }}
                className="group relative rounded-lg overflow-hidden bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 flex flex-col h-full"
              >
                {/* Top HUD bar */}
                <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-gradient-to-b from-background/90 to-transparent">
                  <span className="font-mono text-[10px] text-primary uppercase tracking-wider">{project.category}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="font-mono text-[10px] text-muted-foreground">GAME READY</span>
                  </div>
                </div>
                
                <div className="aspect-[4/3] overflow-hidden relative flex-shrink-0">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  
                  {/* Corner brackets */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-primary/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                
                {/* Bottom info panel */}
                <div className="p-4 border-t border-border/50 mt-auto">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
                    <div className="bg-secondary/50 rounded px-2 py-1.5 text-center">
                      <span className="text-muted-foreground block">POLYS</span>
                      <span className="text-primary font-bold">{(project.specs.polyCount / 1000).toFixed(1)}K</span>
                    </div>
                    <div className="bg-secondary/50 rounded px-2 py-1.5 text-center">
                      <span className="text-muted-foreground block">TEX</span>
                      <span className="text-primary font-bold">{project.specs.textureResolution}</span>
                    </div>
                    <div className="bg-secondary/50 rounded px-2 py-1.5 text-center">
                      <span className="text-muted-foreground block">MATS</span>
                      <span className="text-primary font-bold">{project.specs.materialSlots}</span>
                    </div>
                  </div>
                </div>
              </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>


{/* Archviz Section - Redesigned */}
      <section className="py-24 relative overflow-hidden">
        {/* Elegant background */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.02] to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm mb-6">
              <Building2 className="w-4 h-4 text-accent" />
              <span className="font-mono text-xs text-accent tracking-widest uppercase">Architecture</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
              Architectural <span className="text-accent text-glow-purple">Visualization</span>
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              Transforming architectural concepts into breathtaking photorealistic renders and immersive experiences
            </p>
          </div>

          {/* Featured Project - Large */}
          {featuredArchviz[0] && (
            <Link 
              to={`/archviz/${featuredArchviz[0].id}`}
              state={{ from: '/gallery?tab=archviz' }}
              className="group block mb-8 relative"
            >
              <div className="relative rounded-3xl overflow-hidden">
                <div className="aspect-[21/9] md:aspect-[21/8]">
                  <img 
                    src={featuredArchviz[0].thumbnail}
                    alt={featuredArchviz[0].title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                </div>
                
                {/* Multi-layer gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-transparent" />
                
                {/* Floating accent glow */}
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-md ${
                      featuredArchviz[0].specs.status === 'Completed' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    }`}>
                      {featuredArchviz[0].specs.status}
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-xs font-mono text-muted-foreground backdrop-blur-md bg-background/30 border border-border/30">
                      {featuredArchviz[0].specs.year}
                    </span>
                  </div>
                  
                  <h3 className="font-display text-3xl md:text-5xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-500">
                    {featuredArchviz[0].title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className="text-accent" />
                      {featuredArchviz[0].specs.location}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span className="flex items-center gap-2">
                      <Layers size={14} className="text-accent" />
                      {featuredArchviz[0].specs.area}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                    <span>{featuredArchviz[0].specs.type}</span>
                  </div>
                  
                  <p className="font-body text-muted-foreground max-w-xl line-clamp-2 mb-6 hidden md:block">
                    {featuredArchviz[0].description}
                  </p>
                  
                  <div className="inline-flex items-center gap-2 text-accent font-medium opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                    Explore Project <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                
                {/* Decorative corner elements */}
                <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-accent/30 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-6 right-6 w-12 h-12 border-t-2 border-r-2 border-accent/30 rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          )}

          {/* Secondary Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArchviz.slice(1, 3).map((project, index) => (
              <Link
                key={project.id}
                to={`/archviz/${project.id}`}
                state={{ from: '/gallery?tab=archviz' }}
                className="group relative rounded-2xl overflow-hidden border border-border/30 hover:border-accent/30 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
                  
                  {/* Accent glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                {/* Status */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md ${
                    project.specs.status === 'Completed' 
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  }`}>
                    {project.specs.status}
                  </span>
                </div>
                
                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <MapPin size={12} className="text-accent" />
                    <span>{project.specs.location}</span>
                    <span className="text-border">•</span>
                    <span>{project.specs.area}</span>
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* View All CTA */}
          <div className="text-center mt-12">
            <Link to="/gallery">
              <Button variant="outline" size="lg" className="font-display gap-3 border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/50 group">
                Explore All Projects
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* ProductViz Section - NEW */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-amber-500/[0.02] to-background" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
        
        <div className="container mx-auto px-4 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-12 gap-4 md:gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-amber-500/20 bg-amber-500/5 backdrop-blur-sm mb-3 md:mb-4">
                <Package className="w-3.5 h-3.5 md:w-4 md:h-4 text-amber-400" />
                <span className="font-mono text-[10px] md:text-xs text-amber-400 tracking-widest uppercase">Product Viz</span>
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
                Product <span className="text-amber-400">Visualization</span>
              </h2>
              <p className="font-body text-sm md:text-base text-muted-foreground mt-2 md:mt-3 max-w-lg">
                Premium product renders that elevate brands and drive sales.
              </p>
            </div>
            <Link to="/gallery">
              <Button variant="ghost" className="font-mono gap-2 text-muted-foreground hover:text-amber-400 uppercase text-[10px] md:text-xs tracking-wider">
                View All <ArrowRight size={14} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {featuredProductViz.map((project, index) => (
              <Link
                key={project.id}
                to={`/productviz/${project.id}`}
                state={{ from: '/gallery?tab=productviz' }}
                className="group relative rounded-xl md:rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-amber-500/50 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img src={project.thumbnail} alt={project.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] md:text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 backdrop-blur-xl">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-3 md:p-5">
                  <div className="flex items-center gap-2 text-[10px] md:text-xs text-muted-foreground mb-1.5">
                    <Briefcase className="w-3 h-3 text-amber-400" />
                    <span>{project.specs.client}</span>
                  </div>
                  <h3 className="font-display text-sm md:text-lg font-semibold text-foreground group-hover:text-amber-400 transition-colors">
                    {project.title}
                  </h3>
                  {project.highlights && (
                    <div className="flex flex-wrap gap-1.5 mt-2 md:mt-3">
                      {project.highlights.slice(0, 2).map((h) => (
                        <span key={h} className="flex items-center gap-1 text-[9px] md:text-[10px] text-muted-foreground bg-muted/50 px-1.5 md:px-2 py-0.5 rounded">
                          <Star className="w-2.5 h-2.5 text-amber-400" />{h}
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

      {/* Skills Overview */}
      <section className="py-24 border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-primary tracking-widest uppercase mb-4 block">Core Expertise</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              What I <span className="text-primary">Deliver</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Layers, title: 'Game-Ready Assets', desc: 'Optimized 3D props with clean topology, efficient UVs, and PBR materials ready for any game engine' },
              { icon: Building2, title: 'Archviz Renders', desc: 'Photorealistic architectural visualizations that bring designs to life before construction begins' },
              { icon: Lightbulb, title: 'Creative Direction', desc: 'From concept to completion, providing cohesive visual storytelling across all deliverables' },
            ].map((skill, index) => (
              <div 
                key={skill.title}
                className="group relative text-center p-8 rounded-2xl border border-border/30 bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-500 animate-fade-in overflow-hidden hover:animate-bounce hover:scale-105 will-change-transform"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <skill.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{skill.title}</h3>
                <p className="font-body text-muted-foreground text-sm leading-relaxed">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Hub - Blog Section */}
      {latestPosts.length > 0 && (
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <GraduationCap className="w-5 h-5 text-primary" />
                  <span className="font-mono text-xs text-primary tracking-widest uppercase">Learning Hub</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                  Insights & <span className="text-primary">Tutorials</span>
                </h2>
                <p className="font-body text-muted-foreground mt-3 max-w-lg">
                  Sharing knowledge through in-depth breakdowns, workflow tips, and industry perspectives.
                </p>
              </div>
              <Link to={`/blog`}>
                <Button variant="ghost" className="font-body gap-2 text-muted-foreground hover:text-primary">
                  Browse All Articles <ArrowRight size={16} />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Featured Article */}
              {latestPosts[0] && (
                <Link
                  to={`/blog/${latestPosts[0].id}`}
                  className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card hover:border-primary/30 transition-all duration-500 animate-fade-in"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={latestPosts[0].coverImage}
                      alt={latestPosts[0].title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-xs font-mono text-primary bg-primary/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-primary/20">
                        {latestPosts[0].category}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                        <Clock size={12} />
                        5 min read
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {latestPosts[0].title}
                    </h3>
                    <p className="font-body text-muted-foreground line-clamp-2">
                      {latestPosts[0].excerpt}
                    </p>
                    <div className="flex items-center gap-2 mt-5 text-primary font-body text-sm group-hover:gap-3 transition-all">
                      Read Full Article <ChevronRight size={16} />
                    </div>
                  </div>
                </Link>
              )}

              {/* Article List */}
              <div className="flex flex-col gap-6">
                {latestPosts.slice(1, 3).map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.id}`}
                    className="group flex gap-6 p-4 bg-card/50 border border-border/30 rounded-xl hover:border-primary/30 hover:bg-card transition-all duration-500 animate-fade-in"
                    style={{ animationDelay: `${(index + 1) * 0.15}s` }}
                  >
                    <div className="w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-primary">{post.category}</span>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock size={10} />
                          5 min
                        </span>
                      </div>
                      <h4 className="font-display text-lg font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h4>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground self-center opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
                
                {/* CTA Card */}
                <div className="flex-1 flex items-center justify-center p-8 bg-gradient-to-br from-primary/5 to-accent/5 border border-border/30 rounded-xl">
                  <div className="text-center">
                    <GraduationCap className="w-10 h-10 text-primary mx-auto mb-4 opacity-60" />
                    <p className="font-body text-muted-foreground text-sm mb-4">
                      Explore tutorials, breakdowns, and creative insights
                    </p>
                    <Link to={`/blog`}>
                      <Button variant="outline" size="sm" className="gap-2">
                        View All Posts <ArrowRight size={14} />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {plugins.map((plugin, index) => (
              <div
                key={plugin.id}
                className="group bg-card border border-border/50 rounded-xl p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
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
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Sparkles className="w-10 h-10 text-primary mx-auto mb-6" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Bring Your <span className="text-primary text-glow-green">Vision</span> to Life?
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              Whether you need game-ready props, architectural visualization, or creative consultation — let's create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="font-display gap-3 px-8 py-6 text-base glow-green">
                  Start a Conversation <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="font-display gap-3 px-8 py-6 text-base border-border/50 hover:bg-card/50">
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
