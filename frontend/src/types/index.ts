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

/* ─── Interfaces para la teoría ─── */

export interface TheoryContentBlock {
  type: "text" | "highlight" | "example" | "steps" | "image-description";
  value?: string;
  items?: string[];
  emoji?: string;
}

export interface TheorySection {
  title: string;
  icon: string;
  content: TheoryContentBlock[];
}

export interface ModuleTheory {
  moduleId: string;
  title: string;
  description: string;
  sections: TheorySection[];
}

/* ─── Interfaces para módulos ─── */

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  concept: string;
  isAvailable: boolean;
  totalLevels: number;
}
