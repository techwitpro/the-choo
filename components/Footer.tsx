"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      // 1. Giant Logo & Tagline Reveal
      gsap.from(".footer-hero", {
        y: 30,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".footer-hero",
          start: "top 85%",
          once: true,
        },
      });

      // 2. 3 Information Columns Staggered Entrance
      gsap.from(".footer-column", {
        y: 35,
        opacity: 0,
        stagger: 0.15,
        duration: 0.85,
        ease: "back.out(1.4)",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".footer-columns-wrap",
          start: "top 85%",
          once: true,
        },
      });

      // 3. Vertical Dividers Unfold
      gsap.from(".footer-v-divider", {
        scaleY: 0,
        transformOrigin: "center",
        duration: 0.8,
        ease: "power2.inOut",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".footer-columns-wrap",
          start: "top 85%",
          once: true,
        },
      });

      // 4. Horizontal Divider Line Expand
      gsap.from(".footer-h-divider", {
        scaleX: 0,
        transformOrigin: "center",
        duration: 0.9,
        ease: "power2.out",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".footer-h-divider",
          start: "top 95%",
          once: true,
        },
      });

      // 5. Social Icons Pop-in
      gsap.from(".footer-social-btn", {
        scale: 0,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "back.out(2)",
        clearProps: "all",
        scrollTrigger: {
          trigger: ".footer-bottom-bar",
          start: "top 95%",
          once: true,
        },
      });
    },
    { scope: footerRef }
  );

  return (
    <footer
      ref={footerRef}
      id="location"
      className="relative w-full bg-[#111C24] text-white pt-10 md:pt-[74.75px] pb-12 overflow-hidden"
    >
      <div className="max-w-[1308.6px] mx-auto px-4 sm:px-6">
        {/* Giant Logo Brandmark & Tagline (Figma #6838:2235: 1305.44 x 174.28px) */}
        <div className="footer-hero flex flex-col items-center text-center mb-14 md:mb-[85.76px]">
          {/* Logo with horizontal lines (Figma #6838:2236: 1305.44 x 78.96px) */}
          <div className="w-full max-w-[1305.44px] h-[50px] sm:h-[65px] md:h-[78.96px] relative mb-[26.32px]">
            <Image
              src="/images/footer-logo.svg"
              alt="THE CHOO - MILTON"
              width={1306}
              height={79}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Tagline (Figma #6838:2240: Poppins Regular 18.95px, #ECBA61, max-w 457.96px) */}
          <p className="font-poppins font-normal text-[15px] sm:text-[17px] md:text-[18.95px] leading-relaxed md:leading-[31.59px] text-[#ECBA61] max-w-[457.96px] mx-auto">
            Smooth and balanced, our coffee combines rich flavors with careful craftsmanship to delight every palate
          </p>
        </div>

        {/* 3 Information Columns with 180px Vertical Dividers (Figma #6838:2205: gap 114.75px) */}
        <div className="footer-columns-wrap flex flex-col md:flex-row items-center justify-between gap-10 md:gap-6 lg:gap-[60px] mb-14 md:mb-[51.57px]">
          {/* Column 1: Contact Us (width 296.85px) */}
          <div className="footer-column w-full md:w-[296.85px] flex flex-col items-center text-center">
            <h3 className="font-playfair font-bold text-[26px] md:text-[33.69px] leading-tight text-white mb-[27.32px]">
              Contact Us
            </h3>
            <div className="flex flex-col items-center gap-[10.53px]">
              {/* Phone */}
              <a
                href="tel:+12960849493"
                className="group flex items-center gap-[17.9px] text-white hover:text-[#ECBA61] transition-colors"
              >
                <div className="w-[25.27px] h-[25.27px] relative shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">
                  <Image
                    src="/images/footer-call.svg"
                    alt=""
                    width={26}
                    height={26}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-poppins font-normal text-[16px] md:text-[18.95px] leading-[31.59px]">
                  +12 960 849493
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:dummydesign@gmail.com"
                className="group flex items-center gap-[11.58px] text-white hover:text-[#ECBA61] transition-colors"
              >
                <div className="w-[25.27px] h-[25.27px] relative shrink-0 transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12">
                  <Image
                    src="/images/footer-mail.svg"
                    alt=""
                    width={26}
                    height={26}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-poppins font-normal text-[16px] md:text-[18.95px] leading-[31.59px]">
                  dummydesign@gmail.com
                </span>
              </a>
            </div>
          </div>

          {/* Vertical Divider Line 1 (Figma #6838:2219: height 180.03px, white) */}
          <div className="footer-v-divider hidden md:block w-[1.05px] h-[180.03px] bg-white/40 will-change-transform" />

          {/* Column 2: Address (width 244.24px) */}
          <div className="footer-column w-full md:w-[244.24px] flex flex-col items-center text-center">
            <h3 className="font-playfair font-bold text-[26px] md:text-[33.69px] leading-tight text-white mb-[32.59px]">
              Address
            </h3>
            <p className="font-poppins font-normal text-[16px] md:text-[18.95px] leading-relaxed md:leading-[31.59px] text-white max-w-[244.24px]">
              Armstrong,North Nanook<br />
              V4Y, V0E,Canada
            </p>
          </div>

          {/* Vertical Divider Line 2 (Figma #6838:2223: height 180.03px, white) */}
          <div className="footer-v-divider hidden md:block w-[1.05px] h-[180.03px] bg-white/40 will-change-transform" />

          {/* Column 3: Opening Hours (width 304px) */}
          <div className="footer-column w-full md:w-[304px] flex flex-col items-center text-center">
            <h3 className="font-playfair font-bold text-[26px] md:text-[33.69px] leading-tight text-white mb-[32.59px]">
              Opening Hours
            </h3>
            <p className="font-poppins font-normal text-[16px] md:text-[18.95px] leading-relaxed md:leading-[31.59px] text-white max-w-[304px]">
              Mon – Thu (10:00 AM – 01:00 AM)<br />
              Fri – Sun (11:00 AM – 10:00 PM)
            </p>
          </div>
        </div>

        {/* Horizontal Divider Line (Figma #6838:2228: height 1.05px, white) */}
        <div className="footer-h-divider w-full h-[1.05px] bg-white/30 mb-[31.58px] will-change-transform" />

        {/* Bottom Bar (Figma #6838:2229) */}
        <div className="footer-bottom-bar flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright (Figma #6838:2230: Playfair Regular 18.95px, #ECBA61) */}
          <p className="font-playfair font-normal text-[15px] md:text-[18.95px] leading-[37.9px] text-[#ECBA61] text-center sm:text-left">
            2025 ©Design Monks. All rights reserved.
          </p>

          {/* Social Icons (Figma #6838:2231: gap 22.11px) */}
          <div className="flex items-center gap-[22.11px]">
            {/* Facebook (Figma #6838:2232: 33.69 x 33.69px) */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="footer-social-btn w-[33.69px] h-[33.69px] relative transition-transform duration-300 hover:scale-125 hover:-translate-y-1 active:scale-95 block"
            >
              <Image
                src="/images/footer-social-1.svg"
                alt="Facebook"
                width={34}
                height={34}
                className="w-full h-full object-contain"
              />
            </a>

            {/* Instagram (Figma #6838:2233: 33.66 x 33.69px) */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="footer-social-btn w-[33.66px] h-[33.69px] relative transition-transform duration-300 hover:scale-125 hover:-translate-y-1 active:scale-95 block"
            >
              <Image
                src="/images/footer-social-2.svg"
                alt="Instagram"
                width={34}
                height={34}
                className="w-full h-full object-contain"
              />
            </a>

            {/* WhatsApp (Figma #6838:2234: 33.69 x 33.69px) */}
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="footer-social-btn w-[33.69px] h-[33.69px] relative transition-transform duration-300 hover:scale-125 hover:-translate-y-1 active:scale-95 block"
            >
              <Image
                src="/images/footer-social-3.svg"
                alt="WhatsApp"
                width={34}
                height={34}
                className="w-full h-full object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
