import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import ForceGraph2D from 'react-force-graph-2d';
import * as d3 from 'd3';
import { GraphData, GraphNode, GraphLink } from '../types';
import {
  buildAdjacencyMap,
  isLinkConnectedToFocus,
  isLinkBetweenNeighbors,
  getNodeVisibilityLevel
} from '../utils/graphAnalysis';

interface GraphCanvasProps {
  data: GraphData | null;
  onNodeClick: (node: GraphNode) => void;
  focusNodeId?: string | null;
  onFocusChange?: (nodeId: string | null) => void;
  expandedCategoryId?: string | null;
  onNodePositionUpdate?: (nodeId: string, x: number, y: number) => void;
  coreCardActive?: boolean;
  coreCardWidth?: number;
  coreCardHeight?: number;
}

const GROUP_COLORS: Record<string, string> = {
  core: "#e63946",       
  experience: "#f4a261", 
  education: "#2a9d8f",  
  project: "#457b9d",    
  paper: "#1d3557",      
  skill: "#cfd8dc", 
  category: "#333333"    
};

const CATEGORY_BY_GROUP: Record<string, string> = {
  experience: 'cat_exp',
  project: 'cat_proj',
  paper: 'cat_pub',
  education: 'cat_edu',
  skill: 'cat_skill',
  life: 'cat_life'
};

