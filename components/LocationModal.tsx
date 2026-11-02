"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, Phone, Clock, Mail, ExternalLink, Copy, Check } from "lucide-react";

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LocationModal({ isOpen, onClose }: LocationModalProps) {
  const [copied, setCopied] = useState(false);

  const address = "Armstrong, North Nanook V4Y, V0E, Canada";

  const handleCopy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-2xl bg-[#111C24] text-white border border-[#ECBA61]/30 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Accent Bar */}
            <div className="h-2 w-full bg-gradient-to-r from-[#283C4A] via-[#ECBA61] to-[#283C4A]" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-white/60 hover:text-[#ECBA61] rounded-full hover:bg-white/5 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
              <div className="text-[#ECBA61] text-xs uppercase tracking-widest font-semibold mb-2">
                VISIT THE CHOO CAFE
              </div>
              <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-4">
                Our Location & Hours
              </h2>

              {/* Embedded Map Representation */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-white/10 mb-6 bg-[#172530]">
                <iframe
                  title="Cafe Location Map"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "contrast(1.1) brightness(0.9)" }}
                  loading="lazy"
                  src="https://maps.google.com/maps?q=Armstrong,British+Columbia,Canada&t=&z=13&ie=UTF8&iwloc=&output=embed"
                />
                <div className="absolute bottom-3 left-3 bg-[#111C24]/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#ECBA61]/40 flex items-center gap-2 text-xs text-[#ECBA61]">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>THE CHOO CAFE • Armstrong, BC</span>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2.5 text-[#ECBA61] mb-2 font-medium text-sm">
                    <MapPin className="w-4 h-4 shrink-0" />
                    <span>Store Address</span>
                  </div>
                  <p className="text-white/90 text-sm font-poppins mb-3">
                    {address}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="inline-flex items-center gap-1.5 text-xs text-[#ECBA61] hover:text-[#D69E3D] font-medium"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied to clipboard" : "Copy full address"}</span>
                  </button>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2.5 text-[#ECBA61] mb-2 font-medium text-sm">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>Opening Hours</span>
                  </div>
                  <div className="text-xs space-y-1 text-white/80 font-poppins">
                    <div className="flex justify-between">
                      <span>Mon – Thu:</span>
                      <span className="font-semibold text-white">10:00 AM – 01:00 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fri – Sun:</span>
                      <span className="font-semibold text-white">11:00 AM – 10:00 PM</span>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2.5 text-[#ECBA61] mb-1.5 font-medium text-sm">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>Phone Orders & Inquiries</span>
                  </div>
                  <a
                    href="tel:+12960849493"
                    className="text-white hover:text-[#ECBA61] text-sm font-poppins font-semibold transition-colors"
                  >
                    +12 960 849493
                  </a>
                </div>

                <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2.5 text-[#ECBA61] mb-1.5 font-medium text-sm">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span>Email Us</span>
                  </div>
                  <a
                    href="mailto:dummydesign@gmail.com"
                    className="text-white hover:text-[#ECBA61] text-sm font-poppins transition-colors"
                  >
                    dummydesign@gmail.com
                  </a>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-3">
                <a
                  href="https://maps.google.com?q=Armstrong,North+Nanook+V4Y,Canada"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-6 bg-[#ECBA61] text-[#111C24] font-poppins font-semibold text-center rounded-lg hover:bg-[#D69E3D] transition-colors flex items-center justify-center gap-2"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  onClick={onClose}
                  className="py-3 px-6 bg-white/10 text-white font-poppins font-medium rounded-lg hover:bg-white/15 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

