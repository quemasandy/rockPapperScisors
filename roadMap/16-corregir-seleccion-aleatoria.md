# 16 — Corregir la Selección Aleatoria

## 🎯 Objetivo

Corregir el límite superior del generador aleatorio y dejar una prueba de
regresión que demuestre que la máquina puede elegir las tres armas.

## 📚 Concepto: Test de Regresión

Un test de regresión reproduce primero un defecto observable y después evita que
vuelva a aparecer. En este caso, el contrato `generate(min, max)` se usa con ambos
límites incluidos, por lo que la implementación también debe incluir `max`.

## 🔍 Problema actual

La expresión actual es:

```ts
Math.floor(Math.random() * (max - min)) + min
```

Al ejecutar `generate(0, 2)` solo puede producir `0` o `1`. Los tests de dominio
no lo detectan porque su fake devuelve directamente el índice solicitado.

## ✅ Qué hacer

1. Crear el test del adapter en `src/infra/__tests__/MathRandomNumberGenerator.test.ts`.
2. Sustituir temporalmente `Math.random` con `vi.spyOn` y restaurarlo después de
   cada prueba.
3. Verificar que un valor cercano a `0` produce el mínimo y `0.999999` produce el
   máximo.
4. Corregir la fórmula a:

```ts
Math.floor(Math.random() * (max - min + 1)) + min
```

5. No cambiar aún el port ni `Machine`; eso corresponde a la tarea 19.

## 🧪 Pruebas

- `Math.random() = 0` con rango `0..2` devuelve `0`.
- `Math.random() = 0.999999` con rango `0..2` devuelve `2`.
- Un rango desplazado respeta su mínimo y su máximo.
- Los tests existentes de `Machine` y `Game` continúan pasando.

## ✅ Criterios de finalización

- Piedra, papel y tijeras son alcanzables en producción.
- La prueba falla con la fórmula antigua y pasa con la nueva.
- No quedan mocks globales activos entre pruebas.
- `npm test` y `npx tsc --noEmit` pasan.

## 💡 Reflexión

La inversión de dependencias vuelve testeable al dominio, pero no reemplaza las
pruebas de los adapters. Cada lado de un boundary tiene riesgos diferentes.

## Estado: ⬜ Pendiente
