"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot  = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const rp   = useRef({ x: 0, y: 0 });
  const raf  = useRef<number>(0);

  useEffect(() => {
    const mv = (e: MouseEvent) => {
      if (dot.current) { dot.current.style.left = e.clientX+"px"; dot.current.style.top = e.clientY+"px"; }
      rp.current = { x: e.clientX, y: e.clientY };
    };
    const lerp = () => {
      if (ring.current) { ring.current.style.left = rp.current.x+"px"; ring.current.style.top = rp.current.y+"px"; }
      raf.current = requestAnimationFrame(lerp);
    };
    const big = (e: MouseEvent) => {
      const on = (e.target as Element)?.closest("button,a,[data-c]");
      dot.current?.classList[on ? "add" : "remove"]("big");
      ring.current?.classList[on ? "add" : "remove"]("big");
    };
    document.addEventListener("mousemove", mv);
    document.addEventListener("mouseover", big);
    raf.current = requestAnimationFrame(lerp);
    return () => {
      document.removeEventListener("mousemove", mv);
      document.removeEventListener("mouseover", big);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div id="_cd" ref={dot}/>
      <div id="_cr" ref={ring}/>
    </>
  );
}
