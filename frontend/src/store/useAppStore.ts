"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  currentUser: string | null;
  currentLevelId: string;
  completedLevels: string[];
  isSandboxMode: boolean;
  theoryCompleted: boolean;
  currentModuleId: string;
  setUser: (username: string | null) => void;
  setCurrentLevel: (levelId: string) => void;
  completeLevel: (levelId: string) => void;
  resetProgress: () => void;
  setSandboxMode: (active: boolean) => void;
  completeTheory: () => void;
  setCurrentModule: (moduleId: string) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      currentLevelId: "nivel-1-secuenciacion",
      completedLevels: [],
      isSandboxMode: false,
      theoryCompleted: false,
      currentModuleId: "",

      setUser: (username) => set({ currentUser: username }),

      setCurrentLevel: (levelId) =>
        set({ currentLevelId: levelId, isSandboxMode: false }),

      completeLevel: (levelId) => {
        const { completedLevels } = get();
        if (!completedLevels.includes(levelId)) {
          set({ completedLevels: [...completedLevels, levelId] });
        }
      },

      resetProgress: () =>
        set({ completedLevels: [], isSandboxMode: false, theoryCompleted: false }),

      setSandboxMode: (active) => set({ isSandboxMode: active }),

      completeTheory: () => set({ theoryCompleted: true }),

      setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),
    }),
    {
      name: "appTEA-store",
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentLevelId: state.currentLevelId,
        completedLevels: state.completedLevels,
        theoryCompleted: state.theoryCompleted,
        currentModuleId: state.currentModuleId,
      }),
    },
  ),
);
