"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";

// Iconos para cada nivel (tipo Duolingo)
const LEVEL_ICONS = ["🚶", "📧", "📚", "📱", "🖨️"];

interface LevelMapProps {
  onLevelSelect?: () => void;
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

export default function LevelMap({ onLevelSelect }: LevelMapProps) {
  const { currentLevelId, completedLevels, setCurrentLevel } = useAppStore();
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trophyRef = useRef<HTMLDivElement>(null);
  const [lines, setLines] = useState<LineData[]>([]);
  const isMobile = useIsMobile();

  const handleLevelClick = (levelId: string, index: number) => {
    const isAccessible =
      levelId === currentLevelId ||
      completedLevels.includes(levelId) ||
      (index > 0 && completedLevels.includes(LEVELS[index - 1].id)) ||
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
        i < LEVELS.length
          ? completedLevels.includes(LEVELS[i].id) ||
            completedLevels.includes(LEVELS[i - 1].id)
          : completedLevels.length === LEVELS.length;

      newLines.push({ x1, y1, x2, y2, completed: isLevelCompleted });
    }

    setLines(newLines);
  }, [completedLevels]);

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
    <div className="flex min-h-screen flex-col items-center bg-fondo px-3 py-6 md:px-4 md:py-8">
      {/* Header */}
      <div className="mb-6 w-full max-w-2xl md:mb-8">
        <h1 className="text-2xl font-bold text-principal md:text-3xl">
          Módulo 1: Secuenciación
        </h1>
        <p className="mt-1 text-base text-texto-suave md:mt-2 md:text-lg">
          Completa todos los niveles para dominar la secuenciación
        </p>
      </div>

      {/* Barra de progreso general */}
      <div className="mb-8 w-full max-w-2xl md:mb-12">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-principal md:text-sm">
            Progreso del módulo
          </span>
          <span className="text-xs font-semibold text-principal md:text-sm">
            {completedLevels.length} / {LEVELS.length}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-borde overflow-hidden md:h-4">
          <div
            className="h-full bg-exito transition-all duration-500"
            style={{
              width: `${(completedLevels.length / LEVELS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Mapa de niveles */}
      <div className="relative w-full overflow-x-auto pb-8 pt-4 md:pb-16 md:pt-8">
        <div
          ref={containerRef}
          className={`relative ${
            isMobile
              ? "flex flex-col items-center px-4 py-8 gap-0"
              : "inline-flex min-w-full justify-center px-24 py-20"
          }`}
        >
          {/* SVG overlay para las líneas conectoras */}
          <svg
            className="pointer-events-none absolute inset-0"
            width="100%"
            height="100%"
            style={{ overflow: "visible" }}
          >
            {lines.map((line, i) => (
              <path
                key={i}
                d={generateCurvePath(line)}
                stroke={line.completed ? "#a8d5ba" : "#d5dbdb"}
                strokeWidth="3"
                strokeLinecap="round"
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
            {LEVELS.map((level, index) => {
              const isCurrent = level.id === currentLevelId;
              const isCompleted = completedLevels.includes(level.id);
              const isAccessible =
                isCurrent ||
                isCompleted ||
                (index > 0 && completedLevels.includes(LEVELS[index - 1].id)) ||
                index === 0;

              // En móvil: zigzag horizontal; en desktop: zigzag vertical
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
                    className={`group relative transform transition-all duration-300 ${
                      isAccessible
                        ? "hover:scale-110 cursor-pointer"
                        : "cursor-not-allowed opacity-70"
                    } ${isCurrent ? "animate-pulse" : ""}`}
                  >
                    {/* Círculo principal */}
                    <div
                      ref={(el) => {
                        circleRefs.current[index] = el;
                      }}
                      className={`relative flex items-center justify-center rounded-full border-4 shadow-lg transition-all bg-blanco
                        h-16 w-16 md:h-24 md:w-24 ${
                          isCurrent
                            ? "border-resaltado shadow-resaltado/50"
                            : isCompleted
                              ? "border-exito shadow-exito/50"
                              : isAccessible
                                ? "border-principal shadow-principal/50"
                                : "border-borde shadow-gray-300"
                        }`}
                    >
                      <span className="text-3xl md:text-5xl">
                        {isAccessible || isCompleted
                          ? LEVEL_ICONS[index % LEVEL_ICONS.length]
                          : "🔒"}
                      </span>

                      {isCompleted && (
                        <div className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-blanco border-2 border-exito shadow-md md:-top-2 md:-right-2 md:h-8 md:w-8">
                          <span className="text-sm text-exito font-bold md:text-lg">
                            ✓
                          </span>
                        </div>
                      )}

                      {isCurrent && (
                        <div className="absolute inset-0 rounded-full bg-resaltado opacity-30 blur-md animate-pulse" />
                      )}
                    </div>
                  </button>

                  {/* Texto del nivel */}
                  <div className="mt-2 text-center md:mt-3">
                    <p className="text-xs font-bold text-principal whitespace-nowrap md:text-sm">
                      Nivel {index + 1}
                    </p>
                    {isAccessible && !isCompleted && (
                      <span className="inline-block mt-1 rounded-full bg-blanco border-2 border-principal px-3 py-0.5 text-[10px] font-bold text-principal shadow-sm md:px-4 md:py-1 md:text-xs">
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
                className={`flex items-center justify-center rounded-full border-4 shadow-lg bg-blanco
                  h-16 w-16 md:h-24 md:w-24 ${
                    completedLevels.length === LEVELS.length
                      ? "border-exito shadow-exito/50"
                      : "border-borde shadow-gray-300"
                  }`}
              >
                <span className="text-3xl md:text-5xl">
                  {completedLevels.length === LEVELS.length ? "🎉" : "🏆"}
                </span>
              </div>
              {completedLevels.length === LEVELS.length && (
                <p className="mt-2 text-xs font-bold text-exito whitespace-nowrap md:text-sm">
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
