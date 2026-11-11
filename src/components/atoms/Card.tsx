import React from 'react';
import { cn } from '../../utils/cn';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hover?: boolean;
  padding?: CardPadding;
}

const PADDING_CLASSES: Record<CardPadding, string> = {
  none: 'p-0',
  sm: 'p-3.5',
  md: 'p-5',
  lg: 'p-6 sm:p-8',
};

export const Card: React.FC<CardProps> = ({
  hover = false,
  padding = 'md',
  children,
  className = '',
  ...props
}) => {
  return (
    <div
      className={cn(
        'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl',
        PADDING_CLASSES[padding],
        hover && 'transition-all duration-150 hover:border-slate-300 dark:hover:border-slate-700/80',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
