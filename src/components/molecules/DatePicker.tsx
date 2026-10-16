import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  ChevronDown
} from 'lucide-react';

export interface DatePickerProps {
  value: string; // 'YYYY-MM-DD'
  onChange: (value: string) => void;
  placeholder?: string;
  minDate?: string; // 'YYYY-MM-DD'
  maxDate?: string; // 'YYYY-MM-DD'
  disabled?: boolean;
  className?: string;
  showShortcuts?: boolean;
  align?: 'left' | 'right';
  size?: 'sm' | 'md' | 'lg';
}

const MONTH_NAMES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const DAY_NAMES = ['LU', 'MA', 'MI', 'JU', 'VI', 'SA', 'DO'];

function parseDateString(dateStr: string): Date {
  if (!dateStr) return new Date();
  const [y, m, d] = dateStr.split('-').map(Number);
  if (!y || !m || !d) return new Date();
  return new Date(y, m - 1, d);
}

function formatDateToISO(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  minDate,
  maxDate,
  disabled = false,
  className = '',
  showShortcuts = true,
  align = 'left',
  size = 'sm',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [popoverCoords, setPopoverCoords] = useState<{ top: number; left: number; openUp: boolean }>({
    top: 0,
    left: 0,
    openUp: false,
  });

  const selectedDate = useMemo(() => (value ? parseDateString(value) : null), [value]);
  const [viewDate, setViewDate] = useState<Date>(() => selectedDate || new Date());

  useEffect(() => {
    if (value) {
      setViewDate(parseDateString(value));
    }
  }, [value]);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const popoverHeight = 360;
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < popoverHeight && rect.top > popoverHeight;

    setPopoverCoords({
      top: openUp ? rect.top - popoverHeight - 6 : rect.bottom + 6,
      left: align === 'right' ? rect.right - 280 : rect.left,
      openUp,
    });
  }, [align]);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScroll = () => updatePosition();
      const handleResize = () => updatePosition();
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
      return () => {
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        popoverRef.current &&
        !popoverRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const calendarDays = useMemo(() => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);

    let startDayOfWeek = firstDayOfMonth.getDay() - 1;
    if (startDayOfWeek === -1) startDayOfWeek = 6;

    const days: Array<{
      date: Date;
      dateStr: string;
      isCurrentMonth: boolean;
      isSelected: boolean;
      isToday: boolean;
      isDisabled: boolean;
    }> = [];

    const todayStr = formatDateToISO(new Date());

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
      const d = new Date(year, month - 1, prevMonthLastDay - i);
      const str = formatDateToISO(d);
      days.push({
        date: d,
        dateStr: str,
        isCurrentMonth: false,
        isSelected: str === value,
        isToday: str === todayStr,
        isDisabled: Boolean((minDate && str < minDate) || (maxDate && str > maxDate)),
      });
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
      const d = new Date(year, month, day);
      const str = formatDateToISO(d);
      days.push({
        date: d,
        dateStr: str,
        isCurrentMonth: true,
        isSelected: str === value,
        isToday: str === todayStr,
        isDisabled: Boolean((minDate && str < minDate) || (maxDate && str > maxDate)),
      });
    }

    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      const d = new Date(year, month + 1, i);
      const str = formatDateToISO(d);
      days.push({
        date: d,
        dateStr: str,
        isCurrentMonth: false,
        isSelected: str === value,
        isToday: str === todayStr,
        isDisabled: Boolean((minDate && str < minDate) || (maxDate && str > maxDate)),
      });
    }

    return days;
  }, [year, month, value, minDate, maxDate]);

  const handleSelect = (dateStr: string) => {
    onChange(dateStr);
    setIsOpen(false);
  };

  const handleShortcut = (daysFromToday: number) => {
    const d = new Date();
    d.setDate(d.getDate() + daysFromToday);
    const str = formatDateToISO(d);
    onChange(str);
    setViewDate(d);
    setIsOpen(false);
  };

  const sizeStyles = {
    sm: 'text-xs py-1.5 px-3 rounded-lg gap-2',
    md: 'text-xs py-2 px-3.5 rounded-xl gap-2.5',
    lg: 'text-sm py-2.5 px-4 rounded-xl gap-3',
  }[size];

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`flex items-center justify-between border transition-all duration-150 cursor-pointer select-none ${sizeStyles} ${
          disabled
            ? 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800'
            : isOpen
            ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-white dark:bg-[#0D121F] shadow-sm'
            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0D121F] hover:border-slate-300 dark:hover:border-slate-700'
        }`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <CalendarIcon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <span className={`font-mono truncate ${value ? 'text-slate-900 dark:text-white font-medium' : 'text-slate-400'}`}>
            {value || placeholder}
          </span>
        </div>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen &&
        createPortal(
          <div
            ref={popoverRef}
            style={{
              position: 'fixed',
              top: `${popoverCoords.top}px`,
              left: `${popoverCoords.left}px`,
              zIndex: 9999,
            }}
            className="w-72 bg-white dark:bg-[#0D121F] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl p-3 select-none text-slate-900 dark:text-slate-100 animate-in fade-in zoom-in-95 duration-100"
          >
            {/* Cabecera del Mes / Año */}
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-bold font-mono text-slate-800 dark:text-slate-200">
                {MONTH_NAMES[month]} {year}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={prevMonth}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={nextMonth}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1 text-center mb-1">
              {DAY_NAMES.map((d) => (
                <span key={d} className="text-[10px] font-mono text-slate-400 dark:text-slate-500 font-semibold">
                  {d}
                </span>
              ))}
            </div>

            {/* Días del mes */}
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((item, idx) => {
                const dayNum = item.date.getDate();
                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={item.isDisabled}
                    onClick={() => !item.isDisabled && handleSelect(item.dateStr)}
                    className={`h-8 w-full rounded-lg text-xs font-mono flex items-center justify-center transition-all ${
                      item.isDisabled
                        ? 'opacity-25 cursor-not-allowed'
                        : item.isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : item.isToday
                        ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold border border-indigo-200 dark:border-indigo-800/60'
                        : item.isCurrentMonth
                        ? 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                        : 'text-slate-400 dark:text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50'
                    }`}
                  >
                    {dayNum}
                  </button>
                );
              })}
            </div>

            {/* Atajos rápidos */}
            {showShortcuts && (
              <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
                <button
                  type="button"
                  onClick={() => handleShortcut(0)}
                  className="px-2 py-1 rounded text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                >
                  Hoy
                </button>
                <button
                  type="button"
                  onClick={() => handleShortcut(1)}
                  className="px-2 py-1 rounded text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                >
                  Mañana
                </button>
                <button
                  type="button"
                  onClick={() => handleShortcut(7)}
                  className="px-2 py-1 rounded text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-colors"
                >
                  +1 Sem
                </button>
              </div>
            )}
          </div>,
          document.body
        )}
    </div>
  );
};
