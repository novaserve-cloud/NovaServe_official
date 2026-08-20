"use client";

import { useMemo } from "react";
import { CLOUD_PROVIDERS, getProviderConfig } from "@/config/providers";
import { CloudProviderConfig, CloudProviderId } from "@/types/provider.types";

export function useProviders() {
  const providers = useMemo(() => CLOUD_PROVIDERS, []);

  const getById = (id: string): CloudProviderConfig | undefined => {
    return getProviderConfig(id);
  };

  const productionReady = useMemo(
    () => providers.filter((p) => p.status === "Production-Ready"),
    [providers]
  );

  return {
    providers,
    getById,
    productionReady,
  };
}
