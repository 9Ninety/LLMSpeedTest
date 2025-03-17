import { clsx } from 'clsx';
import { format } from 'date-fns';
import { AlertCircle, Clock, Globe, Trash2 } from 'lucide-react';
import { useState } from 'react';
import type { TestRecord } from '../../types';
import { IconButton } from '../ui/IconButton';
import { MetricsDisplay } from './MetricsDisplay';

interface ResultCardProps {
  result: TestRecord;
  onDelete: (id: string) => void;
}

export function ResultCard({ result, onDelete }: ResultCardProps) {
  const [pendingDelete, setPendingDelete] = useState<boolean>(false);
  const [expandedResponse, setExpandedResponse] = useState<boolean>(false);

  const handleDelete = () => {
    if (pendingDelete) {
      onDelete(result.id);
    } else {
      setPendingDelete(true);
      setTimeout(() => setPendingDelete(false), 3000);
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-200 dark:border-zinc-800 overflow-hidden transition-all duration-200 hover:border-gray-300 dark:hover:border-zinc-700">
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium text-gray-900 dark:text-slate-200">{result.model}</h3>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{format(result.timestamp, 'PPpp')}</span>
              </div>
              <div className="hidden sm:block h-4 w-px bg-gray-200 dark:bg-slate-700" />
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                <Globe className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{new URL(result.baseUrl).hostname}</span>
              </div>
            </div>
          </div>
          <IconButton
            onClick={handleDelete}
            variant="danger"
            isActive={pendingDelete}
            title={pendingDelete ? "Confirm delete" : "Delete result"}
          >
            {pendingDelete ? (
              <AlertCircle className="w-5 h-5" />
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </IconButton>
        </div>
        <MetricsDisplay 
          tokens={result.tokens}
          tps={result.tps}
          ttfb={result.ttfb}
          totalTime={result.totalTime}
        />

        <div className="space-y-3 mt-4">
          <div className="bg-white dark:bg-zinc-800 rounded-md p-3 border border-gray-200 dark:border-zinc-800">
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">Prompt</p>
            <p className="text-sm text-gray-900 dark:text-slate-200 line-clamp-2">{result.prompt}</p>
          </div>

          <div className="bg-white dark:bg-zinc-800 rounded-md p-3 border border-gray-200 dark:border-zinc-800">
            <div className="flex items-center justify-between mb-1">
              <p className="text-xs text-gray-500 dark:text-slate-400">Response</p>
              <button
                onClick={() => setExpandedResponse(!expandedResponse)}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300"
              >
                {expandedResponse ? 'Show less' : 'Show more'}
              </button>
            </div>
            <p className={clsx(
              "text-sm text-gray-900 dark:text-slate-200",
              expandedResponse ? '' : 'line-clamp-2'
            )}>
              {result.response}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
