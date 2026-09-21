# 🗺️ Road Map: Dominando Clean Architecture

## Contexto

Este roadmap usa Rock-Paper-Scissors para aprender Clean Architecture mediante
cambios pequeños y verificables. Las fases 1 y 2 construyeron la base actual; la
fase 3 propone ejercicios para estudiar el capítulo 16, **Independence**, de
Robert C. Martin.
Cada archivo contiene un objetivo, una práctica y criterios de verificación.

## Reglas del roadmap

- ✅ Cada subtarea deja un incremento **compilable**; se respetan sus prerrequisitos
- ✅ Después de cada subtarea el proyecto **debe funcionar**
- ✅ Cada subtarea tiene **un concepto principal** de Clean Architecture
- ✅ Crear el enunciado no completa el ejercicio: se marca ✅ al resolverlo y
  verificarlo, tanto en su archivo individual como en este índice

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
la capa equivocada. Las tareas se realizaron en orden y cada una mantuvo el
proyecto compilando, ejecutándose y con sus pruebas en verde.

| # | Subtarea | Concepto clave | Estado |
|---|----------|----------------|--------|
| 15 | [Fijar el entorno de ejecución](./15-fijar-entorno-node.md) | Reproducibilidad, Node compatible | ✅ |
| 16 | [Corregir la selección aleatoria](./16-corregir-seleccion-aleatoria.md) | Test de regresión, límites inclusivos | ✅ |
| 17 | [Neutralizar el lenguaje del dominio](./17-neutralizar-lenguaje-dominio.md) | Dominio independiente de idioma/UI | ✅ |
| 18 | [Convertir `Game` en dominio puro](./18-purificar-game.md) | Entidades sin dependencias técnicas | ✅ |
| 19 | [Crear el port semántico del oponente](./19-port-opponent-weapon-provider.md) | Ports orientados al negocio | ✅ |
| 20 | [Dar propiedad correcta a los ports](./20-reubicar-ports-aplicacion.md) | Ownership de boundaries | ✅ |
| 21 | [Implementar el Output Boundary](./21-output-boundary-canonico.md) | Interactor → Presenter | ✅ |
| 22 | [Extraer el controller de entrada](./22-extraer-game-controller.md) | Interface Adapter, validación | ✅ |
| 23 | [Aislar los drivers de consola](./23-aislar-drivers-cli.md) | Frameworks & Drivers | ✅ |
| 24 | [Reorganizar las carpetas por anillos](./24-reorganizar-anillos.md) | Dependency Rule visible | ✅ |
| 25 | [Separar tests y test doubles](./25-separar-tests-produccion.md) | Frontera producción/testing | ✅ |
| 26 | [Separar build y type-check](./26-configurar-build-produccion.md) | Configuración de entrega | ✅ |
| 27 | [Endurecer TypeScript](./27-endurecer-typescript.md) | Seguridad estática | ✅ |
| 28 | [Automatizar la Dependency Rule](./28-tests-arquitectura.md) | Fitness functions arquitectónicas | ✅ |
| 29 | [Consolidar la documentación final](./29-documentar-arquitectura-final.md) | Decisiones y diagrama definitivo | ✅ |

> **Máxima pureza no significa máxima cantidad de interfaces.** Se crean
> boundaries explícitos cuando existe un límite arquitectónico; una clase que no
> cruza ningún límite no necesita una abstracción artificial.

## Fase 3 — Capítulo 16: Independence

La pregunta que guía esta fase es: **¿qué puedo cambiar, desarrollar, ejecutar o
entregar sin obligar a cambiar el resto?** La ruta se concentra en **tres
ejercicios**, con un tiempo total orientativo de **85–125 minutos**.

### Ruta de ejercicios

Orden recomendado: **30 → 31 → 32**. Cada ejercicio parte de la fase 2 y puede
hacerse por separado; ninguno requiere implementar los otros dos.

| # | Ejercicio | Qué aprenderás | Tiempo | Estado |
|---|-----------|----------------|--------|--------|
| 30 | [Cambiar la presentación sin cambiar el juego](./30-desacoplar-presentacion.md) | Separar capas y desarrollar contra un contrato | 30–45 min | ✅ |
| 31 | [Agregar un caso de uso independiente](./31-desacoplar-casos-de-uso.md) | Separar funcionalidades y compartir solo las reglas comunes | 35–50 min | ✅ |
| 32 | [Ejecutar el juego fuera del repositorio](./32-independencia-de-despliegue.md) | Distinguir ejecución, build y entrega independiente | 20–30 min | ⬜ |

