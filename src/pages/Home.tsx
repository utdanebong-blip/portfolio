import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, Sparkles, Download, Calendar, Clock, ChevronRight, Palette, Layers, Lightbulb, GraduationCap } from 'lucide-react';
import { projects, plugins, posts } from '@/hooks/usePortfolioData';
import { useEffect, useRef, useState } from 'react';

function TypingQuote() {
  const quote = '“Every polygon tells a story. Every texture holds a memory. I create worlds one asset at a time.”';
  const [text, setText] = useState('');
  const refEl = useRef<HTMLElement | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = refEl.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            let i = 0;
            const type = () => {
              if (i <= quote.length) {
                setText(quote.slice(0, i));
                i++;
                setTimeout(type, 28);
              }
            };
            type();
            obs.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <blockquote ref={refEl as any} className="font-display text-2xl md:text-4xl lg:text-5xl font-light text-foreground leading-relaxed mb-8">
      {text}
      <span className="text-primary" aria-hidden="true">|</span>
    </blockquote>
  );
}

function TypingName() {
  const first = 'UTIBE';
  const second = 'EBONG';
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
    <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-8 tracking-tight animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <span className="text-foreground">{top}</span>
      <br />
      <span className="text-primary text-glow-green">{bottom}{cursor ? '|' : ' '}</span>
    </h1>
  );
}

export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section - Elegant & Artistic */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Artistic background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/20 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border/10 rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 bg-card/50 backdrop-blur-sm mb-8 animate-fade-in">
            <span className="font-mono text-sm tracking-widest text-muted-foreground uppercase">3D Prop Artist & Digital Craftsman</span>
          </div>

          <TypingName />
          
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-4 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Transforming imagination into tangible digital experiences through meticulous craftsmanship and artistic vision.
          </p>
          
          <p className="font-mono text-xs text-primary/60 tracking-wider mb-12 animate-fade-in" style={{ animationDelay: '0.25s' }}>
            BLENDER • SUBSTANCE PAINTER • UNREAL ENGINE
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Link to={`/gallery`}>
              <Button size="lg" className="font-display gap-3 px-8 py-6 text-base glow-green">
                Explore Portfolio <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to={`/about`}>
              <Button size="lg" variant="outline" className="font-display gap-3 px-8 py-6 text-base border-border/50 hover:bg-card/50">
                Learn My Story
              </Button>
            </Link>
          </div>
          
          {/* Scroll indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-primary rounded-full" />
            </div>
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
              <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">CAPTIONSTUDIO</span>
              <div className="h-px w-12 bg-border" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects - Gallery Style */}
      <section className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="font-mono text-xs text-primary tracking-widest uppercase mb-4 block">Selected Works</span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
                Featured <span className="text-primary">Gallery</span>
              </h2>
            </div>
            <Link to={`/gallery`}>
              <Button variant="ghost" className="font-body gap-2 text-muted-foreground hover:text-primary">
                View Complete Collection <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/gallery/${project.id}`}
                className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <div className="flex items-center gap-2 text-xs font-mono text-primary mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Box size={12} />
                    <span>{project.specs.polyCount.toLocaleString()} polygons</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground">{project.title}</h3>
                  <p className="font-body text-sm text-muted-foreground mt-1 line-clamp-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                    {project.description}
                  </p>
                </div>
                {/* Corner accent */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/0 group-hover:border-primary/50 transition-colors duration-500" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-24 bg-gradient-to-b from-card/30 to-background border-y border-border/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="font-mono text-xs text-primary tracking-widest uppercase mb-4 block">Expertise</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Crafted With <span className="text-primary">Precision</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Layers, title: '3D Modeling', desc: 'High-fidelity game-ready assets with optimized topology for real-time rendering' },
              { icon: Palette, title: 'Texturing', desc: 'PBR workflows delivering photorealistic materials that breathe life into every surface' },
              { icon: Lightbulb, title: 'Art Direction', desc: 'Cohesive visual storytelling that elevates projects from concept to completion' },
            ].map((skill, index) => (
              <div 
                key={skill.title}
                className="group text-center p-8 rounded-2xl border border-border/30 bg-card/30 hover:bg-card/60 hover:border-primary/20 transition-all duration-500 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6 group-hover:scale-110 transition-transform duration-300">
                  <skill.icon className="w-7 h-7 text-primary" />
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

      {/* Final CTA */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-card/30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
              Let's Create <span className="text-primary text-glow-green">Together</span>
            </h2>
            <p className="font-body text-lg text-muted-foreground mb-10">
              Have a project in mind? I'd love to hear about it and explore how we can bring your vision to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to={`/contact`}>
                <Button size="lg" className="font-display gap-3 px-10 py-6 text-base glow-green">
                  Start a Conversation <ArrowRight size={18} />
                </Button>
              </Link>
              <Link to={`/about`}>
                <Button size="lg" variant="outline" className="font-display px-10 py-6 text-base border-border/50">
                  About Me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
