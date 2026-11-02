"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Check, Coffee, Heart } from "lucide-react";

export interface MenuItemData {
  name: string;
  price: string;
  description: string;
  category?: string;
  image?: string;
  tags?: string[];
  calories?: string;
  dietary?: string;
}

interface ItemDetailModalProps {
  item: MenuItemData | null;
  onClose: () => void;
  onAddToCart?: (item: MenuItemData, qty: number, milk: string) => void;
}

export default function ItemDetailModal({
  item,
  onClose,
  onAddToCart,
}: ItemDetailModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [milkOption, setMilkOption] = useState("Oat Milk");
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);

  const handleAdd = () => {
    if (onAddToCart && item) {
      onAddToCart(item, quantity, milkOption);
    }
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg bg-[#111C24] text-white border border-[#ECBA61]/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="h-2 w-full bg-gradient-to-r from-[#283C4A] via-[#ECBA61] to-[#283C4A]" />

            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 text-white/60 hover:text-[#ECBA61] rounded-full hover:bg-white/5 transition-colors z-10 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 md:p-8">
          <div className="flex items-start gap-4 mb-5">
            <div className="w-20 h-20 rounded-full bg-[#ECBA61] flex items-center justify-center shrink-0 shadow-lg p-2 overflow-hidden">
              <Image
                src="/images/coffee-cup-icon.svg"
                alt={item.name}
                width={80}
                height={80}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1 pr-6">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#ECBA61] text-xs font-semibold uppercase tracking-wider">
                  {item.category || "Signature Selection"}
                </span>
                <button
                  type="button"
                  onClick={() => setLiked(!liked)}
                  className="text-white/40 hover:text-red-400 transition-colors"
                >
                  <Heart
                    className={`w-4 h-4 ${
                      liked ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>
              </div>
              <h2 className="font-poppins font-semibold text-2xl text-white">
                {item.name}
              </h2>
              <p className="font-inter font-black text-xl text-[#ECBA61] mt-1">
                {item.price}
              </p>
            </div>
          </div>

          <p className="text-white/80 font-poppins text-sm leading-relaxed mb-6">
            {item.description}. Made with 100% single-origin beans, gently roasted to bring out naturally sweet, rich notes with velvety smooth crema.
          </p>

          {/* Flavor Notes & Badges */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
              🌱 Vegan Friendly
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
              ☕ Single Origin Arabica
            </span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/80">
              ✨ Freshly Ground
            </span>
          </div>

          {/* Milk Options */}
          <div className="mb-6">
            <label className="block text-xs uppercase tracking-wider text-white/70 mb-2 font-medium">
              Milk Preference
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["Whole Milk", "Oat Milk", "Almond Milk"].map((milk) => (
                <button
                  key={milk}
                  type="button"
                  onClick={() => setMilkOption(milk)}
                  className={`py-2 px-3 text-xs rounded-lg border font-medium transition-all ${
                    milkOption === milk
                      ? "bg-[#ECBA61] text-[#111C24] border-[#ECBA61]"
                      : "bg-white/5 text-white/80 border-white/15 hover:border-[#ECBA61]/50"
                  }`}
                >
                  {milk}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Action */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center border border-white/20 rounded-lg overflow-hidden bg-white/5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 font-inter font-bold text-sm text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={handleAdd}
              disabled={added}
              className={`flex-1 py-3 px-6 rounded-lg font-poppins font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                added
                  ? "bg-green-600 text-white"
                  : "bg-[#ECBA61] text-[#111C24] hover:bg-[#D69E3D]"
              }`}
            >
              {added ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Order!</span>
                </>
              ) : (
                <>
                  <Coffee className="w-4 h-4" />
                  <span>Add to Order • {item.price}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
  );
}

