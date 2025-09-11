"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1200); // keep it a bit longer for book flip effect
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-white via-steelblue-100 to-purple-100 z-50"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Book Loader */}
          <div className="relative w-16 h-12">
            {/* Left Cover */}
            <motion.div
              className="absolute left-0 top-0 w-1/2 h-full bg-purple-700 origin-right rounded-l-md shadow-md"
              animate={{ rotateY: [0, -180, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
              }}
              style={{ transformStyle: "preserve-3d" }}
            />
            {/* Right Cover */}
            <div className="absolute right-0 top-0 w-1/2 h-full bg-purple-900 rounded-r-md shadow-md" />
            {/* Pages flipping */}
            <motion.div
              className="absolute left-1/2 top-0 w-1/2 h-full bg-white origin-left rounded-r-sm"
              animate={{ rotateY: [0, -180, 0] }}
              transition={{
                repeat: Infinity,
                duration: 1.2,
                ease: "easeInOut",
                delay: 0.3,
              }}
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
