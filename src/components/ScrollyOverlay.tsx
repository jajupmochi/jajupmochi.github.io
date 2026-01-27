import React, { useEffect, useRef } from 'react';

interface ScrollyOverlayProps {
  onStepEnter: (nodeId: string) => void;
}

const ScrollyOverlay: React.FC<ScrollyOverlayProps> = ({ onStepEnter }) => {
  const stepsFunc = [
    { id: 'core_me', title: "Hi, I'm Linlin Jia 👋", content: "Welcome to my spatial portfolio. I am a Postdoc Researcher specializing in Graph Machine Learning and Spatio-temporal Models." },
    { id: 'cat_exp', title: "Experience", content: "My academic journey across Switzerland, France, and China. (University of Bern, HEIA-FR, INSA Rouen)" },
    { id: 'cat_proj', title: "Key Projects", content: "From theoretical Graph ML to applied river temperature forecasting." },
    { id: 'cat_pub', title: "Publications", content: "Selected works in J. Comp. Chem, ACPR, and Pattern Recognition Letters." },
  ];

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const nodeId = entry.target.getAttribute('data-focus');
          if (nodeId) {
            onStepEnter(nodeId);
            // Visual feedback for active step
            document.querySelectorAll('.story-step').forEach(s => (s as HTMLElement).style.opacity = '0.3');
            (entry.target as HTMLElement).style.opacity = '1';
          }
        }
      });
    }, {
      threshold: 0.6,
      rootMargin: "-10% 0px -10% 0px"
    });

    const steps = document.querySelectorAll('.story-step');
    steps.forEach(s => observerRef.current?.observe(s));

    return () => observerRef.current?.disconnect();
  }, [onStepEnter]);

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: 1, // On top of graph but below UI
      pointerEvents: 'none', // Let clicks pass through to graph
    }}>
      {stepsFunc.map((step, idx) => (
        <section 
          key={step.id} 
          className="story-step" 
          data-focus={step.id}
          style={{
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: idx % 2 === 0 ? 'flex-start' : 'flex-end', // Alternate sides
            padding: '0 10%',
            opacity: 0.3,
            transition: 'opacity 0.5s ease'
          }}
        >
          <div className="glass-panel" style={{
            pointerEvents: 'auto', // Re-enable pointer events for the card
            maxWidth: '350px',
            background: 'rgba(255, 255, 255, 0.85)'
          }}>
            <h2 style={{marginTop: 0}}>{step.title}</h2>
            <p>{step.content}</p>
          </div>
        </section>
      ))}
      <section style={{ height: '50vh' }}>
          {/* Spacer */}
      </section>
    </div>
  );
};

export default ScrollyOverlay;
