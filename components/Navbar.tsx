"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenLocation?: () => void;
}

export default function Navbar({ onOpenLocation }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 150);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Main Header matching Figma #6838:1528 */}
      <header className="relative w-full max-w-[1285px] mx-auto pt-[37.89px] px-4 md:px-6 z-30">
        <div className="flex items-center justify-between gap-6 pb-[27.37px]">
          {/* Logo (Figma #6838:1531: 170.55 x 47.57px) */}
          <Link
            href="/"
            className="relative block w-[140px] md:w-[170.55px] h-[39px] md:h-[47.57px] shrink-0 transition-opacity hover:opacity-90"
          >
            <Image
              src="/images/logo.svg"
              alt="THE CHOO - MILTON"
              width={171}
              height={48}
              priority
              className="w-full h-full object-contain"
            />
          </Link>

          {/* Desktop Nav Links (Figma #6838:1532: gap 63.17px) */}
          <nav className="hidden md:flex items-center gap-[63.17px]">
            <button
              onClick={() => handleScrollTo("menu")}
              className="text-white hover:text-[#ECBA61] font-poppins font-medium text-[18.95px] leading-[31.59px] tracking-[0.02em] transition-colors cursor-pointer capitalize"
            >
              Menu
            </button>
            <button
              onClick={onOpenLocation ? onOpenLocation : () => handleScrollTo("location")}
              className="text-white hover:text-[#ECBA61] font-poppins font-medium text-[18.95px] leading-[31.59px] tracking-[0.02em] transition-colors cursor-pointer capitalize"
            >
              Location
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="text-white hover:text-[#ECBA61] font-poppins font-medium text-[18.95px] leading-[31.59px] tracking-[0.02em] transition-colors cursor-pointer capitalize"
            >
              About
            </button>
          </nav>

          {/* Desktop "Our Menu" Button (Figma #6838:1536: #ECBA61, padding: 14.74px 33.69px) */}
          <div className="hidden md:flex items-center">
            <button
              onClick={() => handleScrollTo("menu")}
              className="bg-[#ECBA61] hover:bg-[#D69E3D] text-[#111C24] font-poppins font-normal text-[18.95px] leading-[18.95px] tracking-[0.0178em] px-[33.69px] py-[14.74px] rounded-none transition-colors duration-200 active:scale-[0.98] cursor-pointer"
            >
              Our Menu
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#ECBA61] transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {/* Horizontal Divider (Figma #6838:1538: height 1.13px, stroke white, opacity 0.60) */}
        <div className="w-full h-[1.13px] bg-white/60" />
      </header>

      {/* Sticky Mini Header on Scroll */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "translate-y-0 opacity-100 bg-[#111C24]/95 backdrop-blur-md shadow-xl border-b border-white/10 py-3.5"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
      >
        <div className="max-w-[1285px] mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="block w-[130px] h-[36px] relative">
            <Image
              src="/images/logo.svg"
              alt="THE CHOO"
              width={130}
              height={36}
              className="w-full h-full object-contain"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleScrollTo("menu")}
              className="text-white/80 hover:text-[#ECBA61] font-poppins text-sm tracking-wide transition-colors"
            >
              Menu
            </button>
            <button
              onClick={onOpenLocation ? onOpenLocation : () => handleScrollTo("location")}
              className="text-white/80 hover:text-[#ECBA61] font-poppins text-sm tracking-wide transition-colors"
            >
              Location
            </button>
            <button
              onClick={() => handleScrollTo("about")}
              className="text-white/80 hover:text-[#ECBA61] font-poppins text-sm tracking-wide transition-colors"
            >
              About
            </button>
          </nav>

          <button
            onClick={() => handleScrollTo("menu")}
            className="bg-[#ECBA61] hover:bg-[#D69E3D] text-[#111C24] font-poppins text-xs md:text-sm font-medium px-5 py-2.5 transition-colors"
          >
            Our Menu
          </button>
        </div>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-50 md:hidden bg-[#111C24]/98 backdrop-blur-lg flex flex-col p-6"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="w-[140px] h-[39px] relative">
                <Image
                  src="/images/logo.svg"
                  alt="THE CHOO"
                  width={140}
                  height={39}
                  className="w-full h-full object-contain"
                />
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-white/80 hover:text-[#ECBA61] cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex flex-col gap-6 py-8">
              <button
                onClick={() => handleScrollTo("menu")}
                className="text-left text-2xl font-poppins font-medium text-white hover:text-[#ECBA61] transition-colors cursor-pointer"
              >
                Menu
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenLocation) onOpenLocation();
                  else handleScrollTo("location");
                }}
                className="text-left text-2xl font-poppins font-medium text-white hover:text-[#ECBA61] transition-colors cursor-pointer"
              >
                Location
              </button>
              <button
                onClick={() => handleScrollTo("about")}
                className="text-left text-2xl font-poppins font-medium text-white hover:text-[#ECBA61] transition-colors cursor-pointer"
              >
                About
              </button>
              <button
                onClick={() => handleScrollTo("snacks")}
                className="text-left text-2xl font-poppins font-medium text-white hover:text-[#ECBA61] transition-colors cursor-pointer"
              >
                Our Snacks
              </button>
            </div>

            <div className="mt-auto pt-6 border-t border-white/10">
              <button
                onClick={() => handleScrollTo("menu")}
                className="w-full py-4 bg-[#ECBA61] text-[#111C24] font-poppins font-semibold text-center rounded-none hover:bg-[#D69E3D] transition-colors cursor-pointer"
              >
                Our Menu
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
