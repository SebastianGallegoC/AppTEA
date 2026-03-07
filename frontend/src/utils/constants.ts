import { Level } from "@/types";

export const LEVELS: Level[] = [
  {
    id: "nivel-1-secuenciacion",
    title: "Nivel 1: Cruzar la calle",
    description:
      "Ordena los pasos en el orden correcto para que el robot cruce la calle de forma segura.",
    concept: "Secuenciación",
    steps: [
      {
        id: "paso-1",
        text: "El robot se detiene frente al cruce",
        order: 1,
      },
      {
        id: "paso-2",
        text: "El robot mira hacia la izquierda",
        order: 2,
      },
      {
        id: "paso-3",
        text: "El robot mira hacia la derecha",
        order: 3,
      },
      {
        id: "paso-4",
        text: "El robot confirma que no hay autos",
        order: 4,
      },
      {
        id: "paso-5",
        text: "El robot cruza la calle",
        order: 5,
      },
    ],
  },
  {
    id: "nivel-2-secuenciacion",
    title: "Nivel 2: Preparar un sándwich",
    description:
      "Ordena los pasos para preparar un sándwich de jamón y queso correctamente.",
    concept: "Secuenciación",
    steps: [
      {
        id: "paso-1",
        text: "Sacar dos rebanadas de pan",
        order: 1,
      },
      {
        id: "paso-2",
        text: "Colocar una rebanada de jamón en el pan",
        order: 2,
      },
      {
        id: "paso-3",
        text: "Colocar una rebanada de queso sobre el jamón",
        order: 3,
      },
      {
        id: "paso-4",
        text: "Agregar lechuga y tomate si deseas",
        order: 4,
      },
      {
        id: "paso-5",
        text: "Cubrir con la segunda rebanada de pan",
        order: 5,
      },
      {
        id: "paso-6",
        text: "Cortar el sándwich a la mitad",
        order: 6,
      },
    ],
  },
  {
    id: "nivel-3-secuenciacion",
    title: "Nivel 3: Lavarse las manos",
    description:
      "Ordena los pasos para lavarse las manos correctamente y prevenir enfermedades.",
    concept: "Secuenciación",
    steps: [
      {
        id: "paso-1",
        text: "Abrir el grifo con agua tibia",
        order: 1,
      },
      {
        id: "paso-2",
        text: "Mojar ambas manos completamente",
        order: 2,
      },
      {
        id: "paso-3",
        text: "Aplicar jabón en las palmas",
        order: 3,
      },
      {
        id: "paso-4",
        text: "Frotar las manos durante 20 segundos",
        order: 4,
      },
      {
        id: "paso-5",
        text: "Enjuagar con agua hasta quitar todo el jabón",
        order: 5,
      },
      {
        id: "paso-6",
        text: "Secar las manos con una toalla limpia",
        order: 6,
      },
    ],
  },
  {
    id: "nivel-4-secuenciacion",
    title: "Nivel 4: Hacer una llamada",
    description:
      "Ordena los pasos para hacer una llamada telefónica de manera correcta.",
    concept: "Secuenciación",
    steps: [
      {
        id: "paso-1",
        text: "Desbloquear el teléfono",
        order: 1,
      },
      {
        id: "paso-2",
        text: "Abrir la aplicación de teléfono",
        order: 2,
      },
      {
        id: "paso-3",
        text: "Buscar el contacto o marcar el número",
        order: 3,
      },
      {
        id: "paso-4",
        text: "Presionar el botón de llamar",
        order: 4,
      },
      {
        id: "paso-5",
        text: "Esperar a que la persona conteste",
        order: 5,
      },
      {
        id: "paso-6",
        text: "Saludar y hablar con claridad",
        order: 6,
      },
      {
        id: "paso-7",
        text: "Despedirse y colgar la llamada",
        order: 7,
      },
    ],
  },
  {
    id: "nivel-5-secuenciacion",
    title: "Nivel 5: Preparar la mochila",
    description:
      "Ordena los pasos para preparar una mochila antes de salir de casa.",
    concept: "Secuenciación",
    steps: [
      {
        id: "paso-1",
        text: "Verificar qué necesitas llevar",
        order: 1,
      },
      {
        id: "paso-2",
        text: "Colocar la billetera y las llaves",
        order: 2,
      },
      {
        id: "paso-3",
        text: "Guardar el teléfono móvil",
        order: 3,
      },
      {
        id: "paso-4",
        text: "Agregar una botella de agua",
        order: 4,
      },
      {
        id: "paso-5",
        text: "Incluir documentos importantes si los necesitas",
        order: 5,
      },
      {
        id: "paso-6",
        text: "Cerrar bien la mochila",
        order: 6,
      },
      {
        id: "paso-7",
        text: "Colocar la mochila en tu espalda",
        order: 7,
      },
    ],
  },
];

export const GLOSSARY: Record<string, string> = {
  Secuenciación:
    "Es ejecutar instrucciones una después de otra, en un orden definido. Ejemplo: Paso 1, luego Paso 2, luego Paso 3.",
  Variable:
    "Es un espacio con nombre que guarda un valor. Ejemplo: edad = 10 guarda el número 10.",
  Instrucción:
    "Es una orden que el programa ejecuta. Ejemplo: 'mover adelante' es una instrucción.",
};
