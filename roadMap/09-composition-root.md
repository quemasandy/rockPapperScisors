# 09 — Composition Root (main.ts)

## 🎯 Objetivo

Convertir `main.ts` en la **Composition Root**: el único lugar donde se conectan todas las implementaciones concretas.

## 📚 Concepto: Composition Root

La **Composition Root** es el punto de entrada de la aplicación donde se hace el "wiring" — se crean las implementaciones concretas y se inyectan en los constructores.

> **Regla:** La Composition Root es la **ÚNICA parte** de tu código que conoce TODAS las capas. Es el único archivo que importa de `domain/`, `application/`, `controller/` e `infra/` al mismo tiempo.

```
main.ts (Composition Root)
   │
   │  1. Crea MathRandomNumberGenerator     (infra)
   │  2. Crea PlayGameUseCase(random)        (application)  
   │  3. Crea GameCli(useCase)               (controller)
   │  4. Llama gameCli.start()               (arranca)
   │
   ▼
   Todo conectado ✅
```

## 🔍 Problema actual

Tu `main.ts`:

```typescript
// ❌ Demasiado simple — no hace composición
import { GameCli } from './controller/GameCli'

const game = new GameCli()  // GameCli se encarga de crear todo internamente
game.start()
```

El problema es que `GameCli` crea sus propias dependencias (hace `new StartGame()` internamente). Eso significa que `GameCli` **conoce** la implementación del caso de uso — violación de Clean Architecture.

## ✅ Qué hacer

Modificar `src/main.ts`:

```typescript
// === COMPOSITION ROOT ===
// Este es el ÚNICO archivo que conoce todas las capas.
// Aquí se conectan las implementaciones concretas.

import { MathRandomNumberGenerator } from './infra/MathRandomNumberGenerator';
import { PlayGameUseCase } from './application/PlayGameUseCase';
import { GameCli } from './controller/GameCli';

// 1. Crear implementación de infraestructura
const randomGenerator = new MathRandomNumberGenerator();

// 2. Crear caso de uso, inyectando la dependencia de infra
const playGameUseCase = new PlayGameUseCase(randomGenerator);

// 3. Crear controller, inyectando el caso de uso
const gameCli = new GameCli(playGameUseCase);

// 4. Arrancar la aplicación
gameCli.start();
```

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ El juego funciona: `npm start`
3. ✅ `main.ts` es el **único** archivo que importa de TODAS las capas
4. ✅ Ningún otro archivo importa implementaciones concretas de capas externas

### Test de la Dependency Rule

Ejecuta estas verificaciones mentales:

| Archivo | ¿Importa de infra? | ¿Importa de application? | ¿Importa de controller? |
|---------|--------------------|--------------------------|-----------------------|
| `domain/entities/*` | ❌ No | ❌ No | ❌ No |
| `domain/ports/*` | ❌ No | ❌ No | ❌ No |
| `application/*` | ❌ No | — | ❌ No |
| `controller/*` | ❌ No | ❌ No | — |
| `infra/*` | — | ❌ No | ❌ No |
| `main.ts` | ✅ Sí | ✅ Sí | ✅ Sí |

Solo `main.ts` conoce todo. **Eso es Clean Architecture.** ✅

## 💡 Reflexión

¿Quieres cambiar de CLI a Web? Solo cambias `main.ts`:

```typescript
// Versión Web (hipotética)
const randomGenerator = new MathRandomNumberGenerator();
const playGameUseCase = new PlayGameUseCase(randomGenerator);
const gameWeb = new GameWeb(playGameUseCase);  // ← Solo cambia esto
gameWeb.start();
```

El dominio, los casos de uso y la infraestructura **no cambian**. Solo reconectas.

## Estado: ✅ Completado
