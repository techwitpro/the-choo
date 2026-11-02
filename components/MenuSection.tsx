"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ItemDetailModal, { MenuItemData } from "./ItemDetailModal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

interface MenuSectionProps {
  onSelectItem?: (item: MenuItemData) => void;
}

export default function MenuSection({ onSelectItem }: MenuSectionProps) {
  const [activeTab, setActiveTab] = useState("Drinks");
  const [modalItem, setModalItem] = useState<MenuItemData | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const cupIllustrationRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: "Day Breakfast", label: "Day Breakfast" },
    { id: "Lunch MENU", label: "Lunch MENU" },
    { id: "Drinks", label: "Drinks" },
    { id: "Smoothing", label: "Smoothing" },
    { id: "Fresh Juice", label: "Fresh Juice" },
  ];

  const menuData: Record<string, { left: MenuItemData[]; right: MenuItemData[] }> = {
    Drinks: {
      left: [
        { name: "Expresso", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Hot Coffee" },
        { name: "Macchiato", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Hot Coffee" },
        { name: "Flat White", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Hot Coffee" },
        { name: "Latte", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Hot Coffee" },
        { name: "Long Black", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Hot Coffee" },
      ],
      right: [
        { name: "Cold Brew", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Iced Coffee" },
        { name: "Lemon", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Specialty Tea" },
        { name: "Cucumber", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Infused Cooler" },
        { name: "Mint", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Herbal Brew" },
        { name: "Iced Chai", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Spiced Latte" },
      ],
    },
    "Day Breakfast": {
      left: [
        { name: "Avocado Toast", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
        { name: "Eggs Benedict", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
        { name: "French Brioche", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
        { name: "Granola Parfait", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
        { name: "Classic Croissant", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
      ],
      right: [
        { name: "Smoked Salmon", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
        { name: "Pancake Stack", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
        { name: "Chia Pudding", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
        { name: "Shakshuka", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
        { name: "Almond Danish", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Breakfast" },
      ],
    },
    "Lunch MENU": {
      left: [
        { name: "Truffle Panini", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
        { name: "Chicken Caprese", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
        { name: "Mushroom Tart", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
        { name: "Turkey Melt", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
        { name: "Veggie Ciabatta", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
      ],
      right: [
        { name: "Roast Beef", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
        { name: "Harvest Bowl", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
        { name: "Caesar Salad", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
        { name: "Pumpkin Soup", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
        { name: "Focaccia Club", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Lunch" },
      ],
    },
    Smoothing: {
      left: [
        { name: "Berry Acai", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
        { name: "Mango Sunset", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
        { name: "Green Detox", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
        { name: "Peanut Protein", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
        { name: "Dragonfruit", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
      ],
      right: [
        { name: "Matcha Frappe", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
        { name: "Golden Glow", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
        { name: "Cold Espresso", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
        { name: "Blueberry Chia", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
        { name: "Coconut Breeze", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Smoothie" },
      ],
    },
    "Fresh Juice": {
      left: [
        { name: "Orange Sun", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
        { name: "Carrot Ginger", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
        { name: "Green Apple", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
        { name: "Watermelon", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
        { name: "Pomegranate", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
      ],
      right: [
        { name: "Citrus Zest", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
        { name: "Beetroot Zing", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
        { name: "Pineapple Mint", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
        { name: "Cucumber Lime", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
        { name: "Immune Boost", price: "$ 3.25 USD", description: "Rutrum blandit viverra tincidunt", category: "Juice" },
      ],
    },
  };

  const current = menuData[activeTab] || menuData.Drinks;

  const handleItemClick = (item: MenuItemData) => {
    setModalItem(item);
    if (onSelectItem) onSelectItem(item);
  };

  useGSAP(
    () => {
      const cup = cupIllustrationRef.current;
      if (!cup) return;

      // Organic continuous floating physics on the cup illustration
      gsap.to(cup, {
        y: -22,
        rotation: 4,
        duration: 5.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Kinetic Masked Header Reveal
      gsap.from(".menu-header-line", {
        y: "115%",
        rotateZ: 1.5,
        opacity: 0,
        stagger: 0.12,
        duration: 1.1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".menu-header",
          start: "top 85%",
          once: true,
        },
      });

      // Menu Badge Spring Reveal
      gsap.from(".menu-badge-icon", {
        scale: 0.7,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".menu-header",
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative w-full bg-[#F4F0E9] pt-[100px] md:pt-[130px] pb-[120px] md:pb-[160px] overflow-hidden"
    >
      {/* Floating Coffee Cup Illustration Right (Figma #6838:1547: SVG already has baked-in opacity 0.60) */}
      <div
        ref={cupIllustrationRef}
        className="absolute right-[-80px] bottom-[40px] pointer-events-none select-none z-0 hidden 2xl:block will-change-transform"
      >
        <Image
          src="/images/menu-cup-coffee.svg"
          alt=""
          width={535}
          height={385}
          className="w-[480px] h-auto object-contain"
        />
      </div>

      <div className="relative z-10 max-w-[1303.34px] mx-auto px-4 sm:px-6">
        {/* Header (Figma #6838:2070) */}
        <div className="menu-header flex flex-col items-center text-center max-w-[696.48px] mx-auto mb-10 md:mb-[31.58px]">
          {/* Badge SVG (Figma #6838:2072: 65.02 x 86.82px - SVG already has baked-in opacity 0.30) */}
          <div className="menu-badge-icon w-[50px] md:w-[65.02px] h-[66px] md:h-[86.82px] mb-[-14px] relative z-0 will-change-transform">
            <Image
              src="/images/menu-badge.svg"
              alt=""
              width={65}
              height={87}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Subtitle (Figma #6838:2100: Inter Medium 18.06px, #111C24, uppercase) */}
          <span className="font-inter font-medium text-[15px] md:text-[18.06px] leading-[21.06px] tracking-[0.063em] text-[#111C24] uppercase mb-[6px] relative z-10">
            Our menu
          </span>

          {/* Title (Figma #6838:2099: Playfair Display Bold 50.53px, lineHeight 67.38px, #111C24) */}
          <h2 className="font-playfair font-bold text-[34px] sm:text-[44px] md:text-[50.53px] leading-[1.15] md:leading-[67.38px] text-[#111C24] capitalize select-none">
            <span className="block overflow-hidden py-1">
              <span className="menu-header-line inline-block will-change-transform">
                Explore All Our Delicious
              </span>
            </span>
            <span className="block overflow-hidden py-1">
              <span className="menu-header-line inline-block will-change-transform">
                Food And Coffee Offerings
              </span>
            </span>
          </h2>
        </div>

        {/* Filter Tabs (Figma #6838:2101: 1303.34 x 48.53px) */}
        <div className="w-full mb-14 md:mb-[70px]">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto no-scrollbar gap-5 sm:gap-7 md:gap-[21.06px]">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative shrink-0 font-poppins text-[16px] md:text-[18.95px] leading-[21.06px] tracking-[0.06em] pb-[16px] px-2 transition-colors cursor-pointer capitalize ${
                    isActive
                      ? "text-[#111C24] font-medium"
                      : "text-[#111C24] font-normal hover:opacity-75"
                  }`}
                >
                  {tab.label}
                  {/* Active 2.11px border line (Figma #6838:2110) with smooth Framer Motion layoutId transition */}
                  {isActive && (
                    <motion.span
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.11px] bg-[#000000] z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Underline across width (Figma #6838:2118: 0.53px solid #283C4A) */}
          <div className="w-full h-[0.53px] bg-[#283C4A]/40 mt-[-0.53px]" />
        </div>

        {/* 2-Column Menu Items List with AnimatePresence */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14 lg:gap-[131.6px]"
          >
            {/* Left Column (Figma #6838:2120: 5 items, gap 73.69px) */}
            <div className="flex flex-col gap-8 md:gap-[55px] lg:gap-[73.69px]">
              {current.left.map((item, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 8 }}
                  className="group flex items-center justify-between gap-4 cursor-pointer"
                >
                  {/* Left: Icon + Text */}
                  <div className="flex items-center gap-[21.06px]">
                    {/* Gold Circle Cup Icon (Figma #6838:2123: 80.01 x 80.01px, #ECBA61) */}
                    <div className="w-[68px] h-[68px] sm:w-[80.01px] sm:h-[80.01px] rounded-full bg-[#ECBA61] flex items-center justify-center shrink-0 p-1.5 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12 shadow-sm">
                      <Image
                        src="/images/coffee-cup-icon.svg"
                        alt=""
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text Details (width 300.04px) */}
                    <div className="max-w-[300.04px]">
                      <h3 className="font-poppins font-semibold text-[20px] sm:text-[23.16px] leading-[38.95px] text-[#111C24] capitalize group-hover:text-[#D69E3D] transition-colors">
                        {item.name}
                      </h3>
                      <p className="font-poppins font-normal text-[15px] sm:text-[18.95px] leading-[31.59px] text-[#111C24]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price (Figma: Inter Black 17.77px, #111C24) */}
                  <div className="shrink-0 text-right">
                    <span className="font-inter font-black text-[16px] sm:text-[17.77px] leading-[23.16px] tracking-[0.0237em] text-[#111C24] transition-transform duration-300 group-hover:scale-110 inline-block">
                      {item.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column (Figma #6838:2161: 5 items, gap 73.69px) */}
            <div className="flex flex-col gap-8 md:gap-[55px] lg:gap-[73.69px]">
              {current.right.map((item, idx) => (
                <motion.div
                  key={idx}
                  onClick={() => handleItemClick(item)}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.04 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ x: 8 }}
                  className="group flex items-center justify-between gap-4 cursor-pointer"
                >
                  {/* Left: Icon + Text */}
                  <div className="flex items-center gap-[21.06px]">
                    {/* Gold Circle Cup Icon (Figma #6838:2164: 80.01 x 80.01px, #ECBA61) */}
                    <div className="w-[68px] h-[68px] sm:w-[80.01px] sm:h-[80.01px] rounded-full bg-[#ECBA61] flex items-center justify-center shrink-0 p-1.5 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-12 shadow-sm">
                      <Image
                        src="/images/coffee-cup-icon.svg"
                        alt=""
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Text Details (width 300.04px) */}
                    <div className="max-w-[300.04px]">
                      <h3 className="font-poppins font-semibold text-[20px] sm:text-[23.16px] leading-[38.95px] text-[#111C24] capitalize group-hover:text-[#D69E3D] transition-colors">
                        {item.name}
                      </h3>
                      <p className="font-poppins font-normal text-[15px] sm:text-[18.95px] leading-[31.59px] text-[#111C24]">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Price (Figma: Inter Black 17.77px, #111C24) */}
                  <div className="shrink-0 text-right">
                    <span className="font-inter font-black text-[16px] sm:text-[17.77px] leading-[23.16px] tracking-[0.0237em] text-[#111C24] transition-transform duration-300 group-hover:scale-110 inline-block">
                      {item.price}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <ItemDetailModal
        item={modalItem}
        onClose={() => setModalItem(null)}
      />
    </section>
  );
}
