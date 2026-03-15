import React, { Suspense, useRef, useState, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, ContactShadows, Html } from '@react-three/drei';
import { Loader2, RotateCcw, Palette, Layers, Move, ZoomIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import * as THREE from 'three';

const PRESET_COLORS = [
  { name: 'Default', value: null },
  { name: 'Crimson', value: '#dc2626' },
  { name: 'Ocean', value: '#2563eb' },
  { name: 'Forest', value: '#16a34a' },
  { name: 'Gold', value: '#eab308' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Slate', value: '#64748b' },
  { name: 'White', value: '#f8fafc' },
];

interface InteractiveModelProps {
  url: string;
  color: string | null;
  exploded: boolean;
  wireframe: boolean;
  autoRotate?: boolean;
  onBoundsCalculated?: (center: THREE.Vector3, radius: number) => void;
}
function InteractiveModel({ url, color, exploded, wireframe, autoRotate, onBoundsCalculated }: InteractiveModelProps) {
  const { scene } = useGLTF(url);
  const groupRef = useRef<THREE.Group>(null);

  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  // computed transform to fit the model into the view
  const [computed, setComputed] = React.useState({ scale: 1, offset: new THREE.Vector3(), radius: 1 });

  // compute bounding box, scale and offset
  React.useEffect(() => {
    try {
      const box = new THREE.Box3().setFromObject(clonedScene);
      const center = new THREE.Vector3();
      box.getCenter(center);
      const size = new THREE.Vector3();
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      const targetSize = 2.0; // desired world size for models
      const scale = targetSize / maxDim;
      const sphere = new THREE.Sphere();
      box.getBoundingSphere(sphere);
      const radius = sphere.radius * scale;
      const offset = center.clone().multiplyScalar(-scale);
      setComputed({ scale, offset, radius });
      // Only notify parent when bounds change noticeably to avoid reflows/blink
      if (onBoundsCalculated) {
        try {
          onBoundsCalculated(new THREE.Vector3(0, 0, 0), radius);
        } catch (e) {
          // swallow
        }
      }
      // debug
      // eslint-disable-next-line no-console
      console.debug('[ModelViewer] bounds computed', { center: center.toArray(), size: size.toArray(), maxDim, scale, radius, offset: offset.toArray() });
    } catch (e) {
      // ignore
    }
  }, [clonedScene]);

  // Apply color and wireframe
  useMemo(() => {
    clonedScene.traverse((child: any) => {
      if (child.isMesh) {
        child.material = child.material.clone();
        child.material.wireframe = wireframe;
        if (color) {
          child.material.color = new THREE.Color(color);
        }
      }
    });
  }, [clonedScene, color, wireframe]);

  // Exploded view - spread meshes outward from center
  useMemo(() => {
    const meshes: THREE.Mesh[] = [];
    clonedScene.traverse((child: any) => {
      if (child.isMesh) meshes.push(child);
    });

    const center = new THREE.Vector3();
    const box = new THREE.Box3().setFromObject(clonedScene);
    box.getCenter(center);

    meshes.forEach((mesh) => {
      const meshCenter = new THREE.Vector3();
      new THREE.Box3().setFromObject(mesh).getCenter(meshCenter);
      const dir = meshCenter.sub(center).normalize();

      if (exploded) {
        mesh.position.add(dir.multiplyScalar(1.5));
      }
    });
  }, [clonedScene, exploded]);

  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={clonedScene} position={[computed.offset.x, computed.offset.y, computed.offset.z]} scale={computed.scale} />
    </group>
  );
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 text-primary">
        <Loader2 className="w-8 h-8 animate-spin" />
        <span className="font-mono text-sm tracking-wider">Loading Model...</span>
      </div>
    </Html>
  );
}

interface InteractiveModelViewerProps {
  modelUrl: string;
  title?: string;
  className?: string;
  compact?: boolean;
}

