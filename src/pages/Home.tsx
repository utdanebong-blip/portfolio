import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, Box, Sparkles, Download, Calendar, Clock, ChevronRight, Palette, Layers, Lightbulb, GraduationCap, Gamepad2, Zap, Building2, MapPin, Briefcase, Package, Star, ArrowUpRight, BookOpen, Play } from 'lucide-react';
import { projects, plugins, posts, archvizProjects, productVizProjects, showreel } from '@/hooks/usePortfolioData';
import { useEffect, useRef, useState } from 'react';
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
    title: 'The Art of 3D Modeling',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop',
    category: '3D Art',
  },
  {
    id: '2',
    title: 'Game Asset Creation',
    cover: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=600&fit=crop',
    category: 'Game Dev',
  },
  {
    id: '3',
    title: 'Digital Sculpting Mastery',
    cover: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop',
    category: 'Sculpting',
  },
];
export default function Home() {
  const featuredProjects = projects.slice(0, 3);
  const latestPosts = posts.slice(0, 3);
  const featuredArchviz = archvizProjects.slice(0, 2);
  const featuredProductViz = productVizProjects.slice(0, 3);
  const featuredShowreel = showreel.slice(0, 1);

  return (
    <Layout>
       {/* Hero Section - Asymmetric & Bold */}
      <section className="min-h-screen relative overflow-hidden bg-background">
        {/* Abstract Background Art */}
        <div className="absolute inset-0">
          {/* Gradient Mesh */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-bl from-primary/5 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-1/2 h-2/3 bg-gradient-to-tr from-accent/5 via-transparent to-transparent" />
          
          {/* Floating Shapes */}
          <div className="absolute top-[15%] right-[10%] w-64 h-64 md:w-96 md:h-96">
            <div className="w-full h-full rounded-full border border-primary/10 animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-8 rounded-full border border-accent/10 animate-[spin_40s_linear_infinite_reverse]" />
            <div className="absolute inset-16 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-3xl" />
          </div>
          
          {/* Grid Lines - Artistic */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground to-transparent" />
            <div className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground to-transparent" />
            <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-foreground to-transparent" />
            <div className="absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-foreground to-transparent" />
            <div className="absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-foreground to-transparent" />
            <div className="absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent via-foreground to-transparent" />
          </div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center">
              {/* Left: Content */}
              <div className="pt-24 lg:pt-0">
                {/* Status Badge - Unique Shape */}
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="flex items-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full border border-border/50">
                    <div className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </div>
                    <span className="font-mono text-xs tracking-widest text-primary uppercase">Open for Work</span>
                  </div>
                </div>

                {/* Hero Title - Split Design */}
                <div className="space-y-2 mb-8">
                  <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.9]">
                    DIGITAL
                  </h1>
                  <div className="flex items-center gap-4">
                    <div className="hidden sm:block h-1 w-16 bg-gradient-to-r from-primary to-transparent rounded-full" />
                    <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary text-glow-green leading-[0.9]">
                      ARTISAN
                    </h1>
                  </div>
                </div>

                {/* Description - Minimal */}
                <p className="font-body text-lg md:text-xl text-muted-foreground max-w-lg mb-8 leading-relaxed">
                  Crafting immersive 3D experiences with passion and precision
                </p>

                {/* Specialty Tags - Artistic Pills */}
                <div className="flex flex-wrap gap-3 mb-10">
                  {[
                    { icon: Gamepad2, label: 'Game Props', color: 'primary' },
                    { icon: Building2, label: 'Archviz', color: 'accent' },
                    { icon: Package, label: 'Product Viz', color: 'neon-orange' },
                  ].map((item) => (
                    <div 
                      key={item.label}
                      className="group flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 border border-border/50 hover:border-primary/50 transition-all duration-300 cursor-default"
                    >
                      <item.icon size={14} className="text-primary" />
                      <span className="font-mono text-xs tracking-wider text-muted-foreground group-hover:text-foreground transition-colors">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTAs - Asymmetric */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/gallery">
                    <Button size="lg" className="w-full sm:w-auto font-display gap-3 px-8 py-6 text-base rounded-2xl glow-green group">
                      View Portfolio 
                      <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link to="/contact">
                    <Button size="lg" variant="outline" className="w-full sm:w-auto font-display gap-3 px-8 py-6 text-base rounded-2xl border-border/50 hover:bg-card hover:border-primary/30">
                      Let's Talk
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Right: Visual Element - Abstract Art */}
              <div className="hidden lg:flex justify-center items-center relative">
                <div className="relative w-[600px] h-[750px]">
                  {/* Stacked Cards Preview */}
                  {featuredProjects.slice(0, 3).map((project, index) => (
                    <Link
                      key={project.id}
                      to={`/gallery/${project.id}`}
                      className="absolute group cursor-pointer"
                      style={{
                        top: `${index * 90}px`,
                        left: `${index * 45}px`,
                        zIndex: 3 - index,
                        transform: `rotate(${-5 + index * 5}deg)`,
                      }}
                    >
                      <div className="w-[420px] h-[300px] rounded-2xl overflow-hidden border-2 border-border/50 bg-card shadow-2xl group-hover:scale-105 group-hover:shadow-primary/20 transition-all duration-500">
                        <img
                          src={project.thumbnail}
                          alt={project.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="absolute bottom-4 left-4 right-4">
                            <p className="font-display text-base font-semibold text-foreground truncate">{project.title}</p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                  
                  {/* Decorative Elements */}
                  <div className="absolute -bottom-10 -right-10 w-20 h-20 border border-primary/20 rounded-full" />
                  <div className="absolute -top-5 -left-5 w-10 h-10 bg-primary/10 rounded-lg rotate-45" />
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
      <section className="py-20 md:py-32 relative overflow-hidden">
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
            <ShowreelVideoSection featuredShowreel={featuredShowreel} />
            {/* Archviz Section - Cinematic with Video */}
            <ArchvizVideoSection featuredArchviz={featuredArchviz} /> 
            {/* ProductViz Section - Cinematic with Video (shared UI) */}
            <ProductVizVideoSection featuredProductViz={featuredProductViz} />
            <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/20">
                  <Play className="w-6 h-6 text-primary" />
                </div>
                <div className="h-px flex-1 bg-gradient-to-r from-primary/50 to-transparent" />
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
