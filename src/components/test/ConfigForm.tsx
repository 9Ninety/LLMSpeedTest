import { RotateCcw, Settings } from 'lucide-react';
import type { TestFormData } from '../../types';
import { Card } from '../ui/Card';
import { IconButton } from '../ui/IconButton';
import { Input } from '../ui/Input';
import { TextArea } from '../ui/TextArea';

interface ConfigFormProps {
  data: TestFormData;
  onChange: (data: TestFormData) => void;
  onReset: () => void;
}

export function ConfigForm({ data, onChange, onReset }: ConfigFormProps) {
  return (
    <Card
      title={
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6" />
          <span>Configuration</span>
        </div>
      }
      description="Set up your LLM testing environment"
      action={
        <IconButton
          onClick={onReset}
          title="Reset Configuration"
          variant="default"
        >
          <RotateCcw className="w-5 h-5" />
        </IconButton>
      }
    >
      <div className="space-y-5">
        <Input
          label="API Base URL"
          type="url"
          value={data.baseUrl}
          onChange={(e) => onChange({ ...data, baseUrl: e.target.value })}
          required
          placeholder="https://api.openai.com/v1"
        />

        <Input
          label="API Key"
          type="password"
          value={data.apiKey}
          onChange={(e) => onChange({ ...data, apiKey: e.target.value })}
          required
          className="font-mono"
          placeholder="sk-..."
        />

        <Input
          label="Model"
          value={data.model}
          onChange={(e) => onChange({ ...data, model: e.target.value })}
          required
          placeholder="gpt-4o"
        />

        <TextArea
          label="Prompt"
          value={data.prompt}
          onChange={(e) => onChange({ ...data, prompt: e.target.value })}
          required
          placeholder="Enter your prompt here..."
          rows={4}
        />
      </div>
    </Card>
  );
}