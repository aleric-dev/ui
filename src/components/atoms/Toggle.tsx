import React from 'react';
import { cn } from '../../utils/cn';

export interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md';
  className?: string;
}

export const Toggle: React.FC<ToggleProps> = ({
  checked,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
}) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-40',
        size === 'sm' ? 'h-5 w-9' : 'h-6 w-11',
        checked ? 'bg-indigo-600' : 'bg-slate-200 dark:bg-slate-700',
        className
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none inline-block transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out',
          size === 'sm' ? 'h-4 w-4 mt-0.5' : 'h-5 w-5 mt-0.5',
          checked
            ? size === 'sm'
              ? 'translate-x-4 ml-0.5'
              : 'translate-x-5 ml-0.5'
            : 'translate-x-0 ml-0.5'
        )}
      />
    </button>
  );
};
