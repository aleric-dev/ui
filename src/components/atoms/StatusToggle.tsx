import React from 'react';
import { Clock, Sparkles, CheckCheck } from 'lucide-react';

export type IdeaStatus = 'pending' | 'ready' | 'published';

export interface StatusToggleProps {
  status: IdeaStatus;
  onChange: (status: IdeaStatus) => void;
  compact?: boolean;
  fullWidth?: boolean;
}

export const StatusToggle: React.FC<StatusToggleProps> = ({
  status = 'pending',
  onChange,
  compact = false,
  fullWidth = false,
}) => {
  const nextStatusMap: Record<IdeaStatus, IdeaStatus> = {
    pending: 'ready',
    ready: 'published',
    published: 'pending',
  };

  const handleCycleStatus = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = nextStatusMap[status] || 'pending';
    onChange(next);
  };

  const statusConfig = {
    pending: {
      label: 'Pendiente',
      nextLabel: 'Generado',
      icon: Clock,
      classes: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
      iconColor: 'text-amber-500',
    },
    ready: {
      label: 'Generado',
      nextLabel: 'Publicado',
      icon: Sparkles,
      classes: 'bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
      iconColor: 'text-indigo-400',
    },
    published: {
      label: 'Publicado',
      nextLabel: 'Pendiente',
      icon: CheckCheck,
      classes: 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
  }[status] || {
    label: 'Pendiente',
    nextLabel: 'Generado',
    icon: Clock,
    classes: 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 dark:text-amber-400 border-amber-500/30',
    iconColor: 'text-amber-500',
  };

  const CurrentIcon = statusConfig.icon;

  return (
    <button
      type="button"
      onClick={handleCycleStatus}
      title={`Estado actual: ${statusConfig.label} (clic para alternar a ${statusConfig.nextLabel})`}
      className={`${
        fullWidth ? 'w-full justify-between' : 'inline-flex'
      } items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all shadow-xs cursor-pointer active:scale-95 ${
        statusConfig.classes
      }`}
    >
      <div className="flex items-center gap-1.5">
        <CurrentIcon className={`w-3.5 h-3.5 ${statusConfig.iconColor} shrink-0`} />
        {!compact && <span>{statusConfig.label}</span>}
      </div>
      <span className="text-[10px] opacity-60 font-mono tracking-tighter">⇄</span>
    </button>
  );
};
