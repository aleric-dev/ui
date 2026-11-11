import React from 'react';
import { cn } from '../../utils/cn';

export interface FormFieldProps {
  label?: React.ReactNode;
  labelRight?: React.ReactNode;
  error?: string;
  helperText?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  labelRight,
  error,
  helperText,
  hint,
  required = false,
  className = '',
  children,
}) => {
  const resolvedHelp = helperText || hint;

  return (
    <div className={cn('space-y-1.5 text-left w-full font-sans', className)}>
      {(label || labelRight) && (
        <div className="flex items-center justify-between gap-2">
          {label && (
            <label className="block text-xs font-sans font-semibold text-slate-800 dark:text-slate-200">
              {label} {required && <span className="text-rose-500 font-bold">*</span>}
            </label>
          )}
          {labelRight && <div className="shrink-0">{labelRight}</div>}
        </div>
      )}
      {children}
      {error ? (
        <p className="text-[11px] font-sans text-rose-600 dark:text-rose-400 font-medium">{error}</p>
      ) : resolvedHelp ? (
        <p className="text-[11px] font-sans text-slate-600 dark:text-slate-400 font-medium">{resolvedHelp}</p>
      ) : null}
    </div>
  );
};
