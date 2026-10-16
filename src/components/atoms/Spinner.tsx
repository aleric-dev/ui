import React from 'react';
import { cn } from '../../utils/cn';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'w-3.5 h-3.5 border-2',
  md: 'w-5 h-5 border-2',
  lg: 'w-8 h-8 border-3',
};

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '' }) => {
  return (
    <div
      role="status"
      className={cn(
        'rounded-full border-current border-t-transparent animate-spin text-indigo-500 shrink-0 inline-block',
        SIZE_CLASSES[size],
        className
      )}
    >
      <span className="sr-only">Cargando...</span>
    </div>
  );
};
