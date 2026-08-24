Original prompt: implementa 16 — Corregir la selección aleatoria. Test de regresión, límites inclusivos.

- Especificación revisada: `generate(min, max)` debe incluir ambos límites.
- Alcance: test del adapter y corrección de la fórmula; sin cambios en `Machine` ni en el port.
- Test de regresión confirmado: con la fórmula anterior fallan los casos del máximo para `0..2` y `4..7`.
- Fórmula inclusiva restaurada para la validación completa.
- Validación final: `npm test` (25/25) y `npx tsc --noEmit` pasan.
- TODO: ninguno para la tarea 16.

## Tarea 17 — Neutralizar el lenguaje del dominio

- `Weapon` ahora usa los identificadores internos neutrales `rock`, `paper` y `scissors`.
- `GamePresenter` contiene el mapa exhaustivo que traduce las armas al español.
- El controller conserva las entradas `1`, `2`, `3`, `piedra`, `papel` y `tijeras`.
- Se agregaron pruebas para los identificadores del dominio, las tres traducciones y la ausencia de identificadores ingleses en la salida visible.
- La línea base pasó con Node 24.19.0: 25/25 pruebas y TypeScript sin errores.
- Validación final con Node 24.19.0: `npm test` (29/29), `npx tsc --noEmit` y `git diff --check` pasan.
- El CLI real acepta tanto la entrada numérica como la etiqueta española y mantiene la salida completamente en español.
- TODO: ninguno para la tarea 17.

## Tarea 18 — Convertir `Game` en dominio puro

- Solicitud: implementar la tarea 18 del roadmap; entidades sin dependencias técnicas.
- Alcance confirmado: `Game` recibirá ambas armas y `PlayGameUseCase` elegirá temporalmente el arma rival mediante `Machine`.
- Compatibilidad: el DTO de aplicación y la UI conservan `machineWeapon`; el dominio usará `opponentWeapon`.
- `Game` quedó sin constructor, `Machine`, ports ni aleatoriedad; recibe las dos armas conocidas.
- La tabla `WINS_AGAINST` ahora es una constante inmutable del módulo.
- `PlayGameUseCase` usa temporalmente `Machine`, invoca el dominio puro y adapta `opponentWeapon` al DTO existente `machineWeapon`.
- Las nueve combinaciones llaman directamente a `Game.play` sin fakes ni mocks y verifican resultado y arma rival.
- Validación final: `npm test` (28/28), `npx tsc --noEmit`, `git diff --check` y ejecución real del CLI pasan.
- TODO: ninguno para la tarea 18; `Machine` y el port aleatorio se mantienen hasta la tarea 19.
