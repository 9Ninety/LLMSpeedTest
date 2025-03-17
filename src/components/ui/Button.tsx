import { clsx } from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

export function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  className = '',
  isLoading = false,
  icon,
  iconPosition = 'left',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={clsx(
        'flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200',
        
        // Size variants
        size === 'sm' && 'px-4 py-2 text-xs',
        size === 'md' && 'px-6 py-3 text-sm',
        size === 'lg' && 'px-8 py-4 text-base',
        
        // Color variants
        variant === 'primary' && [
          'bg-black text-white hover:bg-gray-900',
          'dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700',
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed hover:bg-black dark:hover:bg-zinc-800'
        ],
        variant === 'secondary' && [
          'bg-gray-100 text-gray-900 hover:bg-gray-200',
          'dark:bg-zinc-900 dark:text-gray-100 dark:hover:bg-zinc-800',          (disabled || isLoading) && 'opacity-50 cursor-not-allowed'
        ],
        variant === 'danger' && [
          'bg-red-50 text-red-600 hover:bg-red-100',
          'dark:bg-red-900/50 dark:text-red-400 dark:hover:bg-red-900/70',
          (disabled || isLoading) && 'opacity-50 cursor-not-allowed'
        ],
        
        // Width
        fullWidth && 'w-full',
        
        // Custom classes
        className
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span>Loading...</span>
        </>
      ) : (
        <>
          {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
          {children}
          {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}