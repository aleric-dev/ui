import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, Check, Search, X } from 'lucide-react';
import { cn } from '../../utils/cn';

function extractNodeText(node: React.ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractNodeText).join('');
  if (React.isValidElement<{ children?: React.ReactNode }>(node)) {
    return extractNodeText(node.props.children);
  }
  return '';
}

function normalizeSearchText(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();
}

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
  searchable?: boolean;
  searchPlaceholder?: string;
  emptySearchText?: string;
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
  searchable = false,
  searchPlaceholder = 'Escribir para filtrar...',
  emptySearchText = 'Sin coincidencias',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
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

  const filteredOptions = useMemo(() => {
    if (!searchable) return parsedOptions;
    const q = normalizeSearchText(searchQuery);
    if (!q) return parsedOptions;
    return parsedOptions.filter((opt) => {
      const labelText = normalizeSearchText(extractNodeText(opt.label));
      const valText = normalizeSearchText(String(opt.value));
      return labelText.includes(q) || valText.includes(q);
    });
  }, [parsedOptions, searchable, searchQuery]);

  const handleToggle = () => {
    if (disabled) return;
    if (!isOpen) {
      const nextCoords = calculateCoords();
      if (nextCoords) {
        setSearchQuery('');
        setCoords(nextCoords);
        setIsOpen(true);
      }
    } else {
      setIsOpen(false);
      setCoords(null);
      setSearchQuery('');
    }
  };

  useEffect(() => {
    if (!isOpen || !searchable) return;
    const raf = window.requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
    return () => window.cancelAnimationFrame(raf);
  }, [isOpen, searchable]);

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
        setSearchQuery('');
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setCoords(null);
        setSearchQuery('');
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
    setSearchQuery('');

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
    <div ref={containerRef} className={cn('relative text-left font-sans', className)} id={id}>
      {label && (
        <label className="block text-xs font-sans font-semibold text-slate-700 dark:text-slate-300 mb-1">
          {label}
        </label>
      )}

      <button
        ref={buttonRef}
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={cn(
          'w-full flex items-center justify-between gap-2 transition-all cursor-pointer font-sans',
          isSmall ? 'px-2.5 py-1.5 text-xs rounded-lg' : 'px-3.5 py-2.5 text-sm rounded-xl',
          'bg-slate-50/70 dark:bg-slate-900 border',
          error
            ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/20'
            : isOpen
            ? 'border-indigo-500 ring-2 ring-indigo-500/20 dark:border-indigo-500'
            : 'border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700',
          disabled && 'opacity-50 cursor-not-allowed',
          'text-slate-900 dark:text-white focus:outline-none',
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
              'max-h-72 flex flex-col overflow-hidden rounded-xl bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 shadow-2xl shadow-black/30 dark:shadow-black/70 font-sans text-xs animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md',
              dropdownClassName
            )}
          >
            {searchable && (
              <div className="p-1.5 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-[#0D121F] shrink-0">
                <div className="relative flex items-center">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 pointer-events-none" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const firstMatch = filteredOptions.find(
                          (o) => !o.disabled && String(o.value) !== ''
                        ) ?? filteredOptions.find((o) => !o.disabled);
                        if (firstMatch) {
                          handleSelect(firstMatch);
                        }
                      }
                    }}
                    placeholder={searchPlaceholder}
                    className="w-full pl-8 pr-7 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-sans text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      }}
                      className="absolute right-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="overflow-y-auto p-1 flex-1">
              {filteredOptions.length === 0 ? (
                <div className="px-3 py-2.5 text-slate-400 text-center text-[11px]">
                  {parsedOptions.length === 0 ? 'No hay opciones' : emptySearchText}
                </div>
              ) : (
                filteredOptions.map((opt) => {
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
            </div>
          </div>,
          document.body
        )}

      {error ? (
        <p className="text-[11px] font-sans text-rose-500 mt-1">{error}</p>
      ) : helperText ? (
        <p className="text-[11px] font-sans text-slate-500 mt-1">{helperText}</p>
      ) : null}
    </div>
  );
};
