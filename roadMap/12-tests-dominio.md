# 12 — Tests del Dominio

## 🎯 Objetivo

Escribir tests unitarios para las entidades del dominio (`Machine` y `Game`), demostrando que la lógica de negocio funciona correctamente **sin infraestructura**.

## 📚 Concepto: Tests del Dominio = Tests puros

Los tests del dominio son los más valiosos porque:
- **No dependen de infraestructura** — Sin CLI, sin `Math.random`, sin I/O
- **Son rápidos** — Se ejecutan en milisegundos
- **Son deterministas** — Siempre dan el mismo resultado
- **Prueban las reglas de negocio** — Lo más importante de tu aplicación

## ✅ Qué hacer

### 1. Test de `Machine`

Crear `src/domain/entities/__tests__/Machine.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { Machine } from '../Machine';
import { Weapon } from '../Weapon';
import { FakeRandomNumberGenerator } from './FakeRandomNumberGenerator';

describe('Machine', () => {
    it('debería generar Piedra cuando el random devuelve 0', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0);
        const machine = new Machine(fakeRandom);

        expect(machine.generateWeapon()).toBe(Weapon.Rock);
    });

    it('debería generar Papel cuando el random devuelve 1', () => {
        const fakeRandom = new FakeRandomNumberGenerator(1);
        const machine = new Machine(fakeRandom);

        expect(machine.generateWeapon()).toBe(Weapon.Paper);
    });

    it('debería generar Tijeras cuando el random devuelve 2', () => {
        const fakeRandom = new FakeRandomNumberGenerator(2);
        const machine = new Machine(fakeRandom);

        expect(machine.generateWeapon()).toBe(Weapon.Scissors);
    });
});
```

### 2. Test de `Game`

Crear `src/domain/entities/__tests__/Game.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { Game, GameResult } from '../Game';
import { Weapon } from '../Weapon';
import { FakeRandomNumberGenerator } from './FakeRandomNumberGenerator';

describe('Game', () => {
    // Helper: crea un Game donde la máquina siempre elige un arma específica
    function createGameWithMachineWeapon(weaponIndex: number): Game {
        return new Game(new FakeRandomNumberGenerator(weaponIndex));
    }

    describe('Empates', () => {
        it('Piedra vs Piedra = Empate', () => {
            const game = createGameWithMachineWeapon(0); // Máquina: Piedra
            const { result } = game.play(Weapon.Rock);
            expect(result).toBe(GameResult.Draw);
        });

        it('Papel vs Papel = Empate', () => {
            const game = createGameWithMachineWeapon(1); // Máquina: Papel
            const { result } = game.play(Weapon.Paper);
            expect(result).toBe(GameResult.Draw);
        });

        it('Tijeras vs Tijeras = Empate', () => {
            const game = createGameWithMachineWeapon(2); // Máquina: Tijeras
            const { result } = game.play(Weapon.Scissors);
            expect(result).toBe(GameResult.Draw);
        });
    });

    describe('Victorias del jugador', () => {
        it('Piedra vence a Tijeras', () => {
            const game = createGameWithMachineWeapon(2); // Máquina: Tijeras
            const { result } = game.play(Weapon.Rock);
            expect(result).toBe(GameResult.Win);
        });

        it('Papel vence a Piedra', () => {
            const game = createGameWithMachineWeapon(0); // Máquina: Piedra
            const { result } = game.play(Weapon.Paper);
            expect(result).toBe(GameResult.Win);
        });

        it('Tijeras vence a Papel', () => {
            const game = createGameWithMachineWeapon(1); // Máquina: Papel
            const { result } = game.play(Weapon.Scissors);
            expect(result).toBe(GameResult.Win);
        });
    });

    describe('Derrotas del jugador', () => {
        it('Piedra pierde contra Papel', () => {
            const game = createGameWithMachineWeapon(1); // Máquina: Papel
            const { result } = game.play(Weapon.Rock);
            expect(result).toBe(GameResult.Lose);
        });

        it('Papel pierde contra Tijeras', () => {
            const game = createGameWithMachineWeapon(2); // Máquina: Tijeras
            const { result } = game.play(Weapon.Paper);
            expect(result).toBe(GameResult.Lose);
        });

        it('Tijeras pierde contra Piedra', () => {
            const game = createGameWithMachineWeapon(0); // Máquina: Piedra
            const { result } = game.play(Weapon.Scissors);
            expect(result).toBe(GameResult.Lose);
        });
    });

    describe('Devuelve el arma de la máquina', () => {
        it('debería informar qué arma eligió la máquina', () => {
            const game = createGameWithMachineWeapon(0); // Máquina: Piedra
            const { machineWeapon } = game.play(Weapon.Scissors);
            expect(machineWeapon).toBe(Weapon.Rock);
        });
    });
});
```

## 🧪 Verificación

```bash
npm test
```

Deberías ver algo como:

```
✓ Machine > debería generar Piedra cuando el random devuelve 0
✓ Machine > debería generar Papel cuando el random devuelve 1
✓ Machine > debería generar Tijeras cuando el random devuelve 2
✓ Game > Empates > Piedra vs Piedra = Empate
✓ Game > Victorias del jugador > Piedra vence a Tijeras
✓ Game > Derrotas del jugador > Piedra pierde contra Papel
...
```

**Todos los tests pasan de forma determinista.** Sin `Math.random()`. Sin CLI. Sin I/O. Tests puros. ✅

## 💡 Reflexión

Estos tests son la **prueba viviente** de que tu Clean Architecture funciona:

1. **¿Pudiste testear sin CLI?** → Sí, porque la UI está separada del dominio
2. **¿Pudiste testear sin aleatoriedad?** → Sí, porque inyectaste un Fake
3. **¿Los tests son rápidos?** → Sí, se ejecutan en milisegundos
4. **¿Son confiables?** → Sí, siempre dan el mismo resultado

Si tus entidades del dominio **no** se pudieran testear así, tu Clean Architecture tendría fugas.

## Estado: ⬜ Pendiente
