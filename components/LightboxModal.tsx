"use client";

import React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface LightboxModalProps {
  imageSrc: string | null;
  altText?: string;
  onClose: () => void;
}

export default function LightboxModal({
  imageSrc,
  altText = "Gallery image",
  onClose,
}: LightboxModalProps) {
  return (
    <AnimatePresence>
      {imageSrc && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-white/80 hover:text-[#ECBA61] rounded-full bg-white/10 hover:bg-white/20 transition-colors z-20 cursor-pointer"
            aria-label="Close image preview"
          >
            <X className="w-6 h-6" />
          </motion.button>

          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl max-h-[85vh] w-full h-[80vh] rounded-2xl overflow-hidden border border-[#ECBA61]/30 shadow-2xl bg-black/40"
          >
            <Image
              src={imageSrc}
              alt={altText}
              fill
              className="object-contain"
              priority
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

