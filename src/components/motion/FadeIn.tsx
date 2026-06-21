"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";
import { useMounted } from "@/hooks/useMounted";

interface FadeInProps {
  children: ReactNode;
  direction?: "up" | "down" | "left" | "right";
  delay?: number;
  duration?: number;
  className?: string;
  role?: React.AriaRole;
  "aria-live"?: React.AriaAttributes["aria-live"];
  "aria-label"?: React.AriaAttributes["aria-label"];
  id?: string;
}

export function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  className = "",
  role,
  "aria-live": ariaLive,
  "aria-label": ariaLabel,
  id,
}: FadeInProps) {
  const mounted = useMounted();
  const shouldReduceMotion = useReducedMotion();
  const directions = {
    up: { y: 30 },
    down: { y: -30 },
    left: { x: 30 },
    right: { x: -30 },
  };
  const ariaProps = {
    role,
    "aria-live": ariaLive,
    "aria-label": ariaLabel,
    id,
  };

  if (!mounted || shouldReduceMotion) {
    return (
      <div className={className} {...ariaProps}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      {...ariaProps}
    >
      {children}
    </motion.div>
  );
}
