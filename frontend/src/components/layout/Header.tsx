"use client";

import { useAppStore } from "@/store/useAppStore";
import { LEVELS, MODULES } from "@/utils/constants";

interface HeaderProps {
  onBackToMap?: () => void;
  showProgress?: boolean;
}

export default function Header({
  onBackToMap,
  showProgress = false,
}: HeaderProps) {
  const {
    completedLevels,
    currentLevelId,
    currentModuleId,
    isDarkMode,
    toggleDarkMode,
  } = useAppStore();
  const currentModule = MODULES.find((m) => m.id === currentModuleId);
  const moduleLevels = LEVELS.filter(
    (l) => l.concept === (currentModule?.concept ?? ""),
  );
  const currentLevelIndex = moduleLevels.findIndex(
    (l) => l.id === currentLevelId,
  );
  const currentLevel = moduleLevels[currentLevelIndex];
  const xp = completedLevels.length * 20;

  return (
    <header className="sticky top-0 z-30 border-b-2 border-borde bg-sidebar">
      <div className="mx-auto flex h-14 items-center justify-between px-4 lg:pl-60 xl:pr-76">
        {/* Botón de volver */}
        <div className="flex items-center gap-3">
          {onBackToMap && (
            <button
              onClick={onBackToMap}
              aria-label="Volver atrás"
              className="flex items-center justify-center h-9 w-9 rounded-lg border-2 border-borde text-principal transition-colors hover:bg-sidebar-hover focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden="true"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          {/* Logo mobile */}
          <span className="lg:hidden text-lg font-extrabold text-acento">
            AppTEA
          </span>
        </div>

        {/* Barra de progreso central (en vista de ejercicio) */}
        {showProgress && currentLevel && (
          <div className="flex flex-1 items-center justify-center max-w-sm mx-4">
            <div className="w-full">
              <div className="progress-bar-duo">
                <div
                  className="fill bg-exito"
                  style={{
                    width: `${((currentLevelIndex + 1) / moduleLevels.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Título centrado cuando no hay progreso */}
        {!showProgress && (
          <div className="hidden lg:flex flex-1 items-center justify-center">
            {currentModule && (
              <span className="text-sm font-bold text-principal">
                {currentModule.title}
              </span>
            )}
          </div>
        )}

        {/* Stats badges estilo Duolingo */}
        <div className="flex items-center gap-2">
          {/* XP */}
          <div
            className="stat-badge bg-oro-suave text-principal"
            title="Puntos de experiencia"
          >
            <span aria-hidden="true">⚡</span>
            <span>{xp}</span>
          </div>

          {/* Niveles completados */}
          <div
            className="stat-badge bg-exito/15 text-principal"
            title="Niveles completados"
          >
            <span aria-hidden="true">✅</span>
            <span>{completedLevels.length}</span>
          </div>

          {/* Dark mode - solo mobile */}
          <button
            onClick={toggleDarkMode}
            aria-label={
              isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
            className="lg:hidden flex h-9 w-9 items-center justify-center rounded-full border-2 border-borde text-lg transition-colors hover:bg-sidebar-hover focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
          >
            {isDarkMode ? "☀️" : "🌙"}
          </button>

          {/* Avatar */}
          <button
            aria-label="Perfil de usuario"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-acento text-sm font-bold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
          >
            👤
          </button>
        </div>
      </div>
    </header>
  );
}
