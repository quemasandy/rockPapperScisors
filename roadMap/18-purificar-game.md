# 18 — Convertir `Game` en Dominio Puro

## 🎯 Objetivo

Hacer que `Game` calcule exclusivamente el resultado de una ronda a partir de dos
armas conocidas, sin generar datos aleatorios ni construir otros colaboradores.

## 📚 Concepto: Entidades sin Dependencias Técnicas

Las reglas de negocio más internas deben ser deterministas. La selección del
oponente es una política de la aplicación; decidir quién vence entre dos armas es
una regla del dominio.

## 🔍 Problema actual

`Game` recibe `RandomNumberGenerator`, construye `Machine` y elige internamente el
arma rival. Esto obliga a usar un fake técnico para probar una tabla de reglas que
en realidad no necesita aleatoriedad.

## ✅ Qué hacer

1. Eliminar el constructor y la propiedad `machine` de `Game`.
2. Cambiar su API a:

```ts
play(
    playerWeapon: Weapon,
    opponentWeapon: Weapon,
): { result: GameResult; opponentWeapon: Weapon }
```

3. Mover la tabla `winsAgainst` a una constante inmutable del módulo para no
   reconstruirla en cada ronda.
4. Adaptar temporalmente `PlayGameUseCase`: allí se usará `Machine` para obtener
   el arma rival y después se invocará el dominio puro.
5. Cambiar el nombre `machineWeapon` por `opponentWeapon` dentro del dominio. El
   presenter seguirá mostrando “La máquina”.
6. Mantener `Machine` y el port aleatorio solo hasta la tarea 19.

## 🧪 Pruebas

- Probar las tres combinaciones de empate.
- Probar las tres victorias del jugador.
- Probar las tres derrotas del jugador.
- Verificar que el resultado devuelve el arma rival recibida.
- Los nueve casos deben llamar directamente a `Game.play` sin fakes ni mocks.

## ✅ Criterios de finalización

- `src/domain/entities/Game.ts` no importa ningún port.
- `Game` no contiene `new Machine(...)` ni conoce aleatoriedad.
- Las nueve combinaciones del dominio están cubiertas.
- La aplicación CLI conserva el mismo comportamiento.
- `npm test` y `npx tsc --noEmit` pasan.

## 💡 Reflexión

La prueba más fuerte de pureza es poder ejecutar todas las reglas con valores
directos. Si una regla determinista necesita un mock técnico, probablemente hay
dos responsabilidades mezcladas.

## Estado: ✅ Completado
