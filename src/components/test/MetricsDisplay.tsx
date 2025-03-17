import { Zap } from 'lucide-react';
import { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  value: string | ReactNode;
}

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-800 rounded-md p-3 border border-gray-200 dark:border-zinc-800">
      <p className="text-xs text-gray-500 dark:text-slate-400 mb-1">{label}</p>
      {typeof value === 'string' ? (
        <p className="font-medium text-gray-900 dark:text-slate-200">{value}</p>
      ) : (
        value
      )}
    </div>
  );
}

interface MetricsDisplayProps {
  tokens: number;
  tps: number;
  ttfb: number; 
  totalTime: number;
}

export function MetricsDisplay({ tokens, tps, ttfb, totalTime }: MetricsDisplayProps) {
  const formatTime = (ms: number): string => {
    if (ms >= 1000) {
      return `${(ms / 1000).toFixed(2)}s`;
    }
    return `${ms}ms`;
  };

  const tpsDisplay = (
    <div className="flex items-center gap-1">
      <Zap className="w-3.5 h-3.5 text-yellow-500" />
      <p className="font-medium text-gray-900 dark:text-slate-200">{tps.toFixed(1)}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      <MetricCard 
        label="Tokens" 
        value={tokens.toLocaleString()} 
      />
      <MetricCard 
        label="TPS" 
        value={tpsDisplay} 
      />
      <MetricCard 
        label="TTFC" 
        value={formatTime(ttfb)} 
      />
      <MetricCard 
        label="Total Time" 
        value={formatTime(totalTime)} 
      />
    </div>
  );
}