export function InteractiveModelViewer({ modelUrl, title, className = '', compact = false }: InteractiveModelViewerProps) {
  const controlsRef = useRef<any>(null);
  const [bounds, setBounds] = React.useState<{ center: THREE.Vector3; radius: number } | null>(null);
  const boundsRef = useRef<{ center: THREE.Vector3; radius: number } | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [exploded, setExploded] = useState(false);
  const [wireframe, setWireframe] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const resetCamera = useCallback(() => {
    if (controlsRef.current) controlsRef.current.reset();
  }, []);

  const handleBounds = useCallback((center: THREE.Vector3, radius: number) => {
    // avoid frequent tiny updates which can cause camera jitter/blink
    const prev = boundsRef.current;
    if (prev && Math.abs(prev.radius - radius) < 0.01) return;
    const c = center.clone ? center.clone() : new THREE.Vector3(0, 0, 0);
    boundsRef.current = { center: c, radius };
    setBounds({ center: c, radius });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Camera adjuster runs inside the canvas via useThree
  function CameraAdjuster({ localBounds }: { localBounds: { center: THREE.Vector3; radius: number } | null }) {
    const { camera } = useThree();
    React.useEffect(() => {
      if (!localBounds) return;
      // apply camera change on next animation frame to ensure controls exist
      const id = requestAnimationFrame(() => {
        try {
          const d = Math.max(localBounds.radius * 2.8, 2.5);
          camera.position.set(d, d * 0.6, d);
          camera.lookAt(localBounds.center);
          camera.updateProjectionMatrix();
          if (controlsRef.current && controlsRef.current.target) {
            controlsRef.current.target.copy(localBounds.center);
            controlsRef.current.update();
          }
          // eslint-disable-next-line no-console
          console.debug('[ModelViewer] Camera adjusted', { pos: camera.position.toArray(), target: localBounds.center.toArray() });
        } catch (e) {
          // ignore
        }
      });
      return () => cancelAnimationFrame(id);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localBounds]);
    return null;
  }

  // Simple error boundary to catch loader failures and show a fallback
  class ViewerErrorBoundary extends React.Component<any, { hasError: boolean; error?: any }> {
    constructor(props: any) {
      super(props);
      this.state = { hasError: false, error: undefined };
    }
    static getDerivedStateFromError(error: any) {
      return { hasError: true, error };
    }
    componentDidCatch(error: any) {
      // noop - state already set
      console.error('Model viewer error:', error);
    }
    render() {
      if (this.state.hasError) {
        return (
          <div className={`relative bg-card/30 rounded-3xl border border-border/30 overflow-hidden backdrop-blur-sm ${className}`}>
            <div className="p-6 text-center">
              <p className="text-foreground font-semibold">Failed to load model</p>
              <p className="text-xs text-muted-foreground mt-2">Showing a basic preview instead.</p>
            </div>
            <Canvas camera={{ position: [3, 2, 5], fov: 45 }} style={{ minHeight: compact ? '300px' : '500px' }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <mesh>
                <boxGeometry args={[1.5, 1.5, 1.5]} />
                <meshStandardMaterial color="#16a34a" />
              </mesh>
              <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
            </Canvas>
          </div>
        );
      }
      return this.props.children;
    }
  }

  return (
    <div className={`relative bg-card/30 rounded-3xl border border-border/30 overflow-hidden backdrop-blur-sm ${className}`}>
      {/* Title bar */}
      {title && (
        <div className="absolute top-0 left-0 right-0 z-10 px-6 py-4 bg-gradient-to-b from-background/80 to-transparent">
          <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
        </div>
      )}

      {/* Left controls */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <Button size="sm" variant="secondary" onClick={resetCamera} className="bg-card/80 backdrop-blur-sm border border-border/50" title="Reset Camera">
          <RotateCcw size={14} />
        </Button>
        <Button size="sm" variant={wireframe ? "default" : "secondary"} onClick={() => setWireframe(!wireframe)} className="bg-card/80 backdrop-blur-sm border border-border/50" title="Wireframe">
          <Layers size={14} />
        </Button>
        <Button size="sm" variant={exploded ? "default" : "secondary"} onClick={() => setExploded(!exploded)} className="bg-card/80 backdrop-blur-sm border border-border/50" title="Exploded View">
          <ZoomIn size={14} />
        </Button>
        <div className="relative">
          <Button size="sm" variant={selectedColor ? "default" : "secondary"} onClick={() => setShowColorPicker(!showColorPicker)} className="bg-card/80 backdrop-blur-sm border border-border/50" title="Change Color">
            <Palette size={14} />
          </Button>
          {showColorPicker && (
            <div className="absolute top-0 left-full ml-2 p-2 bg-card/95 backdrop-blur-xl rounded-xl border border-border/50 flex flex-col gap-1.5 min-w-[120px] shadow-2xl">
              {PRESET_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => { setSelectedColor(c.value); setShowColorPicker(false); }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors hover:bg-secondary/50 ${
                    selectedColor === c.value ? 'bg-primary/20 text-primary' : 'text-muted-foreground'
                  }`}
                >
                  <div
                    className="w-4 h-4 rounded-full border border-border/50"
                    style={{ background: c.value || 'linear-gradient(135deg, #888, #ccc)' }}
                  />
                  {c.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      {!compact && (
        <div className="absolute bottom-4 left-4 z-10 flex gap-3 text-xs text-muted-foreground font-mono bg-card/60 backdrop-blur-sm px-3 py-2 rounded-lg border border-border/30">
          <span className="flex items-center gap-1"><Move size={10} /> Drag</span>
          <span className="flex items-center gap-1"><ZoomIn size={10} /> Scroll</span>
        </div>
      )}

      <ViewerErrorBoundary>
        <Canvas camera={{ position: [3, 2, 5], fov: 45 }} style={{ minHeight: compact ? '300px' : '500px' }}>
          <Suspense fallback={<LoadingSpinner />}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} />
            <InteractiveModel
              url={modelUrl}
              color={selectedColor}
              exploded={exploded}
              wireframe={wireframe}
              autoRotate={!compact}
              onBoundsCalculated={handleBounds}
            />
            <ContactShadows position={[0, -1.5, 0]} opacity={0.3} scale={10} blur={2} far={4} />
            <Environment preset="studio" />
            <CameraAdjuster localBounds={bounds} />
            <OrbitControls
              ref={controlsRef}
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={bounds ? Math.max(0.2, bounds.radius * 0.5) : 0.5}
              maxDistance={bounds ? Math.max(8, bounds.radius * 20) : 20}
            />
          </Suspense>
        </Canvas>
      </ViewerErrorBoundary>
    </div>
  );
}
