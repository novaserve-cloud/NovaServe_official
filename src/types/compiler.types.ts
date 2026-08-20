export interface CodeLanguageStrategy {
  id: string;
  name: string;
  filename: string;
  color: string;
  iconName: string;
  code: string;
  targetServices: string[];
}

export interface AstNodeSpec {
  id: string;
  type: string;
  provider: string;
  capacity?: string;
  memory?: number;
  environment?: Record<string, string>;
}

export interface NovaIrSpec {
  kind: "NovaApplicationSpec";
  version: string;
  name: string;
  target: string;
  sha256: string;
  nodes: AstNodeSpec[];
  dagEdges?: Array<{ from: string; to: string; relation: string }>;
}
