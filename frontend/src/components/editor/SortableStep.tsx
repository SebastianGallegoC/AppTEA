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
      aria-label={`Paso: ${step.text}. Posición ${position} de ${totalSteps}. Identificador visual: ${positionIcon}. Usa los botones de subir o bajar, o arrastra con el ratón.`}
      className={`flex flex-wrap items-center gap-2 rounded-lg border-2 border-l-[6px] p-2 text-sm text-principal sm:flex-nowrap sm:gap-3 sm:p-3 sm:text-base ${
        isDragging
          ? "border-resaltado bg-resaltado/30 shadow-xl scale-[1.02]"
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

      {/* Botón de arrastre con feedback visual */}
      <button
        type="button"
        {...attributes}
        {...listeners}
        aria-label={`Arrastrar el paso: ${step.text}`}
        className={`flex h-8 shrink-0 cursor-grab items-center justify-center rounded-md border-2 px-2 text-xs font-semibold sm:h-10 sm:px-3 ${
          isDragging
            ? "border-resaltado bg-resaltado text-principal shadow-md cursor-grabbing"
            : "border-borde bg-fondo text-texto-suave hover:border-principal hover:bg-principal hover:text-blanco transition-colors duration-150"
        } focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2`}
      >
        {isDragging ? "●●●" : "☰"}
      </button>

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
        className={`flex-1 min-w-0 ${isDragging ? "font-semibold sm:text-lg" : ""}`}
      >
        {step.text}
      </span>

      {/* Botones de movimiento vertical */}
      <div className="flex shrink-0 gap-1 sm:flex-col">
        <button
          type="button"
          onClick={onMoveUp}
          disabled={isFirst}
          aria-label={`Subir el paso ${position} una posición arriba`}
          className="flex h-7 items-center justify-center rounded border-2 border-borde bg-blanco px-2 text-[10px] font-bold text-principal transition-colors hover:bg-principal hover:text-blanco hover:border-principal disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-blanco disabled:hover:text-principal disabled:hover:border-borde focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2 sm:h-8 sm:w-16 sm:text-xs"
        >
          ▲ <span className="hidden sm:inline">Subir</span>
        </button>
        <button
          type="button"
          onClick={onMoveDown}
          disabled={isLast}
          aria-label={`Bajar el paso ${position} una posición abajo`}
          className="flex h-7 items-center justify-center rounded border-2 border-borde bg-blanco px-2 text-[10px] font-bold text-principal transition-colors hover:bg-principal hover:text-blanco hover:border-principal disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-blanco disabled:hover:text-principal disabled:hover:border-borde focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2 sm:h-8 sm:w-16 sm:text-xs"
        >
          ▼ <span className="hidden sm:inline">Bajar</span>
        </button>
      </div>
    </li>
  );
}
