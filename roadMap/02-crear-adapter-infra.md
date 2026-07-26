# 02 — Crear Adapter de Infraestructura

## 🎯 Objetivo

Crear la **implementación concreta** del port `RandomNumberGenerator` en la capa de infraestructura.

## 📚 Concepto: ¿Qué es un Adapter?

Un **Adapter** es una clase que **implementa un Port** definido en el dominio. Vive en la capa de infraestructura porque contiene **detalles técnicos** concretos.

```
DOMINIO define:     interface RandomNumberGenerator { generate(min, max): number }
                         ▲
                         │ implements
INFRA implementa:   class MathRandomNumberGenerator { generate(min, max) { return Math.random()... } }
```

> **Regla de dependencia:** `infra` importa de `domain`. Nunca `domain` importa de `infra`.

## 🔍 Problema actual

Tu carpeta `infra/` está **vacía**. Eso significa que no has separado los detalles de infraestructura del dominio — todo vive en las entidades.

## ✅ Qué hacer

Crear el archivo `src/infra/MathRandomNumberGenerator.ts`:

```typescript
import { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator';

export class MathRandomNumberGenerator implements RandomNumberGenerator {
    generate(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
```

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ La clase **implementa** la interfaz `RandomNumberGenerator`
3. ✅ Observa la dirección del import: `infra` → `domain` (correcto ✅)
4. ❌ Nunca verás `domain` → `infra` (eso sería una violación)

## 💡 Reflexión

Imagina que mañana quieres usar un generador criptográficamente seguro:

```typescript
import crypto from 'crypto';
import { RandomNumberGenerator } from '../domain/ports/RandomNumberGenerator';

export class CryptoRandomNumberGenerator implements RandomNumberGenerator {
    generate(min: number, max: number): number {
        return crypto.randomInt(min, max + 1);
    }
}
```

¡No tocas **ni una línea** del dominio! Solo creas un nuevo Adapter y lo conectas en `main.ts`. Eso es el poder de Clean Architecture.

## Estado: ⬜ Pendiente
