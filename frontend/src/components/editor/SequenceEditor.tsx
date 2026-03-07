"use client";

import { useState, useCallback, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Step, ValidationResult } from "@/types";
import { validateSequence } from "@/hooks/useValidator";
import { LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import StatusBanner from "@/components/ui/StatusBanner";
import SortableStep from "./SortableStep";

function shuffleArray(array: Step[]): Step[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  const isCorrect = shuffled.every((step, idx) => step.order === idx + 1);
  if (isCorrect && shuffled.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

interface SequenceEditorProps {
  onResult: (result: ValidationResult | null) => void;
  onLevelComplete: () => void;
}

export default function SequenceEditor({
  onResult,
  onLevelComplete,
}: SequenceEditorProps) {
  const level = LEVELS[0];
  const { isSandboxMode, setSandboxMode } = useAppStore();

  const initialSteps = useMemo(() => shuffleArray(level.steps), [level.steps]);
  const [steps, setSteps] = useState<Step[]>(initialSteps);
  const [hasVerified, setHasVerified] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [errorStepId, setErrorStepId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;

      if (over && active.id !== over.id) {
        setSteps((current) => {
          const oldIndex = current.findIndex((s) => s.id === active.id);
          const newIndex = current.findIndex((s) => s.id === over.id);
          return arrayMove(current, oldIndex, newIndex);
        });

        if (hasVerified) {
          setHasVerified(false);
          setResult(null);
          setErrorStepId(null);
          onResult(null);
        }
      }
    },
    [hasVerified, onResult],
  );

  const moveStep = useCallback(
    (index: number, direction: "up" | "down") => {
      setSteps((current) => {
        const newIndex = direction === "up" ? index - 1 : index + 1;
        if (newIndex < 0 || newIndex >= current.length) return current;
        return arrayMove(current, index, newIndex);
      });

      if (hasVerified) {
        setHasVerified(false);
        setResult(null);
        setErrorStepId(null);
        onResult(null);
      }
    },
    [hasVerified, onResult],
  );

  const handleVerify = useCallback(() => {
    setIsValidating(true);
    setResult(null);
    setErrorStepId(null);

    setTimeout(() => {
      const userOrder = steps.map((s) => s.id);
      const validationResult = validateSequence(userOrder, level.steps);

      setHasVerified(true);
      setResult(validationResult);
      setIsValidating(false);
      onResult(validationResult);

      if (validationResult.isCorrect) {
        setIsComplete(true);
        setErrorStepId(null);
        onLevelComplete();
      } else if (validationResult.firstErrorIndex !== null) {
        const errorStep = steps[validationResult.firstErrorIndex];
        setErrorStepId(errorStep.id);
      }
    }, 1000);
  }, [steps, level.steps, onResult, onLevelComplete]);

  const handleReset = useCallback(() => {
    const newShuffled = shuffleArray(level.steps);
    setSteps(newShuffled);
    setHasVerified(false);
    setIsComplete(false);
    setResult(null);
    setErrorStepId(null);
    onResult(null);
    setSandboxMode(false);
  }, [level.steps, onResult, setSandboxMode]);

  const handleSandbox = useCallback(() => {
    setSandboxMode(true);
    setHasVerified(false);
    setResult(null);
    setErrorStepId(null);
    onResult(null);
  }, [setSandboxMode, onResult]);

  const stepIds = steps.map((s) => s.id);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-semibold text-principal">{level.title}</h1>
        <p className="mt-1 text-sm text-texto-suave">{level.description}</p>
        {isSandboxMode && (
          <p className="mt-2 rounded-lg border border-resaltado bg-resaltado/20 p-2 text-sm text-principal">
            Modo libre activo: puedes reordenar los pasos sin presión. No hay
            verificación.
          </p>
        )}
      </header>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={stepIds} strategy={verticalListSortingStrategy}>
          <ol
            aria-label="Pasos de la secuencia para ordenar"
            className="list-none space-y-2 pl-0"
          >
            {steps.map((step, index) => (
              <SortableStep
                key={step.id}
                step={step}
                position={index + 1}
                totalSteps={steps.length}
                hasError={errorStepId === step.id}
                onMoveUp={() => moveStep(index, "up")}
                onMoveDown={() => moveStep(index, "down")}
              />
            ))}
          </ol>
        </SortableContext>
      </DndContext>

      {isValidating && (
        <div role="status" aria-live="polite" className="mt-2">
          <StatusBanner
            type="info"
            message="Validando la secuencia..."
            visible={true}
          />
        </div>
      )}

      {result && !isValidating && (
        <div role="status" aria-live="polite" className="mt-2">
          <StatusBanner
            type={result.isCorrect ? "success" : "error"}
            message={result.message}
            visible={true}
          />
        </div>
      )}

      {isComplete && !isSandboxMode && (
        <div
          className="mt-2 rounded-lg border border-exito bg-exito/20 p-4"
          role="status"
          aria-live="polite"
        >
          <h3 className="mb-2 font-semibold text-principal">
            Nivel completado
          </h3>
          <p className="mb-3 text-sm text-principal">
            Lograste ordenar la secuencia usando {steps.length} pasos. Usaste:{" "}
            {level.concept}.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button
              aria-label="Ir al siguiente nivel para continuar aprendiendo"
              onClick={() => alert("Próximo nivel: aún no implementado")}
            >
              Ir al siguiente nivel
            </Button>
            <Button
              variant="secondary"
              aria-label="Seguir experimentando libremente en este nivel sin verificación"
              onClick={handleSandbox}
            >
              Seguir experimentando libremente
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap gap-3 pt-2">
        {!isSandboxMode && !isComplete && (
          <Button
            aria-label="Verificar si la secuencia está en el orden correcto"
            onClick={handleVerify}
            disabled={isValidating}
          >
            {isValidating ? "Validando..." : "Verificar secuencia"}
          </Button>
        )}

        <Button
          variant="secondary"
          aria-label="Volver al estado inicial y mezclar los pasos de nuevo"
          onClick={handleReset}
          disabled={isValidating}
        >
          Volver al estado inicial
        </Button>
      </div>
    </div>
  );
}
