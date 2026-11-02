"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import LightboxModal from "./LightboxModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function SnacksSection() {
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const snacks = [
    {
      src: "/images/snack-1.png",
      alt: "Breakfast platter with eggs, bacon, toast and spinach",
    },
    {
      src: "/images/snack-2.png",
      alt: "Fresh artisanal croissants in display case",
    },
    {
      src: "/images/snack-3.png",
      alt: "Golden apricot pastry on plate",
    },
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 1. Kinetic Masked Header Reveal
      gsap.from(".snack-header-line", {
        y: "115%",
        rotateZ: 1.5,
        opacity: 0,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".snack-header",
          start: "top 85%",
          once: true,
        },
      });

      // 2. Curtain Clip-Path Reveals
      const snackCards = section.querySelectorAll(".snack-curtain");
      snackCards.forEach((card, idx) => {
        const img = card.querySelector(".snack-img");
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            delay: idx * 0.14,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          }
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.2 },
            {
              scale: 1,
              duration: 1.3,
              delay: idx * 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
                once: true,
              },
            }
          );
        }
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="snacks"
      className="relative w-full bg-[#F4F0E9] pt-[70px] md:pt-[100px] pb-[80px] md:pb-[110px] overflow-hidden"
    >
      <div className="max-w-[1582.13px] mx-auto px-4 sm:px-6">
        {/* Header (Figma #6838:2358) */}
        <div className="snack-header flex flex-col items-center text-center max-w-[500px] mx-auto mb-10 md:mb-[52px]">
          {/* Subtitle (Figma #6838:2359: Poppins Medium 16.84px, #D69E3D, uppercase) */}
          <p className="font-poppins font-medium text-[14px] md:text-[16.84px] leading-[21.06px] tracking-[0.0675em] text-[#D69E3D] uppercase mb-[6.32px]">
            others Food
          </p>

          {/* Title (Figma #6838:2360: Playfair Display Black 50.53px, #130E0A) */}
          <h2 className="font-playfair font-black text-[34px] sm:text-[44px] md:text-[50.53px] leading-[1.15] md:leading-[67.38px] text-[#130E0A] capitalize select-none">
            <span className="block overflow-hidden py-1">
              <span className="snack-header-line inline-block will-change-transform">
                Our Snacks Item
              </span>
            </span>
          </h2>
        </div>

        {/* 3 Large Showcase Rectangles (Figma: 506.19 x 640.33px, gap 31.78px) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-[31.78px]">
          {snacks.map((snack, idx) => (
            <div
              key={idx}
              data-cursor="view"
              onClick={() => setActiveImage(snack.src)}
              className="snack-curtain group relative h-[380px] sm:h-[480px] md:h-[540px] lg:h-[640.33px] overflow-hidden cursor-pointer bg-stone-200 will-change-transform"
            >
              <Image
                src={snack.src}
                alt={snack.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="snack-img object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>
          ))}
        </div>
      </div>

      <LightboxModal
        imageSrc={activeImage}
        onClose={() => setActiveImage(null)}
      />
    </section>
  );
}
