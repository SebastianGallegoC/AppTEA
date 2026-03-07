import { Level } from "@/types";

export const LEVELS: Level[] = [
  {
    id: "nivel-1-secuenciacion",
    title: "Nivel 1: Secuenciación",
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
];

export const GLOSSARY: Record<string, string> = {
  Secuenciación:
    "Es ejecutar instrucciones una después de otra, en un orden definido. Ejemplo: Paso 1, luego Paso 2, luego Paso 3.",
  Variable:
    "Es un espacio con nombre que guarda un valor. Ejemplo: edad = 10 guarda el número 10.",
  Instrucción:
    "Es una orden que el programa ejecuta. Ejemplo: 'mover adelante' es una instrucción.",
};
