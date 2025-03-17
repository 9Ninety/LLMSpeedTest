import { clsx } from 'clsx';
import React from 'react';

type IconButtonVariant = 'default' | 'danger' | 'subtle';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  title?: string;
  isActive?: boolean;
}

export function IconButton({
  variant = 'default',
  size = 'md',
  className = '',
  title,
  isActive = false,
  children,
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      title={title}
      className={clsx(
        // Base styles
        "rounded-md transition-all duration-200",
        
        // Size variants
        size === 'sm' && "p-1.5",
        size === 'md' && "p-2",
        size === 'lg' && "p-2.5",
        
        // Color variants
        variant === 'default' && [
          "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300",
          "hover:bg-gray-100 dark:hover:bg-zinc-900"
        ],
        variant === 'subtle' && [
          "text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300",
          "hover:bg-gray-50 dark:hover:bg-zinc-900/50"
        ],        variant === 'danger' && [
          isActive 
            ? "bg-red-50 dark:bg-red-900/50 text-red-600 dark:text-red-400"
            : "text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30"
        ],
        
        // Custom classes
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
