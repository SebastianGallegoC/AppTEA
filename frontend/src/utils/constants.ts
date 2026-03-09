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
    mode: "sequence",
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
    mode: "sequence",
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
    mode: "sequence",
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
    mode: "sequence",
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
    mode: "sequence",
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
    title: "Nivel 1: Crear una variable numérica",
    description:
      "Arrastra los bloques correctos para crear una variable llamada edad con el valor 15.",
    concept: "Variables",
    mode: "blocks",
    prompt: "Crea una variable llamada edad que tenga de valor 15",
    availableBlocks: [
      { id: "b-let", text: "let" },
      { id: "b-const", text: "const" },
      { id: "b-edad", text: "edad" },
      { id: "b-nombre", text: "nombre" },
      { id: "b-equal", text: "=" },
      { id: "b-15", text: "15" },
      { id: "b-15str", text: '"15"' },
      { id: "b-plus", text: "+" },
    ],
    correctAnswer: ["b-let", "b-edad", "b-equal", "b-15"],
  },
  {
    id: "nivel-2-variables",
    title: "Nivel 2: Crear una variable de texto",
    description:
      "Arrastra los bloques correctos para crear una variable llamada nombre con el valor \"Carlos\".",
    concept: "Variables",
    mode: "blocks",
    prompt: 'Crea una variable llamada nombre que tenga de valor "Carlos"',
    availableBlocks: [
      { id: "b-let", text: "let" },
      { id: "b-var", text: "var" },
      { id: "b-nombre", text: "nombre" },
      { id: "b-edad", text: "edad" },
      { id: "b-equal", text: "=" },
      { id: "b-carlos", text: '"Carlos"' },
      { id: "b-carlos-nq", text: "Carlos" },
      { id: "b-10", text: "10" },
    ],
    correctAnswer: ["b-let", "b-nombre", "b-equal", "b-carlos"],
  },
  {
    id: "nivel-3-variables",
    title: "Nivel 3: Sumar dos variables",
    description:
      "Arrastra los bloques para crear dos variables y guardar su suma en una tercera.",
    concept: "Variables",
    mode: "blocks",
    prompt: "Crea la variable a con valor 5, la variable b con valor 3 y la variable suma que guarde el resultado de a + b",
    availableBlocks: [
      { id: "b-let1", text: "let" },
      { id: "b-let2", text: "let" },
      { id: "b-let3", text: "let" },
      { id: "b-a", text: "a" },
      { id: "b-b", text: "b" },
      { id: "b-suma", text: "suma" },
      { id: "b-eq1", text: "=" },
      { id: "b-eq2", text: "=" },
      { id: "b-eq3", text: "=" },
      { id: "b-5", text: "5" },
      { id: "b-3", text: "3" },
      { id: "b-plus", text: "+" },
      { id: "b-minus", text: "-" },
      { id: "b-a-ref", text: "a" },
      { id: "b-b-ref", text: "b" },
      { id: "b-8", text: "8" },
    ],
    correctAnswer: ["b-let1", "b-a", "b-eq1", "b-5", "b-let2", "b-b", "b-eq2", "b-3", "b-let3", "b-suma", "b-eq3", "b-a-ref", "b-plus", "b-b-ref"],
    answerLines: [
      { label: "Variable a", correctAnswer: ["b-let1", "b-a", "b-eq1", "b-5"] },
      { label: "Variable b", correctAnswer: ["b-let2", "b-b", "b-eq2", "b-3"] },
      { label: "Variable suma", correctAnswer: ["b-let3", "b-suma", "b-eq3", "b-a-ref", "b-plus", "b-b-ref"] },
    ],
  },
  {
    id: "nivel-4-variables",
    title: "Nivel 4: Cambiar el valor de una variable",
    description:
      "Arrastra los bloques para crear una variable y luego cambiar su valor.",
    concept: "Variables",
    mode: "blocks",
    prompt: 'Crea una variable llamada mensaje con valor "Hola" y luego cambia su valor a "Adiós"',
    availableBlocks: [
      { id: "b-let", text: "let" },
      { id: "b-const", text: "const" },
      { id: "b-mensaje", text: "mensaje" },
      { id: "b-mensaje2", text: "mensaje" },
      { id: "b-eq1", text: "=" },
      { id: "b-eq2", text: "=" },
      { id: "b-hola", text: '"Hola"' },
      { id: "b-adios", text: '"Adiós"' },
      { id: "b-hola-nq", text: "Hola" },
      { id: "b-let2", text: "let" },
    ],
    correctAnswer: ["b-let", "b-mensaje", "b-eq1", "b-hola", "b-mensaje2", "b-eq2", "b-adios"],
    answerLines: [
      { label: "Crear variable mensaje", correctAnswer: ["b-let", "b-mensaje", "b-eq1", "b-hola"] },
      { label: "Cambiar valor de mensaje", correctAnswer: ["b-mensaje2", "b-eq2", "b-adios"] },
    ],
  },
  {
    id: "nivel-5-variables",
    title: "Nivel 5: Calcular el precio total",
    description:
      "Arrastra los bloques para crear variables de precio y cantidad, y calcular el total.",
    concept: "Variables",
    mode: "blocks",
    prompt: "Crea una variable precio con valor 50, una variable cantidad con valor 3 y una variable total que guarde el resultado de precio * cantidad",
    availableBlocks: [
      { id: "b-let1", text: "let" },
      { id: "b-let2", text: "let" },
      { id: "b-let3", text: "let" },
      { id: "b-precio", text: "precio" },
      { id: "b-cantidad", text: "cantidad" },
      { id: "b-total", text: "total" },
      { id: "b-eq1", text: "=" },
      { id: "b-eq2", text: "=" },
      { id: "b-eq3", text: "=" },
      { id: "b-50", text: "50" },
      { id: "b-3", text: "3" },
      { id: "b-mult", text: "*" },
      { id: "b-plus", text: "+" },
      { id: "b-precio-ref", text: "precio" },
      { id: "b-cantidad-ref", text: "cantidad" },
      { id: "b-150", text: "150" },
      { id: "b-var", text: "var" },
    ],
    correctAnswer: ["b-let1", "b-precio", "b-eq1", "b-50", "b-let2", "b-cantidad", "b-eq2", "b-3", "b-let3", "b-total", "b-eq3", "b-precio-ref", "b-mult", "b-cantidad-ref"],
    answerLines: [
      { label: "Variable precio", correctAnswer: ["b-let1", "b-precio", "b-eq1", "b-50"] },
      { label: "Variable cantidad", correctAnswer: ["b-let2", "b-cantidad", "b-eq2", "b-3"] },
      { label: "Variable total", correctAnswer: ["b-let3", "b-total", "b-eq3", "b-precio-ref", "b-mult", "b-cantidad-ref"] },
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
