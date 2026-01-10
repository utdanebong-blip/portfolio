import React from 'react';
import { Move } from 'lucide-react';

export default function ModelViewerPlaceholder({ className = '' }: { className?: string }) {
  return (
    <div className={`relative bg-secondary/50 rounded-lg border border-border overflow-hidden flex items-center justify-center ${className}`} style={{ minHeight: '400px' }}>
      <div className="text-center text-muted-foreground">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full border-2 border-dashed border-border flex items-center justify-center">
          <Move size={24} />
        </div>
        <p className="font-body text-sm">No 3D model available</p>
        <p className="font-mono text-xs mt-1">Upload a GLB file to view</p>
      </div>
    </div>
  );
}
