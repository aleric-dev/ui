import React from 'react';
import { cn } from '../../utils/cn';

export interface TabItem<T extends string = string> {
  id: T;
  label: React.ReactNode;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
}

export type TabsVariant = 'segmented' | 'underline' | 'pills';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabsProps<T extends string = string> {
  tabs: TabItem<T>[];
  activeTab: T;
  onChange: (tabId: T) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  className?: string;
  tabClassName?: string;
}

const SIZE_CLASSES: Record<TabsSize, { tab: string; icon: string }> = {
  sm: { tab: 'py-1.5 px-3 text-xs gap-1.5', icon: 'w-3.5 h-3.5' },
  md: { tab: 'py-2 px-4 text-xs gap-2', icon: 'w-4 h-4' },
  lg: { tab: 'py-2.5 px-5 text-sm gap-2.5', icon: 'w-4 h-4' },
};

export function Tabs<T extends string = string>({
  tabs,
  activeTab,
  onChange,
  variant = 'segmented',
  size = 'md',
  fullWidth = false,
  className = '',
  tabClassName = '',
}: TabsProps<T>) {
  if (variant === 'segmented') {
    return (
      <div
        role="tablist"
        className={cn(
          'p-1 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center select-none',
          className
        )}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              disabled={tab.disabled}
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative flex items-center justify-center font-mono font-bold transition-all duration-150 cursor-pointer rounded-xl select-none',
                SIZE_CLASSES[size].tab,
                fullWidth && 'flex-1',
                isActive
                  ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50',
                tab.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                tabClassName
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span className="ml-1 shrink-0">{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'underline') {
    return (
      <div
        role="tablist"
        className={cn('flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 select-none', className)}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              role="tab"
              type="button"
              disabled={tab.disabled}
              aria-selected={isActive}
              onClick={() => onChange(tab.id)}
              className={cn(
                'relative flex items-center justify-center font-mono font-bold transition-all duration-150 cursor-pointer border-b-2 select-none -mb-px',
                SIZE_CLASSES[size].tab,
                fullWidth && 'flex-1',
                isActive
                  ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                  : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white',
                tab.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
                tabClassName
              )}
            >
              {tab.icon && <span className="shrink-0">{tab.icon}</span>}
              <span>{tab.label}</span>
              {tab.badge && <span className="ml-1 shrink-0">{tab.badge}</span>}
            </button>
          );
        })}
      </div>
    );
  }

  // Pills variant
  return (
    <div
      role="tablist"
      className={cn('flex items-center gap-1.5 select-none', className)}
    >
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            role="tab"
            type="button"
            disabled={tab.disabled}
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={cn(
              'relative flex items-center justify-center font-mono font-bold transition-all duration-150 cursor-pointer rounded-xl border select-none',
              SIZE_CLASSES[size].tab,
              fullWidth && 'flex-1',
              isActive
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm shadow-indigo-600/20'
                : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800',
              tab.disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
              tabClassName
            )}
          >
            {tab.icon && <span className="shrink-0">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && <span className="ml-1 shrink-0">{tab.badge}</span>}
          </button>
        );
      })}
    </div>
  );
}
