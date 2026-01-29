import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import GraphCanvas from './components/GraphCanvas';
import ScrollyOverlay from './components/ScrollyOverlay';
import { TopBar, Legend, Sidebar, NodeContentCard } from './components/UI';
import { GraphData, GraphNode } from './types';
import './styles/global.css';

// Styles for glass panel (simulated CSS-in-JS for main.tsx clarity, though global.css handles most)
import './index.css';

const App: React.FC = () => {
  const [data, setData] = useState<GraphData | null>(null);
  const [focusNodeId, setFocusNodeId] = useState<string | null>('core_me');
  const [isManualFocus, setIsManualFocus] = useState(false);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState('');
  const initializedRef = useRef(false);
  const [coreNodePos, setCoreNodePos] = useState<{x: number, y: number} | null>(null);
  const [isCoreCardActive, setIsCoreCardActive] = useState(true);
  const CORE_CARD_WIDTH = 420;
  const CORE_CARD_HEIGHT = 260;

  // 1. Fetch Data
  useEffect(() => {
    fetch('data/data.json')
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load graph data", err));
  }, []);

  useEffect(() => {
    if (!data || initializedRef.current) return;
    const coreNode = data.nodes.find(node => node.id === 'core_me');
    if (!coreNode) return;
    setFocusNodeId('core_me');
    setExpandedCategoryId('core_me');
    initializedRef.current = true;
  }, [data]);

  // 2. Handle Interactions
  const handleNodeClick = (node: GraphNode) => {
    if (node.id === 'core_me') {
      setIsCoreCardActive(true);
      return;
    }
    if (node.contentHTML) {
      setSidebarContent(node.contentHTML);
      setSidebarOpen(true);
    }
    if (node.group === 'category') {
      setExpandedCategoryId(prev => (prev === node.id ? null : node.id));
    }
  };

  // 3. Handle Focus Change
  const handleFocusChange = (nodeId: string | null) => {
    setFocusNodeId(nodeId);
    setIsManualFocus(true);
    if (nodeId !== 'core_me') {
      setCoreNodePos(null);
    }
  };

  const handleNodePositionUpdate = (nodeId: string, x: number, y: number) => {
    if (nodeId === 'core_me' && focusNodeId === 'core_me') {
      setCoreNodePos({x, y});
    }
  };

  const handleScrollyStep = (nodeId: string) => {
    if (isManualFocus) return;
    setFocusNodeId(nodeId);
  };

  useEffect(() => {
    if (!data || !focusNodeId) return;
    const node = data.nodes.find(n => n.id === focusNodeId);
    if (!node) return;
    if (node.group === 'category') {
      setExpandedCategoryId(node.id);
      return;
    }
    const categoryId = node.group && node.group !== 'core'
      ? {
          experience: 'cat_exp',
          project: 'cat_proj',
          paper: 'cat_pub',
          education: 'cat_edu',
          skill: 'cat_skill',
          life: 'cat_life'
        }[node.group]
      : null;
    setExpandedCategoryId(categoryId || null);
  }, [data, focusNodeId]);

  useEffect(() => {
    const handleScroll = () => {
      if (isManualFocus) {
        setIsManualFocus(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isManualFocus]);

  return (
    <div className="app-container">
      <GraphCanvas 
        data={data} 
        onNodeClick={handleNodeClick}
        focusNodeId={focusNodeId}
        onFocusChange={handleFocusChange}
        expandedCategoryId={expandedCategoryId}
        onNodePositionUpdate={handleNodePositionUpdate}
        coreCardActive={isCoreCardActive && focusNodeId === 'core_me'}
        coreCardWidth={CORE_CARD_WIDTH}
        coreCardHeight={CORE_CARD_HEIGHT}
      />

      {/* Content Card Overlay */}
      {focusNodeId === 'core_me' && data && isCoreCardActive && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5 }}>
          <NodeContentCard
            x={coreNodePos?.x ?? window.innerWidth / 2}
            y={coreNodePos?.y ?? window.innerHeight / 2}
            width={CORE_CARD_WIDTH}
            height={CORE_CARD_HEIGHT}
            contentHTML={data.nodes.find(n => n.id === 'core_me')?.contentHTML || ''}
            onClick={() => setIsCoreCardActive(false)}
          />
        </div>
      )}
      
      {/* Scrolly Overlay - using native body scroll, so just position absolute on top */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        pointerEvents: 'none', // Critical: Let clicks pass through to Graph
        zIndex: 1
      }}>
        <ScrollyOverlay onStepEnter={handleScrollyStep} />
      </div>

      {/* Fixed UI Elements - ensure they have pointer-events: auto in CSS or here */}
      <div style={{ pointerEvents: 'none', position: 'fixed', width: '100%', height: '100%', top: 0, left: 0, zIndex: 10 }}>
        {/* Wrap UI components to manage pointer events correctly if needed, but they are fixed */}
        <div style={{ pointerEvents: 'auto' }}>
            <TopBar />
        </div>
        <div style={{ pointerEvents: 'auto' }}>
            <Legend />
        </div>
        {expandedCategoryId && data && (
          <div
            className="glass-panel"
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              zIndex: 12,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 12px',
              fontSize: '0.85rem',
              pointerEvents: 'auto'
            }}
          >
            <span style={{ color: '#666' }}>View</span>
            <strong>
              {data.nodes.find(n => n.id === expandedCategoryId)?.label || expandedCategoryId}
            </strong>
            <button
              onClick={() => setExpandedCategoryId(null)}
              style={{
                border: 'none',
                background: '#f1f5f9',
                color: '#333',
                borderRadius: '999px',
                padding: '2px 8px',
                cursor: 'pointer'
              }}
            >
              All
            </button>
          </div>
        )}
      </div>
      
      <Sidebar 
        isOpen={sidebarOpen} 
        contentHTML={sidebarContent} 
        onClose={() => setSidebarOpen(false)}
      />
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
