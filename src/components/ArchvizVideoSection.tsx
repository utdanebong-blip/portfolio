import { ArrowRight, Building2, ExternalLink, MapPin, Play, Volume2, VolumeX } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

// Archviz Section with Auto-playing Video
export default function ArchvizVideoSection({ featuredArchviz }: { featuredArchviz: any[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && videoRef.current) {
          // attempt to play; browsers may block autoplay with sound
          void videoRef.current.play();
          setIsPlaying(true);
        } else if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted((m) => !m);
    }
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/[0.02] to-background" />

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-accent/20 bg-accent/5 backdrop-blur-sm mb-6">
            <Building2 className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs text-accent tracking-widest uppercase">Architecture</span>
          </div>
          <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4">
            Architectural <span className="text-accent text-glow-purple">Vision</span>
          </h2>
          <p className="font-body text-muted-foreground text-lg max-w-2xl mx-auto">
            Transforming architectural concepts into breathtaking photorealistic experiences
          </p>
        </div>

        {/* Video Showcase */}
        <div className="relative rounded-[2rem] overflow-hidden mb-8 group">
          <div className="aspect-[21/9] relative">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              autoPlay
              loop
              playsInline
              preload="auto"
              poster={featuredArchviz[0]?.thumbnail}
            >
              <source src={featuredArchviz[0]?.video || '/assets/archviz.mp4'} type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

            <div className={`absolute top-3 left-3 hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 backdrop-blur-xl border border-accent/30 transition-opacity duration-500 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="font-mono text-xs text-accent">LIVE RENDER</span>
            </div>

            <button
              onClick={toggleMute}
              className="absolute top-3 right-3 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-card/80 backdrop-blur-xl border border-border/50 flex items-center justify-center hover:bg-card hover:border-accent/50 transition-all duration-300"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={18} className="text-muted-foreground" /> : <Volume2 size={18} className="text-accent" />}
            </button>

            {featuredArchviz[0] && (
              <div className="absolute bottom-0 left-0 p-4 md:p-16 max-w-full md:max-w-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className={cn(
                    "px-2 py-1 rounded-full text-[10px] font-medium backdrop-blur-md",
                    featuredArchviz[0].specs.status === 'Completed'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  )}>
                    {featuredArchviz[0].specs.status}
                  </span>
                  <span className="hidden sm:inline-flex px-3 py-1.5 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30 backdrop-blur-md flex items-center gap-2">
                    <Play size={10} className="fill-current" /> Cinematic Tour
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-5xl font-bold text-foreground mb-4">
                  {featuredArchviz[0].title}
                </h3>
                <p className="font-body text-muted-foreground text-sm mb-4 max-w-lg hidden md:block">
                  {featuredArchviz[0].description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    {featuredArchviz[0].specs.location}
                  </span>
                  <span className="flex items-center gap-2">
                    <Building2 size={14} className="text-accent" />
                    {featuredArchviz[0].specs.area}
                  </span>
                </div>
              </div>
            )}

            <Link to="/gallery?tab=archviz" className="hidden md:block absolute bottom-8 right-8 md:bottom-16 md:right-16">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-accent/20 backdrop-blur-xl border border-accent/30 flex items-center justify-center hover:scale-110 hover:bg-accent/30 transition-all duration-300">
                <ExternalLink size={24} className="text-accent" />
              </div>
            </Link>
          </div>
        </div>

        {/* Compact mobile CTA */}
        <div className="md:hidden text-center mt-4">
          <Link to="/gallery?tab=archviz">
            <Button size="sm" className="px-4 py-2 rounded-xl">View Project</Button>
          </Link>
        </div>

        <div className="text-center mt-12">
          <Link to="/gallery?tab=archviz">
            <Button variant="outline" className="font-display gap-3 border-accent/30 text-accent hover:bg-accent/10 rounded-2xl px-8 py-6">
              Explore All Projects <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
