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
