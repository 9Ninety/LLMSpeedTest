import { clsx } from 'clsx';
import React, { ReactNode } from 'react';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  title?: ReactNode;
  description?: string;
  action?: React.ReactNode;
};

export function Card({ children, className = '', title, description, action }: CardProps) {
  return (
    <div className={clsx(
      'bg-white dark:bg-zinc-900 rounded-xl',
      'border border-gray-200 dark:border-zinc-800',
      'overflow-hidden',
      className
    )}>
      {(title || description || action) && (
        <div className="px-6 py-5 border-b border-gray-100 dark:border-zinc-800 flex items-center justify-between">
          <div>
            {title && <h2 className="text-xl font-semibold text-gray-900 dark:text-slate-200">{title}</h2>}
            {description && <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">{description}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}

export function CardContent({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={clsx('', className)}>{children}</div>;
}