# 🗺️ Road Map: Dominando Clean Architecture

## Contexto

Este roadmap transforma el proyecto Rock-Paper-Scissors en una **Clean Architecture pura**.
Cada archivo es una subtarea con explicación, código de ejemplo y verificación.

## Reglas del roadmap

- ✅ Cada subtarea se puede completar de forma **independiente y compilable**
- ✅ Después de cada subtarea el proyecto **debe funcionar**
- ✅ Cada subtarea introduce **un solo concepto** de Clean Architecture

## Progreso

| # | Subtarea | Concepto clave | Estado |
|---|----------|----------------|--------|
| 01 | [Crear Ports del dominio](./01-crear-ports.md) | Dependency Inversion, Interfaces | ✅ |
| 02 | [Crear Adapter de infraestructura](./02-crear-adapter-infra.md) | Adapters, Implementación de Ports | ✅ |
| 03 | [Inyectar dependencias en entidades](./03-inyectar-en-entidades.md) | Dependency Injection en el dominio | ✅ |
| 04 | [Corregir lógica de negocio](./04-logica-de-negocio.md) | Domain Logic, Value Objects | ✅ |
| 05 | [Crear Port del caso de uso](./05-port-caso-de-uso.md) | Input/Output Ports, DTOs | ✅ |
| 06 | [Refactorizar caso de uso](./06-refactorizar-use-case.md) | Use Case, Orquestación | ✅ |
| 07 | [Crear Port de I/O para UI](./07-port-io-ui.md) | Output Port, UI Abstraction | ✅ |
| 08 | [Refactorizar controller con DI](./08-refactorizar-controller.md) | Adapter, Inversión de Control | ⬜ |
| 09 | [Composition Root](./09-composition-root.md) | Wiring, Entry Point | ⬜ |
| 10 | [Limpiar código muerto](./10-limpiar-codigo-muerto.md) | Code Hygiene | ⬜ |
| 11 | [Configurar Vitest](./11-configurar-vitest.md) | Testing Setup | ⬜ |
| 12 | [Tests del dominio](./12-tests-dominio.md) | Unit Testing, Fakes | ⬜ |
| 13 | [Tests del caso de uso](./13-tests-use-case.md) | Integration Testing | ⬜ |
| 14 | [Humble Object: Presenter y View](./14-humble-object-presenter.md) | Humble Object, Presenter, ViewModel | ⬜ |

## Diagrama de dependencias final

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
