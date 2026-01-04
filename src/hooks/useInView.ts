import { useEffect, useRef, useState } from 'react';

export default function useInView(options?: IntersectionObserverInit) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setInView(true);
        });
      },
      { threshold: 0.15, ...options }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [ref.current]);

  return { ref, inView } as const;
}
