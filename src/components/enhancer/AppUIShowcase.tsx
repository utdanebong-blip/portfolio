import { useState } from 'react';
import { Monitor, Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Layers, Image as ImageIcon, Type, Settings, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const appScreens = [
  {
    id: 1,
    title: 'Main Interface',
    description: 'Clean, intuitive workspace with before/after comparison slider',
    icon: Monitor,
  },
  {
    id: 2,
    title: 'Batch Processing',
    description: 'Queue and process multiple renders simultaneously',
    icon: Layers,
  },
  {
    id: 3,
    title: 'Reference Matching',
    description: 'Match color grading from any reference image',
    icon: ImageIcon,
  },
  {
    id: 4,
    title: 'Watermark Editor',
    description: 'Add professional watermarks with full customization',
    icon: Type,
  },
];

export function AppUIShowcase() {
  const [activeScreen, setActiveScreen] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleNext = () => {
    setActiveScreen((prev) => (prev + 1) % appScreens.length);
  };

  const handlePrev = () => {
    setActiveScreen((prev) => (prev - 1 + appScreens.length) % appScreens.length);
  };

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary mb-6">
            <Monitor size={16} />
            <span className="font-mono text-sm">APP INTERFACE</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Preview the <span className="text-primary">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A sleek, professional interface designed for architectural visualization workflows
          </p>
        </div>

        {/* App Window Mockup */}
        <div className="relative">
          {/* Desktop Frame */}
          <div className="bg-card/80 backdrop-blur-xl rounded-2xl border border-border/50 overflow-hidden shadow-2xl shadow-primary/10">
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-muted/50 border-b border-border/50">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="ml-4 font-mono text-xs text-muted-foreground">Archviz Enhancer</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-1 hover:bg-muted rounded transition-colors"
                >
                  <Maximize2 size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* App Content Area */}
            <div className="aspect-video relative bg-gradient-to-br from-muted/30 to-background">
            <img src={`${import.meta.env.BASE_URL}full.png`} alt="before" className="w-full h-full object-cover opacity-95" />
                    </div>
             
            </div>
          </div>

          {/* Screen Selector */}
          <div className="flex justify-center gap-4 mt-8">
            {appScreens.map((screen, idx) => {
              const Icon = screen.icon;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreen(idx)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-300 ${
                    idx === activeScreen
                      ? 'bg-primary/10 border-primary/30 text-primary'
                      : 'bg-card/50 border-border/30 text-muted-foreground hover:border-border hover:text-foreground'
                  }`}
                >
                  <Icon size={18} />
                  <span className="font-mono text-xs hidden sm:inline">{screen.title}</span>
                </button>
              );
            })}
          </div>

          {/* Current Screen Info */}
          <div className="text-center mt-6">
            <p className="text-muted-foreground text-sm">
              {appScreens[activeScreen].description}
            </p>
          </div>
        </div>
    </section>
  );
}