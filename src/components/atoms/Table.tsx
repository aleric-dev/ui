import React from 'react';
import { cn } from '../../utils/cn';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  containerClassName?: string;
  wrapper?: boolean;
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className = '', containerClassName = '', wrapper = true, children, ...props }, ref) => {
    const tableElement = (
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-xs text-left border-collapse', className)}
        {...props}
      >
        {children}
      </table>
    );

    if (!wrapper) {
      return tableElement;
    }

    return (
      <div
        className={cn(
          'relative w-full overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs',
          containerClassName
        )}
      >
        {tableElement}
      </div>
    );
  }
);
Table.displayName = 'Table';

export const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      'bg-slate-50/80 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-800',
      className
    )}
    {...props}
  />
));
TableHeader.displayName = 'TableHeader';

export const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      'divide-y divide-slate-100 dark:divide-slate-800/60 [&_tr:last-child]:border-0',
      className
    )}
    {...props}
  />
));
TableBody.displayName = 'TableBody';

export const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className = '', ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      'bg-slate-50/50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800 font-medium',
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

export const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className = '', ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      'border-b border-slate-100 dark:border-slate-800/60 transition-colors hover:bg-slate-50/60 dark:hover:bg-slate-800/40 data-[state=selected]:bg-slate-100 dark:data-[state=selected]:bg-slate-800',
      className
    )}
    {...props}
  />
));
TableRow.displayName = 'TableRow';

export const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className = '', ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      'h-10 px-4 text-left align-middle font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

export const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className = '', ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      'p-3.5 sm:p-4 align-middle text-xs font-mono text-slate-800 dark:text-slate-200 [&:has([role=checkbox])]:pr-0',
      className
    )}
    {...props}
  />
));
TableCell.displayName = 'TableCell';

export const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className = '', ...props }, ref) => (
  <caption
    ref={ref}
    className={cn('mt-4 text-xs font-sans text-slate-500 dark:text-slate-400', className)}
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';
