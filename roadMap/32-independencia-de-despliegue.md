# 32 — Ejecutar el Juego Fuera del Repositorio

## 🎯 Objetivo

Ejecutar el JavaScript compilado desde una carpeta aislada y reconocer qué
independencia de entrega tiene realmente el proyecto.

**Concepto:** despliegue y decisiones que pueden aplazarse.
**Requiere:** fase 2 completa. **Tiempo:** 20–30 minutos.

## 📚 Qué vas a aprender

Un programa puede ejecutarse sin herramientas de desarrollo y aun necesitar
reconstruirse completo cuando cambia un componente. Una interfaz facilita
sustituir código; la entrega independiente requiere otra evidencia.

## ✅ Qué hacer

1. Usa la versión de Node indicada por `.nvmrc`. Revisa los imports productivos:
   actualmente no hay dependencias externas de runtime. Identifica por qué
   `ts-node`, TypeScript y Vitest no son necesarios para ejecutar el build.
2. Desde la raíz del proyecto, compila hacia una carpeta temporal nueva y ejecuta
   el resultado desde allí:

   ```bash
   release_check_dir=$(mktemp -d)
   ./node_modules/.bin/tsc -p tsconfig.build.json --outDir "$release_check_dir/dist"
   (
     cd "$release_check_dir"
     node dist/main.js
   )
   ```

3. Juega una ronda e intenta otra ejecución con una entrada inválida. Comprueba
   que la carpeta temporal solo contiene el build: no tiene `src`, tests ni
   `node_modules`. Node sigue siendo un prerrequisito del entorno.
4. Responde brevemente las preguntas de la tabla. Puedes hacerlo en tus notas;
   no se pide crear un documento de arquitectura ni implementar las alternativas.

   | Pregunta | Evidencia o decisión |
   |----------|----------------------|
   | ¿Qué necesitas para ejecutar el juego fuera del repositorio? | La carpeta `dist` completa y una versión compatible de Node. La prueba usó Node 24.19.0; no necesitó `src`, tests, `node_modules`, TypeScript, `ts-node` ni Vitest. |
   | Si cambias solo un presenter, ¿qué vuelves a construir y copiar? | El build y la entrega actuales tienen una sola unidad: hay que recompilar el producto y copiar de nuevo `dist`, aunque el cambio esté aislado en el código del presenter. |
   | ¿Qué faltaría para reemplazar el oponente sin reconstruir la aplicación? | Convertirlo en un artefacto desplegable por separado, mantener un contrato compatible y resolver su implementación en runtime mediante configuración o comunicación entre procesos. |
   | ¿Qué necesidad concreta justificaría moverlo a otro proceso? | Por ejemplo, consumir un oponente remoto que otro equipo despliega y escala de forma independiente. A cambio aparecerían serialización, latencia, timeouts, fallos de red, observabilidad y operación adicional. Sin ese requisito, una sola aplicación es la opción más simple. |

## 🧪 Cómo comprobarlo

- La ronda y el manejo de entrada inválida funcionan desde la carpeta aislada.
- El build conserva las rutas de sus módulos y no incluye tests ni fakes.
- La ejecución usa Node, sin resolver herramientas desde el repositorio original.

## ✅ Criterios de finalización

- [x] Puedes ejecutar el juego compilado con el directorio de trabajo fuera del repositorio.
- [x] Distingues separación de código, entrega de componentes y separación de procesos.
- [x] Puedes justificar mantener una sola aplicación mientras no exista una necesidad mayor.

## 💡 Reflexión

¿Qué demostró ejecutar el build aislado y qué no? Si el oponente fuera un servicio,
¿cómo cambiarían la espera de su respuesta y el manejo de fallos?

La prueba demostró que el JavaScript emitido es una entrega autocontenida respecto
al repositorio: sus imports relativos se resuelven dentro de `dist` y el único
import externo en runtime es `node:readline/promises`, incluido en Node. No
demostró que sus componentes puedan desplegarse de forma independiente: `main.js`
los enlaza estáticamente y todos viajan en el mismo directorio.

Un oponente remoto convertiría la obtención inmediata actual en una operación
asíncrona con latencia y fallos parciales. Habría que decidir timeouts, reintentos,
cancelación y cómo presentar indisponibilidad sin confundirla con una regla del
juego. Ese coste no está justificado por los requisitos actuales.

Al terminar, marca este archivo y el [índice](./README.md) como completados.

## Estado: ✅ Completado
