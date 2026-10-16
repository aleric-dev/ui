import React from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  helperText,
  required = false,
  className = '',
  children,
}) => {
  return (
    <div className={cn('space-y-1.5 text-left w-full', className)}>
      {label && (
        <label className="block text-xs font-mono font-semibold text-slate-800 dark:text-slate-200">
          {label} {required && <span className="text-rose-500 font-bold">*</span>}
        </label>
      )}
      {children}
      {error ? (
        <p className="text-[11px] font-mono text-rose-600 dark:text-rose-400 font-medium">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] font-mono text-slate-600 dark:text-slate-400 font-medium">{helperText}</p>
      ) : null}
    </div>
  );
};
