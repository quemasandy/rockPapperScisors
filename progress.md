Original prompt: implementa 16 — Corregir la selección aleatoria. Test de regresión, límites inclusivos.

- Especificación revisada: `generate(min, max)` debe incluir ambos límites.
- Alcance: test del adapter y corrección de la fórmula; sin cambios en `Machine` ni en el port.
- Test de regresión confirmado: con la fórmula anterior fallan los casos del máximo para `0..2` y `4..7`.
- Fórmula inclusiva restaurada para la validación completa.
- Validación final: `npm test` (25/25) y `npx tsc --noEmit` pasan.
- TODO: ninguno para la tarea 16.
