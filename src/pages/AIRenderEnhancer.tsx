import { Link } from 'react-router-dom';
import { ArtisticNav } from '@/components/layout/ArtisticNav';
import { Footer } from '@/components/layout/Footer';
import { 
  Download, 
  Zap, 
  Layers, 
  Image, 
  Type, 
  Cpu, 
  ArrowRight, 
  Check, 
  Sparkles,
  SplitSquareHorizontal,
  Shield,
  Gauge,
  Palette
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

// Feature data
const features = [
  {
    icon: SplitSquareHorizontal,
    title: 'VRay VFB-Style Comparison',
    description: 'Swipe between original and enhanced renders with an intuitive before/after slider. Perfect for client presentations.',
    accent: 'primary'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Enhancement',
    description: 'Advanced neural network upscaling that preserves architectural details while removing noise and artifacts.',
    accent: 'neon-cyan'
  },
  {
    icon: Palette,
    title: 'Reference Image Matching',
    description: 'Match the color grading, lighting mood, and style of any reference image. Achieve consistent visual aesthetics across all your renders.',
    accent: 'neon-orange'
  },
  {
    icon: Shield,
    title: 'Non-Destructive Processing',
    description: 'Your original renders stay untouched. The AI enhances without overwriting, so you never lose your source files.',
    accent: 'neon-green'
  },
  {
    icon: Cpu,
    title: 'GPU Acceleration',
    description: 'Harness your NVIDIA or AMD GPU for blazing-fast processing. Enhance 4K renders in seconds, not minutes.',
    accent: 'accent'
  },
  {
    icon: Layers,
    title: 'Batch Processing',
    description: 'Queue up hundreds of renders and let the enhancer work through them automatically. Set it and forget it.',
    accent: 'primary'
  },
  {
    icon: Type,
    title: 'Smart Watermarking',
    description: 'Add text or image watermarks with full control over position, opacity, and scaling. Protect your work professionally.',
    accent: 'neon-cyan'
  }
];

// All features included (free testing version)
const allFeatures = [
  'AI Enhancement (Unlimited Resolution)',
  'Reference Image Matching',
  'Before/After Comparison',
  'Text & Image Watermarks',
  'Batch Processing',
  'GPU Acceleration',
  '4K+ Resolution Support',
  'Non-Destructive Processing'
];

export default function AIRenderEnhancer() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sliderPosition, setSliderPosition] = useState(50);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ArtisticNav />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          <div 
            className="absolute w-[800px] h-[800px] rounded-full opacity-20 blur-3xl transition-all duration-1000 ease-out"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)) 0%, transparent 70%)',
              left: mousePosition.x - 400,
              top: mousePosition.y - 400,
            }}
          />
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute inset-0 scanlines opacity-10" />
          
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary/20 rounded-full animate-[spin_30s_linear_infinite]" />
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-neon-cyan/20 rounded-full animate-[spin_25s_linear_infinite_reverse]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8">
            <img
              src={`${import.meta.env.BASE_URL}assets/archviz-enhancer-logo.png`}
              alt="Archviz Enhancer"
              className="h-32 md:h-40 mx-auto"
            />
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green mb-8">
            <Sparkles size={16} className="animate-pulse" />
            <span className="font-mono text-sm">FREE FOR TESTING</span>
          </div>

          {/* Title */}
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            <span className="text-foreground">AI Archviz</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-neon-cyan to-primary bg-clip-text text-transparent">
              Render Enhancer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
            Transform your architectural renders with AI-powered enhancement. 
            <span className="text-foreground font-medium"> Non-destructive</span>, 
            <span className="text-foreground font-medium"> GPU-accelerated</span>, and 
            <span className="text-foreground font-medium"> batch-ready</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button 
              size="lg" 
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-xl shadow-lg shadow-primary/30"
            >
              <Download className="mr-2 group-hover:animate-bounce" size={20} />
              Download Free
            </Button>
            <a href={`${import.meta.env.BASE_URL}assets/Archviz_Render_Enhancer_Pro_Documentation.html`} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button 
                size="lg" 
                variant="outline"
                className="group border-2 border-primary/50 hover:bg-primary/10 px-8 py-6 text-lg rounded-xl"
              >
                View Documentation
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </a>
          </div>

          {/* Comparison Preview */}
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/10 bg-card/50 backdrop-blur-sm">
            {/* Fake comparison slider UI */}
            <div className="aspect-video relative bg-gradient-to-br from-muted to-muted/50">
              {/* Before side - original image */}
              <div 
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <img src={`${import.meta.env.BASE_URL}original.png`} alt="before" className="w-full h-full object-cover opacity-95" />
                <div className="absolute left-4 bottom-4 px-3 py-1.5 rounded bg-background/70 text-xs font-mono">BEFORE</div>
              </div>

              {/* After side - enhanced image */}
              <div 
                className="absolute inset-0 flex items-center justify-center overflow-hidden"
                style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
              >
                <img src={`${import.meta.env.BASE_URL}enhance.png`} alt="enhanced" className="w-full h-full object-cover" />
                <div className="absolute right-4 bottom-4 px-3 py-1.5 rounded bg-primary/90 text-xs font-mono text-primary-foreground">ENHANCED</div>
              </div>

              {/* Slider */}
              <div 
                className="absolute top-0 bottom-0 w-1 bg-white/80 cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
                  <SplitSquareHorizontal size={20} className="text-background" />
                </div>
              </div>

              {/* Slider input */}
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
              />
            </div>

            {/* HUD elements */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-background/80 backdrop-blur-sm border border-border text-xs font-mono">
              ORIGINAL
            </div>
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-primary/80 backdrop-blur-sm text-primary-foreground text-xs font-mono">
              AI ENHANCED
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
        
        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to take your architectural renders to the next level
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl bg-${feature.accent}/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon size={28} className={`text-${feature.accent}`} />
                    </div>
                    <h3 className="font-display text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Free Version Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-green/5 to-background" />
          <div className="absolute inset-0 grid-pattern opacity-20" />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `url('${import.meta.env.BASE_URL}assets/comparison-bg.png')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.18,
              transform: 'scale(1.03) rotate(-2deg)',
              filter: 'saturate(0.85) blur(2px) contrast(1.05)',
              mixBlendMode: 'overlay'
            }}
          />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-green/10 border border-neon-green/30 text-neon-green mb-6">
              <Sparkles size={16} />
              <span className="font-mono text-sm">FREE TESTING VERSION</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              All Features Unlocked
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Download and test all features completely free. Help us improve the app with your feedback!
            </p>
          </div>

          <div className="bg-gradient-to-b from-card/80 to-card/50 border-2 border-neon-green/30 rounded-3xl p-10 shadow-xl shadow-neon-green/10 backdrop-blur-sm relative z-20">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-1 mb-2">
                <span className="font-display text-6xl font-bold text-neon-green">$0</span>
                <span className="text-muted-foreground text-lg">/forever</span>
              </div>
              <p className="text-muted-foreground">Free for testing purposes</p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {allFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-neon-green/20 flex items-center justify-center flex-shrink-0">
                    <Check size={14} className="text-neon-green" />
                  </div>
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>

            {/* Download Button */}
            <Button 
              size="lg"
              className="w-full py-7 text-lg rounded-xl bg-neon-green hover:bg-neon-green/90 text-background shadow-lg shadow-neon-green/30"
            >
              <Download className="mr-2" size={22} />
              Download Now — It's Free
            </Button>

            <p className="text-center mt-6 text-sm text-muted-foreground">
              Windows 10/11 • No subscription required • Help us test!
            </p>
          </div>
        </div>
      </section>

      {/* GPU Acceleration Banner */}
      <section className="py-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-orange/10 via-primary/10 to-neon-cyan/10" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Gauge size={48} className="text-neon-orange" />
            <Zap size={32} className="text-primary animate-pulse" />
            <Cpu size={48} className="text-neon-cyan" />
          </div>
          
          <h3 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Up to <span className="text-primary">10x Faster</span> with GPU Acceleration
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Leverage your NVIDIA CUDA or AMD OpenCL capable GPU to process renders at lightning speed. 
            What used to take minutes now takes seconds.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-mono text-muted-foreground">
            <span className="px-4 py-2 rounded-lg bg-card/50 border border-border">NVIDIA CUDA</span>
            <span className="px-4 py-2 rounded-lg bg-card/50 border border-border">AMD OpenCL</span>
            <span className="px-4 py-2 rounded-lg bg-card/50 border border-border">CPU Fallback</span>
          </div>
        </div>
      </section>

      {/* Reference Image Matching Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-neon-orange/5 to-background" />
        
        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neon-orange/10 border border-neon-orange/30 text-neon-orange mb-6">
                <Palette size={16} />
                <span className="font-mono text-sm">NEW FEATURE</span>
              </div>
              
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
                Reference Image <span className="text-neon-orange">Matching</span>
              </h2>
              
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Drop any reference image and let AI match its color grading, lighting mood, and overall aesthetic. 
                Perfect for maintaining consistency across project renders or matching a specific visual style.
              </p>
              
              <div className="space-y-4">
                {[
                  'Match color grading from any reference',
                  'Transfer lighting mood and atmosphere',
                  'Maintain consistency across renders',
                  'Works with any image format'
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-neon-orange/20 flex items-center justify-center">
                      <Check size={14} className="text-neon-orange" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual */}
            <div className="relative">
              <div className="bg-card/50 border border-border/50 rounded-3xl p-6 backdrop-blur-xl">
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square rounded-xl bg-muted/50 border border-border/30 flex items-center justify-center">
                    <div className="text-center">
                      <img
                      src={`${import.meta.env.BASE_URL}assets/frames/ref.png`}
                      alt="Reference"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = import.meta.env.BASE_URL + 'assets/frames/ref.svg'; }}
                      className="w-full h-full object-cover"
                      />
                      <p className="font-mono text-xs text-muted-foreground">Reference</p>
                    </div>
                  </div>
                  <div className="aspect-square rounded-xl bg-gradient-to-br from-neon-orange/20 to-primary/20 border border-neon-orange/30 flex items-center justify-center">
                    <div className="text-center">
                      <img
                      src={`${import.meta.env.BASE_URL}assets/frames/matched.png`}
                      alt="Matched"
                      onError={(e) => { (e.currentTarget as HTMLImageElement).src = import.meta.env.BASE_URL + 'assets/frames/matched.svg'; }}
                      className="w-full h-full object-cover"
                      />
                      <p className="font-mono text-xs text-neon-orange">Matched</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <ArrowRight size={16} className="text-primary" />
                  <span>Style Transfer Applied</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
            Ready to Enhance Your Renders?
          </h2>
          <p className="text-muted-foreground text-xl mb-10 max-w-2xl mx-auto">
            Join archviz professionals using AI Render Enhancer to deliver stunning visuals. Free to download and test!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="group bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-7 text-xl rounded-2xl shadow-xl shadow-primary/30"
            >
              <Download className="mr-2 group-hover:animate-bounce" size={24} />
              Download Now — It's Free
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Windows 10/11 • No subscription required • All features unlocked
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}