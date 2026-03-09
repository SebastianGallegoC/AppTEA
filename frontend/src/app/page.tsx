"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { ValidationResult } from "@/types";
import { LEVELS, MODULES, GLOSSARY } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";
import { useProgress } from "@/hooks/useProgress";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import RightPanel from "@/components/layout/RightPanel";
import LevelMap from "@/components/layout/LevelMap";
import ModuleHub from "@/components/layout/ModuleHub";
import SequenceEditor from "@/components/editor/SequenceEditor";
import BlockEditor from "@/components/editor/BlockEditor";
import TheorySection from "@/components/theory/TheorySection";

export default function Home() {
  const {
    currentUser,
    currentLevelId,
    completeLevel,
    theoryCompletedModules,
    completeTheory,
    currentModuleId,
    setCurrentModule,
    setCurrentLevel,
    isDarkMode,
  } = useAppStore();
  const { markLevelComplete } = useProgress(currentUser);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const currentModule = MODULES.find((m) => m.id === currentModuleId);
  const moduleConcept = currentModule?.concept ?? "";

  const [result, setResult] = useState<ValidationResult | null>(null);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const isTheoryDone = currentModuleId
    ? theoryCompletedModules.includes(currentModuleId)
    : false;
  const [viewMode, setViewMode] = useState<
    "hub" | "theory" | "map" | "exercise"
  >(currentModuleId ? (isTheoryDone ? "map" : "theory") : "hub");
  const isInitialMount = useRef(true);
  const isModuleEntryRef = useRef(false);

  useEffect(() => {
    setResult(null);
    setLevelCompleted(false);
  }, [currentLevelId]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (isModuleEntryRef.current) {
      isModuleEntryRef.current = false;
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

  const handleBackToHub = useCallback(() => {
    setCurrentModule("");
    setViewMode("hub");
  }, [setCurrentModule]);

  const handleModuleSelect = useCallback(
    (moduleId: string) => {
      setCurrentModule(moduleId);
      const mod = MODULES.find((m) => m.id === moduleId);
      if (mod) {
        const modLevels = LEVELS.filter((l) => l.concept === mod.concept);
        if (modLevels.length > 0) {
          isModuleEntryRef.current = true;
          setCurrentLevel(modLevels[0].id);
        }
      }
      const done = theoryCompletedModules.includes(moduleId);
      setViewMode(done ? "map" : "theory");
    },
    [setCurrentModule, setCurrentLevel, theoryCompletedModules],
  );

  const handleTheoryComplete = useCallback(() => {
    completeTheory(currentModuleId);
    setViewMode("map");
  }, [completeTheory, currentModuleId]);

  const handleLevelSelect = useCallback(() => {
    setViewMode("exercise");
  }, []);

  const handleSidebarNavigate = useCallback(
    (view: "hub" | "theory" | "map" | "exercise") => {
      if (view === "hub") {
        handleBackToHub();
      } else {
        setViewMode(view);
      }
    },
    [handleBackToHub],
  );

  return (
    <div className="min-h-screen bg-fondo">
      {/* Sidebar */}
      <Sidebar
        currentView={viewMode}
        onNavigate={handleSidebarNavigate}
        onBackToHub={handleBackToHub}
      />

      {/* Right Panel (estadísticas) */}
      <RightPanel />

      {/* Header top bar */}
      <Header
        onBackToMap={
          viewMode === "exercise"
            ? handleBackToMap
            : viewMode === "map" || viewMode === "theory"
              ? handleBackToHub
              : undefined
        }
        showProgress={viewMode === "exercise"}
      />

      {/* Contenido principal con offset para sidebar */}
      <div className="lg:pl-56 xl:pr-72 pb-20 lg:pb-0">
        {/* Vista de Hub */}
        {viewMode === "hub" && (
          <ModuleHub onModuleSelect={handleModuleSelect} />
        )}

        {/* Vista de Teoría */}
        {viewMode === "theory" && (
          <TheorySection
            moduleId={currentModuleId}
            onComplete={handleTheoryComplete}
            isCompleted={isTheoryDone}
          />
        )}

        {/* Vista de Mapa */}
        {viewMode === "map" && (
          <LevelMap
            onLevelSelect={handleLevelSelect}
            onReviewTheory={() => setViewMode("theory")}
          />
        )}

        {/* Vista de Ejercicio */}
        {viewMode === "exercise" && (
          <main className="mx-auto max-w-7xl px-3 py-4 sm:px-4 sm:py-6 md:py-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
              {/* Card del ejercicio */}
              <div className="card-duo p-3 sm:p-5 md:p-8 lg:flex-1">
                {currentLevel.mode === "blocks" ? (
                  <BlockEditor
                    key={currentLevelId}
                    levelId={currentLevelId}
                    onResult={handleResult}
                    onLevelComplete={handleLevelComplete}
                  />
                ) : (
                  <SequenceEditor
                    key={currentLevelId}
                    levelId={currentLevelId}
                    onResult={handleResult}
                    onLevelComplete={handleLevelComplete}
                  />
                )}
              </div>

              {/* Panel de información */}
              <div className="card-duo p-4 sm:p-5 lg:w-72 lg:shrink-0 lg:self-start">
                <div className="flex items-center gap-2 mb-4">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-resaltado/20 text-lg">
                    💡
                  </span>
                  <h2 className="text-base font-bold text-principal">
                    {moduleConcept}
                  </h2>
                </div>

                <div className="rounded-xl border-2 border-resaltado/50 bg-resaltado/10 p-3 mb-4">
                  <p className="text-sm text-texto-suave leading-relaxed">
                    {GLOSSARY[moduleConcept] ?? ""}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-exito/15 text-lg">
                    📋
                  </span>
                  <h3 className="text-sm font-bold text-principal">
                    Instrucciones
                  </h3>
                </div>
                {currentLevel.mode === "blocks" ? (
                  <ol className="space-y-2 list-decimal pl-5 text-sm text-texto-suave">
                    <li>Lee la instrucción que se muestra en el recuadro.</li>
                    <li>
                      Haz clic o arrastra los bloques correctos a la zona de
                      respuesta.
                    </li>
                    <li>
                      Ordena los bloques para formar la instrucción correcta.
                    </li>
                    <li>
                      Presiona &quot;Verificar respuesta&quot; cuando estés
                      listo.
                    </li>
                    <li>
                      Si necesitas empezar de nuevo, usa &quot;Volver al estado
                      inicial&quot;.
                    </li>
                  </ol>
                ) : (
                  <ol className="space-y-2 list-decimal pl-5 text-sm text-texto-suave">
                    <li>Ordena los pasos usando los botones de Subir/Bajar.</li>
                    <li>También puedes arrastrar los pasos con el ratón.</li>
                    <li>
                      Presiona &quot;Verificar secuencia&quot; cuando estés
                      listo.
                    </li>
                    <li>
                      Si necesitas empezar de nuevo, usa &quot;Volver al estado
                      inicial&quot;.
                    </li>
                  </ol>
                )}
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
