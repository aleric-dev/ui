import React from 'react';
import { cn } from '../../utils/cn';
import { StepTimeline, StepItem } from '../atoms/StepTimeline';

export type ModalStepRatio = '5/7' | '6/6' | '4/8' | '7/5';

export interface ModalStepPaneConfig {
  title: string;
  subtitle?: string;
  badge?: React.ReactNode;
  header?: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export interface ModalStepLayoutProps {
  /** Configuración del Paso 1 (Instrucciones / Entrada) */
  step1: ModalStepPaneConfig;
  /** Configuración del Paso 2 (Generación / Resultados) */
  step2: ModalStepPaneConfig;

  /** Paso actual activo (1 o 2) */
  currentStep?: 1 | 2;
  /** Lista de números de pasos completados (ej. [1]) */
  completedSteps?: number[];
  /** Callback al cambiar de paso */
  onStepChange?: (step: 1 | 2) => void;

  /** Relación de columnas en Desktop (>= 1024px) */
  ratio?: ModalStepRatio;

  /** Clases adicionales para el contenedor raíz */
  className?: string;
}

const RATIO_CLASSES: Record<ModalStepRatio, { left: string; right: string }> = {
  '5/7': { left: 'lg:col-span-5', right: 'lg:col-span-7' },
  '6/6': { left: 'lg:col-span-6', right: 'lg:col-span-6' },
  '4/8': { left: 'lg:col-span-4', right: 'lg:col-span-8' },
  '7/5': { left: 'lg:col-span-7', right: 'lg:col-span-5' },
};

export const ModalStepLayout: React.FC<ModalStepLayoutProps> = ({
  step1,
  step2,
  currentStep = 1,
  completedSteps = [],
  onStepChange,
  ratio = '5/7',
  className = '',
}) => {
  const ratioClass = RATIO_CLASSES[ratio];

  const timelineSteps: StepItem[] = [
    {
      id: 'step-1',
      number: 1,
      title: step1.title,
      subtitle: step1.subtitle,
      badge: step1.badge,
    },
    {
      id: 'step-2',
      number: 2,
      title: step2.title,
      subtitle: step2.subtitle,
      badge: step2.badge,
    },
  ];

  return (
    <div className={cn('flex flex-col overflow-hidden select-none', className)}>
      {/* =================================================================== */}
      {/* TIMELINE DE PASOS HORIZONTAL (Solo visible en Mobile & Tablet < lg)  */}
      {/* =================================================================== */}
      <div className="lg:hidden px-4 py-2.5 bg-slate-100/80 dark:bg-slate-900/90 border-b border-slate-200 dark:border-slate-800 shrink-0">
        <StepTimeline
          steps={timelineSteps}
          currentStep={currentStep}
          completedSteps={completedSteps}
          onStepClick={(num) => onStepChange?.(num as 1 | 2)}
          allowStepBack={true}
        />
      </div>

      {/* =================================================================== */}
      {/* CONTENEDOR PRINCIPAL: 2 Cols en Desktop / Paso Activo en Mobile      */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* PASO 1 (COLUMNA IZQUIERDA EN DESKTOP) */}
        <div
          className={cn(
            'flex flex-col border-slate-200 dark:border-slate-800 overflow-hidden',
            ratioClass.left,
            'lg:border-r',
            currentStep === 1 ? 'flex' : 'hidden lg:flex',
            step1.className
          )}
        >
          {step1.header && <div className="shrink-0">{step1.header}</div>}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain modal-scrollbar">
            {step1.content}
          </div>
          {step1.footer && <div className="shrink-0">{step1.footer}</div>}
        </div>

        {/* PASO 2 (COLUMNA DERECHA EN DESKTOP) */}
        <div
          className={cn(
            'flex flex-col overflow-hidden',
            ratioClass.right,
            currentStep === 2 ? 'flex' : 'hidden lg:flex',
            step2.className
          )}
        >
          {step2.header && <div className="shrink-0">{step2.header}</div>}
          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain modal-scrollbar">
            {step2.content}
          </div>
          {step2.footer && <div className="shrink-0">{step2.footer}</div>}
        </div>
      </div>
    </div>
  );
};
