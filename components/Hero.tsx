"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Navbar from "./Navbar";

interface HeroProps {
  onOpenLocation?: () => void;
}

export default function Hero({ onOpenLocation }: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const beanRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const circleTextRef = useRef<HTMLDivElement>(null);
  const mouseIconRef = useRef<HTMLDivElement>(null);
  const badgeTweenRef = useRef<gsap.core.Tween | null>(null);

  const scrollToMenu = () => {
    const el = document.getElementById("experience") || document.getElementById("menu");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  useGSAP(
    () => {
      const hero = heroRef.current;
      const bean = beanRef.current;
      const circleText = circleTextRef.current;
      const mouseIcon = mouseIconRef.current;
      if (!hero) return;

      // 1. Satisfying Word-by-Word Kinetic Reveal
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-word", {
        y: 40,
        opacity: 0,
        filter: "blur(6px)",
        stagger: 0.05,
        duration: 0.85,
        delay: 0.1,
        clearProps: "all",
      })
        .from(
          ".hero-subtitle",
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            clearProps: "all",
          },
          "-=0.5"
        )
        .from(
          ".hero-counter",
          {
            scale: 0.85,
            y: 18,
            opacity: 0,
            duration: 0.75,
            ease: "back.out(1.8)",
            clearProps: "all",
          },
          "-=0.4"
        )
        .from(
          ".hero-scroll-badge",
          {
            scale: 0,
            opacity: 0,
            duration: 0.85,
            ease: "back.out(1.6)",
            clearProps: "all",
          },
          "-=0.5"
        );

      // 2. Organic Floating Physics on Left Coffee Bean
      if (bean) {
        gsap.to(bean, {
          y: -18,
          rotation: 8,
          duration: 4.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        // Mouse Parallax reaction
        const onMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          const xPercent = (clientX / innerWidth - 0.5) * 2;
          const yPercent = (clientY / innerHeight - 0.5) * 2;

          gsap.to(bean, {
            x: xPercent * 30,
            y: yPercent * 30,
            duration: 1.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        hero.addEventListener("mousemove", onMouseMove);
        return () => hero.removeEventListener("mousemove", onMouseMove);
      }

      // 3. Smooth, Continuous Circular Text Rotation
      if (circleText) {
        badgeTweenRef.current = gsap.to(circleText, {
          rotation: 360,
          duration: 26,
          repeat: -1,
          ease: "none",
        });
      }

      // Mouse Icon subtle breathing hop
      if (mouseIcon) {
        gsap.to(mouseIcon, {
          y: 6,
          duration: 1.6,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut",
        });
      }
    },
    { scope: heroRef }
  );

  const onBadgeEnter = () => {
    if (badgeTweenRef.current) {
      gsap.to(badgeTweenRef.current, { timeScale: 2.2, duration: 0.6 });
    }
    if (badgeRef.current) {
      gsap.to(badgeRef.current, { scale: 1.08, duration: 0.4, ease: "back.out(2)" });
    }
  };

  const onBadgeLeave = () => {
    if (badgeTweenRef.current) {
      gsap.to(badgeTweenRef.current, { timeScale: 1, duration: 0.8 });
    }
    if (badgeRef.current) {
      gsap.to(badgeRef.current, { scale: 1, duration: 0.5, ease: "power2.out" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative w-full min-h-[815px] lg:h-[815px] bg-[#111C24] overflow-hidden"
    >
      {/* Background Hero Image (Figma #6838:1526: 1517 x 765.73px) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.png"
          alt="The Choo Cafe Espresso Bar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Figma Dark Overlay rgba(0, 0, 0, 0.40) */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Floating Coffee Bean Decoration Left with Mouse Parallax (Figma #6838:1494) */}
      <div
        ref={beanRef}
        className="absolute left-0 top-[540px] md:top-[569.62px] z-10 pointer-events-none select-none hidden sm:block will-change-transform"
        style={{ width: "114.75px", height: "131.97px" }}
      >
        <Image
          src="/images/bean-home-left.svg"
          alt=""
          width={115}
          height={132}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Navbar Integration (Figma #6838:1528) */}
      <div className="relative z-20">
        <Navbar onOpenLocation={onOpenLocation} />
      </div>

      {/* Center Content Box (Figma #6838:1539: x: 308.46, y: 226.92, w: 900.13, h: 408.95) */}
      <div className="relative z-20 w-full max-w-[960.13px] mx-auto px-4 pt-10 sm:pt-14 md:pt-[54px] pb-24 md:pb-20 flex flex-col items-center text-center">
        {/* Satisfying Word-by-Word Headline (Playfair Display Bold 101.07px) */}
        <h1 className="font-playfair font-bold text-white text-[42px] sm:text-[68px] md:text-[88px] lg:text-[101.07px] leading-[1.05] tracking-tight mb-4 drop-shadow-sm select-none">
          <span className="block">
            {"Discover the Coffee".split(" ").map((word, i) => (
              <span key={i} className="hero-word inline-block will-change-transform mr-[0.25em]">
                {word}
              </span>
            ))}
          </span>
          <span className="block">
            {"That Changes".split(" ").map((word, i) => (
              <span key={i} className="hero-word inline-block will-change-transform mr-[0.25em]">
                {word}
              </span>
            ))}
          </span>
          <span className="block">
            <span className="hero-word inline-block will-change-transform">
              Everything
            </span>
          </span>
        </h1>

        {/* Subtitle (Figma #6838:1542: Poppins Regular 18.95px, lineHeight 31.59px) */}
        <p className="hero-subtitle font-poppins font-normal text-white text-[15px] sm:text-[17px] md:text-[18.95px] leading-snug md:leading-[31.59px] max-w-[728.52px] mb-6 md:mb-7">
          Where every sip tells a story. Brewed with passion and comfort, it&apos;s your cozy escape filled with rich aromas and crafted flavors
        </p>

        {/* Customer Counter Badge (Figma #6838:1543) */}
        <div className="hero-counter inline-flex items-center justify-center flex-wrap gap-1.5 text-[#ECBA61] text-[20px] sm:text-[23px] md:text-[25.27px] leading-[1.09em]">
          <span className="font-playfair font-medium">We Served Over </span>
          <span className="font-poppins font-semibold">5000+</span>
          <span className="font-playfair font-medium"> Customer</span>
        </div>
      </div>

      {/* Rotating Circular "SCROLL DOWN ALL FOOD" Badge (Figma #6838:2325: x: 1240.17, y: 638, w: 168.44px) */}
      <div
        ref={badgeRef}
        className="hero-scroll-badge absolute right-4 sm:right-10 md:right-16 xl:right-[110px] top-[610px] md:top-[638px] z-20 will-change-transform"
      >
        <button
          onClick={scrollToMenu}
          onMouseEnter={onBadgeEnter}
          onMouseLeave={onBadgeLeave}
          className="group relative w-[120px] h-[120px] sm:w-[145px] sm:h-[145px] lg:w-[168.44px] lg:h-[168.44px] flex items-center justify-center cursor-pointer transition-transform duration-300 active:scale-95"
          aria-label="Scroll down to menu"
        >
          {/* Rotating Text Circle */}
          <div
            ref={circleTextRef}
            className="absolute inset-0 w-full h-full will-change-transform"
          >
            <Image
              src="/images/scroll-text-circle.svg"
              alt="Scroll down all food"
              width={168}
              height={168}
              priority
              className="w-full h-full object-contain"
            />
          </div>

          {/* Upright Center Mouse Icon with gentle pulse */}
          <div
            ref={mouseIconRef}
            className="relative z-10 w-[28px] h-[33px] sm:w-[35px] sm:h-[41px] lg:w-[40.43px] lg:h-[47.16px] flex items-center justify-center will-change-transform"
          >
            <Image
              src="/images/scroll-icon.svg"
              alt=""
              width={41}
              height={48}
              className="w-full h-full object-contain"
            />
          </div>
        </button>
      </div>

      {/* Bottom Torn Paper Texture (Figma #6838:1527: 1517.05 x 93.03px) */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full h-[70px] md:h-[93.03px] pointer-events-none select-none overflow-hidden">
        <img
          src="/images/paper-texture.png"
          alt=""
          className="w-full h-full object-fill"
        />
      </div>
    </section>
  );
}
