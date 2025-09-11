"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export default function TransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Ensure client + server HTML match before animating
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>; // render without animation on first load
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={variants}
          initial="hidden"
          animate="enter"
          exit="exit"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
