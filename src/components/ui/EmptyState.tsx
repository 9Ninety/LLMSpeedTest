import { ListStart } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

export function EmptyState({ description, icon }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="flex justify-center mb-4">
        {icon || <ListStart className="w-12 h-12 text-gray-300 dark:text-gray-700" />}
      </div>
      {description && (
        <p className="text-gray-500 dark:text-gray-400">
          {description}
        </p>
      )}
    </div>
  );
}
