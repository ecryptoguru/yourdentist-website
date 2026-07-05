"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";
import { useMounted } from "@/hooks/useMounted";

const CONSENT_KEY = "yd-cookie-consent";

export default function CookieConsent() {
  const [show, setShow] = useState(false);
  const mounted = useMounted();

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShow(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setShow(false);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, "declined");
    setShow(false);
  };

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-20 left-4 right-4 sm:bottom-4 sm:left-auto sm:right-4 sm:max-w-md z-50"
          role="dialog"
          aria-label="Cookie consent"
        >
          <div className="bg-white dark:bg-warm-800 rounded-2xl border border-slate-200 dark:border-warm-600 shadow-xl p-5">
            <div className="flex items-start gap-3 mb-3">
              <Cookie className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-slate-700 dark:text-warm-200 leading-relaxed">
                  We use cookies to enhance your experience and analyse site
                  traffic. By clicking &ldquo;Accept&rdquo;, you consent to our
                  use of cookies.
                </p>
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                className="border border-slate-200 dark:border-warm-600 text-slate-600 dark:text-warm-300 hover:bg-slate-50 dark:hover:bg-warm-700 rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                onClick={decline}
              >
                Decline
              </button>
              <button
                className="bg-teal-600 hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400 text-white rounded-lg px-4 py-2 text-sm font-medium transition-colors"
                onClick={accept}
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
