"use client";

import { useAppStore } from "@/store/useAppStore";
import { MODULES, LEVELS } from "@/utils/constants";

interface RightPanelProps {
  isExpanded: boolean;
  onToggle: () => void;
}

export default function RightPanel({ isExpanded, onToggle }: RightPanelProps) {
  const { completedLevels, currentModuleId, currentUser } = useAppStore();
  const currentModule = MODULES.find((m) => m.id === currentModuleId);
  const totalCompleted = completedLevels.length;
  const totalLevels = LEVELS.length;

  const moduleLevels = currentModule
    ? LEVELS.filter((l) => l.concept === currentModule.concept)
    : [];
  const moduleCompleted = moduleLevels.filter((l) =>
    completedLevels.includes(l.id),
  ).length;

  return (
    <aside
      aria-label="Estadísticas y progreso"
      className={`hidden xl:flex xl:flex-col transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] ${
        isExpanded ? "xl:w-72" : "xl:w-20"
      } xl:fixed xl:top-14 xl:bottom-0 xl:right-0 xl:z-10 xl:border-l-2 xl:border-borde xl:bg-sidebar xl:overflow-y-auto`}
    >
      <div className="p-4 sticky top-0 bg-sidebar z-20 border-b border-borde flex items-center justify-between">
        {isExpanded && <h2 className="font-bold text-principal truncate transition-opacity duration-500 delay-150">Mi Progreso</h2>}
        <button
          onClick={onToggle}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-principal text-blanco shadow hover:bg-principal/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-principal transition-all duration-300 mx-auto xl:mx-0"
          aria-label={isExpanded ? "Ocultar panel de estadísticas" : "Mostrar panel de estadísticas"}
          aria-expanded={isExpanded}
        >
          <span className={`transform transition-transform duration-500 ${isExpanded ? "rotate-90" : "-rotate-90"}`}>
            ▼
          </span>
        </button>
      </div>

      <div
        className={`flex-1 transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] px-4 py-4 ${
          isExpanded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full hidden"
        }`}
      >
        {/* Perfil rápido */}
        <div className="card-duo p-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-acento text-xl text-white font-bold">
              {currentUser ? currentUser.charAt(0).toUpperCase() : "👤"}
            </div>
            <div>
              <p className="font-bold text-principal text-sm">
                {currentUser ?? "Estudiante"}
              </p>
              <p className="text-xs text-texto-suave">Lógica y Fundamentos de Programación</p>
            </div>
          </div>
        </div>

        {/* Estadísticas */}
        <div className="card-duo p-4 mb-4">
          <h2 className="text-sm font-bold text-principal mb-3">Estadísticas</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center rounded-xl bg-oro-suave p-3">
              <span className="text-2xl" aria-hidden="true">
                ⚡
              </span>
              <span className="text-lg font-extrabold text-principal">
                {totalCompleted * 20}
              </span>
              <span className="text-[10px] font-semibold text-texto-suave">
                EXP totales
              </span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-resaltado/20 p-3">
              <span className="text-2xl" aria-hidden="true">
                ✅
              </span>
              <span className="text-lg font-extrabold text-principal">
                {totalCompleted}
              </span>
              <span className="text-[10px] font-semibold text-texto-suave">
                Completados
              </span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-exito/15 p-3">
              <span className="text-2xl" aria-hidden="true">
                📚
              </span>
              <span className="text-lg font-extrabold text-principal">
                {MODULES.filter((m) => m.isAvailable).length}
              </span>
              <span className="text-[10px] font-semibold text-texto-suave">
                Módulos
              </span>
            </div>
            <div className="flex flex-col items-center rounded-xl bg-error/20 p-3">
              <span className="text-2xl" aria-hidden="true">
                🎯
              </span>
              <span className="text-lg font-extrabold text-principal">
                {totalLevels}
              </span>
              <span className="text-[10px] font-semibold text-texto-suave">
                Niveles
              </span>
            </div>
          </div>
        </div>

        {/* Progreso del módulo actual */}
        {currentModule && (
          <div className="card-duo p-4 mb-4">
            <h2 className="text-sm font-bold text-principal mb-2">
              {currentModule.title}
            </h2>
            <p className="text-xs text-texto-suave mb-3">
              {moduleCompleted} de {moduleLevels.length} niveles completados
            </p>
            <div className="progress-bar-duo">
              <div
                className="fill bg-exito"
                style={{
                  width: `${
                    moduleLevels.length > 0
                      ? (moduleCompleted / moduleLevels.length) * 100
                      : 0
                  }%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Logros */}
        <div className="card-duo p-4">
          <h2 className="text-sm font-bold text-principal mb-3">Logros</h2>
          <ul className="space-y-3" role="list">
            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-oro-suave text-xl">
                🔥
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold text-principal">Primer paso</p>
                <div className="progress-bar-duo mt-1" style={{ height: 8 }}>
                  <div
                    className="fill bg-oro"
                    style={{
                      width: `${Math.min(totalCompleted, 1) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-texto-suave mt-0.5">
                  Completa tu primer nivel
                </p>
              </div>
              <span className="text-xs font-bold text-texto-suave">
                {Math.min(totalCompleted, 1)}/1
              </span>
            </li>

            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-resaltado/30 text-xl">
                💎
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold text-principal">Explorador</p>
                <div className="progress-bar-duo mt-1" style={{ height: 8 }}>
                  <div
                    className="fill bg-gema"
                    style={{
                      width: `${(totalCompleted / 5) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-texto-suave mt-0.5">
                  Completa 5 niveles
                </p>
              </div>
              <span className="text-xs font-bold text-texto-suave">
                {Math.min(totalCompleted, 5)}/5
              </span>
            </li>

            <li className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-exito/20 text-xl">
                🏆
              </span>
              <div className="flex-1">
                <p className="text-xs font-bold text-principal">Maestro</p>
                <div className="progress-bar-duo mt-1" style={{ height: 8 }}>
                  <div
                    className="fill bg-exito"
                    style={{
                      width: `${(Math.min(totalCompleted, 10) / 10) * 100}%`,
                    }}
                  />
                </div>
                <p className="text-[10px] text-texto-suave mt-0.5">
                  Completa los 10 niveles
                </p>
              </div>
              <span className="text-xs font-bold text-texto-suave">
                {Math.min(totalCompleted, 10)}/10
              </span>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
}
