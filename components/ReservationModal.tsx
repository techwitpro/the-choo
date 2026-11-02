"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, Users, CheckCircle, Sparkles } from "lucide-react";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({
  isOpen,
  onClose,
}: ReservationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    guests: "2",
    date: "",
    time: "14:00",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
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
            onClick={handleReset}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.94, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 15 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-lg bg-[#111C24] text-white border border-[#ECBA61]/30 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Decorative Top Accent */}
            <div className="h-2 w-full bg-gradient-to-r from-[#283C4A] via-[#ECBA61] to-[#283C4A]" />

            {/* Close Button */}
            <button
              onClick={handleReset}
              className="absolute top-5 right-5 p-2 text-white/60 hover:text-[#ECBA61] rounded-full hover:bg-white/5 transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="p-8 text-center flex flex-col items-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#ECBA61]/20 border border-[#ECBA61] flex items-center justify-center text-[#ECBA61] mb-5">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl font-bold text-[#ECBA61] mb-3">
                  Table Reserved!
                </h3>
                <p className="text-white/80 font-poppins text-sm md:text-base mb-6 max-w-sm">
                  Thank you, <span className="text-[#ECBA61] font-semibold">{formData.name}</span>. We have reserved a table for{" "}
                  <span className="text-[#ECBA61] font-semibold">{formData.guests} guests</span> on{" "}
                  <span className="text-[#ECBA61] font-semibold">{formData.date || "your requested date"}</span> at{" "}
                  <span className="text-[#ECBA61] font-semibold">{formData.time}</span>.
                </p>
                <div className="p-4 bg-white/5 rounded-xl border border-white/10 w-full mb-6 text-left text-xs space-y-1.5 text-white/70">
                  <p>📍 <strong className="text-white">Location:</strong> Armstrong, North Nanook V4Y, V0E, Canada</p>
                  <p>📞 <strong className="text-white">Questions?</strong> Call +12 960 849493</p>
                </div>
                <button
                  onClick={handleReset}
                  className="w-full py-3.5 px-6 bg-[#ECBA61] text-[#111C24] font-poppins font-medium rounded-lg hover:bg-[#D69E3D] transition-colors"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-2 text-[#ECBA61] text-xs uppercase tracking-widest font-semibold mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>THE CHOO CAFE RESERVATIONS</span>
                </div>
                <h2 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-2">
                  Book Your Cozy Table
                </h2>
                <p className="text-white/70 text-sm mb-6">
                  Reserve your spot to enjoy our specialty brewed coffee and fresh artisanal snacks.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ECBA61] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+1 234 567 890"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ECBA61] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 bg-white/5 border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ECBA61] transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                        <Users className="w-3.5 h-3.5 inline mr-1" />
                        Guests
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({ ...formData, guests: e.target.value })
                        }
                        className="w-full px-3 py-2.5 bg-[#172530] border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#ECBA61]"
                      >
                        <option value="1">1 Person</option>
                        <option value="2">2 Persons</option>
                        <option value="3">3 Persons</option>
                        <option value="4">4 Persons</option>
                        <option value="5+">5+ Persons</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 inline mr-1" />
                        Date
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) =>
                          setFormData({ ...formData, date: e.target.value })
                        }
                        className="w-full px-2.5 py-2.5 bg-[#172530] border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#ECBA61]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                        <Clock className="w-3.5 h-3.5 inline mr-1" />
                        Time
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) =>
                          setFormData({ ...formData, time: e.target.value })
                        }
                        className="w-full px-2.5 py-2.5 bg-[#172530] border border-white/15 rounded-lg text-sm text-white focus:outline-none focus:border-[#ECBA61]"
                      >
                        <option value="10:00">10:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="18:00">06:00 PM</option>
                        <option value="20:00">08:00 PM</option>
                        <option value="22:00">10:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 mb-1 font-medium">
                      Special Notes / Dietary Requests
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Window seat, celebration, oat milk preference..."
                      value={formData.notes}
                      onChange={(e) =>
                        setFormData({ ...formData, notes: e.target.value })
                      }
                      className="w-full px-3.5 py-2 bg-white/5 border border-white/15 rounded-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#ECBA61] transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 bg-[#ECBA61] text-[#111C24] font-poppins font-semibold text-base rounded-lg hover:bg-[#D69E3D] transition-all duration-200 shadow-lg shadow-[#ECBA61]/10 active:scale-[0.99]"
                    >
                      Confirm Reservation
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

