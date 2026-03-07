1. Perfil del Usuario Objetivo
Usuario: Persona con TEA Nivel 1.

Características cognitivas: Pensamiento lógico-estructurado, sensibilidad a la sobrecarga sensorial, preferencia por la literalidad, posible ansiedad ante la incertidumbre o errores no explicados.

2. Identidad Visual y UI (Interfaz de Usuario)
Paleta de Colores (Baja Estimulación):

Principal: #2C3E50 (Azul medianoche - profesional y estable).

Fondo: #F4F7F6 (Gris casi blanco - evita el brillo excesivo).

Éxito: #A8D5BA (Verde menta suave).

Error: #F2D7D5 (Rojo pastel/salmón - no agresivo).

Resaltado: #D6EAF8 (Azul cielo claro).

Tipografía: Sans-serif con alto interletrado (Ej: Inter, Open Sans o Atkinson Hyperlegible). Tamaño base: 18px para facilitar la lectura.

Componentes:

Bordes redondeados (border-radius: 8px).

Evitar sombras pesadas; usar bordes finos de 1px en su lugar.

Cero animaciones intrusivas: Solo transiciones suaves de opacidad (fading).

3. Estructura de la Aplicación (Layout)
Arquitectura de Pantalla Única: Evitar navegación profunda. El usuario debe sentir que siempre está en el mismo lugar.

Paneles Fijos:

Lateral Izquierdo: Árbol de pasos lineal (Progreso).

Central: Editor de lógica (Input).

Lateral Derecho: Consola de resultados y explicación (Output).

Predictibilidad: El botón de "Siguiente" siempre debe estar en el mismo lugar.

4. Metodología de Enseñanza y UX
Literalidad: No usar metáforas, sarcasmo o lenguaje figurado.

Mal: "¡Dale fuego a ese código!".

Bien: "Haz clic para ejecutar las instrucciones".

Micro-learning: Dividir cada concepto en una sola acción por pantalla.

Feedback de Errores:

El error debe ser descriptivo y técnico, no emocional.

Explicar la causa raíz: "Falta un cierre de llave en la línea 3" en lugar de "Algo salió mal".

Estado de Carga: Mostrar siempre qué está pasando (ej. "Procesando código...") para evitar ansiedad por espera.

5. Restricciones Técnicas para la IA (Copilot)
Accesibilidad (A11y): Cumplir con WCAG 2.1 nivel AA. Asegurar contraste de texto.

Interactividad: Priorizar el uso de teclados y navegación por tabulación.

Componentes: Crear componentes reutilizables y limpios. No usar librerías de UI ruidosas; preferir Tailwind CSS con configuraciones personalizadas para los colores arriba mencionados.

5. Calidad de Software y Buenas Prácticas
Arquitectura de Código:

Estructura de carpetas clara (ej. /components, /hooks, /utils).

Uso de Componentes Funcionales y Hooks de React.

Clean Code: * Aplicar principios SOLID.

Mantener los componentes pequeños y con una única responsabilidad.

Manejo de Estado: * Uso de estado local (useState) o global (Context API/Zustand) de forma eficiente para evitar re-renders innecesarios que puedan causar parpadeos visuales (molestos para usuarios TEA).

6. Accesibilidad (A11y) y Usabilidad (UX)
Estándares: Cumplir estrictamente con WCAG 2.1 Nivel AA.

Semántica HTML: Uso de etiquetas correctas (<main>, <section>, <article>, <nav>, <button>) para asegurar que los lectores de pantalla interpreten la jerarquía.

Navegación por Teclado: * Todos los elementos interactivos deben tener un focus-ring visible y claro (usar el color #D6EAF8 del sistema).

El orden del tabulador (tabindex) debe ser lógico y lineal.

Atributos ARIA: Implementar aria-label, aria-live (para notificaciones de error/éxito) y aria-expanded donde sea necesario.

Textos de Ayuda: Cada input o acción compleja debe tener un title o un texto descriptivo cercano para eliminar la ambigüedad.

El sistema debe estar hecho de forma que sea RESPONSIVE, adaptándose a diferentes tamaños de pantalla sin perder funcionalidad ni claridad visual.

7. UX de niveles:
    Estado de Victoria Claro: Al finalizar un nivel, debe aparecer un resumen técnico: "Lograste mover al objeto usando 3 líneas de código. Usaste: Secuenciación". Evita confeti excesivo o sonidos estridentes.

    Modo Sandbox: Al final de cada nivel, permite que el usuario "juegue" con lo aprendido sin un objetivo fijo para reducir la presión del desempeño.

    Glosario Persistente: Cada nuevo término técnico (ej. "Variable") debe subrayarse y, al pasar el mouse o dar foco, mostrar su definición literal y un ejemplo.

    Botón de "Reiniciar Nivel": Siempre visible. El error no debe ser permanente; volver al estado inicial ayuda a reducir la frustración.