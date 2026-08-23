# 20 — Dar Propiedad Correcta a los Ports

## 🎯 Objetivo

Ubicar los contratos del caso de uso en la capa de aplicación y eliminar el port
de UI que el dominio no consume.

## 📚 Concepto: Ownership de Boundaries

La Dependency Rule no significa que todas las interfaces vivan en `domain`. Cada
boundary debe ser propiedad de la política interna que lo necesita. Los contratos
para ejecutar un caso de uso pertenecen a `application`; el dominio solo conserva
conceptos y reglas de negocio.

## 🔍 Problema actual

`PlayGame.ts` y `GameUI.ts` están bajo `src/domain/ports`. El primero describe una
operación de aplicación. El segundo describe detalles de interacción y solo es
implementado por `GameCli`; ningún componente interno lo recibe como dependencia.

## ✅ Qué hacer

1. Mover el contrato `PlayGameInput` y su DTO de salida a
   `src/application/ports/PlayGame.ts`.
2. Actualizar `PlayGameUseCase`, `GameCli`, tests y composition root para importar
   el contrato desde aplicación.
3. Quitar `implements GameUI` de `GameCli`.
4. Eliminar `src/domain/ports/GameUI.ts` y cualquier import restante.
5. Si `src/domain/ports` queda vacío después de la tarea 19, eliminar la carpeta.
6. Mantener por ahora el retorno del DTO; el Output Boundary se introduce en la
   siguiente tarea.

## 🧪 Pruebas

- Ejecutar los tests existentes sin modificar el comportamiento esperado.
- Buscar imports hacia `domain/ports` y confirmar que no queda ninguno.
- Confirmar que el controller solo conoce el input port de aplicación.

## ✅ Criterios de finalización

- El dominio no contiene ports de UI ni de casos de uso.
- `PlayGameUseCase` implementa un contrato propiedad de `application`.
- No existe una interfaz sin consumidor solo para “tener más abstracciones”.
- `npm test` y `npx tsc --noEmit` pasan.

## 💡 Reflexión

La inversión de dependencias trata sobre quién define el contrato, no sobre crear
una carpeta global de interfaces. La política consumidora debe controlar la forma
del boundary.

## Estado: ⬜ Pendiente
