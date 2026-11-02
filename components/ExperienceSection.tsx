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

export default function ExperienceSection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const beanTopRef = useRef<HTMLDivElement>(null);
  const beanBottomRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const beanTop = beanTopRef.current;
      const beanBottom = beanBottomRef.current;
      if (!section) return;

      // 1. Organic floating beans physics
      if (beanTop) {
        gsap.to(beanTop, {
          y: -14,
          rotation: 6,
          duration: 4,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (beanBottom) {
        gsap.to(beanBottom, {
          y: 16,
          rotation: -8,
          duration: 4.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }

      // 2. Kinetic Masked Headline Reveal
      gsap.from(".experience-line-inner", {
        y: "115%",
        rotateZ: 1.5,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".experience-header",
          start: "top 85%",
          once: true,
        },
      });

      // 3. Right Description Entrance
      gsap.from(".experience-desc", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".experience-header",
          start: "top 85%",
          once: true,
        },
      });

      // 4. Curtain Clip-Path Reveal on Scroll
      const mosaicCards = section.querySelectorAll(".mosaic-curtain");
      mosaicCards.forEach((card, idx) => {
        const img = card.querySelector(".mosaic-img");
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.1,
            delay: idx * 0.1,
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
              delay: idx * 0.1,
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
      id="experience"
      className="relative w-full bg-[#F4F0E9] pt-[85px] md:pt-[110px] pb-[100px] md:pb-[140px] overflow-hidden"
    >
      {/* Floating Coffee Bean Top Left (Figma #6838:2251: 115.81 x 126.16px) */}
      <div
        ref={beanTopRef}
        className="absolute left-4 sm:left-[34px] top-6 md:top-[20px] z-0 pointer-events-none select-none hidden sm:block will-change-transform"
      >
        <Image
          src="/images/bean-up-left.svg"
          alt=""
          width={116}
          height={126}
          className="w-20 md:w-[115.81px] h-auto object-contain"
        />
      </div>

      {/* Floating Coffee Bean Bottom Right (Figma #6838:2279: 147.39 x 118.14px) */}
      <div
        ref={beanBottomRef}
        className="absolute right-4 sm:right-[40px] bottom-10 md:bottom-[60px] z-0 pointer-events-none select-none hidden sm:block will-change-transform"
      >
        <Image
          src="/images/bean-bottom-right.svg"
          alt=""
          width={147}
          height={118}
          className="w-24 md:w-[147.39px] h-auto object-contain"
        />
      </div>

      <div className="relative z-10 max-w-[1284.39px] mx-auto px-4 sm:px-6">
        {/* Header Row (Figma #6838:2309: gap: 222.14px, alignItems: flex-end) */}
        <div className="experience-header flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 lg:gap-[60px] mb-12 md:mb-[54.74px]">
          {/* Left Title Column (Figma #6838:2310: width: 588.13px) */}
          <div className="max-w-[588.13px]">
            <p className="font-poppins font-medium text-[14px] md:text-[16.84px] leading-[21.06px] tracking-[0.0675em] text-[#ECBA61] uppercase mb-[6.32px]">
              Welcome to THE CHOO Cafe
            </p>
            <h2 className="font-playfair font-bold text-[36px] sm:text-[44px] md:text-[50.53px] leading-[1.12] md:leading-[67.38px] text-[#111C24] capitalize select-none">
              <span className="block overflow-hidden py-1">
                <span className="experience-line-inner inline-block will-change-transform">
                  Experience A New
                </span>
              </span>
              <span className="block overflow-hidden py-1">
                <span className="experience-line-inner inline-block will-change-transform">
                  Way To Taste Coffee
                </span>
              </span>
            </h2>
          </div>

          {/* Right Description Column (Figma #6838:2313: width: 474.8px) */}
          <div className="max-w-[474.8px]">
            <p className="experience-desc font-poppins font-normal text-[16px] md:text-[18.95px] leading-relaxed md:leading-[31.59px] text-[#111C24]">
              Tastes converge and comfort brews—where every detail, from rich aromas to warm ambiance, is crafted to delight. A cozy escape where moments matter and every sip feels just right
            </p>
          </div>
        </div>

        {/* 5-Image Mosaic Grid (Figma #6838:2314: 1284.39 x 666.41px) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 lg:gap-[27.38px]">
          {/* Large Left Image (Figma #6838:2315: 628.51 x 666.41px) */}
          <div className="md:col-span-6">
            <div
              data-cursor="view"
              onClick={() => setSelectedImage("/images/taste-1.png")}
              className="mosaic-curtain group relative w-full h-[400px] sm:h-[500px] md:h-[666.41px] overflow-hidden cursor-pointer bg-stone-200"
            >
              <Image
                src="/images/taste-1.png"
                alt="Barista brewing espresso"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="mosaic-img object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>
          </div>

          {/* Middle Column (Figma: width 301.09px) */}
          <div className="md:col-span-3 flex flex-col gap-5 lg:gap-[23.17px]">
            {/* Middle Top (Figma #6838:2317: 301.09 x 308.46px) */}
            <div
              data-cursor="view"
              onClick={() => setSelectedImage("/images/taste-2.png")}
              className="mosaic-curtain group relative h-[250px] sm:h-[290px] md:h-[308.46px] overflow-hidden cursor-pointer bg-stone-200"
            >
              <Image
                src="/images/taste-2.png"
                alt="Latte art from above with pastries"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="mosaic-img object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>

            {/* Middle Bottom (Figma #6838:2321: 301.09 x 334.78px) */}
            <div
              data-cursor="view"
              onClick={() => setSelectedImage("/images/taste-4.png")}
              className="mosaic-curtain group relative h-[270px] sm:h-[310px] md:h-[334.78px] overflow-hidden cursor-pointer bg-stone-200"
            >
              <Image
                src="/images/taste-4.png"
                alt="Pouring latte art"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="mosaic-img object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>
          </div>

          {/* Right Column (Figma: width 300.04px) */}
          <div className="md:col-span-3 flex flex-col gap-5 lg:gap-[23.17px]">
            {/* Right Top (Figma #6838:2319: 300.04 x 308.46px) */}
            <div
              data-cursor="view"
              onClick={() => setSelectedImage("/images/taste-3.png")}
              className="mosaic-curtain group relative h-[250px] sm:h-[290px] md:h-[308.46px] overflow-hidden cursor-pointer bg-stone-200"
            >
              <Image
                src="/images/taste-3.png"
                alt="Blue cup latte art"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="mosaic-img object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>

            {/* Right Bottom (Figma #6838:2323: 300.04 x 334.78px) */}
            <div
              data-cursor="view"
              onClick={() => setSelectedImage("/images/taste-5.png")}
              className="mosaic-curtain group relative h-[270px] sm:h-[310px] md:h-[334.78px] overflow-hidden cursor-pointer bg-stone-200"
            >
              <Image
                src="/images/taste-5.png"
                alt="Hearty breakfast brunch plate"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="mosaic-img object-cover object-center group-hover:scale-[1.05] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      <LightboxModal
        imageSrc={selectedImage}
        onClose={() => setSelectedImage(null)}
      />
    </section>
  );
}