El primero cambia una representación sin tocar la política; el segundo agrega
una funcionalidad sin modificar la existente; el tercero comprueba la entrega
real y ayuda a decidir qué separación adicional tendría sentido. Los temas de
duplicación, operación y modos de desacoplamiento aparecen en reflexiones breves.

### Cómo practicar

1. Usa la versión de Node de `.nvmrc` y predice qué archivos cambiarán.
2. Implementa el alcance indicado, ejecuta sus comprobaciones y revisa el diff.
3. Responde las preguntas de reflexión y marca el ejercicio como completado en
   su archivo y en este índice. Las notas pueden ser breves y personales.

Los ejercicios están pendientes y no incluyen soluciones. Los nombres nuevos
son piezas a implementar. La práctica mantiene el alcance pequeño: un presenter,
un caso de uso probado en memoria y una ejecución del build en una carpeta aislada.

Son propuestas originales para este proyecto. Como referencia del capítulo,
consulta el [índice del editor](https://www.informit.com/store/clean-architecture-a-craftsmans-guide-to-software-structure-9780134494166)
y el [inicio del capítulo en O'Reilly](https://www.oreilly.com/library/view/clean-architecture-a/9780134494272/ch16.xhtml).

## Arquitectura histórica al finalizar la fase 1

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

Las tareas históricas conservan esos pasos para explicar la evolución. Las
decisiones reemplazadas están marcadas con **“Superada por la fase 2”** y enlazan
la tarea que introdujo su reemplazo.

## Arquitectura final de la fase 2

La descripción canónica, el árbol completo y las razones de cada boundary están
en [Arquitectura final](../docs/README.md).

### Flujo de control en runtime

Estas flechas representan llamadas durante una ronda, no imports:

```text
Usuario
  │
  ▼
ReadlineInputReader ──► CliGameRunner ──► GameController
                                             ├── inválida ─► InvalidInputOutputBoundary ─► GamePresenter
                                             └── válida ──► PlayGameInputBoundary
                                                                  └──► PlayGameInteractor
                                                                         ├──► OpponentWeaponProvider
                                                                         │          └──► MathRandomOpponentWeaponProvider
                                                                         ├──► Game
                                                                         └──► PlayGameOutputBoundary ─► GamePresenter

GamePresenter ──► GameView ──► ConsoleGameView ──► Usuario
```

`GamePresenter` implementa ambos output boundaries y entrega ViewModels mediante
`GameView`, cuya implementación concreta es `ConsoleGameView`.

### Dirección de dependencias de código

Estas flechas representan imports permitidos, siempre hacia políticas más
internas:

```text
exterior                                                        interior

frameworks ─────► interface-adapters ─────► application ─────► domain
frameworks ───────────────────────────────► application
frameworks ──────────────────────────────────────────────────► domain
interface-adapters ──────────────────────────────────────────► domain

main.ts (Composition Root) ──► todos los anillos
```

Cada anillo puede depender del mismo anillo o saltar a uno más interno. Nunca se
permite la dirección contraria. `main.ts` puede conocer todas las capas para
ensamblarlas, pero sigue sujeto a la prohibición de ciclos. La tarea 28 comprueba
estas reglas, incluidos los `import type`, con `npm run test:architecture`.

## Frontera de testing

Desde la tarea 25, `src` contiene únicamente código de producción. Las pruebas
reflejan los anillos que verifican y los doubles compartidos están fuera del
producto:

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

El smoke test del CLI conecta los adapters reales con un reader, una vista y un
oponente en memoria; no abre procesos ni usa `stdin`.

La fase 2 no agrega interfaz web, persistencia, historial ni nuevos modos de juego.
Su objetivo es hacer explícitos y verificables los límites del comportamiento
actual.

No se crean repositories, servicios web ni interfaces sin un consumidor real. Si
aparece una necesidad nueva, la política consumidora define primero el contrato
semántico y el mecanismo externo lo implementa después.
