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

  return (
    <header className="sticky top-0 z-10 border-b-2 border-borde bg-blanco shadow-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Botón de volver */}
        {onBackToMap && (
          <button
            onClick={onBackToMap}
            aria-label="Volver atrás"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-principal transition-colors hover:bg-fondo focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
          >
            <span className="text-xl">←</span>
            <span className="hidden sm:inline">Volver</span>
          </button>
        )}

        {/* Título del nivel actual (en vista de ejercicio) */}
        {showProgress && currentLevel && (
          <div className="flex flex-1 items-center justify-center">
            <div className="max-w-md flex-1">
              <div className="mb-1 flex items-center justify-between text-xs text-texto-suave">
                <span className="font-semibold">
                  Nivel {currentLevelIndex + 1}
                </span>
                <span>
                  {currentLevelIndex + 1} / {moduleLevels.length}
                </span>
              </div>
              <div className="h-3 w-full overflow-hidden rounded-full bg-borde">
                <div
                  className="h-full bg-principal transition-all duration-300"
                  style={{
                    width: `${((currentLevelIndex + 1) / moduleLevels.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Logo o título de la app */}
        {!showProgress && (
          <div className="flex flex-1 items-center justify-center">
            <h1 className="text-xl font-bold text-principal">AppTEA</h1>
          </div>
        )}

        {/* Estadísticas y controles */}
        <div className="flex items-center gap-3">
          {/* Modo oscuro */}
          <button
            onClick={() => {
              toggleDarkMode();
            }}
            aria-label={
              isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"
            }
            className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-borde transition-colors hover:bg-fondo focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
          >
            {isDarkMode ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-principal"
              >
                <circle cx="12" cy="12" r="5" />
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5 text-principal"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          {/* Racha/Progreso */}
          <div className="flex items-center gap-1 rounded-lg bg-exito/20 px-3 py-1.5">
            <span className="text-lg">✓</span>
            <span className="text-sm font-bold text-principal">
              {completedLevels.length}
            </span>
          </div>

          {/* Botón de usuario (placeholder) */}
          <button
            aria-label="Perfil de usuario"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-principal text-lg text-blanco transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
          >
            👤
          </button>
        </div>
      </div>
    </header>
  );
}
