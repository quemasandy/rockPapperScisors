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

## Tarea 19 — Crear el port semántico del oponente

- Solicitud: implementar la tarea 19 del roadmap; ports orientados al negocio.
- Se creó `OpponentWeaponProvider.choose(): Weapon` en la capa de aplicación.
- `PlayGameUseCase` ahora recibe `Game` y el provider, pide el arma rival y la entrega al dominio.
- `MathRandomOpponentWeaponProvider` concentra la selección con `Math.random` sobre las tres armas.
- Se eliminaron `Machine`, `RandomNumberGenerator`, `MathRandomNumberGenerator` y sus pruebas/fake.
- Prueba de orquestación: el fake entrega `Weapon.Rock`, se invoca una sola vez y `Game.play` recibe exactamente esa arma.
- Pruebas del adapter: extremos válidos, ambos lados de las divisiones `1/3` y `2/3`, las tres armas alcanzables y ninguna respuesta `undefined`.
- Validación: 30/30 tests y TypeScript pasan con Node 24.19.0; el CLI real conserva entrada y salida.
- Nota de entorno: el `node` global es 14.15.4; se usó el Node 24.19.0 requerido por `package.json`.
- TODO: ninguno para la tarea 19.

## Tarea 20 — Dar propiedad correcta a los ports

- Solicitud: implementar la tarea 20 del roadmap; ownership de boundaries.
- `PlayGameInput` y `PlayGameOutput` ahora pertenecen a `application/ports`.
- `PlayGameUseCase`, `GameCli`, sus pruebas y el composition root importan el contrato desde aplicación.
- `GameCli` dejó de implementar el port de UI sin consumidor y se eliminaron `GameUI` y `domain/ports`.
- El DTO de retorno se conserva sin cambios; el Output Boundary corresponde a la tarea 21.
- Validación final con Node 24.19.0: `npm test` (30/30), `npx tsc --noEmit`, `git diff --check` y smoke tests del CLI válido/inválido pasan.
- Búsqueda arquitectónica confirmada: no quedan imports a `domain/ports`, referencias a `GameUI` ni la carpeta `src/domain/ports`.
- TODO: ninguno para la tarea 20.

## Tarea 21 — Implementar el Output Boundary canónico

- Solicitud: implementar la tarea 21 del roadmap; flujo `Interactor → Presenter`.
- Se definieron `PlayGameRequest`, `PlayGameResponse`, `PlayGameInputBoundary` y `PlayGameOutputBoundary` en aplicación.
- `PlayGameUseCase` se renombró a `PlayGameInteractor`; ahora recibe el output boundary y entrega una única respuesta sin retornar un DTO.
- Las pruebas del interactor usan un output spy y verifican ambas armas, el resultado del dominio, una sola entrega y retorno `undefined`.
- `GamePresenter` implementa el output boundary, recibe una interfaz `GameView` y entrega un único ViewModel a la vista.
- `ConsoleGameView` implementa esa interfaz; los tests del presenter usan exclusivamente una view spy.
- `GameCli` ya no construye presenter ni view y no coordina la salida exitosa; `main.ts` conecta view, presenter e interactor.
- Validación final con Node 24.19.0: `npm test` (29/29), `npx tsc --noEmit`, `git diff --check` y smoke tests del CLI válido/inválido pasan.
- El roadmap y su índice marcan la tarea 21 como completada.
- TODO: ninguno para la tarea 21.

## Tarea 22 — Extraer el controller de entrada

- `GameController` adapta la selección cruda del CLI al `PlayGameRequest`, normalizando mayúsculas y espacios.
- Las seis entradas aceptadas y la validación quedan fuera de `GameCli`; una selección válida ejecuta una vez el input boundary.
- `InvalidInputOutputBoundary` permite notificar entradas inválidas sin acoplar el controller al presenter concreto.
- `GamePresenter` implementa el nuevo boundary y conserva el texto y el emoji del error.
- `GameCli` se limita a leer una línea y entregarla intacta al controller.
- Se agregaron pruebas para las seis entradas, normalización, texto desconocido y cadena vacía.
- Validación final: `npm test` (38/38), `npx tsc --noEmit`, `git diff --check` y smoke tests del CLI válido/inválido pasan.
- TODO: ninguno para la tarea 22.
