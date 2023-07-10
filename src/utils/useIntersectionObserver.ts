import { useEffect, MutableRefObject } from 'react';

type IntersectionObserverOptions = {
  enabled?: boolean;
  onIntersect: () => void;
  root?: MutableRefObject<Element | null>;
  rootMargin?: string;
  target?: MutableRefObject<Element | null>;
  threshold?: number | number[];
};

export default function useIntersectionObserver({
  enabled = true,
  onIntersect,
  root,
  rootMargin = '0px',
  target,
  threshold = 0.1,
}: IntersectionObserverOptions) {
  useEffect(() => {
    if (!enabled) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => entry.isIntersecting && onIntersect()),
      {
        root: root && root.current,
        rootMargin,
        threshold,
      }
    );

    const el = target?.current;

    if (!el) {
      return;
    }

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [target?.current, enabled, onIntersect, root, rootMargin, threshold]);
}
