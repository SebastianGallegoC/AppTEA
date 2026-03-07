"use client";

import { useCallback } from "react";
import { UserProgress } from "@/types";

const STORAGE_KEY_PREFIX = "appTEA_progress_";

function getStorageKey(username: string): string {
  return `${STORAGE_KEY_PREFIX}${username}`;
}

export function useProgress(username: string | null) {
  const loadProgress = useCallback((): UserProgress => {
    if (!username || typeof window === "undefined") {
      return { completedLevels: [], currentLevel: "nivel-1-secuenciacion" };
    }

    try {
      const stored = localStorage.getItem(getStorageKey(username));
      if (stored) {
        return JSON.parse(stored) as UserProgress;
      }
    } catch {
      // Si los datos están corruptos, se devuelve el estado inicial
    }

    return { completedLevels: [], currentLevel: "nivel-1-secuenciacion" };
  }, [username]);

  const saveProgress = useCallback(
    (progress: UserProgress): void => {
      if (!username || typeof window === "undefined") return;

      try {
        localStorage.setItem(
          getStorageKey(username),
          JSON.stringify(progress)
        );
      } catch {
        // Si localStorage está lleno, no interrumpir la experiencia
      }
    },
    [username]
  );

  const markLevelComplete = useCallback(
    (levelId: string): void => {
      const current = loadProgress();
      if (!current.completedLevels.includes(levelId)) {
        const updated: UserProgress = {
          ...current,
          completedLevels: [...current.completedLevels, levelId],
        };
        saveProgress(updated);
      }
    },
    [loadProgress, saveProgress]
  );

  return { loadProgress, saveProgress, markLevelComplete };
}
