"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function WhyUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leafLeftRef = useRef<HTMLDivElement>(null);
  const leafRightRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: "/images/why-icon-1.svg",
      iconWidth: 92.28,
      iconHeight: 91.25,
      title: "Simply Exceptional",
      desc: "We serve every cup with care, using the finest ingredients for a truly exceptional experience",
    },
    {
      icon: "/images/why-icon-2.svg",
      iconWidth: 74.62,
      iconHeight: 84.22,
      title: "Crafted Perfectly",
      desc: "Every drink and dish is thoughtfully prepared to bring out the best flavors and comfort.",
    },
    {
      icon: "/images/why-icon-3.svg",
      iconWidth: 62,
      iconHeight: 84.22,
      title: "Unmatched Quality",
      desc: "From cozy vibes to rich blends, we make every visit uniquely delightful and worth remembering.",
    },
  ];

  useGSAP(
    () => {
      const section = sectionRef.current;
      const leafLeft = leafLeftRef.current;
      const leafRight = leafRightRef.current;
      if (!section) return;

      // 1. Kinetic Masked Header Reveal
      gsap.from(".why-header-line", {
        y: "115%",
        rotateZ: 1.5,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".why-header",
          start: "top 85%",
          once: true,
        },
      });

      // 2. Badge Icon Spring Entrance
      gsap.from(".why-badge-img", {
        scale: 0.75,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".why-header",
          start: "top 85%",
          once: true,
        },
      });

      // 3. Staggered Column Entrance with Playful Spring
      gsap.from(".why-column", {
        y: 45,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "back.out(1.5)",
        scrollTrigger: {
          trigger: ".why-columns-grid",
          start: "top 85%",
          once: true,
        },
      });

      // 4. Continuous Organic Drift on Botanicals
      if (leafLeft) {
        gsap.to(leafLeft, {
          y: -25,
          rotation: -4,
          duration: 6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
      if (leafRight) {
        gsap.to(leafRight, {
          y: 25,
          rotation: 4,
          duration: 6.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: sectionRef }
  );

  const handleIconHover = (idx: number) => {
    const iconEl = document.getElementById(`why-icon-${idx}`);
    if (iconEl) {
      gsap.fromTo(
        iconEl,
        { scale: 1, rotation: 0 },
        {
          scale: 1.18,
          rotation: idx % 2 === 0 ? 8 : -8,
          duration: 0.45,
          ease: "back.out(2.5)",
          yoyo: true,
          repeat: 1,
        }
      );
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[939px] bg-[#283C4A] overflow-hidden flex flex-col justify-between"
    >
      {/* Top Torn Paper Texture (Figma #6838:505: 1517.05 x 94.75px) */}
      <div className="absolute top-0 left-0 right-0 z-10 w-full h-[65px] md:h-[94.75px] pointer-events-none select-none overflow-hidden rotate-180">
        <img
          src="/images/paper-texture.png"
          alt=""
          className="w-full h-full object-fill"
        />
      </div>

      {/* Decorative Botanical Left (Figma #6838:638) */}
      <div
        ref={leafLeftRef}
        className="absolute -left-[160px] top-[40px] pointer-events-none z-0 hidden lg:block will-change-transform"
      >
        <Image
          src="/images/why-bg-bean-2.svg"
          alt=""
          width={507}
          height={486}
          className="w-[507px] h-auto object-contain"
        />
      </div>

      {/* Decorative Botanical Right (Figma #6838:627) */}
      <div
        ref={leafRightRef}
        className="absolute -right-[160px] top-[260px] pointer-events-none z-0 hidden lg:block will-change-transform"
      >
        <Image
          src="/images/why-bg-bean-1.svg"
          alt=""
          width={663}
          height={636}
          className="w-[663px] h-auto object-contain"
        />
      </div>

      {/* Content Container (Figma #6838:509: max-w-[1278.01px], centered) */}
      <div className="relative z-10 w-full max-w-[1278px] mx-auto px-4 sm:px-6 pt-[120px] md:pt-[150px] pb-[130px] md:pb-[160px]">
        {/* Header with Badge Icon and Title (Figma #6838:510) */}
        <div className="why-header flex flex-col items-center text-center max-w-[812px] mx-auto mb-14 md:mb-[52.64px]">
          {/* Badge SVG (Figma #6838:511: 152.25 x 112.01px) */}
          <div className="why-badge-img w-[120px] md:w-[152.25px] h-[85px] md:h-[112.01px] mb-[-12px] relative z-0 will-change-transform">
            <Image
              src="/images/why-us-badge.svg"
              alt=""
              width={152}
              height={112}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Subtitle (Figma #6838:565: Inter Medium 18.06px, letterSpacing 0.063em, uppercase, #ECBA61) */}
          <span className="font-inter font-medium text-[15px] md:text-[18.06px] leading-[21.06px] tracking-[0.063em] text-[#ECBA61] uppercase mb-[6.32px] relative z-10">
            why us
          </span>

          {/* Title (Figma #6838:566: Playfair Display Bold 58.96px, lineHeight 67.38px, #ECBA61) */}
          <h2 className="font-playfair font-bold text-[36px] sm:text-[48px] md:text-[58.96px] leading-[1.12] md:leading-[67.38px] text-[#ECBA61] capitalize select-none">
            <span className="block overflow-hidden py-1">
              <span className="why-header-line inline-block will-change-transform">
                What Makes Our Coffee
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="why-header-line inline-block will-change-transform">
                Taste So Special?
              </span>
            </span>
          </h2>
        </div>

        {/* 3 Columns Grid (Figma #6838:567: gap 45px - pure typography and icons, NO boxes) */}
        <div className="why-columns-grid grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-[45px] items-start">
          {features.map((feature, idx) => (
            <div
              key={idx}
              onMouseEnter={() => handleIconHover(idx)}
              className="why-column flex flex-col items-center text-center cursor-default group"
            >
              {/* Icon Container (Figma: height 91.25px) */}
              <div className="h-[75px] md:h-[91.25px] flex items-center justify-center mb-6 md:mb-[31.58px]">
                <div
                  id={`why-icon-${idx}`}
                  style={{ width: `${feature.iconWidth}px`, height: `${feature.iconHeight}px` }}
                  className="relative will-change-transform transition-transform duration-300 group-hover:scale-105"
                >
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={feature.iconWidth}
                    height={feature.iconHeight}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* Title (Figma: Playfair Display Bold 33.69px, lineHeight 38.95px, #ECBA61) */}
              <h3 className="font-playfair font-bold text-[24px] sm:text-[28px] md:text-[33.69px] leading-tight md:leading-[38.95px] text-[#ECBA61] mb-3 md:mb-[15.79px]">
                {feature.title}
              </h3>

              {/* Description (Figma: Poppins Regular 18.95px, lineHeight 31.59px, #FFFFFF, max-w 385px) */}
              <p className="font-poppins font-normal text-[15px] sm:text-[17px] md:text-[18.95px] leading-relaxed md:leading-[31.59px] text-white max-w-[385px]">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Torn Paper Texture (Figma #6838:649: 1517.05 x 94.75px) */}
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
