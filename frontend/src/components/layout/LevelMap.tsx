"use client";

import { LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";

// Iconos para cada nivel (tipo Duolingo)
const LEVEL_ICONS = ["🚶", "🥪", "🧼", "📱", "🎒"];

interface LevelMapProps {
  onLevelSelect?: () => void;
}

export default function LevelMap({ onLevelSelect }: LevelMapProps) {
  const { currentLevelId, completedLevels, setCurrentLevel } = useAppStore();

  const handleLevelClick = (levelId: string, index: number) => {
    const isAccessible =
      levelId === currentLevelId ||
      completedLevels.includes(levelId) ||
      (index > 0 && completedLevels.includes(LEVELS[index - 1].id)) ||
      index === 0;

    console.log("Click en nivel:", levelId, "isAccessible:", isAccessible);

    if (isAccessible) {
      setCurrentLevel(levelId);
      console.log("Nivel cambiado a:", levelId);
      onLevelSelect?.();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-fondo px-4 py-8">
      {/* Header */}
      <div className="mb-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-principal">
          Módulo 1: Secuenciación
        </h1>
        <p className="mt-2 text-lg text-texto-suave">
          Completa todos los niveles para dominar la secuenciación
        </p>
      </div>

      {/* Barra de progreso general */}
      <div className="mb-12 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-principal">
            Progreso del módulo
          </span>
          <span className="text-sm font-semibold text-principal">
            {completedLevels.length} / {LEVELS.length}
          </span>
        </div>
        <div className="h-4 w-full rounded-full bg-borde overflow-hidden">
          <div
            className="h-full bg-exito transition-all duration-500"
            style={{
              width: `${(completedLevels.length / LEVELS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Mapa de niveles (camino vertical tipo Duolingo) */}
      <div className="relative w-full max-w-md">
        {/* Línea de conexión vertical */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 bg-borde" />

        {/* Niveles */}
        <div className="relative space-y-8">
          {LEVELS.map((level, index) => {
            const isCurrent = level.id === currentLevelId;
            const isCompleted = completedLevels.includes(level.id);
            const isAccessible =
              isCurrent ||
              isCompleted ||
              (index > 0 && completedLevels.includes(LEVELS[index - 1].id)) ||
              index === 0;

            return (
              <div
                key={level.id}
                className={`relative flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                <button
                  onClick={() => handleLevelClick(level.id, index)}
                  disabled={!isAccessible}
                  aria-label={`${level.title}. ${
                    isCompleted
                      ? "Completado. Haz clic para repetir."
                      : isCurrent
                        ? "Nivel actual. Haz clic para continuar."
                        : isAccessible
                          ? "Disponible. Haz clic para acceder."
                          : "Bloqueado. Completa el nivel anterior primero."
                  }`}
                  className={`group relative transform transition-all duration-300 ${
                    isAccessible
                      ? "hover:scale-105 cursor-pointer"
                      : "cursor-not-allowed opacity-60"
                  } ${isCurrent ? "animate-pulse" : ""}`}
                >
                  {/* Card del nivel */}
                  <div
                    className={`relative w-72 rounded-2xl border-4 p-6 shadow-lg transition-all ${
                      isCurrent
                        ? "border-resaltado bg-resaltado/20"
                        : isCompleted
                          ? "border-exito bg-exito/20"
                          : isAccessible
                            ? "border-principal/30 bg-blanco"
                            : "border-borde bg-fondo"
                    }`}
                  >
                    {/* Icono grande tipo Duolingo */}
                    <div
                      className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full text-5xl ${
                        isCurrent
                          ? "bg-resaltado"
                          : isCompleted
                            ? "bg-exito"
                            : isAccessible
                              ? "bg-principal/20"
                              : "bg-borde"
                      }`}
                    >
                      {isAccessible || isCompleted
                        ? LEVEL_ICONS[index % LEVEL_ICONS.length]
                        : "🔒"}
                    </div>

                    {/* Información del nivel */}
                    <h3 className="text-center text-lg font-bold text-principal mb-1">
                      Nivel {index + 1}
                    </h3>
                    <p className="text-center text-sm text-texto-suave mb-3">
                      {level.title.replace(/^Nivel \d+: /, "")}
                    </p>

                    {/* Badge de estado */}
                    <div className="flex justify-center">
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-exito px-3 py-1 text-xs font-semibold text-principal">
                          ✓ Completado
                        </span>
                      ) : isCurrent ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-resaltado px-3 py-1 text-xs font-semibold text-principal">
                          ▶ Actual
                        </span>
                      ) : isAccessible ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-principal/20 px-3 py-1 text-xs font-semibold text-principal">
                          Comenzar
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-borde px-3 py-1 text-xs font-semibold text-texto-suave">
                          🔒 Bloqueado
                        </span>
                      )}
                    </div>

                    {/* Efecto de brillo para nivel actual */}
                    {isCurrent && (
                      <div className="absolute -inset-1 rounded-2xl bg-resaltado opacity-20 blur-xl" />
                    )}
                  </div>

                  {/* Conector al camino */}
                  <div
                    className={`absolute top-1/2 h-1 w-16 -translate-y-1/2 ${
                      index % 2 === 0 ? "right-full" : "left-full"
                    } ${
                      isCompleted || isCurrent
                        ? "bg-exito"
                        : isAccessible
                          ? "bg-principal/30"
                          : "bg-borde"
                    }`}
                  />
                </button>
              </div>
            );
          })}
        </div>

        {/* Indicador de fin del camino */}
        <div className="mt-8 flex justify-center">
          <div className="rounded-full bg-principal p-6 text-4xl shadow-lg">
            {completedLevels.length === LEVELS.length ? "🎉" : "🏆"}
          </div>
        </div>
      </div>
    </div>
  );
}
