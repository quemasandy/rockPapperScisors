# 19 — Crear el Port Semántico del Oponente

## 🎯 Objetivo

Reemplazar el port técnico de números aleatorios por un contrato que exprese lo
que el caso de uso realmente necesita: elegir el arma del oponente.

## 📚 Concepto: Ports Orientados al Negocio

Un port pertenece al consumidor y habla su lenguaje. El caso de uso no necesita
números, rangos ni índices; necesita un `Weapon`. Ocultar el mecanismo detrás de
un contrato semántico reduce conocimiento técnico y hace los tests más expresivos.

## 🔍 Problema actual

`RandomNumberGenerator.generate(min, max)` filtra detalles de implementación hacia
el centro. `Machine` solo traduce un índice a un arma y no tiene identidad, estado
ni reglas que justifiquen tratarlo como entidad.

## ✅ Qué hacer

1. Crear `src/application/ports/OpponentWeaponProvider.ts`:

```ts
export interface OpponentWeaponProvider {
    choose(): Weapon;
}
```

2. Crear `MathRandomOpponentWeaponProvider` en infraestructura. Debe elegir sobre
   la colección completa de armas con:

```ts
Math.floor(Math.random() * weapons.length)
```

3. Inyectar `Game` y `OpponentWeaponProvider` en `PlayGameUseCase` desde `main.ts`.
4. Hacer que el caso de uso pida el arma al provider y la entregue a `Game.play`.
5. Eliminar `Machine`, `RandomNumberGenerator`, `MathRandomNumberGenerator` y sus
   tests/fakes después de actualizar todos los imports.

## 🧪 Pruebas

- Crear `FakeOpponentWeaponProvider` con un arma predeterminada.
- Probar que el caso de uso utiliza exactamente el arma entregada por el fake.
- Probar el adapter con fuentes cercanas a `0`, a cada división interna y a `1`.
- Verificar que las tres armas sean alcanzables y nunca se devuelva `undefined`.

## ✅ Criterios de finalización

- La aplicación depende de `OpponentWeaponProvider`, no de números aleatorios.
- No existen `Machine` ni `RandomNumberGenerator` en producción.
- El adapter es la única pieza que conoce `Math.random`.
- `main.ts` ensambla el provider concreto.
- `npm test` y `npx tsc --noEmit` pasan.

## 💡 Reflexión

La abstracción correcta no describe la herramienta externa; describe la capacidad
que la política interna solicita a esa herramienta.

## Estado: ⬜ Pendiente
