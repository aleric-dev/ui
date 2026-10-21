import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface StepItem {
  id: string | number;
  number: number;
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
}

export interface StepTimelineProps {
  steps: StepItem[];
  currentStep: number;
  completedSteps?: number[];
  onStepClick?: (stepNumber: number) => void;
  allowStepBack?: boolean;
  className?: string;
}

export const StepTimeline: React.FC<StepTimelineProps> = ({
  steps,
  currentStep,
  completedSteps = [],
  onStepClick,
  allowStepBack = true,
  className = '',
}) => {
  const gridColsClass =
    steps.length === 2
      ? 'grid-cols-2'
      : steps.length === 3
        ? 'grid-cols-3'
        : 'grid-cols-4';

  return (
    <div className={cn('w-full grid select-none gap-2 py-1', gridColsClass, className)}>
      {steps.map((step) => {
        const isCompleted = completedSteps.includes(step.number) || step.number < currentStep;
        const isActive = step.number === currentStep;
        const isPending = !isCompleted && !isActive;
        const isClickable = allowStepBack && (isCompleted || isActive) && Boolean(onStepClick);

        return (
          <div
            key={step.id}
            onClick={() => {
              if (isClickable && onStepClick) {
                onStepClick(step.number);
              }
            }}
            className={cn(
              'flex items-center gap-2 p-1.5 sm:p-2 rounded-xl transition-all min-w-0 border',
              isActive && 'bg-indigo-50/80 dark:bg-indigo-950/50 border-indigo-500/30 shadow-xs',
              isCompleted && 'bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-500/25',
              isPending && 'bg-slate-100/60 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800/60 opacity-60',
              isClickable ? 'cursor-pointer group hover:opacity-100' : 'cursor-default'
            )}
          >
            {/* Badge del número o check */}
            <div
              className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold border transition-all shrink-0',
                isCompleted && 'bg-emerald-600 border-emerald-600 text-white shadow-xs',
                isActive && 'bg-indigo-600 border-indigo-600 text-white ring-2 ring-indigo-500/30 shadow-xs scale-105',
                isPending && 'bg-slate-200/70 dark:bg-slate-700/60 border-slate-300 dark:border-slate-600 text-slate-500 dark:text-slate-400'
              )}
            >
              {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.number}
            </div>

            {/* Título y subtítulo */}
            <div className="flex flex-col min-w-0 flex-1">
              <span
                className={cn(
                  'text-[11px] sm:text-xs font-mono font-bold transition-colors leading-tight break-words',
                  isActive && 'text-indigo-600 dark:text-indigo-400',
                  isCompleted && 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
                  isPending && 'text-slate-500 dark:text-slate-400'
                )}
              >
                {step.title}
              </span>

              {step.subtitle && (
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate mt-0.5 hidden xs:inline">
                  {step.subtitle}
                </span>
              )}
            </div>

            {step.badge !== undefined && (
              <span className="shrink-0 hidden sm:inline">{step.badge}</span>
            )}
          </div>
        );
      })}
    </div>
  );
};
