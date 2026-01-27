import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import GraphCanvas from './components/GraphCanvas';
import ScrollyOverlay from './components/ScrollyOverlay';
import { TopBar, Legend, Sidebar } from './components/UI';
import { GraphData, GraphNode } from './types';
import './styles/global.css';

// Styles for glass panel (simulated CSS-in-JS for main.tsx clarity, though global.css handles most)
import './index.css';

const App: React.FC = () => {
  const [data, setData] = useState<GraphData | null>(null);
  const [focusNodeId, setFocusNodeId] = useState<string | null>('core_me');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarContent, setSidebarContent] = useState('');

  // 1. Fetch Data
  useEffect(() => {
    fetch('data/data.json') // Vite serves public/ at root
      .then(res => res.json())
      .then(setData)
      .catch(err => console.error("Failed to load graph data", err));
  }, []);

  // 2. Handle Interactions
  const handleNodeClick = (node: GraphNode) => {
    if (node.contentHTML) {
      setSidebarContent(node.contentHTML);
      setSidebarOpen(true);
    }
    // Also focus camera
    setFocusNodeId(node.id);
  };

  const handleScrollyStep = (nodeId: string) => {
    setFocusNodeId(nodeId);
  };

  return (
    <div className="app-container">
      <GraphCanvas 
        data={data} 
        onNodeClick={handleNodeClick}
        focusNodeId={focusNodeId}
      />
      
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
