import { useEffect, useRef, useState } from 'react';

/**
 * usePullToRefresh
 * Attaches touch listeners to a scroll container ref.
 * Calls `onRefresh` when the user pulls down far enough from the top.
 *
 * Returns: { containerRef, isPulling, pullProgress (0-1), isRefreshing }
 */
export default function usePullToRefresh(onRefresh, { threshold = 72 } = {}) {
  const containerRef = useRef(null);
  const [isPulling, setIsPulling] = useState(false);
  const [pullProgress, setPullProgress] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const startY = useRef(0);
  const currentY = useRef(0);
  const pulling = useRef(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onTouchStart = (e) => {
      if (el.scrollTop > 0) return; // only trigger at top
      startY.current = e.touches[0].clientY;
      pulling.current = true;
    };

    const onTouchMove = (e) => {
      if (!pulling.current) return;
      currentY.current = e.touches[0].clientY;
      const delta = currentY.current - startY.current;
      if (delta > 0 && el.scrollTop === 0) {
        const progress = Math.min(delta / threshold, 1);
        setPullProgress(progress);
        setIsPulling(progress > 0.1);
        // prevent native scroll bounce while pulling
        if (delta > 8) e.preventDefault();
      }
    };

    const onTouchEnd = async () => {
      if (!pulling.current) return;
      pulling.current = false;

      if (pullProgress >= 1 && !isRefreshing) {
        setIsRefreshing(true);
        setPullProgress(0);
        setIsPulling(false);
        try {
          await onRefresh();
        } finally {
          setIsRefreshing(false);
        }
      } else {
        setPullProgress(0);
        setIsPulling(false);
      }
    };

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchmove', onTouchMove, { passive: false });
    el.addEventListener('touchend', onTouchEnd, { passive: true });

    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [onRefresh, threshold, pullProgress, isRefreshing]);

  return { containerRef, isPulling, pullProgress, isRefreshing };
}