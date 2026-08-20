import { CloudProviderConfig } from "@/types/provider.types";
import { CLOUD_PROVIDERS, getProviderConfig } from "@/config/providers";

// Backward-compatibility alias
export type CloudProviderSpec = CloudProviderConfig;

export class ProvidersService {
  private static instance: ProvidersService;

  public static getInstance(): ProvidersService {
    if (!ProvidersService.instance) {
      ProvidersService.instance = new ProvidersService();
    }
    return ProvidersService.instance;
  }

  public getProviders(): CloudProviderConfig[] {
    return CLOUD_PROVIDERS;
  }

  public getProviderById(id: string): CloudProviderConfig | undefined {
    return getProviderConfig(id);
  }
}

export const providersService = ProvidersService.getInstance();

