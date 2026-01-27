export interface GraphNode {
  id: string;
  label?: string;
  group: 'core' | 'experience' | 'education' | 'project' | 'paper' | 'skill' | 'category' | string;
  val: number;
  x?: number;
  y?: number;
  contentHTML?: string;
  [key: string]: any;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  [key: string]: any;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
