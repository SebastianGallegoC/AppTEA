"use client";

import { useState, useCallback, useMemo } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  useDroppable,
  pointerWithin,
  rectIntersection,
  CollisionDetection,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Block, AnswerLine, ValidationResult } from "@/types";
import { LEVELS } from "@/utils/constants";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import StatusBanner from "@/components/ui/StatusBanner";

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// --- Draggable Block ---
function SortableBlock({
  block,
  zone,
  onClick,
}: {
  block: Block;
  zone: "pool" | "answer";
  onClick: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: block.id, data: { zone } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? undefined : transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`inline-flex cursor-grab select-none items-center rounded-lg border-2 px-4 py-2 text-sm font-mono font-semibold transition-all sm:text-base ${
        isDragging
          ? "border-resaltado bg-resaltado/30 shadow-xl scale-105 opacity-70"
          : zone === "answer"
            ? "border-principal bg-principal/10 text-principal hover:bg-principal/20"
            : "border-borde bg-blanco text-principal hover:border-principal hover:bg-fondo"
      } focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2`}
      {...attributes}
      {...listeners}
      aria-label={`Bloque: ${block.text}. ${zone === "pool" ? "Haz clic para agregar a la respuesta" : "Haz clic para quitar de la respuesta"}. También puedes arrastrarlo.`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {block.text}
    </div>
  );
}

// --- Overlay Block (shown while dragging) ---
function OverlayBlock({ block }: { block: Block }) {
  return (
    <div className="inline-flex cursor-grabbing items-center rounded-lg border-2 border-resaltado bg-resaltado/30 px-4 py-2 text-sm font-mono font-semibold shadow-xl sm:text-base">
      {block.text}
    </div>
  );
}

// --- Droppable Zone ---
function DroppableZone({
  id,
  children,
  label,
  isEmpty,
  emptyMessage,
  isActive,
}: {
  id: string;
  children: React.ReactNode;
  label: string;
  isEmpty: boolean;
  emptyMessage?: string;
  isActive?: boolean;
}) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const defaultMessage =
    id === "pool-zone"
      ? "Todos los bloques están en la respuesta"
      : "Arrastra o haz clic en los bloques para agregar aquí";

  return (
    <div
      ref={setNodeRef}
      aria-label={label}
      className={`min-h-[48px] rounded-xl border-2 border-dashed p-3 transition-colors ${
        isOver
          ? "border-resaltado bg-resaltado/10"
          : isActive
            ? "border-principal/50 bg-principal/5"
            : "border-borde bg-fondo/50"
      }`}
    >
      {isEmpty ? (
        <p className="text-center text-sm text-texto-suave italic py-1">
          {emptyMessage ?? defaultMessage}
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">{children}</div>
      )}
    </div>
  );
}

// --- Main Editor ---
interface BlockEditorProps {
  levelId: string;
  onResult: (result: ValidationResult | null) => void;
  onLevelComplete: () => void;
}

