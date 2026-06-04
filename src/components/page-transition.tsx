import { motion, AnimatePresence } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const { location } = useRouterState();
  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={`curtain-${location.pathname}`}
          className="fixed inset-0 z-[80] pointer-events-none origin-bottom bg-accent"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 0.9, ease: [0.85, 0, 0.15, 1] }}
        />
        <motion.div
          key={`curtain2-${location.pathname}`}
          className="fixed inset-0 z-[79] pointer-events-none origin-bottom bg-background"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ scaleY: 0 }}
          transition={{ duration: 1.05, ease: [0.85, 0, 0.15, 1] }}
        />
      </AnimatePresence>
    </>
  );
}
