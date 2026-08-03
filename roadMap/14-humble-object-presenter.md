# 14 — Humble Object: Presenter, ViewModel y View

## 🎯 Objetivo

Aplicar el **patrón Humble Object** (Capítulo 23 de Clean Architecture) al proyecto, separando tu `GameCli` en tres piezas claras:

1. **Presenter** (objeto testeable) — contiene toda la lógica de formateo y presentación
2. **ViewModel** (estructura de datos simple) — transporta datos ya formateados
3. **View** (objeto humilde) — simplemente vuelca el ViewModel en pantalla, sin lógica

## 📚 Concepto: El Patrón Humble Object

El Humble Object nace de una pregunta: *"¿Cómo testeo algo que depende de I/O (consola, DOM, red)?"*

La respuesta: **separar lo que es difícil de probar de lo que es fácil de probar.**

```
  ┌──────────────────────────────────────────────────────┐
  │                  SIN Humble Object                   │
  │                                                      │
  │  GameCli (todo mezclado)                             │
  │    • Lee input del usuario         ← difícil probar  │
  │    • Decide qué emoji mostrar      ← fácil probar   │
  │    • Formatea strings              ← fácil probar   │
  │    • Escribe en console.log        ← difícil probar  │
  └──────────────────────────────────────────────────────┘

  ┌──────────────────────────────────────────────────────┐
  │                  CON Humble Object                   │
  │                                                      │
  │  Presenter (testeable)                               │
  │    • Decide qué emoji mostrar      ← fácil probar ✅│
  │    • Formatea strings              ← fácil probar ✅│
  │    • Produce un ViewModel                            │
  │                                                      │
  │  ViewModel (datos puros)                             │
  │    • { emoji: "🎉", message: "¡Ganaste!", ... }     │
  │                                                      │
  │  View (humilde)                                      │
  │    • Lee del ViewModel             ← sin lógica     │
  │    • Vuelca a console.log          ← difícil probar │
  │    • Pero tan simple que no necesita tests ✅        │
  └──────────────────────────────────────────────────────┘
```

### ¿Por qué se llama "Humble" (Humilde)?

Porque el objeto que toca el I/O es tan **simple, tan reducido, tan humilde** que no vale la pena testearlo. Toda la inteligencia vive en otro lugar, donde sí se puede testear fácilmente.

### ¿Dónde aparece este patrón?

El Capítulo 23 nos dice que el Humble Object aparece en **todos los límites arquitectónicos**:

| Límite | Objeto Humilde | Objeto Testeable |
|--------|---------------|-----------------|
| **UI** | View (console.log, DOM) | Presenter (formateo, lógica de display) |
| **Base de datos** | Gateway implementation (SQL) | Use Case (reglas de negocio) |
| **Servicios externos** | Service Listener (HTTP, WebSocket) | Lógica de procesamiento |
| **ORM** | Data Mapper (queries) | Entidades de dominio |

Tu proyecto ya tiene un ejemplo de esto sin saberlo:

```
MathRandomNumberGenerator  →  Objeto Humilde (toca Math.random)
Game / Machine             →  Objetos Testeables (lógica pura)
RandomNumberGenerator port →  El límite que los separa
```

Ahora vamos a aplicar el mismo principio a la **capa de presentación**.

---

## ✅ Qué hacer

### Paso 1: Crear el ViewModel

Crear `src/presentation/GameViewModel.ts`:

```typescript
// ViewModel: estructura de datos SIMPLE, sin comportamiento.
// Solo transporta datos YA FORMATEADOS listos para mostrar.
// La View solo tiene que leerlo y volcarlo a pantalla.
export interface GameViewModel {
    playerWeaponText: string;    // "piedra", "papel", "tijeras"
    machineWeaponText: string;   // "piedra", "papel", "tijeras"
    resultEmoji: string;         // "🎉", "😢", "🤝"
    resultMessage: string;       // "¡Ganaste!", "Perdiste.", "¡Empate!"
    fullOutput: string;          // El mensaje completo listo para mostrar
}

export interface ErrorViewModel {
    errorMessage: string;        // "❌ Error: Opción inválida..."
}
```

> **Pregúntate:** ¿Tiene métodos este ViewModel? ¿Tiene lógica? **No.** Es solo datos. Eso es lo que lo hace un DTO perfecto para el patrón.

