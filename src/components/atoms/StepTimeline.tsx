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
  return (
    <div className={cn('w-full flex items-center justify-between select-none py-1.5', className)}>
      {steps.map((step, idx) => {
        const isCompleted = completedSteps.includes(step.number) || step.number < currentStep;
        const isActive = step.number === currentStep;
        const isPending = !isCompleted && !isActive;
        const isClickable = allowStepBack && (isCompleted || isActive) && Boolean(onStepClick);
        const isLast = idx === steps.length - 1;

        return (
          <React.Fragment key={step.id}>
            {/* Step Node */}
            <div
              onClick={() => {
                if (isClickable && onStepClick) {
                  onStepClick(step.number);
                }
              }}
              className={cn(
                'flex items-center gap-2 transition-all',
                isClickable ? 'cursor-pointer group' : 'cursor-default'
              )}
            >
              {/* Badge del número o check */}
              <div
                className={cn(
                  'w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold border transition-all shrink-0',
                  isCompleted && 'bg-emerald-600 border-emerald-600 text-white shadow-xs',
                  isActive && 'bg-indigo-600 border-indigo-600 text-white ring-4 ring-indigo-500/20 shadow-xs scale-105',
                  isPending && 'bg-slate-100 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-slate-400 dark:text-slate-500'
                )}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[2.5]" /> : step.number}
              </div>

              {/* Título y subtítulo */}
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className={cn(
                      'text-xs font-mono font-bold transition-colors truncate',
                      isActive && 'text-indigo-600 dark:text-indigo-400',
                      isCompleted && 'text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400',
                      isPending && 'text-slate-400 dark:text-slate-500'
                    )}
                  >
                    {step.title}
                  </span>

                  {step.badge !== undefined && (
                    <span className="shrink-0">{step.badge}</span>
                  )}
                </div>

                {step.subtitle && (
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate hidden sm:inline">
                    {step.subtitle}
                  </span>
                )}
              </div>
            </div>

            {/* Línea conectora entre pasos */}
            {!isLast && (
              <div className="flex-1 mx-3 h-0.5 min-w-[20px] rounded-full transition-colors bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <div
                  className={cn(
                    'h-full transition-all duration-300',
                    isCompleted ? 'w-full bg-emerald-500' : 'w-0'
                  )}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};
