import { Transition } from "framer-motion";

export const transitions: Record<string, Transition> = {
  fast: {
    duration: 0.15,
    ease: "easeOut",
  },
  smooth: {
    duration: 0.25,
    ease: "easeOut",
  },
  subtle: {
    duration: 0.35,
    ease: "easeInOut",
  },
  spring: {
    type: "spring",
    stiffness: 400,
    damping: 30,
  },
  springBouncy: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  },
};

