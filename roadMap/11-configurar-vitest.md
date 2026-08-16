# 11 — Configurar Vitest

## 🎯 Objetivo

Configurar **Vitest** como framework de testing para poder escribir tests unitarios del dominio y los casos de uso.

## 📚 Concepto: ¿Por qué tests en Clean Architecture?

Los tests son donde **realmente sientes** el beneficio de Clean Architecture. Gracias a la inyección de dependencias y los ports, puedes testear cada capa de forma **aislada**:

```
┌──────────────────────────────────────────────────┐
│  Test del Dominio                                │
│  Game + Machine + FakeRandomGenerator            │
│  → Sin CLI, sin Math.random, 100% predecible    │
├──────────────────────────────────────────────────┤
│  Test del Use Case                               │
│  PlayGameUseCase + FakeRandomGenerator           │
│  → Verifica orquestación correcta               │
├──────────────────────────────────────────────────┤
│  Test del Controller (futuro)                    │
│  GameCli + FakePlayGameInput                     │
│  → Verifica que parsea input y muestra output    │
└──────────────────────────────────────────────────┘
```

## ✅ Qué hacer

### 1. Instalar Vitest

```bash
npm install --save-dev vitest
```

### 2. Agregar script de test en `package.json`

Modificar la sección `scripts`:

```json
{
  "scripts": {
    "start": "ts-node src/main.ts",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

### 3. Actualizar `tsconfig.json`

Agregar las opciones necesarias para que Vitest funcione con TypeScript:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "moduleResolution": "node",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

### 4. Crear estructura de tests

```
src/
├── domain/
│   ├── entities/
│   │   └── __tests__/          ← Tests del dominio
│   │       ├── Game.test.ts
│   │       └── Machine.test.ts
│   └── ports/
├── application/
│   └── __tests__/              ← Tests del caso de uso
│       └── PlayGameUseCase.test.ts
```

### 5. Crear el Fake (test double) más importante

Crear `src/domain/entities/__tests__/FakeRandomNumberGenerator.ts`:

```typescript
import { RandomNumberGenerator } from '../../ports/RandomNumberGenerator';

// Un Fake que siempre devuelve un valor predeterminado
// Esto es posible GRACIAS a la inyección de dependencias
export class FakeRandomNumberGenerator implements RandomNumberGenerator {
    constructor(private readonly fixedValue: number) {}

    generate(min: number, max: number): number {
        return this.fixedValue;
    }
}
```

## 🧪 Verificación

1. ✅ `npm test` ejecuta sin errores (aunque aún no hay tests)
2. ✅ `FakeRandomNumberGenerator` implementa `RandomNumberGenerator`
3. ✅ El Fake vive en los tests, no en el código de producción

## 💡 Reflexión

Fíjate cómo el `FakeRandomNumberGenerator` implementa la **misma interfaz** que `MathRandomNumberGenerator`. Esa es la magia de los ports:

```
RandomNumberGenerator (port/interfaz)
         ▲                    ▲
         │                    │
MathRandom...    FakeRandom...
(producción)      (tests)
```

Sin la interfaz `RandomNumberGenerator`, no podrías crear este Fake. Sin el Fake, no podrías hacer tests predecibles. **Los ports habilitan la testabilidad.**

## Estado: ✅ Completado
