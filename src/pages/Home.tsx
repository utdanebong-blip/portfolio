import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, Sparkles } from 'lucide-react';
import { useProjects, useTools } from '@/hooks/usePortfolioData';

export default function Home() {
  const { projects } = useProjects();
  const { tools } = useTools();
  const featuredProjects = projects.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 grid-dots opacity-30" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-6 animate-scale-in">
            <Sparkles size={16} className="text-primary" />
            <span className="font-mono text-sm text-primary">3D Prop Artist</span>
          </div>
          
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-slide-in-up">
            <span className="text-foreground">UTIBE</span>{' '}
            <span className="text-primary text-glow-green">EBONG</span>
          </h1>
          
          <p className="font-body text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 animate-slide-in-up" style={{ animationDelay: '0.1s' }}>
            Crafting immersive game assets that bring virtual worlds to life
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/gallery">
              <Button size="lg" className="font-display gap-2 glow-green">
                View Gallery <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-display">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Featured <span className="text-primary">Works</span>
              </h2>
              <p className="font-body text-muted-foreground">Recent props and game assets</p>
            </div>
            <Link to="/gallery">
              <Button variant="ghost" className="font-body gap-2">
                View All <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/gallery/${project.id}`}
                className="group relative rounded-lg overflow-hidden border border-border bg-card hover-glow animate-slide-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="font-display text-lg font-semibold text-foreground mb-1">{project.title}</h3>
                  <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                    <Box size={12} className="text-primary" />
                    <span>{project.specs.polyCount.toLocaleString()} polys</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tools & Plugins (compact card grid) */}
      <section className="py-12 bg-card/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center gap-2 border-b border-border pb-4 text-center">
            <h2 className="text-xl font-bold leading-tight">Tools & <span className="text-primary">Plugins</span></h2>
            <p className="text-sm text-muted-foreground">Essential tools and plugins used in my game art pipeline. Click a card to visit the official site.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {tools.map((tool) => (
              <div key={tool.id} className="group flex flex-col justify-between rounded-lg border border-border bg-card p-3 text-sm shadow-sm transition-transform hover:-translate-y-0.5 hover:border-primary/50">
                <div>
                  <div className="mb-2 flex items-center justify-center">
                    <span className="rounded-full bg-secondary/5 px-2 py-0.5 text-xs font-semibold text-muted-foreground">{tool.ver}</span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-primary text-center">{tool.name}</h3>
                  <p className="mt-1 text-xs text-muted-foreground text-center">{tool.desc}</p>
                </div>
                <div className="mt-3">
                  <button onClick={() => window.open(tool.url, '_blank', 'noopener')} className="flex w-full items-center justify-center gap-2 rounded-md bg-secondary/10 py-2 text-xs font-semibold text-foreground hover:bg-primary hover:text-white">
                    {tool.actionLabel || 'Visit'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
