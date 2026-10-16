import React from 'react';
import { PanelLeftClose, PanelLeftOpen, X } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
  badge?: string | number;
  badgeVariant?: 'default' | 'success' | 'warning' | 'error';
  href?: string;
  onClick?: () => void;
}

export interface NavGroup {
  id?: string;
  label?: string;
  items: NavItem[];
}

export interface SidebarBrand {
  name?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  collapsedLogo?: React.ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface SidebarProps {
  brand?: SidebarBrand;
  groups: NavGroup[];
  footer?: React.ReactNode;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  brand,
  groups,
  footer,
  collapsed = false,
  onToggleCollapse,
  mobileOpen = false,
  onMobileClose,
  className = '',
}) => {
  const badgeColors: Record<string, string> = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  const sidebarContent = (
    <aside
      className={cn(
        'h-screen bg-white/95 dark:bg-[#0D121F]/95 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] select-none shrink-0 overflow-hidden',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* 1. Brand Header */}
      <div className="h-16 flex items-center px-3 border-b border-slate-200 dark:border-slate-800 shrink-0 overflow-hidden relative justify-between">
        {brand && (
          <div
            onClick={brand.onClick}
            className={cn(
              'flex items-center min-w-0 transition-opacity',
              brand.onClick ? 'cursor-pointer hover:opacity-80' : '',
              collapsed ? 'justify-center w-full' : 'gap-2.5 pl-1'
            )}
            title={brand.name}
          >
            {collapsed ? (
              brand.collapsedLogo || brand.logo || (
                <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white font-mono font-bold flex items-center justify-center text-sm shadow-xs">
                  {brand.name ? brand.name.charAt(0).toUpperCase() : 'A'}
                </div>
              )
            ) : (
              <>
                {brand.logo}
                {(brand.name || brand.subtitle) && (
                  <div className="flex flex-col min-w-0">
                    {brand.name && (
                      <span className="text-xs font-mono font-bold text-slate-900 dark:text-white truncate tracking-tight">
                        {brand.name}
                      </span>
                    )}
                    {brand.subtitle && (
                      <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 truncate">
                        {brand.subtitle}
                      </span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {!collapsed && onToggleCollapse && (
          <button
            type="button"
            onClick={onToggleCollapse}
            title="Colapsar menú"
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
          >
            <PanelLeftClose className="w-4 h-4" />
          </button>
        )}

        {onMobileClose && (
          <button
            type="button"
            onClick={onMobileClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors md:hidden"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* 2. Navigation Items */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden p-2.5 space-y-5 custom-scrollbar">
        {groups.map((group, groupIdx) => (
          <div key={group.id || groupIdx} className="space-y-1">
            {group.label && !collapsed && (
              <div className="px-2 pb-1.5 text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                {group.label}
              </div>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const badgeColor = badgeColors[item.badgeVariant || 'default'];

                return (
                  <div key={item.id} className="relative group/navitem">
                    <button
                      type="button"
                      onClick={item.onClick}
                      className={cn(
                        'w-full flex items-center gap-3 px-2.5 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer select-none',
                        item.active
                          ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200/70 dark:border-indigo-800/60 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border border-transparent',
                        collapsed && 'justify-center px-0'
                      )}
                    >
                      <span className="shrink-0 flex items-center justify-center">
                        {item.icon}
                      </span>

                      {!collapsed && (
                        <>
                          <span className="truncate flex-1 text-left">{item.label}</span>
                          {item.badge !== undefined && (
                            <span
                              className={cn(
                                'text-[10px] font-mono px-1.5 py-0.5 rounded-md border font-semibold',
                                badgeColor
                              )}
                            >
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>

                    {/* Tooltip flotante en estado colapsado */}
                    {collapsed && (
                      <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2.5 py-1.5 bg-slate-900 text-white dark:bg-slate-800 text-xs rounded-lg shadow-lg pointer-events-none opacity-0 group-hover/navitem:opacity-100 transition-opacity z-50 whitespace-nowrap font-mono flex items-center gap-2">
                        <span>{item.label}</span>
                        {item.badge !== undefined && (
                          <span className="text-[10px] px-1 rounded bg-slate-700 font-bold">
                            {item.badge}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 3. Footer Slot (User menu, etc.) & Expand Button */}
      <div className="border-t border-slate-200 dark:border-slate-800 p-2.5 shrink-0 bg-slate-50/50 dark:bg-slate-900/30">
        {collapsed && onToggleCollapse && (
          <div className="flex justify-center mb-2">
            <button
              type="button"
              onClick={onToggleCollapse}
              title="Expandir menú"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <PanelLeftOpen className="w-4 h-4" />
            </button>
          </div>
        )}
        {footer}
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:block shrink-0">{sidebarContent}</div>

      {/* Mobile drawer with backdrop */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={onMobileClose}
          />
          <div className="relative z-10">{sidebarContent}</div>
        </div>
      )}
    </>
  );
};
