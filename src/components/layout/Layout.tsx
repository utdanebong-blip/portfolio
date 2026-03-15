import { ReactNode, useEffect, useState } from 'react';
import { Header } from './Header';
import { ArtisticNav } from './ArtisticNav';
import { Footer } from './Footer';
import { ArrowUp } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    function onScroll() {
      try {
        const scrollY = window.scrollY || 0;
        const docH = document.documentElement.scrollHeight - window.innerHeight;
        if (docH <= 0) {
          setShowScroll(false);
          return;
        }
        const pct = scrollY / docH;
        setShowScroll(pct >= 0.5);
      } catch (e) {
        // ignore
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll as any);
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Desktop: ArtisticNav, Mobile: Header */}
      <div className="hidden lg:block">
        <ArtisticNav />
      </div>
      <div className="lg:hidden">
        <Header />
      </div>
      <main className="flex-1 pt-20">
        {children}
      </main>
      <Footer />
      {(
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          className={`fixed right-4 bottom-6 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl hover:scale-105 transition-transform ${showScroll ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </div>
  );
}
