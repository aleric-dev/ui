import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Loader2, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils/cn';

export type ConfirmSheetVariant = 'amber' | 'emerald' | 'danger' | 'indigo';

export interface ConfirmSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  iconContainerClassName?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  confirmVariant?: ConfirmSheetVariant;
  isConfirming?: boolean;
  children?: React.ReactNode;
}

export type ConfirmSheetOptions = Omit<ConfirmSheetProps, 'isOpen' | 'onClose' | 'isConfirming'> & {
  onCancel?: () => void;
};

const VARIANT_BUTTON_CLASSES: Record<ConfirmSheetVariant, string> = {
  amber:
    'bg-amber-600 hover:bg-amber-700 active:bg-amber-800 text-white shadow-amber-500/20',
  emerald:
    'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-emerald-500/20',
  danger:
    'bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white shadow-rose-500/20',
  indigo:
    'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white shadow-indigo-500/20',
};

const VARIANT_ICON_CLASSES: Record<ConfirmSheetVariant, string> = {
  amber:
    'bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20 text-amber-600 dark:text-amber-400',
  emerald:
    'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  danger:
    'bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20 text-rose-600 dark:text-rose-400',
  indigo:
    'bg-indigo-50 dark:bg-indigo-500/10 border-indigo-200 dark:border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
};

/**
 * Bottom sheet de confirmación responsivo con Portal a `document.body`.
 * Evita recortes cuando existe un `transform` CSS en layouts padre.
 */
export const ConfirmSheet: React.FC<ConfirmSheetProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  icon,
  iconContainerClassName,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  confirmVariant = 'indigo',
  isConfirming = false,
  children,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && !isConfirming) {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isConfirming, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[120] flex items-end sm:items-center justify-center bg-slate-950/60 backdrop-blur-[2px] sm:p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      onClick={() => {
        if (!isConfirming) onClose();
      }}
    >
      <div
        className="w-full sm:max-w-md bg-white dark:bg-[#0D121F] rounded-t-3xl sm:rounded-3xl border-t sm:border border-slate-200 dark:border-slate-800 shadow-2xl px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:p-6 animate-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={isConfirming}
            aria-label="Cerrar confirmación"
            className="p-2 -mr-1 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors disabled:opacity-40 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col items-center text-center mt-1">
          <div
            className={cn(
              'w-14 h-14 rounded-2xl border flex items-center justify-center mb-4',
              iconContainerClassName || VARIANT_ICON_CLASSES[confirmVariant]
            )}
          >
            {icon || <AlertTriangle className="w-6 h-6" />}
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
            {title}
          </h3>

          {description && (
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-xs">
              {description}
            </p>
          )}
        </div>

        {children && <div className="mt-4">{children}</div>}

        <div className="mt-6 space-y-2.5">
          <button
            type="button"
            disabled={isConfirming}
            onClick={() => {
              void onConfirm();
            }}
            className={cn(
              'w-full py-3.5 rounded-full font-extrabold text-sm shadow-lg transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer',
              VARIANT_BUTTON_CLASSES[confirmVariant]
            )}
          >
            {isConfirming && <Loader2 className="w-4 h-4 animate-spin" />}
            {confirmLabel}
          </button>

          <button
            type="button"
            disabled={isConfirming}
            onClick={onClose}
            className="w-full py-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors disabled:opacity-40 cursor-pointer"
          >
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

// ---------------------------------------------------------------------------
// Store global para uso imperativo desde cualquier lugar: confirmSheet(...)
// ---------------------------------------------------------------------------

interface ConfirmSheetInternalState {
  isOpen: boolean;
  isConfirming: boolean;
  options: ConfirmSheetOptions | null;
}

type ConfirmSheetListener = (state: ConfirmSheetInternalState) => void;

let currentState: ConfirmSheetInternalState = {
  isOpen: false,
  isConfirming: false,
  options: null,
};

const listeners = new Set<ConfirmSheetListener>();

function emitChange() {
  for (const listener of listeners) {
    listener(currentState);
  }
}

export function closeConfirmSheet(): void {
  if (currentState.isConfirming) return;
  const onCancel = currentState.options?.onCancel;
  currentState = {
    isOpen: false,
    isConfirming: false,
    options: null,
  };
  emitChange();
  onCancel?.();
}

export function confirmSheet(options: ConfirmSheetOptions): void {
  currentState = {
    isOpen: true,
    isConfirming: false,
    options,
  };
  emitChange();
}

/**
 * Host global único que debe montarse en la raíz de la aplicación (junto a `<Toaster />`).
 * Permite invocar `confirmSheet(...)` desde cualquier vista sin estado local ni recortes CSS.
 */
export const ConfirmSheetHost: React.FC = () => {
  const [state, setState] = useState<ConfirmSheetInternalState>(currentState);

  useEffect(() => {
    const listener: ConfirmSheetListener = (nextState) => {
      setState(nextState);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  if (!state.options) return null;

  const { onConfirm, onCancel: _onCancel, ...rest } = state.options;

  const handleConfirm = async () => {
    currentState = { ...currentState, isConfirming: true };
    emitChange();
    try {
      await onConfirm();
      currentState = { isOpen: false, isConfirming: false, options: null };
      emitChange();
    } catch {
      currentState = { ...currentState, isConfirming: false };
      emitChange();
    }
  };

  return (
    <ConfirmSheet
      {...rest}
      isOpen={state.isOpen}
      isConfirming={state.isConfirming}
      onClose={closeConfirmSheet}
      onConfirm={handleConfirm}
    />
  );
};
