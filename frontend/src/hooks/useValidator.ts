import { ValidationResult, Step } from "@/types";

export function validateSequence(
  userOrder: string[],
  correctSteps: Step[]
): ValidationResult {
  const correctOrder = correctSteps
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((step) => step.id);

  for (let i = 0; i < correctOrder.length; i++) {
    if (userOrder[i] !== correctOrder[i]) {
      const expectedStep = correctSteps.find((s) => s.id === correctOrder[i]);
      const userStep = correctSteps.find((s) => s.id === userOrder[i]);

      return {
        isCorrect: false,
        message: `La secuencia no es correcta. En la posición ${i + 1} colocaste "${userStep?.text ?? "desconocido"}", pero el paso correcto es "${expectedStep?.text ?? "desconocido"}".`,
        firstErrorIndex: i,
      };
    }
  }

  return {
    isCorrect: true,
    message: `Secuencia correcta. Ordenaste ${correctOrder.length} pasos en el orden lógico. Concepto aplicado: Secuenciación.`,
    firstErrorIndex: null,
  };
}
