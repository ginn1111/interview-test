'use client';

import { RefObject, useEffect, useRef } from 'react';

const useIntersectionObserver = (
  observerRef: RefObject<HTMLElement>,
  cb: () => void
) => {
  const intersectionRef = useRef(
    typeof window === 'undefined'
      ? null
      : new IntersectionObserver((entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              cb();
            }
          }
        })
  );

  useEffect(() => {
    if (observerRef.current) {
      intersectionRef.current?.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        intersectionRef.current?.unobserve(observerRef.current);
      }
    };
  }, []);
};

export default useIntersectionObserver;
