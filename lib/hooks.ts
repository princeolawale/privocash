"use client";
import { useEffect, useRef, useState } from "react";

export function useReveal(delay = 0) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("in"), delay);
          ob.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [delay]);
  return ref;
}

export function useCounter(target: number, active: boolean) {
  const [v, setV] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    if (!active || done.current) return;
    done.current = true;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      setV(+(i / 60 * target).toFixed(2));
      if (i >= 60) { setV(target); clearInterval(iv); }
    }, 26);
    return () => clearInterval(iv);
  }, [active, target]);
  return v;
}

export function useScrolled(threshold = 28) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return scrolled;
}
