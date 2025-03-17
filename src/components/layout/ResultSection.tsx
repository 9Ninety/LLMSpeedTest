import type { TestRecord, TestStatus } from '../../types';
import { ResponseViewer } from '../test/ResponseViewer';
import { ResultsList } from '../test/ResultsList';
import { Card } from '../ui/Card';

interface ResultSectionProps {
  testResults: TestRecord[];
  deleteResult: (id: string) => void;
  status: TestStatus;
  isResponseVisible: boolean;
  hideResponse: () => void;
}

export function ResultSection({ testResults, deleteResult, status, isResponseVisible, hideResponse }: ResultSectionProps) {
  return (
    <div className="lg:col-span-7">
      {isResponseVisible && status.state !== 'idle' && (
        <div className="mb-6">
          <ResponseViewer 
            status={status}
            onHide={hideResponse}
          />
        </div>
      )}
      
      <Card
        title="Test Results"
        description="View and manage your LLM speed test results"
      >
        <ResultsList results={testResults} onDelete={deleteResult} />
      </Card>
    </div>
  );
}