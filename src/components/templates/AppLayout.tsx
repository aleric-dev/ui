import React from 'react';
import { cn } from '../../utils/cn';

export interface AppLayoutProps {
  sidebar: React.ReactNode;
  topNav?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const AppLayout: React.FC<AppLayoutProps> = ({
  sidebar,
  topNav,
  children,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'flex h-screen w-screen overflow-hidden bg-slate-50 dark:bg-[#0B0F19] text-slate-900 dark:text-slate-100 font-sans transition-colors duration-200 select-none',
        className
      )}
    >
      {sidebar}
      <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden">
        {topNav}
        <main className="flex-1 overflow-y-auto overflow-x-hidden relative flex flex-col min-w-0 custom-scrollbar select-text">
          {children}
        </main>
      </div>
    </div>
  );
};
