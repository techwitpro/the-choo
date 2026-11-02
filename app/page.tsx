"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import ExperienceSection from "@/components/ExperienceSection";
import WhyUsSection from "@/components/WhyUsSection";
import MenuSection from "@/components/MenuSection";
import SnacksSection from "@/components/SnacksSection";
import AboutSection from "@/components/AboutSection";
import CtaSection from "@/components/CtaSection";
import GallerySection from "@/components/GallerySection";
import InstagramSection from "@/components/InstagramSection";
import Footer from "@/components/Footer";
import LocationModal from "@/components/LocationModal";
import CustomCursor from "@/components/animations/CustomCursor";

export default function Home() {
  const [locationOpen, setLocationOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#F4F0E9] text-[#111C24] selection:bg-[#ECBA61] selection:text-[#111C24]">
      {/* Creative Fluid GSAP Custom Cursor */}
      <CustomCursor />

      {/* 1. Hero & Header */}
      <Hero onOpenLocation={() => setLocationOpen(true)} />

      {/* 2. Experience / Taste Coffee Section */}
      <ExperienceSection />

      {/* 3. Why Us / Special Coffee Section */}
      <WhyUsSection />

      {/* 4. Menu Section */}
      <MenuSection />

      {/* 5. Snacks Section */}
      <SnacksSection />

      {/* 6. About Us Section */}
      <AboutSection />

      {/* 7. Unforgettable Coffee CTA Banner */}
      <CtaSection onOpenLocation={() => setLocationOpen(true)} />

      {/* 8. Gallery / Coffee Shared with a Friend */}
      <GallerySection />

      {/* 9. Social Feed Images */}
      <InstagramSection />

      {/* 10. Footer */}
      <Footer />

      {/* Location Modal */}
      <LocationModal
        isOpen={locationOpen}
        onClose={() => setLocationOpen(false)}
      />
    </main>
  );
}
