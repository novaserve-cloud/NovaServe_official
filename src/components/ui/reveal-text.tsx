"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export interface RevealTextProps {
  text?: string;
  textColor?: string;
  overlayColor?: string;
  fontSize?: string;
  letterDelay?: number;
  overlayDelay?: number;
  overlayDuration?: number;
  springDuration?: number;
  letterImages?: string[];
  className?: string;
}

export function RevealText({
  text = "NovaServe",
  textColor = "text-black dark:text-white",
  overlayColor = "text-[#FFB020]",
  fontSize = "text-xl",
  letterDelay = 0.04,
  overlayDelay = 0.03,
  overlayDuration = 0.4,
  springDuration = 400,
  className = "",
  letterImages = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
  ],
}: RevealTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [showGoldOverlay, setShowGoldOverlay] = useState(false);

  useEffect(() => {
    const lastLetterDelay = (text.length - 1) * letterDelay;
    const totalDelay = lastLetterDelay * 1000 + springDuration;

    const timer = setTimeout(() => {
      setShowGoldOverlay(true);
    }, totalDelay);

    return () => clearTimeout(timer);
  }, [text.length, letterDelay, springDuration]);

  return (
    <div className={`inline-flex items-center justify-center relative select-none ${className}`}>
      <div className="inline-flex">
        {text.split("").map((letter, index) => (
          <motion.span
            key={index}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`${fontSize} font-black tracking-tight cursor-pointer relative overflow-hidden inline-block`}
            initial={{
              scale: 0.8,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              delay: index * letterDelay,
              type: "spring",
              damping: 10,
              stiffness: 250,
              mass: 0.8,
            }}
          >
            {/* Invisible placeholder for size stability */}
            <span className="invisible">{letter}</span>

            {/* Base text layer */}
            <motion.span
              className={`absolute inset-0 ${textColor} flex items-center justify-center`}
              animate={{
                opacity: hoveredIndex === index ? 0 : 1,
              }}
              transition={{ duration: 0.15 }}
            >
              {letter}
            </motion.span>

            {/* Image text layer with background panning on hover */}
            <motion.span
              className="absolute inset-0 text-transparent bg-clip-text bg-cover bg-no-repeat flex items-center justify-center"
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
                backgroundPosition: hoveredIndex === index ? "10% center" : "0% center",
              }}
              transition={{
                opacity: { duration: 0.15 },
                backgroundPosition: {
                  duration: 2.5,
                  ease: "easeInOut",
                },
              }}
              style={{
                backgroundImage: `url('${letterImages[index % letterImages.length]}')`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              {letter}
            </motion.span>

            {/* Overlay text sweep on mount */}
            {showGoldOverlay && (
              <motion.span
                className={`absolute inset-0 ${overlayColor} pointer-events-none flex items-center justify-center font-black`}
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                }}
                transition={{
                  delay: index * overlayDelay,
                  duration: overlayDuration,
                  times: [0, 0.1, 0.7, 1],
                  ease: "easeInOut",
                }}
              >
                {letter}
              </motion.span>
            )}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

export default RevealText;
