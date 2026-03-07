🛠️ Especificaciones de Tecnología y Arquitectura
1. Stack Tecnológico (Full-Stack Lite)
Frontend: Next.js (App Router) + TypeScript.

Estilos: Tailwind CSS (Configuración de colores de baja estimulación).

Estado Global: Zustand (Para gestionar sesión de usuario y progreso local).

Backend: Express (Node.js).

Base de Datos: SQLite (Archivo local database.db).

Autenticación: JWT (JSON Web Tokens) con almacenamiento en Cookies seguras (HttpOnly).

2. Estructura de Datos (Persistencia)
Tabla users:

id: INTEGER PRIMARY KEY AUTOINCREMENT.

username: TEXT UNIQUE (Mínimo 4 caracteres, sin caracteres especiales complejos).

password_hash: TEXT (Encriptado con BCrypt/Argon2).

Estrategia de Progreso: Al no existir tablas de niveles en el Backend, el progreso se guardará en localStorage del navegador, vinculado al username activo.

3. Arquitectura de Software (Patrones)
Frontend Modular:

/components/ui: Componentes atómicos accesibles (Radix UI o Headless UI recomendados por su semántica).

/components/editor: Lógica del área de programación.

/hooks: Lógica de validación de retos separada de la vista (useValidator.ts).

Backend Layered:

schemas/: Definición de modelos de entrada/salida (Pydantic/Zod).

services/: Lógica de hashing y validación de credenciales.

routes/: Endpoints limpios y documentados.

4. Reglas de Desarrollo y Buenas Prácticas (Clean Code)
Tipado Estricto: Prohibido el uso de any. Todas las respuestas del Backend deben tener una interfaz definida en el Frontend.

Manejo de Errores de Red: Las peticiones deben implementar un try-catch que capture errores de conexión y los muestre de forma no intrusiva (evitar alerts, usar banners de estado en el layout).

Semántica HTML: Uso obligatorio de etiquetas <header>, <main>, <footer>, <form> y <label>. Cada input de login debe tener su respectivo label asociado para lectores de pantalla.

Seguridad: Implementar protección básica contra inyección SQL mediante el uso de ORMs (SQLAlchemy o Prisma) y validación de tipos en los endpoints.

5. Interacción de Componentes (Data Flow)
Auth Flow: El usuario ingresa credenciales -> El Backend valida y devuelve un JWT -> El Frontend guarda el token y redirige al Dashboard de niveles.

Validation Flow: El usuario envía su solución -> El Frontend procesa la lógica -> Si es correcto, actualiza el localStorage del progreso y muestra el feedback de éxito.