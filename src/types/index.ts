export interface GraphNode {
  id: string;
  label?: string;
  group: 'core' | 'experience' | 'education' | 'project' | 'paper' | 'skill' | 'category' | string;
  val: number;
  x?: number;
  y?: number;
  contentHTML?: string;
  
  // 新增：可见性层级状态（运行时计算）
  visibility?: 'focused' | 'neighbor' | 'indirect' | 'distant';
  
  // 扩展：层级结构支持（为未来扩展预留）
  parentId?: string;
  children?: string[];
  level?: number;
  expandable?: boolean;
  
  // 扩展：预览和摘要
  preview?: {
    type: 'text' | 'image' | 'card' | 'icon';
    content: string | { title?: string; subtitle?: string; image?: string };
    width?: number;
    height?: number;
  };
  summary?: string;
  
  [key: string]: any;
}

export interface GraphLink {
  source: string | GraphNode;
  target: string | GraphNode;
  
  // 新增：连线类型分类
  type?: 'direct' | 'indirect' | 'cross';
  
  [key: string]: any;
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}
