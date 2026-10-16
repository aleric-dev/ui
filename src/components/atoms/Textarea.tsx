import React from 'react';
import { cn } from '../../utils/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  mono?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ error = false, mono = false, className = '', disabled, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full px-3.5 py-2.5 text-xs rounded-xl border transition-all duration-150 outline-none resize-y',
          'bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 text-slate-900 dark:text-white',
          'placeholder:text-slate-400 dark:placeholder:text-slate-500',
          mono && 'font-mono text-[11px] leading-relaxed',
          error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
            : 'border-slate-200 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20',
          disabled && 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900/50',
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
