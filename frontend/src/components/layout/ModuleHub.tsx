"use client";

import { MODULES } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";
import { Module } from "@/types";

interface ModuleHubProps {
  onModuleSelect: (moduleId: string) => void;
}

export default function ModuleHub({ onModuleSelect }: ModuleHubProps) {
  const { completedLevels } = useAppStore();

  const getModuleProgress = (mod: Module) => {
    if (!mod.isAvailable || mod.totalLevels === 0) return 0;
    // For now only Module 1 levels are in completedLevels
    const completed = completedLevels.length;
    return Math.round((completed / mod.totalLevels) * 100);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8 sm:px-6 md:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Título y descripción */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-principal sm:text-3xl">
            Módulos de aprendizaje
          </h1>
          <p className="mt-2 text-sm text-texto-suave sm:text-base">
            Selecciona un módulo para comenzar a aprender programación paso a
            paso.
          </p>
        </div>

        {/* Grid de módulos */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
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
                    ? `Módulo: ${mod.title}. ${mod.description}`
                    : `Módulo: ${mod.title}. Próximamente.`
                }
                className={`group relative flex flex-col rounded-lg border-2 p-5 text-left transition-all sm:p-6
                  ${
                    isAvailable
                      ? "border-borde bg-blanco cursor-pointer hover:border-principal hover:shadow-md focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
                      : "border-borde/60 bg-blanco/60 cursor-not-allowed opacity-70"
                  }`}
              >
                {/* Badge Próximamente */}
                {!isAvailable && (
                  <span className="absolute right-3 top-3 rounded-full bg-texto-suave/15 px-3 py-1 text-xs font-semibold text-texto-suave">
                    Próximamente
                  </span>
                )}

                {/* Icono */}
                <span className="mb-3 text-4xl" role="img" aria-hidden="true">
                  {mod.icon}
                </span>

                {/* Título */}
                <h2
                  className={`text-lg font-bold sm:text-xl ${isAvailable ? "text-principal" : "text-texto-suave"}`}
                >
                  {mod.title}
                </h2>

                {/* Descripción */}
                <p className="mt-1 text-sm leading-relaxed text-texto-suave">
                  {mod.description}
                </p>

                {/* Barra de progreso (solo módulos disponibles) */}
                {isAvailable && (
                  <div className="mt-4">
                    <div className="mb-1 flex items-center justify-between text-xs text-texto-suave">
                      <span>Progreso</span>
                      <span className="font-semibold">{progress}%</span>
                    </div>
                    <div className="h-2.5 w-full overflow-hidden rounded-full bg-borde">
                      <div
                        className="h-full rounded-full bg-exito transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Indicador de niveles */}
                {isAvailable && (
                  <p className="mt-3 text-xs font-medium text-texto-suave">
                    {completedLevels.length} / {mod.totalLevels} niveles
                    completados
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
