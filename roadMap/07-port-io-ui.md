# 07 — Crear Port de I/O para UI

## 🎯 Objetivo

Crear una interfaz que abstraiga la interacción con el usuario (I/O), para que en el futuro puedas reemplazar la CLI por Web, REST API, o cualquier otra interfaz **sin tocar la lógica**.

## 📚 Concepto: Output Port / UI Abstraction

Ya sabemos que el dominio define ports. Pero los **controllers** también se benefician de abstracciones. Si abstraemos la forma de comunicarse con el usuario, podemos tener múltiples implementaciones:

```
                PlayGameInput (port)
                     ▲
CLI Adapter ─────────┤
Web Adapter ─────────┤
API Adapter ─────────┘
```

Pero hay algo más sutil: la forma de **leer input** y **mostrar output** al usuario también varía entre interfaces:

| Interfaz | Leer input | Mostrar output |
|----------|-----------|----------------|
| CLI | `readline` (texto) | `console.log()` |
| Web | Evento click en botón | Actualizar el DOM |
| REST API | JSON en request body | JSON en response |

Si creamos un **port para I/O**, podemos desacoplar completamente.

## ✅ Qué hacer

Crear `src/domain/ports/GameUI.ts`:

```typescript
import { Weapon } from '../entities/Weapon';
import { GameResult } from '../entities/Game';

// Port que abstrae CÓMO interactuamos con el usuario
export interface GameUI {
    // Pide al usuario que elija un arma
    askForWeapon(): Promise<Weapon | null>;

    // Muestra el resultado del juego
    showResult(
        playerWeapon: Weapon,
        machineWeapon: Weapon,
        result: GameResult
    ): void;

    // Muestra un mensaje de error
    showError(message: string): void;
}
```

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ La interfaz NO importa nada de `infra/`, `controller/`, ni `application/`
3. ✅ Solo usa tipos del dominio (`Weapon`, `GameResult`)

## 💡 Reflexión

Ahora puedes imaginar múltiples implementaciones:

```typescript
// CLI
class CliGameUI implements GameUI {
    async askForWeapon() { /* readline */ }
    showResult() { /* console.log */ }
}

// Web (futuro)
class WebGameUI implements GameUI {
    async askForWeapon() { /* esperar click en botón */ }
    showResult() { /* actualizar DOM */ }
}

// REST API (futuro)  
class ApiGameUI implements GameUI {
    async askForWeapon() { /* leer JSON del request */ }
    showResult() { /* enviar JSON response */ }
}
```

**El dominio, los casos de uso y la lógica de negocio NO cambian.** Solo conectas un adapter diferente en `main.ts`.

## Estado: ⬜ Pendiente