export default function BlockEditor({
  levelId,
  onResult,
  onLevelComplete,
}: BlockEditorProps) {
  const level = LEVELS.find((l) => l.id === levelId) ?? LEVELS[0];
  const { isSandboxMode, setSandboxMode, setCurrentLevel } = useAppStore();

  const allBlocks = level.availableBlocks ?? [];

  // Normalize lines: multi-line levels use answerLines, single-line use correctAnswer
  const lines: AnswerLine[] = useMemo(() => {
    if (level.answerLines && level.answerLines.length > 0) {
      return level.answerLines;
    }
    return [
      { label: "Tu respuesta", correctAnswer: level.correctAnswer ?? [] },
    ];
  }, [level.answerLines, level.correctAnswer]);

  const isMultiLine = lines.length > 1;

  const initialPool = useMemo(() => shuffleArray(allBlocks), [allBlocks]);

  const [poolBlocks, setPoolBlocks] = useState<Block[]>(initialPool);
  const [lineBlocks, setLineBlocks] = useState<Block[][]>(() =>
    lines.map(() => []),
  );
  const [activeLineIdx, setActiveLineIdx] = useState(0);
  const [activeBlock, setActiveBlock] = useState<Block | null>(null);
  const [hasVerified, setHasVerified] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [result, setResult] = useState<ValidationResult | null>(null);

  // Same module-filtered levels for navigation
  const moduleLevels = LEVELS.filter((l) => l.concept === level.concept);

  type ZoneLocation = { type: "pool" } | { type: "line"; index: number };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  // Custom collision detection
  const collisionDetection: CollisionDetection = useCallback((args) => {
    const pointerCollisions = pointerWithin(args);
    if (pointerCollisions.length > 0) return pointerCollisions;
    return rectIntersection(args);
  }, []);

  const clearVerification = useCallback(() => {
    if (hasVerified) {
      setHasVerified(false);
      setResult(null);
      onResult(null);
    }
  }, [hasVerified, onResult]);

  // Find which zone a block belongs to
  const findBlockLocation = useCallback(
    (blockId: string): ZoneLocation | null => {
      if (poolBlocks.some((b) => b.id === blockId)) return { type: "pool" };
      for (let i = 0; i < lineBlocks.length; i++) {
        if (lineBlocks[i].some((b) => b.id === blockId))
          return { type: "line", index: i };
      }
      return null;
    },
    [poolBlocks, lineBlocks],
  );

  // Resolve a drop target id to a zone location
  const resolveOverLocation = useCallback(
    (overId: string): ZoneLocation | null => {
      if (overId === "pool-zone") return { type: "pool" };
      const lineMatch = overId.match(/^answer-line-(\d+)$/);
      if (lineMatch) return { type: "line", index: parseInt(lineMatch[1]) };
      return findBlockLocation(overId);
    },
    [findBlockLocation],
  );

  // Click: add block from pool to the active line
  const addToLine = useCallback(
    (blockId: string) => {
      const block = poolBlocks.find((b) => b.id === blockId);
      if (!block) return;
      setPoolBlocks((prev) => prev.filter((b) => b.id !== blockId));
      setLineBlocks((prev) => {
        const updated = prev.map((line) => [...line]);
        updated[activeLineIdx] = [...updated[activeLineIdx], block];
        return updated;
      });
      clearVerification();
    },
    [poolBlocks, activeLineIdx, clearVerification],
  );

  // Click: remove block from a specific line back to pool
  const removeFromLine = useCallback(
    (blockId: string, lineIdx: number) => {
      const block = lineBlocks[lineIdx]?.find((b) => b.id === blockId);
      if (!block) return;
      setLineBlocks((prev) => {
        const updated = prev.map((line) => [...line]);
        updated[lineIdx] = updated[lineIdx].filter((b) => b.id !== blockId);
        return updated;
      });
      setPoolBlocks((prev) => [...prev, block]);
      clearVerification();
    },
    [lineBlocks, clearVerification],
  );

  const handleDragStart = useCallback(
    (event: DragStartEvent) => {
      const id = event.active.id as string;
      let block = poolBlocks.find((b) => b.id === id);
      if (!block) {
        for (const line of lineBlocks) {
          block = line.find((b) => b.id === id);
          if (block) break;
        }
      }
      setActiveBlock(block ?? null);
    },
    [poolBlocks, lineBlocks],
  );

  // Cross-container moves in real time
  const handleDragOver = useCallback(
    (event: DragOverEvent) => {
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;
      const source = findBlockLocation(activeId);
      const target = resolveOverLocation(overId);

      if (!source || !target) return;
      if (
        source.type === target.type &&
        (source.type === "pool" ||
          (source.type === "line" &&
            target.type === "line" &&
            source.index === target.index))
      )
        return;

      if (source.type === "pool" && target.type === "line") {
        const block = poolBlocks.find((b) => b.id === activeId);
        if (!block) return;
        setPoolBlocks((prev) => prev.filter((b) => b.id !== activeId));
        setLineBlocks((prev) => {
          const updated = prev.map((line) => [...line]);
          const overIndex = updated[target.index].findIndex(
            (b) => b.id === overId,
          );
          if (overIndex === -1) {
            updated[target.index].push(block);
          } else {
            updated[target.index].splice(overIndex, 0, block);
          }
          return updated;
        });
      } else if (source.type === "line" && target.type === "pool") {
        const block = lineBlocks[source.index]?.find((b) => b.id === activeId);
        if (!block) return;
        setLineBlocks((prev) => {
          const updated = prev.map((line) => [...line]);
          updated[source.index] = updated[source.index].filter(
            (b) => b.id !== activeId,
          );
          return updated;
        });
        setPoolBlocks((prev) => [...prev, block]);
      } else if (source.type === "line" && target.type === "line") {
        const block = lineBlocks[source.index]?.find((b) => b.id === activeId);
        if (!block) return;
        setLineBlocks((prev) => {
          const updated = prev.map((line) => [...line]);
          updated[source.index] = updated[source.index].filter(
            (b) => b.id !== activeId,
          );
          const overIndex = updated[target.index].findIndex(
            (b) => b.id === overId,
          );
          if (overIndex === -1) {
            updated[target.index].push(block);
          } else {
            updated[target.index].splice(overIndex, 0, block);
          }
          return updated;
        });
      }
      clearVerification();
    },
    [
      poolBlocks,
      lineBlocks,
      findBlockLocation,
      resolveOverLocation,
      clearVerification,
    ],
  );

  // Within-container reorder
  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      setActiveBlock(null);
      const { active, over } = event;
      if (!over) return;

      const activeId = active.id as string;
      const overId = over.id as string;
      if (activeId === overId) return;

      const source = findBlockLocation(activeId);
      const target = resolveOverLocation(overId);

      if (
        source?.type === "line" &&
        target?.type === "line" &&
        source.index === target.index
      ) {
        setLineBlocks((prev) => {
          const updated = prev.map((line) => [...line]);
          const blocks = updated[source.index];
          const oldIdx = blocks.findIndex((b) => b.id === activeId);
          const newIdx = blocks.findIndex((b) => b.id === overId);
          if (oldIdx === -1 || newIdx === -1) return prev;
          updated[source.index] = arrayMove(blocks, oldIdx, newIdx);
          return updated;
        });
        clearVerification();
      }
    },
    [findBlockLocation, resolveOverLocation, clearVerification],
  );

  const totalAnswerBlocks = lineBlocks.reduce(
    (sum, line) => sum + line.length,
    0,
  );

  const handleVerify = useCallback(() => {
    setIsValidating(true);
    setResult(null);

    setTimeout(() => {
      // Build ID→text map to validate by visible text, not by internal ID.
      // This way interchangeable blocks (e.g. b-let1 / b-let2) are accepted
      // in any position that needs "let".
      const idToText = new Map<string, string>();
      for (const block of allBlocks) {
        idToText.set(block.id, block.text);
      }

      let firstError: string | null = null;
      for (let i = 0; i < lines.length; i++) {
        const userTexts = (lineBlocks[i] ?? []).map((b) => b.text);
        const expectedTexts = lines[i].correctAnswer.map(
          (id) => idToText.get(id) ?? id,
        );

        if (userTexts.length === 0) {
          firstError = isMultiLine
            ? `La línea "${lines[i].label}" está vacía. Arrastra los bloques correctos.`
            : "No has colocado ningún bloque en la respuesta.";
          break;
        }
        if (
          userTexts.length !== expectedTexts.length ||
          !userTexts.every((txt, j) => txt === expectedTexts[j])
        ) {
          firstError = isMultiLine
            ? `La línea "${lines[i].label}" no es correcta. Revisa los bloques y su orden.`
            : userTexts.length !== expectedTexts.length
              ? `Tu respuesta tiene ${userTexts.length} bloques pero se necesitan ${expectedTexts.length}. Revisa cuáles faltan o sobran.`
              : "Algunos bloques no están en la posición correcta. Revisa el orden de tu respuesta.";
          break;
        }
      }

      const isCorrect = firstError === null;
      const validationResult: ValidationResult = isCorrect
        ? {
            isCorrect: true,
            message:
              "¡Excelente! Los bloques están en el orden correcto. Has construido la instrucción correctamente.",
            firstErrorIndex: null,
          }
        : {
            isCorrect: false,
            message: firstError!,
            firstErrorIndex: 0,
          };

      setHasVerified(true);
      setResult(validationResult);
      setIsValidating(false);
      onResult(validationResult);

      if (validationResult.isCorrect) {
        setIsComplete(true);
        onLevelComplete();
      }
    }, 1000);
  }, [allBlocks, lineBlocks, lines, isMultiLine, onResult, onLevelComplete]);

  const handleReset = useCallback(() => {
    setPoolBlocks(shuffleArray(allBlocks));
    setLineBlocks(lines.map(() => []));
    setActiveLineIdx(0);
    setHasVerified(false);
    setIsComplete(false);
    setResult(null);
    onResult(null);
    setSandboxMode(false);
  }, [allBlocks, lines, onResult, setSandboxMode]);

  const handleSandbox = useCallback(() => {
    setSandboxMode(true);
    setHasVerified(false);
    setResult(null);
    onResult(null);
  }, [setSandboxMode, onResult]);

  const handleNextLevel = useCallback(() => {
    const currentIndex = moduleLevels.findIndex((l) => l.id === levelId);
    if (currentIndex < moduleLevels.length - 1) {
      const nextLevel = moduleLevels[currentIndex + 1];
      setCurrentLevel(nextLevel.id);
    }
  }, [levelId, moduleLevels, setCurrentLevel]);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="text-xl font-semibold text-principal">{level.title}</h1>
        <p className="mt-1 text-sm text-texto-suave">{level.description}</p>
        {isSandboxMode && (
          <p className="mt-2 rounded-lg border border-resaltado bg-resaltado/20 p-2 text-sm text-principal">
            Modo libre activo: puedes mover los bloques sin presión. No hay
            verificación.
          </p>
        )}
      </header>

      {/* Prompt / Case */}
      <div className="rounded-xl border-2 border-principal/30 bg-principal/5 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-texto-suave mb-1">
          Instrucción
        </p>
        <p className="text-base font-medium text-principal sm:text-lg">
          {level.prompt}
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={collisionDetection}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {/* Available Blocks Pool */}
        <div>
          <h2 className="mb-2 text-sm font-semibold text-principal">
            Bloques disponibles
          </h2>
          <SortableContext
            items={poolBlocks.map((b) => b.id)}
            strategy={horizontalListSortingStrategy}
          >
            <DroppableZone
              id="pool-zone"
              label="Zona de bloques disponibles"
              isEmpty={poolBlocks.length === 0}
            >
              {poolBlocks.map((block) => (
                <SortableBlock
                  key={block.id}
                  block={block}
                  zone="pool"
                  onClick={() => addToLine(block.id)}
                />
              ))}
            </DroppableZone>
          </SortableContext>
        </div>

        {/* Answer Zone(s) */}
        <div>
          <h2 className="mb-2 text-sm font-semibold text-principal">
            Tu respuesta
          </h2>

          {isMultiLine && (
            <div className="mb-3 flex flex-wrap gap-2">
              {lines.map((line, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`rounded-lg border-2 px-3 py-1 text-xs font-semibold transition-colors ${
                    activeLineIdx === idx
                      ? "border-principal bg-principal text-blanco"
                      : "border-borde bg-blanco text-principal hover:border-principal/60"
                  }`}
                  onClick={() => setActiveLineIdx(idx)}
                  aria-label={`Seleccionar línea ${idx + 1}: ${line.label}`}
                  aria-pressed={activeLineIdx === idx}
                >
                  Línea {idx + 1}: {line.label}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-3">
            {lines.map((line, lineIdx) => (
              <div key={lineIdx}>
                {isMultiLine && (
                  <p className="mb-1 text-xs font-medium text-texto-suave">
                    Línea {lineIdx + 1}: {line.label}
                  </p>
                )}
                <SortableContext
                  items={(lineBlocks[lineIdx] ?? []).map((b) => b.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <DroppableZone
                    id={`answer-line-${lineIdx}`}
                    label={`Zona de respuesta${isMultiLine ? ` - ${line.label}` : ""}. Arrastra los bloques aquí.`}
                    isEmpty={(lineBlocks[lineIdx] ?? []).length === 0}
                    emptyMessage={
                      isMultiLine
                        ? `Arrastra bloques para: ${line.label}`
                        : undefined
                    }
                    isActive={isMultiLine && activeLineIdx === lineIdx}
                  >
                    {(lineBlocks[lineIdx] ?? []).map((block) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        zone="answer"
                        onClick={() => removeFromLine(block.id, lineIdx)}
                      />
                    ))}
                  </DroppableZone>
                </SortableContext>
              </div>
            ))}
          </div>
        </div>

        <DragOverlay>
          {activeBlock ? <OverlayBlock block={activeBlock} /> : null}
        </DragOverlay>
      </DndContext>

      {/* Validation feedback */}
      {isValidating && (
        <div role="status" aria-live="polite" className="mt-2">
          <StatusBanner
            type="info"
            message="Validando tu respuesta..."
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

      {/* Level Complete */}
      {isComplete && !isSandboxMode && (
        <div
          className="mt-4 rounded-2xl border-4 border-exito bg-gradient-to-br from-exito/30 to-exito/10 p-6 text-center shadow-lg"
          role="status"
          aria-live="polite"
        >
          <div className="mb-4 text-6xl animate-bounce">🎉</div>
          <h3 className="mb-2 text-2xl font-bold text-principal">
            ¡Nivel completado!
          </h3>
          <p className="mb-4 text-sm text-principal">
            Construiste correctamente la instrucción usando{" "}
            <strong>{level.concept}</strong>.
          </p>
          <div className="mb-6 mx-auto max-w-xs">
            <div className="flex items-center justify-center gap-2 text-sm font-semibold text-principal mb-2">
              <span>+1 nivel completado</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              aria-label="Continuar al siguiente nivel"
              onClick={handleNextLevel}
              disabled={
                moduleLevels.findIndex((l) => l.id === levelId) >=
                moduleLevels.length - 1
              }
            >
              {moduleLevels.findIndex((l) => l.id === levelId) >=
              moduleLevels.length - 1
                ? "🏆 Módulo completado"
                : "Siguiente nivel →"}
            </Button>
            <Button
              variant="secondary"
              aria-label="Practicar más en este nivel"
              onClick={handleSandbox}
            >
              Practicar más
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 pt-2">
        {!isSandboxMode && !isComplete && (
          <Button
            aria-label="Verificar si los bloques están en el orden correcto"
            onClick={handleVerify}
            disabled={isValidating || totalAnswerBlocks === 0}
          >
            {isValidating ? "Validando..." : "Verificar respuesta"}
          </Button>
        )}
        <Button
          variant="secondary"
          aria-label="Devolver todos los bloques al estado inicial"
          onClick={handleReset}
          disabled={isValidating}
        >
          Volver al estado inicial
        </Button>
      </div>
    </div>
  );
}
