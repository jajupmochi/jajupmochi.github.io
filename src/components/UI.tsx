import React from 'react';

interface NodeContentCardProps {
  x: number;
  y: number;
  width?: number;
  height?: number;
  contentHTML: string;
  onClick?: () => void;
}

export const NodeContentCard: React.FC<NodeContentCardProps> = ({
  x,
  y,
  width = 320,
  height = 200,
  contentHTML,
  onClick
}) => {
  return (
    <div
      style={{
        position: 'absolute',
        left: `${x}px`,
        top: `${y}px`,
        transform: 'translate(-50%, -50%)',
        width: `${width}px`,
        height: `${height}px`,
        background: 'rgba(255, 255, 255, 0.95)',
        border: '1px solid #d1d5db',
        borderRadius: '12px',
        padding: '16px',
        overflow: 'auto',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        pointerEvents: 'auto',
        fontSize: '14px',
        lineHeight: '1.5',
        zIndex: 5
      }}
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: contentHTML }}
    />
  );
};

export const TopBar: React.FC = () => {
  return (
    <header className="glass-panel" style={{
      position: 'absolute',
      top: '24px',
      left: '24px',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      gap: '32px'
    }}>
      <div className="brand">
        <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 600 }}>Linlin Jia</h1>
        <span style={{ fontSize: '0.85rem', color: '#666' }}>Ph.D. Researcher / Graph ML / Spatio-temporal</span>
      </div>
      <div style={{ display: 'flex', gap: '16px' }}>
        <a href="mailto:linlin.jia@unibe.ch" style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '0.9rem', fontWeight: 500 }}>Email</a>
        <a href="https://jajupmochi.github.io/" target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: '#1a1a1a', fontSize: '0.9rem', fontWeight: 500 }}>Website</a>
      </div>
    </header>
  );
};

export const Legend: React.FC = () => {
  const items = [
    { label: 'Me', color: '#e63946' },
    { label: 'Experience', color: '#f4a261' },
    { label: 'Projects', color: '#457b9d' },
    { label: 'Papers', color: '#1d3557' },
  ];

  return (
    <div className="glass-panel" style={{
      position: 'absolute',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 10,
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    }}>
      {items.map(item => (
        <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
          <span style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: item.color,
            display: 'inline-block'
          }}></span>
          {item.label}
        </div>
      ))}
    </div>
  );
};

interface SidebarProps {
  isOpen: boolean;
  contentHTML: string;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, contentHTML, onClose }) => {
  return (
    <aside className={`glass-panel ${isOpen ? 'active' : ''}`} style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      bottom: '24px',
      width: '400px',
      maxWidth: '90vw',
      zIndex: 20,
      transform: isOpen ? 'translateX(0)' : 'translateX(120%)',
      transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }}>
      <button 
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          color: '#666'
        }}
      >&times;</button>
      <div 
        style={{ padding: '20px', overflowY: 'auto' }}
        dangerouslySetInnerHTML={{ __html: contentHTML }} 
      />
    </aside>
  );
};
