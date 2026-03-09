"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LEVELS, MODULES } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";

// Iconos para cada nivel por módulo
const MODULE_LEVEL_ICONS: Record<string, string[]> = {
  Secuenciación: ["🚶", "📧", "📚", "📱", "🖨️"],
  Variables: ["📦", "✏️", "🧮", "↔️", "👤"],
};

interface LevelMapProps {
  onLevelSelect?: () => void;
  onReviewTheory?: () => void;
}

interface LineData {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  completed: boolean;
}

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    setIsMobile(mql.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [breakpoint]);
  return isMobile;
}

export default function LevelMap({
  onLevelSelect,
  onReviewTheory,
}: LevelMapProps) {
  const { currentLevelId, completedLevels, setCurrentLevel, currentModuleId } =
    useAppStore();
  const currentModule = MODULES.find((m) => m.id === currentModuleId);
  const moduleLevels = LEVELS.filter(
    (l) => l.concept === (currentModule?.concept ?? "Secuenciación"),
  );
  const levelIcons =
    MODULE_LEVEL_ICONS[currentModule?.concept ?? "Secuenciación"] ?? [];
  const moduleCompletedCount = moduleLevels.filter((l) =>
    completedLevels.includes(l.id),
  ).length;
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trophyRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LineData[]>([]);
  const isMobile = useIsMobile();

  const handleLevelClick = (levelId: string, index: number) => {
    const isAccessible =
      levelId === currentLevelId ||
      completedLevels.includes(levelId) ||
      (index > 0 && completedLevels.includes(moduleLevels[index - 1].id)) ||
      index === 0;

    if (isAccessible) {
      setCurrentLevel(levelId);
      onLevelSelect?.();
    }
  };

  // Calcula las líneas midiendo posiciones reales del DOM
  const calculateLines = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const containerRect = container.getBoundingClientRect();
    const newLines: LineData[] = [];
    const allNodes = [...circleRefs.current];
    if (trophyRef.current) allNodes.push(trophyRef.current);

    for (let i = 1; i < allNodes.length; i++) {
      const prev = allNodes[i - 1];
      const curr = allNodes[i];
      if (!prev || !curr) continue;

      const prevRect = prev.getBoundingClientRect();
      const currRect = curr.getBoundingClientRect();

      const prevCenterX =
        prevRect.left + prevRect.width / 2 - containerRect.left;
      const prevCenterY =
        prevRect.top + prevRect.height / 2 - containerRect.top;
      const currCenterX =
        currRect.left + currRect.width / 2 - containerRect.left;
      const currCenterY =
        currRect.top + currRect.height / 2 - containerRect.top;

      const angle = Math.atan2(
        currCenterY - prevCenterY,
        currCenterX - prevCenterX,
      );
      const prevRadius = prevRect.width / 2;
      const currRadius = currRect.width / 2;

      const x1 = prevCenterX + Math.cos(angle) * prevRadius;
      const y1 = prevCenterY + Math.sin(angle) * prevRadius;
      const x2 = currCenterX - Math.cos(angle) * currRadius;
      const y2 = currCenterY - Math.sin(angle) * currRadius;

      const isLevelCompleted =
        i < moduleLevels.length
          ? completedLevels.includes(moduleLevels[i].id) ||
            completedLevels.includes(moduleLevels[i - 1].id)
          : moduleCompletedCount === moduleLevels.length;

      newLines.push({ x1, y1, x2, y2, completed: isLevelCompleted });
    }

    setLines(newLines);
  }, [completedLevels, moduleLevels]);

  useEffect(() => {
    const timer = setTimeout(calculateLines, 100);
    window.addEventListener("resize", calculateLines);
    const observer = new ResizeObserver(calculateLines);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateLines);
      observer.disconnect();
    };
  }, [calculateLines, isMobile]);

  const generateCurvePath = (line: LineData) => {
    const { x1, y1, x2, y2 } = line;
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    return `M ${x1} ${y1} C ${midX} ${y1}, ${midX} ${y2}, ${x2} ${y2}`;
  };

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center bg-fondo px-3 py-6 md:px-4 md:py-8">
      {/* Header del módulo */}
      <div className="mb-6 w-full max-w-2xl md:mb-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold text-principal md:text-3xl">
              {currentModule?.title ?? "Módulo"}
            </h1>
            <p className="mt-1 text-sm text-texto-suave md:text-base">
              Completa todos los niveles para dominar{" "}
              {(currentModule?.concept ?? "el módulo").toLowerCase()}
            </p>
          </div>
          {onReviewTheory && (
            <button
              onClick={onReviewTheory}
              className="btn-3d btn-3d-secondary shrink-0 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-bold focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
            >
              <span>📖</span>
              Repasar teoría
            </button>
          )}
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="mb-8 w-full max-w-2xl md:mb-12">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-principal md:text-sm">
            Progreso del módulo
          </span>
          <span className="text-xs font-bold text-texto-suave md:text-sm">
            {moduleCompletedCount} / {moduleLevels.length}
          </span>
        </div>
        <div className="progress-bar-duo">
          <div
            className="fill bg-exito"
            style={{
              width: `${(moduleCompletedCount / moduleLevels.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Mapa de niveles */}
      <div className="relative w-full overflow-x-hidden pb-8 pt-4 md:pb-16 md:pt-8">
        <div
          ref={containerRef}
          className={`relative ${
            isMobile
              ? "flex flex-col items-center px-4 py-8 gap-0"
              : "flex w-full justify-center px-8 py-20"
          }`}
        >
          {/* SVG overlay para las líneas conectoras */}
          <svg
            className="pointer-events-none absolute inset-0"
            width="100%"
            height="100%"
            style={{ overflow: "visible" }}
            aria-hidden="true"
          >
            {lines.map((line, i) => (
              <path
                key={i}
                d={generateCurvePath(line)}
                stroke={
                  line.completed ? "var(--tea-exito)" : "var(--tea-borde)"
                }
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={line.completed ? "none" : "8 6"}
                fill="none"
              />
            ))}
          </svg>

          {/* Niveles */}
          <div
            className={`relative z-10 ${
              isMobile
                ? "flex flex-col items-center gap-10"
                : "flex gap-24 items-center"
            }`}
          >
            {moduleLevels.map((level, index) => {
              const isCurrent = level.id === currentLevelId;
              const isCompleted = completedLevels.includes(level.id);
              const isAccessible =
                isCurrent ||
                isCompleted ||
                (index > 0 &&
                  completedLevels.includes(moduleLevels[index - 1].id)) ||
                index === 0;

              const position = index % 3;
              const translateClass = isMobile
                ? position === 0
                  ? "-translate-x-12"
                  : position === 1
                    ? ""
                    : "translate-x-12"
                : position === 0
                  ? "-translate-y-20"
                  : position === 1
                    ? ""
                    : "translate-y-20";

              return (
                <div
                  key={level.id}
                  className={`relative flex flex-col items-center ${translateClass}`}
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
                    className={`group relative ${
                      isAccessible
                        ? "cursor-pointer"
                        : "cursor-not-allowed opacity-60"
                    }`}
                  >
                    {/* Anillo exterior decorativo para nivel actual */}
                    {isCurrent && (
                      <div className="absolute -inset-2 rounded-full border-4 border-resaltado/40 md:-inset-3" />
                    )}

                    {/* Círculo principal */}
                    <div
                      ref={(el) => {
                        circleRefs.current[index] = el;
                      }}
                      className={`relative flex items-center justify-center rounded-full border-4 bg-blanco
                        h-18 w-18 md:h-24 md:w-24 ${
                          isCurrent
                            ? "border-acento shadow-lg shadow-acento/30"
                            : isCompleted
                              ? "border-exito shadow-lg shadow-exito/20"
                              : isAccessible
                                ? "border-principal shadow-md"
                                : "border-borde"
                        }`}
                    >
                      <span className="text-3xl md:text-5xl">
                        {isAccessible || isCompleted
                          ? (levelIcons[index % levelIcons.length] ?? "❓")
                          : "🔒"}
                      </span>

                      {isCompleted && (
                        <div className="absolute -top-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-exito border-2 border-blanco shadow md:-top-1.5 md:-right-1.5 md:h-8 md:w-8">
                          <span className="text-xs text-white font-bold md:text-sm">
                            ✓
                          </span>
                        </div>
                      )}
                    </div>
                  </button>

                  {/* Texto del nivel */}
                  <div className="mt-2 text-center md:mt-3">
                    <p className="text-xs font-bold text-principal whitespace-nowrap md:text-sm">
                      Nivel {index + 1}
                    </p>
                    {isAccessible && !isCompleted && (
                      <span className="btn-3d btn-3d-primary inline-block mt-1.5 rounded-xl px-4 py-1 text-[10px] font-bold md:px-5 md:py-1.5 md:text-xs">
                        {index === 0 ? "EMPEZAR" : "INICIAR"}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Trofeo */}
            <div className="relative flex flex-col items-center">
              <div
                ref={trophyRef}
                className={`flex items-center justify-center rounded-full border-4 bg-blanco
                  h-18 w-18 md:h-24 md:w-24 ${
                    moduleCompletedCount === moduleLevels.length
                      ? "border-oro shadow-lg shadow-oro/30"
                      : "border-borde"
                  }`}
              >
                <span className="text-3xl md:text-5xl">
                  {moduleCompletedCount === moduleLevels.length ? "🎉" : "🏆"}
                </span>
              </div>
              {moduleCompletedCount === moduleLevels.length && (
                <p className="mt-2 text-xs font-bold text-oro whitespace-nowrap md:text-sm">
                  ¡Completado!
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
