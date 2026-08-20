import { Variants } from "framer-motion";

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 1, y: 0, x: 0, scale: 1 },
  visible: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0 } },
  exit: { opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0 } },
};

export function getSafeVariants(variants: Variants, prefersReduced: boolean): Variants {
  return prefersReduced ? reducedMotionVariants : variants;
}
