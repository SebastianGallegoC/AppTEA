"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ValidationResult } from "@/types";
import { LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";
import { useProgress } from "@/hooks/useProgress";
import Header from "@/components/layout/Header";
import LevelMap from "@/components/layout/LevelMap";
import SequenceEditor from "@/components/editor/SequenceEditor";
import TheorySection from "@/components/theory/TheorySection";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import { GLOSSARY } from "@/utils/constants";

export default function Home() {
  const {
    currentUser,
    currentLevelId,
    completeLevel,
    theoryCompleted,
    completeTheory,
  } = useAppStore();
  const { markLevelComplete } = useProgress(currentUser);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [viewMode, setViewMode] = useState<"theory" | "map" | "exercise">(
    theoryCompleted ? "map" : "theory",
  );
  const isInitialMount = useRef(true);

  // Reiniciar estado cuando cambia el nivel
  useEffect(() => {
    setResult(null);
    setLevelCompleted(false);
  }, [currentLevelId]);

  // Cambiar a vista de ejercicio cuando se selecciona un nivel (excepto en carga inicial)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (currentLevelId) {
      setViewMode("exercise");
    }
  }, [currentLevelId]);

  const currentLevel = LEVELS.find((l) => l.id === currentLevelId) ?? LEVELS[0];

  const handleResult = useCallback((newResult: ValidationResult | null) => {
    setResult(newResult);
  }, []);

  const handleLevelComplete = useCallback(() => {
    setLevelCompleted(true);
    completeLevel(currentLevelId);
    markLevelComplete(currentLevelId);
  }, [currentLevelId, completeLevel, markLevelComplete]);

  const handleBackToMap = useCallback(() => {
    setViewMode("map");
  }, []);

  const handleTheoryComplete = useCallback(() => {
    completeTheory();
    setViewMode("map");
  }, [completeTheory]);

  const handleLevelSelect = useCallback(() => {
    setViewMode("exercise");
  }, []);

  return (
    <div className="min-h-screen bg-fondo">
      {/* Header tipo Duolingo */}
      <Header
        onBackToMap={
          viewMode === "exercise"
            ? handleBackToMap
            : viewMode === "map"
              ? () => setViewMode("theory")
              : undefined
        }
        showProgress={viewMode === "exercise"}
      />

      {/* Vista de Teoría */}
      {viewMode === "theory" && (
        <TheorySection
          onComplete={handleTheoryComplete}
          isCompleted={theoryCompleted}
        />
      )}

      {/* Vista de Mapa (tipo Duolingo) */}
      {viewMode === "map" && <LevelMap onLevelSelect={handleLevelSelect} />}

      {/* Vista de Ejercicio (centrada, tipo Duolingo) */}
      {viewMode === "exercise" && (
        <main className="mx-auto max-w-4xl px-3 py-4 sm:px-4 sm:py-6 md:py-8">
          {/* Card del ejercicio */}
          <div className="rounded-xl border-2 border-borde bg-blanco p-3 shadow-lg sm:p-5 sm:rounded-2xl md:p-8">
            <SequenceEditor
              key={currentLevelId}
              levelId={currentLevelId}
              onResult={handleResult}
              onLevelComplete={handleLevelComplete}
            />
          </div>

          {/* Panel de información (abajo del ejercicio) */}
          <div className="mt-4 rounded-xl border-2 border-borde bg-blanco p-4 shadow-lg sm:mt-6 sm:rounded-2xl sm:p-6">
            <h2 className="mb-4 text-lg font-semibold text-principal">
              💡 Concepto: Secuenciación
            </h2>

            <div className="rounded-lg border border-resaltado bg-resaltado/10 p-4 mb-4">
              <p className="text-sm text-texto-suave leading-relaxed">
                {GLOSSARY["Secuenciación"]}
              </p>
            </div>

            <h3 className="mb-3 text-base font-semibold text-principal">
              📋 Instrucciones
            </h3>
            <ol className="space-y-2 list-decimal pl-5 text-sm text-texto-suave">
              <li>Ordena los pasos usando los botones de Subir/Bajar.</li>
              <li>También puedes arrastrar los pasos con el ratón.</li>
              <li>
                Presiona &quot;Verificar secuencia&quot; cuando estés listo.
              </li>
              <li>
                Si necesitas empezar de nuevo, usa &quot;Volver al estado
                inicial&quot;.
              </li>
            </ol>
          </div>
        </main>
      )}
    </div>
  );
}
