"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Step } from "@/types";
import Button from "@/components/ui/Button";

interface SortableStepProps {
  step: Step;
  position: number;
  totalSteps: number;
  hasError: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

export default function SortableStep({
  step,
  position,
  totalSteps,
  hasError,
  onMoveUp,
  onMoveDown,
}: SortableStepProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: step.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const isFirst = position === 1;
  const isLast = position === totalSteps;

  return (
    <li
      ref={setNodeRef}
      style={style}
      role="listitem"
      aria-roledescription="elemento reordenable"
      aria-label={`Paso: ${step.text}. Posición ${position} de ${totalSteps}. Usa los botones de subir o bajar, o arrastra con el ratón.`}
      className={`flex items-center gap-2 rounded-lg border p-3 text-base text-principal ${
        isDragging
          ? "border-resaltado bg-resaltado/10 opacity-80"
          : hasError
            ? "border-error bg-error/20"
            : "border-borde bg-blanco"
      }`}
    >
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Arrastrar el paso: ${step.text}`}
        className="flex h-9 shrink-0 cursor-grab items-center justify-center rounded-md border border-borde bg-fondo px-2 text-xs font-medium text-texto-suave hover:bg-principal hover:text-blanco focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
      >
        Arrastrar
      </button>

      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-principal text-xs font-semibold text-blanco">
        {position}
      </span>

      <span className="flex-1">{step.text}</span>

      <div className="flex shrink-0 flex-col gap-1">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label={`Subir el paso ${position} una posición arriba`}
          className="flex h-7 w-16 items-center justify-center rounded border border-borde bg-blanco text-xs font-medium text-principal hover:bg-fondo disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
        >
          ▲ Subir
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label={`Bajar el paso ${position} una posición abajo`}
          className="flex h-7 w-16 items-center justify-center rounded border border-borde bg-blanco text-xs font-medium text-principal hover:bg-fondo disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2"
        >
          ▼ Bajar
        </button>
      </div>
    </li>
  );
}
