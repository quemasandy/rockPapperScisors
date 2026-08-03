# 01 — Crear Ports del Dominio

## 🎯 Objetivo

Crear las **interfaces (Ports)** que el dominio necesita para comunicarse con el mundo exterior, **sin conocer los detalles de implementación**.

## 📚 Concepto: ¿Qué es un Port?

Un **Port** es una interfaz definida **dentro del dominio** que dice:

> "Yo necesito que alguien haga esto por mí, pero no me importa cómo."

En Clean Architecture, el dominio **nunca** importa código de capas externas. En vez de eso, define contratos (interfaces) que las capas externas deben implementar.

```
┌─────────────────────────────────┐
│  DOMINIO                        │
│                                 │
│  "Necesito generar un número    │
│   aleatorio" → define interfaz  │
│                                 │
│  interface RandomNumberGenerator│
│    generate(min, max): number   │
└─────────────────────────────────┘
         ▲
         │ implementa
┌─────────────────────────────────┐
│  INFRAESTRUCTURA                │
│                                 │
│  class MathRandomNumberGenerator│
│    generate(min, max): number { │
│      return Math.random()...    │
│    }                            │
└─────────────────────────────────┘
```

## 🔍 Problema actual

En tu código actual, `Machine.ts` hace esto:

```typescript
// ❌ El dominio CONOCE y USA Math.random() directamente
generateWeapon(): Weapon {
    const weapons = [Weapon.Rock, Weapon.Paper, Weapon.Scissors]
    const randomNumber = Math.floor(Math.random() * weapons.length)
    return weapons[randomNumber]
}
```

`Math.random()` es un **detalle de implementación**. ¿Qué problemas causa?

1. **No puedes testear** — No puedes predecir qué arma elegirá la máquina
2. **No puedes cambiar** — Si mañana quieres usar un algoritmo diferente, tienes que modificar el dominio
3. **Viola la Dependency Rule** — El dominio depende de una API de infraestructura

## ✅ Qué hacer

Crear la carpeta `src/domain/ports/` y dentro el archivo `RandomNumberGenerator.ts`:

### Archivo a crear

📁 `src/domain/ports/RandomNumberGenerator.ts`

```typescript
export interface RandomNumberGenerator {
    generate(min: number, max: number): number;
}
```

## 🧪 Verificación

Después de crear este archivo:

1. ✅ El proyecto debe compilar sin errores (`npx tsc --noEmit`)
2. ✅ No se rompe nada — solo agregamos una interfaz nueva
3. ✅ La interfaz NO importa nada de fuera del dominio

## 💡 Reflexión

Pregúntate:
- ¿La interfaz `RandomNumberGenerator` sabe algo sobre `Math.random()`? **No.**
- ¿Sabe algo sobre la CLI? **No.**
- ¿Sabe algo sobre HTTP? **No.**

Solo dice: *"Dame un número entre min y max"*. Eso es un Port puro. ✅

## Estado: ✅ Completado
