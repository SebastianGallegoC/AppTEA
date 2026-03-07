"use client";

import { LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";

export default function ProgressPanel() {
  const { currentLevelId, completedLevels } = useAppStore();

  return (
    <nav
      aria-label="Progreso del nivel"
      className="h-full rounded-lg border border-borde bg-blanco p-4"
    >
      <h2 className="mb-4 text-lg font-semibold text-principal">Progreso</h2>
      <ol className="list-none space-y-2 pl-0">
        {LEVELS.map((level) => {
          const isCurrent = level.id === currentLevelId;
          const isCompleted = completedLevels.includes(level.id);

          return (
            <li
              key={level.id}
              aria-current={isCurrent ? "step" : undefined}
              className={`rounded-lg border p-3 text-sm ${
                isCurrent
                  ? "border-resaltado bg-resaltado/30 font-medium text-principal"
                  : isCompleted
                    ? "border-exito bg-exito/20 text-principal"
                    : "border-borde bg-fondo text-texto-suave"
              }`}
            >
              <div className="flex flex-col gap-1">
                <span className="font-medium">{level.title}</span>
                <span className="text-xs">
                  {isCompleted && "✓ Completado"}
                  {isCurrent && !isCompleted && "▶ Nivel actual"}
                  {!isCurrent && !isCompleted && "○ Bloqueado"}
                </span>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
