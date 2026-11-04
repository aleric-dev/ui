import React, { useEffect, useImperativeHandle, useRef } from 'react';
import { cn } from '../../utils/cn';

export type OtpInputVariant = 'indigo' | 'amber' | 'emerald';
export type OtpInputSize = 'sm' | 'md' | 'lg';

export interface OtpInputRef {
  focus: (index?: number) => void;
  clear: () => void;
}

export interface OtpInputProps {
  /** Cantidad de casillas OTP (por defecto 4) */
  length?: number;
  /** Valor controlado actual (ej: "12" o "1234") */
  value?: string;
  /** Callback en cada cambio del valor */
  onChange?: (value: string) => void;
  /** Callback automático cuando se completan todos los dígitos (estilo Ant Design Input.OTP) */
  onComplete?: (value: string) => void;
  /** Ocupa el 100% del ancho disponible distribuyendo las casillas en partes iguales */
  fullWidth?: boolean;
  /** Solo permitir números (0-9) */
  numericOnly?: boolean;
  /** Ocultar dígitos como contraseña */
  mask?: boolean;
  /** Variante de color activo */
  variant?: OtpInputVariant;
  /** Tamaño de altura de las casillas */
  size?: OtpInputSize;
  /** Estado de error */
  error?: boolean;
  /** Deshabilitar todos los inputs */
  disabled?: boolean;
  /** Enfocar automáticamente la primera casilla al montar */
  autoFocus?: boolean;
  /** Clase adicional del contenedor */
  className?: string;
  /** Clase adicional de cada input */
  inputClassName?: string;
}

const SIZE_STYLES: Record<OtpInputSize, string> = {
  sm: 'h-10 text-sm rounded-xl',
  md: 'h-12 text-base rounded-xl',
  lg: 'h-14 text-lg rounded-2xl',
};

const VARIANT_ACTIVE_STYLES: Record<OtpInputVariant, string> = {
  indigo:
    'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 data-[filled=true]:border-indigo-500/70 data-[filled=true]:bg-indigo-500/10',
  amber:
    'focus:border-amber-500 focus:ring-2 focus:ring-amber-500/25 data-[filled=true]:border-amber-500 data-[filled=true]:bg-amber-500/15',
  emerald:
    'focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 data-[filled=true]:border-emerald-500/70 data-[filled=true]:bg-emerald-500/10',
};

export const OtpInput = React.forwardRef<OtpInputRef, OtpInputProps>(
  (
    {
      length = 4,
      value = '',
      onChange,
      onComplete,
      fullWidth = true,
      numericOnly = true,
      mask = false,
      variant = 'indigo',
      size = 'lg',
      error = false,
      disabled = false,
      autoFocus = false,
      className = '',
      inputClassName = '',
    },
    ref
  ) => {
    const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

    const chars = Array.from({ length }, (_, idx) => value[idx] ?? '');

    useImperativeHandle(ref, () => ({
      focus: (index = 0) => {
        const target = inputsRef.current[Math.min(Math.max(0, index), length - 1)];
        target?.focus();
        target?.select();
      },
      clear: () => {
        onChange?.('');
        inputsRef.current[0]?.focus();
      },
    }));

    useEffect(() => {
      if (autoFocus && !disabled) {
        inputsRef.current[0]?.focus();
      }
    }, [autoFocus, disabled]);

    const emitChange = (nextChars: string[]) => {
      const joined = nextChars.join('');
      onChange?.(joined);
      if (
        nextChars.every((c) => c.length === 1) &&
        joined.length === length
      ) {
        onComplete?.(joined);
      }
    };

    const handleInputChange = (
      index: number,
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      if (disabled) return;
      const rawVal = e.target.value;
      const lastChar = rawVal.slice(-1);

      if (!lastChar) {
        const nextChars = [...chars];
        nextChars[index] = '';
        onChange?.(nextChars.join(''));
        return;
      }

      if (numericOnly && !/^\d$/.test(lastChar)) {
        return;
      }

      const nextChars = [...chars];
      nextChars[index] = lastChar;

      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
        inputsRef.current[index + 1]?.select();
      }

      emitChange(nextChars);
    };

    const handleKeyDown = (
      index: number,
      e: React.KeyboardEvent<HTMLInputElement>
    ) => {
      if (disabled) return;

      if (e.key === 'Backspace') {
        e.preventDefault();
        const nextChars = [...chars];
        if (nextChars[index]) {
          nextChars[index] = '';
          onChange?.(nextChars.join(''));
        } else if (index > 0) {
          nextChars[index - 1] = '';
          onChange?.(nextChars.join(''));
          inputsRef.current[index - 1]?.focus();
        }
        return;
      }

      if (e.key === 'ArrowLeft' && index > 0) {
        e.preventDefault();
        inputsRef.current[index - 1]?.focus();
        inputsRef.current[index - 1]?.select();
        return;
      }

      if (e.key === 'ArrowRight' && index < length - 1) {
        e.preventDefault();
        inputsRef.current[index + 1]?.focus();
        inputsRef.current[index + 1]?.select();
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (disabled) return;
      e.preventDefault();
      const rawPaste = e.clipboardData.getData('text') ?? '';
      const sanitized = numericOnly
        ? rawPaste.replace(/\D/g, '')
        : rawPaste.trim();

      if (!sanitized) return;

      const nextChars = [...chars];
      const slice = sanitized.slice(0, length).split('');
      slice.forEach((ch, idx) => {
        nextChars[idx] = ch;
      });

      const focusIdx = Math.min(slice.length, length - 1);
      inputsRef.current[focusIdx]?.focus();
      emitChange(nextChars);
    };

    return (
      <div
        className={cn(
          fullWidth
            ? 'grid w-full gap-2.5 sm:gap-3'
            : 'inline-flex items-center gap-2.5',
          className
        )}
        style={
          fullWidth
            ? { gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))` }
            : undefined
        }
      >
        {chars.map((char, idx) => {
          const isFilled = Boolean(char);
          return (
            <input
              key={idx}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              type={mask ? 'password' : 'text'}
              inputMode={numericOnly ? 'numeric' : 'text'}
              pattern={numericOnly ? '[0-9]*' : undefined}
              autoComplete={idx === 0 ? 'one-time-code' : 'off'}
              maxLength={1}
              value={char}
              disabled={disabled}
              data-filled={isFilled}
              aria-label={`Dígito ${idx + 1} de ${length}`}
              onFocus={(e) => e.currentTarget.select()}
              onChange={(e) => handleInputChange(idx, e)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              className={cn(
                'w-full min-w-0 font-sans font-extrabold text-center border outline-none transition-all duration-150 select-all',
                'bg-slate-50/80 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 text-slate-900 dark:text-white',
                SIZE_STYLES[size],
                error
                  ? 'border-rose-500 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/25'
                  : cn(
                      'border-slate-300 dark:border-slate-800',
                      VARIANT_ACTIVE_STYLES[variant]
                    ),
                disabled &&
                  'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900/50',
                inputClassName
              )}
            />
          );
        })}
      </div>
    );
  }
);

OtpInput.displayName = 'OtpInput';

