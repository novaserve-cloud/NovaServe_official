"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DeploymentStatus } from "@/types/deployment.types";
import { CheckCircle2, Clock, Activity, AlertCircle, RefreshCw } from "lucide-react";
import { badgeVariants } from "@/lib/motion/variants";

export interface StatusBadgeProps {
  status: DeploymentStatus | "Healthy" | "Connected" | "Degraded" | "Active";
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ status, size = "md", className = "" }: StatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case "Healthy":
      case "Connected":
      case "Active":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800",
          dot: "bg-emerald-500",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />,
        };
      case "Deploying":
      case "Building":
        return {
          bg: "bg-amber-50 text-amber-900 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800",
          dot: "bg-[#FFB020] animate-pulse",
          icon: <Activity className="w-3.5 h-3.5 text-[#FFB020] animate-spin" />,
        };
      case "Queued":
        return {
          bg: "bg-blue-50 text-blue-900 border-blue-300 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800",
          dot: "bg-blue-500",
          icon: <Clock className="w-3.5 h-3.5 text-blue-600" />,
        };
      case "Failed":
      case "Degraded":
        return {
          bg: "bg-red-50 text-red-900 border-red-300 dark:bg-red-950/60 dark:text-red-300 dark:border-red-800",
          dot: "bg-red-500",
          icon: <AlertCircle className="w-3.5 h-3.5 text-red-600" />,
        };
      default:
        return {
          bg: "bg-gray-50 text-gray-800 border-gray-300",
          dot: "bg-gray-400",
          icon: null,
        };
    }
  };

  const current = getStatusConfig();
  const textSize = size === "sm" ? "text-[10px] px-2 py-0.5" : "text-xs px-2.5 py-1";

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={status}
        variants={badgeVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={`inline-flex items-center space-x-1.5 rounded-full border font-mono font-bold ${current.bg} ${textSize} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${current.dot}`} />
        <span>{status}</span>
      </motion.span>
    </AnimatePresence>
  );
}