### Paso 2: Crear el Presenter (objeto testeable)

Crear `src/presentation/GamePresenter.ts`:

```typescript
import { Weapon } from '../domain/entities/Weapon';
import { GameViewModel, ErrorViewModel } from './GameViewModel';

// El Presenter es el objeto TESTEABLE.
// Recibe datos crudos del dominio y los transforma
// en un ViewModel con todo el formato listo.
// NO toca console.log, NO toca readline. Solo datos puros.
export class GamePresenter {

    presentResult(
        playerWeapon: Weapon,
        machineWeapon: Weapon,
        result: 'win' | 'lose' | 'draw'
    ): GameViewModel {
        const playerWeaponText = playerWeapon;
        const machineWeaponText = machineWeapon;

        const emojiMap = {
            win: '🎉',
            lose: '😢',
            draw: '🤝',
        };

        const messageMap = {
            win: '¡Ganaste!',
            lose: 'Perdiste.',
            draw: '¡Empate!',
        };

        const resultEmoji = emojiMap[result];
        const resultMessage = messageMap[result];

        const fullOutput = [
            `\nTú elegiste: ${playerWeaponText}`,
            `La máquina eligió: ${machineWeaponText}`,
            `${resultEmoji} ${resultMessage}`,
        ].join('\n');

        return {
            playerWeaponText,
            machineWeaponText,
            resultEmoji,
            resultMessage,
            fullOutput,
        };
    }

    presentError(message: string): ErrorViewModel {
        return {
            errorMessage: `❌ Error: ${message}`,
        };
    }
}
```

> **Pregúntate:** ¿Puedes testear `presentResult()` sin consola, sin readline, sin ningún I/O? **Sí.** Esa es la magia del Humble Object.

### Paso 3: Crear la View (objeto humilde)

Crear `src/controller/GameView.ts`:

```typescript
import { GameViewModel, ErrorViewModel } from '../presentation/GameViewModel';

// La View es el OBJETO HUMILDE.
// No tiene lógica de formato, no decide qué emoji usar,
// no construye strings. Solo lee del ViewModel y lo muestra.
// Es TAN simple que no necesita tests unitarios.
export class GameView {

    showResult(viewModel: GameViewModel): void {
        console.log(viewModel.fullOutput);
    }

    showError(viewModel: ErrorViewModel): void {
        console.log(viewModel.errorMessage);
    }
}
```

> **Pregúntate:** ¿Cuántas líneas de lógica tiene esta clase? **Cero.** Solo `console.log(dato)`. Eso es un objeto Humilde.

### Paso 4: Actualizar GameCli para usar Presenter + View

Modificar `src/controller/GameCli.ts` para que delegue el formateo al Presenter y la salida a la View:

```typescript
import * as readline from 'readline';
import { Weapon } from '../domain/entities/Weapon';
import { GamePresenter } from '../presentation/GamePresenter';
import { GameView } from './GameView';
// ... tus otros imports de ports según el roadmap

export class GameCli {
    private presenter: GamePresenter;
    private view: GameView;

    constructor(/* ...tus dependencias de ports... */) {
        this.presenter = new GamePresenter();
        this.view = new GameView();
    }

    async start(): Promise<void> {
        const weapon = await this.askForWeapon();

        if (!weapon) {
            const errorVM = this.presenter.presentError(
                'Opción inválida. Elige 1, 2 o 3.'
            );
            this.view.showError(errorVM);
            return;
        }

        // Aquí llamas a tu caso de uso y obtienes el resultado...
        // const { result, machineWeapon } = this.playGame.execute(weapon);

        // Luego el Presenter formatea y la View muestra:
        // const viewModel = this.presenter.presentResult(weapon, machineWeapon, result);
        // this.view.showResult(viewModel);
    }

    // ... askForWeapon(), parseWeapon(), readLine() siguen igual
}
```

> **Nota:** El código comentado depende de qué tan avanzado estés en el roadmap. Adapta según los ports que ya tengas implementados.

### Paso 5: Escribir tests del Presenter

