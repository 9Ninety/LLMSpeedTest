import { HumanMessage } from '@langchain/core/messages';
import { ChatOpenAI } from '@langchain/openai';
import { useState } from 'react';
import type { TestFormData, TestRecord, TestStatus } from '../types';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_CONFIG: TestFormData = {
  baseUrl: 'https://api.openai.com/v1',
  apiKey: '',
  model: 'gpt-4o',
  prompt: 'Tell me a short story about a robot learning to paint.',
};

export function useSpeedTest() {
  const [config, setConfig] = useLocalStorage<TestFormData>(
    'llm-speed-test-config',
    DEFAULT_CONFIG
  );
  const [testResults, setTestResults] = useLocalStorage<TestRecord[]>(
    'llm-speed-test-results',
    []
  );
  const [status, setStatus] = useState<TestStatus>({
    state: 'idle',
    response: '',
  });

  const resetConfig = () => {
    setConfig(DEFAULT_CONFIG);
  };

  const runTest = async (formData: TestFormData) => {
    setStatus({ state: 'waiting', response: '' });
    const startTime = Date.now();
    let responseStartTime = 0;
    let tokens = 0;
    let fullResponse = '';

    try {
      const chat = new ChatOpenAI({
        modelName: formData.model,
        openAIApiKey: formData.apiKey,
        configuration: {
          baseURL: formData.baseUrl,
        },
        streaming: true,
      });

      const messages = [new HumanMessage(formData.prompt)];
      const stream = await chat.stream(messages, {
        stream_options: {
          include_usage: true,
        },
      });

      // First chunk received - record TTFB
      const ttfb = Date.now() - startTime;
      responseStartTime = Date.now();
      setStatus({ state: 'receiving', response: '' });

      for await (const chunk of stream) {
        if (chunk.content) {
          const content =
            typeof chunk.content === 'string' ? chunk.content : '';
          fullResponse += content;
          setStatus({ state: 'receiving', response: fullResponse });
        }

        // Check for token usage in chunk metadata
        if (chunk.usage_metadata?.output_tokens) {
          tokens = chunk.usage_metadata.output_tokens;
        }
      }

      const totalTime = Date.now() - startTime;
      const streamingTime = Date.now() - responseStartTime;
      const tps = tokens / (streamingTime / 1000);

      const newResult: TestRecord = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        baseUrl: formData.baseUrl,
        model: formData.model,
        prompt: formData.prompt,
        tokens,
        tps,
        ttfb,
        totalTime,
        response: fullResponse,
      };

      setTestResults((prev) => [newResult, ...prev]);
      setStatus({ state: 'complete', response: fullResponse });
    } catch (error) {
      console.error('Test failed:', error);
      setStatus({
        state: 'error',
        response: '',
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      });
    }
  };

  const deleteResult = (id: string) => {
    setTestResults((prev) => prev.filter((result) => result.id !== id));
  };

  return {
    config,
    setConfig,
    testResults,
    status,
    runTest,
    resetConfig,
    deleteResult
  };
}
