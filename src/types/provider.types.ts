export type CloudProviderId =
  | "aws"
  | "azure"
  | "cloudflare"
  | "docker"
  | "kubernetes"
  | "terraform"
  | "local"
  | "gcp";

export type ProviderStability = "Production-Ready" | "Experimental" | "Planned Roadmap";

export interface CloudResourceDefinition {
  id: string;
  name: string;
  category: "compute" | "storage" | "database" | "network" | "queue" | "security";
  targetType: string;
  description?: string;
}

export interface CloudProviderConfig {
  id: CloudProviderId;
  name: string;
  shortName: string;
  category: string;
  status: ProviderStability;
  badge: string;
  badgeBg: string;
  brandColor: string;
  defaultRegion?: string;
  supportedRegions?: string[];
  resources: string[];
  resourceDefinitions?: CloudResourceDefinition[];
  desc: string;
  docUrl?: string;
}
