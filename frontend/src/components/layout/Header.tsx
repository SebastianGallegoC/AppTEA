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
  const { completedLevels, currentLevelId, currentModuleId } = useAppStore();
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

        {/* Estadísticas (tipo Duolingo) */}
        <div className="flex items-center gap-3">
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
