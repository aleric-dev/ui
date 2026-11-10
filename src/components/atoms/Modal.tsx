import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';

interface ModalGuardContextValue {
  isDirty: boolean;
  attemptClose: () => void;
}

const ModalGuardContext = createContext<ModalGuardContextValue | null>(null);

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: ModalSize;
  className?: string;
  closeOnBackdropClick?: boolean;
  asForm?: boolean;
  onSubmit?: (e: React.FormEvent) => void;
  /**
   * Protección de cambios sin guardar (Regla Aleric Dev):
   * Si es `true`, bloquea el cierre accidental por Esc, clic en el fondo o botón X,
   * mostrando un aviso de cambios pendientes.
   */
  isDirty?: boolean;
  unsavedMessage?: string;
  /**
   * Props opcionales de cabecera rápida (alternativa a componer <ModalHeader /> manualmente)
   */
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
}

const SIZE_CLASSES: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  '5xl': 'max-w-5xl',
  '6xl': 'max-w-6xl',
  '7xl': 'max-w-7xl',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  size = '2xl',
  className = '',
  closeOnBackdropClick = true,
  asForm = false,
  onSubmit,
  isDirty = false,
  unsavedMessage = 'Tienes cambios sin guardar en este formulario. Guarda los cambios antes de salir.',
  title,
  subtitle,
  icon,
}) => {
  const [showUnsavedWarning, setShowUnsavedWarning] = useState(false);

  useEffect(() => {
    if (!isDirty || !isOpen) {
      setShowUnsavedWarning(false);
    }
  }, [isDirty, isOpen]);

  const attemptClose = useCallback(() => {
    if (isDirty) {
      setShowUnsavedWarning(true);
      return;
    }
    setShowUnsavedWarning(false);
    onClose();
  }, [isDirty, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        attemptClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, attemptClose]);

  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const containerClasses = cn(
    'bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-h-[90vh] md:max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 font-sans',
    SIZE_CLASSES[size],
    className
  );

  const isForm = asForm || Boolean(onSubmit);

  const warningBanner = showUnsavedWarning && isDirty ? (
    <div className="px-6 py-3 bg-amber-500/10 border-b border-amber-500/30 flex items-center justify-between gap-3 shrink-0 animate-in fade-in duration-150">
      <div className="flex items-center gap-2.5 text-xs text-amber-700 dark:text-amber-300 font-medium font-sans">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>{unsavedMessage}</span>
      </div>
    </div>
  ) : null;

  const innerContent = (
    <ModalGuardContext.Provider value={{ isDirty, attemptClose }}>
      {title ? (
        <ModalHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          onClose={attemptClose}
        />
      ) : null}
      {warningBanner}
      {title ? <ModalBody>{children}</ModalBody> : children}
    </ModalGuardContext.Provider>
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black/75 dark:bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 select-none animate-in fade-in duration-200"
      onClick={(e) => {
        if (closeOnBackdropClick && e.target === e.currentTarget) {
          attemptClose();
        }
      }}
    >
      {isForm ? (
        <form onSubmit={onSubmit} className={containerClasses}>
          {innerContent}
        </form>
      ) : (
        <div className={containerClasses}>
          {innerContent}
        </div>
      )}
    </div>,
    document.body
  );
};

export interface ModalHeaderProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  onClose?: () => void;
  action?: React.ReactNode;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  title,
  subtitle,
  icon,
  onClose,
  action,
  className = '',
}) => {
  const guard = useContext(ModalGuardContext);

  const handleCloseClick = () => {
    if (guard && guard.isDirty) {
      guard.attemptClose();
      return;
    }
    onClose?.();
  };

  return (
    <div
      className={cn(
        'px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/90 dark:bg-slate-900/60 shrink-0 select-none font-sans',
        className
      )}
    >
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 shrink-0">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight truncate font-sans">
            {title}
          </h3>
          {subtitle && (
            <div className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 truncate font-medium font-sans">
              {subtitle}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {action}
        {onClose && (
          <button
            type="button"
            onClick={handleCloseClick}
            className="p-1.5 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title={guard?.isDirty ? 'Guarda los cambios antes de cerrar' : 'Cerrar (Esc)'}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};

export interface ModalBodyProps {
  children: React.ReactNode;
  className?: string;
  noPadding?: boolean;
}

export const ModalBody: React.FC<ModalBodyProps> = ({
  children,
  className = '',
  noPadding = false,
}) => {
  return (
    <div
      className={cn(
        'flex-1 min-h-0 overflow-y-auto overscroll-contain modal-scrollbar font-sans',
        noPadding ? '' : 'p-6',
        className
      )}
    >
      {children}
    </div>
  );
};

export const ModalContent = ModalBody;

export interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
}) => {
  return (
    <div
      className={cn(
        'px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/90 dark:bg-slate-900/60 flex items-center justify-end gap-3 shrink-0 select-none font-sans',
        className
      )}
    >
      {children}
    </div>
  );
};
