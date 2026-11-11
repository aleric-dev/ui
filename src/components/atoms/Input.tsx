import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  mono?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  rightElement?: React.ReactNode;
  showPasswordToggle?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      error = false,
      mono = false,
      leftIcon,
      rightIcon,
      rightElement,
      showPasswordToggle = false,
      type = 'text',
      className = '',
      disabled,
      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const hasPasswordToggle = isPassword && showPasswordToggle;
    const resolvedType = hasPasswordToggle ? (showPassword ? 'text' : 'password') : type;
    const hasRightSlot = Boolean(rightIcon || rightElement || hasPasswordToggle);

    return (
      <div className="relative flex items-center w-full">
        {leftIcon && (
          <span className="absolute left-3 z-10 text-slate-500 dark:text-slate-400 pointer-events-none shrink-0 flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          ref={ref}
          type={resolvedType}
          disabled={disabled}
          className={cn(
            'w-full px-3.5 py-2.5 text-sm rounded-xl border transition-all duration-150 outline-none',
            'bg-slate-50/70 dark:bg-slate-900 focus:bg-white dark:focus:bg-slate-950 text-slate-900 dark:text-white',
            'placeholder:text-slate-400 dark:placeholder:text-slate-500',
            mono ? 'font-mono tracking-tight text-xs' : 'font-sans',
            leftIcon && 'pl-9',
            hasRightSlot && 'pr-10',
            error
              ? 'border-rose-500 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30'
              : 'border-slate-300 dark:border-slate-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20',
            disabled && 'opacity-50 cursor-not-allowed bg-slate-100 dark:bg-slate-900/50',
            className
          )}
          {...props}
        />
        {hasPasswordToggle ? (
          <button
            type="button"
            tabIndex={-1}
            disabled={disabled}
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 text-slate-400 hover:text-slate-700 dark:hover:text-white transition-colors shrink-0 flex items-center cursor-pointer"
            title={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        ) : rightElement ? (
          <div className="absolute right-2.5 flex items-center shrink-0">{rightElement}</div>
        ) : rightIcon ? (
          <span className="absolute right-3 text-slate-500 dark:text-slate-400 pointer-events-none shrink-0 flex items-center">
            {rightIcon}
          </span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';

export type PasswordInputProps = Omit<InputProps, 'type'>;

export const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ showPasswordToggle = true, ...props }, ref) => (
    <Input ref={ref} type="password" showPasswordToggle={showPasswordToggle} {...props} />
  )
);

PasswordInput.displayName = 'PasswordInput';
