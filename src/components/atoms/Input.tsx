import React from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  mono?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ error = false, mono = false, leftIcon, rightIcon, className = '', disabled, ...props }, ref) => {
    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3 text-slate-500 dark:text-slate-400 pointer-events-none shrink-0 flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          disabled={disabled}
          className={cn(
            'w-full px-3.5 py-2 text-xs rounded-xl border transition-all duration-150 outline-none',
            'bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 text-slate-900 dark:text-white',
            'placeholder:text-slate-500 dark:placeholder:text-slate-400',
            mono && 'font-mono tracking-tight',
            leftIcon && 'pl-9',
            rightIcon && 'pr-9',
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
              : 'border-slate-300 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900/50',
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-slate-500 dark:text-slate-400 pointer-events-none shrink-0 flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
