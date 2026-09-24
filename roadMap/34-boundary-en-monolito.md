# 34 — Poner a Prueba un Boundary del Monolito

## 🎯 Objetivo

Demostrar que el comportamiento puede seguir correcto aunque se introduzca una
dependencia de código que rompe el límite entre aplicación y presentación.

**Concepto:** boundaries dentro de un mismo proceso.
**Requiere:** arquitectura y comando `analyze` actuales. **Tiempo:** 20–30 minutos.

## 📚 Qué vas a aprender

Los módulos del juego conviven en un proceso y se comunican mediante llamadas
en memoria. Esa separación necesita disciplina sobre las dependencias. Un
`import type` desaparece del JavaScript, pero sigue acoplando el código fuente.
La comprobación arquitectónica protege al caso de uso de tipos exteriores; su
coste es mantener las reglas alineadas con el diseño.

## ✅ Qué hacer

1. Predice qué ocurrirá en el type-check, los tests y el control de arquitectura
   si `application` importa un tipo del presenter. Revisa la regla
   `application-does-not-depend-on-outer-layers` y `tsPreCompilationDeps` en
   [.dependency-cruiser.cjs](../.dependency-cruiser.cjs).
2. Solo en
   [AnalyzeWeaponInteractor.ts](../src/application/use-cases/AnalyzeWeaponInteractor.ts),
   introduce temporalmente un `import type` de `AnalyzeWeaponPresenter` y úsalo
   en un alias de tipo exportado llamado `BoundaryProbe`. Exportarlo evita un
   error por tipo sin usar. Mantén iguales el constructor y `execute`: quieres
   aislar el efecto de la dependencia, sin cambiar la lógica ni los tests.
3. Ejecuta por separado `npm run typecheck`,
   `npm test -- tests/unit/application/AnalyzeWeaponInteractor.test.ts` y
   `npm run test:architecture`. Anota los resultados e identifica la dependencia
   exacta que rechaza la última comprobación.
4. Retira únicamente el import y el alias del experimento. Revisa el diff para
   comprobar que producción vuelve a su estado previo y termina con
   `npm run verify`.

**Alcance:** el cambio incorrecto es temporal. Conserva solo tu predicción y la
evidencia en este ejercicio; las reglas de arquitectura permanecen iguales.

## 🧪 Cómo comprobarlo

- Con la dependencia temporal, el type-check y el test del interactor pasan,
  pero el control arquitectónico señala el import hacia `interface-adapters`.
- Tras retirarla, `npm run verify` pasa y no queda ningún `BoundaryProbe`.

## 💡 Reflexión

¿Por qué los tests de comportamiento no detectaron el problema? ¿Qué demuestra
el fallo arquitectónico sobre la protección de un boundary dentro del monolito?

## ✅ Criterios de finalización

- [ ] He contrastado mi predicción con los tres resultados y explicado el fallo.
- [ ] He retirado la dependencia temporal y todas las verificaciones pasan.

Al terminar, marca este archivo y el [índice](./README.md) como completados.

## Estado: ⬜ Pendiente
