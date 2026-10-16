import React from 'react';
import { cn } from '../../utils/cn';

export interface MetricItem {
  id?: string;
  label: string;
  value: string | number;
  subtext?: React.ReactNode;
  icon?: React.ElementType;
  badge?: string;
  color?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'slate';
}

export interface MetricStripProps {
  items: MetricItem[];
  className?: string;
}

export const MetricStrip: React.FC<MetricStripProps> = ({ items, className }) => {
  return (
    <div
      className={cn(
        'w-full bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800/90 rounded-2xl overflow-hidden shadow-xs',
        className
      )}
    >
      <div
        className={cn(
          'grid grid-cols-1 divide-y divide-slate-100 dark:divide-slate-800/70',
          items.length === 2 && 'sm:grid-cols-2 sm:divide-y-0 sm:divide-x',
          items.length === 3 && 'sm:grid-cols-3 sm:divide-y-0 sm:divide-x',
          items.length >= 4 && 'sm:grid-cols-2 lg:grid-cols-4 sm:divide-y-0 sm:divide-x'
        )}
      >
        {items.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id || idx}
              className="p-4 sm:p-5 flex flex-col justify-between space-y-2 hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-mono uppercase tracking-wider text-slate-700 dark:text-slate-300 font-bold truncate">
                  {item.label}
                </span>
                {Icon && (
                  <div
                    className={cn(
                      'p-1.5 rounded-lg shrink-0',
                      item.color === 'emerald' && 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                      item.color === 'indigo' && 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
                      item.color === 'amber' && 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
                      item.color === 'rose' && 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
                      (!item.color || item.color === 'slate') && 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                )}
                {item.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.badge}
                  </span>
                )}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                  {item.value}
                </span>
              </div>

              {item.subtext && (
                <div className="text-xs text-slate-600 dark:text-slate-400 font-mono flex items-center justify-between pt-1 border-t border-slate-200 dark:border-slate-800/60">
                  {item.subtext}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
