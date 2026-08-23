# 22 — Extraer el Controller de Entrada

## 🎯 Objetivo

Crear un controller que adapte la entrada cruda del CLI al request model de la
aplicación, sin leer la consola, presentar resultados ni ejecutar infraestructura.

## 📚 Concepto: Interface Adapter

Un controller traduce el protocolo externo al lenguaje del caso de uso. En este
proyecto, los números y palabras introducidos por consola son detalles de entrada;
`Weapon` y `PlayGameRequest` son el lenguaje que entiende la aplicación.

## 🔍 Problema actual

`GameCli` solicita texto, lo normaliza, decide si es válido, ejecuta el caso de uso
y coordina errores. Aunque el presenter ya está separado, el adapter de entrada
sigue mezclado con el driver `readline`.

## ✅ Qué hacer

1. Crear `GameController` con el método:

```ts
handle(rawSelection: string): void
```

2. Inyectarle `PlayGameInputBoundary` y una interfaz de presentación de errores:

```ts
export interface InvalidInputOutputBoundary {
    presentInvalidSelection(): void;
}
```

3. Mover al controller la normalización `trim().toLowerCase()` y el mapa de
   entradas `1`, `2`, `3`, `piedra`, `papel`, `tijeras`.
4. Ante una entrada válida, construir `{ playerWeapon }` y ejecutar una sola vez
   el input boundary.
5. Ante una entrada inválida, no ejecutar el caso de uso y notificar al presenter.
6. Hacer que `GamePresenter` implemente también el boundary de error, conservando
   allí el texto y el emoji mostrados.
7. Dejar temporalmente a `GameCli` con una sola responsabilidad: leer una línea y
   entregarla al controller.

## 🧪 Pruebas

- Probar las seis entradas válidas y sus armas correspondientes.
- Probar mayúsculas y espacios alrededor de una entrada válida.
- Probar texto desconocido y cadena vacía.
- Verificar que un valor inválido no llama al input boundary.
- Verificar que un valor válido no llama al presenter de errores.

## ✅ Criterios de finalización

- `GameController` no importa `readline`, `console`, presenter concreto ni infra.
- El controller depende solo de boundaries.
- `GameCli` no contiene parsing ni conoce armas.
- Todos los caminos del controller están cubiertos.
- `npm test` y `npx tsc --noEmit` pasan.

## 💡 Reflexión

Validar en el controller protege a la aplicación de convenciones del protocolo sin
convertir números de menú o palabras localizadas en reglas del dominio.

## Estado: ⬜ Pendiente
