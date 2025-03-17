import { Timer } from 'lucide-react';
import type { TestRecord } from '../../types';
import { EmptyState } from '../ui/EmptyState';
import { ResultCard } from './ResultCard';

interface ResultsListProps {
  results: TestRecord[];
  onDelete: (id: string) => void;
}

export function ResultsList({ results, onDelete }: ResultsListProps) {
  if (results.length === 0) {
    return (
      <EmptyState 
        icon={<Timer className="w-12 h-12 text-gray-300 dark:text-gray-700" />} 
        description="No test results yet. Run a speed test to see the results here." 
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {results.map((result) => (
        <ResultCard 
          key={result.id} 
          result={result} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}
