"use client";

import { ValidationResult } from "@/types";
import GlossaryTerm from "@/components/ui/GlossaryTerm";
import { GLOSSARY } from "@/utils/constants";

interface OutputPanelProps {
  result: ValidationResult | null;
  levelCompleted: boolean;
  concept: string;
  totalSteps: number;
}

export default function OutputPanel({ concept }: OutputPanelProps) {
  return (
    <aside
      aria-label="Información del nivel y conceptos"
      className="h-full rounded-lg border border-borde bg-blanco p-4"
    >
      <h2 className="mb-4 text-lg font-semibold text-principal">
        Concepto del nivel
      </h2>

      <div className="rounded-lg border border-resaltado bg-resaltado/10 p-3">
        <h3 className="mb-2 text-sm font-semibold text-principal">
          <GlossaryTerm
            term="Secuenciación"
            definition={GLOSSARY["Secuenciación"]}
          >
            Secuenciación
          </GlossaryTerm>
        </h3>
        <p className="text-sm text-texto-suave">{GLOSSARY["Secuenciación"]}</p>
      </div>

      <div className="mt-4 rounded-lg border border-borde bg-fondo p-3">
        <h3 className="mb-2 text-sm font-semibold text-principal">
          Instrucciones del nivel
        </h3>
        <ol className="list-decimal space-y-1 pl-5 text-sm text-texto-suave">
          <li>Ordena los pasos usando los botones de Subir/Bajar.</li>
          <li>También puedes arrastrar los pasos con el ratón.</li>
          <li>Presiona &quot;Verificar secuencia&quot; cuando estés listo.</li>
          <li>
            Si necesitas empezar de nuevo, usa &quot;Volver al estado
            inicial&quot;.
          </li>
        </ol>
      </div>
    </aside>
  );
}
