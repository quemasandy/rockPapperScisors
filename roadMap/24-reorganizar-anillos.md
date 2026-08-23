# 24 — Reorganizar las Carpetas por Anillos

## 🎯 Objetivo

Hacer visible la Dependency Rule en la estructura de directorios y dejar
`main.ts` como el único archivo que conoce implementaciones de todos los anillos.

## 📚 Concepto: Arquitectura que Grita

La estructura debe comunicar primero las políticas y límites del sistema. Mover
archivos no crea Clean Architecture por sí solo, pero una estructura coherente
hace más difíciles los imports accidentales y prepara su validación automática.

## 🔍 Problema actual

Las carpetas `controller`, `presentation` e `infra` mezclan nombres de patrones y
capas. La relación entre un adapter, su port y el framework que utiliza no es
evidente al navegar el proyecto.

## ✅ Qué hacer

Reorganizar sin cambiar comportamiento:

```text
src/
├── domain/
│   ├── Game.ts
│   ├── GameResult.ts
│   └── Weapon.ts
├── application/
│   ├── ports/
│   │   ├── input/
│   │   └── output/
│   └── use-cases/
├── interface-adapters/
│   ├── controllers/
│   ├── presenters/
│   └── view-models/
├── frameworks/
│   ├── cli/
│   └── random/
└── main.ts
```

1. Mover `GameResult` a su propio módulo de dominio.
2. Colocar input boundaries en `application/ports/input` y output/gateway ports en
   `application/ports/output`.
3. Mover controller, presenter, ViewModel e interfaz de view al anillo de adapters.
4. Mover runner, reader, vista de consola y provider aleatorio a `frameworks`.
5. Actualizar imports con rutas explícitas; no crear archivos `index.ts` globales
   que oculten dependencias entre capas.
6. Mantener `main.ts` en la raíz de `src` como composition root.

## 🧪 Pruebas

- Ejecutar todos los tests después de cada grupo de movimientos.
- Buscar imports que apunten a las carpetas antiguas.
- Ejecutar manualmente `npm start` y completar una ronda válida.
- Probar una entrada inválida y confirmar el mismo mensaje.

## ✅ Criterios de finalización

- No quedan archivos productivos en `controller`, `presentation` o `infra`.
- La ubicación de cada archivo coincide con su responsabilidad.
- `main.ts` es el único lugar que construye implementaciones concretas.
- No cambian contratos ni mensajes durante esta tarea mecánica.
- `npm test`, `npx tsc --noEmit` y `npm start` funcionan.

## 💡 Reflexión

Las carpetas documentan límites, pero la regla real está en los imports. Por eso
esta tarea prepara, pero no sustituye, la comprobación automática de la tarea 28.

## Estado: ⬜ Pendiente
