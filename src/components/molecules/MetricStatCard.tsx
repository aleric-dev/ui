import React from 'react';
import { Card } from '../atoms/Card';
import { cn } from '../../utils/cn';

export interface MetricStatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  iconColor?: string;
  className?: string;
}

export const MetricStatCard: React.FC<MetricStatCardProps> = ({
  label,
  value,
  subtitle,
  icon,
  iconColor = 'text-indigo-500 bg-indigo-500/10',
  className = '',
}) => {
  return (
    <Card hover className={cn('flex items-center justify-between p-4', className)}>
      <div className="space-y-1">
        <p className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">
          {value}
        </p>
        {subtitle && (
          <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">{subtitle}</p>
        )}
      </div>

      {icon && (
        <div className={cn('p-3 rounded-2xl shrink-0 flex items-center justify-center', iconColor)}>
          {icon}
        </div>
      )}
    </Card>
  );
};
