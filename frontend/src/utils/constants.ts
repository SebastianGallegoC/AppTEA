import { Level, ModuleTheory } from "@/types";

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

export const MODULE_THEORY: ModuleTheory = {
  moduleId: "modulo-1",
  title: "Módulo 1: ¿Qué es la Secuenciación?",
  description:
    "Aprende qué significa ordenar pasos y por qué es importante en la vida diaria y en la programación.",
  sections: [
    {
      title: "¿Qué es una secuencia?",
      icon: "📋",
      content: [
        {
          type: "text",
          value:
            "Una secuencia es un conjunto de pasos que se realizan uno después de otro, siempre en el mismo orden. Es como seguir una receta o las instrucciones de un juego.",
        },
        {
          type: "highlight",
          value:
            "En una secuencia, el orden importa mucho. Si cambias el orden de los pasos, el resultado puede ser diferente o incorrecto.",
        },
        {
          type: "image-description",
          emoji: "1️⃣➡️2️⃣➡️3️⃣",
          value:
            "Los pasos van uno después del otro, como eslabones de una cadena.",
        },
      ],
    },
    {
      title: "Secuencias en la vida diaria",
      icon: "🏠",
      content: [
        {
          type: "text",
          value:
            "Todos los días usamos secuencias sin darnos cuenta. Cada vez que hacemos algo paso a paso, estamos ejecutando una secuencia.",
        },
        {
          type: "example",
          value:
            "Para cepillarte los dientes sigues una secuencia: 1) Tomas el cepillo, 2) Pones pasta dental, 3) Cepillas los dientes, 4) Enjuagas tu boca, 5) Guardas el cepillo.",
        },
        {
          type: "steps",
          items: [
            "Preparar el desayuno",
            "Vestirte para salir",
            "Cruzar la calle",
            "Lavarte las manos",
          ],
        },
        {
          type: "highlight",
          value:
            "¿Qué pasaría si intentas cepillarte los dientes antes de poner la pasta? El resultado sería diferente.",
        },
      ],
    },
    {
      title: "Secuencias en la programación",
      icon: "💻",
      content: [
        {
          type: "text",
          value:
            "En programación, una secuencia es la forma más básica de organizar instrucciones. El computador lee y ejecuta cada instrucción en el orden en que están escritas, de arriba hacia abajo.",
        },
        {
          type: "highlight",
          value:
            "Un programa es como una lista de instrucciones. El computador las sigue una por una, en orden, sin saltarse ninguna.",
        },
        {
          type: "example",
          value:
            "Instrucción 1: Mostrar 'Hola' → Instrucción 2: Esperar 2 segundos → Instrucción 3: Mostrar 'Adiós'. El computador primero muestra 'Hola', luego espera, y después muestra 'Adiós'.",
        },
        {
          type: "image-description",
          emoji: "🤖",
          value:
            "El computador ejecuta las instrucciones paso a paso, como un robot que sigue una lista.",
        },
      ],
    },
    {
      title: "¿Por qué importa el orden?",
      icon: "⚠️",
      content: [
        {
          type: "text",
          value:
            "Si los pasos están en el orden incorrecto, el resultado puede ser muy diferente o incluso causar un error.",
        },
        {
          type: "example",
          value:
            'Imagina que quieres hacer un sándwich: Si primero pones el jamón y luego sacas el pan... ¿dónde pondrías el jamón? ¡Necesitas el pan primero!',
        },
        {
          type: "steps",
          items: [
            "Orden correcto = resultado esperado ✅",
            "Orden incorrecto = resultado inesperado ❌",
            "Cada paso depende del anterior",
            "No se puede saltar pasos",
          ],
        },
        {
          type: "highlight",
          value:
            "En los niveles prácticos que verás a continuación, tu trabajo será ordenar los pasos correctamente. ¡Ya estás listo para practicar!",
        },
      ],
    },
  ],
};

export const GLOSSARY: Record<string, string> = {
  Secuenciación:
    "Es ejecutar instrucciones una después de otra, en un orden definido. Ejemplo: Paso 1, luego Paso 2, luego Paso 3.",
  Variable:
    "Es un espacio con nombre que guarda un valor. Ejemplo: edad = 10 guarda el número 10.",
  Instrucción:
    "Es una orden que el programa ejecuta. Ejemplo: 'mover adelante' es una instrucción.",
};
