# 21 — Implementar el Output Boundary Canónico

## 🎯 Objetivo

Cambiar el flujo para que el interactor entregue su respuesta a un Output Boundary
y el presenter la transforme, en lugar de devolver un DTO al controller.

## 📚 Concepto: Interactor → Presenter

En el flujo canónico de Clean Architecture, el caso de uso conoce una abstracción
de salida definida por aplicación. El presenter implementa ese contrato y decide
cómo convertir la respuesta en un ViewModel. El interactor nunca conoce la vista.

## 🔍 Problema actual

`PlayGameUseCase.execute` devuelve datos crudos a `GameCli`, que luego coordina el
presenter y la view. El controller conoce demasiados pasos del flujo de salida y el
caso de uso no controla su boundary de presentación.

## ✅ Qué hacer

1. Definir en aplicación:

```ts
export interface PlayGameRequest {
    playerWeapon: Weapon;
}

export interface PlayGameResponse {
    playerWeapon: Weapon;
    opponentWeapon: Weapon;
    result: GameResult;
}

export interface PlayGameInputBoundary {
    execute(request: PlayGameRequest): void;
}

export interface PlayGameOutputBoundary {
    present(response: PlayGameResponse): void;
}
```

2. Renombrar `PlayGameUseCase` a `PlayGameInteractor` y hacer que implemente el
   input boundary.
3. Inyectar el output boundary en el interactor y cambiar `execute` para que no
   retorne datos.
4. Hacer que `GamePresenter` implemente `PlayGameOutputBoundary`.
5. Definir una interfaz de vista junto al presenter y hacer que
   `ConsoleGameView` la implemente. El presenter recibirá la vista por constructor.
6. Inyectar view, presenter e interactor desde `main.ts`; ninguna de esas piezas
   debe construirse dentro de `GameCli`.

## 🧪 Pruebas

- El interactor envía una sola respuesta al output boundary.
- La respuesta contiene ambas armas y el resultado del dominio.
- El interactor no retorna un DTO.
- El presenter transforma la respuesta y llama una sola vez a la vista.
- Los tests del presenter usan una view spy, nunca `console.log`.

## ✅ Criterios de finalización

- El controller solo ejecuta el input boundary.
- El interactor solo conoce la abstracción de salida de aplicación.
- El presenter no conoce el interactor concreto.
- Todos los colaboradores concretos se conectan en `main.ts`.
- `npm test` y `npx tsc --noEmit` pasan.

## 💡 Reflexión

El Output Boundary permite cambiar la presentación sin cambiar el caso de uso y,
al mismo tiempo, evita que el controller tenga que reconstruir el flujo de salida.

## Estado: ⬜ Pendiente
