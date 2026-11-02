"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const shape = shapeRef.current;
      const imageFrame = imageFrameRef.current;
      if (!section) return;

      // 1. Curtain Reveal on About Image with inner counter-scale
      if (imageFrame) {
        const img = imageFrame.querySelector("img");
        gsap.fromTo(
          imageFrame,
          { clipPath: "inset(0% 100% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.25,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: imageFrame,
              start: "top 85%",
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
              duration: 1.4,
              ease: "power3.out",
              scrollTrigger: {
                trigger: imageFrame,
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      }

      // 2. Orchestrated Text Content Stagger Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".about-text-content",
          start: "top 85%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.from(".about-badge-icon", {
        scale: 0.7,
        opacity: 0,
        duration: 0.7,
        ease: "back.out(2)",
        clearProps: "all",
      })
        .from(
          ".about-subtitle",
          {
            y: 15,
            opacity: 0,
            duration: 0.5,
            clearProps: "all",
          },
          "-=0.4"
        )
        .from(
          ".about-word",
          {
            y: 35,
            opacity: 0,
            filter: "blur(6px)",
            stagger: 0.05,
            duration: 0.8,
            clearProps: "all",
          },
          "-=0.3"
        )
        .from(
          ".about-story-p",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            clearProps: "all",
          },
          "-=0.4"
        );

      // 3. Organic sway on background bean shape
      if (shape) {
        gsap.to(shape, {
          y: -18,
          rotation: 8,
          duration: 5.2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full bg-[#F4F0E9] pt-[40px] md:pt-[70px] pb-[100px] md:pb-[140px] overflow-hidden"
    >
      <div className="relative max-w-[1299.96px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-[60px] items-center">
          {/* Left Column: Large Image (Figma #6838:650: 627.46 x 659.04px) */}
          <div className="lg:col-span-6 relative">
            <div
              ref={imageFrameRef}
              data-cursor="view"
              className="group relative w-full h-[400px] sm:h-[520px] md:h-[659.04px] overflow-hidden bg-stone-200 cursor-pointer will-change-transform"
            >
              <Image
                src="/images/about-img.png"
                alt="Cup of black coffee surrounded by roasted coffee beans"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out will-change-transform"
              />
            </div>
          </div>

          {/* Right Column: Story & Details (Figma #6838:1489: width 578.74px) */}
          <div className="about-text-content lg:col-span-6 relative flex flex-col items-start max-w-[578.74px]">
            {/* Background Decorative Vector (Figma #6838:652) */}
            <div
              ref={shapeRef}
              className="absolute right-[-40px] bottom-[-20px] pointer-events-none z-0 hidden sm:block will-change-transform"
            >
              <Image
                src="/images/about-bg-shape.svg"
                alt=""
                width={315}
                height={337}
                className="w-[280px] md:w-[314.56px] h-auto object-contain"
              />
            </div>

            {/* Badge Icon (Figma #6838:1463: 58.39 x 81.99px) */}
            <div className="about-badge-icon w-[46px] md:w-[58.39px] h-[64px] md:h-[81.99px] mb-[-10px] relative z-10 will-change-transform">
              <Image
                src="/images/about-badge.svg"
                alt=""
                width={59}
                height={82}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Subtitle (Figma #6838:1491: Poppins Medium 16.84px, uppercase, #ECBA61) */}
            <p className="about-subtitle font-poppins font-medium text-[14px] md:text-[16.84px] leading-[21.06px] tracking-[0.0675em] text-[#ECBA61] uppercase mb-[6.32px] relative z-10 will-change-transform">
              About us
            </p>

            {/* Title (Figma #6838:1492: Playfair Display Bold 50.53px, lineHeight 67.38px, #111C24) */}
            <h2 className="font-playfair font-bold text-[34px] sm:text-[44px] md:text-[50.53px] leading-[1.18] md:leading-[67.38px] text-[#111C24] capitalize mb-[23.16px] relative z-10 select-none">
              <span className="block">
                {"Read The Story".split(" ").map((word, i) => (
                  <span key={i} className="about-word inline-block will-change-transform mr-[0.25em]">
                    {word}
                  </span>
                ))}
              </span>
              <span className="block">
                {"Behind Us".split(" ").map((word, i) => (
                  <span key={i} className="about-word inline-block will-change-transform mr-[0.25em] last:mr-0">
                    {word}
                  </span>
                ))}
              </span>
            </h2>

            {/* Story Paragraph (Figma #6838:1493: Poppins Regular 18.95px, lineHeight 31.59px, #111C24) */}
            <p className="about-story-p font-poppins font-normal text-[15px] md:text-[18.95px] leading-relaxed md:leading-[31.59px] text-[#111C24] relative z-10">
              The Choo Cafe is more than just a coffee shop—it’s a warm, inviting space where great coffee meets genuine comfort. Nestled in the heart of the city, The Choo Cafe offers a cozy escape from the everyday rush. Our baristas craft each cup with care, using premium beans and a passion for perfection. Whether you’re here for a quiet moment, a friendly catch-up, or a productive work session, you&apos;ll find the perfect atmosphere waiting for you. Alongside our signature coffee, we offer delicious bites and fresh treats made to satisfy. Every detail, from the aroma to the ambiance, is designed to make you feel at home. At The Choo Cafe, every sip tells a story—yours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
