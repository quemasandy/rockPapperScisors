# Registro histórico de progreso

> Los nombres y estructuras mencionados aquí corresponden al estado de cada
> tarea mientras se ejecutaba la fase 2. No describen necesariamente el diseño
> vigente; consulta la [arquitectura final](./docs/README.md).

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

## Tarea 25 — Separar tests y test doubles de producción

- Las suites unitarias salieron de `src` y ahora reflejan los anillos bajo `tests/unit`.
- Los doubles reutilizables viven en `tests/support`; los doubles usados por una sola suite permanecen locales.
- Se eliminaron todas las carpetas `__tests__` del árbol productivo y ningún archivo de `src` depende de `tests`.
- Se agregó un smoke test en `tests/integration/cli` que conecta runner, controller, interactor y presenter con adapters en memoria.
- El smoke test ejecuta una ronda completa sin procesos externos ni acceso a `stdin`.
- La configuración de build se conserva sin cambios para abordarla en la tarea 26.
- El README del roadmap y la especificación marcan la tarea 25 como completada.
- Validación final con Node 24.19.0: `npm test` (42/42), `npx tsc --noEmit`, type-check adicional de `src` y `tests`, y `git diff --check` pasan.
- TODO: ninguno para la tarea 25.

## Tarea 26 — Separar build y type-check

- `tsconfig.json` valida `src` y `tests`, usa `noEmit` y ya no define directorios de entrada o salida.
- `tsconfig.build.json` hereda las reglas compartidas, vuelve a habilitar la emisión y compila exclusivamente `src` hacia `dist`.
- `package.json` expone `typecheck`, `build` y `verify`; el entrypoint del paquete ahora es `dist/main.js`.
- Un error de tipos temporal dentro de `tests` fue detectado por `npm run typecheck` y se retiró inmediatamente.
- El build genera 17 archivos JavaScript productivos, sin tests, fakes ni carpetas `tests` o `__tests__`.
- Validación final con Node 24.19.0: `npm run verify` (42/42), inspección de `dist`, ejecución de una ronda desde `dist/main.js` y `git diff --check` pasan.
- TODO: ninguno para la tarea 26.

## Tarea 27 — Endurecer TypeScript

- La configuración base activa `noUncheckedIndexedAccess`, `noUnusedLocals`, `noUnusedParameters` y `forceConsistentCasingInFileNames` para producción y tests.
- `MathRandomOpponentWeaponProvider` comprueba el resultado del acceso al arreglo y lanza `RangeError` si `Math.random` incumple su rango `[0, 1)`.
- Las pruebas del adapter cubren valores fuera de contrato por debajo y por encima del rango permitido.
- La prueba del presenter valida explícitamente que el resultado exista antes de leerlo.
- No se introdujeron `any`, non-null assertions ni directivas para silenciar el compilador.
- Validación final con Node 24.19.0: `npm run verify` (44/44), búsqueda de escapes y `git diff --check` pasan.
- TODO: ninguno para la tarea 27.

## Tarea 30 — Cambiar la presentación sin cambiar el juego

- Solicitud: implementar completa la tarea 30 del roadmap.
- Predicción: añadir un presenter JSON y pruebas en `interface-adapters`; mantener
  `domain` y `application` sin cambios; conservar `GamePresenter` como composición
  predeterminada en `main.ts`.
- Contrato fijado por pruebas: una única línea JSON para victoria, derrota, empate
  y entrada inválida; la integración determinista usa papel contra piedra.
- Las pruebas fallaron primero porque `JsonGamePresenter` todavía no existía; se
  implementó contra ambos output boundaries e inyectando solo `writeLine`.
- Sustitución comprobada temporalmente en `main.ts`: una ronda real escribió una
  línea JSON; después se restauró `GamePresenter` + `ConsoleGameView` como salida
  predeterminada.
- Contraste con la predicción: `domain`, `application` y el `main.ts` final no
  cambiaron; el diff productivo solo añade el presenter en `interface-adapters`.
  También se añadieron sus pruebas y se actualizó la documentación canónica.
- Validación final con Node 24.19.0: pruebas específicas (6/6), `npm run verify`
  (50/50, arquitectura sin violaciones y build correcto), `git diff --check` y
  una ejecución textual de `npm start` pasan.
- El ejercicio 30 y su índice quedaron marcados como completados.
- TODO: ninguno para la tarea 30.

### Seguimiento: composición JSON activa

- Solicitud: usar `JsonGamePresenter` para observar cómo queda el CLI.
- Predicción: solo debe cambiar el wiring de `main.ts`; las políticas y los demás
  adapters deben permanecer intactos.
- `JsonGamePresenter` quedó como presentación predeterminada, inyectando
  `console.log` mediante una función `writeLine`.
- Ejecución válida observada: papel contra tijeras produjo una línea con
  `result: "lose"`; la entrada `lagarto` produjo el error JSON esperado.
- Contraste con la predicción: el único cambio de código fue el composition root;
  `domain`, `application` y los demás adapters no cambiaron. Se actualizó la
  documentación canónica para reflejar el flujo activo.
- Validación con Node 24.19.0: `npm run verify` pasa con 50/50 pruebas,
  arquitectura sin violaciones y build correcto.
- TODO: ninguno; conservar JSON como salida activa.
