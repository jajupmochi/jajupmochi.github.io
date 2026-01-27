import React, { useRef, useEffect, useState, useCallback } from 'react';
import ForceGraph2D, { ForceGraphMethods } from 'react-force-graph-2d';
import * as d3 from 'd3';
import { GraphData, GraphNode } from '../types';

interface GraphCanvasProps {
  data: GraphData | null;
  onNodeClick: (node: GraphNode) => void;
  focusNodeId?: string | null;
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

const GraphCanvas: React.FC<GraphCanvasProps> = ({ data, onNodeClick, focusNodeId }) => {
  const fgRef = useRef<ForceGraphMethods>();
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [hoverNode, setHoverNode] = useState<GraphNode | null>(null);
  const imageCache = useRef<Map<string, HTMLImageElement>>(new Map());

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

  // Configure Physics Engine when data loads
  useEffect(() => {
    if (data && fgRef.current) {
      // Wait for graph to initialize
      setTimeout(() => {
        if (fgRef.current) {
          // Apply custom D3 forces - EXACT match to original
          const chargeForce = d3.forceManyBody().strength(-20);
          const collideForce = d3.forceCollide((node: any) => {
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
  }, [data]);

  // Handle Focus (Scrolly)
  useEffect(() => {
    if (focusNodeId && data && fgRef.current) {
      const node = data.nodes.find(n => n.id === focusNodeId);
      if (node && node.x !== undefined && node.y !== undefined) {
        fgRef.current.centerAt(node.x, node.y, 1000);
        fgRef.current.zoom(2.5, 1000);
      }
    }
  }, [focusNodeId, data]);

  const paintNode = useCallback((node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    // Determine radius - EXACT match to original
    const r = Math.sqrt(node.val || 10) * 4;
    const fontSize = 14 / globalScale;
    const isHover = node === hoverNode;
    
    // --- A. Render Avatar (Core Node with img property) ---
    if (node.img) {
      const img = imageCache.current.get(node.img);
      ctx.save();
      ctx.beginPath();
      ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI, false);
      ctx.clip(); // Clip to circle
      
      if (img && img.complete) {
        ctx.drawImage(img, node.x! - r, node.y! - r, r * 2, r * 2);
      } else {
        // Fallback color while loading
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
      
      // Add hover effect
      if (isHover) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = GROUP_COLORS[node.group];
        ctx.stroke();
        ctx.shadowBlur = 0;
      }
      return; // Exit early for core node
    }

    // --- B. Render Icon Nodes (Categories with icon property) ---
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
      return; // Exit early for icon node
    }
    
    // --- C. Render Regular Nodes ---
    ctx.beginPath();
    ctx.arc(node.x!, node.y!, r, 0, 2 * Math.PI, false);
    ctx.fillStyle = GROUP_COLORS[node.group] || '#999';
    
    if (isHover) {
      ctx.shadowBlur = 20;
      ctx.shadowColor = GROUP_COLORS[node.group] || '#999';
    } else {
      ctx.shadowBlur = 0;
    }
    
    ctx.fill();
    ctx.shadowBlur = 0; // Reset

    // Draw Label (show for large nodes or on hover)
    const showLabel = node.val > 25 || isHover || node.id === focusNodeId;

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
  }, [hoverNode, focusNodeId, imageCache]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 0 }}>
      {data && (
        <ForceGraph2D
          ref={fgRef}
          width={width}
          height={height}
          graphData={data}
          backgroundColor="#f4f4f7"
          nodeLabel={() => ""} 
          nodeRelSize={4}
          nodeVal={(node: any) => node.val || 10}
          linkColor={() => '#d1d5db'}
          linkWidth={1.5}
          nodeCanvasObject={paintNode}
          nodeCanvasObjectMode={() => 'replace'}
          onNodeClick={onNodeClick}
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
