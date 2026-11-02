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

export default function GallerySection() {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;

      // 1. Center Title Kinetic Mask Reveal
      gsap.from(".gallery-title-line", {
        y: "115%",
        rotateZ: 1.5,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".gallery-header",
          start: "top 85%",
          once: true,
        },
      });

      // 2. Center Badge Spring Entrance
      gsap.from(".gallery-badge-img", {
        scale: 0.8,
        y: 18,
        opacity: 0,
        duration: 0.9,
        ease: "back.out(1.8)",
        scrollTrigger: {
          trigger: ".gallery-header",
          start: "top 88%",
          once: true,
        },
      });

      // 3. Staggered Curtain Reveal on All 5 Gallery Photos
      const curtains = section.querySelectorAll(".gallery-curtain");
      curtains.forEach((card, idx) => {
        const img = card.querySelector(".gallery-img");
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.15,
            delay: (idx % 3) * 0.1,
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
              duration: 1.35,
              delay: (idx % 3) * 0.1,
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

      // 4. Subtle Text Paragraph Reveals
      gsap.from(".gallery-paragraph", {
        y: 20,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#F4F0E9] py-[70px] md:py-[100px] overflow-hidden"
    >
      <div className="max-w-[1515px] mx-auto px-4 sm:px-8 md:px-[50px] lg:px-[104px]">
        {/* 3-Column Asymmetric Grid (Figma #6838:2405: 313px | 615px | 322.44px, gap 28px) */}
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-[28px]">
          {/* Left Column (Figma #6838:2400: width 313px, gap 45px) */}
          <div className="w-full lg:w-[313px] shrink-0 flex flex-col gap-6 md:gap-[45px]">
            {/* Image 1 (Figma #6838:2351: height 276px) */}
            <div
              data-cursor="view"
              onClick={() => setSelectedPhoto("/images/gallery-1.png")}
              className="gallery-curtain group relative w-full h-[250px] sm:h-[276px] overflow-hidden cursor-pointer bg-stone-200"
            >
              <Image
                src="/images/gallery-1.png"
                alt="Navy espresso machine with gold emblem"
                fill
                sizes="(max-width: 1024px) 100vw, 313px"
                className="gallery-img object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>

            {/* Sub-frame with Image 2 + Paragraph (Figma #6838:2399: gap 29px) */}
            <div className="flex flex-col gap-[29px]">
              {/* Image 2 (Figma #6838:2352: height 295.83px) */}
              <div
                data-cursor="view"
                onClick={() => setSelectedPhoto("/images/gallery-2.png")}
                className="gallery-curtain group relative w-full h-[260px] sm:h-[295.83px] overflow-hidden cursor-pointer bg-stone-200"
              >
                <Image
                  src="/images/gallery-2.png"
                  alt="Espresso extraction into cup"
                  fill
                  sizes="(max-width: 1024px) 100vw, 313px"
                  className="gallery-img object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out will-change-transform"
                />
              </div>

              {/* Text Paragraph (Figma #6838:2350: Inter Regular 18.21px, lineHeight 31.59px, #111C24) */}
              <p className="gallery-paragraph font-inter font-normal text-[15px] sm:text-[18.21px] leading-relaxed md:leading-[31.59px] text-[#111C24]">
                Our coffee blends smooth, balanced flavors with expert craftsmanship, creating a rich and delightful experience that awakens your senses and comforts your soul every time
              </p>
            </div>
          </div>

          {/* Center Column (Figma #6838:2402: width 615px, gap 41px) */}
          <div className="w-full lg:w-[615px] shrink-0 flex flex-col items-center gap-6 md:gap-[41px]">
            {/* Center Header: Logo Vector + Title (Figma #6838:2401) */}
            <div className="gallery-header flex flex-col items-center text-center max-w-[615px]">
              {/* Logo Vector in #283C4A (Figma #6838:2357: 276.88 x 77.91px) */}
              <div className="gallery-badge-img w-[200px] sm:w-[240px] md:w-[276.88px] h-[55px] sm:h-[68px] md:h-[77.91px] mb-[-4px] relative will-change-transform">
                <Image
                  src="/images/gallery-badge.svg"
                  alt="THE CHOO - MILTON"
                  width={277}
                  height={78}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title (Figma #6838:2356: Playfair Display Bold 58.96px, lineHeight 77.91px, #111C24) */}
              <h2 className="font-playfair font-bold text-[34px] sm:text-[46px] md:text-[58.96px] leading-[1.12] md:leading-[77.91px] text-[#111C24] capitalize select-none">
                <span className="block overflow-hidden py-1">
                  <span className="gallery-title-line inline-block will-change-transform">
                    Coffee Shared With
                  </span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="gallery-title-line inline-block will-change-transform">
                    A Friend Is Happiness
                  </span>
                </span>
              </h2>
            </div>

            {/* Large Centerpiece Image (Figma #6838:2353: height 560px) */}
            <div
              data-cursor="view"
              onClick={() => setSelectedPhoto("/images/gallery-3.png")}
              className="gallery-curtain group relative w-full h-[380px] sm:h-[460px] md:h-[560px] overflow-hidden cursor-pointer bg-stone-200"
            >
              <Image
                src="/images/gallery-3.png"
                alt="Table of latte art cups"
                fill
                sizes="(max-width: 1024px) 100vw, 615px"
                className="gallery-img object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>
          </div>

          {/* Right Column (Figma #6838:2404: width 322.44px, gap 21px) */}
          <div className="w-full lg:w-[322.44px] shrink-0 flex flex-col gap-6 md:gap-[21px]">
            {/* Image 4 (Figma #6838:2355: height 218px) */}
            <div
              data-cursor="view"
              onClick={() => setSelectedPhoto("/images/gallery-4.png")}
              className="gallery-curtain group relative w-full h-[200px] sm:h-[218px] overflow-hidden cursor-pointer bg-stone-200"
            >
              <Image
                src="/images/gallery-4.png"
                alt="Bags of specialty coffee beans"
                fill
                sizes="(max-width: 1024px) 100vw, 322px"
                className="gallery-img object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>

            {/* Sub-frame with Image 5 + Paragraph (Figma #6838:2403: gap 29px) */}
            <div className="flex flex-col gap-[29px]">
              {/* Image 5 (Figma #6838:2354: height 378px) */}
              <div
                data-cursor="view"
                onClick={() => setSelectedPhoto("/images/gallery-5.png")}
                className="gallery-curtain group relative w-full h-[280px] sm:h-[378px] overflow-hidden cursor-pointer bg-stone-200"
              >
                <Image
                  src="/images/gallery-5.png"
                  alt="Steaming coffee cup with cookie"
                  fill
                  sizes="(max-width: 1024px) 100vw, 322px"
                  className="gallery-img object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out will-change-transform"
                />
              </div>

              {/* Text Paragraph (Figma #6838:2349: Poppins Regular 18.95px, lineHeight 31.59px, #111C24) */}
              <p className="gallery-paragraph font-poppins font-normal text-[15px] sm:text-[18.95px] leading-relaxed md:leading-[31.59px] text-[#111C24]">
                Tincidunt convallis id non maecenas sagittis non amet morbi elit sit sed pharetra faucibus elementum sollicitudin porta purus sit dolor sit dolor ist amec consectur.
              </p>
            </div>
          </div>
        </div>
      </div>

      <LightboxModal
        imageSrc={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </section>
  );
}
