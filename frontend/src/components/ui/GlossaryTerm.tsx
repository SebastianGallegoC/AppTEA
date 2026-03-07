"use client";

import { useState, useRef } from "react";

interface GlossaryTermProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export default function GlossaryTerm({
  term,
  definition,
  children,
}: GlossaryTermProps) {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipId = `glossary-${term.toLowerCase().replace(/\s+/g, "-")}`;
  const triggerRef = useRef<HTMLSpanElement>(null);

  return (
    <span className="relative inline-block">
      <span
        ref={triggerRef}
        role="button"
        tabIndex={0}
        aria-describedby={isOpen ? tooltipId : undefined}
        className="cursor-help border-b border-dashed border-principal text-principal font-medium focus-visible:outline-2 focus-visible:outline-resaltado focus-visible:outline-offset-2 rounded-sm"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        {children}
      </span>
      {isOpen && (
        <span
          id={tooltipId}
          role="tooltip"
          className="absolute bottom-full left-0 z-10 mb-2 w-64 rounded-lg border border-borde bg-blanco p-3 text-sm text-texto-suave shadow-none transition-fade opacity-100"
        >
          <strong className="block text-principal">{term}</strong>
          {definition}
        </span>
      )}
    </span>
  );
}
