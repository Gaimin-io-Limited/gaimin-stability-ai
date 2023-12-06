import { PROMPT_STATUSES } from './enums';

export interface ServerResponse<T> {
  success: boolean;
  data: T;
  error?: {
    type: string;
    description: string;
  };
}

export interface Prompt {
  prompt: string;
  cfgScale: number;
  height: number;
  imageQuality: number;
  negativePrompt: string;
  outputsNumber: number;
  samplingModule: string;
  seed: number;
  steps: number;
  width: number;
}

export interface CreatePrompt {
  id: string;
  currentStep: number;
  steps: number;
  resultUrls: string[];
  status: PROMPT_STATUSES;
  statusUrl: string;
}

export interface StatusPrompt {
  currentStep: number;
  id: string;
  steps: number;
  resultUrls: string[];
  status: PROMPT_STATUSES;
  statusUrl: string;
}
