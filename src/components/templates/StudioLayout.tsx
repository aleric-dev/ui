import React from 'react';
import { cn } from '../../utils/cn';

export interface StudioLayoutProps {
  topBar: React.ReactNode;
  canvas: React.ReactNode;
  controlPanel: React.ReactNode;
  className?: string;
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({
  topBar,
  canvas,
  controlPanel,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex flex-col h-screen w-screen overflow-hidden bg-[#07090E] text-slate-100 font-sans select-none',
        className
      )}
    >
      {topBar}
      <div className="flex-1 flex overflow-hidden relative">
        <main className="flex-1 overflow-auto flex items-center justify-center p-6 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] select-text">
          {canvas}
        </main>
        {controlPanel}
      </div>
    </div>
  );
};
