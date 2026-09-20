# Arquitectura final

Este documento describe el estado canónico del proyecto al completar la fase 2
del roadmap. Las tareas 01–14 conservan el recorrido pedagógico de la primera
versión; cuando un ejemplo histórico contradiga este documento o el código actual,
prevalecen el código, las reglas de `dependency-cruiser` y esta descripción.

## Alcance

La aplicación ejecuta **una ronda** de Piedra-Papel-Tijera mediante CLI:

1. lee una selección;
2. la traduce a un concepto del dominio;
3. elige el arma del oponente;
4. evalúa la ronda;
5. presenta un resultado o un error de entrada.

No hay persistencia, historial, servidor web, API remota ni modos adicionales. No
se crean repositories, servicios web o interfaces “por si acaso”: un boundary solo
se introduce cuando una política interna tiene un consumidor real que necesita
aislarse de un detalle externo.

## Estructura productiva

```text
src/
├── domain/
│   ├── Game.ts
│   ├── GameResult.ts
│   └── Weapon.ts
├── application/
│   ├── ports/
│   │   ├── input/
│   │   │   └── PlayGameInputBoundary.ts
│   │   └── output/
│   │       ├── OpponentWeaponProvider.ts
│   │       └── PlayGameOutputBoundary.ts
│   └── use-cases/
│       └── PlayGameInteractor.ts
├── interface-adapters/
│   ├── controllers/
│   │   └── GameController.ts
│   ├── ports/
│   │   ├── GameView.ts
│   │   └── InvalidInputOutputBoundary.ts
│   ├── presenters/
│   │   ├── GamePresenter.ts
│   │   └── JsonGamePresenter.ts
│   └── view-models/
│       └── GameViewModel.ts
├── frameworks/
│   ├── cli/
│   │   ├── CliGameRunner.ts
│   │   ├── ConsoleGameView.ts
│   │   └── ReadlineInputReader.ts
│   └── random/
│       └── MathRandomOpponentWeaponProvider.ts
└── main.ts
```

## Responsabilidad de cada anillo

### Domain

Contiene el lenguaje y las reglas del juego: `Weapon`, `GameResult` y las nueve
combinaciones que evalúa `Game`. Es determinista: recibe ambas armas y no conoce
aleatoriedad, traducciones, ports, consola ni casos de uso.

### Application

Define y ejecuta el caso de uso. `PlayGameInteractor` coordina el dominio, solicita
un arma rival mediante un gateway y entrega la respuesta a un output boundary. La
capa es propietaria de los contratos que necesita para esa coordinación.

### Interface adapters

Traduce entre protocolos externos y modelos internos. `GameController` convierte
texto del CLI en un `PlayGameRequest`; `GamePresenter` convierte respuestas o
errores en ViewModels ya formateados. `JsonGamePresenter` ofrece una presentación
alternativa serializada e inyecta una función de escritura. Ninguno conoce APIs
de Node.js ni implementaciones concretas de frameworks.

### Frameworks & drivers

Encierra los detalles reemplazables: `readline`, `console.log`, el ciclo de una
ronda del CLI y `Math.random`. Sus implementaciones dependen de contratos o
modelos definidos en anillos internos.

### Composition root

`main.ts` construye las implementaciones concretas, las inyecta y arranca la
aplicación. Es el único módulo autorizado a conocer todos los anillos. Esta
excepción permite ensamblar el grafo; no permite ciclos ni convierte a `main.ts`
en un lugar para reglas de negocio, parsing o presentación.

## Ownership de los contratos

Un port pertenece a la política interna cuyo protocolo protege, no
necesariamente al dominio. Un input boundary define lo que application ofrece;
los output boundaries y gateways definen lo que application necesita del
exterior.

| Contrato | Propietario | Quién lo usa | Implementación actual |
|---|---|---|---|
| `PlayGameInputBoundary` | Application | `GameController` inicia el caso de uso | `PlayGameInteractor` |
| `PlayGameOutputBoundary` | Application | `PlayGameInteractor` publica la respuesta | `GamePresenter`, `JsonGamePresenter` |
| `OpponentWeaponProvider` | Application | `PlayGameInteractor` solicita un arma rival | `MathRandomOpponentWeaponProvider` |
| `InvalidInputOutputBoundary` | Interface adapters | `GameController` notifica una selección inválida | `GamePresenter`, `JsonGamePresenter` |
| `GameView` | Interface adapters | `GamePresenter` entrega ViewModels | `ConsoleGameView` |
| `InputReader` | Driver CLI | `CliGameRunner` solicita texto | `ReadlineInputReader` |

Los tres primeros viven en application: entrada, salida y gateway. El boundary
de entrada inválida pertenece a interface adapters porque el rechazo se detecta
al traducir texto del CLI, antes de ejecutar el caso de uso; permite que el
controller notifique el rechazo sin conocer el presenter concreto. Este contrato,
`GameView` e `InputReader` son abstracciones locales de anillos exteriores con un
consumidor concreto; no se trasladan a application o domain ni se generalizan más
de lo necesario.

