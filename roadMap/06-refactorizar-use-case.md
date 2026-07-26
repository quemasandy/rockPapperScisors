# 06 — Refactorizar el Caso de Uso

## 🎯 Objetivo

Refactorizar `StartGame.ts` → `PlayGameUseCase.ts`. El caso de uso debe **implementar el Input Port** y **recibir dependencias inyectadas**.

## 📚 Concepto: El Caso de Uso como Orquestador

El caso de uso es el **director de orquesta**. No contiene lógica de negocio (eso está en las entidades del dominio). Su trabajo es:

1. Recibir datos del controller
2. Coordinar entidades del dominio
3. Devolver resultados

```
Controller ──► UseCase ──► Entidades del Dominio
    │              │              │
    │  "El usuario  │  "Voy a     │  "Estas son
    │   eligió      │   crear un  │   las reglas
    │   Piedra"     │   Game y    │   de quién
    │              │   llamar    │   gana"
    │              │   play()"   │
```

## 🔍 Problema actual

Tu `StartGame.ts`:

```typescript
// ❌ Problemas
export class StartGame {
    private game: Game
    constructor() {
        this.game = new Game()  // Crea su propia dependencia (no DI)
    }

    evaluateAnswer(answer: string) {
        return this.game.evaluateAnswer(answer)  // Solo delega, no añade valor
    }
}
```

Problemas:
1. **No implementa ninguna interfaz** — El controller depende de la clase concreta
2. **Hace `new Game()` directamente** — No recibe la dependencia inyectada
3. **Solo delega** — El método `evaluateAnswer` no agrega nada, es un pass-through innecesario
4. **Nombre poco descriptivo** — `StartGame` no describe la acción del caso de uso

## ✅ Qué hacer

Eliminar `src/application/StartGame.ts` y crear `src/application/PlayGameUseCase.ts`:

```typescript
import { Game } from '../domain/entities/Game';
import { Weapon } from '../domain/entities/Weapon';
import { PlayGameInput, PlayGameOutput } from '../domain/ports/PlayGame';
import { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator';

export class PlayGameUseCase implements PlayGameInput {
    private game: Game;

    constructor(randomGenerator: RandomNumberGenerator) {
        this.game = new Game(randomGenerator);
    }

    execute(playerWeapon: Weapon): PlayGameOutput {
        return this.game.play(playerWeapon);
    }
}
```

### Cambios clave:

| Antes (`StartGame`) | Después (`PlayGameUseCase`) |
|----------------------|-----------------------------|
| No implementa interfaz | `implements PlayGameInput` |
| `new Game()` sin DI | `new Game(randomGenerator)` con DI |
| `evaluateAnswer(string)` | `execute(Weapon)` — tipado fuerte |
| Nombre genérico | Nombre que describe la acción |

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ `PlayGameUseCase` implementa `PlayGameInput`
3. ✅ Solo importa del `domain/` — nunca de `controller/` o `infra/`
4. ✅ Recibe `RandomNumberGenerator` como dependencia inyectada

## 💡 Reflexión

¿Por qué el caso de uso hace `new Game(randomGenerator)` internamente? Porque `Game` es una **entidad del dominio** — es legítimo que el caso de uso la cree. Lo que NO debe hacer es crear `MathRandomNumberGenerator` (infraestructura). Eso lo recibe desde afuera.

La regla es: **puedes crear cosas de tu misma capa o de capas internas, pero nunca de capas externas**.

## Estado: ⬜ Pendiente
