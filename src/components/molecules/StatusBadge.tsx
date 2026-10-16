import React from 'react';
import { Badge, BadgeVariant } from '../atoms/Badge';

export type GeneralStatus =
  | 'pending'
  | 'ready'
  | 'published'
  | 'active'
  | 'inactive'
  | 'approved'
  | 'rejected'
  | 'open'
  | 'in_progress'
  | 'resolved'
  | 'closed';

export interface StatusBadgeProps {
  status: GeneralStatus | string;
  size?: 'xs' | 'sm' | 'md';
  customConfig?: Record<string, { label: string; variant: BadgeVariant }>;
  className?: string;
}

const DEFAULT_STATUS_CONFIG: Record<string, { label: string; variant: BadgeVariant }> = {
  // General
  pending: { label: 'Pendiente', variant: 'slate' },
  ready: { label: 'Listo', variant: 'amber' },
  published: { label: 'Publicado', variant: 'emerald' },
  active: { label: 'Activo', variant: 'emerald' },
  approved: { label: 'Aprobado', variant: 'emerald' },
  inactive: { label: 'Inactivo', variant: 'slate' },
  rejected: { label: 'Rechazado', variant: 'rose' },
  open: { label: 'Abierto', variant: 'amber' },
  in_progress: { label: 'En Progreso', variant: 'indigo' },
  resolved: { label: 'Resuelto', variant: 'emerald' },
  closed: { label: 'Cerrado', variant: 'slate' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  size = 'sm',
  customConfig,
  className = '',
}) => {
  const mergedConfig = { ...DEFAULT_STATUS_CONFIG, ...customConfig };
  const config = mergedConfig[status] || { label: status, variant: 'slate' };

  return (
    <Badge variant={config.variant} size={size} dot className={className}>
      {config.label}
    </Badge>
  );
};
