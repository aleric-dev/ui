import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../atoms/Modal';
import { Button } from '../atoms/Button';
import { AlertTriangle } from 'lucide-react';

export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'primary' | 'warning';
  loading?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'danger',
  loading = false,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <ModalHeader
        title={title}
        icon={
          <AlertTriangle
            className={`w-5 h-5 ${
              variant === 'danger'
                ? 'text-rose-500'
                : variant === 'warning'
                ? 'text-amber-500'
                : 'text-indigo-500'
            }`}
          />
        }
        onClose={onClose}
      />
      <ModalBody>
        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">{message}</p>
      </ModalBody>
      <ModalFooter>
        <Button variant="ghost" size="sm" onClick={onClose} disabled={loading}>
          {cancelText}
        </Button>
        <Button
          variant={variant === 'danger' ? 'danger' : 'primary'}
          size="sm"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};
