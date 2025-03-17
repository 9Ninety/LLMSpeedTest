import { clsx } from 'clsx';
import React from 'react';

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function TextArea({ 
  label, 
  error, 
  className = '', 
  rows = 4,
  ...props 
}: TextAreaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
          {label}
        </label>
      )}
      <textarea
        rows={rows}
        className={clsx(
          "w-full px-4 py-2.5",
          "bg-gray-50 dark:bg-zinc-900",
          "border border-gray-200 dark:border-zinc-800 rounded-lg",
          "focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-opacity-20 outline-none",          "transition-shadow duration-200 text-sm",
          "text-gray-900 dark:text-slate-200",
          "placeholder:text-gray-500 dark:placeholder:text-slate-400",
          error && "border-red-500 dark:border-red-500",
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{error}</p>}
    </div>
  );
}