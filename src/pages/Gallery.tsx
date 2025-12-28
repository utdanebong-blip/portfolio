import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout';
import { useProjects } from '@/hooks/usePortfolioData';
import { Box } from 'lucide-react';

export default function Gallery() {
  const { projects } = useProjects();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-20">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
          Project <span className="text-primary">Gallery</span>
        </h1>
        <p className="font-body text-muted-foreground mb-12">A collection of 3D props and game assets</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/gallery/${project.id}`}
              className="group rounded-lg overflow-hidden border border-border bg-card hover-glow"
            >
              <div className="aspect-video overflow-hidden relative">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
              </div>
              <div className="p-4">
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{project.title}</h3>
                <p className="font-body text-sm text-muted-foreground line-clamp-2 mb-3">{project.description}</p>
                {project.software && project.software.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.software.map((s: string) => (
                      <span key={s} className="text-xs bg-secondary/10 border border-border px-2 py-1 rounded font-mono text-muted-foreground">{s}</span>
                    ))}
                  </div>
                )}
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="flex items-center gap-1 text-primary">
                    <Box size={12} /> {project.specs.polyCount.toLocaleString()} polys
                  </span>
                  <span className="text-muted-foreground">{project.specs.textureResolution}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
