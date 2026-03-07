/* ─── Interfaces de datos para AppTEA ─── */

export interface Step {
  id: string;
  text: string;
  order: number;
}

export interface Level {
  id: string;
  title: string;
  description: string;
  concept: string;
  steps: Step[];
}

export interface ValidationResult {
  isCorrect: boolean;
  message: string;
  firstErrorIndex: number | null;
}

export interface User {
  id: number;
  username: string;
}

export interface UserProgress {
  completedLevels: string[];
  currentLevel: string;
}
