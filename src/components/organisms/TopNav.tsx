import React from 'react';
import { ChevronRight, Menu, Moon, Sun } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface BreadcrumbItem {
  label: string;
  icon?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  color?: string;
}

export interface TopNavProps {
  breadcrumbs?: BreadcrumbItem[];
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  userMenu?: React.ReactNode;
  notificationSlot?: React.ReactNode;
  themeToggle?: {
    theme: 'dark' | 'light';
    onToggle: () => void;
  };
  onMobileMenuToggle?: () => void;
  className?: string;
}

export const TopNav: React.FC<TopNavProps> = ({
  breadcrumbs,
  title,
  subtitle,
  actions,
  userMenu,
  notificationSlot,
  themeToggle,
  onMobileMenuToggle,
  className = '',
}) => {
  return (
    <header
      className={cn(
        'h-16 border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-[#0D121F]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between shrink-0 select-none z-30 transition-colors',
        className
      )}
    >
      {/* Lado Izquierdo: Botón móvil + Breadcrumbs o Título */}
      <div className="flex items-center gap-3 min-w-0">
        {onMobileMenuToggle && (
          <button
            type="button"
            onClick={onMobileMenuToggle}
            className="p-2 -ml-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        {breadcrumbs && breadcrumbs.length > 0 ? (
          <nav className="flex items-center gap-1.5 text-xs font-mono overflow-x-auto no-scrollbar py-1">
            {breadcrumbs.map((crumb, idx) => {
              const isLast = idx === breadcrumbs.length - 1;

              return (
                <React.Fragment key={idx}>
                  <div
                    onClick={crumb.onClick}
                    className={cn(
                      'flex items-center gap-1.5 transition-colors whitespace-nowrap',
                      crumb.onClick ? 'cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400' : '',
                      isLast
                        ? 'font-bold text-slate-900 dark:text-white'
                        : 'text-slate-500 dark:text-slate-400 font-medium'
                    )}
                  >
                    {crumb.icon && <span className="shrink-0">{crumb.icon}</span>}
                    <span className={crumb.color || ''}>{crumb.label}</span>
                  </div>
                  {!isLast && (
                    <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-600 shrink-0" />
                  )}
                </React.Fragment>
              );
            })}
          </nav>
        ) : (
          (title || subtitle) && (
            <div className="flex flex-col min-w-0">
              {title && (
                <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate tracking-tight">
                  {title}
                </h1>
              )}
              {subtitle && (
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 truncate">
                  {subtitle}
                </p>
              )}
            </div>
          )
        )}
      </div>

      {/* Lado Derecho: Acciones, Notificaciones, Tema, User Menu */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {actions && <div className="flex items-center gap-2">{actions}</div>}

        {notificationSlot}

        {themeToggle && (
          <button
            type="button"
            onClick={themeToggle.onToggle}
            title={themeToggle.theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            {themeToggle.theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        )}

        {userMenu}
      </div>
    </header>
  );
};
