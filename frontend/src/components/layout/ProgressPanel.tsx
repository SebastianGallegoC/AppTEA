"use client";

import { LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";

export default function ProgressPanel() {
  const { currentLevelId, completedLevels, setCurrentLevel } = useAppStore();

  const handleLevelClick = (levelId: string, index: number) => {
    // Permitir navegar al nivel actual o a niveles completados
    // También permitir acceder al primer nivel no completado (siguiente)
    const canAccess =
      levelId === currentLevelId ||
      completedLevels.includes(levelId) ||
      (index > 0 && completedLevels.includes(LEVELS[index - 1].id)) ||
      index === 0;

    if (canAccess) {
      setCurrentLevel(levelId);
    }
  };

  return (
    <nav
      aria-label="Progreso del nivel"
      className="h-full rounded-lg border border-borde bg-blanco p-4"
    >
      <h2 className="mb-4 text-lg font-semibold text-principal">Progreso</h2>
      <ol className="list-none space-y-2 pl-0">
        {LEVELS.map((level, index) => {
          const isCurrent = level.id === currentLevelId;
          const isCompleted = completedLevels.includes(level.id);
          const isAccessible =
            isCurrent ||
            isCompleted ||
            (index > 0 && completedLevels.includes(LEVELS[index - 1].id)) ||
            index === 0;

          return (
            <li key={level.id} aria-current={isCurrent ? "step" : undefined}>
              <button
                onClick={() => handleLevelClick(level.id, index)}
                disabled={!isAccessible}
                aria-label={`${level.title}. ${
                  isCompleted
                    ? "Completado. Haz clic para repetir."
                    : isCurrent
                      ? "Nivel actual."
                      : isAccessible
                        ? "Disponible. Haz clic para acceder."
                        : "Bloqueado. Completa el nivel anterior primero."
                }`}
                className={`w-full rounded-lg border p-3 text-left text-sm transition-colors ${
                  isCurrent
                    ? "border-resaltado bg-resaltado/30 font-medium text-principal"
                    : isCompleted
                      ? "border-exito bg-exito/20 text-principal hover:bg-exito/30"
                      : isAccessible
                        ? "border-resaltado bg-resaltado/10 text-principal hover:bg-resaltado/20"
                        : "border-borde bg-fondo text-texto-suave opacity-60 cursor-not-allowed"
                } ${isAccessible && !isCurrent ? "cursor-pointer" : ""}`}
              >
                <div className="flex flex-col gap-1">
                  <span className="font-medium">{level.title}</span>
                  <span className="text-xs">
                    {isCompleted && "✓ Completado"}
                    {isCurrent && !isCompleted && "▶ Nivel actual"}
                    {!isCurrent &&
                      !isCompleted &&
                      isAccessible &&
                      "○ Disponible"}
                    {!isAccessible && "🔒 Bloqueado"}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
