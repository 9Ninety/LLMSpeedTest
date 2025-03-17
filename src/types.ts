export interface TestRecord {
    id: string;
    timestamp: number;
    baseUrl: string;
    model: string;
    prompt: string;
    tokens: number;
    tps: number;
    ttfb: number;
    totalTime: number;
    response: string;
  }
  
  export interface TestFormData {
    baseUrl: string;
    apiKey: string;
    model: string;
    prompt: string;
  }
  
  export interface TestStatus {
    state: 'idle' | 'waiting' | 'receiving' | 'complete' | 'error';
    response: string;
    error?: string;
  }