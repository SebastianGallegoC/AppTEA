import { Level, Module, ModuleTheory } from "@/types";

export const MODULES: Module[] = [
  {
    id: "modulo-secuenciacion",
    title: "Secuenciación",
    description: "Aprende a ordenar instrucciones paso a paso. El computador las ejecuta en el orden en que están escritas.",
    icon: "📋",
    concept: "Secuenciación",
    isAvailable: true,
    totalLevels: 5,
  },
  {
    id: "modulo-variables",
    title: "Variables",
    description: "Descubre cómo guardar y usar datos con nombres. Las variables son espacios que almacenan información.",
    icon: "📦",
    concept: "Variables",
    isAvailable: true,
    totalLevels: 5,
  },
  {
    id: "modulo-condicionales",
    title: "Condicionales",
    description: "Aprende a tomar decisiones en un programa. Si se cumple una condición, se ejecuta una acción.",
    icon: "🔀",
    concept: "Condicionales",
    isAvailable: false,
    totalLevels: 0,
  },
  {
    id: "modulo-bucles",
    title: "Bucles",
    description: "Repite instrucciones de forma automática. Los bucles evitan escribir el mismo código muchas veces.",
    icon: "🔄",
    concept: "Bucles",
    isAvailable: false,
    totalLevels: 0,
  },
];

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
    title: "Nivel 2: Enviar un correo electrónico",
    description:
      "Ordena los pasos para enviar un correo electrónico correctamente.",
    concept: "Secuenciación",
    steps: [
      {
        id: "paso-1",
        text: "Abrir la aplicación de correo electrónico",
        order: 1,
      },
      {
        id: "paso-2",
        text: "Presionar el botón de nuevo mensaje",
        order: 2,
      },
      {
        id: "paso-3",
        text: "Escribir la dirección del destinatario",
        order: 3,
      },
      {
        id: "paso-4",
        text: "Escribir el asunto del correo",
        order: 4,
      },
      {
        id: "paso-5",
        text: "Escribir el mensaje en el cuerpo del correo",
        order: 5,
      },
      {
        id: "paso-6",
        text: "Presionar el botón de enviar",
        order: 6,
      },
    ],
  },
  {
    id: "nivel-3-secuenciacion",
    title: "Nivel 3: Sacar un libro de la biblioteca",
    description:
      "Ordena los pasos para pedir prestado un libro en la biblioteca.",
    concept: "Secuenciación",
    steps: [
      {
        id: "paso-1",
        text: "Entrar a la biblioteca",
        order: 1,
      },
      {
        id: "paso-2",
        text: "Buscar el libro en la estantería",
        order: 2,
      },
      {
        id: "paso-3",
        text: "Llevar el libro al mostrador",
        order: 3,
      },
      {
        id: "paso-4",
        text: "Entregar el carné de biblioteca al bibliotecario",
        order: 4,
      },
      {
        id: "paso-5",
        text: "Esperar a que el bibliotecario registre el préstamo",
        order: 5,
      },
      {
        id: "paso-6",
        text: "Guardar el libro en la mochila y salir",
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
    title: "Nivel 5: Imprimir un documento",
    description:
      "Ordena los pasos para imprimir un documento desde el computador.",
    concept: "Secuenciación",
    steps: [
      {
        id: "paso-1",
        text: "Encender el computador e iniciar sesión",
        order: 1,
      },
      {
        id: "paso-2",
        text: "Abrir el archivo que quieres imprimir",
        order: 2,
      },
      {
        id: "paso-3",
        text: "Verificar que la impresora esté encendida y conectada",
        order: 3,
      },
      {
        id: "paso-4",
        text: "Presionar el botón de imprimir en el programa",
        order: 4,
      },
      {
        id: "paso-5",
        text: "Seleccionar la impresora y la cantidad de copias",
        order: 5,
      },
      {
        id: "paso-6",
        text: "Confirmar la impresión presionando Aceptar",
        order: 6,
      },
      {
        id: "paso-7",
        text: "Recoger el documento de la bandeja de la impresora",
        order: 7,
      },
    ],
  },
  {
    id: "nivel-1-variables",
    title: "Nivel 1: Crear una variable",
    description:
      "Ordena los pasos para crear y guardar un dato en una variable.",
    concept: "Variables",
    steps: [
      { id: "paso-1", text: "Decidir qué dato necesitas guardar", order: 1 },
      { id: "paso-2", text: "Elegir un nombre claro para la variable", order: 2 },
      { id: "paso-3", text: "Escribir el tipo de dato (número o texto)", order: 3 },
      { id: "paso-4", text: "Asignar un valor inicial a la variable", order: 4 },
      { id: "paso-5", text: "Verificar que el valor se guardó correctamente", order: 5 },
    ],
  },
  {
    id: "nivel-2-variables",
    title: "Nivel 2: Cambiar el valor de una variable",
    description:
      "Ordena los pasos para modificar el valor almacenado en una variable.",
    concept: "Variables",
    steps: [
      { id: "paso-1", text: "Identificar la variable que quieres cambiar", order: 1 },
      { id: "paso-2", text: "Leer el valor actual de la variable", order: 2 },
      { id: "paso-3", text: "Decidir cuál será el nuevo valor", order: 3 },
      { id: "paso-4", text: "Asignar el nuevo valor a la variable", order: 4 },
      { id: "paso-5", text: "Comprobar que el valor cambió correctamente", order: 5 },
    ],
  },
  {
    id: "nivel-3-variables",
    title: "Nivel 3: Sumar dos variables",
    description:
      "Ordena los pasos para sumar los valores de dos variables y guardar el resultado.",
    concept: "Variables",
    steps: [
      { id: "paso-1", text: "Crear la variable 'numeroA' con valor 5", order: 1 },
      { id: "paso-2", text: "Crear la variable 'numeroB' con valor 3", order: 2 },
      { id: "paso-3", text: "Crear la variable 'resultado' sin valor", order: 3 },
      { id: "paso-4", text: "Calcular la suma: numeroA + numeroB", order: 4 },
      { id: "paso-5", text: "Guardar la suma en la variable 'resultado'", order: 5 },
      { id: "paso-6", text: "Mostrar el valor de 'resultado' en pantalla", order: 6 },
    ],
  },
  {
    id: "nivel-4-variables",
    title: "Nivel 4: Intercambiar dos valores",
    description:
      "Ordena los pasos para intercambiar los valores de dos variables usando una variable temporal.",
    concept: "Variables",
    steps: [
      { id: "paso-1", text: "Crear variable 'a' con valor 10", order: 1 },
      { id: "paso-2", text: "Crear variable 'b' con valor 20", order: 2 },
      { id: "paso-3", text: "Crear variable 'temporal' y guardar el valor de 'a'", order: 3 },
      { id: "paso-4", text: "Asignar el valor de 'b' a la variable 'a'", order: 4 },
      { id: "paso-5", text: "Asignar el valor de 'temporal' a la variable 'b'", order: 5 },
      { id: "paso-6", text: "Verificar: ahora 'a' vale 20 y 'b' vale 10", order: 6 },
    ],
  },
  {
    id: "nivel-5-variables",
    title: "Nivel 5: Guardar datos del usuario",
    description:
      "Ordena los pasos para pedir datos al usuario y guardarlos en variables.",
    concept: "Variables",
    steps: [
      { id: "paso-1", text: "Mostrar un mensaje pidiendo el nombre del usuario", order: 1 },
      { id: "paso-2", text: "Leer lo que el usuario escribe", order: 2 },
      { id: "paso-3", text: "Guardar el nombre en la variable 'nombre'", order: 3 },
      { id: "paso-4", text: "Mostrar un mensaje pidiendo la edad del usuario", order: 4 },
      { id: "paso-5", text: "Leer el número que el usuario escribe", order: 5 },
      { id: "paso-6", text: "Guardar la edad en la variable 'edad'", order: 6 },
      { id: "paso-7", text: "Mostrar en pantalla: 'Hola [nombre], tienes [edad] años'", order: 7 },
    ],
  },
];

export const MODULE_THEORIES: Record<string, ModuleTheory> = {
  "modulo-secuenciacion": {
  moduleId: "modulo-secuenciacion",
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
  },
  "modulo-variables": {
    moduleId: "modulo-variables",
    title: "Módulo 2: ¿Qué son las Variables?",
    description:
      "Aprende qué son las variables, cómo se usan y por qué son importantes en la programación.",
    sections: [
      {
        title: "¿Qué es una variable?",
        icon: "📦",
        content: [
          {
            type: "text",
            value:
              "Una variable es como una caja con un nombre donde puedes guardar un dato. Así como guardas tus cosas en cajas etiquetadas, en programación guardas información en variables con nombre.",
          },
          {
            type: "highlight",
            value:
              "Una variable tiene dos partes: un nombre (la etiqueta de la caja) y un valor (lo que hay dentro de la caja).",
          },
          {
            type: "example",
            value:
              "edad = 12. Aquí 'edad' es el nombre de la variable y 12 es el valor que guarda.",
          },
          {
            type: "image-description",
            emoji: "📦",
            value:
              "Imagina una caja con la etiqueta 'edad' y dentro tiene el número 12.",
          },
        ],
      },
      {
        title: "Tipos de datos en variables",
        icon: "🏷️",
        content: [
          {
            type: "text",
            value:
              "Las variables pueden guardar diferentes tipos de datos. Los más comunes son: números, textos y valores de verdadero o falso.",
          },
          {
            type: "steps",
            items: [
              "Números: edad = 12, precio = 5.50",
              "Textos: nombre = 'Ana', color = 'azul'",
              "Verdadero o falso: esMayor = verdadero",
            ],
          },
          {
            type: "highlight",
            value:
              "Es importante usar el tipo de dato correcto. No puedes sumar un texto con un número.",
          },
          {
            type: "example",
            value:
              "Si nombre = 'Carlos' y edad = 10, puedes mostrar: 'Carlos tiene 10 años'.",
          },
        ],
      },
      {
        title: "Usar y cambiar variables",
        icon: "✏️",
        content: [
          {
            type: "text",
            value:
              "Una vez que creas una variable, puedes usar su valor en operaciones. También puedes cambiar el valor de una variable en cualquier momento.",
          },
          {
            type: "example",
            value:
              "puntos = 0 → El jugador gana 5 puntos → puntos = puntos + 5 → Ahora puntos vale 5.",
          },
          {
            type: "highlight",
            value:
              "Cuando cambias el valor de una variable, el valor anterior se reemplaza. Solo se guarda el último valor asignado.",
          },
          {
            type: "image-description",
            emoji: "🔄",
            value:
              "La caja 'puntos' primero tiene un 0, luego se reemplaza por un 5.",
          },
        ],
      },
      {
        title: "¿Por qué son importantes las variables?",
        icon: "⭐",
        content: [
          {
            type: "text",
            value:
              "Sin variables, un programa no podría recordar nada. Las variables permiten que el programa guarde datos, haga cálculos y responda según la información del usuario.",
          },
          {
            type: "steps",
            items: [
              "Guardan información del usuario (nombre, edad)",
              "Permiten hacer cálculos (sumar, restar)",
              "Recuerdan el estado del programa (puntuación, nivel)",
              "Hacen los programas dinámicos e interactivos",
            ],
          },
          {
            type: "highlight",
            value:
              "En los niveles prácticos que verás a continuación, tu trabajo será ordenar los pasos para crear y usar variables correctamente.",
          },
        ],
      },
    ],
  },
};

export const GLOSSARY: Record<string, string> = {
  Secuenciación:
    "Es ejecutar instrucciones una después de otra, en un orden definido. Ejemplo: Paso 1, luego Paso 2, luego Paso 3.",
  Variable:
    "Es un espacio con nombre que guarda un valor. Ejemplo: edad = 10 guarda el número 10.",
  Instrucción:
    "Es una orden que el programa ejecuta. Ejemplo: 'mover adelante' es una instrucción.",
};
