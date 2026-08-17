# 13 — Tests del Caso de Uso

## 🎯 Objetivo

Escribir tests para `PlayGameUseCase`, verificando que la capa de **application** orquesta correctamente al dominio.

## 📚 Concepto: ¿Qué testear en el caso de uso?

Los tests del caso de uso verifican la **orquestación** — que el caso de uso:
1. Recibe los datos correctos
2. Llama al dominio correctamente  
3. Devuelve el resultado en el formato esperado (`PlayGameOutput`)

No re-testeamos las reglas de negocio (eso ya lo hacen los tests del dominio). Verificamos que el caso de uso **coordina** bien.

```
Tests del dominio:    "¿Piedra vence a Tijeras?"     → Lógica de negocio
Tests del use case:   "¿El use case devuelve el DTO correcto?"  → Orquestación
```

## ✅ Qué hacer

Crear `src/application/__tests__/PlayGameUseCase.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { PlayGameUseCase } from '../PlayGameUseCase';
import { Weapon } from '../../domain/entities/Weapon';
import { GameResult } from '../../domain/entities/Game';
import { RandomNumberGenerator } from '../../domain/ports/RandomNumberGenerator';

// Fake reutilizable
class FakeRandomNumberGenerator implements RandomNumberGenerator {
    constructor(private readonly fixedValue: number) {}
    generate(min: number, max: number): number {
        return this.fixedValue;
    }
}

describe('PlayGameUseCase', () => {
    it('debería devolver un PlayGameOutput con resultado y arma de la máquina', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0); // Máquina: Piedra
        const useCase = new PlayGameUseCase(fakeRandom);

        const output = useCase.execute(Weapon.Paper); // Papel vence a Piedra

        expect(output.result).toBe(GameResult.Win);
        expect(output.machineWeapon).toBe(Weapon.Rock);
    });

    it('debería devolver Lose cuando la máquina gana', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0); // Máquina: Piedra
        const useCase = new PlayGameUseCase(fakeRandom);

        const output = useCase.execute(Weapon.Scissors); // Tijeras pierde contra Piedra

        expect(output.result).toBe(GameResult.Lose);
        expect(output.machineWeapon).toBe(Weapon.Rock);
    });

    it('debería devolver Draw en empate', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0); // Máquina: Piedra
        const useCase = new PlayGameUseCase(fakeRandom);

        const output = useCase.execute(Weapon.Rock); // Piedra vs Piedra

        expect(output.result).toBe(GameResult.Draw);
        expect(output.machineWeapon).toBe(Weapon.Rock);
    });

    it('debería implementar la interfaz PlayGameInput', () => {
        const fakeRandom = new FakeRandomNumberGenerator(0);
        const useCase = new PlayGameUseCase(fakeRandom);

        // Verifica que tiene el método execute
        expect(typeof useCase.execute).toBe('function');
    });
});
```

## 🧪 Verificación

```bash
npm test
```

Todos los tests (dominio + caso de uso) deberían pasar:

```
✓ Machine > ...
✓ Game > ...
✓ PlayGameUseCase > debería devolver un PlayGameOutput con resultado y arma
✓ PlayGameUseCase > debería devolver Lose cuando la máquina gana
✓ PlayGameUseCase > debería devolver Draw en empate
✓ PlayGameUseCase > debería implementar la interfaz PlayGameInput
```

## 💡 Reflexión

Observa cómo cada nivel de test tiene un **propósito diferente**:

| Nivel | ¿Qué testea? | ¿Usa Fakes de qué? |
|-------|---------------|---------------------|
| Dominio (Machine) | Genera armas correctamente | `RandomNumberGenerator` |
| Dominio (Game) | Reglas de quién gana | `RandomNumberGenerator` |
| Use Case | Orquestación y formato de salida | `RandomNumberGenerator` |
| Controller (futuro) | Parseo de input y display | `PlayGameInput` |

Cada capa se testea con fakes de la capa **inmediatamente inferior**. Eso es testabilidad limpia.

## 🎓 ¡Felicidades!

Si completaste todos los pasos hasta aquí, tu proyecto tiene:

- ✅ **Ports** que definen contratos
- ✅ **Adapters** que implementan los contratos
- ✅ **Inyección de dependencias** en todas las capas
- ✅ **Composition Root** que conecta todo
- ✅ **Tests unitarios** que prueban todo sin infraestructura
- ✅ **Dependency Rule** respetada en todo momento

**Esto es Clean Architecture.** 🏛️

## Estado: ✅ Completado
