import type { TestFormData, TestStatus } from '../../types';
import { TestForm } from '../test/TestForm';

interface ActionSectionProps {
  config: TestFormData;
  setConfig: (data: TestFormData) => void;
  runTest: (formData: TestFormData) => Promise<void>;
  resetConfig: () => void;
  status: TestStatus;
}

export function ActionSection({ 
  config, 
  setConfig, 
  runTest, 
  resetConfig, 
  status 
}: ActionSectionProps) {
  return (
    <div className="lg:col-span-5 space-y-6">
      <TestForm
        data={config}
        onChange={setConfig}
        onSubmit={runTest}
        onReset={resetConfig}
        status={status}
      />
    </div>
  );
}