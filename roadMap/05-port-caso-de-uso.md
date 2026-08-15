# 05 — Crear Port del Caso de Uso (Input Port)

## 🎯 Objetivo

Crear la interfaz que define **qué puede hacer** la aplicación (caso de uso), y los DTOs que comunican datos entre capas.

## 📚 Concepto: Input Port y Output DTO

En Clean Architecture, las capas externas (controller) no deben conocer la implementación del caso de uso. Solo conocen su **contrato** (interfaz).

```
Controller ──usa──► PlayGameInput (interfaz/port)
                         ▲
                         │ implementa
                    PlayGameUseCase (clase concreta)
```

Esto permite:
- **Cambiar** la implementación del caso de uso sin tocar el controller
- **Testear** el controller con un caso de uso fake
- **Desacoplar** capas completamente

### ¿Por qué un DTO (Data Transfer Object)?

El caso de uso devuelve un **DTO** — un objeto simple que solo transporta datos. El controller no accede directamente a las entidades del dominio.

```
Controller ◄── PlayGameOutput (DTO) ── PlayGameUseCase ── Game (entidad)
              │                                             │
              │  Solo ve datos planos                       │  Tiene lógica de negocio
              │  { result, machineWeapon }                  │  play(), reglas, estado
```

## ✅ Qué hacer

Crear `src/domain/ports/PlayGame.ts`:

```typescript
import { Weapon } from '../entities/Weapon';
import { GameResult } from '../entities/Game';

// Input Port: define la acción que la aplicación puede ejecutar
export interface PlayGameInput {
    execute(playerWeapon: Weapon): PlayGameOutput;
}

// Output DTO: estructura de datos que devuelve el caso de uso
export interface PlayGameOutput {
    result: GameResult;
    machineWeapon: Weapon;
}
```

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ Solo importa tipos del dominio (`Weapon`, `GameResult`)
3. ✅ No importa nada de `application/`, `controller/` o `infra/`

## 💡 Reflexión

Ahora el controller solo necesita saber:
- *"Existe algo que acepta un `Weapon` y devuelve un `PlayGameOutput`"*

No le importa si detrás hay un `Game`, una `Machine`, o una conexión a un servidor remoto. Eso es **desacoplamiento real**.

## Estado: ✅ Completado
