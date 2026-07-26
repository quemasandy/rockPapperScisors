# 04 — Corregir la Lógica de Negocio

## 🎯 Objetivo

Implementar correctamente las **reglas del juego** Piedra-Papel-Tijera dentro del dominio, y crear un `GameResult` como parte del lenguaje del dominio.

## 📚 Concepto: Domain Logic y Ubiquitous Language

En Clean Architecture, **toda la lógica de negocio vive en el dominio**. Las reglas de quién gana en Piedra-Papel-Tijera son **reglas de negocio** puras. No dependen de la UI, ni de la base de datos, ni de nada externo.

Además, el dominio debe hablar en su propio lenguaje (**Ubiquitous Language**). No devolvemos `true/false` — devolvemos `GameResult.Win`, `GameResult.Lose`, `GameResult.Draw`. Eso es mucho más expresivo.

## 🔍 Problema actual

Tu `Game.evaluateAnswer()`:

```typescript
// ❌ Problemas múltiples
evaluateAnswer(answer: string) {
    const machineAnswer = this.machine.generateWeapon()
    
    if (machineAnswer === answer) {  // Solo compara igualdad
        return true                   // ¿true = ganaste o true = empate?
    }
    return false                      // ¿false = perdiste? No hay empate.
}
```

Problemas:
1. **Lógica incompleta** — Solo compara igualdad, no tiene las reglas de quién vence a quién
2. **`answer` es `string`** — Debería ser `Weapon` (type safety)
3. **Devuelve `boolean`** — ¿`true` = ganaste? ¿`true` = empate? Ambiguo
4. **No informa qué eligió la máquina** — El jugador quiere saber contra qué jugó

## ✅ Qué hacer

Modificar `src/domain/entities/Game.ts`:

```typescript
import { Machine } from './Machine';
import { Weapon } from './Weapon';
import { RandomNumberGenerator } from '../ports/RandomNumberGenerator';

export enum GameResult {
    Win = "win",
    Lose = "lose",
    Draw = "draw",
}

export class Game {
    private machine: Machine;

    constructor(randomGenerator: RandomNumberGenerator) {
        this.machine = new Machine(randomGenerator);
    }

    play(playerWeapon: Weapon): { result: GameResult; machineWeapon: Weapon } {
        const machineWeapon = this.machine.generateWeapon();

        if (playerWeapon === machineWeapon) {
            return { result: GameResult.Draw, machineWeapon };
        }

        // Reglas de negocio: cada arma vence a exactamente una otra
        const winsAgainst: Record<Weapon, Weapon> = {
            [Weapon.Rock]: Weapon.Scissors,     // Piedra vence a Tijeras
            [Weapon.Paper]: Weapon.Rock,         // Papel vence a Piedra
            [Weapon.Scissors]: Weapon.Paper,     // Tijeras vence a Papel
        };

        const result = winsAgainst[playerWeapon] === machineWeapon
            ? GameResult.Win
            : GameResult.Lose;

        return { result, machineWeapon };
    }
}
```

### Cambios clave:

| Antes | Después |
|-------|---------|
| `evaluateAnswer(answer: string)` | `play(playerWeapon: Weapon)` — tipado fuerte |
| Devuelve `boolean` | Devuelve `{ result: GameResult; machineWeapon: Weapon }` |
| Solo compara igualdad | Tiene las 3 reglas de victoria |
| No informa empate | `GameResult.Draw` para empate |
| `new Machine()` sin DI | `new Machine(randomGenerator)` con DI |
| `Player` sin uso | Eliminado del constructor (se limpia en paso 10) |

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ Las reglas de negocio están COMPLETAS en el dominio
3. ✅ El método `play()` es determinista si inyectas un `RandomNumberGenerator` fake
4. ✅ `Game` solo importa de su propio paquete (`domain/`)

## 💡 Reflexión

Las reglas de negocio son el **corazón** de tu aplicación. Si cambias de CLI a Web o a API REST, las reglas de quién gana **no cambian**. Por eso viven en el dominio — son las últimas cosas que deberían cambiar.

El `winsAgainst` map es una forma elegante de codificar las reglas. ¿Qué pasaría si añadieras "Lagarto" y "Spock"? Solo modificas este map y el enum `Weapon`. Nada más. 🦎🖖

## Estado: ⬜ Pendiente
