"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLSpanElement>(null);
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointers
    if (typeof window === "undefined" || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }
    setIsEnabled(true);

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    const text = cursorTextRef.current;
    if (!dot || !ring) return;

    // Fast, ultra-smooth quickTo helpers
    const xDotTo = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
    const yDotTo = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
    const xRingTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yRingTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let isHoveringInteractive = false;
    let isHoveringImage = false;

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      // Show cursor if hidden
      gsap.to([dot, ring], { opacity: 1, duration: 0.2, overwrite: "auto" });

      xDotTo(clientX);
      yDotTo(clientY);
      xRingTo(clientX);
      yRingTo(clientY);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      const clickable = target?.closest("button, a, input, select, textarea, [role='button']");
      const imageCard = target?.closest("[data-cursor='view']");

      if (imageCard) {
        if (!isHoveringImage) {
          isHoveringImage = true;
          gsap.to(ring, {
            width: 76,
            height: 76,
            backgroundColor: "#ECBA61",
            borderColor: "transparent",
            duration: 0.3,
            ease: "back.out(1.7)",
          });
          gsap.to(dot, { scale: 0, duration: 0.2 });
          if (text) {
            text.innerText = "VIEW";
            gsap.to(text, { opacity: 1, scale: 1, duration: 0.25 });
          }
        }
      } else if (clickable) {
        if (!isHoveringInteractive) {
          isHoveringInteractive = true;
          isHoveringImage = false;
          gsap.to(ring, {
            width: 52,
            height: 52,
            backgroundColor: "rgba(236, 186, 97, 0.15)",
            borderColor: "#ECBA61",
            duration: 0.25,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 1.4, duration: 0.2 });
          if (text) gsap.to(text, { opacity: 0, scale: 0, duration: 0.15 });
        }
      } else {
        if (isHoveringInteractive || isHoveringImage) {
          isHoveringInteractive = false;
          isHoveringImage = false;
          gsap.to(ring, {
            width: 36,
            height: 36,
            backgroundColor: "transparent",
            borderColor: "rgba(236, 186, 97, 0.6)",
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(dot, { scale: 1, duration: 0.2 });
          if (text) gsap.to(text, { opacity: 0, scale: 0, duration: 0.15 });
        }
      }
    };

    const onMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.25 });
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  if (!isEnabled) return null;

  return (
    <>
      {/* Central Solid Pin Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-[#ECBA61] pointer-events-none z-[9999] opacity-0 will-change-transform shadow-[0_0_8px_#ECBA61]"
        aria-hidden="true"
      />

      {/* Trailing Fluid Ring / View Pill */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 -ml-[18px] -mt-[18px] w-9 h-9 rounded-full border border-[#ECBA61]/60 pointer-events-none z-[9998] opacity-0 will-change-transform flex items-center justify-center transition-colors shadow-[0_0_15px_rgba(236,186,97,0.2)]"
        aria-hidden="true"
      >
        <span
          ref={cursorTextRef}
          className="font-poppins font-bold text-[10px] tracking-widest text-[#111C24] opacity-0 scale-0 select-none uppercase"
        />
      </div>
    </>
  );
}

