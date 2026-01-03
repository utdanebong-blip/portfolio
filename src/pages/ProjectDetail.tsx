import { useParams, Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Layout } from '@/components/layout';
import { getProject } from '@/hooks/usePortfolioData';
import { ModelViewerPlaceholder } from '@/components/3d';
import { ArrowLeft, Box, Layers, Grid3X3, RotateCcw, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'rendered' | 'wireframe' | 'uv' | '3d';

export default function ProjectDetail() {
  const { id } = useParams();
  const project = getProject(id || '');
  const [viewMode, setViewMode] = useState<ViewMode>('rendered');
  const [selectedExtraIndex, setSelectedExtraIndex] = useState<number | null>(null);
  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Project not found</h1>
          <Link to={`/gallery`}><Button>Back to Gallery</Button></Link>
        </div>
      </Layout>
    );
  }

  const galleryExtras = useMemo(() => {
    if (!project) return [] as Array<{ src: string; link?: string }>;
    const extrasRaw = (project.images as any).renderedExtras || [];
    const extras = Array.isArray(extrasRaw)
      ? extrasRaw.map((e: any) => (typeof e === 'string' ? { src: e, link: undefined } : { src: e.src || e.rendered || '', link: e.link }))
      : [];
    const combined = extras.slice(0, 6);
    while (combined.length < 6) combined.push({ src: '', link: undefined });
    return combined;
  }, [project]);

  const viewModes: { id: ViewMode; label: string; icon: any }[] = [
    { id: 'rendered', label: 'Rendered', icon: Box },
    { id: 'wireframe', label: 'Wireframe', icon: Grid3X3 },
    { id: 'uv', label: 'UV Map', icon: Layers },
    { id: '3d', label: '3D View', icon: RotateCcw },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <Link to={`/gallery`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-body">
          <ArrowLeft size={16} /> Back to Gallery
        </Link>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Viewer */}
          <div>
            {/* View Mode Dots */}
            <div className="flex justify-center gap-2 mb-4">
              {viewModes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => setViewMode(mode.id)}
                  className={`w-3 h-3 rounded-full transition-all ${viewMode === mode.id ? 'bg-primary scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground'}`}
                  title={mode.label}
                />
              ))}
            </div>

            {/* Image/3D Display */}
            <div className="aspect-video rounded-lg overflow-hidden border border-border bg-secondary/30">
              {viewMode === '3d' ? (
                <ModelViewerPlaceholder className="w-full h-full" />
              ) : (
                <img
                  src={
                    viewMode === 'rendered'
                      ? (selectedExtraIndex !== null && galleryExtras[selectedExtraIndex]?.src ? galleryExtras[selectedExtraIndex].src : project.images.rendered)
                      : viewMode === 'wireframe'
                      ? project.images.wireframe
                      : project.images.uv
                  }
                  alt={`${project.title} - ${viewMode}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Rendered thumbnails (6 slots) */}
            <div className="mt-4">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {galleryExtras.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedExtraIndex(idx);
                      setViewMode('rendered');
                    }}
                    className={`relative overflow-hidden rounded-md border transition-shadow focus:outline-none w-full ${selectedExtraIndex === idx ? 'ring-2 ring-primary' : 'ring-0'}`}
                    aria-label={`Rendered extra ${idx + 1}`}
                  >
                    {item.src ? (
                      <img src={item.src} alt={`${project.title} extra ${idx + 1}`} loading="lazy" decoding="async" className="w-full h-20 sm:h-24 object-cover" />
                    ) : (
                      <div className="w-full h-20 sm:h-24 bg-muted-foreground/10 flex items-center justify-center text-muted-foreground">+</div>
                    )}
                    {item.link && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-1 right-1 bg-card/80 rounded p-1 shadow-sm"
                        aria-label={`Open file ${idx + 1} in new tab`}
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode Labels */}
            <div className="flex justify-center gap-4 mt-4">
              {viewModes.map((mode) => {
                const Icon = mode.icon;
                return (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded text-sm font-body transition-all ${viewMode === mode.id ? 'bg-primary/20 text-primary border border-primary/50' : 'text-muted-foreground hover:text-foreground'}`}
                  >
                    <Icon size={14} /> {mode.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h1 className="font-display text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
              <p className="font-body text-muted-foreground">{project.description}</p>
            </div>

            {/* Specs */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-display text-lg font-semibold mb-4 text-primary">Technical Specs</h3>
              <div className="grid grid-cols-2 gap-4 font-mono text-sm">
                <div><span className="text-muted-foreground">Poly Count:</span> <span className="text-foreground">{project.specs.polyCount.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Vertices:</span> <span className="text-foreground">{project.specs.vertexCount.toLocaleString()}</span></div>
                <div><span className="text-muted-foreground">Texel Density:</span> <span className="text-foreground">{project.specs.texelDensity}</span></div>
                <div><span className="text-muted-foreground">Materials:</span> <span className="text-foreground">{project.specs.materialSlots}</span></div>
                <div><span className="text-muted-foreground">Resolution:</span> <span className="text-foreground">{project.specs.textureResolution}</span></div>
                <div><span className="text-muted-foreground">File Size:</span> <span className="text-foreground">{project.specs.fileSize}</span></div>
              </div>
            </div>

            {/* Software */}
            <div>
              <h3 className="font-display text-lg font-semibold mb-4">Software Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.software.map((sw) => (
                  <span key={sw} className="px-3 py-1 rounded bg-secondary text-secondary-foreground font-body text-sm">{sw}</span>
                ))}
              </div>
            </div>

            {project.process && (
              <div>
                <h3 className="font-display text-lg font-semibold mb-4">Process</h3>
                <p className="font-body text-muted-foreground">{project.process}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
