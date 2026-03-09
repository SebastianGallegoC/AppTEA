"use client";

import { MODULES, LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";
import { Module } from "@/types";

interface ModuleHubProps {
  onModuleSelect: (moduleId: string) => void;
}

export default function ModuleHub({ onModuleSelect }: ModuleHubProps) {
  const { completedLevels } = useAppStore();

  const getModuleProgress = (mod: Module) => {
    if (!mod.isAvailable || mod.totalLevels === 0)
      return { completed: 0, total: 0, percent: 0 };
    const modLevels = LEVELS.filter((l) => l.concept === mod.concept);
    const completed = modLevels.filter((l) =>
      completedLevels.includes(l.id),
    ).length;
    return {
      completed,
      total: modLevels.length,
      percent: Math.round((completed / modLevels.length) * 100),
    };
  };

  const totalXP = completedLevels.length * 20;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] px-4 py-6 sm:px-6 md:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Saludo y XP */}
        <div className="mb-8">
          <h1 className="text-2xl font-extrabold text-principal sm:text-3xl">
            Módulos de aprendizaje
          </h1>
          <p className="mt-2 text-sm text-texto-suave sm:text-base">
            Selecciona un módulo para comenzar a aprender programación paso a
            paso.
          </p>
          {/* XP Banner */}
          <div className="mt-4 card-duo p-4 flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-oro-suave text-3xl">
              ⚡
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-principal">
                Tienes {totalXP} EXP totales
              </p>
              <p className="text-xs text-texto-suave">
                Cada nivel completado te da 20 EXP
              </p>
            </div>
          </div>
        </div>

        {/* Grid de módulos estilo Duolingo */}
        <div className="space-y-4">
          {MODULES.map((mod) => {
            const progress = getModuleProgress(mod);
            const isAvailable = mod.isAvailable;

            return (
              <button
                key={mod.id}
                onClick={() => isAvailable && onModuleSelect(mod.id)}
                disabled={!isAvailable}
                aria-label={
                  isAvailable
                    ? `Módulo: ${mod.title}. ${mod.description}. Progreso: ${progress.percent} por ciento.`
                    : `Módulo: ${mod.title}. Próximamente.`
                }
                className={`card-duo w-full flex items-center gap-4 p-4 text-left transition-all sm:p-5 ${
                  isAvailable
                    ? "cursor-pointer hover:border-acento hover:shadow-md focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
                    : "opacity-60 cursor-not-allowed"
                }`}
              >
                {/* Icono grande */}
                <div
                  className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl ${
                    isAvailable
                      ? progress.percent === 100
                        ? "bg-exito/20"
                        : "bg-resaltado/20"
                      : "bg-borde/30"
                  }`}
                >
                  <span role="img" aria-hidden="true">
                    {mod.icon}
                  </span>
                </div>

                {/* Contenido */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h2
                      className={`text-base font-bold sm:text-lg ${
                        isAvailable ? "text-principal" : "text-texto-suave"
                      }`}
                    >
                      {mod.title}
                    </h2>
                    {!isAvailable && (
                      <span className="rounded-full bg-borde px-2.5 py-0.5 text-[10px] font-bold text-texto-suave">
                        PRÓXIMAMENTE
                      </span>
                    )}
                    {isAvailable && progress.percent === 100 && (
                      <span className="rounded-full bg-exito/20 px-2.5 py-0.5 text-[10px] font-bold text-exito-oscuro">
                        COMPLETADO
                      </span>
                    )}
                  </div>

                  <p className="mt-0.5 text-xs leading-relaxed text-texto-suave sm:text-sm line-clamp-2">
                    {mod.description}
                  </p>

                  {/* Barra de progreso */}
                  {isAvailable && (
                    <div className="mt-3">
                      <div className="progress-bar-duo" style={{ height: 10 }}>
                        <div
                          className="fill bg-exito"
                          style={{ width: `${progress.percent}%` }}
                        />
                      </div>
                      <p className="mt-1 text-[10px] font-semibold text-texto-suave">
                        {progress.completed} / {progress.total} niveles
                      </p>
                    </div>
                  )}
                </div>

                {/* Flecha */}
                {isAvailable && (
                  <div className="shrink-0 text-borde">
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
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
