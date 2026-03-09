"use client";

import { useState } from "react";
import { MODULE_THEORIES } from "@/utils/constants";
import Button from "@/components/ui/Button";

interface TheorySectionProps {
  moduleId: string;
  onComplete: () => void;
  isCompleted: boolean;
}

export default function TheorySection({
  moduleId,
  onComplete,
  isCompleted,
}: TheorySectionProps) {
  const theory = MODULE_THEORIES[moduleId];
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = theory.sections.length;

  const isLastPage = currentPage === totalPages - 1;

  const handleNext = () => {
    if (isLastPage) {
      onComplete();
    } else {
      setCurrentPage((p) => p + 1);
    }
  };

  const handlePrev = () => {
    setCurrentPage((p) => Math.max(0, p - 1));
  };

  const section = theory.sections[currentPage];

  return (
    <div className="flex min-h-screen flex-col items-center bg-fondo px-3 py-6 md:px-4 md:py-8">
      {/* Header del módulo */}
      <div className="mb-6 w-full max-w-2xl md:mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">📖</span>
          <span className="rounded-full bg-resaltado/30 px-3 py-0.5 text-xs font-bold text-principal">
            TEORÍA
          </span>
        </div>
        <h1 className="text-2xl font-bold text-principal md:text-3xl">
          {theory.title}
        </h1>
        <p className="mt-1 text-base text-texto-suave md:mt-2 md:text-lg">
          {theory.description}
        </p>
      </div>

      {/* Barra de progreso de la teoría */}
      <div className="mb-6 w-full max-w-2xl md:mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-principal md:text-sm">
            Progreso de la teoría
          </span>
          <span className="text-xs font-semibold text-principal md:text-sm">
            {currentPage + 1} / {totalPages}
          </span>
        </div>
        <div className="h-3 w-full rounded-full bg-borde overflow-hidden md:h-4">
          <div
            className="h-full bg-resaltado transition-all duration-500"
            style={{
              width: `${((currentPage + 1) / totalPages) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Contenido de la sección */}
      <div className="w-full max-w-2xl">
        <div className="rounded-xl border-2 border-borde bg-blanco p-4 shadow-lg sm:rounded-2xl sm:p-6 md:p-8">
          {/* Icono y título de la sección */}
          <div className="flex items-center gap-3 mb-4 md:mb-6">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-resaltado/20 text-2xl md:h-14 md:w-14 md:text-3xl">
              {section.icon}
            </span>
            <h2 className="text-lg font-bold text-principal md:text-xl">
              {section.title}
            </h2>
          </div>

          {/* Contenido principal */}
          <div className="space-y-4 md:space-y-5">
            {section.content.map((block, i) => (
              <div key={i}>
                {block.type === "text" && (
                  <p className="text-sm leading-relaxed text-texto md:text-base">
                    {block.value}
                  </p>
                )}

                {block.type === "highlight" && (
                  <div className="rounded-lg border-2 border-resaltado bg-resaltado/10 p-3 md:p-4">
                    <p className="text-sm font-medium text-principal leading-relaxed md:text-base">
                      💡 {block.value}
                    </p>
                  </div>
                )}

                {block.type === "example" && (
                  <div className="rounded-lg border-2 border-exito bg-exito/10 p-3 md:p-4">
                    <p className="text-xs font-bold text-principal mb-1 md:text-sm">
                      Ejemplo:
                    </p>
                    <p className="text-sm text-texto leading-relaxed md:text-base">
                      {block.value}
                    </p>
                  </div>
                )}

                {block.type === "steps" && (
                  <div className="rounded-lg border-2 border-borde bg-fondo p-3 md:p-4">
                    <p className="text-xs font-bold text-principal mb-2 md:text-sm">
                      Pasos:
                    </p>
                    <ol className="space-y-2 list-none pl-0">
                      {block.items?.map((item, j) => (
                        <li
                          key={j}
                          className="flex items-start gap-2 text-sm text-texto md:text-base"
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-principal text-xs font-bold text-blanco mt-0.5">
                            {j + 1}
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                {block.type === "image-description" && (
                  <div className="rounded-lg border-2 border-borde bg-fondo/50 p-4 text-center md:p-6">
                    <span className="text-4xl md:text-5xl">{block.emoji}</span>
                    <p className="mt-2 text-xs text-texto-suave italic md:text-sm">
                      {block.value}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navegación */}
        <div className="mt-4 flex items-center justify-between sm:mt-6">
          <div>
            {currentPage > 0 && (
              <Button
                variant="secondary"
                aria-label="Ir a la sección anterior de la teoría"
                onClick={handlePrev}
              >
                ← Anterior
              </Button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {theory.sections.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                aria-label={`Ir a la sección ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentPage
                    ? "w-8 bg-principal"
                    : i < currentPage
                      ? "w-2.5 bg-exito"
                      : "w-2.5 bg-borde"
                }`}
              />
            ))}
          </div>

          <Button
            aria-label={
              isLastPage
                ? "Completar teoría e ir a la práctica"
                : "Ir a la siguiente sección"
            }
            onClick={handleNext}
          >
            {isLastPage ? "Ir a practicar 🚀" : "Siguiente →"}
          </Button>
        </div>

        {/* Botón para saltar si ya completó la teoría */}
        {isCompleted && (
          <div className="mt-4 text-center">
            <button
              onClick={onComplete}
              className="text-sm font-medium text-texto-suave underline hover:text-principal transition-colors"
              aria-label="Saltar la teoría e ir directamente a los niveles"
            >
              Ya leí la teoría, ir directo a los niveles →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
