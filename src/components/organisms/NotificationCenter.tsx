import React, { useState, useEffect, useRef } from 'react';
import { Bell, CheckCheck, Info, CheckCircle2, AlertTriangle, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface NotificationItem {
  id: string;
  title: string;
  description?: string;
  timestamp?: string | Date;
  read?: boolean;
  type?: 'info' | 'success' | 'warning' | 'error';
  tag?: string;
  onAction?: () => void;
  actionLabel?: string;
}

export interface NotificationCenterProps {
  notifications: NotificationItem[];
  unreadCount?: number;
  onMarkAllAsRead?: () => void;
  onNotificationClick?: (item: NotificationItem) => void;
  emptyTitle?: string;
  emptyDescription?: string;
  className?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  unreadCount: propUnreadCount,
  onMarkAllAsRead,
  onNotificationClick,
  emptyTitle = 'Sin notificaciones',
  emptyDescription = 'Todo está al día en tu panel.',
  className = '',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const unreadCount =
    propUnreadCount !== undefined
      ? propUnreadCount
      : notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const typeIcons: Record<string, React.ReactNode> = {
    info: <Info className="w-4 h-4 text-indigo-500" />,
    success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
    warning: <AlertTriangle className="w-4 h-4 text-amber-500" />,
    error: <AlertCircle className="w-4 h-4 text-rose-500" />,
  };

  return (
    <div ref={containerRef} className={cn('relative inline-block', className)}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative cursor-pointer',
          isOpen && 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white'
        )}
        aria-label="Notificaciones"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-bold flex items-center justify-center animate-pulse">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[480px] animate-in fade-in zoom-in-95 duration-100">
          {/* Header */}
          <div className="p-3.5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Notificaciones
              </span>
              {unreadCount > 0 && (
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800">
                  {unreadCount} nuevas
                </span>
              )}
            </div>

            {onMarkAllAsRead && unreadCount > 0 && (
              <button
                type="button"
                onClick={onMarkAllAsRead}
                className="text-[11px] font-mono text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                Marcar leídas
              </button>
            )}
          </div>

          {/* List */}
          <div className="overflow-y-auto flex-1 divide-y divide-slate-100 dark:divide-slate-800/60 custom-scrollbar">
            {notifications.length === 0 ? (
              <div className="p-8 text-center flex flex-col items-center">
                <Bell className="w-8 h-8 text-slate-300 dark:text-slate-700 mb-2" />
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {emptyTitle}
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  {emptyDescription}
                </p>
              </div>
            ) : (
              notifications.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onNotificationClick && onNotificationClick(item)}
                  className={cn(
                    'p-3.5 transition-colors flex gap-3 text-left',
                    onNotificationClick ? 'cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900/60' : '',
                    !item.read ? 'bg-indigo-50/30 dark:bg-indigo-950/15' : ''
                  )}
                >
                  <div className="shrink-0 mt-0.5">
                    {typeIcons[item.type || 'info']}
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-snug">
                        {item.title}
                      </p>
                      {!item.read && (
                        <span className="w-2 h-2 rounded-full bg-indigo-600 shrink-0 mt-1" />
                      )}
                    </div>

                    {item.description && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {item.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      {item.timestamp && (
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                          {typeof item.timestamp === 'string'
                            ? item.timestamp
                            : item.timestamp.toLocaleDateString()}
                        </span>
                      )}

                      {item.onAction && item.actionLabel && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            item.onAction!();
                          }}
                          className="text-[11px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold hover:underline cursor-pointer"
                        >
                          {item.actionLabel}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
