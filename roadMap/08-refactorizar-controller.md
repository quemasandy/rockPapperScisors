# 08 — Refactorizar Controller con Inyección de Dependencias

## 🎯 Objetivo

Refactorizar `GameCli.ts` para que:
1. **Reciba** el caso de uso como dependencia inyectada (a través del port `PlayGameInput`)
2. **Implemente** el port `GameUI` (es un adapter de la interfaz de usuario)
3. **No instancie** nada con `new`

## 📚 Concepto: El Controller como Adapter

En Clean Architecture, el controller es un **Adapter** — adapta la interfaz externa (CLI, Web, API) al formato que entiende la aplicación.

```
  ┌──────────────────────┐
  │  Usuario (teclado)   │
  └──────────┬───────────┘
             │ texto: "1"
  ┌──────────▼───────────┐
  │  GameCli (adapter)   │  Traduce "1" → Weapon.Rock
  │  implements GameUI   │  Traduce GameResult.Win → "🎉 ¡Ganaste!"
  └──────────┬───────────┘
             │ Weapon.Rock
  ┌──────────▼───────────┐
  │  PlayGameInput (port)│  Interfaz del caso de uso
  └──────────────────────┘
```

## 🔍 Problema actual

Tu `GameCli.ts`:

```typescript
// ❌ Problemas
export class GameCli {
    constructor() { }  // No recibe dependencias

    async start() {
        const game = new StartGame()  // Crea la dependencia internamente
        // ...
        const result = game.evaluateAnswer(userResponse)  // Depende de implementación concreta

        if (!result) {
            console.log("perdiste")  // No maneja empate
        }
        console.log("ganaste")
    }
}
```

## ✅ Qué hacer

Modificar `src/controller/GameCli.ts`:

```typescript
import * as readline from 'readline';
import { Weapon } from '../domain/entities/Weapon';
import { GameResult } from '../domain/entities/Game';
import { PlayGameInput } from '../domain/ports/PlayGame';
import { GameUI } from '../domain/ports/GameUI';

export class GameCli implements GameUI {
    constructor(private readonly playGame: PlayGameInput) {}

    async askForWeapon(): Promise<Weapon | null> {
        const prompt = "Piedra, Papel o Tijera.\n1) Piedra  2) Papel  3) Tijeras\nElige: ";
        const input = await this.readLine(prompt);
        return this.parseWeapon(input);
    }

    showResult(playerWeapon: Weapon, machineWeapon: Weapon, result: GameResult): void {
        console.log(`\nTú elegiste: ${playerWeapon}`);
        console.log(`La máquina eligió: ${machineWeapon}`);

        switch (result) {
            case GameResult.Win:
                console.log("🎉 ¡Ganaste!");
                break;
            case GameResult.Lose:
                console.log("😢 Perdiste.");
                break;
            case GameResult.Draw:
                console.log("🤝 ¡Empate!");
                break;
        }
    }

    showError(message: string): void {
        console.log(`❌ Error: ${message}`);
    }

    async start(): Promise<void> {
        const weapon = await this.askForWeapon();

        if (!weapon) {
            this.showError("Opción inválida. Elige 1, 2 o 3.");
            return;
        }

        const { result, machineWeapon } = this.playGame.execute(weapon);
        this.showResult(weapon, machineWeapon, result);
    }

    private parseWeapon(input: string): Weapon | null {
        const map: Record<string, Weapon> = {
            "1": Weapon.Rock,
            "2": Weapon.Paper,
            "3": Weapon.Scissors,
            "piedra": Weapon.Rock,
            "papel": Weapon.Paper,
            "tijeras": Weapon.Scissors,
        };
        return map[input.toLowerCase()] ?? null;
    }

    private readLine(prompt: string): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        return new Promise((resolve) => {
            rl.question(prompt, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }
}
```

### Cambios clave:

| Antes | Después |
|-------|---------|
| `constructor() { }` | `constructor(private readonly playGame: PlayGameInput)` |
| `new StartGame()` en `start()` | Usa `this.playGame` inyectado |
| No implementa interfaz | `implements GameUI` |
| `if (!result)` ambiguo | `switch` con `GameResult.Win/Lose/Draw` |
| Input como string crudo | `parseWeapon()` convierte a `Weapon` |

## 🧪 Verificación

1. ✅ Compila sin errores (`npx tsc --noEmit`)
2. ✅ `GameCli` **NO** importa `StartGame`, `PlayGameUseCase`, ni `MathRandomNumberGenerator`
3. ✅ Solo depende de **ports** (`PlayGameInput`, `GameUI`) y **tipos del dominio** (`Weapon`, `GameResult`)
4. ✅ La dirección de dependencia: `controller` → `domain` (correcto ✅)

## 💡 Reflexión

Fíjate que `GameCli` no sabe:
- Cómo se genera el arma de la máquina (¿`Math.random`? ¿Un API?)
- Qué reglas tiene el juego (¿Piedra-Papel-Tijera? ¿Con Lagarto y Spock?)
- Cómo se implementa el caso de uso

Solo sabe: *"Recibo un `Weapon`, llamo `execute()`, y muestro el resultado"*. Eso es un adapter desacoplado. ✅

## Estado: ⬜ Pendiente
