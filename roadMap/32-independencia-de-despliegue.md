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
   | ¿Qué necesitas para ejecutar el juego fuera del repositorio? | Lo observado en la carpeta temporal |
   | Si cambias solo un presenter, ¿qué vuelves a construir y copiar? | Revisa cómo funciona el build actual |
   | ¿Qué faltaría para reemplazar el oponente sin reconstruir la aplicación? | Un artefacto separado y un contrato compatible |
   | ¿Qué necesidad concreta justificaría moverlo a otro proceso? | Propón un requisito y un coste que introduciría |

## 🧪 Cómo comprobarlo

- La ronda y el manejo de entrada inválida funcionan desde la carpeta aislada.
- El build conserva las rutas de sus módulos y no incluye tests ni fakes.
- La ejecución usa Node, sin resolver herramientas desde el repositorio original.

## ✅ Criterios de finalización

- [ ] Puedes ejecutar el juego compilado con el directorio de trabajo fuera del repositorio.
- [ ] Distingues separación de código, entrega de componentes y separación de procesos.
- [ ] Puedes justificar mantener una sola aplicación mientras no exista una necesidad mayor.

## 💡 Reflexión

¿Qué demostró ejecutar el build aislado y qué no? Si el oponente fuera un servicio,
¿cómo cambiarían la espera de su respuesta y el manejo de fallos?

Al terminar, marca este archivo y el [índice](./README.md) como completados.

## Estado: ⬜ Pendiente
