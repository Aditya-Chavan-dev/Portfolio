import React from 'react';

interface SpatialGridProps {
  children: React.ReactNode;
}

export function SpatialGrid({ children }: SpatialGridProps) {
  return (
    <div 
      className="w-full h-full p-6 lg:p-10 grid gap-6"
      style={{
        gridTemplateColumns: 'clamp(240px, 18vw, 300px) 1fr clamp(260px, 20vw, 320px)',
        gridTemplateRows: `
          clamp(120px, 20dvh, 180px) 
          clamp(140px, 25dvh, 220px) 
          clamp(100px, 18dvh, 160px)
        `,
        height: '100%'
      }}
    >
      {children}
    </div>
  );
}
