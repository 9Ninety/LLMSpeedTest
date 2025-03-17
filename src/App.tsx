import { useState } from 'react';
import { ActionSection } from './components/layout/ActionSection';
import { Header } from './components/layout/Header';
import { ResultSection } from './components/layout/ResultSection';
import { useSpeedTest } from './hooks/useSpeedTest';
import type { TestFormData } from './types';

function App() {
  const {
    config,
    setConfig,
    testResults,
    status,
    runTest,
    resetConfig,
    deleteResult
  } = useSpeedTest();
  
  // Add state to track if response is visible
  const [isResponseVisible, setIsResponseVisible] = useState(true);
  
  // Function to hide response without rerunning test
  const hideResponse = () => {
    setIsResponseVisible(false);
  };
  
  // Reset visibility when a new test is run
  // Fix: Add type annotation and return the Promise
  const handleRunTest = (config: TestFormData) => {
    setIsResponseVisible(true);
    return runTest(config);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Header />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <ActionSection 
            config={config}
            setConfig={setConfig}
            runTest={handleRunTest}
            resetConfig={resetConfig}
            status={status}
          />

          <ResultSection 
            testResults={testResults}
            deleteResult={deleteResult}
            status={status}
            isResponseVisible={isResponseVisible}
            hideResponse={hideResponse}
          />
        </div>
      </div>
    </div>
  );
}

export default App;