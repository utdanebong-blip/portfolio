import { Suspense, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import { Loader2, RotateCcw, ZoomIn, ZoomOut, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ModelProps {
  url: string;
  wireframe?: boolean;
}

function Model({ url, wireframe = false }: ModelProps) {
  const { scene } = useGLTF(url);
  
  // Apply wireframe material if needed
  scene.traverse((child: any) => {
    if (child.isMesh) {
      child.material.wireframe = wireframe;
    }
  });

  return <primitive object={scene} scale={1} />;
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 text-primary">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="font-mono text-sm">Loading Model...</span>
      </div>
    </Html>
  );
}

interface ModelViewerProps {
  modelUrl: string;
  className?: string;
}

export function ModelViewer({ modelUrl, className = '' }: ModelViewerProps) {
  const controlsRef = useRef<any>(null);
  const [wireframe, setWireframe] = useState(false);

  const resetCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  };

  return (
    <div className={`relative bg-secondary/50 rounded-lg border border-border overflow-hidden ${className}`}>
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <Button
          size="sm"
          variant="secondary"
          onClick={resetCamera}
          className="bg-background/80 backdrop-blur-sm"
          title="Reset Camera"
        >
          <RotateCcw size={16} />
        </Button>
        <Button
          size="sm"
          variant={wireframe ? "default" : "secondary"}
          onClick={() => setWireframe(!wireframe)}
          className="bg-background/80 backdrop-blur-sm"
          title="Toggle Wireframe"
        >
          {wireframe ? 'Solid' : 'Wire'}
        </Button>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 z-10 flex gap-3 text-xs text-muted-foreground font-mono bg-background/60 backdrop-blur-sm px-3 py-2 rounded">
        <span className="flex items-center gap-1">
          <Move size={12} /> Drag to rotate
        </span>
        <span className="flex items-center gap-1">
          <ZoomIn size={12} /> Scroll to zoom
        </span>
      </div>

      <Canvas
        camera={{ position: [3, 2, 5], fov: 50 }}
        className="w-full h-full"
        style={{ minHeight: '400px' }}
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          <Model url={modelUrl} wireframe={wireframe} />
          <ContactShadows
            position={[0, -1, 0]}
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
          />
          <Environment preset="studio" />
          <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={10}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

// Placeholder component when no model is available
// Note: Placeholder moved to a lightweight module to avoid pulling react-three/fiber
