import { Zap } from 'lucide-react';
import type { TestFormData, TestStatus } from '../../types';
import { Button } from '../ui/Button';
import { ConfigForm } from './ConfigForm';

interface TestFormProps {
  data: TestFormData;
  onChange: (data: TestFormData) => void;
  onSubmit: (data: TestFormData) => Promise<void>;
  onReset: () => void;
  status: TestStatus;
}

export function TestForm({ data, onChange, onSubmit, onReset, status }: TestFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(data);
  };

  const getStatusDisplay = () => {
    switch (status.state) {
      case 'waiting':
        return 'Waiting for response...';
      case 'receiving':
        return 'Generating...';
      case 'error':
        return 'Error occurred';
      default:
        return 'Run Speed Test';
    }
  };

  const isLoading = status.state === 'waiting' || status.state === 'receiving';

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <ConfigForm 
        data={data}
        onChange={onChange}
        onReset={onReset}
      />

      <Button
        type="submit"
        disabled={status.state !== 'idle' && status.state !== 'complete'}
        isLoading={isLoading}
        fullWidth
        icon={<Zap className="w-4 h-4" />}
      >
        {getStatusDisplay()}
      </Button>
    </form>
  );
}