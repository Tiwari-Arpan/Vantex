"use client";

import { useEffect, useRef, useCallback } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

  const animate = useCallback(() => {
    pos.current.x = lerp(pos.current.x, target.current.x, 0.15);
    pos.current.y = lerp(pos.current.y, target.current.y, 0.15);

    if (cursorRef.current) {
      cursorRef.current.style.left = `${pos.current.x}px`;
      cursorRef.current.style.top = `${pos.current.y}px`;
    }

    rafId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener("mousemove", onMove);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId.current);
    };
  }, [animate]);

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999] hidden md:block"
      style={{
        width: 20,
        height: 20,
        marginLeft: -10,
        marginTop: -10,
        borderRadius: "50%",
        backgroundColor: "oklch(0.7 0.2 30)",
        mixBlendMode: "difference",
      }}
    />
  );
}
