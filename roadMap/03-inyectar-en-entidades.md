# 03 — Inyectar Dependencias en las Entidades

## 🎯 Objetivo

Modificar `Machine.ts` para que **reciba** su dependencia (`RandomNumberGenerator`) en vez de crearla internamente.

## 📚 Concepto: Inyección de Dependencias (DI)

**Inyección de Dependencias** significa que un objeto **recibe** lo que necesita desde afuera, en vez de crearlo internamente con `new`.

```
// ❌ SIN inyección (acoplado)
class Machine {
    generateWeapon() {
        return Math.random()  // Hardcodeado, imposible de cambiar o testear
    }
}

// ✅ CON inyección (desacoplado)
class Machine {
    constructor(private randomGenerator: RandomNumberGenerator) {}
    
    generateWeapon() {
        return this.randomGenerator.generate(0, 2)  // No sabe qué implementación hay
    }
}
```

> **Analogía:** Es como un restaurante. El chef (dominio) dice "necesito ingredientes frescos" (port). No va él mismo al supermercado (infraestructura). Alguien se los trae (inyección).

## 🔍 Problema actual

Tu `Machine.ts` actual:

```typescript
// ❌ Machine CREA su propia dependencia
export class Machine {
    private weapon: Weapon;
    
    constructor() {
        this.weapon = this.generateWeapon();  // Se auto-genera en construcción
    }

    generateWeapon(): Weapon {
        const randomNumber = Math.floor(Math.random() * weapons.length)  // ❌ Math.random hardcodeado
        return weapons[randomNumber]
    }
}
```

Problemas:
1. `Machine` decide por sí misma cómo generar números aleatorios
2. No puedes testear `Machine` con valores predecibles
3. El arma se genera en el constructor y se guarda — pero `generateWeapon()` se puede llamar después y genera otra arma diferente (inconsistencia)

## ✅ Qué hacer

Modificar `src/domain/entities/Machine.ts`:

```typescript
import { Weapon } from "./Weapon";
import { RandomNumberGenerator } from "../ports/RandomNumberGenerator";

export class Machine {
    constructor(private readonly randomGenerator: RandomNumberGenerator) {}

    generateWeapon(): Weapon {
        const weapons = [Weapon.Rock, Weapon.Paper, Weapon.Scissors];
        const index = this.randomGenerator.generate(0, weapons.length - 1);
        return weapons[index];
    }
}
```

### Cambios clave:

| Antes | Después |
|-------|---------|
| `constructor()` sin parámetros | `constructor(private readonly randomGenerator: RandomNumberGenerator)` |
| `Math.random()` directo | `this.randomGenerator.generate(0, 2)` |
| Arma generada en constructor | Arma generada solo cuando se llama `generateWeapon()` |
| `private weapon` guardada | Eliminada (no tiene sentido guardarla aquí) |

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ `Machine` NO importa nada de `infra/`
3. ✅ `Machine` solo importa de `./Weapon` y `../ports/RandomNumberGenerator` — ambos dentro del dominio
4. ⚠️ `Game.ts` se romperá temporalmente porque hace `new Machine()` sin parámetros. Eso se arregla en el paso 4.

## 💡 Reflexión

Ahora `Machine` es **testeable**:

```typescript
// En un test puedes hacer:
const fakeRandom: RandomNumberGenerator = {
    generate: (min, max) => 0  // Siempre devuelve 0 → siempre "Piedra"
};

const machine = new Machine(fakeRandom);
expect(machine.generateWeapon()).toBe(Weapon.Rock);  // ¡Predecible!
```

Eso era **imposible** antes. Sin inyección de dependencias, no hay tests unitarios confiables.

## Estado: ⬜ Pendiente
