"use client";

import { useState, useEffect } from "react";
import { clinicInfo } from "@/lib/data";
import { Phone, MessageCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMounted } from "@/hooks/useMounted";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (dismissed || !mounted) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-40 sm:hidden"
        >
          <div className="bg-white dark:bg-warm-800 border-t border-slate-200 dark:border-warm-600 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] px-4 py-3 flex items-center gap-3">
            <a
              href={clinicInfo.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl py-3 font-medium text-sm transition-colors touch-manipulation"
            >
              <MessageCircle className="w-4 h-4" />
              Book Appointment
            </a>
            <a
              href={clinicInfo.phoneLink}
              className="flex items-center justify-center gap-2 bg-slate-100 dark:bg-warm-700 hover:bg-slate-200 dark:hover:bg-warm-600 text-slate-800 dark:text-warm-200 rounded-xl py-3 px-4 font-medium text-sm transition-colors touch-manipulation"
            >
              <Phone className="w-4 h-4" />
              Call
            </a>
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss booking bar"
              className="w-9 h-9 flex items-center justify-center text-slate-500 dark:text-warm-400 hover:text-slate-600 dark:hover:text-warm-300 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
