"use client";

import * as React from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";

export function Preloader() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background"
        >
          {/* Ambient glow orbs */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.4, 0.2], scale: [0.5, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute size-72 rounded-full bg-primary/15 blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.3, 0.1], scale: [0.5, 1.4, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="absolute size-56 rounded-full bg-accent/15 blur-3xl"
          />

          {/* Logo container */}
          <div className="relative flex items-center justify-center">
            {/* Outer rotating ring — dashed gold */}
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              transition={{
                rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.3 },
              }}
              className="absolute size-32 rounded-full border-2 border-dashed border-primary/40"
            />

            {/* Middle ring — solid arc spinning */}
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: -360, opacity: 1 }}
              transition={{
                rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.3, delay: 0.1 },
              }}
              className="absolute size-24 rounded-full border-2 border-transparent border-t-primary border-r-primary/60"
            />

            {/* Inner ring — accent arc */}
            <motion.div
              initial={{ rotate: 0, opacity: 0 }}
              animate={{ rotate: 360, opacity: 1 }}
              transition={{
                rotate: { duration: 1, repeat: Infinity, ease: "linear" },
                opacity: { duration: 0.3, delay: 0.2 },
              }}
              className="absolute size-16 rounded-full border-2 border-transparent border-b-accent border-l-accent/60"
            />

            {/* Logo with pulse + glow */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="relative"
              >
                {/* Glow behind logo */}
                <motion.div
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full bg-primary/40 blur-md"
                />
                <Image
                  src="/logo.png"
                  alt="Ashencrest"
                  width={48}
                  height={48}
                  priority
                  className="relative rounded-full object-cover"
                  style={{ width: "auto", height: "auto" }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Brand name — letter-by-letter reveal */}
          <div className="mt-10 flex overflow-hidden">
            {"Ashencrest".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.05, duration: 0.3, ease: "easeOut" }}
                className="font-heading text-2xl font-bold tracking-wide text-foreground"
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Tagline fade-in */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.4 }}
            className="mt-1 text-xs tracking-[0.3em] text-muted-foreground uppercase"
          >
            Celebrity Booking Agency
          </motion.span>

          {/* Loading bar — fill animation */}
          <div className="mt-6 h-0.5 w-48 overflow-hidden rounded-full bg-border/50">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="h-full rounded-full bg-gradient-to-r from-primary via-accent to-primary"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
