import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '../../utils/cn';

export type QuantityStepperAccent = 'indigo' | 'amber' | 'emerald';

export interface QuantityStepperProps {
  value: number;
  onChange: (nextValue: number) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  accent?: QuantityStepperAccent;
  ariaLabel?: string;
  className?: string;
}

const ACCENT_PLUS_CLASSES: Record<QuantityStepperAccent, string> = {
  indigo:
    'bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/25 border-indigo-500/30',
  amber:
    'bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 border-amber-500/30',
  emerald:
    'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 border-emerald-500/30',
};

export const QuantityStepper: React.FC<QuantityStepperProps> = ({
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  disabled = false,
  accent = 'indigo',
  ariaLabel = 'Cantidad',
  className = '',
}) => {
  const clamp = (raw: number): number => {
    const rounded = Math.round(raw);
    const aboveMin = Math.max(min, rounded);
    return max !== undefined ? Math.min(max, aboveMin) : aboveMin;
  };

  const canDecrement = !disabled && value > min;
  const canIncrement = !disabled && (max === undefined || value < max);

  return (
    <div
      className={cn(
        'inline-flex items-center h-10 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs',
        disabled && 'opacity-60 pointer-events-none',
        className
      )}
    >
      <button
        type="button"
        disabled={!canDecrement}
        onClick={() => onChange(clamp(value - step))}
        aria-label={`Disminuir ${ariaLabel}`}
        className="w-10 h-full flex items-center justify-center border-r border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0"
      >
        <Minus className="w-4 h-4" />
      </button>

      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        disabled={disabled}
        aria-label={ariaLabel}
        value={value > 0 ? String(value) : ''}
        placeholder="0"
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '') {
            onChange(min);
            return;
          }
          const parsed = Number(raw);
          if (!Number.isNaN(parsed)) {
            onChange(clamp(parsed));
          }
        }}
        className="w-14 h-full px-1 text-center font-mono text-sm font-extrabold text-slate-900 dark:text-white bg-transparent focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />

      <button
        type="button"
        disabled={!canIncrement}
        onClick={() => onChange(clamp(value + step))}
        aria-label={`Aumentar ${ariaLabel}`}
        className={cn(
          'w-10 h-full flex items-center justify-center border-l disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shrink-0',
          ACCENT_PLUS_CLASSES[accent]
        )}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
};
