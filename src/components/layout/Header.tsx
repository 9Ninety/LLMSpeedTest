import { Activity } from 'lucide-react';

export function Header() {
  return (
    <div className="flex items-center gap-3 mb-12">
      <Activity className="w-10 h-10 text-black dark:text-white" />
      <div>
        <h1 className="text-4xl font-bold text-black dark:text-white tracking-tight">
          LLM Speed Test
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Measure and analyze LLM performance metrics
        </p>
      </div>
    </div>
  );
}