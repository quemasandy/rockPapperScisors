# 23 — Aislar los Drivers de Consola

## 🎯 Objetivo

Encerrar `readline`, `console` y el ciclo de ejecución del CLI en adapters externos
reemplazables, dejando controllers y presenters libres de APIs de Node.js.

## 📚 Concepto: Frameworks & Drivers

El anillo exterior contiene los detalles más volátiles: consola, red, base de
datos, reloj o generadores concretos. Las políticas internas no deben saber cuál
de esos mecanismos inicia el flujo ni dónde se escribe el resultado.

## 🔍 Problema actual

Aunque el controller ya adapta la entrada, `GameCli` construye directamente una
interfaz de `readline`. La vista concreta usa `console.log`. Esos detalles todavía
no están identificados claramente como drivers exteriores.

## ✅ Qué hacer

1. Definir junto al runner el contrato:

```ts
export interface InputReader {
    read(prompt: string): Promise<string>;
}
```

2. Crear `ReadlineInputReader`, única clase que importa `readline`.
3. Renombrar `GameCli` a `CliGameRunner`; debe recibir `InputReader` y
   `GameController` por constructor.
4. Hacer que `CliGameRunner.start()` solicite una sola selección y entregue el
   texto al controller, sin parsing ni presentación.
5. Ubicar el prompt del menú en el driver CLI, porque es texto propio de esa UI.
6. Hacer que `ConsoleGameView` sea la única clase que escribe resultados mediante
   `console.log`.
7. Manejar errores inesperados de arranque/I/O en `main.ts` con `console.error` y
   `process.exitCode = 1`; no convertirlos en resultados del dominio.

## 🧪 Pruebas

- Probar `CliGameRunner` con un `InputReader` fake y un controller spy.
- Verificar que el prompt se envía al reader y la respuesta intacta al controller.
- Probar `ConsoleGameView` con un spy de `console.log` o un writer inyectado.
- Verificar que controller, interactor y presenter no importan módulos de Node.js.

## ✅ Criterios de finalización

- Solo los archivos del driver CLI conocen `readline`, `console` o `process`.
- El runner puede probarse sin abrir stdin.
- La vista concreta no contiene decisiones ni formato.
- La aplicación sigue ejecutando una ronda por invocación.
- `npm test` y `npx tsc --noEmit` pasan.

## 💡 Reflexión

Un driver es un detalle de entrega. Si mañana se añade HTTP, se reemplaza el punto
de entrada y se reutilizan el caso de uso y el dominio sin enseñarles qué es una
petición web.

## Estado: ⬜ Pendiente
