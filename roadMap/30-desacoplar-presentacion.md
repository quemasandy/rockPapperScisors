# 30 — Cambiar la Presentación sin Cambiar el Juego

## 🎯 Objetivo

Presentar una ronda en JSON usando el mismo caso de uso que la salida de texto.

**Concepto:** independencia entre capas.
**Requiere:** fase 2 completa. **Tiempo:** 30–45 minutos.

## 📚 Qué vas a aprender

El formato de salida puede cambiar sin modificar las reglas ni la coordinación
de jugar. El límite ya existe en
[PlayGameOutputBoundary](../src/application/ports/output/PlayGameOutputBoundary.ts).
Además, puedes desarrollar el nuevo presenter contra ese contrato antes de
conectarlo al interactor real.

## ✅ Qué hacer

1. Crea `JsonGamePresenter` en `interface-adapters/presenters`. Implementa el
   output boundary de jugar y el de entrada inválida. Inyecta una función
   `writeLine: (line: string) => void` para entregar el JSON serializado sin
   importar `console` ni APIs de Node. No necesitas otra jerarquía de vistas.
2. Para papel contra piedra, entrega una línea con estos datos; para una entrada
   inválida, entrega `{"error":"invalid_selection"}`:

   ```json
   {"playerWeapon":"paper","opponentWeapon":"rock","result":"win"}
   ```

3. Pruébalo primero con respuestas conocidas y una función que capture las líneas.
   Después conecta el presenter al interactor real y a
   `FakeOpponentWeaponProvider(Weapon.Rock)` en un test de integración.
4. En `main.ts`, sustituye temporalmente el presenter de texto por el nuevo e
   inyecta la escritura a consola. Comprueba una ronda y vuelve a dejar el de
   texto como predeterminado. Conserva el nuevo presenter y sus tests: así pruebas
   la sustitución sin añadir flags, otro menú ni un protocolo CLI nuevo.

**Límite:** `Game`, `Weapon`, `GameResult`, `PlayGameInteractor` y sus contratos
deben permanecer iguales. El menú puede seguir apareciendo: el JSON corresponde
al resultado, no a toda la salida del programa.

## 🧪 Cómo comprobarlo

- Las respuestas de victoria, derrota y empate producen JSON con los datos correctos.
- Una selección inválida produce el error; el interactor no se ejecuta.
- Papel contra piedra produce `result: "win"` en la integración determinista.
- `npm run verify` pasa y `npm start` conserva al finalizar la presentación original.

## ✅ Criterios de finalización

- [x] El presenter nuevo funciona con un double y con el caso de uso real.
- [x] Cambiar la presentación solo exige cambiar la composición.
- [x] Las capas de dominio y aplicación permanecen sin cambios.

## 💡 Reflexión

¿Qué contrato permitió trabajar sin el interactor real? ¿Por qué un parámetro
`format` dentro del caso de uso debilitaría esta separación?

`PlayGameOutputBoundary` y su `PlayGameResponse` permitieron probar el presenter
entregándole respuestas conocidas, sin construir el interactor. Para el error de
entrada se usó de la misma forma `InvalidInputOutputBoundary`.

Un parámetro `format` obligaría al caso de uso a conocer decisiones de entrega y
a cambiar cada vez que aparezca una representación nueva. Al mantener esa
decisión fuera, el interactor publica una respuesta estable y el composition root
elige qué presenter la transforma.

### Refinamiento posterior

El alcance inicial usó una función `writeLine` como boundary mínimo. La
implementación vigente reutiliza `GameView`: `JsonGamePresenter` coloca el JSON
serializado en `fullOutput` y `ConsoleGameView` lo escribe igual que la salida
textual. Así el composition root no adapta directamente `console.log` y no se
añade otro contrato; el coste es que el ViewModel conserva campos útiles para la
presentación textual pero secundarios para la salida JSON.

Al terminar, marca este archivo y el [índice](./README.md) como completados.

## Estado: ✅ Completado
