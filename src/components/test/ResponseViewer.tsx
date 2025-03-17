import { clsx } from 'clsx';
import { EyeOff } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { TestStatus } from '../../types';
import { Card } from '../ui/Card';
import { IconButton } from '../ui/IconButton';

interface ResponseViewerProps {
  status: TestStatus;
  onHide?: () => void;
}

export function ResponseViewer({ status, onHide }: ResponseViewerProps) {
  const [isResponseExpanded, setIsResponseExpanded] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (responseRef.current && !isResponseExpanded) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [status.response, isResponseExpanded]);

  const getStatusMessage = () => {
    switch (status.state) {
      case 'waiting':
        return 'Waiting for the first byte...';
      case 'receiving':
        return 'Receiving response...';
      case 'complete':
        return 'Done';
      case 'error':
        return 'Error occurred';
      default:
        return '';
    }
  };

  if (status.state === 'idle') {
    return null;
  }

  return (
    <Card
      title="Response"
      description={getStatusMessage()}
      action={
        status.state === 'complete' && onHide && (
          <IconButton
            onClick={onHide}
            variant="subtle"
            size="sm"
            title="Close response"
          >
            <EyeOff className="w-5 h-5" />
          </IconButton>
        )
      }
    >
      <div className="bg-gray-50 dark:bg-zinc-900 rounded-lg p-4">
        {status.state === 'error' ? (
          <p className="text-red-500 font-mono text-sm">{status.error}</p>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="h-px flex-1 bg-gray-200 dark:bg-zinc-800" />
              <button
                type="button"
                onClick={() => setIsResponseExpanded(!isResponseExpanded)}
                className="mx-3 text-xs text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              >
                {isResponseExpanded ? 'Show less' : 'Show more'}
              </button>
              <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
            </div>
            <div
              ref={responseRef}
              className={clsx(
                "font-mono text-sm whitespace-pre-wrap text-gray-700 dark:text-gray-300",
                !isResponseExpanded && "h-24 overflow-y-auto"
              )}
            >
              {status.response || 'Waiting...'}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
