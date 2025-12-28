import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { Layout } from '@/components/layout';
import { useProjects } from '@/hooks/usePortfolioData';
import { ModelViewer, ModelViewerPlaceholder } from '@/components/3d/ModelViewer';
import { ArrowLeft, Box, Layers, Grid3X3, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ViewMode = 'rendered' | 'wireframe' | 'uv' | '3d';

export default function ProjectDetail() {
  const { id } = useParams();
  const { getProject } = useProjects();
  const project = getProject(id || '');
  const [viewMode, setViewMode] = useState<ViewMode>('rendered');

  if (!project) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="font-display text-2xl mb-4">Project not found</h1>
          <Link to="/gallery"><Button>Back to Gallery</Button></Link>
        </div>
      </Layout>
    );
  }

  const viewModes: { id: ViewMode; label: string; icon: any }[] = [
    { id: 'rendered', label: 'Rendered', icon: Box },
    { id: 'wireframe', label: 'Wireframe', icon: Grid3X3 },
    { id: 'uv', label: 'UV Map', icon: Layers },
    { id: '3d', label: '3D View', icon: RotateCcw },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <Link to="/gallery" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 font-body">
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
                // show 3D viewer if glb exists
                project.images && (project.images.glb?.url || project.images.glb) ? (
                  <ModelViewer modelUrl={(project.images.glb?.url || project.images.glb) as string} className="w-full h-full" />
                ) : (
                  <ModelViewerPlaceholder className="w-full h-full" />
                )
              ) : (
                <img
                  src={
                    viewMode === 'rendered'
                      ? (project.images?.rendered?.url || project.images?.rendered || project.thumbnail)
                      : viewMode === 'wireframe'
                        ? (project.images?.wireframe?.url || project.images?.wireframe)
                        : (project.images?.uv?.url || project.images?.uv)
                  }
                  alt={`${project.title} - ${viewMode}`}
                  className="w-full h-full object-cover"
                />
              )}
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
                {project.software && project.software.length > 0 ? (
                  project.software.map((sw) => (
                    <span key={sw} className="px-3 py-1 rounded bg-secondary text-secondary-foreground font-body text-sm">{sw}</span>
                  ))
                ) : (
                  <span className="text-sm text-muted-foreground">None listed</span>
                )}
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