Crear `src/presentation/__tests__/GamePresenter.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { GamePresenter } from '../GamePresenter';
import { Weapon } from '../../domain/entities/Weapon';

describe('GamePresenter', () => {
    const presenter = new GamePresenter();

    it('debería formatear un resultado de victoria con emoji 🎉', () => {
        const vm = presenter.presentResult(Weapon.Rock, Weapon.Scissors, 'win');

        expect(vm.resultEmoji).toBe('🎉');
        expect(vm.resultMessage).toBe('¡Ganaste!');
        expect(vm.playerWeaponText).toBe('piedra');
        expect(vm.machineWeaponText).toBe('tijeras');
        expect(vm.fullOutput).toContain('🎉 ¡Ganaste!');
    });

    it('debería formatear un resultado de derrota con emoji 😢', () => {
        const vm = presenter.presentResult(Weapon.Scissors, Weapon.Rock, 'lose');

        expect(vm.resultEmoji).toBe('😢');
        expect(vm.resultMessage).toBe('Perdiste.');
        expect(vm.fullOutput).toContain('😢 Perdiste.');
    });

    it('debería formatear un empate con emoji 🤝', () => {
        const vm = presenter.presentResult(Weapon.Paper, Weapon.Paper, 'draw');

        expect(vm.resultEmoji).toBe('🤝');
        expect(vm.resultMessage).toBe('¡Empate!');
        expect(vm.fullOutput).toContain('🤝 ¡Empate!');
    });

    it('debería incluir ambas armas en el output completo', () => {
        const vm = presenter.presentResult(Weapon.Paper, Weapon.Rock, 'win');

        expect(vm.fullOutput).toContain('papel');
        expect(vm.fullOutput).toContain('piedra');
    });

    it('debería formatear errores con el prefijo ❌', () => {
        const errorVM = presenter.presentError('Opción inválida');

        expect(errorVM.errorMessage).toBe('❌ Error: Opción inválida');
    });
});
```

> **Observa:** Estos tests son **puros**. No necesitan fakes de I/O, no mockean `console.log`, no simulan readline. Solo llaman una función y verifican el resultado. Eso es testabilidad gracias al Humble Object.

---

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ Los tests del Presenter pasan (`npm test`)
3. ✅ `GamePresenter` NO importa nada de `readline`, `console`, `process`, ni `infra/`
4. ✅ `GameView` NO tiene condicionales (`if`, `switch`, ternarios) — solo `console.log`
5. ✅ El `GameViewModel` es una interfaz sin métodos, solo propiedades de datos

## 🧠 Autoevaluación: ¿Interiorizaste el patrón?

Después de completar la tarea, responde estas preguntas mentalmente:

### Nivel 1 — Comprensión
- [ ] ¿Puedes explicar con tus palabras por qué se llama "Humble" Object?
- [ ] ¿Qué criterio usas para decidir qué va en el Presenter vs. la View?
- [ ] ¿Por qué el ViewModel no tiene métodos?

### Nivel 2 — Identificación
- [ ] ¿Cuál es el objeto Humilde en la relación `RandomNumberGenerator` ↔ `MathRandomNumberGenerator`?
- [ ] Si mañana agregaras una base de datos para guardar el historial de partidas, ¿dónde estaría el objeto Humilde y dónde el testeable?
- [ ] Si añadieras un endpoint REST, ¿qué parte sería Humble y qué parte sería testeable?

### Nivel 3 — Aplicación
- [ ] ¿Podrías reutilizar `GamePresenter` exactamente igual si cambias de CLI a Web? ¿Por qué?
- [ ] ¿Qué pasa si agregas un nuevo resultado al juego (ej: "timeout")? ¿Cuántas clases cambias?
- [ ] ¿Por qué es malo que la View tenga un `if` o un `switch`?

## 💡 Reflexión

El Capítulo 23 dice algo profundo: **en cualquier límite arquitectónico, busca el Humble Object**.

Tu proyecto ahora tiene Humble Objects en **dos límites**:

```
Límite de infraestructura (ya existía):
  MathRandomNumberGenerator (Humble) ←── RandomNumberGenerator port ──► Game (Testeable)

Límite de presentación (nuevo):
  GameView (Humble) ←── GameViewModel ──► GamePresenter (Testeable)
```

El patrón es el mismo. La clave es siempre la misma pregunta:
> *"¿Qué parte de este código toca algo difícil de probar (consola, BD, red)? Esa parte debe ser lo más simple posible."*

Cuanto más humilde es el objeto que toca el I/O, más testeable es todo tu sistema. 🏛️

## Estado: ⬜ Pendiente
