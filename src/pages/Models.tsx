import React, { useEffect, useState } from 'react';
import { Layout } from '@/components/layout';
import { InteractiveModelViewer } from '@/components/3d/InteractiveModelViewer';
import { Box, ArrowUp } from 'lucide-react';

const ALL_MODELS = [
  {
    id: 'helmet',
    title: 'Damaged Helmet',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/DamagedHelmet/glTF-Binary/DamagedHelmet.glb',
    category: 'Props',
    description: 'Sci-fi helmet featuring battle damage, PBR materials, and emissive elements.',
  },
  {
    id: 'avocado',
    title: 'Avocado',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Avocado/glTF-Binary/Avocado.glb',
    category: 'Organic',
    description: 'Organic food model with realistic texturing and subsurface detail.',
  },
  {
    id: 'lantern',
    title: 'Lantern',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Lantern/glTF-Binary/Lantern.glb',
    category: 'Props',
    description: 'Vintage lantern with glass, metal, and emissive flame materials.',
  },
  {
    id: 'duck',
    title: 'Duck',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/Duck/glTF-Binary/Duck.glb',
    category: 'Character',
    description: 'Classic rubber duck — a staple test model in 3D graphics.',
  },
  {
    id: 'water-bottle',
    title: 'Water Bottle',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/WaterBottle/glTF-Binary/WaterBottle.glb',
    category: 'Product',
    description: 'Reusable water bottle with metallic and transparent materials.',
  },
  {
    id: 'boom-box',
    title: 'Boom Box',
    url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/BoomBox/glTF-Binary/BoomBox.glb',
    category: 'Props',
    description: 'Retro boom box with detailed knobs, speakers, and cassette deck.',
  },
];

const CATEGORIES = ['All', ...Array.from(new Set(ALL_MODELS.map(m => m.category)))];

interface ModelsErrorBoundaryProps {
  children: React.ReactNode;
}

class ModelsErrorBoundary extends React.Component<ModelsErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ModelsErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: any) {
    console.error('Models page error:', error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="container mx-auto px-4 py-12">
          <h2 className="font-display text-2xl text-foreground mb-2">Models — failed to load viewer</h2>
          <p className="text-muted-foreground">An error occurred while loading the interactive viewer.</p>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

export default function Models(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedModel, setSelectedModel] = useState(ALL_MODELS[0]);
  const [mobileTab, setMobileTab] = useState<'viewer' | 'list'>('viewer');

  const filtered = activeCategory === 'All' ? ALL_MODELS : ALL_MODELS.filter(m => m.category === activeCategory);

  useEffect(() => {
    if (!filtered.some(m => m.id === selectedModel.id)) {
      setSelectedModel(filtered[0] || ALL_MODELS[0]);
    }
    // Intentionally only watch activeCategory to avoid extra renders
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const categoryButtonClass = (cat: string) => {
    if (activeCategory === cat) return 'px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all border bg-primary text-primary-foreground border-primary';
    return 'px-4 py-2 rounded-full font-mono text-xs tracking-wider transition-all border bg-card/50 text-muted-foreground border-border/30 hover:border-primary/50';
  };

  return (
    <Layout>
      <ModelsErrorBoundary>
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Box size={20} className="text-primary" />
                <span className="font-mono text-xs text-primary tracking-widest uppercase">Model Lab</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-3">
                3D Model <span className="text-primary text-glow-green">Interactions</span>
              </h1>
              <p className="font-body text-muted-foreground text-lg max-w-2xl">
                Select a model to interact with. Change colors, toggle wireframe, and explore exploded views using the controls.
              </p>
            </div>

            <div className="mb-4 lg:hidden">
              <div className="inline-flex rounded-xl bg-card/30 p-1">
                <button onClick={() => setMobileTab('viewer')} className={mobileTab === 'viewer' ? 'px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground' : 'px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground'}>
                  Viewer
                </button>
                <button onClick={() => setMobileTab('list')} className={mobileTab === 'list' ? 'px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground' : 'px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground'}>
                  List
                </button>
              </div>
            </div>

            {mobileTab === 'viewer' && (
              <div className="mb-6 block lg:hidden">
                <InteractiveModelViewer
                  key={`${selectedModel.id}-mobile`}
                  modelUrl={selectedModel.url}
                  title={selectedModel.title}
                  className="w-full rounded-2xl overflow-hidden h-[60vh] min-h-[360px]"
                />
              </div>
            )}

            <div className="flex flex-wrap gap-2 mb-8">
              {CATEGORIES.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} aria-pressed={activeCategory === cat} className={categoryButtonClass(cat)}>
                  {cat}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-4 space-y-3">
                {filtered.map(model => {
                  const isActive = selectedModel.id === model.id;
                  const itemClass = isActive ? 'w-full text-left p-5 rounded-2xl border transition-all bg-primary/10 border-primary/50' : 'w-full text-left p-5 rounded-2xl border transition-all bg-card/30 border-border/20 hover:border-primary/30';
                  const titleClass = isActive ? 'font-display text-base font-bold mb-1 text-primary' : 'font-display text-base font-bold mb-1 text-foreground';
                  return (
                    <button key={model.id} onClick={() => setSelectedModel(model)} aria-current={isActive ? 'true' : undefined} className={itemClass}>
                      <h3 className={titleClass}>{model.title}</h3>
                      <p className="font-body text-xs text-muted-foreground line-clamp-2">{model.description}</p>
                      <span className="inline-block mt-2 px-2 py-0.5 rounded-full bg-secondary/50 text-[10px] font-mono text-muted-foreground">{model.category}</span>
                    </button>
                  );
                })}
              </div>

              <div className="lg:col-span-8 hidden lg:block">
                <InteractiveModelViewer key={selectedModel.id} modelUrl={selectedModel.url} title={selectedModel.title} className="h-[600px] sticky top-24" />
              </div>
            </div>
          </div>
        </section>

        
      </ModelsErrorBoundary>
    </Layout>
  );
}
