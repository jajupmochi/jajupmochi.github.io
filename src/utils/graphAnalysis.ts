import { GraphData, GraphNode, GraphLink } from '../types';

/**
 * 构建邻接表：映射每个节点到其直接邻居
 * @param nodes 所有节点数组
 * @param links 所有连线数组
 * @returns Map<nodeId, Set<neighborId>>
 */
export function buildAdjacencyMap(
  nodes: GraphNode[],
  links: GraphLink[]
): Map<string, Set<string>> {
  const adjacencyMap = new Map<string, Set<string>>();

  // 初始化：为每个节点创建空集合
  nodes.forEach(node => {
    adjacencyMap.set(node.id, new Set());
  });

  // 构建无向图（双向）
  links.forEach(link => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;

    if (adjacencyMap.has(sourceId) && adjacencyMap.has(targetId)) {
      adjacencyMap.get(sourceId)!.add(targetId);
      adjacencyMap.get(targetId)!.add(sourceId);
    }
  });

  return adjacencyMap;
}

/**
 * 获取节点的直接邻居
 * @param nodeId 节点ID
 * @param adjacencyMap 邻接表
 * @returns 直接邻居ID的集合
 */
export function getDirectNeighbors(
  nodeId: string,
  adjacencyMap: Map<string, Set<string>>
): Set<string> {
  return adjacencyMap.get(nodeId) || new Set();
}

/**
 * 使用 BFS 计算节点之间的距离（图距离）
 * @param startId 起始节点ID
 * @param targetId 目标节点ID
 * @param adjacencyMap 邻接表
 * @returns 距离（-1 表示无路径）
 */
function getDistance(
  startId: string,
  targetId: string,
  adjacencyMap: Map<string, Set<string>>
): number {
  if (startId === targetId) return 0;

  const visited = new Set<string>();
  const queue: [string, number][] = [[startId, 0]];
  visited.add(startId);

  while (queue.length > 0) {
    const [currentId, distance] = queue.shift()!;

    const neighbors = adjacencyMap.get(currentId) || new Set();
    for (const neighborId of neighbors) {
      if (neighborId === targetId) return distance + 1;

      if (!visited.has(neighborId)) {
        visited.add(neighborId);
        queue.push([neighborId, distance + 1]);
      }
    }
  }

  return -1; // 无路径
}

/**
 * 计算节点相对于聚焦节点的可见性层级
 * @param nodeId 要评估的节点ID
 * @param focusedId 聚焦节点ID
 * @param adjacencyMap 邻接表
 * @param maxDepth 最大深度（默认2）
 * @returns 可见性层级：'focused' | 'neighbor' | 'indirect' | 'distant'
 */
export function getNodeVisibilityLevel(
  nodeId: string,
  focusedId: string,
  adjacencyMap: Map<string, Set<string>>,
  maxDepth: number = 2
): 'focused' | 'neighbor' | 'indirect' | 'distant' {
  if (nodeId === focusedId) return 'focused';

  const distance = getDistance(focusedId, nodeId, adjacencyMap);

  if (distance === 1) return 'neighbor';
  if (distance > 1 && distance <= maxDepth) return 'indirect';

  return 'distant';
}

/**
 * 批量计算所有节点的可见性层级
 * @param focusedId 聚焦节点ID
 * @param graphData 图数据
 * @returns 更新后的节点数组（带 visibility 属性）
 */
export function calculateNodeVisibilities(
  focusedId: string | null,
  graphData: GraphData
): GraphNode[] {
  if (!focusedId) {
    // 无聚焦时，所有节点都是正常状态
    return graphData.nodes.map(node => ({
      ...node,
      visibility: 'neighbor' as const
    }));
  }

  const adjacencyMap = buildAdjacencyMap(graphData.nodes, graphData.links);

  return graphData.nodes.map(node => ({
    ...node,
    visibility: getNodeVisibilityLevel(node.id, focusedId, adjacencyMap)
  }));
}

/**
 * 获取连接到指定节点的所有连线
 * @param nodeId 节点ID
 * @param links 所有连线
 * @returns 相关连线数组
 */
export function getLinksConnectedToNode(nodeId: string, links: GraphLink[]): GraphLink[] {
  return links.filter(link => {
    const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
    const targetId = typeof link.target === 'string' ? link.target : link.target.id;
    return sourceId === nodeId || targetId === nodeId;
  });
}

/**
 * 判断连线是否连接到聚焦节点
 * @param link 连线
 * @param focusedId 聚焦节点ID
 * @returns true 表示至少一个端点是聚焦节点
 */
export function isLinkConnectedToFocus(
  link: GraphLink,
  focusedId: string
): boolean {
  const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
  const targetId = typeof link.target === 'string' ? link.target : link.target.id;
  return sourceId === focusedId || targetId === focusedId;
}

/**
 * 判断连线是否连接两个邻居节点（都是直接邻居）
 * @param link 连线
 * @param focusedId 聚焦节点ID
 * @param adjacencyMap 邻接表
 * @returns true 表示两个端点都是聚焦节点的邻居
 */
export function isLinkBetweenNeighbors(
  link: GraphLink,
  focusedId: string,
  adjacencyMap: Map<string, Set<string>>
): boolean {
  const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
  const targetId = typeof link.target === 'string' ? link.target : link.target.id;

  const focusedNeighbors = getDirectNeighbors(focusedId, adjacencyMap);

  return focusedNeighbors.has(sourceId) && focusedNeighbors.has(targetId);
}

/**
 * 获取图的基本统计信息
 * @param graphData 图数据
 * @returns 统计信息对象
 */
export function getGraphStatistics(graphData: GraphData) {
  const nodeCount = graphData.nodes.length;
  const linkCount = graphData.links.length;
  const avgDegree = linkCount > 0 ? (2 * linkCount) / nodeCount : 0;

  return {
    nodeCount,
    linkCount,
    avgDegree: avgDegree.toFixed(2)
  };
}
