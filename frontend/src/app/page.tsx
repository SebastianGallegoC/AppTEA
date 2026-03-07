"use client";

import { useState, useCallback, useEffect } from "react";
import { ValidationResult } from "@/types";
import { LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";
import { useProgress } from "@/hooks/useProgress";
import ProgressPanel from "@/components/layout/ProgressPanel";
import MainPanel from "@/components/layout/MainPanel";
import OutputPanel from "@/components/layout/OutputPanel";
import SequenceEditor from "@/components/editor/SequenceEditor";

export default function Home() {
  const { currentUser, currentLevelId, completeLevel } = useAppStore();
  const { markLevelComplete } = useProgress(currentUser);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [levelCompleted, setLevelCompleted] = useState(false);

  // Reiniciar estado cuando cambia el nivel
  useEffect(() => {
    setResult(null);
    setLevelCompleted(false);
  }, [currentLevelId]);

  const currentLevel = LEVELS.find((l) => l.id === currentLevelId) ?? LEVELS[0];

  const handleResult = useCallback((newResult: ValidationResult | null) => {
    setResult(newResult);
  }, []);

  const handleLevelComplete = useCallback(() => {
    setLevelCompleted(true);
    completeLevel(currentLevelId);
    markLevelComplete(currentLevelId);
  }, [currentLevelId, completeLevel, markLevelComplete]);

  return (
    <main className="min-h-screen bg-fondo p-4 md:p-6">
      <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-[260px_1fr_300px] md:gap-6">
        <ProgressPanel />
        <MainPanel>
          <SequenceEditor
            key={currentLevelId}
            levelId={currentLevelId}
            onResult={handleResult}
            onLevelComplete={handleLevelComplete}
          />
        </MainPanel>
        <OutputPanel
          result={result}
          levelCompleted={levelCompleted}
          concept={currentLevel.concept}
          totalSteps={currentLevel.steps.length}
        />
      </div>
    </main>
  );
}
