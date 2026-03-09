"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  currentUser: string | null;
  currentLevelId: string;
  completedLevels: string[];
  isSandboxMode: boolean;
  theoryCompletedModules: string[];
  currentModuleId: string;
  isDarkMode: boolean;
  setUser: (username: string | null) => void;
  setCurrentLevel: (levelId: string) => void;
  completeLevel: (levelId: string) => void;
  resetProgress: () => void;
  setSandboxMode: (active: boolean) => void;
  completeTheory: (moduleId: string) => void;
  setCurrentModule: (moduleId: string) => void;
  toggleDarkMode: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: null,
      currentLevelId: "nivel-1-secuenciacion",
      completedLevels: [],
      isSandboxMode: false,
      theoryCompletedModules: [],
      currentModuleId: "",
      isDarkMode: false,

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
        set({ completedLevels: [], isSandboxMode: false, theoryCompletedModules: [] }),

      setSandboxMode: (active) => set({ isSandboxMode: active }),

      completeTheory: (moduleId) => {
        const { theoryCompletedModules } = get();
        if (!theoryCompletedModules.includes(moduleId)) {
          set({ theoryCompletedModules: [...theoryCompletedModules, moduleId] });
        }
      },

      setCurrentModule: (moduleId) => set({ currentModuleId: moduleId }),

      toggleDarkMode: () => set((s) => ({ isDarkMode: !s.isDarkMode })),
    }),
    {
      name: "appTEA-store",
      partialize: (state) => ({
        currentUser: state.currentUser,
        currentLevelId: state.currentLevelId,
        completedLevels: state.completedLevels,
        theoryCompletedModules: state.theoryCompletedModules,
        currentModuleId: state.currentModuleId,
        isDarkMode: state.isDarkMode,
      }),
    },
  ),
);
