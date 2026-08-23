# 🗺️ Road Map: Dominando Clean Architecture

## Contexto

Este roadmap transforma el proyecto Rock-Paper-Scissors en una **Clean Architecture pura**.
Cada archivo es una subtarea con explicación, código de ejemplo y verificación.

## Reglas del roadmap

- ✅ Cada subtarea se puede completar de forma **independiente y compilable**
- ✅ Después de cada subtarea el proyecto **debe funcionar**
- ✅ Cada subtarea introduce **un solo concepto** de Clean Architecture

## Fase 1 — Fundamentos

| # | Subtarea | Concepto clave | Estado |
|---|----------|----------------|--------|
| 01 | [Crear Ports del dominio](./01-crear-ports.md) | Dependency Inversion, Interfaces | ✅ |
| 02 | [Crear Adapter de infraestructura](./02-crear-adapter-infra.md) | Adapters, Implementación de Ports | ✅ |
| 03 | [Inyectar dependencias en entidades](./03-inyectar-en-entidades.md) | Dependency Injection en el dominio | ✅ |
| 04 | [Corregir lógica de negocio](./04-logica-de-negocio.md) | Domain Logic, Value Objects | ✅ |
| 05 | [Crear Port del caso de uso](./05-port-caso-de-uso.md) | Input/Output Ports, DTOs | ✅ |
| 06 | [Refactorizar caso de uso](./06-refactorizar-use-case.md) | Use Case, Orquestación | ✅ |
| 07 | [Crear Port de I/O para UI](./07-port-io-ui.md) | Output Port, UI Abstraction | ✅ |
| 08 | [Refactorizar controller con DI](./08-refactorizar-controller.md) | Adapter, Inversión de Control | ✅ |
| 09 | [Composition Root](./09-composition-root.md) | Wiring, Entry Point | ✅ |
| 10 | [Limpiar código muerto](./10-limpiar-codigo-muerto.md) | Code Hygiene | ✅ |
| 11 | [Configurar Vitest](./11-configurar-vitest.md) | Testing Setup | ✅ |
| 12 | [Tests del dominio](./12-tests-dominio.md) | Unit Testing, Fakes | ✅ |
| 13 | [Tests del caso de uso](./13-tests-use-case.md) | Integration Testing | ✅ |
| 14 | [Humble Object: Presenter y View](./14-humble-object-presenter.md) | Humble Object, Presenter, ViewModel | ✅ |

## Fase 2 — Clean Architecture canónica

Esta segunda fase corrige los límites que todavía son técnicos o están ubicados en
la capa equivocada. Todas las tareas empiezan pendientes y deben realizarse en
orden: cada una mantiene el proyecto compilando, ejecutándose y con sus pruebas
en verde.

| # | Subtarea | Concepto clave | Estado |
|---|----------|----------------|--------|
| 15 | [Fijar el entorno de ejecución](./15-fijar-entorno-node.md) | Reproducibilidad, Node compatible | ⬜ |
| 16 | [Corregir la selección aleatoria](./16-corregir-seleccion-aleatoria.md) | Test de regresión, límites inclusivos | ⬜ |
| 17 | [Neutralizar el lenguaje del dominio](./17-neutralizar-lenguaje-dominio.md) | Dominio independiente de idioma/UI | ⬜ |
| 18 | [Convertir `Game` en dominio puro](./18-purificar-game.md) | Entidades sin dependencias técnicas | ⬜ |
| 19 | [Crear el port semántico del oponente](./19-port-opponent-weapon-provider.md) | Ports orientados al negocio | ⬜ |
| 20 | [Dar propiedad correcta a los ports](./20-reubicar-ports-aplicacion.md) | Ownership de boundaries | ⬜ |
| 21 | [Implementar el Output Boundary](./21-output-boundary-canonico.md) | Interactor → Presenter | ⬜ |
| 22 | [Extraer el controller de entrada](./22-extraer-game-controller.md) | Interface Adapter, validación | ⬜ |
| 23 | [Aislar los drivers de consola](./23-aislar-drivers-cli.md) | Frameworks & Drivers | ⬜ |
| 24 | [Reorganizar las carpetas por anillos](./24-reorganizar-anillos.md) | Dependency Rule visible | ⬜ |
| 25 | [Separar tests y test doubles](./25-separar-tests-produccion.md) | Frontera producción/testing | ⬜ |
| 26 | [Separar build y type-check](./26-configurar-build-produccion.md) | Configuración de entrega | ⬜ |
| 27 | [Endurecer TypeScript](./27-endurecer-typescript.md) | Seguridad estática | ⬜ |
| 28 | [Automatizar la Dependency Rule](./28-tests-arquitectura.md) | Fitness functions arquitectónicas | ⬜ |
| 29 | [Consolidar la documentación final](./29-documentar-arquitectura-final.md) | Decisiones y diagrama definitivo | ⬜ |

> **Máxima pureza no significa máxima cantidad de interfaces.** Se crean
> boundaries explícitos cuando existe un límite arquitectónico; una clase que no
> cruza ningún límite no necesita una abstracción artificial.

## Arquitectura obtenida al finalizar la fase 1

```
main.ts (Composition Root)
   │
   ├──► GameCli (controller) ──► PlayGameInput (port)
   │         │                          ▲
   │         ├──► GameView (humble)     │
   │         └──► GamePresenter ──► GameViewModel
   │
   ├──► PlayGameUseCase (application) ──┘ implements
   │         │
   │         └──► Game (domain) ──► RandomNumberGenerator (port)
   │                                         ▲
   └──► MathRandomNumberGenerator (infra) ───┘ implements
```

> **Flechas = dirección de dependencia.** Todo apunta hacia el dominio. ✅

Este diagrama representa el punto de partida de la fase 2, no el diseño final.
Todavía existen ports de aplicación dentro de `domain`, dependencias técnicas en
las entidades y responsabilidades de entrada, control y salida concentradas en
`GameCli`.

## Arquitectura objetivo de la fase 2

El flujo de ejecución será:

```text
CLI Runner
   │
   ▼
GameController ──► PlayGameInputBoundary ◄── PlayGameInteractor
                                              │
                         ┌────────────────────┼────────────────────┐
                         ▼                    ▼                    ▼
                       Game       OpponentWeaponProvider   PlayGameOutputBoundary
                  (dominio puro)             ▲                    ▲
                                              │                    │
                                  Random Opponent Adapter     GamePresenter
                                                                   │
                                                                   ▼
                                                            ConsoleGameView
```

La dirección permitida de las dependencias de código será:

```text
frameworks ──► interface-adapters ──► application ──► domain
     main.ts puede conocer todas las capas porque es el Composition Root.
```

La fase no agrega interfaz web, persistencia, historial ni nuevos modos de juego.
Su objetivo es hacer explícitos y verificables los límites del comportamiento
actual.
