"use client";

import React from "react";
import { CloudProviderId } from "@/types/provider.types";
import { getProviderConfig } from "@/config/providers";
import {
  AwsIcon,
  AzureIcon,
  CloudflareIcon,
  DockerIcon,
  KubernetesIcon,
  TerraformIcon,
  GcpIcon,
  DiamondIcon,
} from "@/components/Icons";
import { Server, CheckCircle2, AlertCircle, Clock } from "lucide-react";

export interface ProviderBadgeProps {
  providerId: CloudProviderId | string;
  size?: "sm" | "md" | "lg";
  showRegion?: boolean;
  region?: string;
  showStatus?: boolean;
  statusText?: string;
  variant?: "pill" | "card" | "minimal" | "compact";
  className?: string;
}

export function ProviderBadge({
  providerId,
  size = "md",
  showRegion = false,
  region,
  showStatus = false,
  statusText,
  variant = "pill",
  className = "",
}: ProviderBadgeProps) {
  const config = getProviderConfig(providerId);
  const name = config ? config.name : providerId.toUpperCase();
  const shortName = config ? config.shortName : providerId.toUpperCase();
  const activeRegion = region || config?.defaultRegion;
  const activeStatus = statusText || (config?.status === "Production-Ready" ? "Connected" : config?.status || "Ready");

  const renderIcon = (iconSize: number) => {
    switch (providerId) {
      case "aws":
        return <AwsIcon size={iconSize} />;
      case "azure":
        return <AzureIcon size={iconSize} />;
      case "cloudflare":
        return <CloudflareIcon size={iconSize} />;
      case "docker":
        return <DockerIcon size={iconSize} />;
      case "kubernetes":
        return <KubernetesIcon size={iconSize} />;
      case "terraform":
        return <TerraformIcon size={iconSize} />;
      case "gcp":
        return <GcpIcon size={iconSize} />;
      case "local":
        return <Server className={`w-${Math.round(iconSize / 4)} h-${Math.round(iconSize / 4)} text-emerald-600`} />;
      default:
        return <DiamondIcon size={iconSize} />;
    }
  };

  const iconSizes = {
    sm: 14,
    md: 18,
    lg: 24,
  };

  if (variant === "card") {
    return (
      <div
        className={`p-4 rounded-2xl bg-white border border-gray-200 hover:border-[#FFB020] shadow-xs hover:shadow-md transition-all flex items-center justify-between space-x-3 font-mono ${className}`}
      >
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gray-50 border border-gray-100 shrink-0">
            {renderIcon(iconSizes[size])}
          </div>
          <div>
            <div className="text-xs font-black text-gray-900">{name}</div>
            {showRegion && activeRegion && (
              <div className="text-[10px] text-gray-500 font-semibold mt-0.5">{activeRegion}</div>
            )}
          </div>
        </div>

        {showStatus && (
          <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{activeStatus}</span>
          </span>
        )}
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <span
        className={`inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-gray-800 ${className}`}
      >
        {renderIcon(iconSizes[size])}
        <span>{shortName}</span>
        {showRegion && activeRegion && (
          <span className="text-gray-400 font-normal">({activeRegion})</span>
        )}
      </span>
    );
  }

  // Default "pill" variant
  return (
    <span
      className={`inline-flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200/90 text-xs font-mono text-gray-800 transition-all shadow-2xs group ${className}`}
    >
      <span className="shrink-0">{renderIcon(iconSizes[size])}</span>
      <span className="font-bold text-gray-900">{shortName}</span>
      {showRegion && activeRegion && (
        <span className="text-[11px] text-gray-500 font-medium pl-1 border-l border-gray-200">
          {activeRegion}
        </span>
      )}
      {showStatus && (
        <span className="inline-flex items-center space-x-1 text-[10px] text-emerald-700 font-bold pl-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>{activeStatus}</span>
        </span>
      )}
    </span>
  );
}
