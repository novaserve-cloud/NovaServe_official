export type DeploymentStatus = "Queued" | "Building" | "Deploying" | "Healthy" | "Failed";

export interface DeploymentRecord {
  id: string;
  commitHash: string;
  commitMessage: string;
  environment: "production" | "staging" | "preview";
  status: DeploymentStatus;
  durationSeconds: number;
  createdAt: string;
  deployedAt?: string;
  targetProviders: string[];
  totalResources: number;
}
