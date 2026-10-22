import React, { useState } from 'react';
import { cn } from '../../utils/cn';

export type ModalSplitRatio = '5/7' | '6/6' | '4/8' | '7/5';
export type ModalSplitMobileMode = 'tabs' | 'stack';

export interface ModalSplitLayoutProps {
  /** Título de la columna izquierda (o Tab 1 en móvil) */
  leftTitle: React.ReactNode;
  /** Icono opcional para la columna izquierda */
  leftIcon?: React.ReactNode;
  /** Badge o conteo opcional para la columna izquierda */
  leftBadge?: React.ReactNode;

  /** Título de la columna derecha (o Tab 2 en móvil) */
  rightTitle: React.ReactNode;
  /** Icono opcional para la columna derecha */
  rightIcon?: React.ReactNode;
  /** Badge o conteo opcional para la columna derecha */
  rightBadge?: React.ReactNode;

  /** Relación de columnas en Desktop (>= 1024px) */
  ratio?: ModalSplitRatio;

  /** Comportamiento en Mobile (< 1024px): 'tabs' (pestañas segmentadas) o 'stack' (vertical fluido) */
  mobileMode?: ModalSplitMobileMode;

  /** Pestaña activa controlada */
  activeTab?: 'left' | 'right';
  /** Pestaña activa inicial si no es controlada */
  defaultActiveTab?: 'left' | 'right';
  /** Callback al cambiar de pestaña en móvil */
  onTabChange?: (tab: 'left' | 'right') => void;

  /** Contenido de la columna izquierda */
  leftContent: React.ReactNode;
  /** Pie o barra de botones anclada en la columna izquierda */
  leftFooter?: React.ReactNode;
  /** Clases adicionales para la columna izquierda */
  leftClassName?: string;

  /** Cabecera opcional para la columna derecha */
  rightHeader?: React.ReactNode;
  /** Contenido de la columna derecha */
  rightContent: React.ReactNode;
  /** Pie opcional para la columna derecha */
  rightFooter?: React.ReactNode;
  /** Clases adicionales para la columna derecha */
  rightClassName?: string;

  /** Clases adicionales para el contenedor raíz */
  className?: string;
}

const RATIO_CLASSES: Record<ModalSplitRatio, { left: string; right: string }> = {
  '5/7': { left: 'lg:col-span-5', right: 'lg:col-span-7' },
  '6/6': { left: 'lg:col-span-6', right: 'lg:col-span-6' },
  '4/8': { left: 'lg:col-span-4', right: 'lg:col-span-8' },
  '7/5': { left: 'lg:col-span-7', right: 'lg:col-span-5' },
};

export const ModalSplitLayout: React.FC<ModalSplitLayoutProps> = ({
  leftTitle,
  leftIcon,
  leftBadge,
  rightTitle,
  rightIcon,
  rightBadge,
  ratio = '5/7',
  mobileMode = 'tabs',
  activeTab: controlledTab,
  defaultActiveTab = 'left',
  onTabChange,
  leftContent,
  leftFooter,
  leftClassName = '',
  rightHeader,
  rightContent,
  rightFooter,
  rightClassName = '',
  className = '',
}) => {
  const [internalTab, setInternalTab] = useState<'left' | 'right'>(defaultActiveTab);
  const currentTab = controlledTab !== undefined ? controlledTab : internalTab;

  const handleTabClick = (tab: 'left' | 'right') => {
    if (controlledTab === undefined) {
      setInternalTab(tab);
    }
    onTabChange?.(tab);
  };

  const ratioClass = RATIO_CLASSES[ratio];

  // =========================================================================
  // MODO PESTAÑAS (TABS) EN MOBILE (< lg) / 2 COLUMNAS EN DESKTOP (>= lg)
  // =========================================================================
  if (mobileMode === 'tabs') {
    return (
      <div className={cn('flex-1 min-h-0 flex flex-col h-full overflow-hidden select-none', className)}>
        {/* Barra de Tabs Táctil Segmentada (Solo visible en Mobile & Tablet < lg) */}
        <div className="lg:hidden p-2.5 bg-slate-100 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shrink-0">
          <div className="flex rounded-xl bg-slate-200/70 dark:bg-slate-800/80 p-1 gap-1">
            <button
              type="button"
              onClick={() => handleTabClick('left')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer truncate',
                currentTab === 'left'
                  ? 'bg-white dark:bg-[#0D121F] text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              {leftIcon && <span className="shrink-0">{leftIcon}</span>}
              <span className="truncate">{leftTitle}</span>
              {leftBadge !== undefined && (
                <span className="ml-1 px-1.5 py-0.2 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                  {leftBadge}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabClick('right')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg font-mono text-xs font-bold transition-all cursor-pointer truncate',
                currentTab === 'right'
                  ? 'bg-white dark:bg-[#0D121F] text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              )}
            >
              {rightIcon && <span className="shrink-0">{rightIcon}</span>}
              <span className="truncate">{rightTitle}</span>
              {rightBadge !== undefined && (
                <span className="ml-1 px-1.5 py-0.2 rounded-md bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                  {rightBadge}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Contenedor Grid Principal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 h-full overflow-hidden">
          {/* PANEL IZQUIERDO: Visible en Desktop o cuando Tab Izquierdo está activo */}
          <div
            className={cn(
              'h-full flex flex-col min-h-0 border-slate-200 dark:border-slate-800 overflow-hidden',
              ratioClass.left,
              'lg:border-r',
              currentTab === 'left' ? 'flex' : 'hidden lg:flex',
              leftClassName
            )}
          >
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain modal-scrollbar">
              {leftContent}
            </div>
            {leftFooter && <div className="shrink-0">{leftFooter}</div>}
          </div>

          {/* PANEL DERECHO: Visible en Desktop o cuando Tab Derecho está activo */}
          <div
            className={cn(
              'h-full flex flex-col min-h-0 overflow-hidden',
              ratioClass.right,
              currentTab === 'right' ? 'flex' : 'hidden lg:flex',
              rightClassName
            )}
          >
            {rightHeader && <div className="shrink-0">{rightHeader}</div>}
            <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain modal-scrollbar">
              {rightContent}
            </div>
            {rightFooter && <div className="shrink-0">{rightFooter}</div>}
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MODO PILA VERTICAL (STACK) EN MOBILE (< lg) / 2 COLUMNAS EN DESKTOP (>= lg)
  // =========================================================================
  return (
    <div className={cn('flex-1 min-h-0 flex flex-col h-full overflow-hidden', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 min-h-0 h-full overflow-y-auto lg:overflow-hidden modal-scrollbar">
        {/* PANEL IZQUIERDO */}
        <div
          className={cn(
            'flex flex-col min-h-0 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800 lg:h-full lg:overflow-hidden',
            ratioClass.left,
            leftClassName
          )}
        >
          <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto modal-scrollbar">
            {leftContent}
          </div>
          {leftFooter && <div className="shrink-0">{leftFooter}</div>}
        </div>

        {/* PANEL DERECHO */}
        <div
          className={cn(
            'flex flex-col min-h-0 lg:h-full lg:overflow-hidden',
            ratioClass.right,
            rightClassName
          )}
        >
          {rightHeader && <div className="shrink-0">{rightHeader}</div>}
          <div className="lg:flex-1 lg:min-h-0 lg:overflow-y-auto modal-scrollbar">
            {rightContent}
          </div>
          {rightFooter && <div className="shrink-0">{rightFooter}</div>}
        </div>
      </div>
    </div>
  );
};