## Flujo de control en runtime

Las flechas de este diagrama significan **llamadas realizadas durante una ronda**,
no imports:

```text
Usuario
  │
  ▼
ReadlineInputReader ──► CliGameRunner ──► GameController
                                             ├── selección inválida
                                             │      └──► InvalidInputOutputBoundary ──► JsonGamePresenter
                                             │
                                             └── selección válida
                                                    └──► PlayGameInputBoundary
                                                               └──► PlayGameInteractor
                                                                      ├──► OpponentWeaponProvider
                                                                      │          └──► MathRandomOpponentWeaponProvider
                                                                      ├──► Game
                                                                      └──► PlayGameOutputBoundary ──► JsonGamePresenter

JsonGamePresenter ──► writeLine (`console.log`) ──► Usuario
```

En la rama inválida, `JsonGamePresenter` también implementa
`InvalidInputOutputBoundary` y termina en la misma función de escritura.

`JsonGamePresenter` ocupa los dos lugares del presenter en esta composición. En
vez de usar `GameView`, recibe `writeLine: (line: string) => void` y produce una
única línea JSON. `GamePresenter` y `ConsoleGameView` permanecen disponibles como
presentación textual alternativa; sustituir una por otra solo cambia el
ensamblado del composition root.

## Dirección de dependencias de código

Las flechas siguientes significan **imports permitidos**. Apuntan siempre desde
un mecanismo exterior hacia una política interior:

```text
exterior                                                        interior

frameworks ─────► interface-adapters ─────► application ─────► domain
frameworks ───────────────────────────────► application
frameworks ──────────────────────────────────────────────────► domain
interface-adapters ──────────────────────────────────────────► domain

main.ts (composition root) ──► frameworks / interface-adapters / application / domain
```

Una capa puede importar su propio anillo o saltar directamente a cualquier anillo
más interno. La cadena muestra la única orientación válida, no obliga a crear una
dependencia artificial por cada paso intermedio.

| Origen | Puede depender de |
|---|---|
| `domain` | `domain` |
| `application` | `application`, `domain` |
| `interface-adapters` | `interface-adapters`, `application`, `domain` |
| `frameworks` | `frameworks`, `interface-adapters`, `application`, `domain` |
| `main.ts` | todos los anillos para componerlos |

Además, ningún módulo de `src` puede participar en una dependencia circular,
incluido `main.ts`. Estas reglas abarcan también los `import type` y se ejecutan
con `npm run test:architecture`, definido en la tarea 28.

## Por qué ambos diagramas apuntan de forma distinta

En runtime, `PlayGameInteractor` llama a un objeto que resulta ser
`GamePresenter`. Sin embargo, su código no importa esa clase: solo conoce
`PlayGameOutputBoundary`, contrato propiedad de application. `main.ts` inyecta la
implementación externa.

Lo mismo ocurre con `OpponentWeaponProvider`: el interactor inicia la llamada
hacia el adapter aleatorio, pero depende únicamente del gateway interno. La
inversión de dependencias permite que el control cruce un boundary hacia afuera
sin que el código de la política interna importe el mecanismo exterior.

## Cambios que quedan aislados del dominio

| Cambio | Piezas afectadas | ¿Cambia `domain`? |
|---|---|---|
| Cambiar emojis, textos o idioma de salida | Presenter y sus pruebas | No |
| Sustituir `console.log` por otra vista | Nuevo driver de vista y `main.ts` | No |
| Cambiar `readline` por otro mecanismo de entrada | Driver, controller correspondiente y `main.ts` | No |
| Usar otra estrategia para elegir al oponente | Implementación de `OpponentWeaponProvider` y `main.ts` | No |
| Probar una ronda con datos deterministas | Doubles bajo `tests` | No |

Cambiar las reglas de qué arma vence a cuál sí debe modificar el dominio: esa es
su responsabilidad, no una fuga arquitectónica.

Si aparece una necesidad real de persistencia o comunicación web, primero se
identifica la política interna que la consume y el contrato semántico que necesita;
después se crea el adapter externo. Hasta entonces no existen repositories,
servicios ni interfaces especulativas.

## Verificación viva

La documentación se contrasta con cuatro mecanismos ejecutables:

- `npm run typecheck` valida producción y tests con TypeScript estricto;
- `npm test` valida comportamiento y el flujo CLI en memoria;
- `npm run test:architecture` compara todos los imports de `src` con la
  Dependency Rule y rechaza ciclos;
- `npm run build` emite únicamente el producto bajo `dist`.

`npm run verify` ejecuta los cuatro controles en ese orden. Si la estructura o
los imports cambian, este documento y los diagramas deben actualizarse junto con
las fitness functions, no de forma independiente.
