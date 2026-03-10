import { ValidationResult, Step } from "@/types";

export function validateSequence(
  userOrder: string[],
  correctSteps: Step[]
): ValidationResult {
  // Ordenar los pasos correctos basándonos en la propiedad "order"
  const expectedSortedSteps = correctSteps
    .slice()
    .sort((a, b) => a.order - b.order);

  // Mapear los IDs del usuario a sus objetos de paso correspondientes
  const userSteps = userOrder.map((id) =>
    correctSteps.find((s) => s.id === id)
  );

  for (let i = 0; i < expectedSortedSteps.length; i++) {
    const userStep = userSteps[i];
    const expectedStep = expectedSortedSteps[i];

    if (!userStep || userStep.order !== expectedStep.order) {
      // Buscar todos los pasos que tienen el mismo número de orden esperado
      const equivalentSteps = expectedSortedSteps.filter(
        (s) => s.order === expectedStep.order
      );
      
      const expectedText = equivalentSteps
        .map((s) => `"${s.text}"`)
        .join(" o ");

      return {
        isCorrect: false,
        message: `La secuencia no es correcta. En la posición ${i + 1} colocaste "${userStep?.text ?? "desconocido"}", pero se esperaba ${expectedText}.`,
        firstErrorIndex: i,
      };
    }
  }

  return {
    isCorrect: true,
    message: `Secuencia correcta. Ordenaste ${expectedSortedSteps.length} pasos en el orden lógico. Concepto aplicado: Secuenciación.`,
    firstErrorIndex: null,
  };
}
