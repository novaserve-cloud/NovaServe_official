"use client";

import React, { useState, useEffect } from "react";
import { motion, HTMLMotionProps, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ImageTextProps extends HTMLMotionProps<"span"> {
  text: string;
  imageUrl: string | string[] | { src: string } | { src: string }[];
  className?: string;
  direction?: "horizontal" | "vertical" | "diagonal" | "none";
  interval?: number;
}

export function ImageText({
  text,
  imageUrl,
  className,
  direction = "horizontal",
  interval = 3000,
  ...props
}: ImageTextProps) {
  const images = Array.isArray(imageUrl) ? imageUrl : [imageUrl];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!Array.isArray(imageUrl) || imageUrl.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [imageUrl, interval, images.length]);

  // Helper to handle both string URLs and StaticImageData objects
  const getCurrentImageUrl = () => {
    const img = images[currentImageIndex];
    return typeof img === "string" ? img : img.src;
  };

  const getAnimation = () => {
    switch (direction) {
      case "horizontal":
        return {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        };
      case "vertical":
        return {
          backgroundPosition: ["50% 0%", "50% 100%", "50% 0%"],
        };
      case "diagonal":
        return {
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        };
      case "none":
        return {
          backgroundPosition: "center",
        };
      default:
        return {
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        };
    }
  };

  return (
    <span className={cn("inline-block relative overflow-hidden", className)}>
      {/* Invisible layout placeholder ensuring size doesn't collapse */}
      <span className={cn("inline-block invisible select-none", className)}>
        {text}
      </span>

      <AnimatePresence mode="wait">
        <motion.span
          key={currentImageIndex} // Re-render for image change
          className={cn(
            "inline-block absolute inset-0 font-black tracking-tight",
            className
          )}
          style={{
            backgroundImage: `url(${getCurrentImageUrl()})`,
            backgroundSize: direction === "none" ? "cover" : "200% auto",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
          initial={{ opacity: 0 }}
          animate={{
            ...getAnimation(),
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          transition={{
            // Smooth opacity fade for texture change
            opacity: { duration: 0.8 },
            // Continuous background movement
            backgroundPosition: {
              duration: 12,
              ease: "linear",
              repeat: Infinity,
            },
          }}
          {...props}
        >
          {text}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default ImageText;