const GraphCanvas: React.FC<GraphCanvasProps> = ({
  data,
  onNodeClick,
  focusNodeId,
  onFocusChange,
  expandedCategoryId,
  onNodePositionUpdate,
  coreCardActive = false,
  coreCardWidth = 320,
  coreCardHeight = 200
}) => {
  const fgRef = useRef<any>();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());
  const initialCenteredRef = useRef(false);

  const visibleData = useMemo(() => {
    if (!data) return null;

    const baseNodes = data.nodes.filter(node => node.group === 'core' || node.group === 'category');
    const expandedNodes = expandedCategoryId
      ? data.nodes.filter(node => CATEGORY_BY_GROUP[node.group] === expandedCategoryId)
      : [];
    const nodes = expandedCategoryId
      ? [...baseNodes, ...expandedNodes]
      : baseNodes;
    const nodeIds = new Set(nodes.map(node => node.id));
    const links = data.links.filter(link => {
      const sourceId = typeof link.source === 'string' ? link.source : link.source.id;
      const targetId = typeof link.target === 'string' ? link.target : link.target.id;
      return nodeIds.has(sourceId) && nodeIds.has(targetId);
    });
    return { nodes, links };
  }, [data, expandedCategoryId]);

  // 计算邻接表（缓存）
  const adjacencyMap = useMemo(() => {
    if (!visibleData) return null;
    return buildAdjacencyMap(visibleData.nodes, visibleData.links);
  }, [visibleData]);

  // 计算所有节点的可见性（缓存）
  const visibilityMap = useMemo(() => {
    if (!visibleData) return new Map<string, GraphNode['visibility']>();
    if (!focusNodeId || !adjacencyMap) {
      return new Map(visibleData.nodes.map(node => [node.id, 'neighbor' as const]));
    }
    return new Map(
      visibleData.nodes.map(node => [
        node.id,
        getNodeVisibilityLevel(node.id, focusNodeId, adjacencyMap)
      ])
    );
  }, [visibleData, focusNodeId, adjacencyMap]);

  // Preload images for nodes
  useEffect(() => {
    if (data) {
      data.nodes.forEach(node => {
        if (node.img && !imageCache.current.has(node.img)) {
          const img = new Image();
          img.src = node.img;
          img.onload = () => {
            imageCache.current.set(node.img, img);
          };
        }
      });
    }
  }, [data]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!focusNodeId || !visibleData || !fgRef.current || initialCenteredRef.current) return;
    const node = visibleData.nodes.find(n => n.id === focusNodeId);
    if (node && node.x !== undefined && node.y !== undefined) {
      fgRef.current.centerAt(node.x, node.y, 600);
      fgRef.current.zoom(2, 600);
      initialCenteredRef.current = true;
    }
  }, [focusNodeId, visibleData]);

  // Configure Physics Engine when data loads
  useEffect(() => {
    if (data && fgRef.current) {
      // Wait for graph to initialize
      setTimeout(() => {
        if (fgRef.current) {
          // Apply custom D3 forces - EXACT match to original
          const chargeForce = d3.forceManyBody().strength(-20);
          const collideForce = d3.forceCollide((node: any) => {
            if (node.id === 'core_me' && coreCardActive) {
              return Math.max(coreCardWidth, coreCardHeight) / 2 + 20;
            }
            const r = Math.sqrt(node.val || 10) * 4;
            return r + 15;
          }).strength(0.7).iterations(1);
          const linkForce = d3.forceLink().distance(100);
          
          // Center force to keep graph centered
          const centerForce = d3.forceCenter(0, 0);
          
          // Position force to pin core node at center
          const xForce = d3.forceX((node: any) => {
            return node.id === 'core_me' ? 0 : node.x;
          }).strength((node: any) => node.id === 'core_me' ? 0.5 : 0.01);
          
          const yForce = d3.forceY((node: any) => {
            return node.id === 'core_me' ? 0 : node.y;
          }).strength((node: any) => node.id === 'core_me' ? 0.5 : 0.01);
          
          fgRef.current.d3Force('charge', chargeForce);
          fgRef.current.d3Force('collide', collideForce);
          fgRef.current.d3Force('link', linkForce);
          fgRef.current.d3Force('center', centerForce);
          fgRef.current.d3Force('x', xForce);
          fgRef.current.d3Force('y', yForce);
          fgRef.current.d3ReheatSimulation();
        }
      }, 100);
    }
  }, [data, focusNodeId, coreCardWidth, coreCardHeight]);

  // Export node position for overlay
  useEffect(() => {
    if (!fgRef.current || !focusNodeId || !onNodePositionUpdate) return;
    const interval = setInterval(() => {
      const nodes = fgRef.current?.graphData()?.nodes;
      if (!nodes) return;
      const node = nodes.find((n: any) => n.id === focusNodeId);
      if (node && node.x !== undefined && node.y !== undefined) {
        const coords = fgRef.current.graph2ScreenCoords(node.x, node.y);
        onNodePositionUpdate(focusNodeId, coords.x, coords.y);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [focusNodeId, onNodePositionUpdate]);

  // ESC 键取消聚焦
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && focusNodeId) {
        onFocusChange?.(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [focusNodeId, onFocusChange]);

  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    // 获取节点的可见性级别
    const visibility = visibilityMap.get(node.id) || 'neighbor';

    // 应用全局透明度和滤镜
    const baseOpacity = {
      focused: 1.0,
      neighbor: 0.7,
      indirect: 0.4,
      distant: 0.2
    }[visibility];

    ctx.globalAlpha = baseOpacity;

    // 应用饱和度和模糊
    if (visibility === 'indirect') {
      ctx.filter = 'saturate(0.5)';
    } else if (visibility === 'distant') {
      ctx.filter = 'grayscale(1) blur(4px)';
    } else {
      ctx.filter = 'none';
    }

    // 应用缩放
    const scale = visibility === 'focused' ? 1.8 : visibility === 'distant' ? 0.95 : 1.0;
    const r = Math.sqrt(node.val || 10) * 4 * scale;
    const fontSize = 14 / globalScale;
    const isHover = node === hoverNode;

    if (node.id === 'core_me' && coreCardActive) {
      return;
    }

    // --- B. Render Avatar (Core Node with img property) ---
    if (node.img) {
      const img = imageCache.current.get(node.img);
      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI, false);
      ctx.clip();
      
      if (img && img.complete) {
        ctx.drawImage(img, node.x! - r, node.y! - r, r * 2, r * 2);
      } else {
        ctx.fillStyle = GROUP_COLORS[node.group] || '#e63946';
        ctx.fill();
      }
      ctx.restore();
      
      // Draw white ring around avatar
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI, false);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();
      
      // Add shadow for focused nodes
      if (visibility === 'focused') {
        ctx.shadowBlur = 30;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      // Add hover effect
      if (isHover) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = GROUP_COLORS[node.group];
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
      return;
    }

    // --- C. Render Icon Nodes (Categories with icon property) ---
    if (node.icon) {
      // White background circle
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI, false);
      ctx.fillStyle = '#fff';
      ctx.fill();
      
      // Colored border
      ctx.strokeStyle = GROUP_COLORS[node.group] || '#333';
      ctx.lineWidth = 2 / globalScale;
      ctx.stroke();

      // Draw emoji icon in center
      ctx.font = `${r * 1.2}px Sans-Serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = '#333';
      ctx.fillText(node.icon, node.x!, node.y!);
      
      // Label below
      ctx.font = `600 ${fontSize}px Inter, sans-serif`;
      ctx.fillStyle = '#333';
      ctx.fillText(node.label || node.id, node.x!, node.y! + r + (10 / globalScale));
      
      // Hover glow
      if (isHover) {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI, false);
        ctx.strokeStyle = GROUP_COLORS[node.group];
        ctx.lineWidth = 3 / globalScale;
        ctx.shadowBlur = 15;
        ctx.shadowColor = GROUP_COLORS[node.group];
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      
      // Add glow for focused/neighbor nodes
      if (visibility === 'focused') {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, r + 5, 0, 2 * Math.PI, false);
        ctx.strokeStyle = GROUP_COLORS[node.group];
        ctx.lineWidth = 2 / globalScale;
        ctx.shadowBlur = 20;
        ctx.shadowColor = GROUP_COLORS[node.group];
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (visibility === 'neighbor') {
        ctx.beginPath();
        ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI, false);
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      
      ctx.globalAlpha = 1;
      ctx.filter = 'none';
      return;
    }
    
    // --- D. Render Regular Nodes ---
    ctx.beginPath();
    ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = GROUP_COLORS[node.group] || '#999';
    
    // Add shadow for focused nodes
    if (visibility === 'focused') {
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    } else if (visibility === 'neighbor') {
      ctx.shadowBlur = 12;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
    } else if (isHover) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = GROUP_COLORS[node.group] || '#999';
    } else {
      ctx.shadowBlur = 0;
    }
    
    ctx.fill();
    ctx.shadowBlur = 0; // Reset

    // Draw Label (show for large nodes or on hover or focused)
    const showLabel = node.val > 25 || isHover || visibility === 'focused' || visibility === 'neighbor';

    if (showLabel) {
      const label = node.label || node.id;
      ctx.font = `600 ${fontSize}px Inter, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Text halo (outline)
      ctx.lineWidth = 3 / globalScale;
      ctx.strokeStyle = '#f4f4f7';
      ctx.strokeText(label, node.x!, node.y! + r + (10 / globalScale));
      
      // Text fill
      ctx.fillStyle = '#333';
      ctx.fillText(label, node.x!, node.y! + r + (10 / globalScale));
    }

    ctx.globalAlpha = 1;
    ctx.filter = 'none';
  }, [hoverNode, visibilityMap, imageCache, focusNodeId]);

  // 计算连线的颜色和宽度
  const getLinkColor = useCallback((link: GraphLink): string => {
    if (!focusNodeId || !adjacencyMap) return '#d1d5db';

    if (isLinkConnectedToFocus(link, focusNodeId)) {
      return '#457b9d'; // 更柔和的主题色
    }

    if (isLinkBetweenNeighbors(link, focusNodeId, adjacencyMap)) {
      return '#9aa3af';
    }

    return '#d1d5db';
  }, [focusNodeId, adjacencyMap]);

  const getLinkWidth = useCallback((link: GraphLink): number => {
    if (!focusNodeId || !adjacencyMap) return 1.5;

    if (isLinkConnectedToFocus(link, focusNodeId)) {
      return 2.2;
    }

    if (isLinkBetweenNeighbors(link, focusNodeId, adjacencyMap)) {
      return 1.6;
    }

    return 1;
  }, [focusNodeId, adjacencyMap]);

  // 处理节点点击
  const handleNodeClickInternal = useCallback((node: GraphNode) => {
    if (node.id === 'core_me') {
      if (focusNodeId !== 'core_me') {
        onFocusChange?.('core_me');
      }
      onNodeClick(node);
      return;
    }
    // 如果点击的是已聚焦的节点，则取消聚焦
    if (focusNodeId === node.id) {
      onFocusChange?.(null);
    } else {
      // 否则设置为聚焦
      onFocusChange?.(node.id);
    }
    // 也触发原始回调
    onNodeClick(node);
  }, [focusNodeId, onNodeClick, onFocusChange]);

  const getNodeRadius = useCallback((node: any) => {
    if (node.id === 'core_me' && coreCardActive) {
      return Math.max(coreCardWidth, coreCardHeight) / 2;
    }
    return Math.sqrt(node.val || 10) * 4;
  }, [coreCardActive, coreCardWidth, coreCardHeight]);

  const paintLink = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const source = link.source as any;
    const target = link.target as any;
    if (!source || !target) return;

    const sx = source.x ?? 0;
    const sy = source.y ?? 0;
    const tx = target.x ?? 0;
    const ty = target.y ?? 0;

    const dx = tx - sx;
    const dy = ty - sy;
    const dist = Math.hypot(dx, dy);
    if (!dist) return;

    const ux = dx / dist;
    const uy = dy / dist;
    const startOffset = getNodeRadius(source) + 2;
    const endOffset = getNodeRadius(target) + 2;

    const x1 = sx + ux * startOffset;
    const y1 = sy + uy * startOffset;
    const x2 = tx - ux * endOffset;
    const y2 = ty - uy * endOffset;

    ctx.save();
    if (focusNodeId && adjacencyMap) {
      if (isLinkConnectedToFocus(link as GraphLink, focusNodeId)) {
        ctx.globalAlpha = 0.7;
      } else if (isLinkBetweenNeighbors(link as GraphLink, focusNodeId, adjacencyMap)) {
        ctx.globalAlpha = 0.5;
      } else {
        ctx.globalAlpha = 0.2;
      }
    }
    ctx.strokeStyle = getLinkColor(link as GraphLink);
    ctx.lineWidth = getLinkWidth(link as GraphLink) / globalScale;
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.restore();
  }, [focusNodeId, adjacencyMap, getLinkColor, getLinkWidth, getNodeRadius]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
      {visibleData && (
        <ForceGraph2D
          ref={fgRef}
          width={width}
          height={height}
          graphData={visibleData}
          backgroundColor="#f4f4f7"
          nodeLabel={() => ""} 
          nodeRelSize={4}
          nodeVal={(node: any) => node.val || 10}
          linkColor={getLinkColor}
          linkWidth={getLinkWidth}
          linkCanvasObject={paintLink}
          linkCanvasObjectMode={() => 'replace'}
          nodeCanvasObject={paintNode}
          nodeCanvasObjectMode={() => 'replace'}
          onNodeClick={handleNodeClickInternal}
          onNodeHover={(node: any) => setHoverNode(node || null)}
          enableNodeDrag={true}
          onNodeDrag={(node: any) => {
            node.fx = node.x;
            node.fy = node.y;
          }}
          onNodeDragEnd={(node: any) => {
            node.fx = undefined;
            node.fy = undefined;
          }}
          d3AlphaDecay={0.02}
          d3VelocityDecay={0.3}
          cooldownTicks={100}
        />
      )}
    </div>
  );
};

export default GraphCanvas;
