import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface SelectOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export type SelectChangeEvent = {
  target: {
    value: string;
    name?: string;
  };
};

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (e: SelectChangeEvent) => void;
  onValueChange?: (value: string) => void;
  options?: SelectOption[];
  children?: React.ReactNode;
  placeholder?: string;
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  className?: string;
  buttonClassName?: string;
  dropdownClassName?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  size?: 'sm' | 'md';
}

export const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  onChange,
  onValueChange,
  options,
  children,
  placeholder = 'Seleccionar...',
  label,
  error,
  helperText,
  icon,
  className = '',
  buttonClassName = '',
  dropdownClassName = '',
  disabled = false,
  name,
  id,
  size = 'md',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<{
    top?: number;
    bottom?: number;
    left: number;
    width: number;
    openUpwards: boolean;
  } | null>(null);

  const parsedOptions: SelectOption[] = useMemo(() => {
    if (options && options.length > 0) {
      return options;
    }
    const list: SelectOption[] = [];
    React.Children.forEach(children, (child) => {
      if (React.isValidElement<{ value?: string | number; children?: React.ReactNode; disabled?: boolean }>(child)) {
        list.push({
          value: String(child.props.value ?? ''),
          label: child.props.children || child.props.value || '',
          disabled: Boolean(child.props.disabled),
        });
      }
    });
    return list;
  }, [options, children]);

  const [internalValue, setInternalValue] = useState<string>(
    value !== undefined ? value : defaultValue !== undefined ? defaultValue : (parsedOptions[0]?.value || '')
  );

  const currentValue = value !== undefined ? value : internalValue;
  const selectedOption = parsedOptions.find((opt) => String(opt.value) === String(currentValue));

  const calculateCoords = useCallback(() => {
    if (!buttonRef.current) return null;
    const rect = buttonRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const spaceAbove = rect.top;
    const estimatedHeight = 240;

    const openUp = spaceBelow < estimatedHeight && spaceAbove > spaceBelow;
    const width = Math.max(rect.width, 180);
    let left = rect.left;
    if (left + width > window.innerWidth - 8) {
      left = Math.max(8, window.innerWidth - width - 8);
    }

    return {
      top: openUp ? undefined : Math.round(rect.bottom + 4),
      bottom: openUp ? Math.round(window.innerHeight - rect.top + 4) : undefined,
      left: Math.round(left),
      width: Math.round(width),
      openUpwards: openUp,
    };
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      const nextCoords = calculateCoords();
      if (nextCoords) {
        setCoords(nextCoords);
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
      setCoords(null);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleScrollOrResize = () => {
      const nextCoords = calculateCoords();
      if (nextCoords) setCoords(nextCoords);
    };

    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const target = event.target as Node;
      if (
        containerRef.current && !containerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setIsOpen(false);
        setCoords(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setCoords(null);
      }
    };

    window.addEventListener('resize', handleScrollOrResize);
    window.addEventListener('scroll', handleScrollOrResize, true);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('resize', handleScrollOrResize);
      window.removeEventListener('scroll', handleScrollOrResize, true);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, calculateCoords]);

  const handleSelect = (option: SelectOption) => {
    if (option.disabled || disabled) return;

    setInternalValue(option.value);
    setIsOpen(false);
    setCoords(null);

    if (onChange) {
      onChange({
        target: {
          value: option.value,
          name,
        },
      });
    }

    if (onValueChange) {
      onValueChange(option.value);
    }
  };

  const isSmall = size === 'sm';

  return (
    <div ref={containerRef} className={cn('relative text-left', className)} id={id}>
      {label && (
        <label className="block text-xs font-mono font-medium text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}

      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'w-full flex items-center justify-between gap-2 transition-all cursor-pointer font-mono',
          isSmall ? 'px-2.5 py-1.5 text-xs rounded-lg' : 'px-3 py-2 text-xs rounded-xl',
          'bg-slate-100 dark:bg-slate-900 border',
          error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
            : isOpen
            ? 'border-indigo-500 ring-2 ring-indigo-500/20 dark:border-indigo-500'
            : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700',
          disabled && 'opacity-50 cursor-not-allowed',
          'text-slate-800 dark:text-slate-200 focus:outline-none',
          buttonClassName
        )}
      >
        <div className="flex items-center gap-2 min-w-0 truncate">
          {icon && <span className="text-slate-400 shrink-0">{icon}</span>}
          {selectedOption?.icon && <span className="shrink-0">{selectedOption.icon}</span>}
          <span className="truncate">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <ChevronDown
          className={cn(
            'w-3.5 h-3.5 text-slate-400 transition-transform duration-200 shrink-0',
            isOpen && 'rotate-180 text-indigo-500'
          )}
        />
      </button>

      {isOpen &&
        coords &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: 'fixed',
              top: coords.top !== undefined ? `${coords.top}px` : undefined,
              bottom: coords.bottom !== undefined ? `${coords.bottom}px` : undefined,
              left: `${coords.left}px`,
              width: `${coords.width}px`,
              zIndex: 10005,
            }}
            className={cn(
              'max-h-64 overflow-y-auto rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-black/30 dark:shadow-black/70 p-1 font-mono text-xs animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md',
              dropdownClassName
            )}
          >
            {parsedOptions.length === 0 ? (
              <div className="px-3 py-2 text-slate-400 text-center text-[11px]">
                No hay opciones
              </div>
            ) : (
              parsedOptions.map((opt) => {
                const isSelected = String(opt.value) === String(currentValue);

                return (
                  <button
                    key={opt.value}
                    type="button"
                    disabled={opt.disabled}
                    onClick={() => handleSelect(opt)}
                    className={cn(
                      'w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left transition-colors cursor-pointer',
                      opt.disabled
                        ? 'opacity-40 cursor-not-allowed'
                        : isSelected
                        ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-bold'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-white'
                    )}
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      {opt.icon && <span className="shrink-0">{opt.icon}</span>}
                      <span className="truncate">{opt.label}</span>
                    </div>

                    {isSelected && (
                      <Check className="w-3.5 h-3.5 text-indigo-500 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })
            )}
          </div>,
          document.body
        )}

      {error ? (
        <p className="text-[11px] font-mono text-rose-500 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] font-mono text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
