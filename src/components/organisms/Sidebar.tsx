import React from 'react';
import { PanelLeftClose, PanelLeftOpen, X, ChevronDown } from 'lucide-react';
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
  collapsible?: boolean;
  defaultCollapsed?: boolean;
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
  // Estado para el grupo abierto actualmente (acordeón: solo 1 abierto a la vez)
  const [openGroupKey, setOpenGroupKey] = React.useState<string | null>(() => {
    const activeGroup = groups.find((g) => g.items.some((it) => it.active));
    if (activeGroup) return activeGroup.id || null;
    const firstNonCollapsed = groups.find((g) => g.collapsible !== false && !g.defaultCollapsed);
    return firstNonCollapsed?.id || null;
  });

  // Mantener referencia al grupo activo para auto-abrir al navegar, pero permitiendo cerrarlo manualmente
  const lastActiveKeyRef = React.useRef<string | null>(null);
  React.useEffect(() => {
    const activeGroup = groups.find((g) => g.items.some((it) => it.active));
    const activeKey = activeGroup?.id || null;
    if (activeKey && activeKey !== lastActiveKeyRef.current) {
      lastActiveKeyRef.current = activeKey;
      setOpenGroupKey(activeKey);
    }
  }, [groups]);

  const toggleGroup = (key: string) => {
    setOpenGroupKey((prev) => (prev === key ? null : key));
  };

  const badgeColors: Record<string, string> = {
    default: 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
    error: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  };

  const sidebarContent = (
    <aside
      className={cn(
        'h-screen bg-white/95 dark:bg-[#0D121F]/95 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] select-none shrink-0',
        collapsed ? 'w-16 overflow-visible' : 'w-64 overflow-hidden',
        className
      )}
    >
      {/* 1. Brand Header */}
      <div className="h-16 flex items-center px-3 border-b border-slate-200 dark:border-slate-800 shrink-0 relative justify-between">
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
      <div className={cn(
        'flex-1 custom-scrollbar',
        collapsed
          ? 'overflow-visible p-2 space-y-2 flex flex-col items-center'
          : 'overflow-y-auto overflow-x-hidden p-2.5 space-y-4'
      )}>
        {groups.filter((g) => g.items && g.items.length > 0).map((group, groupIdx) => {
          const groupKey = group.id || `group-${groupIdx}`;
          const isCollapsible = group.collapsible !== false && Boolean(group.label);
          const isOpen = !isCollapsible || openGroupKey === groupKey;
          const isGroupActive = group.items.some((it) => it.active);
          const activeItem = group.items.find((it) => it.active);
          const primaryItem = activeItem || group.items[0];

          if (!collapsed) {
            return (
              <div key={groupKey} className="space-y-1">
                {group.label && (
                  isCollapsible ? (
                    <button
                      type="button"
                      onClick={() => toggleGroup(groupKey)}
                      className={cn(
                        'w-full flex items-center justify-between px-2.5 py-1 text-[10px] font-mono uppercase tracking-widest transition-colors cursor-pointer select-none group/gh',
                        isGroupActive
                          ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                          : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-semibold'
                      )}
                    >
                      <span className="truncate">{group.label}</span>
                      <ChevronDown
                        className={cn(
                          'w-3.5 h-3.5 transition-transform duration-200 shrink-0',
                          isGroupActive
                            ? 'text-indigo-500 dark:text-indigo-400'
                            : 'text-slate-400 group-hover/gh:text-slate-600 dark:group-hover/gh:text-slate-300',
                          !isOpen && '-rotate-90'
                        )}
                      />
                    </button>
                  ) : (
                    <div className="px-2 pb-1.5 text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                      {group.label}
                    </div>
                  )
                )}

                <div
                  className={cn(
                    'space-y-0.5 transition-all duration-200 ease-in-out overflow-hidden',
                    isCollapsible && !isOpen ? 'max-h-0 opacity-0' : 'max-h-[800px] opacity-100'
                  )}
                >
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
                              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/60 border border-transparent'
                          )}
                        >
                          <span className="shrink-0 flex items-center justify-center">
                            {item.icon}
                          </span>
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
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }

          // Modo colapsado: SIEMPRE muestra el Flyout Menu con encabezado y lista de items
          return (
            <div key={groupKey} className="relative group/flyout">
              <button
                type="button"
                onClick={primaryItem.onClick}
                className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer select-none',
                  isGroupActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/80'
                )}
              >
                {primaryItem.icon}
              </button>

              <div className="absolute left-full top-0 ml-3 w-60 p-2 bg-white/95 dark:bg-[#0D121F]/95 backdrop-blur-md rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl opacity-0 pointer-events-none group-hover/flyout:opacity-100 group-hover/flyout:pointer-events-auto transition-all duration-150 ease-out translate-x-1 group-hover/flyout:translate-x-0 z-50 before:absolute before:-left-3 before:top-0 before:w-3 before:h-full">
                {group.label && (
                  <div className="px-2.5 py-1 border-b border-slate-100 dark:border-slate-800/70 mb-1.5 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest font-bold text-indigo-600 dark:text-indigo-400">
                      {group.label}
                    </span>
                  </div>
                )}
                <div className="space-y-0.5">
                  {group.items.map((it) => (
                    <button
                      key={it.id}
                      type="button"
                      onClick={it.onClick}
                      className={cn(
                        'w-full h-9 px-2.5 rounded-xl font-mono text-xs font-semibold flex items-center transition-colors cursor-pointer',
                        it.active
                          ? 'bg-indigo-600 text-white shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      )}
                    >
                      <span className="mr-2.5 shrink-0">{it.icon}</span>
                      <span className="truncate flex-1 text-left">{it.label}</span>
                      {it.badge !== undefined && (
                        <span className={cn('text-[10px] font-mono px-1.5 py-0.5 rounded-md border font-semibold ml-1.5', badgeColors[it.badgeVariant || 'default'])}>
                          {it.badge}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
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

      {/* Mobile drawer with backdrop and smooth animations */}
      <div
        className={cn(
          'fixed inset-0 z-50 md:hidden pointer-events-none',
          mobileOpen && 'pointer-events-auto'
        )}
        aria-hidden={!mobileOpen}
      >
        <div
          className={cn(
            'fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ease-out',
            mobileOpen ? 'opacity-100' : 'opacity-0'
          )}
          onClick={onMobileClose}
        />
        <div
          className={cn(
            'fixed inset-y-0 left-0 z-50 w-64 max-w-[85vw] h-full bg-white dark:bg-[#0D121F] shadow-2xl overflow-hidden transition-transform duration-300 ease-out will-change-transform flex flex-col',
            mobileOpen ? 'translate-x-0' : '-translate-x-full'
          )}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
};
