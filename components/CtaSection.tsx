"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface CtaSectionProps {
  onOpenLocation?: () => void;
}

export default function CtaSection({ onOpenLocation }: CtaSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const bgImg = bgImgRef.current;
      if (!section) return;

      // 1. Subtle Background Parallax
      if (bgImg) {
        gsap.fromTo(
          bgImg,
          { y: "-4%" },
          {
            y: "4%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.2,
            },
          }
        );
      }

      // 2. Orchestrated CTA Content Stagger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-content",
          start: "top 80%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".cta-word", {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.06,
        duration: 0.85,
        clearProps: "all",
      })
        .from(
          ".cta-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            clearProps: "all",
          },
          "-=0.4"
        )
        .from(
          ".cta-btn",
          {
            scale: 0.9,
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.8)",
            clearProps: "all",
          },
          "-=0.4"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[750px] md:min-h-[880px] lg:min-h-[958.03px] bg-[#111C24] overflow-hidden flex flex-col justify-between"
    >
      {/* Top Torn Paper Texture (Figma #6838:2249: 1522.32 x 94.75px) */}
      <div className="absolute top-0 left-0 right-0 z-10 w-full h-[65px] md:h-[94.75px] pointer-events-none select-none overflow-hidden rotate-180">
        <img
          src="/images/paper-texture.png"
          alt=""
          className="w-full h-full object-fill"
        />
      </div>

      {/* Full-width Background Image & Parallax Container (Figma #6838:2243) */}
      <div
        ref={bgImgRef}
        className="absolute inset-0 z-0 scale-105 will-change-transform"
      >
        <Image
          src="/images/cta-bg.png"
          alt="Cafe shelves with coffee beans"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Figma Dark Overlay rgba(0, 0, 0, 0.60) */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Center Content Box (Figma #6838:2244: width 726.42px, gap 31.58px) */}
      <div className="cta-content relative z-20 w-full max-w-[726.42px] mx-auto px-4 my-auto pt-[130px] md:pt-[160px] pb-[150px] md:pb-[180px] lg:pb-[200px] flex flex-col items-center text-center">
        {/* Unclipped Title (Figma #6838:2245: Playfair Bold 101.07px, #ECBA61) */}
        <h2 className="font-playfair font-bold text-[38px] sm:text-[62px] md:text-[80px] lg:text-[101.07px] leading-[1.08] tracking-tight text-[#ECBA61] mb-[31.58px] select-none">
          <span className="block">
            {"Coffee, But Make".split(" ").map((word, i) => (
              <span key={i} className="cta-word inline-block will-change-transform mr-[0.25em]">
                {word}
              </span>
            ))}
          </span>
          <span className="block">
            {"It Unforgettable".split(" ").map((word, i) => (
              <span key={i} className="cta-word inline-block will-change-transform mr-[0.25em] last:mr-0">
                {word}
              </span>
            ))}
          </span>
        </h2>

        {/* Subtitle (Figma #6838:2246: Poppins Regular 18.95px, white, max-w 511.65px) */}
        <p className="cta-subtitle font-poppins font-normal text-[15px] sm:text-[17px] md:text-[18.95px] leading-relaxed md:leading-[31.59px] text-white max-w-[511.65px] mb-[31.58px]">
          Enhance your experience with smooth, balanced flavors and a perfectly crafted blend
        </p>

        {/* Button (Figma #6838:2247: padding 27px 156px, Poppins Medium 24px, #ECBA61) */}
        <button
          onClick={onOpenLocation}
          className="cta-btn inline-flex items-center justify-center bg-[#ECBA61] hover:bg-[#D69E3D] text-[#111C24] font-poppins font-medium text-[18px] sm:text-[21px] md:text-[24px] leading-[18.95px] tracking-[0.014em] px-8 sm:px-14 md:px-[80px] lg:px-[156px] py-[22px] md:py-[27px] rounded-none transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-[0_10px_25px_rgba(236,186,97,0.25)]"
        >
          See Our Locaiton
        </button>
      </div>

      {/* Bottom Torn Paper Texture (Figma #6838:2250: 1522.32 x 94.75px) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full h-[65px] md:h-[94.75px] pointer-events-none select-none overflow-hidden">
        <img
          src="/images/paper-texture.png"
          alt=""
          className="w-full h-full object-fill"
        />
      </div>
    </section>
  );
}
