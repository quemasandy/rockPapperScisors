# 25 — Separar Tests y Test Doubles de Producción

## 🎯 Objetivo

Sacar pruebas, fakes, stubs y spies del árbol productivo y organizarlos según el
anillo o flujo que verifican.

## 📚 Concepto: Frontera Producción/Testing

Los test doubles pueden implementar ports internos, pero no forman parte del
producto entregable. Una estructura separada evita que sean compilados en `dist`
o importados accidentalmente por código de producción.

## 🔍 Problema actual

Los tests están dentro de `src` y `FakeRandomNumberGenerator` vive bajo
`domain/entities/__tests__`. Esto hace parecer que un fake técnico pertenece al
dominio y permite que el build productivo incluya artefactos de testing.

## ✅ Qué hacer

Crear esta estructura:

```text
tests/
├── unit/
│   ├── domain/
│   ├── application/
│   ├── interface-adapters/
│   └── frameworks/
├── integration/
│   └── cli/
└── support/
```

1. Mover cada suite a la carpeta del componente que prueba.
2. Centralizar en `tests/support` únicamente doubles reutilizados por más de una
   suite: `FakeOpponentWeaponProvider`, output spy, view spy e input reader fake.
3. Mantener doubles locales dentro de una suite cuando solo se utilicen allí.
4. Eliminar todas las carpetas `__tests__` de `src`.
5. Añadir un smoke test del flujo CLI usando reader/view reemplazables, sin abrir
   procesos ni depender de stdin real.
6. No configurar aún el build; esa separación corresponde a la tarea 26.

## 🧪 Pruebas

- Dominio: las nueve combinaciones de armas.
- Aplicación: coordinación y entrega al output boundary.
- Controller: parsing válido e inválido.
- Presenter: traducción, mensajes y ViewModel.
- Frameworks: selección aleatoria y delegación del runner.
- Integración: una ronda completa con adapters en memoria.

## ✅ Criterios de finalización

- `src` no contiene tests ni test doubles.
- Ningún archivo productivo importa desde `tests`.
- Vitest descubre y ejecuta todas las suites desde la nueva ubicación.
- El smoke test no toca stdin ni requiere interacción manual.
- `npm test` y `npx tsc --noEmit` pasan con la configuración vigente.

## 💡 Reflexión

Los tests pueden conocer el sistema completo; el sistema productivo nunca debe
conocer sus tests. Esa asimetría también es una regla de dependencias.

## Estado: ⬜ Pendiente
