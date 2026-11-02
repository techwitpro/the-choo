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

export default function InstagramSection() {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const photos = [
    { src: "/images/insta-1.png", alt: "Breakfast plate with toast and eggs" },
    { src: "/images/insta-2.png", alt: "Outdoor patio seating at The Choo Cafe" },
    { src: "/images/insta-3.png", alt: "Specialty latte art in blue ceramic cup" },
    { src: "/images/insta-4.png", alt: "Fresh spinach wrap roll" },
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      const cards = section.querySelectorAll(".insta-curtain");
      cards.forEach((card, idx) => {
        const img = card.querySelector(".insta-img");
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            delay: idx * 0.12,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
          }
        );

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.25 },
            {
              scale: 1,
              duration: 1.3,
              delay: idx * 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 90%",
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
      className="relative w-full bg-[#111C24] overflow-hidden"
    >
      {/* Top Torn Paper Texture (Figma #6838:2407: 1517.05 x 94.75px) */}
      <div className="absolute top-0 left-0 right-0 z-10 w-full h-[65px] md:h-[94.75px] pointer-events-none select-none overflow-hidden rotate-180">
        <img
          src="/images/paper-texture.png"
          alt=""
          className="w-full h-full object-fill"
        />
      </div>

      {/* 4 Square Images Row (Figma #6838:167: 406.37 x 406.37px, rounded 5.26px) */}
      <div className="relative z-10 w-full max-w-[1688.66px] mx-auto px-4 pt-[110px] md:pt-[165px] pb-[70px] md:pb-[95px]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-[21.06px]">
          {photos.map((photo, idx) => (
            <div
              key={idx}
              data-cursor="view"
              onClick={() => setActivePhoto(photo.src)}
              className="insta-curtain group relative aspect-square w-full rounded-[5.26px] overflow-hidden cursor-pointer bg-stone-900 shadow-lg will-change-transform transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_35px_rgba(0,0,0,0.5)] before:absolute before:inset-0 before:-translate-x-full hover:before:translate-x-full before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:transition-transform before:duration-700 before:z-10 before:pointer-events-none"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="insta-img object-cover object-center group-hover:scale-[1.06] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>
          ))}
        </div>
      </div>

      <LightboxModal
        imageSrc={activePhoto}
        onClose={() => setActivePhoto(null)}
      />
    </section>
  );
}
