// Export the lightweight placeholder directly to avoid importing heavy 3D bundles when not needed.
export { default as ModelViewerPlaceholder } from './ModelViewerPlaceholder';

// ModelViewer is intentionally NOT re-exported here to avoid accidental eager imports of the heavy 3D bundle.
