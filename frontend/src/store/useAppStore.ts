"use client";

import { create } from "zustand";

interface AppState {
  currentUser: string | null;
  currentLevelId: string;
  completedLevels: string[];
  isSandboxMode: boolean;
  setUser: (username: string | null) => void;
  setCurrentLevel: (levelId: string) => void;
  completeLevel: (levelId: string) => void;
  resetProgress: () => void;
  setSandboxMode: (active: boolean) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  currentUser: null,
  currentLevelId: "nivel-1-secuenciacion",
  completedLevels: [],
  isSandboxMode: false,

  setUser: (username) => set({ currentUser: username }),

  setCurrentLevel: (levelId) =>
    set({ currentLevelId: levelId, isSandboxMode: false }),

  completeLevel: (levelId) => {
    const { completedLevels } = get();
    if (!completedLevels.includes(levelId)) {
      set({ completedLevels: [...completedLevels, levelId] });
    }
  },

  resetProgress: () => set({ completedLevels: [], isSandboxMode: false }),

  setSandboxMode: (active) => set({ isSandboxMode: active }),
}));
