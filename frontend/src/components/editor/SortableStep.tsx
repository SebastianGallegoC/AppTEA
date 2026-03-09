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
}

// Iconos geométricos para identificación visual rápida
const POSITION_ICONS = ["●", "■", "▲", "◆", "★", "⬢", "◉", "▼"];

// Colores de acento para el borde izquierdo (suaves y de baja estimulación)
const BORDER_COLORS = [
  "#93C5FD", // blue-300
  "#86EFAC", // green-300
  "#C4B5FD", // purple-300
  "#FCD34D", // amber-300
  "#F9A8D4", // pink-300
  "#5EEAD4", // teal-300
  "#A5B4FC", // indigo-300
  "#FDA4AF", // rose-300
];

// Fondos alternados sutiles
const getBackgroundStyle = (index: number): string => {
  // Alterna entre fondo blanco y fondo muy suave
  return index % 2 === 0 ? "bg-blanco" : "bg-fondo";
};

export default function SortableStep({
  step,
  position,
  totalSteps,
  hasError,
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
    transition: isDragging ? undefined : transition,
  };

  const isFirst = position === 1;
  const isLast = position === totalSteps;

  // Usar el índice 0-based para los estilos
  const styleIndex = position - 1;
  const positionIcon = POSITION_ICONS[styleIndex % POSITION_ICONS.length];
  const borderColor = BORDER_COLORS[styleIndex % BORDER_COLORS.length];
  const bgStyle = getBackgroundStyle(styleIndex);

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...style,
        borderLeftColor: isDragging
          ? "#d6eaf8"
          : hasError
            ? "#f2d7d5"
            : borderColor,
      }}
      role="listitem"
      aria-roledescription="elemento reordenable"
      aria-label={`Paso: ${step.text}. Posición ${position} de ${totalSteps}. Identificador visual: ${positionIcon}. Arrastra para reordenar.`}
      className={`flex flex-wrap items-center gap-2 rounded-lg border-2 border-l-[6px] p-2 text-sm text-principal sm:flex-nowrap sm:gap-3 sm:p-3 sm:text-base cursor-grab active:cursor-grabbing ${
        isDragging
          ? "border-resaltado bg-resaltado/30 shadow-xl scale-[1.02] cursor-grabbing"
          : hasError
            ? "border-error bg-error/20 transition-colors duration-200"
            : `border-borde ${bgStyle} hover:bg-resaltado/5 transition-colors duration-200`
      }`}
    >
      {/* Icono identificador visual único por posición */}
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-lg font-bold sm:h-10 sm:w-10 sm:text-2xl ${
          isDragging
            ? "bg-resaltado text-principal scale-110 shadow-md"
            : "bg-principal/10 text-principal transition-transform duration-150"
        }`}
        aria-hidden="true"
        title={`Identificador del paso ${position}`}
      >
        {positionIcon}
      </span>

      {/* Número de posición prominente */}
      <span
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-blanco sm:h-9 sm:w-9 sm:text-base ${
          isDragging
            ? "bg-resaltado scale-125 shadow-lg ring-2 ring-resaltado ring-offset-2"
            : "bg-principal transition-transform duration-150"
        }`}
      >
        {position}
      </span>

      {/* Texto del paso */}
      <span
        className={`flex-1 min-w-0 select-none ${isDragging ? "font-semibold sm:text-lg" : ""}`}
      >
        {step.text}
      </span>
    </li>
  );
}
