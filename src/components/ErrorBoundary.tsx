import React from 'react';

type State = { hasError: boolean; error?: Error };

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, State> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // Log to console for now
    console.error('Unhandled error in React tree:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-8 bg-background text-foreground">
          <div className="max-w-3xl w-full bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">Something went wrong</h2>
            <p className="text-sm text-muted-foreground mb-4">An unexpected error occurred rendering the app. See details below.</p>
            <pre className="text-xs font-mono whitespace-pre-wrap bg-background/10 p-3 rounded mb-4" style={{maxHeight: 300, overflow: 'auto'}}>
              {this.state.error?.message}
              {this.state.error?.stack ? '\n\n' + this.state.error.stack : ''}
            </pre>
            <div className="flex gap-2 justify-end">
              <button onClick={() => location.reload()} className="px-4 py-2 rounded bg-primary text-white">Reload</button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children as React.ReactElement;
  }
}

export default ErrorBoundary;
